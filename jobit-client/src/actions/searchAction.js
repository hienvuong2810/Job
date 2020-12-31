import { backend } from '../config.json';
import { proxy } from "../fetch.js";

export const LIST_JP = "LIST_JP";

export function getListSearchJP(search) {

    return async function(dispatch) {
  
        let res = await proxy('http://localhost:8080/search?search='+search, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
               
             }
          });
  
      if (res.ok) {
        let data = await res.json();
        dispatch({
          type: LIST_JP,
          payload: data,
        })
      }
  
    }
  
  }