# LifeFlow - Blood Bank Management System

A comprehensive blood bank management system connecting donors, blood banks, and hospitals to save lives.

## Features

### For Donors
- Easy registration with eligibility tracking
- Donation history management
- Contact information and medical history

### For Blood Banks
- Real-time blood inventory management
- Blood group tracking and statistics
- Expiry date monitoring and alerts
- Order and delivery management

### For Hospitals
- Hospital registration and partnership
- Blood request management
- Order status tracking

### Admin Dashboard
- Comprehensive system overview
- Real-time statistics and analytics
- Blood group distribution monitoring
- System alerts and notifications
- Quick access to all management functions

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Modern styling with design tokens
- **shadcn/ui** - High-quality UI components
- **Sonner** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

## Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB instance running
- npm or pnpm package manager

### Backend Setup

1. Install backend dependencies:
\`\`\`bash
npm install
\`\`\`

2. Create a `.env` file in the root directory:
\`\`\`env
MONGO_URI=your_mongodb_connection_string
PORT=3000
\`\`\`

3. Start the backend server:
\`\`\`bash
node server.js
\`\`\`

The backend API will be available at `http://localhost:3000`

### Frontend Setup

1. The frontend is built with Next.js and runs in the same project

2. Create a `.env.local` file:
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
\`\`\`

3. Install frontend dependencies (if not already installed):
\`\`\`bash
npm install
\`\`\`

4. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

The frontend will be available at `http://localhost:3001` (or the next available port)

## API Endpoints

### Donors
- `GET /api/donors` - Get all donors
- `GET /api/donors/:id` - Get donor by ID
- `POST /api/donors` - Create new donor
- `PUT /api/donors/:id` - Update donor
- `DELETE /api/donors/:id` - Delete donor

### Blood Units
- `GET /api/blood` - Get all blood units
- `GET /api/blood/:id` - Get blood unit by ID
- `POST /api/blood` - Create new blood unit
- `PUT /api/blood/:id` - Update blood unit
- `DELETE /api/blood/:id` - Delete blood unit

### Blood Banks
- `GET /api/bloodbanks` - Get all blood banks
- `GET /api/bloodbanks/:id` - Get blood bank by ID
- `POST /api/bloodbanks` - Create new blood bank
- `PUT /api/bloodbanks/:id` - Update blood bank
- `DELETE /api/bloodbanks/:id` - Delete blood bank

### Hospitals
- `GET /api/hospitals` - Get all hospitals
- `GET /api/hospitals/:id` - Get hospital by ID
- `POST /api/hospitals` - Create new hospital
- `PUT /api/hospitals/:id` - Update hospital
- `DELETE /api/hospitals/:id` - Delete hospital

## Project Structure

\`\`\`
├── app/                      # Next.js app directory
│   ├── admin/               # Admin dashboard
│   ├── blood-banks/         # Blood bank management
│   ├── blood-inventory/     # Blood inventory pages
│   ├── donors/              # Donor management
│   ├── hospitals/           # Hospital management
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   └── globals.css          # Global styles
├── components/              # React components
│   └── ui/                  # shadcn/ui components
├── lib/                     # Utility functions
│   └── api.ts              # API client
├── models/                  # MongoDB models
│   ├── blood.js
│   ├── bloodbank.js
│   ├── donor.js
│   └── hospital.js
├── routes/                  # Express routes
│   ├── bloodBankRoutes.js
│   ├── bloodroute.js
│   ├── donorRoutes.js
│   └── hospitalRoutes.js
└── server.js               # Express server
\`\`\`

## Design System

The application uses a light medical theme with:
- **Primary Color**: Soft blue (medical trust)
- **Secondary Color**: Soft green (health and vitality)
- **Accent Colors**: Carefully selected for different blood groups and status indicators
- **Typography**: Geist Sans for UI, Geist Mono for code/IDs

## Key Features

### Blood Inventory Management
- Real-time tracking of blood units
- Automatic expiry monitoring
- Blood group distribution analytics
- Low stock alerts

### Donor Management
- Comprehensive donor profiles
- Eligibility status tracking
- Donation history
- Search and filter capabilities

### Hospital Integration
- Partner hospital registration
- Blood request management
- Order status tracking
- Priority request handling

### Admin Dashboard
- System-wide statistics
- Real-time alerts
- Quick action shortcuts
- Comprehensive reporting

## Contributing

This is a blood bank management system designed to save lives. Contributions are welcome to improve functionality, add features, or enhance the user experience.

## License

MIT License - feel free to use this project for educational or commercial purposes.

## Support

For issues or questions, please open an issue in the repository.

---

Built with ❤️ to save lives
