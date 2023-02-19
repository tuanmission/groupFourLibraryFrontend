import react, {Component} from "react";
import {Link, Redirect} from "react-router-dom"
import {getLoginToken, myReservations} from "../services/libraryDataService";
import {UnReserve} from "../services/libraryDataService";


class myreservations extends Component{

    state={
        reservationList:[],
        unReservationId:'',
        unReservationStatus:false,
        userName:''
    }

   async componentDidMount() {
       const BookCopyId = this.props.match.params.BookCopyId;
       const token =getLoginToken();
       if(token!=null) {
           const name = token['UserName'];
           const reserVationListResponse =await myReservations(name);
           const reservationList = reserVationListResponse.data;
           this.setState({reservationList:reservationList,userName:name});
       }

    }

    async unReserve(reservationId){
        const unReserveResponse = await UnReserve(reservationId);
        if(unReserveResponse.status===200){
            this.setState({unReservationStatus:true,
            unReservationId: reservationId
            });
        }
    }
    

    render() {
        return(
            <div className="container">
                <h1 className="text-center">My Reservations</h1>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">BookTitle</th>
                        <th scope="col">Author</th>
                        <th scope="col">Publisher</th>
                        <th scope="col">Reservation Number</th>
                        <th scope="col">Date Reserved</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Date Returned</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.reservationList.map((Reservation)=>(
                        <tr key={Reservation.reservationNumber}>
                            <td>{Reservation.bookTitle}</td>
                            <td>{Reservation.author}</td>
                            <td>{Reservation.publisher}</td>
                            <td>{Reservation.reservationNumber}</td>
                            <td>{Reservation.dateReserved}</td>
                            <td>{Reservation.dueDate}</td>
                            <td>{Reservation.dateReturned}</td>
                            <td>{Reservation.dateReturned==='NOT RETURNED' && <button className="btn btn-primary" onClick={(e) =>this.unReserve(Reservation.reservationNumber)}>Return Book</button>}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {this.state.unReservationStatus && <Redirect to={'/unreserved/'+this.state.unReservationId}/>}
            </div>
        )
    }
}

export default myreservations;