import Appointment from '../models/Appointment.js';

// POST: Create a new appointment
export const createAppointment = async (req, res, next) => {
  try {
    const { name, phone, service, message } = req.body;

    // Validate required fields
    if (!name || !phone || !service) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone, and service are required',
      });
    }

    // Create appointment
    const appointment = await Appointment.create({
      name: name.trim(),
      phone: phone.replace(/\D/g, ''), // Remove non-digits
      service,
      message: message?.trim() || '',
    });

    res.status(201).json({
      success: true,
      message: 'Appointment request received! We will contact you shortly.',
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

// GET: Retrieve all appointments (admin only - protected by API key)
export const getAppointments = async (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key'];

    if (apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Invalid API key',
      });
    }

    const appointments = await Appointment.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};

// GET: Retrieve appointment by ID
export const getAppointmentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH: Update appointment status (admin only)
export const updateAppointmentStatus = async (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key'];

    if (apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Invalid API key',
      });
    }

    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Appointment status updated',
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};
