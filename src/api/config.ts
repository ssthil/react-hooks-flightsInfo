export interface IApi {
  cheap_flights: string;
  business_flights: string;
}

const API: IApi = {
  cheap_flights: 'https://tokigames-challenge.herokuapp.com/api/flights/cheap',
  business_flights:
    'https://tokigames-challenge.herokuapp.com/api/flights/business',
};
export default API;
