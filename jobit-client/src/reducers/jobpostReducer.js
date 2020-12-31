import { GET_LIST, UPDATE_FORM, CREATE_JOBPOST } from '../actions/jobpostActions';

export const initState = {
    list: [],
    form: {
      title: "",
      descriptions: "",
      expired_date: "",
      requirements: "",
      salary: "",
      created_date: ""
    },
    headings: [
      'Title', 'Descriptions', 'Requirements', 'Expired_Date', 'Salary', 'Address', 'JobKeywords'
    ]
};

export default function reducer(state = { ...initState }, action) {
    const payload = action.payload;

    switch (action.type) {

        case GET_LIST: {
          return {
            ...state,
            list: payload
          }
        }

        case UPDATE_FORM: {
          return {
            ...state,
            form: {...state.form,
              [payload.id]: payload.value
            }
          }
        }

        case CREATE_JOBPOST: {
          return {
            ...state,
            list: [...state.list,
              payload
            ],
            form: {
              title: "",
              descriptions: "",
              expired_date: "",
              requirements: "",
              salary: ""
            }
          }
        }

        default:
            return state;
    }
}
