// getAppointmentsForDay fetches appointments for the specific day
export const getAppointmentsForDay = (state, day) => {
  const appointment = [];

  const appointmentIds = state.days
    .filter(item => item.name === day) // to select the specified day's object, which contains id,name,appointments,interviewers,spots keys.
    .map(item => item.appointments) // to make a copy of the appointments array
    .reduce((total, value) => total.concat(value), []); // Flattening the array of arrays with reduce (to flatten nested appointments array inside days object)

  if (appointmentIds.length === 0) {
    return appointment;
  } else {
    appointmentIds.forEach(item => {appointment.push(state.appointments[item])})
    return appointment;
  }
}


export function  getInterview(state, interview) {
  if (!interview) {
      return null;
  } else {
      const student = interview.student;
      const interviewer = state.interviewers[interview.interviewer];
      const interviewObj = { student, interviewer };
      return interviewObj;
}
}


