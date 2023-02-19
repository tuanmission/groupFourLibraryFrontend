import react, {Component} from "react";
import {getBookList} from "../services/libraryDataService";
import {Link} from "react-router-dom";
class Booklist extends Component{
    state={
        bookList:[],
        query:""
    };

    async componentDidMount() {
       const bookData  =await getBookList();
       console.log(bookData);
       const data = bookData.data;
       this.setState({bookList:data});

    }

    filterBooklist=(event)=>{
        const query = event.target.value;
        this.setState({query:query})

    }

    render() {
        return(
            <div className="container">
                <h1 className="text-center">List of Books for Reservation</h1>
                <div className="form-group">
                    <label htmlFor="usr">Search by Title:</label>
                    <input type="text" className="form-control" onChange={e=>this.filterBooklist(e)}/>
                </div>

                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">BookId</th>
                        <th scope="col">BookTitle</th>
                        <th scope="col">Author</th>
                        <th scope="col">Publisher</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.bookList.filter((book)=>book.bookTitle.includes(this.state.query)).map((book)=>(
                        <tr key={book.bookId}>
                            <td>{book.bookId}</td>
                            <td>{book.bookTitle}</td>
                            <td>{book.author}</td>
                            <td>{book.publisher}</td>
                            <td>
                              <Link to={"/bookDetails/"+book.bookKeyId} className="btn btn-primary">View Book Details</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        );
    }

}
export default Booklist;
