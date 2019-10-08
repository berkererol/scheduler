import { useEffect, useReducer } from 'react';
import axios from "axios";

import {
  reducer,
  SET_APPLICATION_DATA,
  SET_DAY,
  SET_INTERVIEW
} from 'reducers/application';

export default function useApplicationData() {

  // Updating the state through reducer function
  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    const getDays = axios.get("/api/days");
    const getAppointments = axios.get("/api/appointments");
    const getInterviewers = axios.get("/api/interviewers");
    Promise.all([getDays, getAppointments, getInterviewers])
      .then(res => {
        dispatch({
          type: SET_APPLICATION_DATA,
          days: res[0].data,
          appointments: res[1].data,
          interviewers: res[2].data
        });
      })
      .catch(err => console.log(err));
  }, []);
 
  const bookInterview = function(id, interview) {
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview });
      });
  };

  const deleteInterview = function(id) {
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview: null });
      });
  };

  return { state, setDay, bookInterview, deleteInterview }

}