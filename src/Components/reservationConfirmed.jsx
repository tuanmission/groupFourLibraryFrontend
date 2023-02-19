import react, {Component} from "react";
import {Link} from "react-router-dom";
class ReservationConfirmed extends Component{
    state={
        reservationId:'',
        bookTitle:'',
        userName:''
    }
    componentDidMount() {
        const reservationId = this.props.match.params.reservationId;
        this.setState({reservationId:reservationId});
    }

    render() {
        return(
            <div className="container">
                <h1 className="text-center">Reservation Confirmed</h1>
                <div className="card">
                    <h5 className="card-title">Reservation Number</h5>
                    <div className="card-body">
                        {this.state.reservationId}
                    </div>
                    <div className="card-footer">
                        <Link to="/myreservations">My Reservations</Link>
                    </div>
                </div>
            </div>
        )
    }
} export default ReservationConfirmed;