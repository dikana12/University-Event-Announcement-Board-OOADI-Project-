# 🚀 University Event Announcement Board - Deployment Guide

This guide will help you deploy the University Event Announcement Board application to production.

## 📋 Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- Git
- A hosting service (Heroku, Vercel, Netlify, etc.)

## 🏗️ Project Structure

```
University-Event-Announcement-Board-OOADI-Project-/
├── frontend/                 # React application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── build.sh
├── backend/                  # Flask API
│   ├── app.py
│   ├── requirements.txt
│   └── deploy.sh
└── DEPLOYMENT.md
```

## 🚀 Deployment Options

### Option 1: Deploy to Heroku (Recommended)

#### Frontend Deployment (Heroku)

1. **Create Heroku App**
   ```bash
   cd frontend
   heroku create your-app-name
   ```

2. **Add Buildpack**
   ```bash
   heroku buildpacks:set mars/create-react-app
   ```

3. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy frontend"
   git push heroku main
   ```

#### Backend Deployment (Heroku)

1. **Create Heroku App**
   ```bash
   cd backend
   heroku create your-api-name
   ```

2. **Add Python Buildpack**
   ```bash
   heroku buildpacks:set heroku/python
   ```

3. **Create Procfile**
   ```bash
   echo "web: gunicorn app:app" > Procfile
   ```

4. **Update requirements.txt**
   ```bash
   echo "gunicorn==20.1.0" >> requirements.txt
   ```

5. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy backend"
   git push heroku main
   ```

### Option 2: Deploy to Vercel (Frontend)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy Frontend**
   ```bash
   cd frontend
   vercel
   ```

### Option 3: Deploy to Railway

1. **Connect to Railway**
   ```bash
   npm install -g @railway/cli
   railway login
   ```

2. **Deploy Both Services**
   ```bash
   railway up
   ```

## 🔧 Environment Configuration

### Frontend Environment Variables

Create `.env` file in `frontend/`:

```env
REACT_APP_API_URL=https://your-backend-url.herokuapp.com
REACT_APP_ENVIRONMENT=production
```

### Backend Environment Variables

Set in Heroku dashboard or create `.env` file in `backend/`:

```env
FLASK_ENV=production
SECRET_KEY=your-secret-key-here
DATABASE_URL=your-database-url
```

## 📦 Build Commands

### Frontend Build
```bash
cd frontend
npm install
npm run build
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## 🌐 Production URLs

After deployment, update the API URL in your frontend:

```javascript
// In frontend/src/context/AuthContext.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-backend-url.herokuapp.com';
```

## 🔒 Security Considerations

1. **Environment Variables**: Never commit sensitive data
2. **CORS Configuration**: Update CORS settings for production
3. **HTTPS**: Ensure all connections use HTTPS
4. **Database**: Use production database (PostgreSQL, MongoDB, etc.)

## 📊 Monitoring

### Frontend Monitoring
- Use Vercel Analytics or Google Analytics
- Monitor Core Web Vitals
- Set up error tracking (Sentry)

### Backend Monitoring
- Use Heroku logs or Railway logs
- Set up error tracking
- Monitor API response times

## 🚀 Quick Deploy Script

Create a `deploy.sh` file in the root directory:

```bash
#!/bin/bash

echo "🚀 Deploying University Event Announcement Board..."

# Frontend deployment
echo "📦 Deploying Frontend..."
cd frontend
npm install
npm run build

# Backend deployment
echo "🐍 Deploying Backend..."
cd ../backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

echo "✅ Deployment completed!"
echo "🌐 Frontend: https://your-frontend-url"
echo "🔧 Backend: https://your-backend-url"
```

## 🎯 Post-Deployment Checklist

- [ ] Test all features in production
- [ ] Verify API endpoints are working
- [ ] Check authentication flow
- [ ] Test file uploads (if applicable)
- [ ] Monitor error logs
- [ ] Set up domain (if needed)
- [ ] Configure SSL certificates
- [ ] Set up backups
- [ ] Test admin dashboard
- [ ] Verify user roles and permissions

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**: Update CORS configuration in backend
2. **Build Failures**: Check Node.js and Python versions
3. **API Connection**: Verify environment variables
4. **Database Issues**: Check database connection strings

### Debug Commands

```bash
# Check Heroku logs
heroku logs --tail

# Check Vercel deployment
vercel logs

# Test API locally
curl http://localhost:5000/api/health
```

## 📞 Support

For deployment issues:
1. Check the logs in your hosting platform
2. Verify environment variables
3. Test locally first
4. Check the hosting platform's documentation

---

**🎓 University Event Announcement Board - Ready for Production!** 