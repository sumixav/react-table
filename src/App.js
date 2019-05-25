import React from 'react';
import { Switch, Route } from 'react-router-dom'
import TableView from './Pages/TableView'
import Detail from './Pages/Detail'
import Error from './Pages/Error'
import './App.css';

function App() {
  return (
    
    <Switch>
      <Route path="/" component={TableView} exact />
      <Route path="/users/:id" component={Detail} />
      <Route component={Error} />
    </Switch>

  );
}

export default App;
