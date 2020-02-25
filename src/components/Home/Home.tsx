import React, { useCallback, useEffect, useRef, useState } from 'react';
/** material-ui */
import {
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
/**icons */
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
/** axios */
import axios from 'axios';
/** components */
import API from '../../api/config';
import FlightList from './../FlightList';
import Header from './../Header';
import Loader from '../Loader/Loader';
import TableHeader from '../Table/TableHeader';
import useStyles from './styles';

export interface ITablePagination {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationAction(props: ITablePagination) {
  const classes = useStyles();
  const theme = useTheme();

  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.pagination}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

export interface ITableProps {
  data: any;
}

const Home = (props: ITableProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cabinType, setCabinType] = useState('all');
  const [cheapFlights, setCheapFlights] = useState([]);
  const [bizFlights, setBizFlights] = useState([]);

  const _isMounted = useRef(true);

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
          if (_isMounted.current) {
            const cheapFlightsData = cheap.data;
            const businessFlightsData = business.data;

            setCheapFlights(cheapFlightsData.data);
            setBizFlights(businessFlightsData.data);
            setIsLoading(false);
          }
        })
      )
      .catch(errors => {
        console.log(errors);
      });
  }, []);

  useEffect(() => {
    getAllFlights();
    return () => {
      _isMounted.current = false;
    };
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

  /** table */
  const dataListPerPage: number = 5;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(dataListPerPage);
  // const [isDialogOpen, setIsDialogOpen] = useState(false);

  const emptyRows =
    rowsPerPage -
    Math.min(
      rowsPerPage,
      getReturnFLights && getReturnFLights.length - page * rowsPerPage
    );

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
          <Table className={classes.table}>
            <TableHeader />
            <TableBody>
              {!isLoading &&
                (rowsPerPage > 0
                  ? getReturnFLights.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : getReturnFLights
                )
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
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[
                    dataListPerPage,
                    { label: 'All', value: -1 },
                  ]}
                  count={getReturnFLights.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationAction}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default Home;
