import API_CALL from "./../";
import * as types from "./actionTypes";

export function getLocalityList() {
    return API_CALL('get', 'getlocalitylist', null, types);
}