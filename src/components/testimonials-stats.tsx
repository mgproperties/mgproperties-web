import { TrendingUp, Users, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TestimonialsStats() {
    return (
        <section className="py-12 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Performance Metrics */}
                {/* <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Track{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Record</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Numbers that speak to our commitment to excellence and client satisfaction
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all">
            <div className="bg-gradient-to-br from-primary to-primary-600 rounded-2xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
            <div className="text-gray-600 font-medium">Average Rating</div>
            <div className="text-sm text-gray-500 mt-1">Based on 1,200+ reviews</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all">
            <div className="bg-gradient-to-br from-accent to-accent-600 rounded-2xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
            <div className="text-gray-600 font-medium">Satisfaction Rate</div>
            <div className="text-sm text-gray-500 mt-1">Client retention & referrals</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all">
            <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Award className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
            <div className="text-gray-600 font-medium">Transactions</div>
            <div className="text-sm text-gray-500 mt-1">Successfully closed</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all">
            <div className="bg-gradient-to-br from-accent to-primary rounded-2xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">15</div>
            <div className="text-gray-600 font-medium">Days Average</div>
            <div className="text-sm text-gray-500 mt-1">Time to close</div>
          </div>
        </div>

        {/* Client Categories */}
                {/* <div className="bg-white rounded-3xl shadow-xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Diverse Client Base</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                45%
              </div>
              <div className="font-semibold text-gray-900 mb-2">First-Time Buyers</div>
              <div className="text-gray-600 text-sm">
                Young professionals and families taking their first step into homeownership
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">
                35%
              </div>
              <div className="font-semibold text-gray-900 mb-2">Move-Up Buyers</div>
              <div className="text-gray-600 text-sm">
                Growing families and professionals upgrading to larger or better homes
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                20%
              </div>
              <div className="font-semibold text-gray-900 mb-2">Investors & Luxury</div>
              <div className="text-gray-600 text-sm">Investment property buyers and luxury home purchasers</div>
            </div>
          </div>
        </div> */}

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-primary to-accent rounded-3xl p-8 text-center text-white">
                    <h3 className="text-3xl font-bold mb-4">
                        Ready to Join Our Success Stories?
                    </h3>
                    <p className="text-xl mb-8 opacity-90">
                        Let us help you achieve your real estate goals with the
                        same dedication and expertise our clients rave about.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3 rounded-2xl">
                            Start Your Journey
                        </Button>
                        <Button
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-3 rounded-2xl bg-transparent"
                        >
                            Schedule Consultation
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
