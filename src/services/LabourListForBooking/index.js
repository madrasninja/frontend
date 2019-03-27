import API_CALL from "..";
import * as types from "./actionTypes";

export function getLabourForBooking(bookingId) {
    return API_CALL('get', `getlabourforbooking/${bookingId}`, null, types);
}