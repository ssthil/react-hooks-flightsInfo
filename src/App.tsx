import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableContainer,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import API from './api/config';
import FlightList from './components/FlightList';
import Header from './components/Header';
import Loader from './components/Loader';
import TableHeader from './components/TableHeader';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      margin: theme.spacing(5, 0, 0, 0),
      color: '#7a71a9',
    },
    loading: {
      padding: theme.spacing(10, 50),
    },
    formControl: {
      margin: theme.spacing(5, 0, 5, 0),
      minWidth: 250,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    list: {
      minWidth: 300,
      marginTop: 15,
      border: '1px solid #e5ecf1',
      boxShadow: '1px 3px 2px #efefef',
      padding: 15,
      borderRadius: 4,
    },
    tableContainer: {
      boxShadow:
        '0px 2px 15px -3px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    },
    table: {
      minWidth: 320,
    },
    theading: {
      display: 'inline-block',
      verticalAlign: 'text-bottom',
      fontWeight: 500,
      color: '#268bdc',
    },
  })
);

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cabinType, setCabinType] = useState('all');
  const [cheapFlights, setCheapFlights] = useState([]);
  const [bizFlights, setBizFlights] = useState([]);

  /* const news = useSelector(state => state);
  const dispatch = useDispatch() */

  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCabinType(event.target.value as string);
    console.log(cabinType);
  };

  const getFlights = (url: string) => axios.get(url);

  const getAllFlights = useCallback(() => {
    setIsLoading(true);
    axios
      .all([getFlights(API.cheap_flights), getFlights(API.business_flights)])
      .then(
        axios.spread(function(cheap: any, business: any) {
          const cheapFlightsData = cheap.data;
          const businessFlightsData = business.data;

          setCheapFlights(cheapFlightsData.data);
          setBizFlights(businessFlightsData.data);
          setIsLoading(false);
        })
      )
      .catch(errors => {
        console.log(errors);
      });
  }, []);

  useEffect(() => {
    getAllFlights();
  }, [getAllFlights]);

  /** data */
  const arrivalLocation = bizFlights.map((val: any) => val.arrival);
  const getRoute = cheapFlights.map((val: any) => val.route);

  const splitRetrunInfo = getRoute.map((arr: Array<any>) =>
    arr.toString().split('-')
  );
  const getReturnFLights = splitRetrunInfo.filter((val: any) =>
    arrivalLocation.includes(val[1])
  );

  /** filter by */
  const getValForFilter = getReturnFLights.map((val: any) => val[1]);
  const uniqueValue = (value: any, index: number, self: any) =>
    self.indexOf(value) === index;
  const filterValue = getValForFilter.filter(uniqueValue);

  return (
    <Container>
      <Header title="Return Flights Info" className={classes.heading} />
      <FormControl className={classes.formControl}>
        <InputLabel>Filter by</InputLabel>
        <Select value={cabinType} onChange={handleChange}>
          <MenuItem value="all">All</MenuItem>
          {filterValue.map((value: any, index: number) => (
            <MenuItem key={index} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {!isLoading ? (
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHeader />
            <TableBody>
              {!isLoading &&
                getReturnFLights
                  .filter(info =>
                    cabinType !== 'all' ? info[1].includes(cabinType) : true
                  )
                  .map((flight: any, index: number) => (
                    <FlightList
                      key={index}
                      departure={`${flight[0]}`}
                      arrival={`${flight[1]}`}
                    />
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Loader className={classes.loading} />
      )}
    </Container>
  );
};

export default App;
