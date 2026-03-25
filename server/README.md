# Backend Setup Guide

## Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (free)

## 1. MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new project
4. Create a free cluster (M0)
5. Add your IP to Network Access (or allow 0.0.0.0/0 for dev)
6. Create a database user
7. Copy connection string and paste into `.env`

## 2. Backend Setup
```bash
cd server
npm install
```

## 3. Configure .env
Update `server/.env`:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/smile_dental?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
FRONTEND_ORIGIN=http://localhost:5175
ADMIN_API_KEY=change-this-to-secure-key
RATE_LIMIT=30
```

## 4. Run Backend
```bash
npm run dev
```

Server will run at `http://localhost:5000`

## 5. Test API
```bash
# Create appointment
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ram Bahadur",
    "phone": "9800000000",
    "service": "checkup",
    "message": "I have pain"
  }'

# Get appointments (admin)
curl http://localhost:5000/api/appointments \
  -H "x-api-key: your-secure-api-key"
```

## API Endpoints

### Public
- `POST /api/appointments` - Create appointment
- `GET /api/appointments/:id` - Get single appointment

### Admin (requires x-api-key header)
- `GET /api/appointments` - Get all appointments
- `PATCH /api/appointments/:id` - Update status

