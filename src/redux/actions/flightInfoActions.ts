import { AnyAction } from 'redux';
import axios from 'axios';
import API from '../../api/config';

import {
  FETCH_CHEAP_FLIGHT_DETAILS_BEGIN,
  FETCH_CHEAP_FLIGHT_DETAILS_SUCCESS,
  FETCH_CHEAP_FLIGHT_DETAILS_FAILURE,
  FETCH_BUSINESS_FLIGHT_DETAILS_BEGIN,
  FETCH_BUSINESS_FLIGHT_DETAILS_SUCCESS,
  FETCH_BUSINESS_FLIGHT_DETAILS_FAILURE,
} from './flightInfoActions.types';

const getFlights = (url: string) => axios.get(url);

export const fetchCheapFlightsDetailsBegin = () => ({
  type: FETCH_CHEAP_FLIGHT_DETAILS_BEGIN,
});

export const fetchCheapFlightsDetailsSuccess = (data: any): AnyAction => ({
  type: FETCH_CHEAP_FLIGHT_DETAILS_SUCCESS,
  data,
});

export const fetchCheapFlightsDetailsFailure = (error: Error) => ({
  type: FETCH_CHEAP_FLIGHT_DETAILS_FAILURE,
  error,
});

export const fetchBusinessFlightsDetailsBegin = () => ({
  type: FETCH_BUSINESS_FLIGHT_DETAILS_BEGIN,
});

export const fetchBusinessFlightsDetailsSuccess = (data: any): AnyAction => ({
  type: FETCH_BUSINESS_FLIGHT_DETAILS_SUCCESS,
  data,
});

export const fetchBusinessFlightsDetailsFailure = (error: Error) => ({
  type: FETCH_BUSINESS_FLIGHT_DETAILS_FAILURE,
  error,
});

export const getCheapFlightsData = () => {
  return (dispatch: any) => {
    dispatch(fetchCheapFlightsDetailsBegin());
    return getFlights(API.cheap_flights)
      .then(response => {
        dispatch(fetchCheapFlightsDetailsSuccess(response.data));
      })
      .catch(error => dispatch(fetchCheapFlightsDetailsFailure(error)));
  };
};

export const getBusinessFlightsData = () => {
  return (dispatch: any) => {
    dispatch(fetchBusinessFlightsDetailsBegin());
    return getFlights(API.business_flights)
      .then(response => {
        dispatch(fetchBusinessFlightsDetailsSuccess(response.data));
      })
      .catch(error => dispatch(fetchBusinessFlightsDetailsFailure(error)));
  };
};
