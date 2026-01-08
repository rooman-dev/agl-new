import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Configure email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use App Password for Gmail
    },
  });
};

// Contact form submission
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const transporter = createTransporter();

    // Email to admin
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'roomankhan2512@gmail.com',
      subject: `[AdsGeniusLab Contact] ${subject || 'New Contact Form Submission'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject || 'Not specified'}</p>
        <hr />
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr />
        <p><em>Sent from AdsGeniusLab website contact form</em></p>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Auto-reply to sender
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting AdsGeniusLab!',
      html: `
        <h2>Thank you for reaching out, ${name}!</h2>
        <p>We have received your message and will get back to you within 24-48 hours.</p>
        <p>In the meantime, feel free to explore our services at <a href="https://adsgeniuslab.com">adsgeniuslab.com</a></p>
        <br />
        <p>Best regards,</p>
        <p><strong>AdsGeniusLab Team</strong></p>
      `,
    };

    await transporter.sendMail(autoReplyOptions);

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
});

// Consultation form submission
router.post('/consultation', async (req, res) => {
  try {
    const { name, email, phone, company, website, service, budget, message } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const transporter = createTransporter();

    // Email to admin
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'roomankhan2512@gmail.com',
      subject: `[AdsGeniusLab Consultation] New Request from ${name}`,
      html: `
        <h2>🎯 New Consultation Request</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Name:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Phone:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Company:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${company || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Website:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${website || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Service Interest:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${service || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Budget:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${budget || 'Not specified'}</td>
          </tr>
        </table>
        <hr />
        <h3>Additional Message:</h3>
        <p>${message ? message.replace(/\n/g, '<br>') : 'No additional message'}</p>
        <hr />
        <p><em>Sent from AdsGeniusLab website consultation form</em></p>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Auto-reply to sender
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Consultation Request - AdsGeniusLab',
      html: `
        <h2>Thank you for your consultation request, ${name}!</h2>
        <p>We're excited to learn more about your business and how we can help you grow.</p>
        <p>One of our digital marketing experts will contact you within 24-48 hours to schedule your free consultation.</p>
        <br />
        <h3>What to expect:</h3>
        <ul>
          <li>A personalized review of your current digital presence</li>
          <li>Competitive analysis and market opportunity assessment</li>
          <li>Customized growth strategy recommendations</li>
          <li>Clear timeline and investment overview</li>
        </ul>
        <br />
        <p>If you have any immediate questions, feel free to reply to this email or call us at <strong>+92 318 1292628</strong>.</p>
        <br />
        <p>Best regards,</p>
        <p><strong>AdsGeniusLab Team</strong></p>
      `,
    };

    await transporter.sendMail(autoReplyOptions);

    res.json({ success: true, message: 'Consultation request sent successfully' });
  } catch (error) {
    console.error('Consultation form error:', error);
    res.status(500).json({ error: 'Failed to send consultation request. Please try again later.' });
  }
});

export default router;
