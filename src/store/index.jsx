import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import ServiceTypeList from '../services/ServiceTypeList/reducer';
import LocalityList from '../services/LocalityList/reducer';
import BookService from '../services/BookService/reducer';
import BookingList from '../services/BookingList/reducer';
import SaveLabour from '../services/SaveLabour/reducer';
import LabourList from '../services/LabourList/reducer';
import labourListForBooking from '../services/LabourListForBooking/reducer';
import UserDetails from '../services/UserDetails/reducer';
import UserList from '../services/UserList/reducer';

/**
 * combineReducers is simply a utility function to simplify the most common use case when writing Redux reducers.
 * It takes an object full of slice reducer functions, and returns a new reducer function
 */
const rootReducer = combineReducers({
	form: formReducer,
	ServiceTypeList,
	LocalityList,
	BookService,
	BookingList,
	SaveLabour,
	labourListForBooking,
	LabourList,
	UserDetails,
	UserList
});

/**
 * Creates a Redux store that holds the complete state tree of your app.
 * There should only be a single store in your app.
 */
const store = createStore(
	rootReducer,
	/**
     * compose: Composes functions from right to left.
     *          The final function obtained by composing the given functions from right to left.
     * applyMiddleware: Middleware is the suggested way to extend Redux with custom functionality.
     *                  Middleware lets you wrap the store's dispatch method for fun and profit.
     *
     * Thunk: A thunk is a function that returns a function.
     * Invert control! Return a function that accepts `dispatch` so we can dispatch later.
     * Thunk middleware knows how to turn thunk async actions into actions.
     */
	compose(applyMiddleware(thunk))
);

export default store;
