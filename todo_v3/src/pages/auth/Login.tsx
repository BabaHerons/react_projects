import { useState } from "react";
import { usePageTitle } from "../../hooks/usePageTitle";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";


export default function Login() {
  usePageTitle("Login")
  
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')

  const toggleAuthMode = () => {
    setAuthMode(prev => prev === 'login' ? 'signup' : 'login');
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen overflow-y-auto px-4">
      {authMode === 'login' 
      ? (
        <LoginForm onSwitchToSignup={toggleAuthMode}/>
      ) 
      : (
        <SignupForm onSwitchToLogin={toggleAuthMode}/>
      )}
    </div>
  );
}


