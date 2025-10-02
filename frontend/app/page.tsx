import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplet, Heart, Hospital, Users, Activity, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Droplet className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">LifeFlow</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/donors" className="text-sm font-medium hover:text-primary transition-colors">
              Donors
            </Link>
            <Link href="/hospitals" className="text-sm font-medium hover:text-primary transition-colors">
              Hospitals
            </Link>
            <Link href="/blood-banks" className="text-sm font-medium hover:text-primary transition-colors">
              Blood Banks
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/admin">Admin</Link>
            </Button>
            <Button asChild>
              <Link href="/donors/register">Donate Blood</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-accent/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              <span>Saving Lives Together</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Connect Donors with Those in Need</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">
              LifeFlow is a comprehensive blood bank management system that bridges the gap between blood donors, blood
              banks, and hospitals to ensure timely access to life-saving blood.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/donors/register">
                  <Droplet className="w-5 h-5 mr-2" />
                  Register as Donor
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/blood-inventory">
                  <Activity className="w-5 h-5 mr-2" />
                  View Blood Inventory
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How LifeFlow Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform streamlines blood donation and distribution with three key stakeholders
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>For Donors</CardTitle>
                <CardDescription>
                  Register, track your donation history, and receive notifications when your blood type is needed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" className="p-0" asChild>
                  <Link href="/donors/register">Register Now →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-secondary transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <Droplet className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>For Blood Banks</CardTitle>
                <CardDescription>
                  Manage inventory, track donations, coordinate with hospitals, and maintain optimal stock levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" className="p-0" asChild>
                  <Link href="/blood-banks">Learn More →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-chart-3 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-chart-3/10 flex items-center justify-center mb-4">
                  <Hospital className="w-6 h-6 text-chart-3" />
                </div>
                <CardTitle>For Hospitals</CardTitle>
                <CardDescription>
                  Request blood units, track orders, and ensure timely delivery for emergency and planned procedures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" className="p-0" asChild>
                  <Link href="/hospitals">Get Started →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-accent/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Registered Donors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Blood Banks</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-chart-3 mb-2">1K+</div>
              <div className="text-sm text-muted-foreground">Partner Hospitals</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-chart-4 mb-2">50K+</div>
              <div className="text-sm text-muted-foreground">Lives Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Shield className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Save Lives?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of donors making a difference. Your donation can save up to three lives.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/donors/register">Get Started Today</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Droplet className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-semibold">LifeFlow</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connecting donors, blood banks, and hospitals to save lives.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Donors</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/donors/register" className="hover:text-foreground">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/donors" className="hover:text-foreground">
                    Find Donors
                  </Link>
                </li>
                <li>
                  <Link href="/eligibility" className="hover:text-foreground">
                    Eligibility
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Organizations</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/blood-banks" className="hover:text-foreground">
                    Blood Banks
                  </Link>
                </li>
                <li>
                  <Link href="/hospitals" className="hover:text-foreground">
                    Hospitals
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="hover:text-foreground">
                    Admin Portal
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-foreground">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 LifeFlow. All rights reserved. Built to save lives.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
