/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable preserve-caught-error */
// ResetPassword.tsx
import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CheckCircle,
  Refresh,
  Security,
  Close,
  Home,
  ErrorOutlineOutlined,
  MailOutlineOutlined,
  WarningAmber,
  Visibility,
  VisibilityOff,
  LockOutlined,
} from "@mui/icons-material";
import axios, { AxiosError } from "axios";

// ===========================
// TYPES
// ===========================
interface ApiErrorResponse {
  message: string;
  success?: boolean;
}

interface ResetPasswordResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  token?: string;
}

interface ValidationErrors {
  newPassword?: string;
  confirmPassword?: string;
}

// ===========================
// API CONFIGURATION
// ===========================
const API_BASE_URL = "https://inyumbaproject.eu1.hubfly.app";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ===========================
// API SERVICES
// ===========================
const resetPassword = async (data: {
  token: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<ResetPasswordResponse> => {
  try {
    const response = await api.post<ResetPasswordResponse>(
      "/api/auth/reset-password",
      data
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiErrorResponse;
      throw new Error(apiError?.message || "Password reset failed");
    }
    throw new Error("Password reset failed");
  }
};

const forgotPassword = async (data: {
  email: string;
}): Promise<ForgotPasswordResponse> => {
  try {
    const response = await api.post<ForgotPasswordResponse>(
      "/api/auth/forgot-password",
      data
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiErrorResponse;
      throw new Error(apiError?.message || "Failed to send reset email");
    }
    throw new Error("Failed to send reset email");
  }
};

// ===========================
// SUCCESS MODAL
// ===========================
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onAutoClose?: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  email,
  onAutoClose,
}) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (isOpen) {
      setCountdown(5);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            if (onAutoClose) onAutoClose();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen, onAutoClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4"
              >
                <CheckCircle className="text-green-500 text-5xl" />
              </motion.div>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Password Reset Successful! 🎉
              </h2>

              <p className="text-gray-600 mb-2">
                Your password has been successfully reset for
              </p>

              <p className="font-medium text-gray-800 mb-4">{email}</p>

              <p className="text-sm text-indigo-600 font-medium mb-6">
                Redirecting to login in {countdown} seconds...
              </p>

              <button
                onClick={() => {
                  if (onAutoClose) onAutoClose();
                }}
                className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 flex items-center gap-2 mx-auto"
              >
                <Home className="text-sm" />
                Go to Login
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ===========================
// ERROR MODAL
// ===========================
interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  onRetry: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  onClose,
  message,
  onRetry,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-4"
              >
                <ErrorOutlineOutlined className="text-red-500 text-5xl" />
              </motion.div>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Reset Failed
              </h2>

              <p className="text-gray-600 mb-6">
                {message || "Something went wrong. Please try again."}
              </p>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  Close
                </button>
                <button
                  onClick={onRetry}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                >
                  <Refresh className="text-sm" />
                  Try Again
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ===========================
// FORGOT PASSWORD MODAL
// ===========================
interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await forgotPassword({ email });
      if (response.success) {
        toast.success("Password reset link sent to your email!");
        onSuccess(email);
        onClose();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to send reset email";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4"
              >
                <MailOutlineOutlined className="text-blue-500 text-3xl" />
              </motion.div>

              <h2 className="text-2xl font-bold text-gray-800">
                Forgot Password?
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Enter your email to receive a password reset link
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                  required
                />
                {error && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <WarningAmber className="text-sm" />
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
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
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <MailOutlineOutlined className="text-sm" />
                    Send Reset Link
                  </>
                )}
              </button>
            </form>

            <button
              onClick={onClose}
              className="mt-4 w-full text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ===========================
// MAIN COMPONENT: ResetPassword
// ===========================
export const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // State
  const [email, setEmail] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [resetCode, setResetCode] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResending] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [showForgotModal, setShowForgotModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(0);

  // Validation states
  const [touched, setTouched] = useState<{
    newPassword: boolean;
    confirmPassword: boolean;
  }>({
    newPassword: false,
    confirmPassword: false,
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  // Get token, code, and email from URL params
  useEffect(() => {
    const tokenParam = searchParams.get("token");
    const codeParam = searchParams.get("code");
    const emailParam = searchParams.get("email");

    if (tokenParam) {
      setToken(tokenParam);
    }

    if (codeParam) {
      setResetCode(codeParam.toUpperCase());
    }

    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }

    // If token is present, try to extract email from it
    if (tokenParam && !emailParam) {
      try {
        const tokenParts = tokenParam.split('.');
        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          if (payload.email) {
            setEmail(payload.email);
          }
        }
      } catch (error) {
        console.error("Could not decode token",error);
      }
    }
  }, [searchParams]);

  // ===========================
  // VALIDATION EFFECT
  // ===========================
  useEffect(() => {
    const errors: ValidationErrors = {};

    if (!newPassword) {
      errors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
    } else if (!/(?=.*[A-Z])/.test(newPassword)) {
      errors.newPassword = "Password must contain at least one uppercase letter";
    } else if (!/(?=.*[a-z])/.test(newPassword)) {
      errors.newPassword = "Password must contain at least one lowercase letter";
    } else if (!/(?=.*[0-9])/.test(newPassword)) {
      errors.newPassword = "Password must contain at least one number";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setValidationErrors(errors);

    const isValid =
      Object.keys(errors).length === 0 &&
      newPassword.length > 0 &&
      confirmPassword.length > 0 &&
      token.length > 0;
    setIsFormValid(isValid);
  }, [newPassword, confirmPassword, token]);

  // ===========================
  // HANDLE FIELD BLUR
  // ===========================
  const handleFieldBlur = (field: "newPassword" | "confirmPassword") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // ===========================
  // HANDLE RESET PASSWORD
  // ===========================
  const handleResetPassword = useCallback(async () => {
    if (!token) {
      setErrorMessage("Invalid reset token. Please request a new password reset.");
      setShowErrorModal(true);
      return;
    }

    const errors: ValidationErrors = {};
    if (!newPassword) errors.newPassword = "New password is required";
    if (newPassword.length < 8) errors.newPassword = "Password must be at least 8 characters";
    if (!confirmPassword) errors.confirmPassword = "Please confirm your password";
    if (newPassword !== confirmPassword) errors.confirmPassword = "Passwords do not match";

    if (Object.keys(errors).length > 0) {
      setTouched({ newPassword: true, confirmPassword: true });
      setValidationErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await resetPassword({
        token,
        newPassword,
        confirmPassword,
      });

      if (response.success) {
        setIsSuccess(true);
        setShowSuccessModal(true);
        toast.success("Password reset successfully! 🎉");

        // Auto close after countdown
        setTimeout(() => {
          setShowSuccessModal(false);
          navigate("/");
        }, 5000);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      setErrorMessage(errorMessage);
      setShowErrorModal(true);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [token, newPassword, confirmPassword, navigate]);

  // Auto-submit if token, resetCode, and email are present and valid
  useEffect(() => {
    if (token && resetCode && email && !isSuccess && !isLoading) {
      // Just auto-fill the password fields, don't auto-submit
      // User still needs to enter new password
      toast.info("Reset token detected! Please enter your new password.");
    }
  }, [token, resetCode, email, isSuccess, isLoading]);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // ===========================
  // HANDLE RESEND CODE
  // ===========================
  const handleResendCode = () => {
    setShowForgotModal(true);
  };

  // ===========================
  // HANDLE FORGOT PASSWORD SUCCESS
  // ===========================
  const handleForgotPasswordSuccess = (email: string) => {
    setEmail(email);
    toast.info("Check your email for the reset link and code.");
  };

  // ===========================
  // HANDLE CLOSE MODALS
  // ===========================
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/");
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const handleRetry = () => {
    setShowErrorModal(false);
    setNewPassword("");
    setConfirmPassword("");
    setTouched({ newPassword: true, confirmPassword: true });
  };

  // ===========================
  // RENDER
  // ===========================
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background animated circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 backdrop-blur-sm"
        >
          {/* Close Button */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Close />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-4 shadow-lg"
            >
              <LockOutlined className="text-white text-3xl" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-gray-800"
            >
              Reset Password
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 text-sm mt-1"
            >
              {token ? "Enter your new password below" : "Request a password reset"}
            </motion.p>

            {email && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm text-indigo-600 font-medium mt-2 bg-indigo-50 py-1 px-3 rounded-full inline-block"
              >
                <MailOutlineOutlined className="text-sm mr-1" />
                {email}
              </motion.p>
            )}

            {resetCode && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-sm text-green-600 font-medium mt-2 bg-green-50 py-1 px-3 rounded-full inline-block"
              >
                <CheckCircle className="text-sm mr-1" />
                Reset code: <strong>{resetCode}</strong>
              </motion.p>
            )}
          </div>

          {/* Token Status */}
          {!token && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2"
            >
              <WarningAmber className="text-yellow-500 text-sm" />
              <span className="text-yellow-700 text-sm">
                No reset token found. Please request a password reset.
              </span>
            </motion.div>
          )}

          {/* Form */}
          {token ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleResetPassword();
              }}
              className="space-y-5"
            >
              {/* New Password Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    onBlur={() => handleFieldBlur("newPassword")}
                    placeholder="Min 8 characters"
                    disabled={isSuccess}
                    className={`
                      w-full px-4 py-3 pl-11 pr-11 border rounded-lg 
                      focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                      transition-all outline-none disabled:bg-gray-50 disabled:text-gray-500
                      ${touched.newPassword && validationErrors.newPassword ? "border-red-500 bg-red-50" : "border-gray-300"}
                      ${touched.newPassword && !validationErrors.newPassword && newPassword ? "border-green-500 bg-green-50" : ""}
                    `}
                    required
                  />
                  <LockOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <VisibilityOff className="text-lg" /> : <Visibility className="text-lg" />}
                  </button>

                  {touched.newPassword && newPassword && !validationErrors.newPassword && (
                    <CheckCircle className="absolute right-11 top-1/2 transform -translate-y-1/2 text-green-500 text-lg" />
                  )}
                </div>

                {/* Password requirements */}
                <ul className="mt-1 text-xs space-y-1">
                  <li className={`flex items-center gap-1 ${newPassword.length >= 8 ? "text-green-600" : "text-gray-400"}`}>
                    {newPassword.length >= 8 ? <CheckCircle className="text-sm" /> : <span className="w-3 h-3 inline-block border border-gray-300 rounded-full mr-1" />}
                    At least 8 characters
                  </li>
                  <li className={`flex items-center gap-1 ${/(?=.*[A-Z])/.test(newPassword) ? "text-green-600" : "text-gray-400"}`}>
                    {/(?=.*[A-Z])/.test(newPassword) ? <CheckCircle className="text-sm" /> : <span className="w-3 h-3 inline-block border border-gray-300 rounded-full mr-1" />}
                    One uppercase letter
                  </li>
                  <li className={`flex items-center gap-1 ${/(?=.*[a-z])/.test(newPassword) ? "text-green-600" : "text-gray-400"}`}>
                    {/(?=.*[a-z])/.test(newPassword) ? <CheckCircle className="text-sm" /> : <span className="w-3 h-3 inline-block border border-gray-300 rounded-full mr-1" />}
                    One lowercase letter
                  </li>
                  <li className={`flex items-center gap-1 ${/(?=.*[0-9])/.test(newPassword) ? "text-green-600" : "text-gray-400"}`}>
                    {/(?=.*[0-9])/.test(newPassword) ? <CheckCircle className="text-sm" /> : <span className="w-3 h-3 inline-block border border-gray-300 rounded-full mr-1" />}
                    One number
                  </li>
                </ul>

                <AnimatePresence>
                  {touched.newPassword && validationErrors.newPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1 text-sm text-red-500 flex items-center gap-1"
                    >
                      <WarningAmber className="text-sm" />
                      {validationErrors.newPassword}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Confirm Password Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() => handleFieldBlur("confirmPassword")}
                    placeholder="Confirm your new password"
                    disabled={isSuccess}
                    className={`
                      w-full px-4 py-3 pl-11 pr-11 border rounded-lg 
                      focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                      transition-all outline-none disabled:bg-gray-50 disabled:text-gray-500
                      ${touched.confirmPassword && validationErrors.confirmPassword ? "border-red-500 bg-red-50" : "border-gray-300"}
                      ${touched.confirmPassword && !validationErrors.confirmPassword && confirmPassword && newPassword === confirmPassword ? "border-green-500 bg-green-50" : ""}
                    `}
                    required
                  />
                  <Security className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <VisibilityOff className="text-lg" /> : <Visibility className="text-lg" />}
                  </button>

                  {touched.confirmPassword && confirmPassword && newPassword === confirmPassword && (
                    <CheckCircle className="absolute right-11 top-1/2 transform -translate-y-1/2 text-green-500 text-lg" />
                  )}
                </div>

                <AnimatePresence>
                  {touched.confirmPassword && validationErrors.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1 text-sm text-red-500 flex items-center gap-1"
                    >
                      <WarningAmber className="text-sm" />
                      {validationErrors.confirmPassword}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Form validation summary */}
              <AnimatePresence>
                {Object.keys(validationErrors).length > 0 &&
                  (touched.newPassword || touched.confirmPassword) && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2"
                    >
                      <WarningAmber className="text-red-500 text-sm mt-0.5" />
                      <div className="text-sm text-red-600">
                        Please fix the following errors:
                        <ul className="list-disc list-inside mt-1 space-y-0.5">
                          {Object.values(validationErrors).map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
              </AnimatePresence>

              {/* Reset Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                type="submit"
                disabled={!isFormValid || isLoading || isSuccess}
                className={`
                  w-full py-3 px-4 text-white font-semibold rounded-lg 
                  transition-all duration-200 flex items-center justify-center gap-2
                  ${
                    !isFormValid || isLoading || isSuccess
                      ? "bg-gray-400 cursor-not-allowed opacity-70"
                      : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-lg hover:scale-[1.02]"
                  }
                `}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
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
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Resetting...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle className="text-sm" />
                    Password Reset
                  </>
                ) : (
                  <>
                    <LockOutlined className="text-sm" />
                    Reset Password
                  </>
                )}
              </motion.button>
            </form>
          ) : (
            // No token - Show request reset button
            <div className="space-y-4">
              <p className="text-gray-600 text-sm text-center">
                You need a valid reset token to change your password.
              </p>
              <button
                onClick={() => setShowForgotModal(true)}
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <MailOutlineOutlined className="text-sm" />
                Request Password Reset
              </button>
            </div>
          )}

          {/* Resend Link */}
          {token && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-gray-500">
                Didn't receive the reset email?{" "}
                <button
                  onClick={handleResendCode}
                  disabled={isResending || countdown > 0 || isSuccess}
                  className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {isResending ? (
                    <span className="flex items-center gap-1">
                      <svg
                        className="animate-spin h-4 w-4"
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
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : countdown > 0 ? (
                    `Resend in ${countdown}s`
                  ) : (
                    "Resend Reset Email"
                  )}
                </button>
              </p>
            </motion.div>
          )}

          {/* Back to Login */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 text-center"
          >
            <button
              onClick={() => navigate("/")}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              ← Back to Login
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Modals */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        email={email}
        onAutoClose={handleCloseSuccessModal}
      />

      <ErrorModal
        isOpen={showErrorModal}
        onClose={handleCloseErrorModal}
        message={errorMessage}
        onRetry={handleRetry}
      />

      <ForgotPasswordModal
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
        onSuccess={handleForgotPasswordSuccess}
      />
    </>
  );
};

