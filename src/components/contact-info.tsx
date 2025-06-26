import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function ContactInfo() {
  return (
    <section className="py-24 bg-gradient-to-b from-green-50/30 to-slate-50 relative overflow-hidden">
      {/* Warm background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-32 left-20 w-72 h-72 bg-gradient-to-br from-accent/8 to-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-16 w-96 h-96 bg-gradient-to-tr from-primary/5 to-accent/8 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-8 text-slate-800 leading-tight">
              Visit Our
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Office
              </span>
            </h3>

            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  title: "Address",
                  content: "123 Real Estate Avenue\nSuite 100\nCity, State 12345",
                  gradient: "from-primary to-primary-600",
                },
                {
                  icon: Phone,
                  title: "Phone",
                  content: "(555) 123-4567\n(555) 123-4568 (Fax)",
                  gradient: "from-accent to-accent-600",
                },
                {
                  icon: Mail,
                  title: "Email",
                  content: "info@primerealty.com\nsupport@primerealty.com",
                  gradient: "from-secondary to-secondary-600",
                },
                {
                  icon: Clock,
                  title: "Office Hours",
                  content: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: By Appointment",
                  gradient: "from-primary to-accent",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="bg-white rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] overflow-hidden group"
                >
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div
                      className={`p-3 bg-gradient-to-br ${item.gradient} rounded-2xl group-hover:scale-110 transition-transform`}
                    >
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h4>
                      <p className="text-slate-600 leading-relaxed whitespace-pre-line">{item.content}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Social Media */}
            <div className="mt-12">
              <h4 className="text-xl font-bold text-slate-800 mb-6">Follow Us</h4>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 hover:from-primary hover:to-accent rounded-2xl transition-all cursor-pointer group hover:scale-110"
                  >
                    <Icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-8 text-slate-800 leading-tight">
              Find Us on
              <span className="block bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                the Map
              </span>
            </h3>

            <Card className="bg-white rounded-3xl border-0 shadow-2xl overflow-hidden h-96">
              <CardContent className="p-0 h-full">
                <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative overflow-hidden">
                  {/* Map placeholder with subtle pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0)`,
                        backgroundSize: "20px 20px",
                      }}
                    />
                  </div>
                  <div className="text-center z-10">
                    <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h4 className="text-2xl font-bold text-slate-800 mb-2">Interactive Map</h4>
                    <p className="text-slate-600">
                      Located in the heart of the city
                      <br />
                      Easy access and parking available
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
