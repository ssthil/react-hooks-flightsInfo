import React from 'react';
import {
  Avatar,
  ListItemAvatar,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';

import useStyles from './styles'
interface ITableHeaderProps {
  render: () => void
}

const IconWithTypegraphy = (props: any) => {
  const classes = useStyles();
  return (
    <TableCell>
      <ListItemAvatar className={classes.avatar}>
        <Avatar className={classes.avatarSize}>
          {props.render()}
        </Avatar>
      </ListItemAvatar>
      <Typography variant="body1" className={classes.theading} color="primary">
        {props.heading}
      </Typography>
    </TableCell>
  );
};

function TableHeader() {
  return (
    <TableHead>
      <TableRow>
        <IconWithTypegraphy heading="Departure" render={() => <FlightTakeoffIcon color="inherit" />} />
        <IconWithTypegraphy heading="Arrival" render={() => <FlightLandIcon color="inherit" />} />
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
