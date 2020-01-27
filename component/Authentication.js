import React from 'react';
import {logIn,signUp,logOut} from './Firebase';





class Authentication extends React.Component{
    constructor(props) {
        super(props);
        if (props.callFor==="LogIn") {
            this.state={
                callFor:this.props.callFor,
                email:"",
                password:""
            }
            this.updateEmail=this.updateEmail.bind(this);
            this.updatePassword=this.updatePassword.bind(this);
            this._logIn=this._logIn.bind(this);
            this._logOut=this._logOut.bind(this);
        }
        if (props.callFor==="SignUp") {
            this.state={
                callFor:this.props.callFor,
                signUpEmail:"",
                signUpPassword:"",
                signUpConfirmPassword:"",
                
                signUpName:"",
                signUpPhoneNo:""
            };
            this.updateSignUpEmail=this.updateSignUpEmail.bind(this);
            this.updateSignUpPassword=this.updateSignUpPassword.bind(this);
            this.updateSignUpConfirmPassword=this.updateSignUpConfirmPassword.bind(this);
            this.updateSignUpName=this.updateSignUpName.bind(this);
            this.updateSignUpPhoneNo=this.updateSignUpPhoneNo.bind(this);
            this._signUp=this._signUp.bind(this);
            
        }
    }

    setCookie(cvalue) {
        var d = new Date();
        d.setTime(d.getTime() + (3*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = "username=" + cvalue + ";" + expires + ";path=/";
    }

    
    updateEmail(param){
        this.setState({
            email:param.target.value
        })
    }
    updatePassword(param){
        this.setState({
            password:param.target.value
        })
    }
    _logIn(param){
        param.preventDefault();
        var LoggedInUser=logIn(this.state.email,this.state.password);
        if (LoggedInUser) {
            this.setState({
                user:LoggedInUser.email
            });
        };
    }

    _logOut(param){
        param.preventDefault();
        var LoggedInUser=logOut();
        if (LoggedInUser) {
            this.setState({
                user:LoggedInUser.email
            });
        }else{
            this.setState({
                user: null
            });
        }
    }



    updateSignUpEmail(param){
        this.setState({
            signUpEmail:param.target.value
        })
    }
    updateSignUpPassword(param){
        this.setState({
            signUpPassword:param.target.value
        })
    }
    updateSignUpConfirmPassword(param){
        this.setState({
            signUpConfirmPassword:param.target.value
        })
    }
    updateSignUpName(param){
        this.setState({
            signUpName:param.target.value
        })
    }
    updateSignUpPhoneNo(param){
        this.setState({
            signUpPhoneNo :param.target.value
        })
    }
    
    _signUp(param){
        param.preventDefault();
        signUp(this.state.signUpEmail,this.state.signUpPassword,this.state.signUpName,this.state.signUpPhoneNo);
    }

    componentDidUpdate(){
        this.setCookie(this.state.user)
    }


    render(){
        if (this.state.callFor==="LogIn")
        {
            if (!this.state.user) {
                return(
                    <div id= "logIn">
                    <h1>Log In</h1>
                    <form id = "logInForm">
                        <input type="text" placeholder="Email" value={this.state.email} onChange={this.updateEmail}/><br />
                        <input type="password" placeholder="Password"value={this.state.password} onChange={this.updatePassword}/> <br /> 
                        <button onClick={this._logIn}>Log In</button>
                    </form>
                    </div>
                );
            }else{
                return(
                    <div id= "logIn">
                        <h1>Log In</h1>
                        <h1>Welcome {this.state.user}</h1>
                        <button onClick={this._logOut}>Log Out</button>
                    </div>
                )
            }
        }
        if (this.state.callFor==="SignUp") {
            
            return(
                <div id="signUp">
                    <h1>Sign Up</h1>
                    <form id = "signUpForm">
                        <input type="text" placeholder="Email" value={this.state.signUpEmail} onChange={this.updateSignUpEmail}/><br />
                        <input type="password" placeholder="Password" value={this.state.signUpPassword} onChange={this.updateSignUpPassword}/> <br />
                        <input type="password" placeholder="COnfirm Password" value={this.state.signUpConfirmPassword} onChange={this.updateSignUpConfirmPassword}/> <br />
                        <input type="text" placeholder="Name" value={this.state.signUpName} onChange={this.updateSignUpName}/> <br />
                        <input type="text" placeholder="Phone Number" value={this.state.signUpPhoneNo} onChange={this.updateSignUpPhoneNo}/><br />
                        <button onClick={this._signUp}>Sign Up</button>
                    </form>
                </div>
            );
        }
    }
}

export default Authentication;