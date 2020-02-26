import { AnyAction } from 'redux';
import {
  FETCH_BUSINESS_FLIGHT_DETAILS_BEGIN,
  FETCH_BUSINESS_FLIGHT_DETAILS_SUCCESS,
  FETCH_BUSINESS_FLIGHT_DETAILS_FAILURE,
} from '../actions/flightInfoActions.types';

const initialState = {
  businessFlights: [],
  loading: true,
  error: null,
};
const businessFlightInfoReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case FETCH_BUSINESS_FLIGHT_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_BUSINESS_FLIGHT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        businessFlights: action.data,
      };
    case FETCH_BUSINESS_FLIGHT_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        businessFlights: [],
      };

    default:
      return state;
  }
};
export default businessFlightInfoReducer;
