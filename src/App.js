import { Route, Switch } from 'react-router';
import { Index } from './pages/Index';
import { CreateGame } from './pages/CreateGame';
import { JoinGame } from './pages/JoinGame';
import { Game } from './pages/Game';

function App() {

  return (
      <Switch>
        <Route exact path='/' component={Index}/>
        <Route exact path='/create' component={CreateGame}/>
        <Route exact path='/join' component={JoinGame}/>
        <Route path='/room' component={Game}/>
      </Switch>
  );
}

export default App;