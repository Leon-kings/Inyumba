import { Hero } from "../../components/hero/Hero";
import { About } from "../about/About";
import { Services } from "../services/Services";
import { Testimonials } from "../testimonials/Testimonials";

export const Home = () => {
  return (
    <>
      <div className="w-full">
        <Hero />
        <About />
        <Services />
        <Testimonials />
      </div>
    </>
  );
};
