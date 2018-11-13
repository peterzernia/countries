import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export const fetchTripReportsPending = () => {
  return {
    type: "FETCH_TRIP_REPORTS_PENDING"
  }
}

export const fetchTripReportsFulfilled = tripReports => {
  return {
    type: "FETCH_TRIP_REPORTS_FULFILLED",
    tripReports: tripReports
  }
}

export const fetchTripReportsRejected = error => {
  return {
    type: "FETCH_TRIP_REPORTS_REJECTED",
    error: error
  }
}

export const fetchUserTripReportsPending = () => {
  return {
    type: "FETCH_USER_TRIP_REPORTS_PENDING"
  }
}

export const fetchUserTripReportsFulfilled = tripReports => {
  return {
    type: "FETCH_USER_TRIP_REPORTS_FULFILLED",
    tripReports: tripReports
  }
}

export const fetchUserTripReportsRejected = error => {
  return {
    type: "FETCH_USER_TRIP_REPORTS_REJECTED",
    error: error
  }
}

export const postTripReportsPending = () => {
  return {
    type: "POST_TRIP_REPORTS_PENDING"
  }
}

export const postTripReportsFulfilled = response => {
  return {
    type: "POST_TRIP_REPORTS_FULFILLED",
    response: response
  }
}

export const postTripReportsRejected = error => {
  return {
    type: "POST_TRIP_REPORTS_REJECTED",
    error: error
  }
}

export const deleteTripReportsPending = () => {
  return {
    type: "DELETE_TRIP_REPORTS_PENDING"
  }
}

export const deleteTripReportsFulfilled = response => {
  return {
    type: "DELETE_TRIP_REPORTS_FULFILLED",
    response: response
  }
}

export const deleteTripReportsRejected = error => {
  return {
    type: "DELETE_TRIP_REPORTS_REJECTED",
    error: error
  }
}

export const updateTripReportsPending = () => {
  return {
    type: "UPDATE_TRIP_REPORTS_PENDING"
  }
}

export const updateTripReportsFulfilled = response => {
  return {
    type: "UPDATE_TRIP_REPORTS_FULFILLED",
    response: response
  }
}

export const updateTripReportsRejected = error => {
  return {
    type: "UPDATE_TRIP_REPORTS_REJECTED",
    error: error
  }
}

export const fetchTripReports = () => {
  return dispatch => {
    dispatch(fetchTripReportsPending());
    axios.get('http://localhost:8000/api/v1/reports/')
      .then(response => {
        const tripReports = response.data;
        dispatch(fetchTripReportsFulfilled(tripReports));
      })
      .catch(err => {
        dispatch(fetchTripReportsRejected(err));
      })
  }
}

export const fetchUserTripReports = (username) => {
  return dispatch => {
    dispatch(fetchUserTripReportsPending());
    axios.get(`http://localhost:8000/api/v1/reports/?search=${username}`)
      .then(response => {
        const tripReports = response.data;
        dispatch(fetchUserTripReportsFulfilled(tripReports));
      })
      .catch(err => {
        dispatch(fetchUserTripReportsRejected(err));
      })
  }
}

export const postTripReport = (author, title, content, countries) => {
  const token = localStorage.getItem('token');
  return dispatch => {
    dispatch(postTripReportsPending());
    axios.post(
      'http://localhost:8000/api/v1/reports/',
      {
        title: title,
        content: content,
        author: author,
        countries: countries
      },
      {headers: { 'Authorization': `Token ${token}`}}
    )
      .then(response => {
        dispatch(postTripReportsFulfilled(response.data));
      })
      .catch(err => {
        dispatch(postTripReportsRejected(err));
      })
  }
}

export const deleteTripReport = (tripReport) => {
  const token = localStorage.getItem('token');
  return dispatch => {
    dispatch(deleteTripReportsPending());
    axios.delete(`http://localhost:8000/api/v1/reports/${tripReport}/`, {headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRFToken': 'csrftoken',
      'Authorization': `Token ${token}`
    }})
      .then(response => {
        dispatch(deleteTripReportsFulfilled(response.data));
      })
      .catch(err => {
        dispatch(deleteTripReportsRejected(err));
      })
  }
}

export const updateTripReport = (tripReport, author, title, content, countries) => {
  const token = localStorage.getItem('token');
  return dispatch => {
    dispatch(updateTripReportsPending());
    axios.put(`http://localhost:8000/api/v1/reports/${tripReport}/`,
      {
        id: tripReport,
        author: author,
        title: title,
        content: content,
        countries: countries
      },
      {headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': 'csrftoken',
        'Authorization': `Token ${token}`
    }})
      .then(response => {
        dispatch(updateTripReportsFulfilled(response.data));
      })
      .catch(err => {
        dispatch(updateTripReportsRejected(err));
      })
  }
}
