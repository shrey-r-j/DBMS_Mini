"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Droplet, Search, Plus, HospitalIcon, Phone, MapPin } from "lucide-react"
import { api, type Hospital } from "@/lib/api"
import { toast } from "sonner"

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    loadHospitals()
  }, [])

  const loadHospitals = async () => {
    try {
      const data = await api.hospitals.getAll()
      setHospitals(data)
    } catch (error) {
      toast.error("Failed to load hospitals")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const filteredHospitals = hospitals.filter(
    (hospital) =>
      hospital.hospitalName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.contactNo?.includes(searchQuery),
  )

  const getStatusVariant = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "secondary"
      case "approved":
        return "default"
      case "delivered":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Droplet className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">LifeFlow</span>
          </Link>
          <Button asChild>
            <Link href="/hospitals/register">
              <Plus className="w-4 h-4 mr-2" />
              Register Hospital
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Partner Hospitals</h1>
          <p className="text-muted-foreground">Manage hospital registrations and blood requests</p>
        </div>

        {/* Search and Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="md:col-span-2">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, address, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Hospitals</CardDescription>
              <CardTitle className="text-3xl">{hospitals.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Active Requests</CardDescription>
              <CardTitle className="text-3xl text-chart-4">
                {hospitals.filter((h) => h.orderStatus?.toLowerCase() === "pending").length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Hospitals Table */}
        <Card>
          <CardHeader>
            <CardTitle>Registered Hospitals</CardTitle>
            <CardDescription>View all partner hospitals and their order status</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading hospitals...</div>
            ) : filteredHospitals.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {searchQuery ? "No hospitals found matching your search" : "No hospitals registered yet"}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hospital Name</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Order Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredHospitals.map((hospital) => (
                      <TableRow key={hospital._id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-chart-3/10 flex items-center justify-center flex-shrink-0">
                              <HospitalIcon className="w-4 h-4 text-chart-3" />
                            </div>
                            <span className="font-medium">{hospital.hospitalName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm max-w-[250px] truncate">
                            <MapPin className="w-3 h-3 flex-shrink-0" />
                            {hospital.address}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="w-3 h-3" />
                            {hospital.contactNo}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(hospital.orderStatus)}>
                            {hospital.orderStatus || "No Orders"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/hospitals/${hospital._id}`}>View Details</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
