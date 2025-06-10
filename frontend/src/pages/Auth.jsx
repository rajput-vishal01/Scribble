import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  PenTool,
  AlertCircle,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const hasNavigated = useRef(false);

  const { signup, login, isSigningUp, isLoggingIn, authUser, checkAuth } =
    useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (authUser && !hasNavigated.current) {
      hasNavigated.current = true;
      navigate("/", { replace: true });
    }
  }, [authUser, navigate]);

  useEffect(() => {
    setFormData({ name: "", username: "", email: "", password: "" });
    setError("");
    setFormErrors({});
    setShowPassword(false);
  }, [isLogin]);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const errors = {};
    if (!isLogin && !formData.name?.trim()) {
      errors.name = "Full name is required";
    }
    if (!formData.username?.trim()) {
      errors.username = "Username is required";
    } else if (formData.username.trim().length < 3) {
      errors.username = "Username must be at least 3 characters";
    }
    if (!isLogin && !formData.email?.trim()) {
      errors.email = "Email is required";
    } else if (!isLogin && !isValidEmail(formData.email)) {
      errors.email = "Enter a valid email address";
    }
    if (!formData.password?.trim()) {
      errors.password = "Password is required";
    } else if (!isLogin && formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFormErrors({});
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    try {
      if (isLogin) {
        await login({
          username: formData.username.trim(),
          password: formData.password,
        });
      } else {
        await signup({
          name: formData.name.trim(),
          username: formData.username.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        });
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        `${isLogin ? "Login" : "Signup"} failed. Please try again.`;
      setError(errorMessage);
    }
  };

  const isLoading = isLogin ? isLoggingIn : isSigningUp;

  return (
    <>
      <div className="min-h-screen bg-stone-100 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4 border border-stone-200">
              <PenTool className="w-8 h-8 text-amber-600" />
            </div>
            <h1 className="text-3xl font-bold text-stone-800 mb-2 tracking-tight">
              SCRIBBLE
            </h1>
            <p className="text-stone-600 text-sm leading-relaxed">
              {isLogin
                ? "Welcome back! Please sign in to your account"
                : "Create your account and start organizing your thoughts"}
            </p>
          </div>

          {/* Dummy Credentials Notice - Moved inside container */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium shadow-sm border border-amber-300">
              <AlertCircle className="w-4 h-4" />
              Use dummy credentials to login or sign up
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b border-stone-200">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                disabled={isLoading}
                className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-200 relative ${
                  isLogin
                    ? "text-amber-700 bg-amber-50 border-b-2 border-amber-600"
                    : "text-stone-500 hover:text-stone-700 hover:bg-stone-50"
                }`}>
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                disabled={isLoading}
                className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-200 relative ${
                  !isLogin
                    ? "text-amber-700 bg-amber-50 border-b-2 border-amber-600"
                    : "text-stone-500 hover:text-stone-700 hover:bg-stone-50"
                }`}>
                Sign Up
              </button>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6" noValidate>
              {/* Error Alert */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-red-800 font-medium">
                        Authentication Error
                      </p>
                      <p className="text-xs text-red-600 mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Full Name Field */}
              {!isLogin && (
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-stone-700">
                    Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-stone-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      placeholder="Enter your full name"
                      className={`w-full pl-12 pr-4 py-3 border rounded-xl bg-white text-stone-800 placeholder-stone-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                        formErrors.name
                          ? "border-red-300 focus:ring-red-500"
                          : "border-stone-300 hover:border-stone-400"
                      } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    />
                  </div>
                  {formErrors.name && (
                    <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.name}
                    </p>
                  )}
                </div>
              )}

              {/* Username Field */}
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-stone-700">
                  Username *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-stone-400" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    placeholder="Enter your username"
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl bg-white text-stone-800 placeholder-stone-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                      formErrors.username
                        ? "border-red-300 focus:ring-red-500"
                        : "border-stone-300 hover:border-stone-400"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  />
                </div>
                {formErrors.username && (
                  <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {formErrors.username}
                  </p>
                )}
              </div>

              {/* Email Field */}
              {!isLogin && (
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-stone-700">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-stone-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      placeholder="Enter your email address"
                      className={`w-full pl-12 pr-4 py-3 border rounded-xl bg-white text-stone-800 placeholder-stone-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                        formErrors.email
                          ? "border-red-300 focus:ring-red-500"
                          : "border-stone-300 hover:border-stone-400"
                      } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    />
                  </div>
                  {formErrors.email && (
                    <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.email}
                    </p>
                  )}
                </div>
              )}

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-stone-700">
                  Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-stone-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    placeholder={
                      isLogin
                        ? "Enter your password"
                        : "Create a secure password (min 6 characters)"
                    }
                    className={`w-full pl-12 pr-12 py-3 border rounded-xl bg-white text-stone-800 placeholder-stone-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                      formErrors.password
                        ? "border-red-300 focus:ring-red-500"
                        : "border-stone-300 hover:border-stone-400"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-stone-50 rounded-r-xl transition-colors duration-200">
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-stone-400 hover:text-stone-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-stone-400 hover:text-stone-600" />
                    )}
                  </button>
                </div>
                {formErrors.password && (
                  <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {formErrors.password}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none shadow-lg hover:shadow-xl">
                {isLoading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>
                      {isLogin ? "Signing in..." : "Creating account..."}
                    </span>
                  </div>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    {isLogin ? "Sign In" : "Create Account"}
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-xs text-stone-500">
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
