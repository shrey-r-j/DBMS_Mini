"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Droplet, ArrowLeft } from "lucide-react"
import { api, type BloodBank } from "@/lib/api"
import { toast } from "sonner"

export default function RegisterEmployeePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [bloodBanks, setBloodBanks] = useState<BloodBank[]>([])
  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    contactNo: "",
    bloodBank: "",
  })

  useEffect(() => {
    loadBloodBanks()
  }, [])

  const loadBloodBanks = async () => {
    try {
      const data = await api.bloodBanks.getAll()
      setBloodBanks(data)
    } catch (error) {
      console.error("Failed to load blood banks:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const submitData = { ...formData }
      if (submitData.bloodBank === "none") {
        delete submitData.bloodBank
      }

      await api.employees.create(submitData)
      toast.success("Employee registered successfully")
      router.push("/employees")
    } catch (error) {
      toast.error("Failed to register employee")
      console.error(error)
    } finally {
      setLoading(false)
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
          <Button variant="outline" asChild>
            <Link href="/employees">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Employees
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Register Employee</h1>
          <p className="text-muted-foreground">Add a new employee to the system</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Employee Information</CardTitle>
            <CardDescription>Enter the employee details below</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID *</Label>
                <Input
                  id="employeeId"
                  placeholder="E-001"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactNo">Contact Number *</Label>
                <Input
                  id="contactNo"
                  type="tel"
                  placeholder="+1234567890"
                  value={formData.contactNo}
                  onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bloodBank">Blood Bank</Label>
                <Select
                  value={formData.bloodBank}
                  onValueChange={(value) => setFormData({ ...formData, bloodBank: value })}
                >
                  <SelectTrigger id="bloodBank">
                    <SelectValue placeholder="Select a blood bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {bloodBanks.map((bank) => (
                      <SelectItem key={bank._id} value={bank._id}>
                        {bank.bloodBankId}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? "Registering..." : "Register Employee"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
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
