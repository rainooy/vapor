import { Route, Switch, Redirect } from 'react-router-dom';

import StatsHistory from './StatsHistory';
import StatsPool from './StatsPool';

export default function Stats() {
  return (
    <Switch>
      <Route path="/stats/history" render={(props) => <StatsHistory {...props} />} />
      <Route path="/stats/pool" render={(props) => <StatsPool {...props} />} />
      <Redirect to="/stats/history" />
    </Switch>
  );
};