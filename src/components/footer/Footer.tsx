import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from 'js-cookie';

// Material-UI Icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import SchoolIcon from "@mui/icons-material/School";
import CloseIcon from "@mui/icons-material/Close";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import GavelIcon from "@mui/icons-material/Gavel";
import VerifiedIcon from "@mui/icons-material/Verified";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CodeIcon from "@mui/icons-material/Code";

// Google Maps location - Musanze, INES-Ruhengeri
const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7989.457174818556!2d29.62835915!3d-1.5022738499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca8c8d129807f%3A0x6feccec1255c8e9d!2sINES-Ruhengeri!5e0!3m2!1sen!2srw!4v1700000000000";

const translations = {
  en: {
    about: "About Us",
    description:
      "INYUMBA PROJECT is a pioneering student housing platform dedicated to providing safe, affordable, and comfortable accommodation for university students across Rwanda.",
    quickLinks: "Quick Links",
    home: "Home",
    houses: "Houses",
    aboutPage: "About Us",
    services: "Services",
    contact: "Contact",
    support: "Support",
    faq: "FAQ",
    help: "Help Center",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    legal: "Legal",
    contactUs: "Contact Us",
    address: "Musanze, Northern Province, Rwanda",
    phone: "+250 780 414 088",
    email: "inyumba@yahoo.fr",
    followUs: "Follow Us",
    rights: "All rights reserved.",
    designedBy: "Designed by",
    company: "INYUMBA",
    privacyTitle: "Privacy Policy",
    termsTitle: "Terms and Conditions",
    privacyLastUpdated: "Last Updated: January 2024",
    termsLastUpdated: "Last Updated: January 2024",
    location: "Our Location",
    findUs: "Find Us",
    visitUs: "Visit Us",
  },
  fr: {
    about: "À Propos",
    description:
      "INYUMBA PROJECT est une plateforme pionnière de logement étudiant dédiée à fournir un hébergement sûr, abordable et confortable aux étudiants universitaires à travers le Rwanda.",
    quickLinks: "Liens Rapides",
    home: "Accueil",
    houses: "Maisons",
    aboutPage: "À Propos",
    services: "Services",
    contact: "Contact",
    support: "Support",
    faq: "FAQ",
    help: "Centre d'Aide",
    privacy: "Politique de Confidentialité",
    terms: "Conditions d'Utilisation",
    legal: "Légal",
    contactUs: "Contactez-Nous",
    address: "Musanze, Province du Nord, Rwanda",
    phone: "+250 780 414 088",
    email: "inyumba@yahoo.fr",
    followUs: "Suivez-Nous",
    rights: "Tous droits réservés.",
    designedBy: "Conçu par",
    company: "INYUMBA",
    privacyTitle: "Politique de Confidentialité",
    termsTitle: "Conditions Générales",
    privacyLastUpdated: "Dernière mise à jour: Janvier 2024",
    termsLastUpdated: "Dernière mise à jour: Janvier 2024",
    location: "Notre Emplacement",
    findUs: "Trouvez-Nous",
    visitUs: "Visitez-Nous",
  },
  rw: {
    about: "Ibijyanye Na Twe",
    description:
      "INYUMBA PROJECT ni urubuga rw'amazu y'abanyeshuri rwateguwe kugira ngo rutange amazu meza, afite umutekano, kandi ari buhendutse kubanyeshuri bo mukaminuza mu Rwanda.",
    quickLinks: "Ibyo Ukora",
    home: "Ahabanza",
    houses: "Amazu",
    aboutPage: "Ibijyanye Na Twe",
    services: "Serivisi",
    contact: "Twandikire",
    support: "Ubufasha",
    faq: "Ibibazo",
    help: "Ikigo cy'Ubufasha",
    privacy: "Amategeko Y'ibanga",
    terms: "Amategeko n'Amabwiriza",
    legal: "Amategeko",
    contactUs: "Twandikire",
    address: "Musanze, Intara y'Amajyaruguru, Rwanda",
    phone: "+250 780 414 088",
    email: "inyumba@yahoo.fr",
    followUs: "Dukurikire",
    rights: "Uburenganzira bwose buraharanwa.",
    designedBy: "Byakozwe na",
    company: "INYUMBA",
    privacyTitle: "Amategeko Y'ibanga",
    termsTitle: "Amategeko n'Amabwiriza",
    privacyLastUpdated: "Byavuguruwe: Mutarama 2024",
    termsLastUpdated: "Byavuguruwe: Mutarama 2024",
    location: "Aho Turi",
    findUs: "Turebe",
    visitUs: "Udukerere",
  },
};

// Helper function to get language from cookies
const getLanguageFromCookies = (): 'en' | 'fr' | 'rw' => {
  const lang = Cookies.get('language') as 'en' | 'fr' | 'rw';
  return lang || 'en';
};

const InyumbaLogo = ({
  className = "h-12 w-12 rounded-2xl",
}: {
  className?: string;
}) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 500 560"
    className={className}
    whileHover={{
      rotate: [-2, 2, -2, 2, 0],
      transition: { duration: 0.45 },
    }}
  >
    {/* White Background */}
    <rect width="500" height="560" fill="white" />

    {/* Outer Green Rings */}
    <path
      d="M90 120 A180 180 0 0 0 90 430"
      fill="none"
      stroke="#36B25A"
      strokeWidth="7"
      strokeLinecap="round"
    />

    <path
      d="M410 120 A180 180 0 0 1 410 430"
      fill="none"
      stroke="#36B25A"
      strokeWidth="7"
      strokeLinecap="round"
    />

    {/* Inner Blue Rings */}
    <path
      d="M105 135 A165 165 0 0 0 105 415"
      fill="none"
      stroke="#1B4E91"
      strokeWidth="5"
      strokeLinecap="round"
    />

    <path
      d="M395 135 A165 165 0 0 1 395 415"
      fill="none"
      stroke="#1B4E91"
      strokeWidth="5"
      strokeLinecap="round"
    />

    {/* Bottom Rings */}
    <path
      d="M165 475 A120 120 0 0 0 335 475"
      fill="none"
      stroke="#36B25A"
      strokeWidth="7"
      strokeLinecap="round"
    />

    <path
      d="M180 462 A104 104 0 0 0 320 462"
      fill="none"
      stroke="#1B4E91"
      strokeWidth="5"
      strokeLinecap="round"
    />

    {/* Compass */}
    <g transform="translate(250 95)">
      <text
        x="0"
        y="-18"
        textAnchor="middle"
        fontSize="34"
        fontWeight="800"
        fill="#1B4E91"
        fontFamily="Arial"
      >
        N
      </text>

      <circle
        r="58"
        fill="none"
        stroke="#1B4E91"
        strokeWidth="7"
      />

      <polygon
        points="0,-58 10,-10 0,-22 -10,-10"
        fill="#1B4E91"
      />

      <polygon
        points="0,58 10,10 0,22 -10,10"
        fill="#1B4E91"
      />

      <polygon
        points="-58,0 -10,-10 -22,0 -10,10"
        fill="#1B4E91"
      />

      <polygon
        points="58,0 10,-10 22,0 10,10"
        fill="#1B4E91"
      />

      <polygon
        points="-40,-40 -8,-12 -12,-8"
        fill="#1B4E91"
      />

      <polygon
        points="40,-40 8,-12 12,-8"
        fill="#1B4E91"
      />

      <polygon
        points="-40,40 -8,12 -12,8"
        fill="#1B4E91"
      />

      <polygon
        points="40,40 8,12 12,8"
        fill="#1B4E91"
      />
    </g>

    {/* Roof */}
    <path
      d="M150 215 L250 135 L350 215"
      fill="none"
      stroke="#36B25A"
      strokeWidth="14"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Chimney */}
    <rect
      x="305"
      y="175"
      width="18"
      height="55"
      fill="#36B25A"
    />

    {/* House */}
    <rect
      x="188"
      y="215"
      width="124"
      height="90"
      fill="#36B25A"
    />

    {/* Animated Location Pin */}
    <motion.g
      animate={{
        scale: [1, 1.08, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    >
      <path
        d="
          M250 220
          C225 220 208 238 208 262
          C208 292 250 330 250 330
          C250 330 292 292 292 262
          C292 238 275 220 250 220
          Z
        "
        fill="#1B4E91"
      />

      <circle
        cx="250"
        cy="255"
        r="14"
        fill="white"
      />
    </motion.g>

    {/* Book */}
    <path
      d="
        M250 320
        C220 305 170 302 118 316
        C128 328 128 346 118 360
        C170 340 220 342 250 362
        Z
      "
      fill="#1B4E91"
    />

    <path
      d="
        M250 320
        C280 305 330 302 382 316
        C372 328 372 346 382 360
        C330 340 280 342 250 362
        Z
      "
      fill="#1B4E91"
    />

    <path
      d="M250 320 L250 362"
      stroke="#FFFFFF"
      strokeWidth="3"
    />

    {/* Text */}
    <text
      x="250"
      y="430"
      textAnchor="middle"
      fontSize="60"
      fontFamily="Poppins, Arial, sans-serif"
      fontWeight="900"
      fill="#1B4E91"
    >
      INYUMBA
    </text>

    <text
      x="250"
      y="462"
      textAnchor="middle"
      fontSize="20"
      fontFamily="Poppins, Arial, sans-serif"
      fontWeight="700"
      fill="#36B25A"
    >
      STUDENT ACCOMMODATION
    </text>

    <text
      x="250"
      y="530"
      textAnchor="middle"
      fontSize="24"
      fontFamily="Poppins, Arial, sans-serif"
      fontWeight="800"
      letterSpacing="5"
      fill="#1B4E91"
    >
      RWANDA
    </text>
  </motion.svg>
);

export const Footer: React.FC = () => {
  // Get language from cookies
  const [lang, setLang] = useState<'en' | 'fr' | 'rw'>(getLanguageFromCookies());
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const t = translations[lang];

  // Listen for language changes in cookies
  useEffect(() => {
    const handleCookieChange = () => {
      const newLang = getLanguageFromCookies();
      if (newLang !== lang) {
        setLang(newLang);
      }
    };

    // Check for cookie changes every second (polling)
    const interval = setInterval(handleCookieChange, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  const handlePrivacyClick = () => {
    setIsPrivacyOpen(true);
  };

  const handleTermsClick = () => {
    setIsTermsOpen(true);
  };

  const currentYear = 2026;

  return (
    <>
      <footer className="bg-gray-900 text-gray-300">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About Section */}
            <div>
              <div className="text-[#FF385C]">
                <InyumbaLogo className="h-12 w-12 sm:h-12 sm:w-12 rounded-2xl" />
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                {t.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <LocationOnIcon className="w-4 h-4 text-[#FF385C]" />
                <span>{t.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <PhoneIcon className="w-4 h-4 text-[#FF385C]" />
                <span>{t.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <EmailIcon className="w-4 h-4 text-[#FF385C]" />
                <span>{t.email}</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">
                {t.quickLinks}
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="/"
                    className="text-gray-400 hover:text-[#FF385C] transition-colors"
                  >
                    {t.home}
                  </a>
                </li>
                <li>
                  <a
                    href="/houses"
                    className="text-gray-400 hover:text-[#FF385C] transition-colors"
                  >
                    {t.houses}
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-gray-400 hover:text-[#FF385C] transition-colors"
                  >
                    {t.aboutPage}
                  </a>
                </li>
                <li>
                  <a
                    href="/services"
                    className="text-gray-400 hover:text-[#FF385C] transition-colors"
                  >
                    {t.services}
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-gray-400 hover:text-[#FF385C] transition-colors"
                  >
                    {t.contact}
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">{t.support}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="/faq"
                    className="text-gray-400 hover:text-[#FF385C] transition-colors"
                  >
                    {t.faq}
                  </a>
                </li>
                <li>
                  <a
                    href="/help"
                    className="text-gray-400 hover:text-[#FF385C] transition-colors"
                  >
                    {t.help}
                  </a>
                </li>
                <li>
                  <button
                    onClick={handlePrivacyClick}
                    className="text-gray-400 hover:text-[#FF385C] transition-colors"
                  >
                    {t.privacy}
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleTermsClick}
                    className="text-gray-400 hover:text-[#FF385C] transition-colors"
                  >
                    {t.terms}
                  </button>
                </li>
              </ul>
            </div>

            {/* Location / Map */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <LocationOnIcon className="text-[#FF385C]" />
                {t.location}
              </h3>
              <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                <iframe
                  src={MAP_EMBED_URL}
                  width="100%"
                  height="180"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="INES-Ruhengeri Location"
                  className="w-full"
                ></iframe>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                <SchoolIcon className="w-3 h-3 inline mr-1" />
                INES-Ruhengeri, Musanze
              </p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">{t.followUs}</span>
              <div className="flex gap-2">
                <a
                  href="#"
                  className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#FF385C] hover:text-white transition-all duration-300"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#FF385C] hover:text-white transition-all duration-300"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#FF385C] hover:text-white transition-all duration-300"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#FF385C] hover:text-white transition-all duration-300"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#FF385C] hover:text-white transition-all duration-300"
                >
                  <YouTubeIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            {/* Copyright and Designer Credit */}
            <div className="text-center">
              <div className="text-sm text-gray-50">
               <span className='text-blue-400 font-bold'> © {currentYear}</span> {t.company}. {t.rights}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-1 pt-1 flex items-center justify-center gap-2"
              >
                <CodeIcon className="w-4 h-4 text-green-400" />
                <span className="text-xs text-gray-400">{t.designedBy}</span>
                <span className="text-sm font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Leon
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {isPrivacyOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[500]"
              onClick={() => setIsPrivacyOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-2 xs:inset-4 z-[501] flex items-center justify-center"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl xs:rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl">
                {/* Modal Header */}
                <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 xs:p-6 flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FF385C]/10 rounded-full flex items-center justify-center text-[#FF385C]">
                      <PrivacyTipIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg xs:text-xl font-bold text-gray-900 dark:text-white">
                        {t.privacyTitle}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t.privacyLastUpdated}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsPrivacyOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <CloseIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-4 xs:p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      1. Information We Collect
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      INYUMBA PROJECT collects information you provide directly,
                      such as your name, email address, phone number, and
                      payment information when you create an account, book a
                      house, or contact us. We also collect information about
                      your use of our platform, including search history,
                      booking history, and interactions with landlords.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      2. How We Use Your Information
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      We use your information to provide, maintain, and improve
                      our services, to process bookings and payments, to
                      communicate with you about your bookings and account, to
                      send you updates and promotional materials, and to ensure
                      the security and integrity of our platform.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      3. Information Sharing
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      We share your information with landlords to facilitate
                      bookings, with payment processors to handle transactions,
                      with analytics providers to improve our services, and with
                      law enforcement when required by law. We do not sell your
                      personal information to third parties.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      4. Data Security
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      We implement appropriate technical and organizational
                      measures to protect your personal information against
                      unauthorized access, alteration, disclosure, or
                      destruction. We use secure encryption for data
                      transmission and storage.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      5. Your Rights
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      You have the right to access, correct, or delete your
                      personal information. You can update your profile
                      information in your account settings or contact us to
                      exercise these rights. You may also opt out of marketing
                      communications at any time.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      6. Cookies and Tracking
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      We use cookies and similar tracking technologies to
                      enhance your experience on our platform, analyze usage
                      patterns, and serve relevant advertisements. You can
                      control cookie preferences in your browser settings.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      7. Contact Us
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      If you have any questions about this Privacy Policy,
                      please contact us at {t.email} or call us at {t.phone}.
                    </p>

                    <div className="mt-6 p-4 bg-[#FF385C]/5 rounded-lg border border-[#FF385C]/20">
                      <p className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                        <VerifiedIcon className="w-5 h-5 text-[#FF385C] flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Our Commitment:</strong> We are committed to
                          protecting your privacy and ensuring the security of
                          your personal information. We regularly review and
                          update our privacy practices to comply with applicable
                          laws and regulations.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Terms and Conditions Modal */}
      <AnimatePresence>
        {isTermsOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[500]"
              onClick={() => setIsTermsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-2 xs:inset-4 z-[501] flex items-center justify-center"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl xs:rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl">
                {/* Modal Header */}
                <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 xs:p-6 flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FF385C]/10 rounded-full flex items-center justify-center text-[#FF385C]">
                      <GavelIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg xs:text-xl font-bold text-gray-900 dark:text-white">
                        {t.termsTitle}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t.termsLastUpdated}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsTermsOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <CloseIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-4 xs:p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      1. Acceptance of Terms
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      By using INYUMBA PROJECT's platform, you agree to comply
                      with and be bound by these Terms and Conditions. If you do
                      not agree to these terms, please do not use our services.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      2. User Accounts
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      To access certain features, you must create an account.
                      You are responsible for maintaining the confidentiality of
                      your account credentials and for all activities that occur
                      under your account. You must provide accurate and complete
                      information when creating your account.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      3. Booking and Payments
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      When you book a house through our platform, you enter into
                      a contract with the landlord. INYUMBA PROJECT facilitates
                      the transaction but is not responsible for the condition
                      of the property or the landlord's conduct. All payments
                      are processed securely through our payment system.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      4. User Conduct
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      You agree to use our platform in a lawful and respectful
                      manner. You may not post false or misleading information,
                      infringe on others' rights, or engage in any activity that
                      disrupts the platform's operation.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      5. Cancellation and Refunds
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Cancellation policies are set by individual landlords and
                      displayed on each property listing. Refunds are processed
                      according to the landlord's cancellation policy and our
                      refund guidelines.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      6. Intellectual Property
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      All content on our platform, including text, images,
                      logos, and software, is the property of INYUMBA PROJECT or
                      its licensors. You may not use, reproduce, or distribute
                      any content without our prior written permission.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      7. Disclaimer of Warranties
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Our platform is provided "as is" without any warranties,
                      express or implied. We do not guarantee that the platform
                      will be error-free or uninterrupted.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      8. Limitation of Liability
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      INYUMBA PROJECT is not liable for any indirect,
                      incidental, special, or consequential damages arising from
                      your use of our platform. Our total liability is limited
                      to the amount you paid for the booking.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      9. Changes to Terms
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      We may update these terms from time to time. We will
                      notify you of significant changes by posting a notice on
                      our platform. Your continued use of the platform
                      constitutes acceptance of the updated terms.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      10. Governing Law
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      These terms are governed by the laws of the Republic of
                      Rwanda. Any disputes arising from these terms shall be
                      resolved through arbitration in accordance with Rwandan
                      law.
                    </p>

                    <div className="mt-6 p-4 bg-[#FF385C]/5 rounded-lg border border-[#FF385C]/20">
                      <div className="flex items-start gap-2">
                        <PaymentIcon className="w-5 h-5 text-[#FF385C] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            <strong className="text-gray-900 dark:text-white">
                              Payment Security:
                            </strong>{" "}
                            All transactions are processed securely through our
                            payment system with MOMO integration. Your payment
                            information is encrypted and protected.
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded text-xs">
                              <CheckCircleIcon className="w-3 h-3" />
                              Secure Payments
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded text-xs">
                              <CheckCircleIcon className="w-3 h-3" />
                              Verified Landlords
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded text-xs">
                              <CheckCircleIcon className="w-3 h-3" />
                              Student Protection
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <strong className="text-gray-900 dark:text-white">
                          Contact for Legal Matters:
                        </strong>
                        <br />
                        INYUMBA PROJECT
                        <br />
                        {t.address}
                        <br />
                        {t.phone}
                        <br />
                        {t.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

