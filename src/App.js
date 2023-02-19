import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./Components/navbar";
import Booklist from "./Components/booklist";
import bookDetails from "./Components/bookDetails";
import login from "./Components/login";
import myreservations from "./Components/myreservations";
import reservationBooking from "./Components/reservationBooking";
import reservationConfirmed from "./Components/reservationConfirmed";
import unauthorised from "./Components/unauthorised";
import unReservationComponent from "./Components/unReservationComponent";
import Logout from "./Components/logout";
import {ToastContainer} from "react-toastify";
function App() {
  return (
      <BrowserRouter>
        <main>
          <Navbar/>
            <ToastContainer></ToastContainer>
          <Switch>
            <Route exact  path="/" component={Booklist}/>
            <Route path="/bookDetails/:bookKeyId" component={bookDetails}/>
            <Route path="/login" component={login}/>
            <Route path="/myreservations" component={myreservations}/>
            <Route path="/unauthorised" component={unauthorised}/>
            <Route path="/reservationbooking/:bookTitle/:BookCopyId" component={reservationBooking}/>
            <Route path="/reservationConfirmed/:reservationId" component={reservationConfirmed}/>
            <Route path="/unreserved/:reservationId" component={unReservationComponent}/>
            <Route path="/logout" component={Logout}/>
          </Switch>
        </main>
      </BrowserRouter>
  );
}

export default App;
