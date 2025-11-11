# Quick Start Guide - TutorMatch

## 🎉 Welcome to TutorMatch!

Your tutor-finding platform is ready to use! Follow these simple steps to get started.

## 🚀 Start the Application

The development server should already be running. If not:

```bash
cd "c:\laragon\www\Finding Tutor\tutor-finder"
ionic serve
```

The app will open automatically at: **http://localhost:8100**

## 📖 How to Use

### First Time Setup

1. **Open the App**
   - Navigate to `http://localhost:8100`
   - You'll see the beautiful landing page

2. **Create a Test Account**
   
   **As a Student/Client:**
   - Click "Sign Up" or "Get Started"
   - Select "I'm a Student/Parent"
   - Fill in the registration form
   - Login with your credentials
   - Start swiping through tutor profiles!

   **As a Tutor:**
   - Click "Become a Tutor" or select tutor during signup
   - Fill in tutor details (name, subjects, rate)
   - Login to access your tutor dashboard
   - Edit your profile and manage your tutoring info

### Testing the Swipe Feature

The app includes **mock tutor data** for testing:
- John Smith - Math, Physics, Chemistry
- Sarah Johnson - English, Literature, Writing  
- Mike Chen - Computer Science, Programming

**How to Swipe:**
- **Drag left** or click the ❌ button to pass
- **Drag right** or click the ❤️ button to like
- Swipe through all profiles to see the completion screen

## 🔥 Firebase Configuration

Your Firebase is already configured with these details:
- **Project ID**: finding-tutor-78159
- **Auth Domain**: finding-tutor-78159.firebaseapp.com

### Important: Enable Firebase Services

Before real authentication works, make sure to:

1. **Go to Firebase Console**: https://console.firebase.google.com
2. **Select your project**: finding-tutor-78159
3. **Enable Authentication**:
   - Click "Authentication" in the left menu
   - Click "Get Started"
   - Enable "Email/Password" sign-in method
4. **Enable Firestore**:
   - Click "Firestore Database" in the left menu
   - Click "Create Database"
   - Start in **test mode** (for development)

## 🎨 What You'll See

### Landing Page
- Modern purple gradient design
- Hero section with statistics
- Features grid showcasing benefits
- "How It Works" section
- Call-to-action buttons

### Login Page
- Clean white card design
- Password visibility toggle
- Error handling
- Link to sign up

### Signup Pages
- Role selection with beautiful cards
- Separate forms for clients and tutors
- Form validation
- Professional styling

### Client Dashboard
- **Swipe Cards** - Tinder-style interface
- Tutor profiles with all details
- Visual swipe indicators
- Like/Pass action buttons
- Smooth animations

### Tutor Dashboard
- Profile overview
- Statistics cards (Students, Sessions, Rate)
- Subject tags
- Edit profile functionality
- Quick action cards

## 🎯 Test User Flows

### Client Flow
1. Land on homepage → Click "Sign Up"
2. Choose "Student/Parent"
3. Complete registration form
4. Auto-login and redirect to swipe dashboard
5. Browse and swipe through tutors
6. Logout when done

### Tutor Flow
1. Land on homepage → Click "Become a Tutor"
2. Fill in tutor registration (include subjects!)
3. Auto-login and redirect to tutor dashboard
4. View profile and statistics
5. Edit profile with bio, education, experience
6. Logout when done

## 🎨 Design Highlights

**Color Schemes:**
- Client theme: Purple gradient (#667eea → #764ba2)
- Tutor theme: Pink gradient (#f093fb → #f5576c)
- Professional: White cards with subtle shadows

**Responsive:**
- Works on desktop (1200px+)
- Tablet (768px - 1200px)
- Mobile (< 768px)

## 🛠️ Customization Tips

### Change Colors
Edit `src/app/pages/*/page.scss` files:
- Landing: Purple gradients
- Client: Blue/purple theme
- Tutor: Pink/red theme

### Add More Mock Tutors
Edit `src/app/pages/client/client-dashboard/client-dashboard.page.ts`
Look for the `getMockTutors()` function

### Modify User Fields
Edit `src/app/models/user.model.ts`
Add new fields to ClientProfile or TutorProfile interfaces

## 📱 Mobile Testing

To test on your phone:

1. Find your computer's IP address
2. Update ionic serve command:
   ```bash
   ionic serve --external
   ```
3. Open the provided URL on your phone

## 🐛 Common Issues

**Port already in use?**
```bash
ionic serve --port 8101
```

**Firebase errors?**
- Check Firebase Console
- Ensure Auth and Firestore are enabled
- Verify internet connection

**Build errors?**
```bash
npm install
npm start
```

**Swipe not working?**
- HammerJS should be installed
- Try refreshing the page
- Use the like/pass buttons as alternative

## 🎓 Next Steps

1. **Test all features** - Login, signup, swipe, logout
2. **Enable Firebase services** for real authentication
3. **Add real tutor accounts** via tutor signup
4. **Customize the design** to match your brand
5. **Add more features** from the roadmap

## 📞 Need Help?

Check these files:
- `README.md` - Full documentation
- `src/app/services/auth.ts` - Authentication logic
- `src/environments/environment.ts` - Configuration

## 🎉 Enjoy Your App!

You now have a fully functional, professional tutor-finding platform with:
- ✅ Beautiful landing page
- ✅ Secure authentication
- ✅ Swipe-based matching
- ✅ Role-based dashboards
- ✅ Responsive design
- ✅ Firebase integration

**Happy matching! 🎓✨**
