import API_CALL from "..";
import * as types from "./actionTypes";

export function getBookingList() {
    return API_CALL('get', 'getbookinglist', null, types);
}