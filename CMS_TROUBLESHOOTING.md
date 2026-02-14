# CMS Troubleshooting Guide

## Common Issues and Solutions

### 🔴 CMS Admin Page Not Loading

**Symptoms:**
- `/admin/` shows blank page
- "Failed to load config" error
- Infinite loading spinner

**Solutions:**

1. **Check if deployed to Netlify**
   - CMS requires Netlify Identity to work
   - Local development needs special setup (see below)

2. **Verify config file exists**
   ```bash
   # Check if file exists
   ls public/admin/config.yml
   ```

3. **Check browser console**
   - Open DevTools (F12)
   - Look for error messages
   - Common: CORS errors, 404 on config.yml

4. **Clear browser cache**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or use incognito mode

5. **Verify Netlify Identity script**
   - Check `public/admin/index.html` includes:
   ```html
   <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
   ```

---

### 🔴 Can't Login to CMS

**Symptoms:**
- "Login with Netlify Identity" button doesn't work
- "User not found" error
- Redirect loop

**Solutions:**

1. **Check Identity is enabled**
   - Go to Netlify dashboard
   - Site settings → Identity
   - Should show "Identity enabled"

2. **Verify you're invited**
   - Netlify dashboard → Identity tab
   - Check if your email is listed
   - If not, click "Invite users"

3. **Accept invitation email**
   - Check spam folder
   - Click link in email
   - Set password

4. **Try password reset**
   - Click "Forgot password?" on login page
   - Check email for reset link

5. **Check Git Gateway**
   - Site settings → Identity → Services
   - Git Gateway should be "Enabled"

6. **Use correct site URL**
   - Login at: `https://your-site.netlify.app/admin/`
   - Not: `http://localhost:5173/admin/` (unless using local backend)

---

### 🔴 Changes Not Saving

**Symptoms:**
- Click "Publish" but nothing happens
- "Failed to persist entry" error
- Changes disappear after refresh

**Solutions:**

1. **Check Git Gateway**
   - Site settings → Identity → Services → Git Gateway
   - Must be enabled

2. **Verify repository permissions**
   - Netlify needs write access to your repo
   - Check: Site settings → Build & deploy → Repository

3. **Check for validation errors**
   - Scroll through form
   - Look for red error messages
   - All required fields must be filled

4. **Check browser console**
   - Open DevTools (F12)
   - Look for API errors
   - Common: 401 Unauthorized, 403 Forbidden

5. **Try re-authenticating**
   - Logout from CMS
   - Login again
   - Try saving again

---

### 🔴 Images Not Uploading

**Symptoms:**
- Upload button doesn't work
- "Failed to upload" error
- Image shows broken link

**Solutions:**

1. **Check image size**
   - Max size: Usually 10MB
   - Compress large images before uploading

2. **Check image format**
   - Supported: JPG, PNG, GIF, WebP, SVG
   - Avoid: TIFF, BMP, PSD

3. **Verify media folder**
   - Check `public/admin/config.yml`:
   ```yaml
   media_folder: "public/img"
   public_folder: "/img"
   ```

4. **Check folder exists**
   ```bash
   mkdir -p public/img
   ```

5. **Check Git LFS (if using)**
   - Large files might need Git LFS
   - Usually not needed for portfolio images

---

### 🔴 Content Not Showing on Site

**Symptoms:**
- CMS shows content but site doesn't
- Old content still showing
- Blank sections

**Solutions:**

1. **Wait for rebuild**
   - Netlify takes 2-3 minutes to rebuild
   - Check: Deploys tab in Netlify dashboard

2. **Check build logs**
   - Netlify dashboard → Deploys → Latest deploy
   - Look for errors in build log

3. **Verify content files**
   - Check GitHub repository
   - Files should be in `src/content/`
   - Check file format (JSON vs Markdown)

4. **Clear browser cache**
   - Hard refresh: Ctrl+Shift+R
   - Or use incognito mode

5. **Check component is loading content**
   - Open browser console
   - Look for errors loading content files

6. **Verify file paths**
   - Content files must match CMS config
   - Check `folder` setting in `config.yml`

---

### 🔴 Local Development Issues

**Symptoms:**
- CMS doesn't work on localhost
- "Backend not found" error

**Solutions:**

**Option 1: Use Netlify Identity (Recommended)**
- Deploy to Netlify first
- Enable Identity and Git Gateway
- Access CMS at `http://localhost:5173/admin/`
- Login with Netlify credentials
- Changes commit directly to GitHub

**Option 2: Use Local Backend**

1. Install proxy server:
   ```bash
   npx decap-server
   ```

2. Add to `config.yml` (temporarily):
   ```yaml
   local_backend: true
   ```

3. Start dev server:
   ```bash
   npm run dev
   ```

4. Access CMS at `http://localhost:5173/admin/`

5. **IMPORTANT**: Remove `local_backend: true` before deploying!

---

### 🔴 Build Failures

**Symptoms:**
- Netlify deploy fails
- "Build failed" error
- Site not updating

**Solutions:**

1. **Check build logs**
   - Netlify dashboard → Deploys → Failed deploy
   - Read error messages

2. **Common build errors:**

   **Missing dependencies:**
   ```bash
   npm install
   git add package-lock.json
   git commit -m "Update dependencies"
   git push
   ```

   **Syntax errors:**
   - Check browser console
   - Run `npm run lint`
   - Fix errors and push

   **Import errors:**
   - Verify all imports exist
   - Check file paths are correct
   - Case-sensitive on Linux/Mac

3. **Test build locally:**
   ```bash
   npm run build
   ```
   - If fails locally, fix errors
   - If succeeds locally but fails on Netlify, check Node version

4. **Check Node version:**
   - Add to `netlify.toml`:
   ```toml
   [build.environment]
     NODE_VERSION = "20"
   ```

---

### 🔴 Form Submissions Not Working

**Symptoms:**
- Contact form doesn't submit
- No email notifications
- "Form not found" error

**Solutions:**

1. **Verify Netlify form attributes**
   - Form must have: `data-netlify="true"`
   - Hidden input: `<input type="hidden" name="form-name" value="contact" />`

2. **Check form name matches**
   - Form attribute: `name="contact"`
   - Hidden input: `value="contact"`
   - Must match exactly

3. **Deploy to see forms**
   - Forms only work on deployed site
   - Not on localhost

4. **Check form submissions**
   - Netlify dashboard → Forms tab
   - See all submissions here

5. **Set up notifications**
   - Forms → Form notifications
   - Add email notification

---

## 🔍 Debugging Checklist

When something isn't working, check these in order:

- [ ] Is site deployed to Netlify?
- [ ] Is Netlify Identity enabled?
- [ ] Is Git Gateway enabled?
- [ ] Am I invited to Identity?
- [ ] Did I accept the invitation email?
- [ ] Am I using the correct URL?
- [ ] Did I wait for rebuild to complete?
- [ ] Did I check browser console for errors?
- [ ] Did I check Netlify build logs?
- [ ] Did I try clearing browser cache?
- [ ] Did I try incognito mode?

---

## 🛠️ Useful Commands

```bash
# Check if content files exist
ls -la src/content/

# Test build locally
npm run build

# Preview production build
npm run preview

# Check for syntax errors
npm run lint

# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📊 Checking Netlify Status

### Identity Status
1. Netlify dashboard → Site settings → Identity
2. Should show: "Identity enabled"
3. Check: Registration preferences = "Invite only"

### Git Gateway Status
1. Site settings → Identity → Services
2. Should show: "Git Gateway enabled"

### Build Status
1. Netlify dashboard → Deploys
2. Latest deploy should be "Published"
3. If failed, click to see logs

### Form Status
1. Netlify dashboard → Forms
2. Should show "contact" form
3. Check submissions here

---

## 🆘 Still Having Issues?

### Check These Resources

1. **Decap CMS Docs**
   - https://decapcms.org/docs/
   - Common issues section

2. **Netlify Docs**
   - https://docs.netlify.com/
   - Identity documentation
   - Git Gateway documentation

3. **Browser Console**
   - Press F12
   - Check Console tab
   - Look for red errors

4. **Netlify Build Logs**
   - Deploys → Latest deploy
   - Scroll through entire log
   - Look for errors

5. **GitHub Repository**
   - Check if CMS commits are appearing
   - Verify file structure matches config

---

## 💡 Pro Tips

1. **Always test locally first**
   ```bash
   npm run build
   npm run preview
   ```

2. **Use browser DevTools**
   - Network tab shows failed requests
   - Console shows JavaScript errors

3. **Check Git commits**
   - CMS creates commits when you publish
   - Check GitHub for these commits

4. **Keep dependencies updated**
   ```bash
   npm update
   ```

5. **Use meaningful commit messages**
   - Helps track changes
   - Easier to debug issues

6. **Backup before major changes**
   ```bash
   git clone https://github.com/yourusername/repo.git backup
   ```

---

## 📞 Getting Help

If you're still stuck:

1. Check error messages carefully
2. Search error message on Google
3. Check Decap CMS GitHub issues
4. Check Netlify community forums
5. Review all documentation guides in this repo

Remember: Most issues are configuration-related and can be fixed by carefully following the setup guides!
