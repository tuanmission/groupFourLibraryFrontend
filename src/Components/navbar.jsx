import React, {Component} from "react";
import NavLink from 'react-router-dom/NavLink';
import {getLoginToken} from "../services/libraryDataService";
class Navbar extends Component{

    state={
        userName:'',
        loggedIn:false
    }

    componentDidMount() {
        const token =getLoginToken();
        console.log(token)
        if(token!=null){
            const name = token['UserName'];
            console.log(name);
            const time = token['exp'];
            // const roleName = token[role]; //Getting the Current Role.

            this.setState({userName:name, loggedIn:true});
        }

    }

    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Library</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <div className='navbar-nav mr-auto'>
                        <NavLink className='nav-item nav-link' to="/">Book List</NavLink>
                        {this.state.loggedIn==false &&<NavLink className='nav-item nav-link' to="/login">Login</NavLink>}
                        {this.state.loggedIn && <NavLink className='nav-item nav-link' to={"/myreservations/" +this.state.userName}>My Reservations</NavLink> }
                        {this.state.loggedIn && <span className="navbar-text">Welcome {this.state.userName}</span>}
                        {this.state.loggedIn && <NavLink className='nav-item nav-link' to="/logout">Logout </NavLink> }
                    </div>
                </div>
            </nav>

        )
    }
}

export default Navbar;