# Production Deployment Guide

## Deployment Options

This guide covers deployment to **Netlify** (recommended for CMS) and **Vercel** (alternative).

---

## Option 1: Netlify (Recommended for CMS)

### Why Netlify?
- Built-in Identity service for CMS authentication
- Git Gateway for CMS commits
- Automatic form handling
- Free SSL certificates
- Continuous deployment from Git

### Prerequisites
- GitHub/GitLab/Bitbucket account
- Code pushed to a repository
- Netlify account (free tier available)

### Deployment Steps

#### 1. Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

#### 2. Connect to Netlify

1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click **Add new site** → **Import an existing project**
3. Choose your Git provider (GitHub/GitLab/Bitbucket)
4. Authorize Netlify to access your repositories
5. Select your portfolio repository

#### 3. Configure Build Settings

Netlify should auto-detect these settings:

```
Build command: npm run build
Publish directory: dist
```

If not auto-detected, enter them manually.

#### 4. Deploy

1. Click **Deploy site**
2. Wait 2-3 minutes for build to complete
3. Your site is live at `https://random-name-12345.netlify.app`

#### 5. Custom Domain (Optional)

1. Go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Enter your domain (e.g., `yourname.com`)
4. Follow DNS configuration instructions
5. SSL certificate is automatically provisioned

#### 6. Enable CMS (Critical!)

1. Go to **Site settings** → **Identity**
2. Click **Enable Identity**
3. Under **Registration**, select **Invite only**
4. Scroll to **Services** → **Git Gateway**
5. Click **Enable Git Gateway**

#### 7. Invite Yourself to CMS

1. Go to **Identity** tab
2. Click **Invite users**
3. Enter your email
4. Check email and accept invitation
5. Set your password
6. Access CMS at `https://your-site.netlify.app/admin/`

#### 8. Configure Form Handling

Your contact form is already configured with `data-netlify="true"`. Netlify will automatically handle form submissions.

To receive form notifications:
1. Go to **Site settings** → **Forms**
2. Click **Form notifications**
3. Add email notification with your email address

### Environment Variables (If Needed)

If you add any API keys or secrets:

1. Go to **Site settings** → **Environment variables**
2. Click **Add a variable**
3. Enter key and value
4. Redeploy site

---

## Option 2: Vercel

### Why Vercel?
- Excellent performance
- Easy deployment
- Free SSL
- Automatic previews for PRs

### Limitations
- No built-in Identity service (CMS won't work out of the box)
- Need external authentication service for CMS

### Deployment Steps

#### 1. Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

#### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Vercel auto-detects Vite settings:
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   ```
5. Click **Deploy**
6. Wait for deployment to complete

#### 3. Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Configure DNS as instructed
4. SSL is automatic

### CMS on Vercel (Advanced)

To use CMS on Vercel, you need external authentication:

**Option A: Use Netlify Identity (Hybrid)**
1. Create a Netlify site (just for Identity)
2. Enable Identity and Git Gateway on Netlify
3. Deploy frontend to Vercel
4. CMS uses Netlify Identity for auth

**Option B: Use GitHub OAuth**
1. Set up OAuth app in GitHub
2. Configure `public/admin/config.yml`:
```yaml
backend:
  name: github
  repo: yourusername/your-repo
  branch: main
```
3. Users login with GitHub

---

## Option 3: Other Platforms

### GitHub Pages
- Free hosting for static sites
- No server-side features (forms won't work)
- CMS requires external auth

### Cloudflare Pages
- Fast global CDN
- Free tier available
- Similar to Vercel (no built-in Identity)

---

## Pre-Deployment Checklist

- [ ] Update `index.html` title
- [ ] Update site settings in CMS with your info
- [ ] Add real project images
- [ ] Test all links and buttons
- [ ] Optimize images (compress before uploading)
- [ ] Update `package.json` name and description
- [ ] Add favicon (replace `public/vite.svg`)
- [ ] Test contact form
- [ ] Check mobile responsiveness
- [ ] Run build locally: `npm run build`
- [ ] Test production build: `npm run preview`

---

## Post-Deployment Tasks

### 1. Test Everything
- [ ] Visit all sections
- [ ] Test contact form
- [ ] Check mobile view
- [ ] Test CMS login and editing
- [ ] Verify images load correctly

### 2. SEO Setup
- [ ] Add meta description to `index.html`
- [ ] Add Open Graph tags
- [ ] Submit sitemap to Google Search Console
- [ ] Add Google Analytics (optional)

### 3. Performance
- [ ] Run Lighthouse audit
- [ ] Optimize images if needed
- [ ] Check Core Web Vitals

### 4. Monitoring
- [ ] Set up uptime monitoring (e.g., UptimeRobot)
- [ ] Enable Netlify/Vercel analytics
- [ ] Monitor form submissions

---

## Continuous Deployment

Once set up, deployment is automatic:

1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update content"
   git push
   ```
3. Netlify/Vercel automatically rebuilds
4. Changes live in 2-3 minutes

Or use the CMS:
1. Edit content in CMS
2. Click **Publish**
3. CMS commits to GitHub
4. Auto-deployment triggers
5. Changes live in 2-3 minutes

---

## Build Commands Reference

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint
```

---

## Troubleshooting

### Build Fails
- Check build logs in Netlify/Vercel dashboard
- Verify all dependencies in `package.json`
- Test build locally: `npm run build`
- Check for syntax errors: `npm run lint`

### Images Not Loading
- Ensure images are in `public/` folder
- Use absolute paths: `/img/image.jpg`
- Check image file names (case-sensitive)

### Form Not Working
- Verify `data-netlify="true"` attribute
- Add hidden input: `<input type="hidden" name="form-name" value="contact" />`
- Check form submissions in Netlify dashboard

### CMS Not Working
- Verify Identity is enabled (Netlify only)
- Check Git Gateway is enabled
- Clear browser cache
- Try incognito mode

### Slow Build Times
- Optimize images before uploading
- Remove unused dependencies
- Check for large files in repository

---

## Performance Optimization

### Image Optimization
```bash
# Install image optimizer
npm install -D vite-plugin-imagemin

# Or use online tools:
# - TinyPNG (tinypng.com)
# - Squoosh (squoosh.app)
```

### Lazy Loading
Images already use native lazy loading. For additional optimization, consider:
- WebP format for images
- Responsive images with `srcset`
- CDN for image delivery

### Caching
Netlify/Vercel automatically handle caching. For custom headers:

Create `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/index.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

---

## Security Best Practices

1. **Environment Variables**: Never commit API keys
2. **HTTPS**: Always use SSL (automatic on Netlify/Vercel)
3. **CMS Access**: Use "Invite only" registration
4. **Dependencies**: Regularly update packages
5. **2FA**: Enable on hosting platform account

---

## Backup Strategy

1. **Git Repository**: Your primary backup
2. **CMS Content**: Automatically committed to Git
3. **Images**: Stored in repository (`public/img/`)
4. **Database**: Not applicable (static site)

To backup:
```bash
git clone https://github.com/yourusername/your-repo.git backup-folder
```

---

## Cost Breakdown

### Netlify (Recommended)
- **Free Tier**: 100GB bandwidth, 300 build minutes/month
- **Pro**: $19/month (unlimited builds, more bandwidth)
- **Domain**: ~$12/year (optional, buy from any registrar)

### Vercel
- **Hobby**: Free (100GB bandwidth, unlimited builds)
- **Pro**: $20/month (more bandwidth, team features)
- **Domain**: ~$12/year (optional)

### Recommended Setup
- **Hosting**: Netlify Free Tier (sufficient for portfolio)
- **Domain**: Namecheap/Google Domains (~$12/year)
- **Total**: $12/year (just domain cost)

---

## Support Resources

- **Netlify Docs**: https://docs.netlify.com
- **Vercel Docs**: https://vercel.com/docs
- **Decap CMS**: https://decapcms.org/docs
- **Vite Docs**: https://vitejs.dev/guide

---

## Next Steps

1. Deploy to Netlify following steps above
2. Enable Identity and Git Gateway
3. Invite yourself to CMS
4. Update content through CMS
5. Add custom domain (optional)
6. Share your portfolio!

Good luck with your deployment! 🚀
