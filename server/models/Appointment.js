import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      validate: {
        validator: function (v) {
          // Validate Nepali phone: 10 digits, starts with 98, 97, or 96
          return /^(98|97|96)\d{8}$/.test(v);
        },
        message: 'Phone must be 10 digits starting with 98, 97, or 96',
      },
    },
    service: {
      type: String,
      required: [true, 'Service selection is required'],
      enum: [
        'checkup',
        'whitening',
        'implant',
        'rootcanal',
        'cosmetic',
        'kids',
        'other',
      ],
    },
    message: {
      type: String,
      maxlength: [500, 'Message cannot exceed 500 characters'],
      default: '',
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    appointmentDate: {
      type: Date,
      default: null,
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
