import * as types from './actionTypes';

const initialState = { data: [] };

export default function(state = initialState, action) {
	switch (action.type) {
		case types.PUSH:
			// ID generation
			action.payload.id = Math.random();
			state.data.push(action.payload);
			return { ...state, data: state.data };
		case types.SET_TIMER:
			// Setting flag to prevent timer overlap issue
			state.data[state.data.indexOf(action.payload)].timer = true;
			return state;
		case types.POP:
			state.data.splice(state.data.indexOf(action.payload), 1);
			return state;
		case types.CLEAR:
			return { ...state, data: [] };
		default:
			return state;
	}
}
