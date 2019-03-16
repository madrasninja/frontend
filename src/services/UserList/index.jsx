import API_CALL from '..';
import * as types from './actionTypes';

export function getUserList() {
	return API_CALL('get', 'getuser', null, types);
}
