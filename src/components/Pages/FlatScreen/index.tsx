import { Grid } from '@mui/material';
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Filler from './Filler';
import FlatsContainer from './FlatsContainer';

const Map = React.lazy(() => import('./Map'));

const FlatScreen: React.FC = () => {
  return (
    <Grid container pl={2} pt={2} height="100%">
      <Grid item xs={6} pr={2}>
        <FlatsContainer />
      </Grid>
      <Grid item xs={6}>
        <Switch>
          <Route
            exact
            path="/flats/:placeId"
            component={() => (
              <Suspense fallback={<Filler text="Loading flat" />}>
                <Map />
              </Suspense>
            )}
          />
          <Route path="*" component={() => <Filler text="Select flat" />} />
        </Switch>
      </Grid>
    </Grid>
  );
};

export default FlatScreen;
