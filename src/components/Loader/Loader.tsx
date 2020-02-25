import React from 'react';
import { CircularProgress } from '@material-ui/core';

function Loader() {
  return (
    <div style={{ marginTop: 50, display: 'flex', justifyContent: 'center' }}>
      <CircularProgress color="primary" />
    </div>
  );
}

export default Loader;
