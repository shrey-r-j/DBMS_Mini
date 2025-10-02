"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Droplet, Search, Plus, Calendar, Trash2 } from "lucide-react"
import { api, type Patient } from "@/lib/api"
import { toast } from "sonner"

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    loadPatients()
  }, [])

  const loadPatients = async () => {
    try {
      const data = await api.patients.getAll()
      setPatients(data)
    } catch (error) {
      toast.error("Failed to load patients")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this patient?")) return

    try {
      await api.patients.delete(id)
      toast.success("Patient deleted successfully")
      loadPatients()
    } catch (error) {
      toast.error("Failed to delete patient")
      console.error(error)
    }
  }

  const filteredPatients = patients.filter(
    (patient) =>
      patient.patientId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.bloodGroup?.toLowerCase().includes(searchQuery.toLowerCase()),
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
            <Link href="/patients/register">
              <Plus className="w-4 h-4 mr-2" />
              Register Patient
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Patients</h1>
          <p className="text-muted-foreground">Manage patient records and blood requests</p>
        </div>

        {/* Search and Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="md:col-span-2">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by patient ID, name, or blood group..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Patients</CardDescription>
              <CardTitle className="text-3xl">{patients.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Patients Table */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Records</CardTitle>
            <CardDescription>View all registered patients</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading patients...</div>
            ) : filteredPatients.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {searchQuery ? "No patients found matching your search" : "No patients registered yet"}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Blood Group</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Borrow Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.map((patient) => (
                      <TableRow key={patient._id}>
                        <TableCell className="font-mono text-sm">{patient.patientId}</TableCell>
                        <TableCell className="font-medium">{patient.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{patient.bloodGroup}</Badge>
                        </TableCell>
                        <TableCell className="text-sm">{patient.contactNo}</TableCell>
                        <TableCell>
                          {patient.borrowDate ? (
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="w-3 h-3" />
                              {new Date(patient.borrowDate).toLocaleDateString()}
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm">N/A</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(patient._id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
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
