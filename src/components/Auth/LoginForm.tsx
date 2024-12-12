import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import AuthService from "../../api/auth.service";
import { toast } from "react-toastify";

// Define the login schema
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const navigate = useNavigate();
  const authService = new AuthService();
  const [error, setError] = useState<string | null>(null); // For error messages
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Make API call to login
      const response = await authService.signIn({
        email: data.email,
        password: data.password,
      });
      console.log(response);
      if (!response.status) {
        toast.error(response?.message);
        return;
      }

      toast.success(response?.message);
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("role", response.data.user.role);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
<form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg  max-w-md mx-auto">
  {error && (
    <div className="text-red-600 text-sm flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m2 0a8 8 0 11-16 0 8 8 0 0116 0z" />
      </svg>
      <span>{error}</span>
    </div>
  )}

  {/* Email */}
  <div>
    <label
      htmlFor="email"
      className="block text-sm font-semibold text-gray-800"
    >
      Email
    </label>
    <input
      {...register("email")}
      type="email"
      placeholder="Enter your email"
      className="mt-2 block w-full rounded-full border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 h-12 px-4 text-sm placeholder-gray-400 hover:border-gray-400 focus:bg-white transition"
    />
    {errors.email && (
      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1 4h.01m-6.938 4h13.856c.501 0 .933-.38.993-.874l.007-.126V5c0-.502-.38-.933-.874-.993L20 4H4c-.502 0-.933.38-.993.874L3 5v14c0 .502.38.933.874.993L4 20z" />
        </svg>
        {errors.email.message}
      </p>
    )}
  </div>

  {/* Password */}
  <div>
    <label
      htmlFor="password"
      className="block text-sm font-semibold text-gray-800"
    >
      Password
    </label>
    <input
      {...register("password")}
      type="password"
      placeholder="Enter your password"
      className="mt-2 block w-full rounded-full border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 h-12 px-4 text-sm placeholder-gray-400 hover:border-gray-400 focus:bg-white transition"
    />
    {errors.password && (
      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1 4h.01m-6.938 4h13.856c.501 0 .933-.38.993-.874l.007-.126V5c0-.502-.38-.933-.874-.993L20 4H4c-.502 0-.933.38-.993.874L3 5v14c0 .502.38.933.874.993L4 20z" />
        </svg>
        {errors.password.message}
      </p>
    )}
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    disabled={isSubmitting}
    className={`w-full flex items-center justify-center py-3 px-4 rounded-full text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition ${
      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
    }`}
  >
    {isSubmitting ? (
      <>
        <svg
          className="animate-spin h-5 w-5 text-white mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l-2-2 2 2 2-2V4a8 8 0 018 8h-4l2 2-2-2-2 2h4z"
          ></path>
        </svg>
        Signing in...
      </>
    ) : (
      "Sign in"
    )}
  </button>
</form>

  );
};

export default LoginForm;
