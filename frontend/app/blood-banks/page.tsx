"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Droplet, Search, Plus, Calendar, Trash2, Eye } from "lucide-react"
import { api, type BloodBank } from "@/lib/api"
import { toast } from "sonner"

export default function BloodBanksPage() {
  const [bloodBanks, setBloodBanks] = useState<BloodBank[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    loadBloodBanks()
  }, [])

  const loadBloodBanks = async () => {
    try {
      const data = await api.bloodBanks.getAll()
      setBloodBanks(data)
    } catch (error) {
      toast.error("Failed to load blood banks")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blood bank order?")) return

    try {
      await api.bloodBanks.delete(id)
      toast.success("Blood bank order deleted successfully")
      loadBloodBanks()
    } catch (error) {
      toast.error("Failed to delete blood bank order")
      console.error(error)
    }
  }

  const filteredBloodBanks = bloodBanks.filter(
    (bank) =>
      bank.bloodBankId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.order?.toLowerCase().includes(searchQuery.toLowerCase()),
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
            <Link href="/blood-banks/create">
              <Plus className="w-4 h-4 mr-2" />
              Create Blood Bank Order
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Blood Bank Orders</h1>
          <p className="text-muted-foreground">Manage blood bank orders and deliveries</p>
        </div>

        {/* Search and Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="md:col-span-2">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by blood bank ID or order..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Orders</CardDescription>
              <CardTitle className="text-3xl">{bloodBanks.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Blood Banks Table */}
        <Card>
          <CardHeader>
            <CardTitle>Blood Bank Orders</CardTitle>
            <CardDescription>View all blood bank orders and delivery schedules</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading blood banks...</div>
            ) : filteredBloodBanks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {searchQuery ? "No blood banks found matching your search" : "No blood bank orders yet"}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Blood Bank ID</TableHead>
                      <TableHead>Order Details</TableHead>
                      <TableHead>Delivery Date</TableHead>
                      <TableHead>Donations</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBloodBanks.map((bank) => (
                      <TableRow key={bank._id}>
                        <TableCell className="font-mono text-sm">{bank.bloodBankId}</TableCell>
                        <TableCell className="max-w-[300px]">{bank.order || "No order details"}</TableCell>
                        <TableCell>
                          {bank.deliveryDate ? (
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="w-3 h-3" />
                              {new Date(bank.deliveryDate).toLocaleDateString()}
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm">Not scheduled</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{bank.bloodDonations?.length || 0} units</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/blood-banks/${bank._id}`}>
                                <Eye className="w-4 h-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(bank._id)}>
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
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
