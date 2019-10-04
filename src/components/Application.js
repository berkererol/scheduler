import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from 'components/DayList';
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

const axios = require('axios');



export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const interviewers = getInterviewersForDay(state, state.day); // array with interviewer objects { id, name, avatar }
  const appointments = getAppointmentsForDay(state, state.day); // array with appointment objects { id, time, interview : student, interviewer}

  const dailySchedule = appointments.map(appointment => {

    const interview = getInterview(state, appointment.interview); // returns interview obj within each appointment obj

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
      />
    );
  });

  const setDay = day => setState({ ...state, day });



  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get(`/api/days`)),
      Promise.resolve(axios.get(`/api/appointments`)),
      Promise.resolve(axios.get(`/api/interviewers`))
    ])
      .then(all => {
        setState(prev => ({ days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })

      .catch(function (error) {
        console.log(error);
      })
  }, []);


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
          <DayList days={state.days} day={state.day} setDay={setDay} appointments={state.appointments} />
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

