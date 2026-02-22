import { Navbar } from "@/components/landing/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { AgentsSection } from "@/components/landing/agents-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { TalkSection } from "@/components/landing/talk-section"
import { IntegrationsSection } from "@/components/landing/integrations-section"
import { Footer } from "@/components/landing/footer"

export default function Page() {
  return (
    <>
      {/* Main content scrolls over the sticky footer */}
      <div className="relative z-10 bg-background">
        <Navbar />
        <HeroSection />
        <AgentsSection />
        <HowItWorksSection />
        <TalkSection />
        <TestimonialsSection />
        <FeaturesSection />
        <IntegrationsSection />
      </div>
      <Footer />
    </>
  )
}
