import { TableCell, TableRow } from '@material-ui/core';
import React from 'react';

interface IFlightListProps {
  departure: any;
  arrival: any;
}

function FlightList(props: IFlightListProps) {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {props.departure}
      </TableCell>
      <TableCell>{props.arrival}</TableCell>
    </TableRow>
  );
}

export default FlightList;