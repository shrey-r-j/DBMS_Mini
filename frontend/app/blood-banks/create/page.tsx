"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Droplet, Plus, Trash2, ArrowLeft } from "lucide-react"
import { api } from "@/lib/api"
import { toast } from "sonner"

type BloodDonation = {
  bloodId: string
  bloodGroup: string
  quantity: number
}

export default function CreateBloodBankPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    bloodBankId: "",
    order: "",
    deliveryDate: "",
  })
  const [bloodDonations, setBloodDonations] = useState<BloodDonation[]>([
    { bloodId: "", bloodGroup: "A+", quantity: 1 },
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await api.bloodBanks.create({
        ...formData,
        bloodDonations,
      })
      toast.success("Blood bank order created successfully")
      router.push("/blood-banks")
    } catch (error) {
      toast.error("Failed to create blood bank order")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const addBloodDonation = () => {
    setBloodDonations([...bloodDonations, { bloodId: "", bloodGroup: "A+", quantity: 1 }])
  }

  const removeBloodDonation = (index: number) => {
    setBloodDonations(bloodDonations.filter((_, i) => i !== index))
  }

  const updateBloodDonation = (index: number, field: keyof BloodDonation, value: string | number) => {
    const updated = [...bloodDonations]
    updated[index] = { ...updated[index], [field]: value }
    setBloodDonations(updated)
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

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Blood Bank Order</h1>
          <p className="text-muted-foreground">Add a new blood bank order with blood donations</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Order Information</CardTitle>
              <CardDescription>Enter the blood bank order details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bloodBankId">Blood Bank ID *</Label>
                <Input
                  id="bloodBankId"
                  placeholder="BB-001"
                  value={formData.bloodBankId}
                  onChange={(e) => setFormData({ ...formData, bloodBankId: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">Order Details</Label>
                <Textarea
                  id="order"
                  placeholder="Enter order details..."
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deliveryDate">Delivery Date *</Label>
                <Input
                  id="deliveryDate"
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Blood Donations */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Blood Donations</CardTitle>
                  <CardDescription>Add blood units to this order</CardDescription>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={addBloodDonation}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Unit
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {bloodDonations.map((donation, index) => (
                <div key={index} className="flex gap-4 items-end p-4 border rounded-lg">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`bloodId-${index}`}>Blood ID</Label>
                    <Input
                      id={`bloodId-${index}`}
                      placeholder="BL-001"
                      value={donation.bloodId}
                      onChange={(e) => updateBloodDonation(index, "bloodId", e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`bloodGroup-${index}`}>Blood Group</Label>
                    <Select
                      value={donation.bloodGroup}
                      onValueChange={(value) => updateBloodDonation(index, "bloodGroup", value)}
                    >
                      <SelectTrigger id={`bloodGroup-${index}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-24 space-y-2">
                    <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                    <Input
                      id={`quantity-${index}`}
                      type="number"
                      min="1"
                      value={donation.quantity}
                      onChange={(e) => updateBloodDonation(index, "quantity", Number.parseInt(e.target.value))}
                      required
                    />
                  </div>

                  {bloodDonations.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeBloodDonation(index)}
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Creating..." : "Create Blood Bank Order"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
