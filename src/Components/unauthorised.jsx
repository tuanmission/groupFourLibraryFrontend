import react, {Component} from "react";

class UnAuthorised extends Component{
    render() {
        return(
            <div className="container">
                <h1 className="text-center">UnAuthorised</h1>
                <h2 className="text-center">You are not allowed to access this page</h2>
            </div>
        )
    }
}
export default UnAuthorised;

