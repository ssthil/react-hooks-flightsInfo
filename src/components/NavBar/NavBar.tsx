import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const NavBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
    <AppBar position="static" className={classes.appbar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Flights Info
        </Typography>
        <Button component={Link} to="/" className={classes.menu}>Home</Button>
        <Button component={Link} to="/form" className={classes.menu}>Form</Button>
      </Toolbar>
    </AppBar>
    </div>
  );
};

export default NavBar;
