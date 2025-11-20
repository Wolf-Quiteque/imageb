# 🚀 Quick Start Guide - ImageryByB CMS

## Installation (3 Steps)

### 1️⃣ Install Dependencies
```bash
npm install sharp
```

### 2️⃣ Configure Environment
Copy `env-template.txt` content to `.env.local` and fill in:
- MongoDB URI
- Admin credentials (username/password)
- Session secret (32+ random characters)
- Cloudflare R2 credentials
- Site URL

### 3️⃣ Initialize Database
Create MongoDB collections and indexes (see SETUP_COMPLETE.md for commands)

## Start Development
```bash
npm run dev
```

## Access Admin
```
http://localhost:3000/admin/login
```

## Quick Links
- **Admin Dashboard**: `/admin`
- **Content Editor**: `/admin/editor`
- **Gallery Manager**: `/admin/gallery`
- **Inquiries**: `/admin/inquiry`

## Admin Features
✅ Dashboard with real-time stats
✅ Content management (text, rich text, images)
✅ Gallery upload with auto-optimization
✅ Inquiry management with notes
✅ Analytics tracking

## Frontend Features  
✅ Contact form → saves to database
✅ Page view tracking
✅ Content fetching from CMS

## What's Working
- 37 files fully implemented
- All API routes functional
- Admin panel complete
- Frontend integration done
- Image optimization ready
- Cloud storage configured

## What You Need to Configure
1. MongoDB connection
2. R2 bucket credentials
3. Admin login credentials
4. Install Sharp package

## Files Reference
- **Setup Guide**: `SETUP_COMPLETE.md`
- **Full Implementation Details**: `CMS_IMPLEMENTATION_COMPLETE.md`
- **Environment Template**: `env-template.txt`
- **Original Guide**: `cms-implement.md`

## Database Collections
```
imagerybyb_ovation_content       # Site content
imagerybyb_ovation_gallery       # Gallery images
imagerybyb_ovation_inquiries     # Contact forms
imagerybyb_ovation_analytics     # Page views
imagerybyb_ovation_settings      # Site settings
```

## Common Tasks

### Add Content
1. Go to `/admin/editor`
2. Click section (e.g., "Hero")
3. Edit fields
4. Click "Save Changes"

### Upload Gallery Images
1. Go to `/admin/gallery`
2. Click "+ Upload Images"
3. Select files
4. Click "Upload"

### View Inquiries
1. Go to `/admin/inquiry`
2. Click any inquiry to view details
3. Update status or add notes

## Tech Stack
- Next.js 14.2.5
- React 18.3.1
- MongoDB 7.0
- Cloudflare R2
- Sharp (image processing)
- React Quill (rich text)

## Support
See `SETUP_COMPLETE.md` for detailed troubleshooting and configuration.
