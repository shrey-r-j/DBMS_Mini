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
import { Droplet, ArrowLeft, Calendar } from "lucide-react"
import { api } from "@/lib/api"
import { toast } from "sonner"

export default function DonorRegistrationPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    donorId: "",
    name: "",
    dob: "",
    age: "",
    address: "",
    contactNo: "",
    diseases: "",
    lastDonationDate: "",
    donationStatus: "Eligible",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        ...formData,
        age: Number.parseInt(formData.age),
        diseases: formData.diseases
          .split(",")
          .map((d) => d.trim())
          .filter(Boolean),
        lastDonationDate: formData.lastDonationDate || undefined,
      }

      await api.donors.create(payload)
      toast.success("Donor registered successfully!")
      router.push("/donors")
    } catch (error) {
      toast.error("Failed to register donor. Please try again.")
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
            <Link href="/donors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Donors
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Donor Registration</CardTitle>
            <CardDescription>Register as a blood donor and help save lives</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Donor ID */}
              <div className="space-y-2">
                <Label htmlFor="donorId">
                  Donor ID <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="donorId"
                  placeholder="e.g., DNR001"
                  value={formData.donorId}
                  onChange={(e) => handleChange("donorId", e.target.value)}
                  required
                />
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </div>

              {/* DOB and Age */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dob">
                    Date of Birth <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleChange("dob", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">
                    Age <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Age"
                    value={formData.age}
                    onChange={(e) => handleChange("age", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Contact */}
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

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">
                  Address <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="address"
                  placeholder="Enter your complete address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  required
                  rows={3}
                />
              </div>

              {/* Diseases */}
              <div className="space-y-2">
                <Label htmlFor="diseases">Medical Conditions</Label>
                <Input
                  id="diseases"
                  placeholder="Enter conditions separated by commas (leave empty if none)"
                  value={formData.diseases}
                  onChange={(e) => handleChange("diseases", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Example: Diabetes, Hypertension (leave empty if you have no medical conditions)
                </p>
              </div>

              {/* Last Donation Date */}
              <div className="space-y-2">
                <Label htmlFor="lastDonationDate">Last Donation Date</Label>
                <Input
                  id="lastDonationDate"
                  type="date"
                  value={formData.lastDonationDate}
                  onChange={(e) => handleChange("lastDonationDate", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Leave empty if this is your first donation</p>
              </div>

              {/* Donation Status */}
              <div className="space-y-2">
                <Label htmlFor="donationStatus">
                  Donation Status <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.donationStatus}
                  onValueChange={(value) => handleChange("donationStatus", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Eligible">Eligible</SelectItem>
                    <SelectItem value="Not Eligible">Not Eligible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? "Registering..." : "Register as Donor"}
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
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Donation Eligibility Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>• Must be at least 18 years old and weigh at least 110 pounds</p>
            <p>• Must wait at least 56 days between whole blood donations</p>
            <p>• Should be in good health and feeling well on donation day</p>
            <p>• Certain medical conditions may affect eligibility</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
