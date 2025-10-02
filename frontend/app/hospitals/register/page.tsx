"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Droplet, ArrowLeft, HospitalIcon } from "lucide-react"
import { api } from "@/lib/api"
import { toast } from "sonner"

export default function HospitalRegistrationPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    hospitalName: "",
    address: "",
    contactNo: "",
    orderStatus: "No Orders",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await api.hospitals.create(formData)
      toast.success("Hospital registered successfully!")
      router.push("/hospitals")
    } catch (error) {
      toast.error("Failed to register hospital. Please try again.")
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
            <Link href="/hospitals">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Hospitals
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-lg bg-chart-3/10 flex items-center justify-center">
                <HospitalIcon className="w-6 h-6 text-chart-3" />
              </div>
              <div>
                <CardTitle className="text-2xl">Hospital Registration</CardTitle>
                <CardDescription>Register your hospital to request blood units</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Hospital Name */}
              <div className="space-y-2">
                <Label htmlFor="hospitalName">
                  Hospital Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="hospitalName"
                  placeholder="e.g., City General Hospital"
                  value={formData.hospitalName}
                  onChange={(e) => handleChange("hospitalName", e.target.value)}
                  required
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">
                  Hospital Address <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="address"
                  placeholder="Enter complete hospital address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  required
                  rows={3}
                />
              </div>

              {/* Contact Number */}
              <div className="space-y-2">
                <Label htmlFor="contactNo">
                  Contact Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="contactNo"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.contactNo}
                  onChange={(e) => handleChange("contactNo", e.target.value)}
                  required
                />
              </div>

              {/* Order Status */}
              <div className="space-y-2">
                <Label htmlFor="orderStatus">Initial Order Status</Label>
                <Select value={formData.orderStatus} onValueChange={(value) => handleChange("orderStatus", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="No Orders">No Orders</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? "Registering..." : "Register Hospital"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 bg-accent/20 border-accent">
          <CardHeader>
            <CardTitle className="text-lg">Partnership Benefits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>• Direct access to blood inventory across multiple blood banks</p>
            <p>• Priority processing for emergency blood requests</p>
            <p>• Real-time tracking of blood unit availability</p>
            <p>• Automated notifications for order status updates</p>
            <p>• Dedicated support for urgent requirements</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
