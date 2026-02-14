# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Visit: `http://localhost:5173`

### 3. Edit Content via CMS (After Deployment)
Visit: `https://your-site.netlify.app/admin/`

---

## 📝 What Can You Edit?

### Through CMS (Recommended)
- ✅ Hero section (title, subtitle, buttons)
- ✅ About section (all paragraphs)
- ✅ Services (add/edit/delete services)
- ✅ Skills (manage skill categories)
- ✅ Projects (add/edit/delete projects)
- ✅ Testimonials (add/edit/delete testimonials)
- ✅ Contact section (title, subtitle)
- ✅ Footer (copyright text)

### Through Code (Advanced)
- 🎨 Styling (Tailwind classes)
- 🔧 Components (React components)
- ⚙️ Configuration (Vite, Tailwind)

---

## 🎯 Common Tasks

### Add a New Project
1. Go to CMS → Projects → New Project
2. Fill in details (title, description, tech stack)
3. Upload thumbnail image
4. Add live URL and GitHub URL
5. Click Publish

### Add a New Service
1. Go to CMS → Services → New Service
2. Enter title and description
3. Choose an icon from dropdown
4. Add service items (one per line)
5. Set display order
6. Click Publish

### Update Hero Section
1. Go to CMS → Site Settings → General Settings
2. Edit Hero Section fields
3. Click Publish

### Add a Testimonial
1. Go to CMS → Testimonials → New Testimonial
2. Enter name, role, company, quote
3. Set display order
4. Click Publish

---

## 📁 Project Structure

```
├── public/
│   ├── admin/              # CMS admin interface
│   │   ├── config.yml      # CMS configuration
│   │   └── index.html      # CMS entry point
│   └── img/                # Uploaded images
├── src/
│   ├── components/         # React components
│   │   ├── Hero.jsx        # Hero section
│   │   ├── About.jsx       # About section
│   │   ├── Services.jsx    # Services section
│   │   ├── Skills.jsx      # Skills section
│   │   ├── Projects.jsx    # Projects section
│   │   ├── Testimonials.jsx # Testimonials section
│   │   └── Contact.jsx     # Contact form
│   ├── content/            # CMS content files
│   │   ├── site/           # Site settings
│   │   ├── projects/       # Project markdown files
│   │   ├── services/       # Service JSON files
│   │   ├── skills/         # Skills JSON file
│   │   └── testimonials/   # Testimonial JSON files
│   ├── lib/
│   │   ├── contentLoader.js # Content loading utilities
│   │   └── utils.js        # Helper functions
│   └── App.jsx             # Main app component
├── CMS_SETUP_GUIDE.md      # Detailed CMS setup
├── DEPLOYMENT_GUIDE.md     # Deployment instructions
└── netlify.toml            # Netlify configuration
```

---

## 🛠️ Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## 🚢 Deploy to Netlify

### Quick Deploy
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Click "Deploy site"

### Enable CMS
1. Site settings → Identity → Enable Identity
2. Services → Git Gateway → Enable Git Gateway
3. Identity tab → Invite users → Enter your email
4. Accept invitation and set password
5. Access CMS at `https://your-site.netlify.app/admin/`

**See DEPLOYMENT_GUIDE.md for detailed instructions**

---

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: "#your-color",
      background: "#your-bg-color",
      surface: "#your-surface-color",
    }
  }
}
```

### Change Fonts
1. Import font in `src/index.css`
2. Update `tailwind.config.js` font family

### Add New Section
1. Create component in `src/components/`
2. Add to `src/App.jsx`
3. Create content file in `src/content/`
4. Update CMS config in `public/admin/config.yml`

---

## 🐛 Troubleshooting

### CMS Not Loading
- Make sure you've deployed to Netlify
- Enable Identity and Git Gateway
- Clear browser cache

### Content Not Showing
- Check browser console for errors
- Verify content files exist in `src/content/`
- Restart dev server

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📚 Documentation

- **CMS Setup**: See `CMS_SETUP_GUIDE.md`
- **Deployment**: See `DEPLOYMENT_GUIDE.md`
- **Decap CMS**: https://decapcms.org/docs/
- **Vite**: https://vitejs.dev/guide/
- **React**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/docs

---

## 🆘 Need Help?

1. Check the guides in this repository
2. Review Decap CMS documentation
3. Check Netlify documentation
4. Look for errors in browser console
5. Check build logs in Netlify dashboard

---

## ✅ Pre-Deployment Checklist

- [ ] Update site settings with your information
- [ ] Add your projects
- [ ] Add your services
- [ ] Update skills
- [ ] Add testimonials
- [ ] Test contact form
- [ ] Optimize images
- [ ] Update page title in `index.html`
- [ ] Add favicon
- [ ] Test on mobile devices

---

## 🎉 You're Ready!

Your portfolio is now fully CMS-enabled. All content can be edited through the admin interface without touching code.

**Next Steps:**
1. Deploy to Netlify
2. Enable CMS
3. Start editing content
4. Share your portfolio!

Good luck! 🚀
