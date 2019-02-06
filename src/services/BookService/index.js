import API_CALL from "./../";
import * as types from "./actionTypes";

export function bookService(values) {
    return API_CALL('post', 'on_submit_booking', values, types);
}