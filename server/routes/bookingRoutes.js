import express from 'express';
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointmentStatus,
} from '../controllers/bookingController.js';

const router = express.Router();

// Public routes
router.post('/appointments', createAppointment);
router.get('/appointments/:id', getAppointmentById);

// Admin routes (protected by API key)
router.get('/appointments', getAppointments);
router.patch('/appointments/:id', updateAppointmentStatus);

export default router;
