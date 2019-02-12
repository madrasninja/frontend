import API_CALL from "..";
import * as types from "./actionTypes";

export function getBookingList(values) {
    return API_CALL('get', 'getbookinglist', values, types);
}