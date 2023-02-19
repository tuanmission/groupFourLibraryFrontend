import react,{Component} from "react";
import {Redirect} from "react-router-dom";
import {LoginProvider} from "../services/libraryDataService";
class login extends Component{

    state={
        userName:'',
        password:'',
        errors:'',
        isSuccess:false,
        isError:false,

    }

    enterUserName=(value)=>{
        this.setState({userName:value})
    }

    enterPassword=(value)=>{
        this.setState({password:value})
    }

    login= async()=>{
        const loginObject ={
            userName: this.state.userName,
            password: this.state.password
        }
        await LoginProvider(loginObject).then(()=>{
            this.setState({isSuccess:true, isError:false})
            }
        ).catch(
            (error)=>{
                const errors = error.response.data;
                const LoginError = error.message;
                this.setState({isSuccess:false, isError:true, errors:LoginError});
            }
        )


    }

    render() {
        return(
            <div className="container">
                <div className="align-content-center">
                    <h1 className="text-align-center">Login</h1>
                    <div className="form-group">
                        <label htmlFor="usr">Username:</label>
                        <input type="text" className="form-control" onChange={e=>this.enterUserName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="usr">Password:</label>
                        <input type="password" className="form-control" onChange={e=>this.enterPassword(e.target.value)}/>
                    </div>
                    <button class="btn btn-primary btn-lg" onClick={e=>this.login()}>Login</button>
                    {this.state.errors==true && <div>
                        <h5 className="text-danger">{this.state.errors}</h5>
                    </div>}
                </div>
                {this.state.isSuccess===true && <Redirect to='/'/>}
            </div>

        )
    }
}
export default login;