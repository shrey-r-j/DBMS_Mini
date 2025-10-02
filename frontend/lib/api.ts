// API configuration and helper functions for backend integration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

export const api = {
  // Donor endpoints
  donors: {
    getAll: () => fetch(`${API_BASE_URL}/donors`).then((res) => res.json()),
    getById: (id: string) => fetch(`${API_BASE_URL}/donors/${id}`).then((res) => res.json()),
    create: (data: any) =>
      fetch(`${API_BASE_URL}/donors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    update: (id: string, data: any) =>
      fetch(`${API_BASE_URL}/donors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    delete: (id: string) =>
      fetch(`${API_BASE_URL}/donors/${id}`, {
        method: "DELETE",
      }).then((res) => res.json()),
  },

  // Blood endpoints
  blood: {
    getAll: () => fetch(`${API_BASE_URL}/blood`).then((res) => res.json()),
    getById: (id: string) => fetch(`${API_BASE_URL}/blood/${id}`).then((res) => res.json()),
    create: (data: any) =>
      fetch(`${API_BASE_URL}/blood`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    update: (id: string, data: any) =>
      fetch(`${API_BASE_URL}/blood/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    delete: (id: string) =>
      fetch(`${API_BASE_URL}/blood/${id}`, {
        method: "DELETE",
      }).then((res) => res.json()),
  },

  // Blood Bank endpoints
  bloodBanks: {
    getAll: () => fetch(`${API_BASE_URL}/bloodbanks`).then((res) => res.json()),
    getById: (id: string) => fetch(`${API_BASE_URL}/bloodbanks/${id}`).then((res) => res.json()),
    create: (data: any) =>
      fetch(`${API_BASE_URL}/bloodbanks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    update: (id: string, data: any) =>
      fetch(`${API_BASE_URL}/bloodbanks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    delete: (id: string) =>
      fetch(`${API_BASE_URL}/bloodbanks/${id}`, {
        method: "DELETE",
      }).then((res) => res.json()),
  },

  // Hospital endpoints
  hospitals: {
    getAll: () => fetch(`${API_BASE_URL}/hospitals`).then((res) => res.json()),
    getById: (id: string) => fetch(`${API_BASE_URL}/hospitals/${id}`).then((res) => res.json()),
    create: (data: any) =>
      fetch(`${API_BASE_URL}/hospitals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    update: (id: string, data: any) =>
      fetch(`${API_BASE_URL}/hospitals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    delete: (id: string) =>
      fetch(`${API_BASE_URL}/hospitals/${id}`, {
        method: "DELETE",
      }).then((res) => res.json()),
  },

  // Employee endpoints
  employees: {
    getAll: () => fetch(`${API_BASE_URL}/employees`).then((res) => res.json()),
    getById: (id: string) => fetch(`${API_BASE_URL}/employees/${id}`).then((res) => res.json()),
    create: (data: any) =>
      fetch(`${API_BASE_URL}/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    update: (id: string, data: any) =>
      fetch(`${API_BASE_URL}/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    delete: (id: string) =>
      fetch(`${API_BASE_URL}/employees/${id}`, {
        method: "DELETE",
      }).then((res) => res.json()),
  },

  // Patient endpoints
  patients: {
    getAll: () => fetch(`${API_BASE_URL}/patients`).then((res) => res.json()),
    getById: (id: string) => fetch(`${API_BASE_URL}/patients/${id}`).then((res) => res.json()),
    create: (data: any) =>
      fetch(`${API_BASE_URL}/patients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    update: (id: string, data: any) =>
      fetch(`${API_BASE_URL}/patients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    delete: (id: string) =>
      fetch(`${API_BASE_URL}/patients/${id}`, {
        method: "DELETE",
      }).then((res) => res.json()),
  },
}

export type Donor = {
  _id: string
  donorId: string
  name: string
  dob: string
  age: number
  address: string
  contactNo: string
  diseases: string[]
  lastDonationDate: string
  donationStatus: "Eligible" | "Not Eligible"
}

export type Blood = {
  _id: string
  bloodId: string
  bloodGroup: string
  cost: number
  storedDate: string
  expiryDate: string
  donor: Donor | string
}

export type BloodBank = {
  _id: string
  bloodBankId: string
  order: string
  deliveryDate: string
  bloodDonations: Array<{
    bloodId: string
    bloodGroup: string
    quantity: number
  }>
}

export type Hospital = {
  _id: string
  hospitalName: string
  address: string
  contactNo: string
  orderStatus: string
}

export type Patient = {
  _id: string
  patientId: string
  name: string
  dob: string
  bloodGroup: string
  contactNo: string
  borrowDate: string
  hospital: Hospital | string
}

export type Employee = {
  _id: string
  employeeId: string
  name: string
  contactNo: string
  bloodBank: BloodBank | string
}
