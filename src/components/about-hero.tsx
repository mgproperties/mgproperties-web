import { Badge } from "@/components/ui/badge"
import { Award, Users, TrendingUp, Star } from "lucide-react"

export function AboutHero() {
  return (
    <section className="relative py-32 bg-gradient-to-br from-secondary via-secondary to-secondary/90 overflow-hidden">
      {/* Warm geometric background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-32 left-16 w-80 h-80 bg-gradient-to-tr from-accent/8 to-primary/5 rounded-full blur-2xl" />

        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
        <div className="text-center">
          {/* Premium badge */}
          <Badge className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent to-accent-600 rounded-full text-white font-semibold mb-8">
            About PrimeRealty
          </Badge>

          {/* Editorial headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
            Your Trusted Real Estate
            <span className="block bg-gradient-to-r from-accent via-accent-600 to-accent-700 bg-clip-text text-transparent">
              Partner Since 2009
            </span>
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent-600 mx-auto mb-8" />

          {/* Subtitle */}
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 font-medium">
              For over 15 years, we've been helping families and investors find their perfect properties through
              personalized service, market expertise, and unwavering commitment to excellence.
            </p>

            <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
              From first-time homebuyers to seasoned investors, we've built our reputation on trust, integrity, and
              delivering results that exceed expectations.
            </p>
          </div>

          {/* Achievement stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16 max-w-6xl mx-auto">
            {[
              { icon: TrendingUp, value: "500+", label: "Properties Sold", gradient: "from-primary to-primary-600" },
              { icon: Users, value: "1,200+", label: "Happy Clients", gradient: "from-accent to-accent-600" },
              { icon: Award, value: "15+", label: "Years Experience", gradient: "from-secondary to-secondary-600" },
              { icon: Star, value: "4.9/5", label: "Client Rating", gradient: "from-primary to-accent" },
            ].map((stat, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all hover:scale-105 cursor-pointer relative overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity rounded-3xl`}
                />

                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <stat.icon className="h-10 w-10 text-accent" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-3 group-hover:scale-110 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-white/80 font-semibold text-lg">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
