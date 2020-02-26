import { AnyAction } from 'redux';
import {
  FETCH_CHEAP_FLIGHT_DETAILS_BEGIN,
  FETCH_CHEAP_FLIGHT_DETAILS_SUCCESS,
  FETCH_CHEAP_FLIGHT_DETAILS_FAILURE,
} from '../actions/flightInfoActions.types';

const initialState = {
cheapFlights: [],
  loading: true,
  error: null,
};
const cheapFlightInfoReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case FETCH_CHEAP_FLIGHT_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CHEAP_FLIGHT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        cheapFlights: action.data,
      };
    case FETCH_CHEAP_FLIGHT_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        cheapFlights: [],
      };

    default:
      return state;
  }
};
export default cheapFlightInfoReducer;
