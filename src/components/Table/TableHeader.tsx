import {
  Avatar,
  ListItemAvatar,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import React from 'react';

interface ITableHeaderProps {
    
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    theading: {
      display: 'inline-block',
      verticalAlign: 'text-bottom',
      fontWeight: 500,
      color: '#268bdc',
    },
    avatar: {
      display: 'inline-block',
      minWidth: 40,
    },
    avatarSize: {
      width: 30,
      height: 30,
      backgroundColor: '#95caf5',
    },
  })
);

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

function TableHeader(props: any) {
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
