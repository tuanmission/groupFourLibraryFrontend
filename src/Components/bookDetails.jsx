import react, {Component} from "react";
import {getBookDetails, getLoginToken} from "../services/libraryDataService";
import {Link} from "react-router-dom";

class bookDetails extends Component{
    state={
        bookCopyList:[],
        title:'',
        userisLoggedIn:false
    }

    async componentDidMount() {
        const token =getLoginToken();
        let userLoggedin = false;
        if(token!=null){
            userLoggedin=true;
        }
        const {bookKeyId} = this.props.match.params;
        console.log(bookKeyId);
        const bookCopyListRetrieve = await getBookDetails(bookKeyId);
        const bookCopyList = bookCopyListRetrieve.data;
        const title=bookCopyList[0].bookTitle;
        this.setState({bookCopyList:bookCopyList,title:title, userisLoggedIn:userLoggedin});
    }

    render(){
        return(
            <div className="container">
                <h1 className="text-center">Book Details for {this.state.title}</h1>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">Book Store</th>
                        <th scope="col">Total Copies at Store</th>
                        <th scope="col">Copies Available for Reservation</th>
                        {this.state.userisLoggedIn && <th scope="col">Actions</th>}
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.bookCopyList.map((bookCopy)=>(
                        <tr key={bookCopy.bookCopyId}>
                            <td>{bookCopy.bookStoreName}</td>
                            <td>{bookCopy.totalCopies}</td>
                            <td>{bookCopy.copiesAvailable}</td>
                            {this.state.userisLoggedIn && <td>
                                <Link to={"/reservationbooking/"+this.state.title +"/" + bookCopy.bookCopyId} className="btn btn-primary">Reserve</Link>
                            </td>}
                        </tr>
                    ))};
                    </tbody>
                </table>
            </div>
        );
    }

}
export default bookDetails;