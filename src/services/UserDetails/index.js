import API_CALL from "..";
import * as types from "./actionTypes";

export function getMe() {
    return API_CALL('get', 'getme', null, types);
}