import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const apponintmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

apponintmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();
  response.json(appointments);
});

apponintmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    response.json(appointment);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

export default apponintmentsRouter;
