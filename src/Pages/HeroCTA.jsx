import Navbar from "../CommonLayout/Navbar";
import Footer from "../CommonLayout/Footer";
import HeroSection from "../Components/HeroCTA/HeroSection";

export default function HeroCTA() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
      </main>

      <Footer />
    </>
  );
}
