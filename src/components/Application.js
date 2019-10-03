import React, { useState } from "react";
import { useEffect } from "react";
import "components/Application.scss";
import DayList from 'components/DayList';
import Appointment from "components/Appointment"

const axios = require('axios');


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "4pm"
  },
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "Jon Macklain",
      interviewer: {
        id: 3,
        name: "Robert Bundabi",
        avatar: "https://i.imgur.com/T2WwVfS.png"
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Tony",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
];


export default function Application(props) {

  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);


  useEffect(() => {
    axios.get(`/api/days`)
      .then(function (response) {
        console.log(response);
        setDays(response.data)
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
          <DayList days={days} day={day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map(item => <Appointment key={item.id} {...item} />)}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}


