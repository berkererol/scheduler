import React from "react";
import "components/Application.scss";
import DayList from 'components/DayList';
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay, getSpotsForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData();

 
  const interviewers = getInterviewersForDay(state, state.day); // array with interviewer objects { id, name, avatar }
  const appointments = getAppointmentsForDay(state, state.day); // array with appointment objects { id, time, interview : student, interviewer}

  //Create daily schedule containing appointment components to be shown on the page
  const dailySchedule = appointments.map(appointment => {

    const interview = getInterview(state, appointment.interview); // returns interview obj within each appointment obj

    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        // id={appointment.id}
        // time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            selectedDay={state.day}
            setDay={day => setDay(day)}
            appointments={state.appointments}
            getSpotsForDay={getSpotsForDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailySchedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

