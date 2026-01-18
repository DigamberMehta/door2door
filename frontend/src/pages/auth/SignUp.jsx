import { useState } from "react";
import {
  ChevronLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (apiError) {
      setApiError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[-\s]/g, ""))) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setApiError("");

    try {
      // Prepare data for backend (exclude confirmPassword)
      const { confirmPassword, ...registerData } = formData;

      await register(registerData);

      // Navigate to home
      navigate("/");
    } catch (error) {
      setApiError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[rgb(49,134,22)]/30 font-sans">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between px-3 py-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 -ml-1.5 active:bg-white/10 rounded-full transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-sm font-semibold tracking-tight">Sign Up</h1>
          <div className="w-8"></div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-4 pb-4">
        <div className="max-w-md mx-auto">
          {/* Welcome Text */}
          <div className="mb-5">
            <h2 className="text-2xl font-bold mb-1">Create account</h2>
            <p className="text-white/50 text-xs">Sign up to get started</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* API Error Message */}
            {apiError && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                <p className="text-red-400 text-xs">{apiError}</p>
              </div>
            )}

            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-white/60 uppercase tracking-wider font-semibold block">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <User className="w-4 h-4 text-white/40" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full bg-white/5 backdrop-blur-xl border ${
                    errors.name ? "border-red-500/50" : "border-white/5"
                  } rounded-xl px-3 pl-10 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-all`}
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-xs px-1">{errors.name}</p>
              )}
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-white/60 uppercase tracking-wider font-semibold block">
                Email
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Mail className="w-4 h-4 text-white/40" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={`w-full bg-white/5 backdrop-blur-xl border ${
                    errors.email ? "border-red-500/50" : "border-white/5"
                  } rounded-xl px-3 pl-10 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-all`}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs px-1">{errors.email}</p>
              )}
            </div>

            {/* Phone Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-white/60 uppercase tracking-wider font-semibold block">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Phone className="w-4 h-4 text-white/40" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9084610979"
                  className={`w-full bg-white/5 backdrop-blur-xl border ${
                    errors.phone ? "border-red-500/50" : "border-white/5"
                  } rounded-xl px-3 pl-10 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-all`}
                />
              </div>
              {errors.phone && (
                <p className="text-red-400 text-xs px-1">{errors.phone}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-white/60 uppercase tracking-wider font-semibold block">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Lock className="w-4 h-4 text-white/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className={`w-full bg-white/5 backdrop-blur-xl border ${
                    errors.password ? "border-red-500/50" : "border-white/5"
                  } rounded-xl px-3 pl-10 pr-10 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 active:bg-white/10 rounded-lg transition-all"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-white/40" />
                  ) : (
                    <Eye className="w-4 h-4 text-white/40" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs px-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-white/60 uppercase tracking-wider font-semibold block">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Lock className="w-4 h-4 text-white/40" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className={`w-full bg-white/5 backdrop-blur-xl border ${
                    errors.confirmPassword
                      ? "border-red-500/50"
                      : "border-white/5"
                  } rounded-xl px-3 pl-10 pr-10 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 active:bg-white/10 rounded-lg transition-all"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4 text-white/40" />
                  ) : (
                    <Eye className="w-4 h-4 text-white/40" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs px-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="pt-1">
              <p className="text-[10px] text-white/40 leading-relaxed">
                By signing up, you agree to our{" "}
                <button type="button" className="text-white underline">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button type="button" className="text-white underline">
                  Privacy Policy
                </button>
              </p>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[rgb(49,134,22)] text-white text-sm font-semibold py-2.5 rounded-xl active:bg-[rgb(49,134,22)]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                  Creating account...
                </span>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-5 text-center">
            <p className="text-white/50 text-xs">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-white font-semibold active:text-white/80 transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
