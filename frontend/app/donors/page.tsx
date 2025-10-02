"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Droplet, Search, UserPlus, Calendar, Phone, MapPin } from "lucide-react"
import { api, type Donor } from "@/lib/api"
import { toast } from "sonner"

export default function DonorsPage() {
  const [donors, setDonors] = useState<Donor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    loadDonors()
  }, [])

  const loadDonors = async () => {
    try {
      const data = await api.donors.getAll()
      setDonors(data)
    } catch (error) {
      toast.error("Failed to load donors")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const filteredDonors = donors.filter(
    (donor) =>
      donor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.donorId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.contactNo?.includes(searchQuery),
  )

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
            <Link href="/donors/register">
              <UserPlus className="w-4 h-4 mr-2" />
              Register as Donor
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Blood Donors</h1>
          <p className="text-muted-foreground">Browse and search registered blood donors</p>
        </div>

        {/* Search and Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="md:col-span-2">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, ID, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Donors</CardDescription>
              <CardTitle className="text-3xl">{donors.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Eligible Donors</CardDescription>
              <CardTitle className="text-3xl text-secondary">
                {donors.filter((d) => d.donationStatus === "Eligible").length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Donors Table */}
        <Card>
          <CardHeader>
            <CardTitle>Registered Donors</CardTitle>
            <CardDescription>View all registered blood donors and their eligibility status</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading donors...</div>
            ) : filteredDonors.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {searchQuery ? "No donors found matching your search" : "No donors registered yet"}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Donor ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Last Donation</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDonors.map((donor) => (
                      <TableRow key={donor._id}>
                        <TableCell className="font-mono text-sm">{donor.donorId}</TableCell>
                        <TableCell className="font-medium">{donor.name}</TableCell>
                        <TableCell>{donor.age}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="w-3 h-3" />
                            {donor.contactNo}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm max-w-[200px] truncate">
                            <MapPin className="w-3 h-3 flex-shrink-0" />
                            {donor.address}
                          </div>
                        </TableCell>
                        <TableCell>
                          {donor.lastDonationDate ? (
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="w-3 h-3" />
                              {new Date(donor.lastDonationDate).toLocaleDateString()}
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm">Never</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={donor.donationStatus === "Eligible" ? "default" : "secondary"}>
                            {donor.donationStatus}
                          </Badge>
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
