import React, { Component } from 'react';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import {Grid,Paper,Card,CardContent,Typography,Button} from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import CommonApi from '../ApiServices/CommonApi';

const style = {
    // root: {
    //   backgroundColor:'#5c6bc0',
    //   marginTop: 30,
    //   height: 600,
    //   color: '#e0f7fa'
    // },
    Scard: {
        marginTop: 30,
        height: 500
    },
    STextFi: {
        width: 550
    }
}


class SignUp extends Component {
    constructor(props){
        super(props);

        this.state = {
            username:"",
            email:"",
            password:"",
            message:"",
            successfulUserName: false,
            successfulEmail: false,
            successfulPassword: false,  
            
            severity:'',
            AlertTitle:'',
        }
    }


    componentDidMount() {
        // custom rule will have name 'isName'
        ValidatorForm.addValidationRule('isName', (value) => {
            if ((this.state.username.length) >3 && (this.state.username.length) <20){
                return true; 
            }
            return false;            
        });

        // custom rule will have name 'isPassword'
        ValidatorForm.addValidationRule('isPassword',(value) => {
            if ((this.state.password.length) > 6 && (this.state.password.length) < 40) {
                return true;
            }
            return false;
        });
    }

    componentWillUnmount() {
        // remove rule when it is not needed
        ValidatorForm.removeValidationRule('isName');
        ValidatorForm.removeValidationRule('isPassword');
    }


    onChangeUsername = (e) => {
        this.setState({
          username: e.target.value
        });
    }

    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    handleRegister = (e) => {
        e.preventDefault();

         
        if ( (this.state.username.length) >3 && (this.state.username.length) <20 ) {
            this.setState({
                successfulUserName: true,                  
            })
        } else {
            this.setState({
                successfulUserName: false,                       
            })
        }
    
                
        var emailformat = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
        if(this.state.email.match(emailformat)) {
            this.setState({
                successfulEmail: true,            
            })                
        } else {
            this.setState({
                successfulEmail: false,                    
            })  
        }
    
        
        if ( (this.state.password.length) > 6 && (this.state.password.length) < 40 ) {
            this.setState({
                successfulPassword: true,                  
            })
        } else {
            this.setState({
                successfulPassword: false,
            })
        }
             
        // if(this.state.successfulUserName && this.state.successfulEmail && this.state.successfulPassword) {
        //     console.log(this.state.username + " " + this.state.password + " " + this.state.email)
        //     this.setState({
        //       successful: true,
        //       message: "Registered successfully"
        //     })
        // } else {
        //     this.setState({
        //       successful: false,
        //     })
        // }


        ///////////////  api   /////////////
        let user = {
            userName : this.state.username,
            email : this.state.email,
            password : this.state.password
        }

        CommonApi.register(user)
        .then((response) => {
                console.log(response);
              this.setState({
                message: response.data.message,
                severity:'success',
                AlertTitle:'success',
              });

              setTimeout(() => {
                this.props.history.push('/signin');
                this.setState({
                    message:'',
                    successful: true
                })
                window.location.reload();
            },1000);
        })

        .catch((error) => {
            const resMessage =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
            console.log(resMessage);
    
            this.setState({
            successful: false,
            message: resMessage,
            severity:'error',
            AlertTitle:'error',
            });

            setTimeout(() => {
                this.setState({message:''})
            },2000)
        })
    }


    render() {
        
        return(
            <div>

                {this.state.message&&(
                    <div>
                        <Alert variant="filled" severity={this.state.severity} style={{position:"fixed",right:"100px",width:"550px",zIndex:"3",color:"white"}}>
                            <AlertTitle>{this.state.AlertTitle}</AlertTitle>
                            {this.state.message}
                        </Alert>

                    </div>
                )}


                {!this.state.successful && (

                    <Grid container>
                        <Grid item xs={3}/>
                        <Grid item xs={6}>
                            {/* <Paper style={style.root} variant="outlined"> */}
                                <Grid container>
                                    <Grid item xs={2}/>
                                    <Grid item xs={8}>
                                        <Card style={style.Scard}>
                                            <CardContent>
                                                <ValidatorForm
                                                    ref="form"
                                                    onSubmit={this.handleRegister}
                                                    onError={errors => console.log(errors)}
                                                >  

                                                    <Typography variant='h3' color='primary'>
                                                        Register Account 
                                                    </Typography> <br/>

                                                    <TextValidator
                                                        helperText="plese enter username"
                                                        variant="outlined"
                                                        label="Username"
                                                        onChange={this.onChangeUsername}
                                                        name="Username"
                                                        value={this.state.username}
                                                        style={style.STextFi}
                                                        validators={['required','isName']}
                                                        errorMessages={['This field is required','The user username must be between 3 and 20 charactes ']}
                                                    />

                                                    <br/><br/>

                                                    <TextValidator
                                                        helperText="Plese enter email"
                                                        variant="outlined"
                                                        label="Email"
                                                        onChange={this.onChangeEmail}
                                                        name="Email"
                                                        value={this.state.email}
                                                        style={style.STextFi}
                                                        validators={['required','isEmail']}
                                                        errorMessages={['This field is required','This is not a valid email!!']}
                                                    />
                                                    
                                                    <br/><br/>

                                                    <TextValidator
                                                        helperText="Plese enter Password"
                                                        variant="outlined"
                                                        label="Password"
                                                        onChange={this.onChangePassword}
                                                        name="Password"
                                                        value={this.state.password}
                                                        style={style.STextFi}
                                                        validators={['required','isPassword']}
                                                        errorMessages={['This field is required','The user password must be between 6 and 40 charactes ']}
                                                    />
                                                
                                                    <br/><br/>
                                                    
                                                    <Button variant="contained" color="primary" type="submit">
                                                        SIGN UP
                                                    </Button>

                                                    <h4> Allread re - <a href='/signin'>HERE</a></h4>  
                                                    {/* <p style={{color:"red"}}>{this.state.message}</p>                                            */}
                                                                                                    
                                                </ValidatorForm>                                        
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={2}/>
                                </Grid>
                            {/* </Paper> */}
                        </Grid>
                        <Grid item xs={3}/>
                    </Grid>

                    ) 

                    // <Grid container>
                    //     <Grid item xs={4}/>
                    //     <Grid item xs={4}>
                    //         <Paper style={{'marginTop':'20'}}>
                    //             <Card style={{'marginTop':'5','height':'10','backgroundColor':'#42424'}}>
                    //                 <CardContent>
                    //                     <Typography color='primary'>
                    //                         <strong>{this.state.message}</strong>
                    //                     </Typography>
                    //                 </CardContent>
                    //             </Card>
                    //         </Paper>
                    //     </Grid>
                    //     <Grid item xs={4}/>
                    // </Grid>

                    // {this.state.message&&(
                        // <div>
                        //     <div id="shopCreateAlertMsgCoverDiv" style={{width: '100%',height:'100%',position: 'fixed',top:'0px',left: '0px',backgroundColor: 'black',opacity: '0.9',zIndex: '2'}}>
          
                        //     </div>
                        //     <Paper elevation="5" id="shopCreateAlertMsgCoverDivPaper" style={{position: 'fixed',width:'500px',height:'150px',backgroundColor:'white',margin:'auto',top:'200px',zIndex: '3',left:`${window.innerWidth/2-250}px`,}} >
                        //       <Typography variant="h4" style={{textAlign:'center',position:'relative',top:'50px'}}>{this.state.message}</Typography>
                        //     </Paper>
                        // </div>
                    //   )}
                    
                }
        </div>                               
        )
    }
}
export default SignUp;