import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "First-time Homebuyer",
    content:
      "PrimeRealty made my dream of homeownership a reality. Their team was incredibly patient and guided me through every step of the process with expertise and care.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Property Investor",
    content:
      "I've worked with many real estate agencies, but PrimeRealty stands out for their market knowledge and professional service. They consistently deliver exceptional results.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Family Relocating",
    content:
      "Moving across states was stressful, but PrimeRealty's team made it seamless. They found us the perfect family home within our budget and timeline.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
]

export function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-green-50/30 to-slate-50 relative overflow-hidden">
      {/* Warm background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-32 left-20 w-72 h-72 bg-gradient-to-br from-accent/8 to-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-16 w-96 h-96 bg-gradient-to-tr from-primary/5 to-accent/8 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-full text-accent font-semibold mb-8">
            Client Testimonials
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-800 leading-tight">
            What Our Clients
            <span className="block bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Say About Us
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-primary mx-auto mb-8" />
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Real stories from real clients who found their perfect homes with our expert guidance and personalized
            service
          </p>
        </div>

        {/* Testimonials Grid - Layered Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="group h-full bg-white rounded-3xl border-0 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] overflow-hidden"
            >
              <CardContent className="p-8 relative">
                {/* Gradient accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent/10 to-primary/10 rounded-bl-3xl" />

                {/* Quote icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="h-12 w-12 text-primary" />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-slate-700 mb-8 italic text-lg leading-relaxed font-medium">
                  "{testimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center">
                  <div className="relative">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-2xl mr-4 ring-2 ring-primary/20"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-white fill-white" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-lg text-slate-800">{testimonial.name}</div>
                    <div className="text-sm text-primary font-semibold">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
