/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable preserve-caught-error */
// Verification.tsx
import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CheckCircle,
  Refresh,
  ArrowForward,
  Security,
  Schedule,
  VerifiedUser,
  Close,
  Home,
  ErrorOutlineOutlined,
  MailOutlineOutlined,
  WarningAmber,
} from "@mui/icons-material";
import axios, { AxiosError } from "axios";

// ===========================
// TYPES
// ===========================
interface ApiErrorResponse {
  message: string;
  success?: boolean;
}

interface VerifyResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    isEmailVerified: boolean;
    isActive: boolean;
  };
}

interface ResendResponse {
  success: boolean;
  message: string;
}

interface ValidationErrors {
  email?: string;
  code?: string;
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
const verifyEmail = async (data: {
  email: string;
  code: string;
}): Promise<VerifyResponse> => {
  try {
    const response = await api.post<VerifyResponse>("/auth/verify-email", data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiErrorResponse;
      throw new Error(apiError?.message || "Verification failed");
    }
    throw new Error("Verification failed");
  }
};

const resendVerificationCode = async (data: {
  email: string;
}): Promise<ResendResponse> => {
  try {
    const response = await api.post<ResendResponse>(
      "/auth/resend-verification",
      data,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiErrorResponse;
      throw new Error(apiError?.message || "Failed to resend code");
    }
    throw new Error("Failed to resend code");
  }
};

// ===========================
// MODAL COMPONENTS
// ===========================

// Success Modal
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  email,
}) => {
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
                Verification Successful! 🎉
              </h2>

              <p className="text-gray-600 mb-2">
                Your email{" "}
                <span className="font-medium text-gray-800">{email}</span> has
                been verified.
              </p>

              <p className="text-sm text-gray-500 mb-6">
                Welcome to our platform! You'll be redirected shortly.
              </p>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                >
                  <Home className="text-sm" />
                  Go to Home
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Error Modal
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
                Verification Failed
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

// Confirm Modal
interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  email,
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
                className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-4"
              >
                <MailOutlineOutlined className="text-blue-500 text-5xl" />
              </motion.div>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Code Resent! 📧
              </h2>

              <p className="text-gray-600 mb-2">
                A new verification code has been sent to
              </p>

              <p className="font-medium text-gray-800 mb-6">{email}</p>

              <p className="text-sm text-gray-500 mb-6">
                Please check your email and enter the new code.
              </p>

              <button
                onClick={onClose}
                className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ===========================
// VALIDATION HELPERS
// ===========================
const validateEmail = (email: string): string | undefined => {
  if (!email) {
    return "Email is required";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  return undefined;
};

const validateCode = (code: string): string | undefined => {
  if (!code) {
    return "Verification code is required";
  }
  if (code.length !== 6) {
    return "Code must be exactly 6 characters";
  }
  if (!/^[A-Z0-9]+$/.test(code)) {
    return "Code must contain only letters and numbers";
  }
  return undefined;
};

// ===========================
// MAIN COMPONENT: VerificationPage
// ===========================
export const VerificationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // State
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(0);

  // Validation states
  const [touched, setTouched] = useState<{ email: boolean; code: boolean }>({
    email: false,
    code: false,
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {},
  );
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  // Get email and code from URL params
  useEffect(() => {
    const emailParam = searchParams.get("email");
    const codeParam = searchParams.get("code");

    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
      setTouched((prev) => ({ ...prev, email: true }));
    }
    if (codeParam) {
      setCode(codeParam.toUpperCase());
      setTouched((prev) => ({ ...prev, code: true }));
    }
  }, [searchParams]);

  // ===========================
  // VALIDATION EFFECT
  // ===========================
  useEffect(() => {
    const errors: ValidationErrors = {};
    const emailError = validateEmail(email);
    const codeError = validateCode(code);

    if (emailError) errors.email = emailError;
    if (codeError) errors.code = codeError;

    setValidationErrors(errors);

    // Check if form is valid
    const isValid =
      Object.keys(errors).length === 0 && email.length > 0 && code.length > 0;
    setIsFormValid(isValid);
  }, [email, code]);

  // ===========================
  // HANDLE FIELD BLUR
  // ===========================
  const handleFieldBlur = (field: "email" | "code") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // ===========================
  // HANDLE VERIFY
  // ===========================
  const handleVerify = useCallback(async () => {
    // Validate before submitting
    const emailError = validateEmail(email);
    const codeError = validateCode(code);

    if (emailError || codeError) {
      setTouched({ email: true, code: true });
      if (emailError) toast.error(emailError);
      if (codeError) toast.error(codeError);
      return;
    }

    setIsLoading(true);

    try {
      const response = await verifyEmail({ email, code });

      if (response.success) {
        setIsVerified(true);
        setShowSuccessModal(true);
        toast.success("Email verified successfully! 🎉");

        // Redirect to home after 3 seconds
        setTimeout(() => {
          setShowSuccessModal(false);
          navigate("/");
        }, 3000);
      } else {
        setErrorMessage(response.message || "Verification failed");
        setShowErrorModal(true);
        toast.error(response.message || "Verification failed");
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
  }, [email, code, navigate]);

  // Auto-submit if both email and code are present and valid
  useEffect(() => {
    if (email && code && isFormValid && !isVerified && !isLoading) {
      const timer = setTimeout(() => {
        handleVerify();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [email, code, isFormValid, isVerified, isLoading, handleVerify]);

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
  const handleResendCode = async () => {
    // Validate email before resending
    const emailError = validateEmail(email);
    if (emailError) {
      setTouched((prev) => ({ ...prev, email: true }));
      toast.error(emailError);
      return;
    }

    setIsResending(true);
    setCountdown(60);

    try {
      const response = await resendVerificationCode({ email });

      if (response.success) {
        toast.success("New verification code sent to your email!");
        setShowConfirmModal(true);
      } else {
        toast.error(response.message || "Failed to resend code");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to resend code";
      toast.error(errorMessage);
    } finally {
      setIsResending(false);
    }
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

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleRetry = () => {
    setShowErrorModal(false);
    setCode("");
    setTouched((prev) => ({ ...prev, code: true }));
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
              <MailOutlineOutlined className="text-white text-3xl" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-gray-800"
            >
              Email Verification
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 text-sm mt-1"
            >
              Enter the verification code sent to your email
            </motion.p>
          </div>

          {/* Verification Status Badge */}
          {isVerified && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2"
            >
              <VerifiedUser className="text-green-500 text-sm" />
              <span className="text-green-700 text-sm font-medium">
                Email verified successfully
              </span>
            </motion.div>
          )}

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleVerify();
            }}
            className="space-y-5"
          >
            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleFieldBlur("email")}
                  placeholder="your@email.com"
                  disabled={isVerified}
                  className={`
                    w-full px-4 py-3 pl-11 border rounded-lg 
                    focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                    transition-all outline-none disabled:bg-gray-50 disabled:text-gray-500
                    ${touched.email && validationErrors.email ? "border-red-500 bg-red-50" : "border-gray-300"}
                    ${touched.email && !validationErrors.email && email ? "border-green-500 bg-green-50" : ""}
                  `}
                  required
                />
                <MailOutlineOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />

                {/* Validation icons */}
                {touched.email && email && !validationErrors.email && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 text-lg" />
                )}
                {touched.email && validationErrors.email && (
                  <WarningAmber className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 text-lg" />
                )}
              </div>

              {/* Error message */}
              <AnimatePresence>
                {touched.email && validationErrors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-1 text-sm text-red-500 flex items-center gap-1"
                  >
                    <WarningAmber className="text-sm" />
                    {validationErrors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Code Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value.toUpperCase().slice(0, 6))
                  }
                  onBlur={() => handleFieldBlur("code")}
                  placeholder="XXXXXX"
                  maxLength={6}
                  disabled={isVerified}
                  className={`
                    w-full px-4 py-3 pl-11 border rounded-lg 
                    focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                    transition-all outline-none uppercase font-mono text-lg tracking-widest 
                    disabled:bg-gray-50 disabled:text-gray-500
                    ${touched.code && validationErrors.code ? "border-red-500 bg-red-50" : "border-gray-300"}
                    ${touched.code && !validationErrors.code && code ? "border-green-500 bg-green-50" : ""}
                  `}
                  required
                />
                <Security className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />

                {/* Validation icons */}
                {touched.code && code && !validationErrors.code && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 text-lg" />
                )}
                {touched.code && validationErrors.code && (
                  <WarningAmber className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 text-lg" />
                )}
              </div>

              <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                <Schedule className="text-xs" />
                Enter the 6-digit code from your email
              </p>

              {/* Error message */}
              <AnimatePresence>
                {touched.code && validationErrors.code && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-1 text-sm text-red-500 flex items-center gap-1"
                  >
                    <WarningAmber className="text-sm" />
                    {validationErrors.code}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Form validation summary */}
            <AnimatePresence>
              {Object.keys(validationErrors).length > 0 &&
                (touched.email || touched.code) && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2"
                  >
                    <WarningAmber className="text-red-500 text-sm mt-0.5" />
                    <div className="text-sm text-red-600">
                      Please fix the following errors before submitting:
                      <ul className="list-disc list-inside mt-1 space-y-0.5">
                        {Object.values(validationErrors).map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>

            {/* Verify Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              type="submit"
              disabled={!isFormValid || isLoading || isVerified}
              className={`
                w-full py-3 px-4 text-white font-semibold rounded-lg 
                transition-all duration-200 flex items-center justify-center gap-2
                ${
                  !isFormValid || isLoading || isVerified
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
                  Verifying...
                </>
              ) : isVerified ? (
                <>
                  <CheckCircle className="text-sm" />
                  Verified
                </>
              ) : (
                <>
                  <ArrowForward className="text-sm" />
                  Verify Email
                </>
              )}
            </motion.button>
          </form>

          {/* Resend Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-gray-500">
              Didn't receive the code?{" "}
              <button
                onClick={handleResendCode}
                disabled={isResending || countdown > 0 || isVerified}
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
                  "Resend Code"
                )}
              </button>
            </p>
          </motion.div>

          {/* Help Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg"
          >
            <p className="text-xs text-blue-600 flex items-center gap-1">
              <VerifiedUser className="text-sm" />
              Check your spam folder if you don't see the email
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Modals */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        email={email}
      />

      <ErrorModal
        isOpen={showErrorModal}
        onClose={handleCloseErrorModal}
        message={errorMessage}
        onRetry={handleRetry}
      />

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={handleCloseConfirmModal}
        email={email}
      />
    </>
  );
};
