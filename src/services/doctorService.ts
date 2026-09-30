import { Doctor, Appointment } from '../types';
import { mockDoctors } from '../data/mockDoctors';

class DoctorService {
  private doctors: Doctor[] = [...mockDoctors];
  private appointments: Appointment[] = [
    {
      id: 'apt-101',
      doctorId: 'doc-1',
      doctorName: 'Dr. Ananya Sharma',
      doctorSpecialty: 'Clinical Nutritionist & Metabolic Specialist',
      doctorAvatar: 'https://images.unsplash.com/photo-1594824813566-88855ce78961?auto=format&fit=crop&w=400&q=80',
      date: 'Tomorrow',
      timeSlot: '4:00 PM',
      consultationPriceInr: 899,
      status: 'Confirmed',
      consultationType: 'Video',
      bookedAt: 'Today, 10:15 AM'
    }
  ];

  public getDoctors(): Doctor[] {
    return this.doctors;
  }

  public getDoctorById(id: string): Doctor | undefined {
    return this.doctors.find(d => d.id === id);
  }

  public getAppointments(): Appointment[] {
    return this.appointments;
  }

  public bookAppointment(doctor: Doctor, date: string, timeSlot: string, consultationType: 'Video' | 'Chat' | 'In-Person' = 'Video'): Appointment {
    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      doctorAvatar: doctor.avatar,
      date,
      timeSlot,
      consultationPriceInr: doctor.consultationPriceInr,
      status: 'Confirmed',
      consultationType,
      bookedAt: new Date().toLocaleString()
    };
    this.appointments.unshift(newAppointment);
    return newAppointment;
  }

  public cancelAppointment(id: string): void {
    const apt = this.appointments.find(a => a.id === id);
    if (apt) {
      apt.status = 'Cancelled';
    }
  }
}

export const doctorService = new DoctorService();
