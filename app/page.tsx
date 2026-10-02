import Hero from "@/components/sections/Hero";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Skills from "@/components/sections/Skills";
import ExperienceEducationLanguages from "@/components/sections/ExperienceEducationLanguages";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProjects />
      <Skills />
      <ExperienceEducationLanguages />
      <Contact />
      <Footer />
    </main>
  );
}
