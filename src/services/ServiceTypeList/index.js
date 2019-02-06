import API_CALL from "./../";
import * as types from "./actionTypes";

export function getServiceTypeList() {
    return API_CALL('get', 'getservicetypelist', null, types);
}