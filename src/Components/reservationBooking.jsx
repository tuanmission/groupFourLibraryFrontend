import react, {Component} from "react";
import {getLoginToken, Reserve} from "../services/libraryDataService";
import {Link, Redirect} from "react-router-dom";

class reservationBooking extends Component{

    state={
        DateReserved:'',
        DueDate:'',
        BookCopyId:0,
        userName:'',
        reserveSuccess:false,
        reservationId : '',
        title:''
    }

    componentDidMount() {
        const BookCopyId = this.props.match.params.BookCopyId;
        const title=this.props.match.params.bookTitle;
        const token =getLoginToken();
        if(token!=null){
            const name = token['UserName'];
            this.setState({userName:name, BookCopyId: BookCopyId, title: title});
        }
        console.log(this.state.BookCopyId);
    }

    ReserveDateEnter=(value)=>{
        this.setState({DateReserved:value})
    }

    DueDateEnter=(value)=>{
        this.setState({DueDate:value})
    }

    ReserveBook=async ()=>{
        const reserVationObject ={
            userName: this.state.userName,
            bookcopyId: this.state.BookCopyId,
            reservationDate: this.state.DateReserved,
            expectedReturnDate: this.state.DueDate
        }
        const reservationId=await Reserve(reserVationObject)
        console.log(reservationId);
        if(reservationId.status===200){
            const reserveConfirmUrl = '/reservationConfirmed/' + reservationId.data;
            this.props.history.push(reserveConfirmUrl);
        }

    }


    render() {
        return(
            <div className="container">
                <div className="align-content-center">
                    <h1 className="text-center">Make a Reservation for:{this.state.title}</h1>
                    <div className="form-group">
                        <label htmlFor="usr">Date Reserved: YYYY-MM-DD</label>
                        <input type="text" className="form-control" onChange={(e)=>this.ReserveDateEnter(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="usr">Expected Return Date: YYYY-MM-DD</label>
                        <input type="text" className="form-control" onChange={(e)=>this.DueDateEnter(e.target.value)}/>
                    </div>
                    <button className="btn btn-primary btn-lg" onClick={e=>this.ReserveBook()}>Reserve</button>
                    {this.state.reserveSuccess && <Redirect to={"reservationConfirmed/"+ this.state.reservationId }/>  }
                </div>
            </div>
        )
    }
}
export default reservationBooking;