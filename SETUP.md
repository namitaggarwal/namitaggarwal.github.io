# Portfolio Setup Guide

## 🔐 Secure EmailJS Configuration

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Setup Email Service
1. In EmailJS dashboard → **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider (Gmail recommended)
4. Follow setup instructions
5. **Copy the Service ID**

### Step 3: Create Email Template
1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Use this template:

```
Subject: New Contact Form Message: {{subject}}

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. **Copy the Template ID**

### Step 4: Get Public Key
1. Go to **"Account"** → **"General"**
2. **Copy your Public Key**

### Step 5: Configure Your Portfolio

#### For Local Development:
1. Copy `config.example.js` to `config.js`
2. Fill in your actual credentials:

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'your_actual_public_key',
    SERVICE_ID: 'your_actual_service_id',
    TEMPLATE_ID: 'your_actual_template_id'
};
```

#### For Production/Deployment:

**Option A: Static Hosting (GitHub Pages, Netlify, Vercel)**
- Use the same `config.js` approach
- Make sure `config.js` is in your `.gitignore`

**Option B: Environment Variables (Advanced)**
- Set environment variables in your hosting platform
- Update the code to use `process.env` variables

### Step 6: Test Your Setup
1. Open your portfolio
2. Fill out the contact form
3. Submit and check your email

## 🚨 Security Notes

- ✅ **DO**: Keep credentials in `config.js` (not in git)
- ✅ **DO**: Use `.gitignore` to exclude sensitive files
- ✅ **DO**: Test with a small email limit first
- ❌ **DON'T**: Commit actual credentials to GitHub
- ❌ **DON'T**: Share your EmailJS credentials publicly

## 📁 File Structure

```
portfolio/
├── index.html
├── styles.css
├── script.js
├── config.js          # Your actual credentials (not in git)
├── config.example.js  # Template file (safe to commit)
├── .gitignore         # Protects sensitive files
└── SETUP.md          # This guide
```

## 🔧 Troubleshooting

**Form not working?**
- Check browser console for errors
- Verify all credentials are correct
- Test EmailJS service is active

**Not receiving emails?**
- Check spam folder
- Verify email template is correct
- Check EmailJS dashboard for delivery status

## 📞 Support

If you need help:
- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- Contact: namitaggarwal.fullstack@gmail.com
