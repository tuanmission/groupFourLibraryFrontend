import react,{Component} from "react";
class unReservationComponent extends  Component{

    state={
        reservationId:''
    }

    componentDidMount() {
        const reservationId = this.props.match.params.reservationId;
        this.setState({reservationId: reservationId});
    }

    render() {
        return(
            <div className="container">
                <h1 className="text-center">Book Returned for reservation: {this.state.reservationId}</h1>
            </div>
        );
    }
} export default unReservationComponent;