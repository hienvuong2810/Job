import {LIST_JP}  from '../actions/searchAction';

export const initState = {
    list_job: [],
    headings: [
        'Title', 'Descriptions', 'Requirements', 'Expired_Date', 'Salary'
      ]
};

export default function reducer (state = {...initState}, action) {

    const payload = action.payload;


    switch (action.type) {

    case LIST_JP:
        return {
            ...state,
            list_job: payload
        }

    default:
        return state
    }
}
