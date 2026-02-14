# Portfolio Website with CMS

A modern, fully CMS-enabled portfolio website built with React, Vite, Tailwind CSS, and Decap CMS. Edit all content through an intuitive admin interface without touching code.

## ✨ Features

- 🎨 **Modern Design**: Clean, minimal, and professional
- 📱 **Fully Responsive**: Looks great on all devices
- ⚡ **Fast Performance**: Built with Vite for optimal speed
- 🎭 **Smooth Animations**: Powered by Framer Motion
- 📝 **CMS-Enabled**: Edit all content through admin interface
- 🔒 **Secure**: Netlify Identity authentication
- 📧 **Contact Form**: Built-in form handling with Netlify
- 🚀 **Easy Deployment**: One-click deploy to Netlify

## 🎯 What's Editable Through CMS

- ✅ Hero section (title, subtitle, buttons)
- ✅ About section (all paragraphs)
- ✅ Services (add/edit/delete)
- ✅ Skills (manage categories and skills)
- ✅ Projects (add/edit/delete with images)
- ✅ Testimonials (add/edit/delete)
- ✅ Contact section (title, subtitle)
- ✅ Footer (copyright text)

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

## 📚 Documentation

- **[Quick Start Guide](QUICK_START.md)** - Get up and running in 5 minutes
- **[CMS Setup Guide](CMS_SETUP_GUIDE.md)** - Complete CMS configuration
- **[Deployment Guide](DEPLOYMENT_GUIDE.md)** - Deploy to production

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion
- **CMS**: Decap CMS (Netlify CMS)
- **Icons**: Lucide React
- **Hosting**: Netlify (recommended)

## 📁 Project Structure

```
├── public/
│   ├── admin/              # CMS admin interface
│   └── img/                # Uploaded images
├── src/
│   ├── components/         # React components
│   ├── content/            # CMS content files
│   │   ├── site/           # Site settings
│   │   ├── projects/       # Projects
│   │   ├── services/       # Services
│   │   ├── skills/         # Skills
│   │   └── testimonials/   # Testimonials
│   ├── lib/                # Utilities
│   └── App.jsx             # Main app
└── netlify.toml            # Netlify config
```

## 🚢 Deployment

### Deploy to Netlify (Recommended)

1. Push code to GitHub
2. Connect repository to Netlify
3. Deploy with these settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Enable Identity and Git Gateway
5. Access CMS at `/admin/`

**See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions**

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: "#your-color",
  background: "#your-bg-color",
  surface: "#your-surface-color",
}
```

### Add Content
Use the CMS at `/admin/` after deployment, or edit files in `src/content/`

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Lint code
```

## 🔒 Security

- CMS protected by Netlify Identity
- Invite-only registration
- Git Gateway for secure commits
- HTTPS enforced

## 📄 License

MIT License - feel free to use for your own portfolio!

## 🆘 Support

- Check the documentation guides
- Review [Decap CMS docs](https://decapcms.org/docs/)
- Check [Netlify docs](https://docs.netlify.com/)

## 🎉 Credits

Built with React, Vite, Tailwind CSS, and Decap CMS
