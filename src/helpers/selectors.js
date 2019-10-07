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
    appointmentIds.forEach(item => { appointment.push(state.appointments[item]) })
    return appointment;
  }
}


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
    const student = interview.student;
    const interviewer = state.interviewers[interview.interviewer]; //Finds matching interviewer object within interviewers array inside state.
    const interviewObj = { student, interviewer};
    return interviewObj;
  }
}

//getInterviewersForDay fetches interviewers for the specific day
export const getInterviewersForDay = (state, day) => {
  const interviewers = []; // define the interviewers array containing IDs

  const interviewerIds = state.days 
    .filter(item => item.name === day) // to select the specified day's object
    .map(item => item.interviewers) // to make a copy of the interviewers array inside day's object
    .reduce((total, value) => total.concat(value), []); // flatten the returned nested array from map
  
  interviewerIds.forEach(id => {
    interviewers.push(state.interviewers[id]) // push interviewer objects, which contain id,name,avatar of the interviewer to our created interviewers array
  });
  return interviewers;  
}


// getSpotsForDay returns available spots on a given day.
export const getSpotsForDay = (appointments, days, day) => {
  const targetDay = days.find(e => e.name === day);
  const appointmentList = [...targetDay.appointments];
  const availableSpots = appointmentList.length;

  const appointmentsSpread = { ...appointments };

  const filledSpots = Object.values(appointmentsSpread).reduce(
    (total, appointment) => {
      if (appointmentList.includes(appointment.id)) {
        if (appointment.interview) {
          return total + 1;
        }
      }
      return total;
    },
    0
  );

  return availableSpots - filledSpots;
};