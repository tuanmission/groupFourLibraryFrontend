import react, {Component} from "react";
import {logout} from "../services/libraryDataService";
class LogOut extends Component{

    componentDidMount() {
        logout();
    }

    render() {
        return(
            <div className="container">
                <h1 className="text-center">Logged out</h1>
                <h2 className="text-center">You have been logged out</h2>
            </div>
        )
    }
}
export default LogOut;