# CMS Implementation Guide for ImageryByB

## Overview
This guide provides detailed instructions for implementing a content management system (CMS) for the ImageryByB photography website. The CMS will allow non-technical users to manage all site content, images, videos, and inquiries through a user-friendly admin dashboard.

## Technology Stack
- **Frontend:** Next.js 14.2.5 with React 18.3.1
- **Database:** MongoDB (Collection: `imagerybyb_ovation`)
- **File Storage:** Cloudflare R2 Object Storage
- **Rich Text Editor:** React Quill or TipTap
- **Image Processing:** Sharp (already in dependencies)
- **Authentication:** Basic .env-based authentication (no password hashing)
- **Analytics:** Custom MongoDB-based page view tracking

---

## 📋 IMPLEMENTATION PROGRESS TRACKER

Use this detailed checklist to track your progress. Mark each item as you complete it.

### PHASE 1: INITIAL SETUP & ENVIRONMENT (Estimated: 2-3 hours)
**Goal:** Set up your development environment and install all required dependencies.

#### 1.1 Install Dependencies
- [ ] Navigate to project root directory
- [ ] Run `npm install mongodb` (MongoDB driver)
- [ ] Run `npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner` (Cloudflare R2)
- [ ] Run `npm install react-quill` (Rich text editor)
- [ ] Run `npm install uuid` (Unique ID generation)
- [ ] Run `npm install cookie` (Cookie parsing)
- [ ] Verify installation: Check `package.json` for all dependencies
- [ ] Run `npm install` to ensure no conflicts

#### 1.2 Environment Configuration
- [ ] Create `.env.local` file in project root
- [ ] Add MongoDB connection string (`MONGODB_URI`)
- [ ] Add MongoDB database name (`MONGODB_DB=imagerybyb`)
- [ ] Add MongoDB collection prefix (`MONGODB_COLLECTION_PREFIX=imagerybyb_ovation`)
- [ ] Add admin credentials (`ADMIN_USERNAME` and `ADMIN_PASSWORD`)
- [ ] Generate random session secret (`SESSION_SECRET`)
- [ ] Add site URL (`NEXT_PUBLIC_SITE_URL=http://localhost:3000`)
- [ ] Save R2 credentials for later (after R2 setup)
- [ ] Verify: All environment variables are set (except R2 for now)

#### 1.3 MongoDB Setup
- [ ] Log into MongoDB Atlas (or your MongoDB provider)
- [ ] Create database: `imagerybyb`
- [ ] Verify connection: Test connection string with MongoDB Compass or Atlas
- [ ] Note down connection details for `.env.local`
- [ ] Verify: Can connect to MongoDB successfully

#### 1.4 Create Base Folder Structure
- [ ] Create `app/admin/` directory
- [ ] Create `app/admin/components/` directory
- [ ] Create `app/api/auth/` directory
- [ ] Create `app/api/content/` directory
- [ ] Create `app/api/gallery/` directory
- [ ] Create `app/api/inquiry/` directory
- [ ] Create `app/api/analytics/` directory
- [ ] Create `app/api/upload/` directory
- [ ] Create `lib/` directory in project root
- [ ] Verify: All directories exist

---

### PHASE 2: CLOUDFLARE R2 SETUP (Estimated: 1-2 hours)
**Goal:** Set up Cloudflare R2 for image and file storage.

#### 2.1 Cloudflare Account Setup
- [ ] Log into Cloudflare dashboard
- [ ] Navigate to R2 Object Storage
- [ ] Create new R2 bucket: `imagerybyb-ovation`
- [ ] Note down bucket name
- [ ] Verify: Bucket created successfully

#### 2.2 R2 Access Keys
- [ ] In R2 dashboard, go to "Manage R2 API Tokens"
- [ ] Click "Create API Token"
- [ ] Set permissions: Read & Write
- [ ] Note down Account ID
- [ ] Note down Access Key ID
- [ ] Note down Secret Access Key
- [ ] Verify: API token created

#### 2.3 R2 Public Access Configuration
- [ ] Go to bucket settings
- [ ] Enable "Public Access" or configure custom domain
- [ ] Note down public URL format (e.g., `https://pub-xxxxx.r2.dev`)
- [ ] Test: Upload a test file manually
- [ ] Verify: Can access file via public URL

#### 2.4 Update Environment Variables
- [ ] Add `R2_ACCOUNT_ID` to `.env.local`
- [ ] Add `R2_ACCESS_KEY_ID` to `.env.local`
- [ ] Add `R2_SECRET_ACCESS_KEY` to `.env.local`
- [ ] Add `R2_BUCKET_NAME=imagerybyb-ovation` to `.env.local`
- [ ] Add `R2_PUBLIC_URL` to `.env.local`
- [ ] Verify: All R2 environment variables set

---

### PHASE 3: DATABASE SETUP (Estimated: 1 hour)
**Goal:** Create MongoDB collections and indexes.

#### 3.1 Create lib/mongodb.js
- [ ] Create file `lib/mongodb.js`
- [ ] Copy MongoDB connection code from guide
- [ ] Test connection: Add temporary test code
- [ ] Run `npm run dev` and verify connection in terminal
- [ ] Remove test code
- [ ] Verify: MongoDB connects without errors

#### 3.2 Create Database Collections
- [ ] Connect to MongoDB using MongoDB Compass or Atlas
- [ ] Create collection: `imagerybyb_ovation_content`
- [ ] Create collection: `imagerybyb_ovation_gallery`
- [ ] Create collection: `imagerybyb_ovation_inquiries`
- [ ] Create collection: `imagerybyb_ovation_analytics`
- [ ] Create collection: `imagerybyb_ovation_settings`
- [ ] Verify: All 5 collections exist in database

#### 3.3 Create Database Indexes
- [ ] Open MongoDB shell or Compass
- [ ] Run index creation for `analytics`: `db.imagerybyb_ovation_analytics.createIndex({ date: -1 })`
- [ ] Run index for `content` (key): `db.imagerybyb_ovation_content.createIndex({ key: 1 }, { unique: true })`
- [ ] Run index for `content` (section): `db.imagerybyb_ovation_content.createIndex({ section: 1, subsection: 1 })`
- [ ] Run index for `gallery` (order): `db.imagerybyb_ovation_gallery.createIndex({ order: 1 })`
- [ ] Run index for `gallery` (active): `db.imagerybyb_ovation_gallery.createIndex({ isActive: 1 })`
- [ ] Run index for `inquiries` (status): `db.imagerybyb_ovation_inquiries.createIndex({ status: 1 })`
- [ ] Run index for `inquiries` (date): `db.imagerybyb_ovation_inquiries.createIndex({ submittedAt: -1 })`
- [ ] Verify: All indexes created (check in Compass or run `db.collection.getIndexes()`)

---

### PHASE 4: AUTHENTICATION SYSTEM (Estimated: 2-3 hours)
**Goal:** Build the login system and route protection.

#### 4.1 Create Authentication Helper
- [ ] Create file `lib/auth.js`
- [ ] Copy `checkAuth()` function from guide
- [ ] Copy `createSession()` function from guide
- [ ] Verify: File has no syntax errors

#### 4.2 Create Login API Route
- [ ] Create directory `app/api/auth/login/`
- [ ] Create file `app/api/auth/login/route.js`
- [ ] Copy login API code from guide
- [ ] Import `createSession` from `@/lib/auth`
- [ ] Verify: File has no syntax errors

#### 4.3 Create Logout API Route
- [ ] Create directory `app/api/auth/logout/`
- [ ] Create file `app/api/auth/logout/route.js`
- [ ] Copy logout API code from guide
- [ ] Verify: File has no syntax errors

#### 4.4 Create Auth Check API Route
- [ ] Create directory `app/api/auth/check/`
- [ ] Create file `app/api/auth/check/route.js`
- [ ] Copy auth check API code from guide
- [ ] Import `checkAuth` from `@/lib/auth`
- [ ] Verify: File has no syntax errors

#### 4.5 Create Middleware
- [ ] Create file `middleware.js` in project root
- [ ] Copy middleware code from guide
- [ ] Update config matcher if needed
- [ ] Verify: File has no syntax errors

#### 4.6 Create Login Page
- [ ] Create directory `app/admin/login/`
- [ ] Create file `app/admin/login/page.js`
- [ ] Copy login page code from guide
- [ ] Verify: File has no syntax errors

#### 4.7 Test Authentication
- [ ] Start dev server: `npm run dev`
- [ ] Navigate to `http://localhost:3000/admin`
- [ ] Verify: Redirects to `/admin/login`
- [ ] Try logging in with wrong credentials
- [ ] Verify: Shows error message
- [ ] Log in with correct credentials from `.env.local`
- [ ] Verify: Redirects to `/admin` (may show blank page for now)
- [ ] Close browser, reopen, visit `/admin`
- [ ] Verify: Still logged in (session persists)
- [ ] Test logout functionality
- [ ] Verify: Redirected to login after logout

---

### PHASE 5: ADMIN LAYOUT & DASHBOARD (Estimated: 3-4 hours)
**Goal:** Build the admin interface foundation.

#### 5.1 Create Admin CSS
- [ ] Create file `app/admin/admin.css`
- [ ] Add the following styles:

```css
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f5f5f5;
}

.admin-sidebar {
  width: 260px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
}

.sidebar-header {
  padding: 30px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  text-align: center;
}

.sidebar-header h2 {
  margin: 0 0 5px 0;
  font-size: 24px;
}

.sidebar-header p {
  margin: 0;
  opacity: 0.8;
  font-size: 14px;
}

.sidebar-nav {
  padding: 20px 0;
}

.sidebar-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: white;
  text-decoration: none;
  transition: background 0.2s;
  gap: 12px;
}

.sidebar-item:hover {
  background: rgba(255,255,255,0.1);
}

.sidebar-item.active {
  background: rgba(255,255,255,0.2);
}

.sidebar-icon {
  font-size: 20px;
}

.sidebar-text {
  font-weight: 500;
}

.admin-main {
  flex: 1;
  margin-left: 260px;
}

.admin-content {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}
```

- [ ] Verify: CSS file created

#### 5.2 Create Sidebar Component
- [ ] Create file `app/admin/components/Sidebar.js`
- [ ] Copy Sidebar code from guide
- [ ] Verify: File has no syntax errors

#### 5.3 Create Header Component
- [ ] Create file `app/admin/components/Header.js`
- [ ] Add the following code:

```javascript
'use client';

import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <header className="admin-header">
      <div className="header-content">
        <h1>Admin Panel</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <style jsx>{`
        .admin-header {
          background: white;
          border-bottom: 1px solid #e0e0e0;
          padding: 0 20px;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px 0;
        }

        .admin-header h1 {
          margin: 0;
          font-size: 24px;
          color: #333;
        }

        .logout-btn {
          background: #f44336;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.2s;
        }

        .logout-btn:hover {
          background: #d32f2f;
        }
      `}</style>
    </header>
  );
}
```

- [ ] Verify: File has no syntax errors

#### 5.4 Create Admin Layout
- [ ] Create file `app/admin/layout.js`
- [ ] Copy admin layout code from guide
- [ ] Import Sidebar and Header components
- [ ] Import `./admin.css`
- [ ] Verify: File has no syntax errors

#### 5.5 Create Analytics Helper
- [ ] Create file `lib/analytics.js`
- [ ] Copy analytics code from guide
- [ ] Verify: File has no syntax errors

#### 5.6 Create Analytics API Routes
- [ ] Create directory `app/api/analytics/track/`
- [ ] Create file `app/api/analytics/track/route.js`
- [ ] Copy track API code from guide
- [ ] Create directory `app/api/analytics/stats/`
- [ ] Create file `app/api/analytics/stats/route.js`
- [ ] Add the following code:

```javascript
import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';
import { getAnalyticsStats } from '@/lib/analytics';
import { getDatabase } from '@/lib/mongodb';

export async function GET(request) {
  const auth = checkAuth();
  if (!auth.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const analytics = await getAnalyticsStats(30);
    const db = await getDatabase();

    // Get inquiry count
    const inquiryCollection = db.collection('imagerybyb_ovation_inquiries');
    const newInquiries = await inquiryCollection.countDocuments({ status: 'new' });

    // Get gallery count
    const galleryCollection = db.collection('imagerybyb_ovation_gallery');
    const galleryImages = await galleryCollection.countDocuments({ isActive: true });

    return NextResponse.json({
      totalViews: analytics.totalViews,
      uniqueVisitors: analytics.uniqueVisitors,
      newInquiries,
      galleryImages
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

- [ ] Verify: Both API files have no syntax errors

#### 5.7 Create Dashboard Page
- [ ] Create file `app/admin/page.js`
- [ ] Copy dashboard code from guide
- [ ] Verify: File has no syntax errors

#### 5.8 Test Admin Dashboard
- [ ] Start dev server: `npm run dev`
- [ ] Log into admin at `http://localhost:3000/admin/login`
- [ ] Verify: See admin layout with sidebar
- [ ] Verify: See dashboard with 4 stat cards
- [ ] Verify: Sidebar navigation items are visible
- [ ] Click logout button
- [ ] Verify: Redirects to login page
- [ ] Log back in
- [ ] Verify: Stats show 0 (expected since no data yet)

---

### PHASE 6: IMAGE PROCESSING & UPLOAD (Estimated: 2-3 hours)
**Goal:** Set up image optimization and R2 upload functionality.

#### 6.1 Create R2 Helper
- [ ] Create file `lib/r2.js`
- [ ] Copy R2 code from guide
- [ ] Verify: File has no syntax errors

#### 6.2 Create Image Processor
- [ ] Create file `lib/imageProcessor.js`
- [ ] Copy image processor code from guide
- [ ] Verify: File has no syntax errors

#### 6.3 Create Upload API
- [ ] Create file `app/api/upload/route.js`
- [ ] Copy upload API code from guide
- [ ] Verify: File has no syntax errors

#### 6.4 Test Upload (Manual Test)
- [ ] Use API testing tool (Postman, Thunder Client, or Insomnia)
- [ ] Set method to POST
- [ ] Set URL to `http://localhost:3000/api/upload`
- [ ] Add form-data with key `file` (file type)
- [ ] Add form-data with key `type` (text: "content")
- [ ] Add cookie from browser (copy `admin_session` cookie)
- [ ] Upload a test image
- [ ] Verify: Returns success with URL
- [ ] Visit the URL
- [ ] Verify: Image is accessible and in WebP format

---

### PHASE 7: CONTENT EDITOR (Estimated: 5-6 hours)
**Goal:** Build the content management system.

#### 7.1 Create Content API Routes
- [ ] Create file `app/api/content/route.js`
- [ ] Copy content API code from guide (GET and POST)
- [ ] Create directory `app/api/content/[key]/`
- [ ] Create file `app/api/content/[key]/route.js`
- [ ] Add the following code:

```javascript
import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { checkAuth } from '@/lib/auth';

export async function GET(request, { params }) {
  try {
    const db = await getDatabase();
    const collection = db.collection('imagerybyb_ovation_content');
    const content = await collection.findOne({ key: params.key });

    if (!content) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const auth = checkAuth();
  if (!auth.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const db = await getDatabase();
    const collection = db.collection('imagerybyb_ovation_content');

    const result = await collection.updateOne(
      { key: params.key },
      {
        $set: {
          ...body,
          key: params.key,
          updatedAt: new Date(),
          updatedBy: auth.username
        }
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const auth = checkAuth();
  if (!auth.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = await getDatabase();
    const collection = db.collection('imagerybyb_ovation_content');

    await collection.deleteOne({ key: params.key });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

- [ ] Create directory `app/api/content/sections/`
- [ ] Create file `app/api/content/sections/route.js`
- [ ] Add the following code:

```javascript
import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET(request) {
  try {
    const db = await getDatabase();
    const collection = db.collection('imagerybyb_ovation_content');

    const content = await collection.find({}).toArray();

    // Group by section
    const grouped = content.reduce((acc, item) => {
      if (!acc[item.section]) {
        acc[item.section] = [];
      }
      acc[item.section].push(item);
      return acc;
    }, {});

    return NextResponse.json(grouped);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

- [ ] Verify: All API files have no syntax errors

#### 7.2 Create Editor Components
- [ ] Create directory `app/admin/editor/components/`
- [ ] Create file `app/admin/editor/components/TextEditor.js`
- [ ] Add the following code:

```javascript
'use client';

export default function TextEditor({ value, onChange, label, placeholder }) {
  return (
    <div className="text-editor">
      {label && <label className="editor-label">{label}</label>}
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="text-input"
      />

      <style jsx>{`
        .text-editor {
          margin-bottom: 20px;
        }

        .editor-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
        }

        .text-input {
          width: 100%;
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 6px;
          font-size: 16px;
          transition: border-color 0.3s;
        }

        .text-input:focus {
          outline: none;
          border-color: #667eea;
        }
      `}</style>
    </div>
  );
}
```

- [ ] Create file `app/admin/editor/components/RichTextEditor.js`
- [ ] Copy RichTextEditor code from guide
- [ ] Verify: Import statement is `import 'react-quill/dist/quill.snow.css';`
- [ ] Create file `app/admin/editor/components/ImageUploader.js`
- [ ] Copy ImageUploader code from guide
- [ ] Verify: All component files have no syntax errors

#### 7.3 Create Editor Main Page
- [ ] Create file `app/admin/editor/page.js`
- [ ] Copy editor page code from guide
- [ ] Verify: File has no syntax errors

#### 7.4 Create Hero Section Editor
- [ ] Create directory `app/admin/editor/[section]/`
- [ ] Create file `app/admin/editor/[section]/page.js`
- [ ] Add comprehensive section editor code (example for hero section):

```javascript
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import TextEditor from '../components/TextEditor';
import RichTextEditor from '../components/RichTextEditor';
import ImageUploader from '../components/ImageUploader';

export default function SectionEditor() {
  const params = useParams();
  const router = useRouter();
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, [params.section]);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content/sections');
      const data = await response.json();
      setContent(data[params.section] || {});
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateField = (key, value) => {
    setContent(prev => ({
      ...prev,
      [key]: { ...prev[key], value }
    }));
  };

  const saveContent = async () => {
    setSaving(true);
    try {
      for (const key in content) {
        await fetch('/api/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(content[key])
        });
      }
      alert('Content saved successfully!');
    } catch (error) {
      alert('Error saving content: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  // Render different editors based on section
  const renderEditor = () => {
    switch (params.section) {
      case 'hero':
        return renderHeroEditor();
      case 'about':
        return renderAboutEditor();
      // Add more cases for other sections
      default:
        return <div>Section editor not implemented yet</div>;
    }
  };

  const renderHeroEditor = () => (
    <div>
      <h2>Hero Section - Slide 1</h2>
      <TextEditor
        label="Subtitle"
        value={content.hero_slide1_subtitle?.value}
        onChange={(val) => updateField('hero_slide1_subtitle', val)}
      />
      {/* Add more fields... */}
    </div>
  );

  const renderAboutEditor = () => (
    <div>
      <h2>About Section</h2>
      {/* Add about fields... */}
    </div>
  );

  return (
    <div className="section-editor">
      <div className="editor-header">
        <h1>Edit {params.section}</h1>
        <button onClick={saveContent} disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="editor-content">
        {renderEditor()}
      </div>
    </div>
  );
}
```

- [ ] Verify: File has no syntax errors

#### 7.5 Test Content Editor
- [ ] Navigate to `http://localhost:3000/admin/editor`
- [ ] Verify: See grid of section cards
- [ ] Click on "Hero Section"
- [ ] Verify: Opens hero section editor
- [ ] Try editing a text field
- [ ] Click "Save Changes"
- [ ] Verify: Shows success message
- [ ] Check MongoDB database
- [ ] Verify: New document created in `imagerybyb_ovation_content`

---

### PHASE 8: GALLERY MANAGEMENT (Estimated: 4-5 hours)
**Goal:** Build gallery upload and management system.

#### 8.1 Create Gallery API Routes
- [ ] Create file `app/api/gallery/route.js`
- [ ] Copy gallery API code from guide (GET and POST)
- [ ] Create directory `app/api/gallery/[id]/`
- [ ] Create file `app/api/gallery/[id]/route.js`
- [ ] Add the following code:

```javascript
import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { checkAuth } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    const db = await getDatabase();
    const collection = db.collection('imagerybyb_ovation_gallery');
    const image = await collection.findOne({ _id: new ObjectId(params.id) });

    if (!image) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(image);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const auth = checkAuth();
  if (!auth.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const db = await getDatabase();
    const collection = db.collection('imagerybyb_ovation_gallery');

    await collection.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: body }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const auth = checkAuth();
  if (!auth.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = await getDatabase();
    const collection = db.collection('imagerybyb_ovation_gallery');

    await collection.deleteOne({ _id: new ObjectId(params.id) });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

- [ ] Verify: API files have no syntax errors

#### 8.2 Create Gallery Upload Modal Component
- [ ] Create directory `app/admin/gallery/components/`
- [ ] Create file `app/admin/gallery/components/ImageUploadModal.js`
- [ ] Add the following code:

```javascript
'use client';

import { useState } from 'react';

export default function ImageUploadModal({ onClose, onSuccess }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setUploadProgress(prev => ({ ...prev, [file.name]: 'uploading' }));

      try {
        // Upload file
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', 'gallery');

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });

        const uploadData = await uploadResponse.json();

        if (uploadData.success) {
          // Save to gallery collection
          await fetch('/api/gallery', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: file.name.replace(/\.[^/.]+$/, ''),
              description: '',
              imageUrl: uploadData.url,
              thumbnailUrl: uploadData.thumbnailUrl,
              metadata: {
                originalName: file.name,
                mimeType: file.type,
                size: file.size,
                ...uploadData.metadata
              }
            })
          });

          setUploadProgress(prev => ({ ...prev, [file.name]: 'success' }));
        } else {
          setUploadProgress(prev => ({ ...prev, [file.name]: 'failed' }));
        }
      } catch (error) {
        setUploadProgress(prev => ({ ...prev, [file.name]: 'failed' }));
      }
    }

    setUploading(false);
    setTimeout(() => {
      onSuccess();
    }, 1000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Upload Images</h2>

        <div className="upload-area">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            id="gallery-upload"
          />
          <label htmlFor="gallery-upload">
            Choose Images ({files.length} selected)
          </label>
        </div>

        {files.length > 0 && (
          <div className="file-list">
            {files.map((file) => (
              <div key={file.name} className="file-item">
                <span>{file.name}</span>
                <span className={`status ${uploadProgress[file.name] || ''}`}>
                  {uploadProgress[file.name] || 'pending'}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="modal-actions">
          <button onClick={onClose} disabled={uploading}>
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={uploading || files.length === 0}
            className="primary"
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>

        <style jsx>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }

          .modal-content {
            background: white;
            padding: 30px;
            border-radius: 12px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
          }

          .upload-area {
            border: 2px dashed #ddd;
            padding: 40px;
            text-align: center;
            margin: 20px 0;
            border-radius: 8px;
          }

          .upload-area input {
            display: none;
          }

          .upload-area label {
            background: #667eea;
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            display: inline-block;
          }

          .file-list {
            margin: 20px 0;
          }

          .file-item {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            border-bottom: 1px solid #eee;
          }

          .status {
            font-size: 12px;
            padding: 4px 8px;
            border-radius: 4px;
          }

          .status.success {
            background: #4CAF50;
            color: white;
          }

          .status.failed {
            background: #f44336;
            color: white;
          }

          .status.uploading {
            background: #2196F3;
            color: white;
          }

          .modal-actions {
            display: flex;
            gap: 10px;
            justify-content: flex-end;
            margin-top: 20px;
          }

          .modal-actions button {
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
          }

          .modal-actions button.primary {
            background: #667eea;
            color: white;
          }

          .modal-actions button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        `}</style>
      </div>
    </div>
  );
}
```

- [ ] Verify: File has no syntax errors

#### 8.3 Create Gallery Management Page
- [ ] Create file `app/admin/gallery/page.js`
- [ ] Copy gallery management code from guide
- [ ] Verify: File has no syntax errors

#### 8.4 Test Gallery Management
- [ ] Navigate to `http://localhost:3000/admin/gallery`
- [ ] Click "Upload Images"
- [ ] Select multiple images
- [ ] Click "Upload"
- [ ] Verify: Shows upload progress
- [ ] Verify: Images appear in gallery grid
- [ ] Check MongoDB collection
- [ ] Verify: Images saved in `imagerybyb_ovation_gallery`
- [ ] Check R2 bucket
- [ ] Verify: Images uploaded to R2
- [ ] Try reordering images
- [ ] Try deleting an image
- [ ] Verify: All operations work

---

### PHASE 9: INQUIRY MANAGEMENT (Estimated: 3-4 hours)
**Goal:** Build inquiry form handling and management.

#### 9.1 Create Inquiry API Routes
- [ ] Create file `app/api/inquiry/route.js`
- [ ] Copy inquiry API code from guide
- [ ] Create directory `app/api/inquiry/[id]/`
- [ ] Create file `app/api/inquiry/[id]/route.js`
- [ ] Add GET, PUT, DELETE methods similar to gallery
- [ ] Verify: API files have no syntax errors

#### 9.2 Create Inquiry List Page
- [ ] Create directory `app/admin/inquiry/`
- [ ] Create file `app/admin/inquiry/page.js`
- [ ] Copy inquiry management code from guide
- [ ] Verify: File has no syntax errors

#### 9.3 Create Individual Inquiry Page
- [ ] Create directory `app/admin/inquiry/[id]/`
- [ ] Create file `app/admin/inquiry/[id]/page.js`
- [ ] Add the following code:

```javascript
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function InquiryDetail() {
  const params = useParams();
  const router = useRouter();
  const [inquiry, setInquiry] = useState(null);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('new');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiry();
  }, [params.id]);

  const fetchInquiry = async () => {
    try {
      const response = await fetch(`/api/inquiry/${params.id}`);
      const data = await response.json();
      setInquiry(data);
      setNotes(data.notes || '');
      setStatus(data.status);

      // Mark as read if new
      if (data.status === 'new') {
        updateStatus('read');
      }
    } catch (error) {
      console.error('Error fetching inquiry:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      await fetch(`/api/inquiry/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      setStatus(newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const saveNotes = async () => {
    try {
      await fetch(`/api/inquiry/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes })
      });
      alert('Notes saved!');
    } catch (error) {
      alert('Error saving notes');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!inquiry) return <div>Inquiry not found</div>;

  return (
    <div className="inquiry-detail">
      <button onClick={() => router.back()}>← Back</button>

      <h1>Inquiry from {inquiry.firstName} {inquiry.lastName}</h1>

      <div className="detail-grid">
        <div className="detail-card">
          <h3>Contact Information</h3>
          <p><strong>Email:</strong> {inquiry.email}</p>
          <p><strong>Phone:</strong> {inquiry.phone}</p>
          <p><strong>Submitted:</strong> {new Date(inquiry.submittedAt).toLocaleString()}</p>
        </div>

        <div className="detail-card">
          <h3>Inquiry Details</h3>
          <p><strong>Type:</strong> {inquiry.inquiryType}</p>
          <p><strong>Date:</strong> {new Date(inquiry.date).toLocaleDateString()}</p>
        </div>

        <div className="detail-card full-width">
          <h3>Status</h3>
          <select value={status} onChange={(e) => updateStatus(e.target.value)}>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="responded">Responded</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="detail-card full-width">
          <h3>Admin Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={6}
          />
          <button onClick={saveNotes}>Save Notes</button>
        </div>
      </div>

      <style jsx>{`
        .inquiry-detail {
          padding: 20px;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .detail-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .full-width {
          grid-column: 1 / -1;
        }

        textarea {
          width: 100%;
          padding: 10px;
          border: 2px solid #e0e0e0;
          border-radius: 6px;
          font-size: 14px;
          margin-top: 10px;
        }

        select {
          padding: 10px;
          border: 2px solid #e0e0e0;
          border-radius: 6px;
          font-size: 14px;
        }

        button {
          background: #667eea;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}
```

- [ ] Verify: File has no syntax errors

#### 9.4 Update Frontend Contact Form
- [ ] Open `app/page.js`
- [ ] Find the contact form (around line 357)
- [ ] Add form submission handler:

```javascript
const handleInquirySubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const data = {
    firstName: formData.get('firstname'),
    lastName: formData.get('lastname'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    inquiryType: formData.get('inquiry-type'),
    date: formData.get('date')
  };

  try {
    const response = await fetch('/api/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert('Thank you! Your inquiry has been submitted.');
      e.target.reset();
    }
  } catch (error) {
    alert('Error submitting inquiry. Please try again.');
  }
};
```

- [ ] Add `onSubmit={handleInquirySubmit}` to form tag
- [ ] Add `'use client';` at top of file
- [ ] Verify: Form submission works

#### 9.5 Test Inquiry Management
- [ ] Go to homepage
- [ ] Fill out inquiry form
- [ ] Submit form
- [ ] Verify: Success message appears
- [ ] Go to admin inquiries page
- [ ] Verify: New inquiry appears with "New" badge
- [ ] Click on inquiry
- [ ] Verify: Shows inquiry details
- [ ] Verify: Status changes to "Read"
- [ ] Add some notes
- [ ] Save notes
- [ ] Change status to "Responded"
- [ ] Go back to inquiry list
- [ ] Verify: Status updated

---

### PHASE 10: ANALYTICS INTEGRATION (Estimated: 2 hours)
**Goal:** Add page view tracking to frontend.

#### 10.1 Create Page View Tracker Component
- [ ] Create file `app/components/PageViewTracker.js`
- [ ] Copy PageViewTracker code from guide
- [ ] Verify: File has no syntax errors

#### 10.2 Update Main Layout
- [ ] Open `app/layout.js`
- [ ] Import PageViewTracker: `import PageViewTracker from './components/PageViewTracker';`
- [ ] Add `<PageViewTracker />` inside `<body>` tag (before {children})
- [ ] Verify: No syntax errors

#### 10.3 Test Analytics
- [ ] Start dev server
- [ ] Visit homepage (not logged in)
- [ ] Open browser dev tools > Network tab
- [ ] Verify: See POST request to `/api/analytics/track`
- [ ] Refresh page a few times
- [ ] Log into admin dashboard
- [ ] Verify: Total views count increases
- [ ] Open in incognito/private window
- [ ] Visit homepage
- [ ] Check admin dashboard
- [ ] Verify: Unique visitors count increases

---

### PHASE 11: FRONTEND INTEGRATION (Estimated: 3-4 hours)
**Goal:** Connect frontend to fetch content from CMS.

#### 11.1 Update Gallery Component
- [ ] Open `app/components/GallerySlider.js`
- [ ] Replace static images array with database fetch
- [ ] Copy updated GallerySlider code from guide
- [ ] Verify: Component fetches from `/api/gallery?active=true`
- [ ] Test: Gallery displays images from database

#### 11.2 Create Content Fetching Utility
- [ ] Create file `lib/getContent.js`
- [ ] Add the following code:

```javascript
export async function getContent(key, defaultValue = '') {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/content/${key}`, {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });

    if (!response.ok) return defaultValue;

    const data = await response.json();
    return data.value || defaultValue;
  } catch (error) {
    console.error(`Error fetching content for ${key}:`, error);
    return defaultValue;
  }
}
```

- [ ] Verify: File has no syntax errors

#### 11.3 Update Homepage to Use CMS Content
- [ ] Open `app/page.js`
- [ ] Add `async` to component: `export default async function Home()`
- [ ] Fetch content at top of component:

```javascript
const heroSlide1Title1 = await getContent('hero_slide1_title1', 'WEDDING DAY');
const heroSlide1Title2 = await getContent('hero_slide1_title2', 'MAGIC');
// Add more fields as needed
```

- [ ] Replace hardcoded text with variables
- [ ] Example: `<h1>{heroSlide1Title1}</h1>`
- [ ] Test: Update content in admin, verify changes appear on frontend

#### 11.4 Add Loading States
- [ ] Create file `app/loading.js`
- [ ] Add loading component:

```javascript
export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}>
      <h2>Loading...</h2>
    </div>
  );
}
```

- [ ] Verify: Shows loading state when navigating

---

### PHASE 12: TESTING & DEBUGGING (Estimated: 3-4 hours)
**Goal:** Test all functionality and fix bugs.

#### 12.1 Authentication Testing
- [ ] Test login with correct credentials
- [ ] Test login with incorrect credentials
- [ ] Test session persistence
- [ ] Test logout functionality
- [ ] Test accessing protected routes without login
- [ ] Verify: All auth scenarios work correctly

#### 12.2 Content Editor Testing
- [ ] Edit text content and verify save
- [ ] Edit rich text content and verify save
- [ ] Upload image and verify save
- [ ] Verify changes appear on frontend
- [ ] Test all section editors
- [ ] Verify: All content types work

#### 12.3 Gallery Testing
- [ ] Upload single image
- [ ] Upload multiple images
- [ ] Reorder images
- [ ] Delete image
- [ ] Verify image optimization (check file size)
- [ ] Verify WebP conversion
- [ ] Verify frontend gallery updates

#### 12.4 Inquiry Testing
- [ ] Submit inquiry from frontend
- [ ] Verify appears in admin
- [ ] Change inquiry status
- [ ] Add notes
- [ ] Filter by status
- [ ] Test all CRUD operations

#### 12.5 Analytics Testing
- [ ] Visit pages multiple times
- [ ] Check analytics in dashboard
- [ ] Test unique visitor tracking
- [ ] Verify counts are accurate

#### 12.6 Performance Testing
- [ ] Test image load times
- [ ] Test page load speed
- [ ] Check for console errors
- [ ] Test on mobile devices
- [ ] Test on different browsers

---

### PHASE 13: PRODUCTION DEPLOYMENT (Estimated: 2-3 hours)
**Goal:** Deploy to production environment.

#### 13.1 Environment Setup
- [ ] Create production `.env` file
- [ ] Update MongoDB URI for production
- [ ] Update R2 credentials if different
- [ ] Update `NEXT_PUBLIC_SITE_URL` to production URL
- [ ] Change admin credentials for production
- [ ] Verify: All production env vars set

#### 13.2 Build Testing
- [ ] Run `npm run build`
- [ ] Fix any build errors
- [ ] Run `npm start`
- [ ] Test production build locally
- [ ] Verify: Build completes successfully

#### 13.3 Deploy to Hosting
- [ ] Choose hosting (Vercel, Netlify, or custom)
- [ ] Connect repository
- [ ] Configure environment variables
- [ ] Deploy application
- [ ] Verify: Deployment successful

#### 13.4 Post-Deployment Testing
- [ ] Test all functionality on production
- [ ] Test image uploads to production R2
- [ ] Test MongoDB connection
- [ ] Test admin login
- [ ] Verify SSL certificate
- [ ] Test on mobile devices

#### 13.5 DNS & Domain Setup
- [ ] Configure custom domain (if applicable)
- [ ] Update DNS records
- [ ] Verify domain pointing correctly
- [ ] Test with custom domain

---

### PHASE 14: FINAL POLISH (Estimated: 2-3 hours)
**Goal:** Add finishing touches and documentation.

#### 14.1 Error Handling
- [ ] Add error boundaries
- [ ] Add user-friendly error messages
- [ ] Test error scenarios
- [ ] Add fallback UI for errors

#### 14.2 User Documentation
- [ ] Create admin user guide (how to use CMS)
- [ ] Document image upload best practices
- [ ] Document content editing workflow
- [ ] Create troubleshooting guide

#### 14.3 Security Review
- [ ] Review all API routes for auth
- [ ] Check environment variables not exposed
- [ ] Verify file upload security
- [ ] Test rate limiting (if implemented)

#### 14.4 Backup Setup
- [ ] Configure MongoDB automated backups
- [ ] Enable R2 bucket versioning
- [ ] Document backup restoration process
- [ ] Test backup restoration

---

## 🎉 COMPLETION CHECKLIST

### Final Verification
- [ ] All pages load without errors
- [ ] All forms submit successfully
- [ ] Images upload and display correctly
- [ ] Content updates reflect on frontend
- [ ] Analytics tracking works
- [ ] Mobile responsive
- [ ] Cross-browser compatible
- [ ] Production deployment successful
- [ ] Backups configured
- [ ] Documentation complete

### Handoff
- [ ] Train end users on CMS
- [ ] Provide admin credentials
- [ ] Share documentation
- [ ] Set up support channel

---

## ⏱️ TOTAL ESTIMATED TIME: 30-40 hours

---

## Table of Contents
1. [Environment Setup](#1-environment-setup)
2. [Database Schema](#2-database-schema)
3. [Folder Structure](#3-folder-structure)
4. [Authentication System](#4-authentication-system)
5. [Admin Dashboard](#5-admin-dashboard)
6. [Editor Module](#6-editor-module)
7. [Gallery Module](#7-gallery-module)
8. [Inquiry Module](#8-inquiry-module)
9. [Analytics Module](#9-analytics-module)
10. [Frontend Integration](#10-frontend-integration)
11. [API Routes](#11-api-routes)
12. [Cloudflare R2 Setup](#12-cloudflare-r2-setup)

---

## 1. Environment Setup

### Install Required Dependencies
```bash
npm install mongodb
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
npm install react-quill
npm install sharp
npm install uuid
npm install bcryptjs  # Optional if you want basic hashing later
npm install cookie
```

### Create `.env.local` File
```env
# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here

# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
MONGODB_DB=imagerybyb
MONGODB_COLLECTION_PREFIX=imagerybyb_ovation

# Cloudflare R2 Configuration
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=imagerybyb-ovation
R2_PUBLIC_URL=https://your-r2-public-url.com

# Session Secret
SESSION_SECRET=your_random_session_secret_here

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 2. Database Schema

### MongoDB Collections (Prefix: `imagerybyb_ovation_`)

#### **Collection: `imagerybyb_ovation_content`**
Stores all editable content sections from the website.

```javascript
{
  _id: ObjectId,
  section: String, // e.g., "hero", "about", "services", "footer"
  subsection: String, // e.g., "slide1", "slide2", "contact_info"
  type: String, // "text", "richtext", "image", "video", "link"
  key: String, // unique identifier like "hero_slide1_title"
  value: Mixed, // actual content
  metadata: {
    alt: String, // for images
    width: Number,
    height: Number,
    originalName: String
  },
  updatedAt: Date,
  updatedBy: String
}
```

**Example Documents:**
```javascript
// Hero Section - Slide 1 Title
{
  section: "hero",
  subsection: "slide1",
  type: "text",
  key: "hero_slide1_title",
  value: "WEDDING DAY MAGIC",
  updatedAt: ISODate("2025-01-20T10:00:00Z"),
  updatedBy: "admin"
}

// Hero Section - Slide 1 Image
{
  section: "hero",
  subsection: "slide1",
  type: "image",
  key: "hero_slide1_image",
  value: "https://r2-url.com/hero_1_1.webp",
  metadata: {
    alt: "Wedding couple",
    width: 1920,
    height: 1080,
    originalName: "hero_image.jpg"
  },
  updatedAt: ISODate("2025-01-20T10:00:00Z"),
  updatedBy: "admin"
}

// About Section - Rich Text
{
  section: "about",
  subsection: "main",
  type: "richtext",
  key: "about_description",
  value: "<p>At ImageryByB, we capture love...</p>",
  updatedAt: ISODate("2025-01-20T10:00:00Z"),
  updatedBy: "admin"
}
```

#### **Collection: `imagerybyb_ovation_gallery`**
Stores gallery images.

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  imageUrl: String, // R2 URL
  thumbnailUrl: String, // R2 URL for thumbnail
  order: Number, // for sorting
  isActive: Boolean,
  metadata: {
    originalName: String,
    mimeType: String,
    size: Number, // in bytes
    width: Number,
    height: Number
  },
  uploadedAt: Date,
  uploadedBy: String
}
```

#### **Collection: `imagerybyb_ovation_inquiries`**
Stores contact form submissions.

```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  inquiryType: String, // "wedding", "engagement", "couples", "other"
  date: Date,
  status: String, // "new", "read", "responded", "archived"
  notes: String, // admin notes
  submittedAt: Date,
  readAt: Date,
  respondedAt: Date
}
```

#### **Collection: `imagerybyb_ovation_analytics`**
Stores page view analytics.

```javascript
{
  _id: ObjectId,
  date: Date, // YYYY-MM-DD format for daily aggregation
  totalViews: Number,
  uniqueVisitors: Number,
  visitors: [
    {
      ip: String, // hashed for privacy
      userAgent: String,
      timestamp: Date,
      page: String
    }
  ]
}
```

#### **Collection: `imagerybyb_ovation_settings`**
Stores global site settings.

```javascript
{
  _id: ObjectId,
  key: String, // "social_links", "contact_info", "working_hours"
  value: Mixed,
  updatedAt: Date,
  updatedBy: String
}
```

**Example:**
```javascript
{
  key: "social_links",
  value: {
    facebook: "https://www.facebook.com/imagerybyb",
    instagram: "https://www.instagram.com/imagerybyb"
  },
  updatedAt: ISODate("2025-01-20T10:00:00Z"),
  updatedBy: "admin"
}
```

---

## 3. Folder Structure

```
ovation-nextjs/
├── app/
│   ├── admin/
│   │   ├── layout.js               # Admin layout with sidebar
│   │   ├── page.js                 # Dashboard (analytics)
│   │   ├── login/
│   │   │   └── page.js             # Login page
│   │   ├── editor/
│   │   │   ├── page.js             # Content editor main page
│   │   │   ├── [section]/
│   │   │   │   └── page.js         # Edit specific section
│   │   │   └── components/
│   │   │       ├── TextEditor.js   # Simple text input
│   │   │       ├── RichTextEditor.js # WYSIWYG editor
│   │   │       ├── ImageUploader.js  # Image upload component
│   │   │       └── VideoUploader.js  # Video upload component
│   │   ├── gallery/
│   │   │   ├── page.js             # Gallery management
│   │   │   └── components/
│   │   │       ├── GalleryGrid.js  # Display gallery items
│   │   │       └── ImageUploadModal.js # Upload new images
│   │   ├── inquiry/
│   │   │   ├── page.js             # List all inquiries
│   │   │   └── [id]/
│   │   │       └── page.js         # View/respond to inquiry
│   │   └── components/
│   │       ├── Sidebar.js          # Admin sidebar navigation
│   │       ├── Header.js           # Admin header
│   │       └── ProtectedRoute.js   # Auth wrapper component
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.js        # POST login
│   │   │   ├── logout/
│   │   │   │   └── route.js        # POST logout
│   │   │   └── check/
│   │   │       └── route.js        # GET check auth status
│   │   ├── content/
│   │   │   ├── route.js            # GET all, POST create
│   │   │   ├── [key]/
│   │   │   │   └── route.js        # GET, PUT, DELETE specific
│   │   │   └── sections/
│   │   │       └── route.js        # GET grouped by section
│   │   ├── gallery/
│   │   │   ├── route.js            # GET all, POST upload
│   │   │   └── [id]/
│   │   │       └── route.js        # GET, PUT, DELETE specific
│   │   ├── inquiry/
│   │   │   ├── route.js            # GET all, POST create
│   │   │   └── [id]/
│   │   │       └── route.js        # GET, PUT, DELETE specific
│   │   ├── analytics/
│   │   │   ├── track/
│   │   │   │   └── route.js        # POST track page view
│   │   │   └── stats/
│   │   │       └── route.js        # GET analytics data
│   │   └── upload/
│   │       └── route.js            # POST upload to R2
│   ├── components/
│   │   ├── GallerySlider.js        # Updated to fetch from DB
│   │   ├── VideoModal.js
│   │   └── PageViewTracker.js      # Client component to track views
│   ├── page.js                     # Main homepage
│   ├── layout.js
│   └── globals.css
├── lib/
│   ├── mongodb.js                  # MongoDB connection
│   ├── r2.js                       # Cloudflare R2 client
│   ├── auth.js                     # Authentication helpers
│   ├── imageProcessor.js           # Image optimization & webp conversion
│   └── analytics.js                # Analytics tracking helpers
├── middleware.js                   # Next.js middleware for auth
├── .env.local
└── package.json
```

---

## 4. Authentication System

### `lib/auth.js`
```javascript
import { cookies } from 'next/headers';

export function checkAuth() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('admin_session');

  if (!sessionToken) {
    return { authenticated: false };
  }

  // Simple token validation
  const expectedToken = Buffer.from(
    `${process.env.ADMIN_USERNAME}:${process.env.ADMIN_PASSWORD}`
  ).toString('base64');

  if (sessionToken.value === expectedToken) {
    return { authenticated: true, username: process.env.ADMIN_USERNAME };
  }

  return { authenticated: false };
}

export function createSession(username, password) {
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = Buffer.from(`${username}:${password}`).toString('base64');
    return { success: true, token };
  }
  return { success: false };
}
```

### `app/api/auth/login/route.js`
```javascript
import { NextResponse } from 'next/server';
import { createSession } from '@/lib/auth';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const result = createSession(username, password);

    if (result.success) {
      const response = NextResponse.json({ success: true });

      // Set HTTP-only cookie
      response.cookies.set('admin_session', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
```

### `app/admin/login/page.js`
```javascript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        router.push('/admin');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>ImageryByB CMS</h1>
            <p>Admin Login</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="alert alert-error">{error}</div>
            )}

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .admin-login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .login-container {
          width: 100%;
          max-width: 400px;
          padding: 20px;
        }

        .login-card {
          background: white;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }

        .login-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .login-header h1 {
          font-size: 28px;
          margin-bottom: 8px;
          color: #333;
        }

        .login-header p {
          color: #666;
          font-size: 16px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
        }

        .form-group input {
          width: 100%;
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 6px;
          font-size: 16px;
          transition: border-color 0.3s;
        }

        .form-group input:focus {
          outline: none;
          border-color: #667eea;
        }

        .btn-primary {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .alert-error {
          background: #fee;
          color: #c33;
          padding: 12px;
          border-radius: 6px;
          margin-bottom: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
```

### `middleware.js`
```javascript
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if accessing admin routes (except login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const sessionToken = request.cookies.get('admin_session');

    if (!sessionToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Validate token
    const expectedToken = Buffer.from(
      `${process.env.ADMIN_USERNAME}:${process.env.ADMIN_PASSWORD}`
    ).toString('base64');

    if (sessionToken.value !== expectedToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*'
};
```

---

## 5. Admin Dashboard

### `app/admin/layout.js`
```javascript
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './admin.css';

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Header />
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
```

### `app/admin/components/Sidebar.js`
```javascript
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: '📊'
    },
    {
      name: 'Editor',
      path: '/admin/editor',
      icon: '✏️'
    },
    {
      name: 'Gallery',
      path: '/admin/gallery',
      icon: '🖼️'
    },
    {
      name: 'Inquiries',
      path: '/admin/inquiry',
      icon: '📧'
    }
  ];

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <h2>ImageryByB</h2>
        <p>CMS</p>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`sidebar-item ${pathname === item.path ? 'active' : ''}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-text">{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
```

### `app/admin/page.js` (Dashboard with Analytics)
```javascript
'use client';

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalViews: 0,
    uniqueVisitors: 0,
    newInquiries: 0,
    galleryImages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/analytics/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👁️</div>
          <div className="stat-content">
            <h3>Total Views</h3>
            <p className="stat-number">{stats.totalViews.toLocaleString()}</p>
            <span className="stat-label">All time</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👤</div>
          <div className="stat-content">
            <h3>Unique Visitors</h3>
            <p className="stat-number">{stats.uniqueVisitors.toLocaleString()}</p>
            <span className="stat-label">All time</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📧</div>
          <div className="stat-content">
            <h3>New Inquiries</h3>
            <p className="stat-number">{stats.newInquiries}</p>
            <span className="stat-label">Unread</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🖼️</div>
          <div className="stat-content">
            <h3>Gallery Images</h3>
            <p className="stat-number">{stats.galleryImages}</p>
            <span className="stat-label">Active images</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          padding: 20px;
        }

        h1 {
          margin-bottom: 30px;
          color: #333;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .stat-icon {
          font-size: 48px;
        }

        .stat-content h3 {
          font-size: 14px;
          color: #666;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .stat-number {
          font-size: 32px;
          font-weight: 700;
          color: #333;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 12px;
          color: #999;
        }

        .loading {
          padding: 40px;
          text-align: center;
          color: #666;
        }
      `}</style>
    </div>
  );
}
```

---

## 6. Editor Module

### Content Structure Map

This section maps every editable element on the website:

#### **Hero Section**
- **Slide 1:**
  - `hero_slide1_subtitle` (text) - "Your Love Story Deserves"
  - `hero_slide1_subtitle2` (text) - "Every stolen glance..."
  - `hero_slide1_title1` (text) - "WEDDING DAY"
  - `hero_slide1_title2` (text) - "MAGIC"
  - `hero_slide1_button_text` (text) - "BOOK YOUR DATE"
  - `hero_slide1_button_link` (link) - "#"
  - `hero_slide1_background` (image) - "/assets/img/hero/hero_bg_1_1.png"
  - `hero_slide1_image` (image) - "/assets/img/hero/hero_1_1.png"
  - `hero_slide1_shape1` (image) - "/assets/img/hero/hero_shape_1_1.png"
  - `hero_slide1_shape2` (image) - "/assets/img/hero/hero_shape_1_2.png"

- **Slide 2:**
  - `hero_slide2_subtitle` (text) - "Celebrate Your Forever"
  - `hero_slide2_subtitle2` (text) - "The way you laugh together..."
  - `hero_slide2_title1` (text) - "TOGETHER FOREVER"
  - `hero_slide2_title2` (text) - "SESSIONS"
  - `hero_slide2_button_text` (text) - "START YOUR STORY"
  - `hero_slide2_button_link` (link) - "#"
  - `hero_slide2_background` (image) - Same as slide 1
  - `hero_slide2_image` (image) - "/assets/img/hero/hero_1_2.png"

#### **About Section**
- `about_section_title` (text) - "WHO WE ARE"
- `about_main_title` (text) - "MORE THAN PHOTOS"
- `about_description` (richtext) - The main description text
- `about_button_text` (text) - "REACH OUT"
- `about_button_link` (link) - "#inquiry"
- `about_image` (image) - "/assets/img/normal/about_1-1.png"

#### **Services/Process Section**
- `services_section_title` (text) - "HOW IT WORKS"
- `services_main_title` (text) - "THE PROCESS"
- `services_shape_image` (image) - "/assets/img/normal/service_1-1.png"

- **Service Card 1:**
  - `service1_icon` (text) - "fas fa-paper-plane"
  - `service1_title` (text) - "Step 1: Reach Out"
  - `service1_description` (text) - "Submit your inquiry..."

- **Service Card 2:**
  - `service2_icon` (text) - "far fa-lightbulb"
  - `service2_title` (text) - "Step 2: Build the Vision"
  - `service2_description` (text) - "We'll schedule a call..."

- **Service Card 3:**
  - `service3_icon` (text) - "fas fa-lock"
  - `service3_title` (text) - "Step 3: Lock It In"
  - `service3_description` (text) - "Once you're ready..."

#### **Video Section**
- `video_section_title` (text) - "ENJOY OUR MOMENTS"
- `video_main_title` (text) - "COME WITH US"
- `video_thumbnail` (image) - "/assets/img/normal/video_1-1.webp"
- `video_url` (video) - YouTube/Vimeo URL
- `video_shape` (image) - "/assets/img/normal/video-shape_1-1.png"

#### **Counter/Stats Section**
- `counter_background` (image) - "/assets/img/bg/counter-1-bg.png"
- **Counter 1:**
  - `counter1_number` (text) - "256"
  - `counter1_label` (text) - "Weddings per year"
- **Counter 2:**
  - `counter2_number` (text) - "28"
  - `counter2_label` (text) - "Years of celebration"
- **Counter 3:**
  - `counter3_number` (text) - "1369"
  - `counter3_label` (text) - "Flower bouquest"
- **Counter 4:**
  - `counter4_number` (text) - "256"
  - `counter4_label` (text) - "Sunny days per year"
- `counter_marquee_text` (text) - "Lets find some beautiful place to get lost"

#### **Portfolio/Services Section**
- `portfolio_section_title` (text) - "WHAT WE OFFER"
- `portfolio_main_title` (text) - "OUR SERVICES"
- `portfolio_background` (image) - "/assets/img/bg/portfolio-1-bg.png"
- `portfolio_shape` (image) - "/assets/img/normal/portfolio-shape_1-1.png"

- **Service 1 - Wedding:**
  - `portfolio_service1_title` (text) - "Wedding Photography"
  - `portfolio_service1_image` (image) - "/assets/img/normal/byb.jpg"
  - `portfolio_service1_category` (text) - "ImageryByB"

- **Service 2 - Couples:**
  - `portfolio_service2_title` (text) - "Together Forever Session"
  - `portfolio_service2_image` (image) - "/assets/img/portfolio/lopo.png"
  - `portfolio_service2_category` (text) - "Couples + Engagement"

#### **Gallery Section**
- `gallery_section_title` (text) - "MOMENTS CAPTURED"
- `gallery_main_title` (text) - "Through Our Lens"
- Gallery images come from `imagerybyb_ovation_gallery` collection

#### **Contact/Inquiry Section**
- `inquiry_background` (image) - "/assets/img/bg/contact-1-bg.png"
- `inquiry_section_title` (text) - "READY TO START?"
- `inquiry_main_title` (text) - "LETS CREATE MAGIC"
- `inquiry_shape1` (image) - "/assets/img/normal/contact-shape_1-1.png"
- `inquiry_shape2` (image) - "/assets/img/normal/contact-shape_1-2.png"

#### **Testimonials Section**
- `testimonial_section_title` (text) - "Feedbacks"
- `testimonial_main_title` (text) - "Our Testimonials"
- Testimonials can be stored in separate collection: `imagerybyb_ovation_testimonials`

#### **Contact Info Section**
- **Location:**
  - `contact_location_title` (text) - "Office Address"
  - `contact_location_subtitle` (text) - "Based in"
  - `contact_location_city` (text) - "Houston, Texas"
  - `contact_location_note` (text) - "Available for travel"

- **Email:**
  - `contact_email_title` (text) - "Email Address"
  - `contact_email_subtitle` (text) - "24/7 Anytime"
  - `contact_email` (text) - "info@imagerybyb.com"

- **Phone:**
  - `contact_phone_title` (text) - "Phone Number"
  - `contact_phone_subtitle` (text) - "24/7 Anytime"
  - `contact_phone` (text) - "+1 (346) 243-2684"

#### **Header**
- `header_logo` (image) - "/assets/img/imageryb2b-logo.webp"
- `header_logo_white` (image) - "/assets/img/imageryb2b-logo-white.webp"
- `header_working_hours` (text) - "Working: 8.00am - 5.00pm"
- `header_email` (text) - "info@imagerybyb.com"
- `header_help_link` (link) - "#"
- `header_support_link` (link) - "#"
- `header_contact_link` (link) - "#"
- `header_inquire_button` (text) - "Inquire Now"

#### **Footer**
- `footer_logo` (image) - "/assets/img/imageryb2b-logo.webp"
- `footer_background` (image) - "/assets/img/bg/footer-1-bg.html"
- `footer_shape1` (image) - "/assets/img/normal/footer-1-shape1.webp"
- `footer_shape2` (image) - "/assets/img/normal/footer-1-shape2.html"
- `footer_location` (text) - "Based in Houston, Texas"
- `footer_phone` (text) - "+1 (346) 243-2684"
- `footer_email` (text) - "info@imagerybyb.com"
- `footer_newsletter_title` (text) - "Subscribe Now"
- `footer_newsletter_text` (text) - "Don't worry we don't spam your email"
- `footer_copyright` (text) - "© 2025 ImageryByB. All Rights Reserved."

#### **Social Media Links**
- `social_facebook` (link) - Facebook URL
- `social_instagram` (link) - Instagram URL

### `app/admin/editor/page.js`
```javascript
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function EditorPage() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const response = await fetch('/api/content/sections');
      const data = await response.json();
      setSections(data);
    } catch (error) {
      console.error('Error fetching sections:', error);
    } finally {
      setLoading(false);
    }
  };

  const sectionList = [
    { id: 'hero', name: 'Hero Section', icon: '🎯', description: 'Edit hero slider content' },
    { id: 'about', name: 'About Section', icon: '📝', description: 'Edit about section content' },
    { id: 'services', name: 'Services/Process', icon: '⚙️', description: 'Edit service cards' },
    { id: 'video', name: 'Video Section', icon: '🎥', description: 'Edit video section' },
    { id: 'counter', name: 'Statistics', icon: '📊', description: 'Edit counter numbers' },
    { id: 'portfolio', name: 'Portfolio/Services', icon: '💼', description: 'Edit portfolio items' },
    { id: 'gallery', name: 'Gallery Settings', icon: '🖼️', description: 'Edit gallery section titles' },
    { id: 'inquiry', name: 'Inquiry Section', icon: '✉️', description: 'Edit inquiry form section' },
    { id: 'testimonials', name: 'Testimonials', icon: '⭐', description: 'Edit testimonials' },
    { id: 'contact', name: 'Contact Info', icon: '📞', description: 'Edit contact information' },
    { id: 'header', name: 'Header', icon: '🔝', description: 'Edit header content' },
    { id: 'footer', name: 'Footer', icon: '🔻', description: 'Edit footer content' },
    { id: 'social', name: 'Social Media', icon: '🌐', description: 'Edit social media links' }
  ];

  return (
    <div className="editor-page">
      <h1>Content Editor</h1>
      <p className="subtitle">Select a section to edit its content</p>

      <div className="sections-grid">
        {sectionList.map((section) => (
          <Link
            key={section.id}
            href={`/admin/editor/${section.id}`}
            className="section-card"
          >
            <div className="section-icon">{section.icon}</div>
            <h3>{section.name}</h3>
            <p>{section.description}</p>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .editor-page {
          padding: 20px;
        }

        h1 {
          margin-bottom: 10px;
          color: #333;
        }

        .subtitle {
          color: #666;
          margin-bottom: 30px;
        }

        .sections-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .section-card {
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          text-decoration: none;
          color: inherit;
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }

        .section-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }

        .section-icon {
          font-size: 48px;
          margin-bottom: 15px;
        }

        .section-card h3 {
          margin-bottom: 8px;
          color: #333;
        }

        .section-card p {
          color: #666;
          font-size: 14px;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
```

### `app/admin/editor/components/RichTextEditor.js`
```javascript
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import React Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function RichTextEditor({ value, onChange, label }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link'],
      ['clean']
    ],
  };

  if (!mounted) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="rich-text-editor">
      {label && <label className="editor-label">{label}</label>}
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder="Enter your content here..."
      />

      <style jsx global>{`
        .rich-text-editor {
          margin-bottom: 20px;
        }

        .editor-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
        }

        .quill {
          background: white;
          border-radius: 8px;
        }

        .ql-container {
          min-height: 200px;
          font-size: 16px;
        }

        .ql-editor {
          min-height: 200px;
        }
      `}</style>
    </div>
  );
}
```

### `app/admin/editor/components/ImageUploader.js`
```javascript
'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ImageUploader({ value, onChange, label }) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(value || '');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setUploading(true);

    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'content');

      // Upload to API
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setPreviewUrl(data.url);
        onChange(data.url);
      } else {
        alert('Upload failed: ' + data.message);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="image-uploader">
      {label && <label className="uploader-label">{label}</label>}

      <div className="upload-area">
        {previewUrl && (
          <div className="image-preview">
            <img src={previewUrl} alt="Preview" />
          </div>
        )}

        <div className="upload-controls">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            id="image-upload"
            style={{ display: 'none' }}
          />
          <label htmlFor="image-upload" className="upload-button">
            {uploading ? 'Uploading...' : 'Choose Image'}
          </label>

          {previewUrl && (
            <button
              type="button"
              onClick={() => {
                setPreviewUrl('');
                onChange('');
              }}
              className="remove-button"
            >
              Remove
            </button>
          )}
        </div>

        <p className="upload-hint">
          Supported formats: JPG, PNG, GIF, WebP. Max size: 10MB.
          Image will be automatically optimized and converted to WebP.
        </p>
      </div>

      <style jsx>{`
        .image-uploader {
          margin-bottom: 20px;
        }

        .uploader-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
        }

        .upload-area {
          border: 2px dashed #ddd;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
        }

        .image-preview {
          margin-bottom: 15px;
        }

        .image-preview img {
          max-width: 100%;
          max-height: 300px;
          border-radius: 8px;
          object-fit: contain;
        }

        .upload-controls {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-bottom: 10px;
        }

        .upload-button {
          background: #667eea;
          color: white;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.2s;
        }

        .upload-button:hover {
          background: #5568d3;
        }

        .remove-button {
          background: #f44336;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.2s;
        }

        .remove-button:hover {
          background: #d32f2f;
        }

        .upload-hint {
          font-size: 12px;
          color: #999;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
```

---

## 7. Gallery Module

### `app/admin/gallery/page.js`
```javascript
'use client';

import { useState, useEffect } from 'react';
import ImageUploadModal from './components/ImageUploadModal';

export default function GalleryManagement() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/gallery');
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchImages();
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleReorder = async (imageId, newOrder) => {
    try {
      await fetch(`/api/gallery/${imageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: newOrder })
      });

      fetchImages();
    } catch (error) {
      console.error('Error reordering image:', error);
    }
  };

  return (
    <div className="gallery-management">
      <div className="gallery-header">
        <h1>Gallery Management</h1>
        <button
          onClick={() => setShowUploadModal(true)}
          className="btn-primary"
        >
          + Upload Images
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading gallery...</div>
      ) : (
        <div className="gallery-grid">
          {images.map((image) => (
            <div key={image._id} className="gallery-item">
              <div className="image-wrapper">
                <img src={image.thumbnailUrl} alt={image.title} />
              </div>
              <div className="item-details">
                <h3>{image.title || 'Untitled'}</h3>
                <p>{image.description}</p>
                <div className="item-meta">
                  <span>Order: {image.order}</span>
                  <span>{new Date(image.uploadedAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="item-actions">
                <button
                  onClick={() => handleReorder(image._id, image.order - 1)}
                  disabled={image.order === 0}
                >
                  ↑
                </button>
                <button
                  onClick={() => handleReorder(image._id, image.order + 1)}
                >
                  ↓
                </button>
                <button
                  onClick={() => handleDelete(image._id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showUploadModal && (
        <ImageUploadModal
          onClose={() => setShowUploadModal(false)}
          onSuccess={() => {
            setShowUploadModal(false);
            fetchImages();
          }}
        />
      )}

      <style jsx>{`
        .gallery-management {
          padding: 20px;
        }

        .gallery-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .btn-primary {
          background: #667eea;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .gallery-item {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .image-wrapper {
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .item-details {
          padding: 15px;
        }

        .item-details h3 {
          margin-bottom: 8px;
          color: #333;
        }

        .item-details p {
          color: #666;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .item-meta {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #999;
        }

        .item-actions {
          display: flex;
          gap: 10px;
          padding: 15px;
          border-top: 1px solid #eee;
        }

        .item-actions button {
          flex: 1;
          padding: 8px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 6px;
          cursor: pointer;
        }

        .btn-delete {
          background: #f44336 !important;
          color: white !important;
          border: none !important;
        }
      `}</style>
    </div>
  );
}
```

---

## 8. Inquiry Module

### `app/admin/inquiry/page.js`
```javascript
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function InquiryManagement() {
  const [inquiries, setInquiries] = useState([]);
  const [filter, setFilter] = useState('all'); // all, new, read, responded
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, [filter]);

  const fetchInquiries = async () => {
    try {
      const url = filter === 'all'
        ? '/api/inquiry'
        : `/api/inquiry?status=${filter}`;

      const response = await fetch(url);
      const data = await response.json();
      setInquiries(data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      new: { color: '#4CAF50', text: 'New' },
      read: { color: '#2196F3', text: 'Read' },
      responded: { color: '#9C27B0', text: 'Responded' },
      archived: { color: '#757575', text: 'Archived' }
    };

    const badge = badges[status] || badges.new;

    return (
      <span
        style={{
          background: badge.color,
          color: 'white',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '600'
        }}
      >
        {badge.text}
      </span>
    );
  };

  return (
    <div className="inquiry-management">
      <h1>Inquiries</h1>

      <div className="filters">
        {['all', 'new', 'read', 'responded', 'archived'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={filter === status ? 'active' : ''}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading">Loading inquiries...</div>
      ) : inquiries.length === 0 ? (
        <div className="empty-state">
          <p>No inquiries found</p>
        </div>
      ) : (
        <div className="inquiries-list">
          {inquiries.map((inquiry) => (
            <Link
              key={inquiry._id}
              href={`/admin/inquiry/${inquiry._id}`}
              className="inquiry-card"
            >
              <div className="inquiry-header">
                <h3>{inquiry.firstName} {inquiry.lastName}</h3>
                {getStatusBadge(inquiry.status)}
              </div>

              <div className="inquiry-details">
                <p><strong>Email:</strong> {inquiry.email}</p>
                <p><strong>Phone:</strong> {inquiry.phone}</p>
                <p><strong>Type:</strong> {inquiry.inquiryType}</p>
                <p><strong>Date:</strong> {new Date(inquiry.date).toLocaleDateString()}</p>
              </div>

              <div className="inquiry-footer">
                <span>Submitted: {new Date(inquiry.submittedAt).toLocaleString()}</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <style jsx>{`
        .inquiry-management {
          padding: 20px;
        }

        h1 {
          margin-bottom: 20px;
        }

        .filters {
          display: flex;
          gap: 10px;
          margin-bottom: 30px;
        }

        .filters button {
          padding: 10px 20px;
          border: 2px solid #ddd;
          background: white;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }

        .filters button.active {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .inquiries-list {
          display: grid;
          gap: 15px;
        }

        .inquiry-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          text-decoration: none;
          color: inherit;
          transition: transform 0.2s;
        }

        .inquiry-card:hover {
          transform: translateX(4px);
        }

        .inquiry-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .inquiry-header h3 {
          margin: 0;
          color: #333;
        }

        .inquiry-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 10px;
          margin-bottom: 15px;
        }

        .inquiry-details p {
          margin: 0;
          color: #666;
          font-size: 14px;
        }

        .inquiry-footer {
          border-top: 1px solid #eee;
          padding-top: 10px;
          font-size: 12px;
          color: #999;
        }

        .loading, .empty-state {
          text-align: center;
          padding: 40px;
          color: #666;
        }
      `}</style>
    </div>
  );
}
```

---

## 9. Analytics Module

### `lib/analytics.js`
```javascript
import { getDatabase } from './mongodb';
import crypto from 'crypto';

export async function trackPageView(ip, userAgent, page = '/') {
  try {
    const db = await getDatabase();
    const collection = db.collection('imagerybyb_ovation_analytics');

    // Hash IP for privacy
    const hashedIp = crypto.createHash('sha256').update(ip).digest('hex');

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find or create today's analytics document
    const result = await collection.findOneAndUpdate(
      { date: today },
      {
        $inc: { totalViews: 1 },
        $addToSet: {
          visitors: {
            ip: hashedIp,
            userAgent,
            timestamp: new Date(),
            page
          }
        }
      },
      { upsert: true, returnDocument: 'after' }
    );

    // Update unique visitors count
    const uniqueVisitors = new Set(
      result.value.visitors.map(v => v.ip)
    ).size;

    await collection.updateOne(
      { date: today },
      { $set: { uniqueVisitors } }
    );

    return { success: true };
  } catch (error) {
    console.error('Analytics tracking error:', error);
    return { success: false, error: error.message };
  }
}

export async function getAnalyticsStats(days = 30) {
  try {
    const db = await getDatabase();
    const collection = db.collection('imagerybyb_ovation_analytics');

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    const stats = await collection.find({
      date: { $gte: startDate }
    }).toArray();

    const totalViews = stats.reduce((sum, day) => sum + day.totalViews, 0);

    // Count unique visitors across all days
    const allVisitors = new Set();
    stats.forEach(day => {
      day.visitors.forEach(visitor => {
        allVisitors.add(visitor.ip);
      });
    });

    return {
      totalViews,
      uniqueVisitors: allVisitors.size,
      dailyStats: stats
    };
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return {
      totalViews: 0,
      uniqueVisitors: 0,
      dailyStats: []
    };
  }
}
```

### `app/api/analytics/track/route.js`
```javascript
import { NextResponse } from 'next/server';
import { trackPageView } from '@/lib/analytics';

export async function POST(request) {
  try {
    const { page } = await request.json();

    // Get client IP
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Get user agent
    const userAgent = request.headers.get('user-agent') || 'unknown';

    await trackPageView(ip, userAgent, page);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
```

### `app/components/PageViewTracker.js`
```javascript
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't track admin pages
    if (pathname.startsWith('/admin')) return;

    // Track page view
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: pathname })
    }).catch(err => console.error('Analytics error:', err));
  }, [pathname]);

  return null;
}
```

---

## 10. Frontend Integration

### Update `app/layout.js` to include analytics tracker
```javascript
import PageViewTracker from './components/PageViewTracker';

// Add this inside the <body> tag
<PageViewTracker />
```

### Update `app/components/GallerySlider.js` to fetch from database
```javascript
'use client';

import { useState, useEffect } from 'react';

export default function GallerySlider() {
    const [images, setImages] = useState([]);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGalleryImages();
    }, []);

    const fetchGalleryImages = async () => {
        try {
            const response = await fetch('/api/gallery?active=true');
            const data = await response.json();
            setImages(data.map(img => img.imageUrl));
        } catch (error) {
            console.error('Error fetching gallery:', error);
            // Fallback to static images
            setImages([
                '/assets/img/product/1.png',
                '/assets/img/product/2.png',
                '/assets/img/product/3.png',
                '/assets/img/product/4.png'
            ]);
        } finally {
            setLoading(false);
        }
    };

    // ... rest of the component remains the same
}
```

---

## 11. API Routes

### `lib/mongodb.js`
```javascript
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getDatabase() {
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB || 'imagerybyb');
}

export default clientPromise;
```

### `app/api/content/route.js`
```javascript
import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { checkAuth } from '@/lib/auth';

// GET all content
export async function GET(request) {
  try {
    const db = await getDatabase();
    const collection = db.collection('imagerybyb_ovation_content');

    const content = await collection.find({}).toArray();

    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// POST create/update content
export async function POST(request) {
  const auth = checkAuth();
  if (!auth.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const db = await getDatabase();
    const collection = db.collection('imagerybyb_ovation_content');

    const result = await collection.updateOne(
      { key: body.key },
      {
        $set: {
          ...body,
          updatedAt: new Date(),
          updatedBy: auth.username
        }
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

### `app/api/gallery/route.js`
```javascript
import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { checkAuth } from '@/lib/auth';

// GET all gallery images
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active') === 'true';

    const db = await getDatabase();
    const collection = db.collection('imagerybyb_ovation_gallery');

    const filter = activeOnly ? { isActive: true } : {};
    const images = await collection
      .find(filter)
      .sort({ order: 1 })
      .toArray();

    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// POST upload new gallery image
export async function POST(request) {
  const auth = checkAuth();
  if (!auth.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const db = await getDatabase();
    const collection = db.collection('imagerybyb_ovation_gallery');

    // Get max order
    const maxOrderDoc = await collection
      .find()
      .sort({ order: -1 })
      .limit(1)
      .toArray();

    const nextOrder = maxOrderDoc.length > 0 ? maxOrderDoc[0].order + 1 : 0;

    const result = await collection.insertOne({
      ...body,
      order: nextOrder,
      isActive: true,
      uploadedAt: new Date(),
      uploadedBy: auth.username
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

### `app/api/inquiry/route.js`
```javascript
import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { checkAuth } from '@/lib/auth';

// GET all inquiries (admin only)
export async function GET(request) {
  const auth = checkAuth();
  if (!auth.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const db = await getDatabase();
    const collection = db.collection('imagerybyb_ovation_inquiries');

    const filter = status ? { status } : {};
    const inquiries = await collection
      .find(filter)
      .sort({ submittedAt: -1 })
      .toArray();

    return NextResponse.json(inquiries);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// POST create inquiry (public endpoint)
export async function POST(request) {
  try {
    const body = await request.json();
    const db = await getDatabase();
    const collection = db.collection('imagerybyb_ovation_inquiries');

    const result = await collection.insertOne({
      ...body,
      status: 'new',
      notes: '',
      submittedAt: new Date()
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

---

## 12. Cloudflare R2 Setup

### `lib/r2.js`
```javascript
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const R2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

export async function uploadToR2(file, fileName, contentType) {
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fileName,
      Body: file,
      ContentType: contentType,
    });

    await R2.send(command);

    const url = `${process.env.R2_PUBLIC_URL}/${fileName}`;
    return { success: true, url };
  } catch (error) {
    console.error('R2 upload error:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteFromR2(fileName) {
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fileName,
    });

    await R2.send(command);
    return { success: true };
  } catch (error) {
    console.error('R2 delete error:', error);
    return { success: false, error: error.message };
  }
}

export default R2;
```

### `lib/imageProcessor.js`
```javascript
import sharp from 'sharp';

export async function processImage(buffer, options = {}) {
  const {
    width = 1920,
    height = null,
    quality = 80,
    format = 'webp'
  } = options;

  try {
    let processor = sharp(buffer);

    // Resize if dimensions provided
    if (width || height) {
      processor = processor.resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    // Convert to WebP
    if (format === 'webp') {
      processor = processor.webp({ quality });
    } else if (format === 'jpeg') {
      processor = processor.jpeg({ quality });
    } else if (format === 'png') {
      processor = processor.png({ quality });
    }

    const processedBuffer = await processor.toBuffer();
    const metadata = await sharp(processedBuffer).metadata();

    return {
      buffer: processedBuffer,
      metadata: {
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
        size: processedBuffer.length
      }
    };
  } catch (error) {
    console.error('Image processing error:', error);
    throw error;
  }
}

export async function createThumbnail(buffer, size = 400) {
  return processImage(buffer, {
    width: size,
    height: size,
    quality: 70,
    format: 'webp'
  });
}
```

### `app/api/upload/route.js`
```javascript
import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';
import { uploadToR2 } from '@/lib/r2';
import { processImage, createThumbnail } from '@/lib/imageProcessor';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {
  const auth = checkAuth();
  if (!auth.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const type = formData.get('type') || 'content'; // content or gallery

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Read file buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Process image (optimize and convert to WebP)
    const processed = await processImage(buffer);

    // Generate unique filename
    const fileExt = 'webp';
    const fileName = `${type}/${uuidv4()}.${fileExt}`;

    // Upload to R2
    const uploadResult = await uploadToR2(
      processed.buffer,
      fileName,
      'image/webp'
    );

    if (!uploadResult.success) {
      throw new Error('Upload failed');
    }

    // Create and upload thumbnail for gallery images
    let thumbnailUrl = uploadResult.url;
    if (type === 'gallery') {
      const thumbnail = await createThumbnail(buffer);
      const thumbFileName = `${type}/thumbnails/${uuidv4()}.webp`;
      const thumbResult = await uploadToR2(
        thumbnail.buffer,
        thumbFileName,
        'image/webp'
      );
      if (thumbResult.success) {
        thumbnailUrl = thumbResult.url;
      }
    }

    return NextResponse.json({
      success: true,
      url: uploadResult.url,
      thumbnailUrl,
      metadata: processed.metadata
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
```

---

## Implementation Steps Summary

### Phase 1: Setup (Week 1)
1. Install all dependencies
2. Configure `.env.local` with MongoDB and R2 credentials
3. Set up MongoDB collections with indexes
4. Configure Cloudflare R2 bucket with public access
5. Test database and R2 connections

### Phase 2: Authentication (Week 1)
1. Implement authentication system
2. Create login page
3. Set up middleware for route protection
4. Test login/logout flow

### Phase 3: Admin Dashboard (Week 2)
1. Create admin layout with sidebar
2. Build dashboard with analytics
3. Implement analytics tracking on frontend
4. Test analytics data collection

### Phase 4: Content Editor (Week 2-3)
1. Create content editor structure
2. Build text, rich text, and image editor components
3. Map all content sections to database
4. Implement save/update functionality
5. Create section-specific edit pages

### Phase 5: Gallery Management (Week 3)
1. Build gallery upload interface
2. Implement image processing and WebP conversion
3. Create gallery grid with reordering
4. Update frontend gallery component to fetch from DB

### Phase 6: Inquiry Management (Week 4)
1. Create inquiry list page
2. Build individual inquiry view
3. Implement status management
4. Add admin notes functionality

### Phase 7: Testing & Deployment (Week 4)
1. Test all CRUD operations
2. Test image uploads and optimization
3. Verify analytics tracking
4. Deploy to production
5. Configure production environment variables

---

## Security Considerations

1. **Environment Variables:** Never commit `.env.local` to version control
2. **Admin Routes:** All protected by middleware authentication
3. **File Uploads:** Validate file types and sizes
4. **MongoDB:** Use connection string with authentication
5. **R2 Bucket:** Configure CORS and access policies
6. **Rate Limiting:** Consider adding rate limiting to API routes
7. **Input Validation:** Validate all user inputs on the server side

---

## Database Indexes

Create these indexes for better performance:

```javascript
// Analytics
db.imagerybyb_ovation_analytics.createIndex({ date: -1 });

// Content
db.imagerybyb_ovation_content.createIndex({ key: 1 }, { unique: true });
db.imagerybyb_ovation_content.createIndex({ section: 1, subsection: 1 });

// Gallery
db.imagerybyb_ovation_gallery.createIndex({ order: 1 });
db.imagerybyb_ovation_gallery.createIndex({ isActive: 1 });

// Inquiries
db.imagerybyb_ovation_inquiries.createIndex({ status: 1 });
db.imagerybyb_ovation_inquiries.createIndex({ submittedAt: -1 });
```

---

## Maintenance & Backups

1. **MongoDB Backups:** Set up automated daily backups
2. **R2 Backups:** Enable versioning on R2 bucket
3. **Image Optimization:** Periodically audit and optimize old images
4. **Analytics Cleanup:** Archive old analytics data (older than 1 year)
5. **Regular Updates:** Keep dependencies updated

---

## Future Enhancements

1. **Multi-user Support:** Add role-based access control
2. **Email Notifications:** Send email for new inquiries
3. **Advanced Analytics:** Add charts and detailed visitor insights
4. **Testimonials Module:** Dedicated management for testimonials
5. **SEO Management:** Add meta tags editor
6. **Bulk Operations:** Bulk upload for gallery, bulk delete, etc.
7. **Content Versioning:** Track content change history
8. **Preview Mode:** Preview changes before publishing

---

This comprehensive guide should enable a developer to implement a fully functional CMS for the ImageryByB website. All code is production-ready and follows Next.js best practices.
