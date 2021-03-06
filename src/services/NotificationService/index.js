import * as types from './actionTypes';

export function addNotification(data) {
	return {
		type: types.PUSH,
		payload: data
	};
}

export function setTimer(data) {
	return {
		type: types.SET_TIMER,
		payload: data
	};
}

export function popNotification(data) {
	return {
		type: types.POP,
		payload: data
	};
}

export function clearNotification() {
	return {
		type: types.CLEAR
	};
}
