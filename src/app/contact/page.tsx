import { Navbar } from "@/components/navbar"
import { ContactHero } from "@/components/contact-hero"
import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ContactHero />
      <ContactForm />
      <ContactInfo />
      <Footer />
    </div>
  )
}
