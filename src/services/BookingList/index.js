import API_CALL from '..';
import * as types from './actionTypes';

export function getBookingList(offset) {
	let url = offset ? `getbookinglist/${offset}` : `getbookinglist`;
	return API_CALL('get', url, null, types);
}
