import React, { Component } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SignIn from './SignIn/SignIn'
import SignUp from './SignUp/SignUp'
import LandingPage from './Dashboard/LandingPage';
import Bookings from './Dashboard/Bookings';
import SearchSlots from './Dashboard/SearchSlots';
import AddSpace from './Dashboard/Admin/AddSpace';
import ConfirmBooking from './Dashboard/ConfirmBooking';
import DeleteSlot from './Dashboard/Admin/DeleteSlot';
import AdminLandingPage from './Dashboard/Admin/AdminLandingPage';
import viewWorker from './Dashboard/Admin/Worker';
import ConfirmAddWorker from './Dashboard/Admin/ConfirmAddWorker';
import WorkerlessSpaces from './Dashboard/Admin/WorkerlessSpaces';
import Rating from './Rating';
import UsersList from './Dashboard/Admin/UsersList';
import WorkerDashboard from './Dashboard/WorkerDashboard';
import RoutingComponent from './Dashboard/RoutingComponent';
import removeSpace from './Dashboard/Admin/RemoveSpace';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Router>
          {/* <> */}
            <Switch>
              <Route path="/" exact component={RoutingComponent} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/dashboard" component={LandingPage} />
              <Route path="/bookings" component={Bookings} />
              <Route path="/search-slots" component={SearchSlots} />
              <Route path="/add-space" component={AddSpace} />
              <Route path="/remove-space" component={removeSpace} />
              <Route path="/confirm-booking" component={ConfirmBooking} />
              <Route path="/delete-slot" component={DeleteSlot} />
              <Route path="/admin-dashboard" component={AdminLandingPage} />
              <Route path="/view-workers" component={viewWorker} />
              <Route path="/confirm-add-worker" component={ConfirmAddWorker} />
              <Route path="/add-worker" component={WorkerlessSpaces} />
              <Route path="/rating" component={Rating} />
              <Route path="/user-list" component={UsersList} />
              <Route path="/worker-dashboard" component={WorkerDashboard} />
              <h1>No Such URL</h1>
            </Switch>
          {/* </> */}
        </Router>
      </div>
    );
  }

  submitButtonCLicked() {
    console.log(document.getElementById('uname').value);
    console.log(document.getElementById('password').value);
  }
}

export default App;
