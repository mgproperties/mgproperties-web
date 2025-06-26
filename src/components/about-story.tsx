import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, Heart, Target, Lightbulb } from "lucide-react"

export function AboutStory() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-green-50/30 relative overflow-hidden">
      {/* Soft background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-primary/5 to-accent/3 rounded-full blur-2xl" />
        <div className="absolute bottom-32 right-16 w-80 h-80 bg-gradient-to-tr from-accent/3 to-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Story */}
          <div>
            <Badge className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-full text-primary font-semibold mb-8">
              Our Story
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-slate-800 leading-tight">
              Building Dreams,
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Creating Homes
              </span>
            </h2>

            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                Founded in 2009 by real estate veterans Sarah Mitchell and David Chen, PrimeRealty was born from a
                simple belief: every person deserves to find their perfect home with trusted guidance and exceptional
                service.
              </p>

              <p>
                What started as a small boutique agency has grown into one of the region's most respected real estate
                firms, but our core values remain unchanged. We believe in building lasting relationships, not just
                closing deals.
              </p>

              <p>
                Today, our team of 25+ experienced professionals continues to set the standard for excellence in real
                estate, combining cutting-edge technology with the personal touch that has made us a household name.
              </p>
            </div>

            {/* Mission Statement */}
            <Card className="mt-12 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl border-0 overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-2xl">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h3>
                    <p className="text-slate-700 leading-relaxed text-lg">
                      To transform the real estate experience by combining innovative technology, deep market knowledge,
                      and genuine care for our clients' dreams and goals.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Values */}
          <div className="space-y-8">
            <div>
              <Badge className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-full text-accent font-semibold mb-6">
                Our Values
              </Badge>
              <h3 className="text-3xl md:text-4xl font-bold mb-8 text-slate-800 leading-tight">
                What Drives
                <span className="block bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Everything We Do
                </span>
              </h3>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Heart,
                  title: "Client-First Approach",
                  description:
                    "Every decision we make is guided by what's best for our clients, not what's easiest for us.",
                  gradient: "from-primary/10 to-accent/10",
                },
                {
                  icon: Home,
                  title: "Integrity & Trust",
                  description:
                    "We build lasting relationships through honest communication and transparent business practices.",
                  gradient: "from-accent/10 to-primary/10",
                },
                {
                  icon: Lightbulb,
                  title: "Innovation & Excellence",
                  description:
                    "We continuously evolve our services and technology to provide the best possible experience.",
                  gradient: "from-primary/10 to-secondary/10",
                },
              ].map((value, index) => (
                <Card
                  key={index}
                  className="bg-white rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] overflow-hidden group"
                >
                  <CardContent className="p-6 relative">
                    <div
                      className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-bl-2xl`}
                    />
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl group-hover:scale-110 transition-transform">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-800 mb-3">{value.title}</h4>
                        <p className="text-slate-600 leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
