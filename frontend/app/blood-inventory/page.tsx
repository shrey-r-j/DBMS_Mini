"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Droplet, Search, Plus, Calendar, DollarSign, AlertCircle } from "lucide-react"
import { api, type Blood } from "@/lib/api"
import { toast } from "sonner"

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

export default function BloodInventoryPage() {
  const [bloodUnits, setBloodUnits] = useState<Blood[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterGroup, setFilterGroup] = useState<string>("all")

  useEffect(() => {
    loadBloodInventory()
  }, [])

  const loadBloodInventory = async () => {
    try {
      const data = await api.blood.getAll()
      setBloodUnits(data)
    } catch (error) {
      toast.error("Failed to load blood inventory")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const isExpiringSoon = (expiryDate: string) => {
    const daysUntilExpiry = Math.ceil((new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0
  }

  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date()
  }

  const filteredBloodUnits = bloodUnits.filter((unit) => {
    const matchesSearch =
      unit.bloodId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      unit.bloodGroup?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGroup = filterGroup === "all" || unit.bloodGroup === filterGroup
    return matchesSearch && matchesGroup
  })

  const getInventoryByGroup = () => {
    return BLOOD_GROUPS.map((group) => ({
      group,
      count: bloodUnits.filter((unit) => unit.bloodGroup === group && !isExpired(unit.expiryDate)).length,
    }))
  }

  const inventoryStats = getInventoryByGroup()
  const totalUnits = bloodUnits.filter((unit) => !isExpired(unit.expiryDate)).length
  const expiringSoon = bloodUnits.filter((unit) => isExpiringSoon(unit.expiryDate)).length
  const expired = bloodUnits.filter((unit) => isExpired(unit.expiryDate)).length

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
            <Link href="/blood-inventory/add">
              <Plus className="w-4 h-4 mr-2" />
              Add Blood Unit
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Blood Inventory</h1>
          <p className="text-muted-foreground">Manage and monitor blood unit availability</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Units Available</CardDescription>
              <CardTitle className="text-3xl text-primary">{totalUnits}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Expiring Soon</CardDescription>
              <CardTitle className="text-3xl text-chart-4">{expiringSoon}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Expired Units</CardDescription>
              <CardTitle className="text-3xl text-destructive">{expired}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Blood Groups</CardDescription>
              <CardTitle className="text-3xl text-secondary">{BLOOD_GROUPS.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Blood Group Inventory */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Inventory by Blood Group</CardTitle>
            <CardDescription>Available units for each blood type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {inventoryStats.map((stat) => (
                <div
                  key={stat.group}
                  className="text-center p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
                >
                  <div className="text-2xl font-bold text-primary mb-1">{stat.group}</div>
                  <div className="text-sm text-muted-foreground">{stat.count} units</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card className="md:col-span-2">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by blood ID or blood group..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <Select value={filterGroup} onValueChange={setFilterGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by blood group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Blood Groups</SelectItem>
                  {BLOOD_GROUPS.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* Blood Units Table */}
        <Card>
          <CardHeader>
            <CardTitle>Blood Units</CardTitle>
            <CardDescription>Detailed inventory of all blood units</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading inventory...</div>
            ) : filteredBloodUnits.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {searchQuery || filterGroup !== "all"
                  ? "No blood units found matching your filters"
                  : "No blood units in inventory"}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Blood ID</TableHead>
                      <TableHead>Blood Group</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Stored Date</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBloodUnits.map((unit) => {
                      const expired = isExpired(unit.expiryDate)
                      const expiringSoon = isExpiringSoon(unit.expiryDate)

                      return (
                        <TableRow key={unit._id} className={expired ? "opacity-60" : ""}>
                          <TableCell className="font-mono text-sm">{unit.bloodId}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-semibold">
                              {unit.bloodGroup}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              {unit.cost}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="w-3 h-3" />
                              {new Date(unit.storedDate).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="w-3 h-3" />
                              {new Date(unit.expiryDate).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            {expired ? (
                              <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                                <AlertCircle className="w-3 h-3" />
                                Expired
                              </Badge>
                            ) : expiringSoon ? (
                              <Badge
                                variant="secondary"
                                className="flex items-center gap-1 w-fit bg-chart-4/20 text-chart-4"
                              >
                                <AlertCircle className="w-3 h-3" />
                                Expiring Soon
                              </Badge>
                            ) : (
                              <Badge variant="default" className="bg-secondary">
                                Available
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    })}
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
