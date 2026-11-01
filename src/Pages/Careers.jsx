import Navbar from "../CommonLayout/Navbar";
import Footer from "../CommonLayout/Footer";

import CareerHero from "../Components/Carrer/CareerHero";
import CareerAdvantages from "../Components/Carrer/CareerAdvantages";
import InternshipOpenings from "../Components/Carrer/InternshipOpenings";
import FullTimeRoles from "../Components/Carrer/FullTimeRoles";

export default function Careers() {
  return (
    <>
      <Navbar />

      <main className="w-full">
        <CareerHero />

        <CareerAdvantages />

        <InternshipOpenings />

        <FullTimeRoles />
      </main>

      <Footer />
    </>
  );
}
