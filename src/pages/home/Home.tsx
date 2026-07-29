import { Hero } from "../../components/hero/Hero";
import { Services } from "../services/Services";
import { Testimonials } from "../testimonials/Testimonials";

export const Home = () => {
  return (
    <>
      <div className="w-full">
        <Hero />
        <Services />
        <Testimonials />
      </div>
    </>
  );
};
