import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, phone, email, service, message } = req.body

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' })
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Rimak Nigeria Limited <contact@rimaknigerialimited.com>',
      to: ['rimaknigerialimited@gmail.com'],
      replyTo: email,
      subject: `New Enquiry from ${name}${service ? ` — ${service}` : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
          <div style="background: linear-gradient(135deg, #060214 0%, #0a0520 100%); padding: 32px; border-bottom: 2px solid #C9A84C;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px;">RIMAK NIGERIA LIMITED</h1>
            <p style="color: #00CCFF; margin: 6px 0 0; font-size: 12px; letter-spacing: 3px; text-transform: uppercase;">New Website Enquiry</p>
          </div>

          <div style="padding: 32px; background: #f9f9f9; border: 1px solid #e0e0e0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555; width: 35%; vertical-align: top;">Full Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #1a1a2e;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555; vertical-align: top;">Email Address</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #1a1a2e;">
                  <a href="mailto:${email}" style="color: #00CCFF;">${email}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555; vertical-align: top;">Phone Number</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #1a1a2e;">${phone}</td>
              </tr>` : ''}
              ${service ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555; vertical-align: top;">Service Type</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #1a1a2e;">${service}</td>
              </tr>` : ''}
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #555; vertical-align: top;">Message</td>
                <td style="padding: 10px 0; color: #1a1a2e; white-space: pre-wrap;">${message}</td>
              </tr>
            </table>
          </div>

          <div style="background: #060214; padding: 20px 32px; text-align: center;">
            <p style="color: #666; font-size: 11px; margin: 0; letter-spacing: 1px;">
              RC 9484253 · Rimak Nigeria Limited · rimaknigerialimited.com
            </p>
          </div>
        </div>
      `,
      text: `
New Enquiry — Rimak Nigeria Limited

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}\n` : ''}${service ? `Service: ${service}\n` : ''}
Message:
${message}

---
RC 9484253 · Rimak Nigeria Limited
      `.trim(),
    })

    if (error) {
      console.error('Resend error:', error)
      return res.status(500).json({ error: 'Failed to send email. Please try again.' })
    }

    return res.status(200).json({ success: true, id: data.id })
  } catch (err) {
    console.error('Unexpected error:', err)
    return res.status(500).json({ error: 'An unexpected error occurred. Please try again.' })
  }
}
