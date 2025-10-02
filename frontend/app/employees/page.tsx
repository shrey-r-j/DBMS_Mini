"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Droplet, Search, Plus, Trash2 } from "lucide-react"
import { api, type Employee } from "@/lib/api"
import { toast } from "sonner"

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    loadEmployees()
  }, [])

  const loadEmployees = async () => {
    try {
      const data = await api.employees.getAll()
      setEmployees(data)
    } catch (error) {
      toast.error("Failed to load employees")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this employee?")) return

    try {
      await api.employees.delete(id)
      toast.success("Employee deleted successfully")
      loadEmployees()
    } catch (error) {
      toast.error("Failed to delete employee")
      console.error(error)
    }
  }

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.employeeId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.name?.toLowerCase().includes(searchQuery.toLowerCase()),
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
            <Link href="/employees/register">
              <Plus className="w-4 h-4 mr-2" />
              Add Employee
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Employees</h1>
          <p className="text-muted-foreground">Manage blood bank employees</p>
        </div>

        {/* Search and Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="md:col-span-2">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by employee ID or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Employees</CardDescription>
              <CardTitle className="text-3xl">{employees.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Employees Table */}
        <Card>
          <CardHeader>
            <CardTitle>Employee Records</CardTitle>
            <CardDescription>View all blood bank employees</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading employees...</div>
            ) : filteredEmployees.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {searchQuery ? "No employees found matching your search" : "No employees registered yet"}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact Number</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.map((employee) => (
                      <TableRow key={employee._id}>
                        <TableCell className="font-mono text-sm">{employee.employeeId}</TableCell>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell className="text-sm">{employee.contactNo}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(employee._id)}>
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
