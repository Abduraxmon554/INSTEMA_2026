import Header from "../components/Header";
import Hero from "../components/Hero";
import OpeningQuestions from "../components/OpeningQuestions";
import Pillars from "../components/Pillars";
import ProgramTimeline from "../components/ProgramTimeline";
import Gallery from "../components/Gallery";
import Speaker from "../components/Speaker";
import Audience from "../components/Audience";
import Pricing from "../components/Pricing";
import RegisterSection from "../components/RegisterSection";
import Schedule from "../components/Schedule";
import Reviews from "../components/Reviews";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Reveal variant="up">
          <OpeningQuestions />
        </Reveal>
        <Reveal variant="up">
          <Pillars />
        </Reveal>
        <Reveal variant="up">
          <ProgramTimeline />
        </Reveal>
        <Reveal variant="fade">
          <Schedule />
        </Reveal>
        <Reveal variant="up">
          <Gallery />
        </Reveal>
        <Reveal variant="left">
          <Speaker />
        </Reveal>
        <Reveal variant="up">
          <Audience />
        </Reveal>
        <Reveal variant="scale">
          <Pricing />
        </Reveal>
        <Reveal variant="up">
          <RegisterSection />
        </Reveal>
        <Reveal variant="fade">
          <Reviews />
        </Reveal>
        <Reveal variant="up">
          <FAQ />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
