import * as types from './actionTypes';
import { clearNotification } from './';

const initialState = { data: [] };

export default function(state = initialState, action) {
	switch (action.type) {
		case types.PUSH:
			state.data.push(action.payload);
			return { ...state, data: state.data };
		case types.POP:
			state.data.splice(state.data.indexOf(action.payload), 1);
			return { ...state, data: state.data };
		case types.CLEAR:
			return { ...state, data: [] };
		default:
			return state;
	}
}
