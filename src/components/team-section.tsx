import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Linkedin } from "lucide-react"

const teamMembers = [
  {
    name: "Sarah Mitchell",
    role: "Founder & CEO",
    image: "/placeholder.svg?height=300&width=300",
    bio: "With 20+ years in real estate, Sarah leads our team with vision and expertise.",
    email: "sarah@primerealty.com",
    phone: "(555) 123-4567",
    specialties: ["Luxury Homes", "Investment Properties", "Market Analysis"],
  },
  {
    name: "David Chen",
    role: "Co-Founder & COO",
    image: "/placeholder.svg?height=300&width=300",
    bio: "David's operational excellence ensures every client receives exceptional service.",
    email: "david@primerealty.com",
    phone: "(555) 123-4568",
    specialties: ["Commercial Real Estate", "Property Development", "Client Relations"],
  },
  {
    name: "Maria Rodriguez",
    role: "Senior Agent",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Maria specializes in helping first-time buyers navigate their home purchase journey.",
    email: "maria@primerealty.com",
    phone: "(555) 123-4569",
    specialties: ["First-Time Buyers", "Residential Sales", "Neighborhood Expert"],
  },
  {
    name: "James Thompson",
    role: "Investment Specialist",
    image: "/placeholder.svg?height=300&width=300",
    bio: "James helps investors build wealth through strategic real estate investments.",
    email: "james@primerealty.com",
    phone: "(555) 123-4570",
    specialties: ["Investment Analysis", "Portfolio Growth", "Market Trends"],
  },
]

export function TeamSection() {
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
          <Badge className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-full text-accent font-semibold mb-8">
            Meet Our Team
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-800 leading-tight">
            Expert Professionals
            <span className="block bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Dedicated to You
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-primary mx-auto mb-8" />
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our experienced team combines deep market knowledge with genuine care for your real estate journey
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="group bg-white rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Contact overlay */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-2">
                    <div className="p-2 bg-white/90 rounded-xl backdrop-blur-sm">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div className="p-2 bg-white/90 rounded-xl backdrop-blur-sm">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <div className="p-2 bg-white/90 rounded-xl backdrop-blur-sm">
                      <Linkedin className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{member.name}</h3>
                <div className="text-primary font-semibold mb-4">{member.role}</div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{member.bio}</p>

                {/* Specialties */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Specialties</div>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="text-xs px-2 py-1 bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-0 rounded-lg"
                      >
                        {specialty}
                      </Badge>
                    ))}
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
