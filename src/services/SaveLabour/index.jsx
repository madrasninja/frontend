import API_CALL from "..";
import * as types from "./actionTypes";

export function savelabour(values) {
    return API_CALL('post', 'savelabour', values, types);
}