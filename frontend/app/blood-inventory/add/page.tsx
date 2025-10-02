"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Droplet, ArrowLeft } from "lucide-react"
import { api, type Donor } from "@/lib/api"
import { toast } from "sonner"

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

export default function AddBloodUnitPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [donors, setDonors] = useState<Donor[]>([])
  const [formData, setFormData] = useState({
    bloodId: "",
    bloodGroup: "A+",
    cost: "",
    storedDate: "",
    expiryDate: "",
    donor: "none", // Changed from empty string to "none" to fix lint error
  })

  useEffect(() => {
    loadDonors()
  }, [])

  const loadDonors = async () => {
    try {
      const data = await api.donors.getAll()
      setDonors(data.filter((d: Donor) => d.donationStatus === "Eligible"))
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        bloodId: formData.bloodId,
        bloodGroup: formData.bloodGroup,
        cost: Number.parseFloat(formData.cost),
        storedDate: formData.storedDate,
        expiryDate: formData.expiryDate,
        ...(formData.donor !== "none" && { donor: formData.donor }),
      }

      await api.blood.create(payload)
      toast.success("Blood unit added successfully!")
      router.push("/blood-inventory")
    } catch (error) {
      toast.error("Failed to add blood unit. Please try again.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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
            <Link href="/blood-inventory">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Inventory
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Add Blood Unit</CardTitle>
            <CardDescription>Register a new blood unit in the inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Blood ID */}
              <div className="space-y-2">
                <Label htmlFor="bloodId">
                  Blood Unit ID <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="bloodId"
                  placeholder="e.g., BLD001"
                  value={formData.bloodId}
                  onChange={(e) => handleChange("bloodId", e.target.value)}
                  required
                />
              </div>

              {/* Blood Group */}
              <div className="space-y-2">
                <Label htmlFor="bloodGroup">
                  Blood Group <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.bloodGroup}
                  onValueChange={(value) => handleChange("bloodGroup", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    {BLOOD_GROUPS.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Cost */}
              <div className="space-y-2">
                <Label htmlFor="cost">
                  Cost (USD) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="cost"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.cost}
                  onChange={(e) => handleChange("cost", e.target.value)}
                  required
                />
              </div>

              {/* Dates */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storedDate">
                    Stored Date <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="storedDate"
                    type="date"
                    value={formData.storedDate}
                    onChange={(e) => handleChange("storedDate", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">
                    Expiry Date <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => handleChange("expiryDate", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Donor */}
              <div className="space-y-2">
                <Label htmlFor="donor">Donor (Optional)</Label>
                <Select value={formData.donor} onValueChange={(value) => handleChange("donor", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select donor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {donors.map((donor) => (
                      <SelectItem key={donor._id} value={donor._id}>
                        {donor.name} ({donor.donorId})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? "Adding..." : "Add Blood Unit"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
