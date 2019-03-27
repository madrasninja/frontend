import API_CALL from '..';
import * as types from './actionTypes';

export function getLabourList() {
	return API_CALL('get', 'getuser/3', null, types);
}
