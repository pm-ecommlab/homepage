import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import https from 'https'
import { URLSearchParams } from 'url'

type Ok = { ok: true }
type Err = { ok: false; error: string }

function isNonEmptyString(v: unknown, min = 1) {
  return typeof v === 'string' && v.trim().length >= min
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Ok | Err>) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const { name, email, message, company, website, _hp, turnstileToken } = (req.body ?? {}) as Record<
    string,
    unknown
  >

  // Honeypot field for basic spam protection
  if (typeof _hp === 'string' && _hp.trim().length > 0) {
    return res.status(200).json({ ok: true })
  }

  // Captcha (Cloudflare Turnstile)
  if (!isNonEmptyString(turnstileToken, 10)) {
    return res.status(400).json({ ok: false, error: 'Captcha required' })
  }
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY
  if (!turnstileSecret) {
    return res.status(500).json({ ok: false, error: 'Captcha is not configured (TURNSTILE_SECRET_KEY missing)' })
  }

  if (!isNonEmptyString(name, 2)) return res.status(400).json({ ok: false, error: 'Invalid name' })
  if (!isNonEmptyString(email, 5)) return res.status(400).json({ ok: false, error: 'Invalid email' })
  if (!isNonEmptyString(message, 10)) return res.status(400).json({ ok: false, error: 'Invalid message' })

  const nameStr = (name as string).trim()
  const emailStr = (email as string).trim()
  const messageStr = (message as string).trim()

  const captchaOk = await verifyTurnstile({
    secret: turnstileSecret,
    response: (turnstileToken as string).trim(),
    remoteip:
      typeof req.headers['x-forwarded-for'] === 'string'
        ? req.headers['x-forwarded-for'].split(',')[0].trim()
        : req.socket.remoteAddress,
  })
  if (!captchaOk) return res.status(400).json({ ok: false, error: 'Captcha verification failed' })

  const to = process.env.CONTACT_TO || 'hello@ecommlab.io'
  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const from = process.env.SMTP_FROM || user

  if (!host || !port || !user || !pass || !from) {
    return res.status(500).json({
      ok: false,
      error:
        'Mail is not configured. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS and SMTP_FROM (or SMTP_USER as from).',
    })
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })

  const safeCompany = isNonEmptyString(company) ? (company as string).trim() : ''
  const safeWebsite = isNonEmptyString(website) ? (website as string).trim() : ''

  const subject = `Kontaktformular: ${nameStr}`
  const text = [
    `Name: ${nameStr}`,
    `E-Mail: ${emailStr}`,
    safeCompany ? `Firma: ${safeCompany}` : null,
    safeWebsite ? `Website: ${safeWebsite}` : null,
    '',
    messageStr,
  ]
    .filter(Boolean)
    .join('\n')

  const html = `
    <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5">
      <h2>Neue Nachricht über das Kontaktformular</h2>
      <p><strong>Name:</strong> ${escapeHtml(nameStr)}</p>
      <p><strong>E-Mail:</strong> ${escapeHtml(emailStr)}</p>
      ${safeCompany ? `<p><strong>Firma:</strong> ${escapeHtml(safeCompany)}</p>` : ''}
      ${safeWebsite ? `<p><strong>Website:</strong> ${escapeHtml(safeWebsite)}</p>` : ''}
      <hr />
      <pre style="white-space:pre-wrap;margin:0">${escapeHtml(messageStr)}</pre>
    </div>
  `

  await transporter.sendMail({
    from,
    to,
    replyTo: emailStr,
    subject,
    text,
    html,
  })

  return res.status(200).json({ ok: true })
}

function escapeHtml(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

async function verifyTurnstile({
  secret,
  response,
  remoteip,
}: {
  secret: string
  response: string
  remoteip?: string
}) {
  const body = new URLSearchParams()
  body.set('secret', secret)
  body.set('response', response)
  if (remoteip) body.set('remoteip', remoteip)

  const raw = await new Promise<string>((resolve, reject) => {
    const req = https.request(
      {
        method: 'POST',
        hostname: 'challenges.cloudflare.com',
        path: '/turnstile/v0/siteverify',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(body.toString()),
        },
      },
      (res) => {
        const chunks: Buffer[] = []
        res.on('data', (d) => chunks.push(Buffer.isBuffer(d) ? d : Buffer.from(d)))
        res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
      },
    )
    req.on('error', reject)
    req.write(body.toString())
    req.end()
  })

  try {
    const json = JSON.parse(raw) as { success?: boolean }
    return Boolean(json.success)
  } catch {
    return false
  }
}

