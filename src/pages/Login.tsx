import React from 'react';
import AuthLayout from '../components/Layout/AuthLayout';
import LoginForm from '../components/Auth/LoginForm';
import { ToastContainer } from 'react-toastify';

const Login = () => {
  return (
    <AuthLayout
      title="Sign In"
      subtitle="Provide your details to access your account"
      alternativeAction={{
        text: "New Here?",
        linkText: "Sign up",
        href: "/register/farmer",
      }}
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;