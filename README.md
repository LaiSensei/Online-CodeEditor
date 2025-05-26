# Online Code Editor Platform

A modern web application for practicing coding problems with live React code execution.

## Features

- User authentication with Firebase (register, login, logout, email verification, password reset)
- View and solve coding problems
- Live React code editor with Monaco Editor and react-live preview
- Problem difficulty levels
- Real-time code execution and error display
- Submission storage (save your code for each problem)
- Responsive UI with Tailwind CSS

## Tech Stack

- React with TypeScript
- Firebase (Authentication & Firestore)
- Tailwind CSS for styling
- Monaco Editor for code editing
- react-live for code execution and preview
- Vite for build tooling

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd online-code-editor
```

2. Install dependencies:
```bash
npm install
```

3. Create a Firebase project and enable:
   - Authentication (Email/Password)
   - Firestore Database

4. Create a `.env` file in the root directory with your Firebase configuration:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

5. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
  ├── components/     # Reusable components (Layout, PrivateRoute)
  ├── contexts/       # React contexts (AuthContext)
  ├── pages/          # Page components (Login, Register, ForgotPassword, Dashboard, ProblemView)
  ├── config/         # Firebase configuration
  ├── App.tsx         # Main App component
  └── main.tsx        # Entry point
```

## Key Features & Implementation

- **Authentication:** Register, login, logout, email verification, and password reset (forgot password) using Firebase Auth.
- **Problem Viewing:** Problems are stored in Firestore and displayed in a dashboard. Each problem has a title, difficulty, description, and starter code.
- **Code Editor & Live Preview:** Uses Monaco Editor for a professional editing experience and react-live for live React code execution and preview.
- **Error Handling:** Syntax and runtime errors are displayed below the editor. Monaco provides inline syntax error highlighting.
- **Submission Storage:** User code submissions are saved to Firestore with user, problem, code, and timestamp.
- **Password Reset:** Users can request a password reset email from the login page.

## Limitations & Future Improvements

- **Code Execution:** Only JavaScript/React code is supported in the editor and preview. Code is executed in-browser using react-live and Babel, which is suitable for MVP/demo purposes but not for running untrusted or infinite-loop code securely.
- **No Automated Correctness Checking:** The platform does not currently run user code against test cases or provide pass/fail feedback. For a production system, you would add a backend code runner (e.g., Judge0) and test case support.
- **Single Language:** Only JavaScript/React is supported. Multi-language support would require backend integration with a code execution API.
- **Security:** For a real-world platform, additional sandboxing and security measures would be needed for code execution.

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT