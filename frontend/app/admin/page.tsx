"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Droplet, Users, Hospital, Activity, AlertCircle, Calendar, BarChart3 } from "lucide-react"
import { api, type Donor, type Blood, type Hospital as HospitalType } from "@/lib/api"
import { toast } from "sonner"

export default function AdminDashboard() {
  const [donors, setDonors] = useState<Donor[]>([])
  const [bloodUnits, setBloodUnits] = useState<Blood[]>([])
  const [hospitals, setHospitals] = useState<HospitalType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAllData()
  }, [])

  const loadAllData = async () => {
    try {
      const [donorsData, bloodData, hospitalsData] = await Promise.all([
        api.donors.getAll(),
        api.blood.getAll(),
        api.hospitals.getAll(),
      ])
      setDonors(donorsData)
      setBloodUnits(bloodData)
      setHospitals(hospitalsData)
    } catch (error) {
      toast.error("Failed to load dashboard data")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // Calculate statistics
  const totalDonors = donors.length
  const eligibleDonors = donors.filter((d) => d.donationStatus === "Eligible").length
  const totalBloodUnits = bloodUnits.length
  const expiredUnits = bloodUnits.filter((unit) => new Date(unit.expiryDate) < new Date()).length
  const expiringSoon = bloodUnits.filter((unit) => {
    const daysUntilExpiry = Math.ceil((new Date(unit.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0
  }).length
  const totalHospitals = hospitals.length
  const activeRequests = hospitals.filter((h) => h.orderStatus?.toLowerCase() === "pending").length

  // Blood group distribution
  const bloodGroupStats = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => ({
    group,
    count: bloodUnits.filter((unit) => unit.bloodGroup === group && new Date(unit.expiryDate) >= new Date()).length,
  }))

  // Recent donors (last 30 days)
  const recentDonors = donors.filter((donor) => {
    if (!donor.lastDonationDate) return false
    const daysSinceLastDonation = Math.ceil(
      (Date.now() - new Date(donor.lastDonationDate).getTime()) / (1000 * 60 * 60 * 24),
    )
    return daysSinceLastDonation <= 30
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Droplet className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">LifeFlow Admin</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/">Home</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of blood bank management system</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading dashboard...</div>
        ) : (
          <>
            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardDescription>Total Donors</CardDescription>
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-3xl">{totalDonors}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="secondary" className="bg-secondary/20">
                      {eligibleDonors} Eligible
                    </Badge>
                    <span className="text-muted-foreground">
                      {totalDonors > 0 ? Math.round((eligibleDonors / totalDonors) * 100) : 0}%
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardDescription>Blood Units</CardDescription>
                    <Droplet className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-3xl">{totalBloodUnits - expiredUnits}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm">
                    {expiringSoon > 0 && (
                      <Badge variant="secondary" className="bg-chart-4/20 text-chart-4">
                        {expiringSoon} Expiring Soon
                      </Badge>
                    )}
                    {expiredUnits > 0 && (
                      <Badge variant="destructive" className="bg-destructive/20 text-destructive">
                        {expiredUnits} Expired
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardDescription>Partner Hospitals</CardDescription>
                    <Hospital className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-3xl">{totalHospitals}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="secondary" className="bg-chart-4/20 text-chart-4">
                      {activeRequests} Active Requests
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardDescription>Recent Donations</CardDescription>
                    <Activity className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-3xl">{recentDonors.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    Last 30 days
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs for detailed views */}
            <Tabs defaultValue="inventory" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
                <TabsTrigger value="quick-actions">Quick Actions</TabsTrigger>
              </TabsList>

              {/* Inventory Tab */}
              <TabsContent value="inventory" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Blood Group Distribution
                    </CardTitle>
                    <CardDescription>Available units by blood type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                      {bloodGroupStats.map((stat) => (
                        <div
                          key={stat.group}
                          className="text-center p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
                        >
                          <div className="text-2xl font-bold text-primary mb-1">{stat.group}</div>
                          <div className="text-sm text-muted-foreground">{stat.count} units</div>
                          {stat.count < 5 && stat.count > 0 && (
                            <Badge variant="secondary" className="mt-2 text-xs bg-chart-4/20 text-chart-4">
                              Low Stock
                            </Badge>
                          )}
                          {stat.count === 0 && (
                            <Badge variant="destructive" className="mt-2 text-xs">
                              Out of Stock
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Inventory Health</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Available Units</span>
                        <span className="font-semibold text-secondary">{totalBloodUnits - expiredUnits}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Expiring Soon (7 days)</span>
                        <span className="font-semibold text-chart-4">{expiringSoon}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Expired Units</span>
                        <span className="font-semibold text-destructive">{expiredUnits}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm font-medium">Total Units</span>
                        <span className="font-bold">{totalBloodUnits}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Donor Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Total Registered</span>
                        <span className="font-semibold">{totalDonors}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Eligible Donors</span>
                        <span className="font-semibold text-secondary">{eligibleDonors}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Not Eligible</span>
                        <span className="font-semibold text-muted-foreground">{totalDonors - eligibleDonors}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm font-medium">Recent Donations</span>
                        <span className="font-bold">{recentDonors.length}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Alerts Tab */}
              <TabsContent value="alerts" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-chart-4" />
                      System Alerts
                    </CardTitle>
                    <CardDescription>Important notifications requiring attention</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {expiringSoon > 0 && (
                      <div className="flex items-start gap-3 p-4 rounded-lg border border-chart-4/20 bg-chart-4/5">
                        <AlertCircle className="w-5 h-5 text-chart-4 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">Blood Units Expiring Soon</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {expiringSoon} blood units will expire within 7 days. Consider prioritizing their use.
                          </div>
                          <Button variant="link" className="p-0 h-auto mt-2" asChild>
                            <Link href="/blood-inventory">View Inventory →</Link>
                          </Button>
                        </div>
                      </div>
                    )}

                    {expiredUnits > 0 && (
                      <div className="flex items-start gap-3 p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                        <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">Expired Blood Units</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {expiredUnits} blood units have expired and should be removed from inventory.
                          </div>
                          <Button variant="link" className="p-0 h-auto mt-2" asChild>
                            <Link href="/blood-inventory">Manage Inventory →</Link>
                          </Button>
                        </div>
                      </div>
                    )}

                    {bloodGroupStats.filter((s) => s.count === 0).length > 0 && (
                      <div className="flex items-start gap-3 p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                        <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">Out of Stock Blood Groups</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {bloodGroupStats.filter((s) => s.count === 0).length} blood groups are out of stock:{" "}
                            {bloodGroupStats
                              .filter((s) => s.count === 0)
                              .map((s) => s.group)
                              .join(", ")}
                          </div>
                          <Button variant="link" className="p-0 h-auto mt-2" asChild>
                            <Link href="/donors">Contact Donors →</Link>
                          </Button>
                        </div>
                      </div>
                    )}

                    {activeRequests > 0 && (
                      <div className="flex items-start gap-3 p-4 rounded-lg border border-primary/20 bg-primary/5">
                        <Activity className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">Pending Hospital Requests</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {activeRequests} hospital requests are pending approval and processing.
                          </div>
                          <Button variant="link" className="p-0 h-auto mt-2" asChild>
                            <Link href="/hospitals">Review Requests →</Link>
                          </Button>
                        </div>
                      </div>
                    )}

                    {expiringSoon === 0 && expiredUnits === 0 && activeRequests === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No alerts at this time. System is running smoothly.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Quick Actions Tab */}
              <TabsContent value="quick-actions" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="hover:border-primary transition-colors cursor-pointer" asChild>
                    <Link href="/donors/register">
                      <CardHeader>
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                          <Users className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">Register New Donor</CardTitle>
                        <CardDescription>Add a new blood donor to the system</CardDescription>
                      </CardHeader>
                    </Link>
                  </Card>

                  <Card className="hover:border-secondary transition-colors cursor-pointer" asChild>
                    <Link href="/blood-inventory/add">
                      <CardHeader>
                        <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-3">
                          <Droplet className="w-6 h-6 text-secondary" />
                        </div>
                        <CardTitle className="text-lg">Add Blood Unit</CardTitle>
                        <CardDescription>Register new blood unit in inventory</CardDescription>
                      </CardHeader>
                    </Link>
                  </Card>

                  <Card className="hover:border-chart-3 transition-colors cursor-pointer" asChild>
                    <Link href="/hospitals/register">
                      <CardHeader>
                        <div className="w-12 h-12 rounded-lg bg-chart-3/10 flex items-center justify-center mb-3">
                          <Hospital className="w-6 h-6 text-chart-3" />
                        </div>
                        <CardTitle className="text-lg">Register Hospital</CardTitle>
                        <CardDescription>Add new partner hospital</CardDescription>
                      </CardHeader>
                    </Link>
                  </Card>

                  <Card className="hover:border-primary transition-colors cursor-pointer" asChild>
                    <Link href="/blood-inventory">
                      <CardHeader>
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                          <BarChart3 className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">View Full Inventory</CardTitle>
                        <CardDescription>Manage all blood units and stock</CardDescription>
                      </CardHeader>
                    </Link>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  )
}
