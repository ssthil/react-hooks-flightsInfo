import React from 'react';
import { Typography } from '@material-ui/core';

interface IHeaderProps {
  className: string;
  title: string;
}

const Header = (props: IHeaderProps) => (
  <Typography variant="h3" component="h3" className={props.className}>
    {props.title}
  </Typography>
);

export default Header;
