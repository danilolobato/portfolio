import Hero from "@/components/Hero";
import ProjectsSection from "@/components/projects";
import StackSection from "@/components/StackSection";
import AreasSection from "@/components/AreasSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

const sections = [
  { id: "proyectos", theme: "light", Component: ProjectsSection },
  { id: "stack", theme: "dark", Component: StackSection },
  { id: "areas", theme: "light", Component: AreasSection },
  { id: "servicios", theme: "dark", Component: ServicesSection },
  { id: "sobre-mi", theme: "light", Component: AboutSection },
  { id: "contacto", theme: "dark", Component: ContactSection },
] as const;

export default function Home() {
  return (
    <main>
      <Hero />
      {sections.map(({ id, theme, Component }, i) => (
        <section
          key={id}
          id={id}
          data-theme={theme}
          style={{ zIndex: i + 1 }}
          className={
            "relative -mt-10 min-h-screen rounded-t-[2.5rem] " +
            (theme === "dark" ? "bg-ink text-paper" : "bg-paper text-ink")
          }
        >
          <Component />
        </section>
      ))}
    </main>
  );
}