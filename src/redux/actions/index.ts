/* import axios from 'axios';
import API from '../../api/config';

export const fetchFlightDetails = (result: Array<any>) => ({
    type: FETCH_FLIGHT_DETAILS,
    result
})

export const receivedFlightDetails = (json: any) => ({
    type: RECEIVE_FLIGHT_DETAILS,
    json: json.data
})

const getFlights = (url: string) => axios.get(url);

export const fetchAllData = () => {
    return (dispatch: any) => {
      return getFlights(API.cheap_flights)
        .then(response => {
          dispatch(fetchFlightDetails(response.data))
        })
        .catch(error => {
          throw(error);
        });
    };
  }; */

  export * from './flightInfoActions'
  export * from './flightInfoActions.types'