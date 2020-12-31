import { combineReducers } from 'redux';
import UI from './UIReducer.js';
import account from './accountReducer.js';
import auth from './authReducer.js';
import factors from './factorsReducer.js';
import jobpost from './jobpostReducer.js';
import search from './searchReducer.js';
export default combineReducers({
	 UI, account, auth, factors, jobpost, search
});
