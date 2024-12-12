import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthService from "../../api/auth.service";
import { toast } from "react-toastify";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  contact: string;
  state: string;
  address?: string;
  ward?: string;
  lga?: string;
  middleName?: string;
}

interface FormErrors {
  [key: string]: string;
}

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const authService = new AuthService();
  const { role } = useParams<{ role?: string }>();

  const [step, setStep] = useState<number>(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    contact: '',
    state: '',
    address: '',
    ward: '',
    lga: '',
    middleName: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const validateFirstStep = (): FormErrors => {
    const newErrors: FormErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    return newErrors;
  };

  const validateSecondStep = (): FormErrors => {
    const newErrors: FormErrors = {};
    
    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }
    
    if (!formData.contact.trim()) {
      newErrors.contact = "Contact information is required";
    } else if (formData.contact.length < 6) {
      newErrors.contact = "Contact must be at least 6 characters";
    }

    return newErrors;
  };

  const handleNext = () => {
    const stepErrors = validateFirstStep();
    if (Object.keys(stepErrors).length === 0) {
      setStep(2);
      setErrors({});
    } else {
      setErrors(stepErrors);
    }
  };

  const handlePrevious = () => {
    setStep(1);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const firstStepErrors = validateFirstStep();
    const secondStepErrors = validateSecondStep();
    const combinedErrors = { ...firstStepErrors, ...secondStepErrors };

    if (Object.keys(combinedErrors).length > 0) {
      setErrors(combinedErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await authService.signUp({
        firstName: formData.firstName,
        lastName: formData.lastName,
        contact: formData.contact,
        middleName: formData.middleName,
        email: formData.email,
        password: formData.password,
        role: role || "farmer",
        location: {
          address: formData.address,
          state: formData.state,
          ward: formData.ward,
          lga: formData.lga,
        },
      });

      if (!response.status) {
        toast.error(response?.message || "Registration failed");
        setIsSubmitting(false);
        return;
      }

      toast.success(response?.message || "Registration successful");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
      setErrors({ submit: errorMessage });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.submit && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded relative" role="alert">
            {errors.submit}
          </div>
        )}

        {step === 1 && (
          <div>
            

            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`
                  block w-full rounded-full border
                  ${errors.firstName 
                    ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-green-500 focus:ring-green-500'
                  }
                  shadow-sm h-10 py-2 px-2 text-base
                `}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`
                  block w-full rounded-full border
                  ${errors.lastName 
                    ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-green-500 focus:ring-green-500'
                  }
                  shadow-sm h-10 py-2 px-2 text-base
                `}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`
                  block w-full rounded-full border
                  ${errors.email 
                    ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-green-500 focus:ring-green-500'
                  }
                  shadow-sm h-10 py-2 px-2 text-base
                `}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`
                  block w-full rounded-full border
                  ${errors.password 
                    ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-green-500 focus:ring-green-500'
                  }
                  shadow-sm h-10 py-2 px-2 text-base
                `}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`
                  block w-full rounded-full border
                  ${errors.confirmPassword 
                    ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-green-500 focus:ring-green-500'
                  }
                  shadow-sm h-10 py-2 px-2 text-base
                `}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-orange-600 text-white  rounded-full hover:bg-orange-700 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Additional Information
            </h2>

            <div className="mb-4">
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number
              </label>
              <input
                id="contact"
                name="contact"
                type="text"
                value={formData.contact}
                onChange={handleInputChange}
                className={`
                  block w-full rounded-full border
                  ${errors.contact 
                    ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-green-500 focus:ring-green-500'
                  }
                  shadow-sm h-10 py-2 px-2 text-base
                `}
              />
              {errors.contact && (
                <p className="mt-1 text-sm text-red-600">{errors.contact}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                id="state"
                name="state"
                type="text"
                value={formData.state}
                onChange={handleInputChange}
                className={`
                  block w-full rounded-full border
                  ${errors.state 
                    ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-green-500 focus:ring-green-500'
                  }
                  shadow-sm h-10 py-2 px-2 text-base
                `}
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-600">{errors.state}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address (Optional)
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleInputChange}
                className="block w-full rounded-full border-gray-300 shadow-sm h-10 py-2 px-2 text-base"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="ward" className="block text-sm font-medium text-gray-700 mb-1">
                Ward (Optional)
              </label>
              <input
                id="ward"
                name="ward"
                type="text"
                value={formData.ward}
                onChange={handleInputChange}
                className="block w-full rounded-full border-gray-300 shadow-sm h-10 py-2 px-2 text-base"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="lga" className="block text-sm font-medium text-gray-700 mb-1">
                Local Government Area (Optional)
              </label>
              <input
                id="lga"
                name="lga"
                type="text"
                value={formData.lga}
                onChange={handleInputChange}
                className="block w-full rounded-full border-gray-300 shadow-sm h-10 py-2 px-2 text-base"
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handlePrevious}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition-colors"
              >
                Back 
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  px-6 py-2 text-white rounded-full transition-colors
                  ${isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-orange-600 hover:bg-orange-700'
                  }
                `}
              >
                {isSubmitting ? 'Submitting...' : 'Create Account'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
