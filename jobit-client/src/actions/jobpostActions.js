import { backend } from '../config.json';
import { proxy } from "../fetch.js";

export const GET_LIST = 'JP_GET_LIST';
export const UPDATE_FORM = 'JP_UPDATE_FORM';
export const CREATE_JOBPOST = 'JP_CREATE_JOBPOST';

export function getList() {

  return async function(dispatch) {

    let res = await proxy(backend + "/api/jobpost", {
        method: "GET",
        headers: {
          "Accept": "application/json"
        }
    });

    if (res.ok) {
      let data = await res.json();
      dispatch({
        type: GET_LIST,
        payload: data,
      })
    }

  }

}

export function updateForm(id, value) {

  return (
    {
      type: UPDATE_FORM,
      payload: {id: id, value: value}
    }
  )

}

export function submitForm(form) {

  return async dispatch => {
      let res = await proxy(backend + "/api/jobpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(
          {
            title: form.title,
            descriptions: form.descriptions,
            expiredDate: new Date(form.expired_date),
            salary: form.salary,
            requirements: form.requirements,
            jobkeywords:[{
              id: "Java"
            }],
            addresses: [{
              id: "f181d",
              bis: "1q",
              street: "abc",
              city_id: 1032912712
            }]
          }
        )
      })
      if (res.ok) {
        dispatch({
          type: CREATE_JOBPOST,
          payload: form
        })
      }


  }

}

export function deleteJobpost(jobpost) {

  return async dispatch => {

    let newJobpost = {...jobpost,
      active: false
    }

    console.log(newJobpost)

    let res = await proxy(backend + "/api/jobpost", {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newJobpost)

    })

    console.log(res)

  }

}

export function activeJobpost(jobpost) {

  return async dispatch => {

    let newJobpost = {...jobpost,
      active: true
    }

    console.log(newJobpost)

    let res = await proxy(backend + "/api/jobpost", {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newJobpost)

    })

    console.log(res)

  }

}
