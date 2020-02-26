import React, { useEffect, useRef, useState } from 'react';
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
  TableRow,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
/**icons */
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
/** axios */
/** components */
import Header from './../Header';
import Loader from '../Loader/Loader';
import TableHeader from '../Table/TableHeader';
import useStyles from './styles';

import { useSelector, useDispatch } from 'react-redux';
import {
  getCheapFlightsData,
  getBusinessFlightsData,
} from '../../redux/actions/index';

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

const Home: React.FC = () => {
  const [cabinType, setCabinType] = useState('all');

  const cheapFlight = useSelector(
    (state: any) => state.cheapFlightsInfo.cheapFlights
  );
  const businessFlight = useSelector(
    (state: any) => state.businessFlightsInfo.businessFlights
  );

  const isCheapflightsLoading = useSelector(
    (state: any) => state.cheapFlightsInfo.loading
  );
  const isBusinessflightsLoading = useSelector(
    (state: any) => state.cheapFlightsInfo.loading
  );

  const dispatch = useDispatch();
  const _isMounted = useRef(true);

  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCabinType(event.target.value as string);
  };

  useEffect(() => {
    dispatch(getCheapFlightsData());
    dispatch(getBusinessFlightsData());
    return () => {
      _isMounted.current = false;
    };
  }, [dispatch]);


  const getFlightsInformation = (
    cheapFlightData: any,
    businessFlightData: any
  ) => {
    const getRoute = cheapFlightData.map((val: any) => val.route);
    const arrivalLocation = businessFlightData.map((val: any) => val.arrival);

    const splitRetrunInfo = getRoute.map((arr: Array<any>) =>
      arr.toString().split('-')
    );

    const getReturnFLights = splitRetrunInfo.filter((val: any) =>
      arrivalLocation.includes(val[1])
    );

    return getReturnFLights;
  };

  const dataListPerPage: number = 5;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(dataListPerPage);

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


  function renderFilterValue() {
    const uniqueValue = (value: any, index: number, self: any) =>
      self.indexOf(value) === index;
    return (
      <Select value={cabinType} onChange={handleChange}>
        <MenuItem value="all">All</MenuItem>
        {cheapFlight.data &&
          businessFlight.data &&
          getFlightsInformation(cheapFlight.data, businessFlight.data)
            .map((val: any) => val[1])
            .filter(uniqueValue)
            .map((value: any, index: number) => (
              <MenuItem key={index} value={value}>
                {value}
              </MenuItem>
            ))}
      </Select>
    );
  }

  function getLength() {
    if(cheapFlight.data && businessFlight.data) {
      const result = getFlightsInformation(cheapFlight.data, businessFlight.data);
      return result.length;
    }
    return null || 0;
  }

  function renderComponent() {
    return (
      <TableBody>
        {cheapFlight.data &&
          businessFlight.data &&
          (rowsPerPage > 0
            ? getFlightsInformation(
                cheapFlight.data,
                businessFlight.data
              ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : getFlightsInformation(cheapFlight.data, businessFlight.data)
          )
            .filter((info: any) =>
              cabinType !== 'all' ? info[1].includes(cabinType) : true
            )
            .map((flight: any, index: number) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {`${flight[0]}`}
                </TableCell>
                <TableCell>{`${flight[1]}`}</TableCell>
              </TableRow>
            ))}
      </TableBody>
    );
  }

  return (
    <Container>
      <Header title="Return Flights Info" className={classes.heading} />
      <FormControl className={classes.formControl}>
        <InputLabel>Filter by</InputLabel>
        {renderFilterValue()}
      </FormControl>
      {!(isCheapflightsLoading && isBusinessflightsLoading) ? (
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table}>
            <TableHeader />
            {renderComponent()}
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[
                    dataListPerPage,
                    { label: 'All', value: -1 },
                  ]}
                  count={getLength()}
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
