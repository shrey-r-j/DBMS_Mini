"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Droplet, ArrowLeft, Calendar, Package } from "lucide-react"
import { api, type BloodBank } from "@/lib/api"
import { toast } from "sonner"

export default function BloodBankDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [bloodBank, setBloodBank] = useState<BloodBank | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBloodBank()
  }, [params.id])

  const loadBloodBank = async () => {
    try {
      const data = await api.bloodBanks.getById(params.id as string)
      setBloodBank(data)
    } catch (error) {
      toast.error("Failed to load blood bank details")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading blood bank details...</div>
      </div>
    )
  }

  if (!bloodBank) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Blood bank order not found</p>
          <Button onClick={() => router.push("/blood-banks")}>Back to Blood Banks</Button>
        </div>
      </div>
    )
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
          <Button variant="outline" asChild>
            <Link href="/blood-banks">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blood Banks
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Blood Bank Order Details</h1>
          <p className="text-muted-foreground">View and manage blood donations for this order</p>
        </div>

        {/* Order Information */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Blood Bank ID</CardDescription>
              <CardTitle className="text-2xl font-mono">{bloodBank.bloodBankId}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Delivery Date
              </CardDescription>
              <CardTitle className="text-2xl">
                {bloodBank.deliveryDate ? new Date(bloodBank.deliveryDate).toLocaleDateString() : "Not scheduled"}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-1">
                <Package className="w-3 h-3" />
                Total Units
              </CardDescription>
              <CardTitle className="text-2xl">{bloodBank.bloodDonations?.length || 0}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Order Details */}
        {bloodBank.order && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{bloodBank.order}</p>
            </CardContent>
          </Card>
        )}

        {/* Blood Donations */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Blood Donations</CardTitle>
                <CardDescription>Blood units included in this order</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {!bloodBank.bloodDonations || bloodBank.bloodDonations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No blood donations in this order</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Blood ID</TableHead>
                      <TableHead>Blood Group</TableHead>
                      <TableHead>Quantity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bloodBank.bloodDonations.map((donation, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-mono">{donation.bloodId}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{donation.bloodGroup}</Badge>
                        </TableCell>
                        <TableCell>{donation.quantity} units</TableCell>
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
