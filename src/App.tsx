import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { About } from "./pages/about/About";
import { Services } from "./pages/services/Services";
import { Home } from "./pages/home/Home";
import { Footer } from "./components/footer/Footer";
import { NotFound } from "./pages/notfound/NotFound";

export default function App() {
  return (
    <>
      <div className="w-full">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          {/* 404 Not Found route - must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}
