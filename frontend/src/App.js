import React from 'react';
import { MetaProvider } from './hook/DataManger'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import QueryByText from './pages/QueryByText';

import PlayerControls from './components/player_controls/Player_Controls'


function App() {
  return (
    <div className="App">
    <>
    <MetaProvider>
        <Router>
          <Switch>
              <Route
                  exact
                  path={ `${ process.env.PUBLIC_URL + "/" }` }
                  component={ QueryByText }
              />
              {/* <Route exact component={ page404 }/> */}
          </Switch>
        </Router>
        <PlayerControls/>
    </MetaProvider>
    </>
  </div>
  );
}

export default App;
