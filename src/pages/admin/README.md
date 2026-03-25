# Admin Dashboard

The Smile Connect Nepal admin dashboard provides a comprehensive interface for managing dental clinic appointments.

## Features

### 📊 Dashboard Overview
- **Statistics Cards**: View total appointments, pending, confirmed, completed, and cancelled counts
- **Real-time Updates**: Dashboard refreshes automatically and on-demand
- **Responsive Design**: Works on desktop and mobile devices

### 📅 Appointment Management
- **View All Appointments**: Complete list with patient details, contact info, and status
- **Status Management**: Update appointment status (Pending → Confirmed → Completed/Cancelled)
- **Search & Filter**: Find appointments by name, phone, service, or status
- **Export Data**: Download appointment data as CSV file

### 🔐 Security Features
- **Protected Routes**: Admin login required to access dashboard
- **API Key Authentication**: Backend requires API key for data access
- **Session Management**: Automatic logout on browser close

## Access Instructions

### 1. Set Environment Variables
Add these to your `.env.local` file:

```env
VITE_API_URL=http://localhost:5000/api
VITE_ADMIN_API_KEY=your-admin-api-key
VITE_ADMIN_PASSWORD=admin123
```

### 2. Backend Configuration
Update `server/.env` with your MongoDB connection and admin API key:

```env
MONGO_URI=mongodb+srv://your-connection-string
ADMIN_API_KEY=your-secure-api-key
```

### 3. Access Dashboard
1. Start both frontend and backend servers
2. Navigate to `http://localhost:8081/admin/login`
3. Login with password: `admin123`
4. Access dashboard at `http://localhost:8081/admin/dashboard`

## Routes

- `/admin/login` - Admin login page
- `/admin/dashboard` - Protected admin dashboard

## API Endpoints

### Authentication
- `GET /api/appointments` - Get all appointments (requires x-api-key header)
- `PATCH /api/appointments/:id` - Update appointment status (requires x-api-key header)

## Usage Guide

### Managing Appointments
1. **View Appointments**: All appointments are displayed in a table with key information
2. **Update Status**: Click the edit button on any appointment to change its status
3. **Search**: Use the search bar to find appointments by patient name, phone, or service
4. **Filter**: Use status filter to show only appointments with specific status
5. **Export**: Click "Export CSV" to download appointment data

### Status Workflow
- **Pending**: New appointment requests
- **Confirmed**: Appointment scheduled and confirmed with patient
- **Completed**: Appointment finished successfully
- **Cancelled**: Appointment cancelled by patient or clinic

## Security Notes

- Change the default admin password in production
- Use strong, unique API keys
- Implement proper authentication (JWT) for production use
- Enable HTTPS in production
- Regularly rotate API keys

## Development

The admin dashboard is built with:
- React + TypeScript
- Tailwind CSS + Shadcn/UI components
- TanStack Query for data fetching
- React Router for navigation
- Lucide React for icons