import React from 'react';
import { List, ListItem, CircularProgress } from '@material-ui/core';

export interface ILoader {
  className: string;
}

function Loader(props: ILoader) {
  return (
    <List className={props.className}>
      <ListItem>
        <CircularProgress color="primary" />
      </ListItem>
    </List>
  );
}

export default Loader;
