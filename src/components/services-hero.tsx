export function ServicesHero() {
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
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent to-accent-600 rounded-full text-white font-semibold mb-8">
            Professional Services
          </div>

          {/* Editorial headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
            Comprehensive Real Estate
            <span className="block bg-gradient-to-r from-accent via-accent-600 to-accent-700 bg-clip-text text-transparent">
              Solutions
            </span>
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent-600 mx-auto mb-8" />

          {/* Subtitle */}
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 font-medium">
              From finding your dream home to maximizing your investment potential, we provide personalized service and
              innovative solutions to help you achieve your property goals with confidence.
            </p>

            <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
              With over 15 years of experience in the real estate industry, our team of experts delivers results that
              exceed expectations through cutting-edge technology and deep market knowledge.
            </p>
          </div>

          {/* Decorative elements */}
          <div className="flex justify-center items-center mt-12 space-x-4">
            <div className="w-16 h-0.5 bg-white/40"></div>
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <div className="w-16 h-0.5 bg-white/40"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
