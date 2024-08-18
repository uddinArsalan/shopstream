import HeroSection from "./components/HeroSection";
import ProductGrid from "./components/ProductGrid";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";

export default function Home() {
  return (
    <main className="">
     <HeroSection />
     <ProductGrid />
     <AboutUs />
     <ContactUs />
    </main>
  );
}
