import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Award, Users, TrendingUp, ArrowRight } from "lucide-react"

export function AboutValues() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-green-50/30 relative overflow-hidden">
      {/* Soft background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-primary/5 to-accent/3 rounded-full blur-2xl" />
        <div className="absolute bottom-32 right-16 w-80 h-80 bg-gradient-to-tr from-accent/3 to-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Header */}
        <div className="text-center mb-20">
          <Badge className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-full text-primary font-semibold mb-8">
            Why Choose PrimeRealty
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-800 leading-tight">
            Your Success is
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Our Priority
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8" />
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We've built our reputation on delivering exceptional results through innovation, expertise, and unwavering
            commitment to our clients
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[
            {
              icon: Shield,
              title: "Trusted & Reliable",
              description:
                "15+ years of proven track record with over 500 successful transactions and 98% client satisfaction rate.",
              stats: "500+ Properties Sold",
              gradient: "from-primary/10 to-accent/10",
            },
            {
              icon: Award,
              title: "Award-Winning Service",
              description:
                "Recognized as 'Real Estate Agency of the Year' three consecutive years for outstanding client service.",
              stats: "Multiple Industry Awards",
              gradient: "from-accent/10 to-primary/10",
            },
            {
              icon: Users,
              title: "Client-Focused Approach",
              description:
                "Every client receives personalized attention with dedicated support throughout their real estate journey.",
              stats: "1,200+ Happy Clients",
              gradient: "from-primary/10 to-secondary/10",
            },
            {
              icon: TrendingUp,
              title: "Market Leadership",
              description:
                "Deep local market knowledge and cutting-edge technology ensure you get the best deals and opportunities.",
              stats: "Top 1% Market Performance",
              gradient: "from-secondary/10 to-accent/10",
            },
          ].map((value, index) => (
            <Card
              key={index}
              className="group bg-white rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] overflow-hidden"
            >
              <CardContent className="p-8 relative">
                <div
                  className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${value.gradient} rounded-bl-3xl`}
                />

                <div className="flex items-start space-x-6">
                  <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl group-hover:scale-110 transition-transform">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-primary transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-4">{value.description}</p>
                    <div className="text-primary font-bold text-lg">{value.stats}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-br from-secondary via-secondary to-secondary/90 rounded-3xl border-0 overflow-hidden relative">
          {/* Background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/5 rounded-full blur-2xl" />
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-tr from-accent/8 to-primary/5 rounded-full blur-3xl" />
          </div>

          <CardContent className="p-12 text-center relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Ready to Start Your
              <span className="block bg-gradient-to-r from-accent via-accent-600 to-accent-700 bg-clip-text text-transparent">
                Real Estate Journey?
              </span>
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Let our experienced team guide you through every step of buying, selling, or investing in real estate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-accent to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-xl hover:shadow-2xl transition-all px-8 py-4 text-lg rounded-2xl font-semibold group"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white hover:text-secondary transition-all px-8 py-4 text-lg rounded-2xl font-semibold backdrop-blur-sm bg-white/10"
              >
                Schedule Consultation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
