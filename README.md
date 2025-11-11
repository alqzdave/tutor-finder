# TutorMatch - Tutor Finding Platform

A modern, professional web-based system built with Ionic Framework and Angular that connects students/parents with tutors through a swipe-based matching interface - similar to a dating app but for education!

## 🎯 Features

### Landing Page
- Modern, professional design with gradient backgrounds
- Eye-catching hero section with clear value proposition
- Features showcase highlighting platform benefits
- "How It Works" section explaining the process
- Separate sections for students and tutors
- Fully responsive design for desktop and mobile

### Authentication System
- **Firebase Authentication** with email/password
- Role-based registration (Client/Tutor)
- Secure login with error handling
- Password visibility toggle
- Beautiful, modern UI with gradient effects

### For Clients (Students/Parents)
- **Swipe-based Tutor Discovery**
  - Tinder-like card interface
  - Swipe right to like, left to pass
  - Visual feedback with indicators
  - Smooth animations
- View tutor profiles with:
  - Subjects taught
  - Hourly rates
  - Education and experience
  - Ratings and reviews
  - Location information

### For Tutors
- Professional dashboard
- Profile management
- Display subjects taught
- Set hourly rates
- Showcase education and experience
- Statistics overview
- Edit profile functionality

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Ionic CLI (`npm install -g @ionic/cli`)
- Firebase account

### Installation

1. **Clone or navigate to the project**
   ```bash
   cd "c:\laragon\www\Finding Tutor\tutor-finder"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   - The Firebase configuration is already set up in `src/environments/`
   - Make sure Firebase Authentication is enabled in your Firebase Console
   - Enable Firestore Database

4. **Run the development server**
   ```bash
   ionic serve
   ```

5. **Access the application**
   - Open your browser to `http://localhost:8100`

## 📱 Application Flow

### 1. Landing Page (`/landing`)
- First page users see
- Clear call-to-action buttons
- Login and Sign Up options

### 2. Sign Up Selection (`/signup-selection`)
- Choose between Client or Tutor account
- Visual cards for each role
- Clear distinction between roles

### 3. Registration
- **Client Signup** (`/signup-client`)
  - First name, last name
  - Email and password
  - Optional phone number
  
- **Tutor Signup** (`/signup-tutor`)
  - First name, last name
  - Email and password
  - Phone number
  - Subjects (comma-separated)
  - Optional hourly rate

### 4. Login (`/login`)
- Email and password authentication
- Error handling with user-friendly messages
- Automatic redirection based on role

### 5. Dashboards
- **Client Dashboard** (`/client-dashboard`)
  - Swipe through tutor profiles
  - Like or pass on tutors
  - View detailed tutor information
  
- **Tutor Dashboard** (`/tutor-dashboard`)
  - View and edit profile
  - See statistics
  - Manage availability (coming soon)
  - View student requests (coming soon)

## 🛠️ Technology Stack

- **Framework**: Ionic 7 + Angular 17
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **Styling**: SCSS with custom gradients
- **Gestures**: HammerJS for swipe functionality
- **Icons**: Ionicons

## 🎨 Design Features

- Modern gradient color schemes
- Smooth animations and transitions
- Responsive layouts (mobile-first)
- Card-based UI components
- Professional typography
- Intuitive user experience

## 📁 Project Structure

```
src/
├── app/
│   ├── models/
│   │   └── user.model.ts          # User interfaces
│   ├── pages/
│   │   ├── landing/               # Landing page
│   │   ├── auth/
│   │   │   ├── login/            # Login page
│   │   │   ├── signup-selection/ # Role selection
│   │   │   ├── signup-client/    # Client registration
│   │   │   └── signup-tutor/     # Tutor registration
│   │   ├── client/
│   │   │   └── client-dashboard/ # Client swipe interface
│   │   └── tutor/
│   │       └── tutor-dashboard/  # Tutor profile management
│   ├── services/
│   │   └── auth.ts               # Authentication service
│   └── app.module.ts              # Main app module
├── environments/
│   ├── environment.ts             # Development config
│   └── environment.prod.ts        # Production config
└── theme/
    └── variables.scss             # Theme variables
```

## 🔐 Firebase Setup Details

The app uses Firebase for:
1. **Authentication** - Email/password sign-in
2. **Firestore** - User profile storage

### Firestore Structure
```
users/
  ├── {userId}/
  │   ├── uid: string
  │   ├── email: string
  │   ├── displayName: string
  │   ├── role: 'client' | 'tutor'
  │   ├── firstName: string
  │   ├── lastName: string
  │   ├── phone: string
  │   ├── createdAt: timestamp
  │   └── ... (role-specific fields)
```

## 🎯 Key Features Implemented

✅ Professional landing page with modern design  
✅ Firebase authentication integration  
✅ Role-based registration (Client/Tutor)  
✅ Secure login with validation  
✅ Client dashboard with swipe functionality  
✅ Tutor dashboard with profile management  
✅ Responsive design for all devices  
✅ Beautiful UI with gradients and animations  
✅ User-friendly error handling  
✅ Profile editing for tutors  

## 🚧 Future Enhancements

- Real-time messaging between students and tutors
- Advanced search and filtering
- Schedule management and booking system
- Payment integration
- Rating and review system
- Notification system
- Video call integration
- Admin dashboard
- Analytics and reporting

## 📝 License

This project is created for educational purposes.

## 👨‍💻 Development

To contribute or modify:

1. Make your changes
2. Test thoroughly on both desktop and mobile
3. Ensure Firebase rules are properly configured
4. Update this README if adding new features

## 🐛 Troubleshooting

**Issue: Build errors**
- Run `npm install` to ensure all dependencies are installed
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

**Issue: Firebase errors**
- Check that Firebase Authentication is enabled
- Verify Firestore is set up
- Check Firebase configuration in environment files

**Issue: Routing problems**
- Clear browser cache
- Check app-routing.module.ts for correct paths

## 📞 Support

For issues or questions, please check:
- Firebase Console for authentication errors
- Browser console for detailed error messages
- Network tab for API call failures

---

**Built with ❤️ using Ionic Framework**
