import './App.css';
import Login from './pages/Login';
import { BrowserRouter, Router, Switch, Route } from 'react-router-dom'
import ChatRoom from './pages/ChatRoom';
import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';
import AddRoomModal from './components/Modals/AddRoomModal';
import InviteMenberModal from './components/Modals/InviteMenberModal';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <AppProvider>
            <Switch>
              <Route exact component={ChatRoom} path={'/'} />
              <Route component={Login} path={'/login'} />
            </Switch>
            <AddRoomModal/>
            <InviteMenberModal/>
          </AppProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
