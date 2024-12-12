import React from 'react';
import AuthLayout from '../components/Layout/AuthLayout';
import RegisterForm from '../components/Auth/RegisterForm';

const Register = () => {
  return (
    <AuthLayout
      title="Tell Us About Yourself"
      subtitle="Maximize Crop Yields Effortlessly!"
      alternativeAction={{
        text: "Already have an account?",
        linkText: "Sign in",
        href: "/login",
      }}
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;