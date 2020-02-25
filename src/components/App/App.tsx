import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';

import Home from '../Home/Home';
import Form from '../Form/Form';
import NavBar from '../NavBar/NavBar';
import useStyles from './styles';

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavBar />
      <Container maxWidth="md">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/form" component={Form} />
        </Switch>
      </Container>
    </div>
  );
};

export default App;
