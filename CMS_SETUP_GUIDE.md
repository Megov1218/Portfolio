# Complete CMS Setup Guide

## Overview
Your portfolio now uses **Decap CMS** (formerly Netlify CMS) to manage all content. All sections are editable through the CMS interface.

## What's Editable Through CMS

### 1. Site Settings (Hero, About, Contact, Footer)
- Hero section: Title, subtitle, button text
- About section: Title and paragraphs
- Contact section: Title, subtitle, email
- Footer: Copyright text

### 2. Projects
- Title, description, date
- Tech stack, live URL, GitHub URL
- Thumbnail image
- Full markdown content

### 3. Services
- Title, description, icon
- Service items list
- Display order

### 4. Skills
- Skill categories
- Skills within each category

### 5. Testimonials
- Name, role, company
- Quote text
- Display order

---

## CMS Setup Steps

### Step 1: Enable Netlify Identity

1. **Deploy to Netlify** (if not already deployed)
   - Connect your GitHub repository to Netlify
   - Netlify will auto-detect Vite and build settings

2. **Enable Identity**
   - Go to your Netlify site dashboard
   - Navigate to **Site settings** → **Identity**
   - Click **Enable Identity**

3. **Configure Registration**
   - Under **Registration preferences**, select **Invite only**
   - This prevents unauthorized access to your CMS

4. **Enable Git Gateway**
   - Scroll down to **Services** → **Git Gateway**
   - Click **Enable Git Gateway**
   - This allows CMS to commit changes to your repository

### Step 2: Invite Users

1. Go to **Identity** tab in Netlify dashboard
2. Click **Invite users**
3. Enter your email address
4. Check your email and accept the invitation
5. Set your password

### Step 3: Access the CMS

1. Visit: `https://your-site.netlify.app/admin/`
2. Click **Login with Netlify Identity**
3. Enter your credentials
4. You're in! Start editing content

---

## CMS Interface Guide

### Collections Overview

**Site Settings**
- Edit global content (Hero, About, Contact, Footer)
- Changes apply site-wide

**Projects**
- Add/edit/delete project entries
- Upload project thumbnails
- Write detailed descriptions in markdown

**Services**
- Manage service offerings
- Choose from predefined icons
- Control display order

**Skills**
- Organize skills by category
- Add/remove skills easily

**Testimonials**
- Add client testimonials
- Control display order

### Adding New Content

1. Select a collection from the sidebar
2. Click **New [Collection Name]**
3. Fill in all required fields
4. Click **Publish** (top right)
5. Changes will be committed to your repository
6. Site will rebuild automatically

### Editing Existing Content

1. Select a collection
2. Click on the item you want to edit
3. Make your changes
4. Click **Publish**

### Uploading Images

1. Click on an image field
2. Click **Choose an image**
3. Upload from your computer or select from media library
4. Images are stored in `public/img/`

---

## Local Development with CMS

### Option 1: Use Netlify Identity (Recommended)
- Access CMS at `http://localhost:5173/admin/`
- Login with your Netlify Identity credentials
- Changes commit directly to your repository

### Option 2: Local Backend (For Testing)

1. Install Decap CMS Proxy Server:
```bash
npx decap-server
```

2. Update `public/admin/config.yml` temporarily:
```yaml
# Add this at the top for local development
local_backend: true
```

3. Start your dev server:
```bash
npm run dev
```

4. Access CMS at `http://localhost:5173/admin/`
5. No authentication needed in local mode

**Important:** Remove `local_backend: true` before deploying to production!

---

## Content File Structure

```
src/content/
├── site/
│   └── settings.json          # Hero, About, Contact, Footer
├── projects/
│   ├── ecommerce.md
│   └── travel.md
├── services/
│   ├── ui-ux-design.json
│   └── frontend-development.json
├── skills/
│   └── skills.json
└── testimonials/
    ├── alex-morgan.json
    └── sarah-chen.json
```

---

## Troubleshooting

### CMS Not Loading
- Check if Identity is enabled in Netlify
- Verify Git Gateway is enabled
- Clear browser cache and try again

### Can't Login
- Make sure you accepted the email invitation
- Check if you're using the correct email
- Try password reset from login page

### Changes Not Appearing
- Wait 2-3 minutes for Netlify to rebuild
- Check build logs in Netlify dashboard
- Verify changes were committed to GitHub

### Images Not Showing
- Check image path in CMS (should be `/img/filename.jpg`)
- Verify image uploaded to `public/img/`
- Check browser console for 404 errors

---

## Best Practices

1. **Always use the CMS** for content changes (don't edit JSON/MD files directly)
2. **Optimize images** before uploading (recommended: < 500KB)
3. **Use descriptive filenames** for images (e.g., `project-ecommerce.jpg`)
4. **Test locally** before publishing major changes
5. **Keep backups** of important content
6. **Use the order field** to control display sequence

---

## Security Notes

- Keep your Netlify Identity credentials secure
- Use "Invite only" registration
- Regularly review Identity users in Netlify dashboard
- Enable 2FA on your Netlify account for extra security

---

## Need Help?

- Decap CMS Docs: https://decapcms.org/docs/
- Netlify Identity Docs: https://docs.netlify.com/visitor-access/identity/
- Check build logs in Netlify dashboard for errors
