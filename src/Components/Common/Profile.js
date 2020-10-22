
import React,{Component} from 'react';
import { Grid, FormControl, OutlinedInput  } from '@material-ui/core';
import { Paper, Typography, Button,Box } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';

import CreateIcon from '@material-ui/icons/Create';
import SaveIcon from '@material-ui/icons/Save';
import Close from '@material-ui/icons/Close';
import AccountBox from '@material-ui/icons/AccountBox';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import './Css/Profile.css';
import CommonApi from '../ApiServices/CommonApi';



class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {show: 'true'};
    this.state={
      thisUser:localStorage.getItem('user'),
      firstNameEdite:false,
      lastNameEdite:false,
      emailEdite:false,
      phoneEdite:false,
      addressEdite:false,

      message:'',
      severity:'',
      AlertTitle:'',




      updateFirstName:'',
      updateLastName:'',
      updateEmail:'',
      updatePhone:'',
      updateAddress:'',






      showInfo:'show',
      setName:'',
      username:'',
      email:'',
      userId:'',
      roles:[],
      first_name:'',
      last_name: '',
      address: '',
      phone:'',
    };
  }

componentDidMount(){
  this.loadUserDetails();
}

loadUserDetails = () => {
  CommonApi.getUserById(localStorage.getItem('userId'))
    .then((res)=>{
        let user = res.data;
        this.setState({
          username:user.userName,
          email:user.email,
          userId:user.userId,
          roles:user.roles,
          first_name:user.firstName,
          last_name: user.lastName,
          address: user.address,
          phone:user.phoneNumber,


          updateFirstName:user.firstName,
          updateLastName:user.lastName,
          updateEmail:user.email,
          updatePhone:user.phoneNumber,
          updateAddress:user.address,
        })
    });
}


  messageEmpty=()=>{
    setTimeout(() => {
        this.setState({
          message:'',
        })
    },2000)
  }

//profile_name edite start
    editeFirstName=()=>{
        this.setState({
          firstNameEdite:true,
        })
    }

    onChangeUpdateFirstName=(e)=>{
        this.setState({
          updateFirstName:e.target.value,
        })
    }

    editeFirstNameCancel=()=>{
        this.setState({
            updateFirstName:this.state.first_name,
          firstNameEdite:false,
        })
    }

    editeFirstNameUpdate=()=>{
        this.setState({
            firstNameEdite:false,
        })

        let user = {
            userName: this.state.username,
            userId:this.state.userId,
            email: this.state.email,
            firstName: this.state.updateFirstName,
            lastName: this.state.last_name,
            phoneNumber: this.state.phone,
            address: this.state.address,
	          roles:this.state.roles,
        }
        console.log(user);
        CommonApi.userUpdate(user)
        .then((res) =>{
            this.setState({
                first_name:this.state.updateFirstName,
                message:"First name successfully updated.",
                severity:"success",
                AlertTitle:'Success',
            })
        })
        .catch((res) =>{
            this.setState({
                updateFirstName:this.state.first_name,
                message:"First name update Failed.",
                severity:"error",
                AlertTitle:'Error',
            })
        })
    }
//profile_name edite end


//profile last_name edite start
    editeLastName=()=>{
        this.setState({
          lastNameEdite:true,
        })
    }

    onChangeUpdateLastName=(e)=>{
        this.setState({
          updateLastName:e.target.value,
        })
    }

    editeLastNameCancel=()=>{
        this.setState({
            updateLastName:this.state.last_name,
          lastNameEdite:false,
        })
    }

    editeLastNameUpdate=()=>{
        this.setState({
            lastNameEdite:false,
        })
        let user = {
            userName: this.state.username,
            userId:this.state.userId,
            email: this.state.email,
            firstName: this.state.first_name,
            lastName: this.state.updateLastName,
            phoneNumber: this.state.phone,
            address: this.state.address,
	          roles:this.state.roles,
        }
        console.log(user);
        CommonApi.userUpdate(user)
        .then(res =>{
            this.setState({
                last_name: this.state.updateLastName,
                message:"Last name successfully updated.",
                severity:"success",
                AlertTitle:'Success',
            })
        })
        .catch((res) =>{
            this.setState({
                updateLastName:this.state.last_name,
                message:"Last name update Failed.",
                severity:"error",
                AlertTitle:'Error',
            })
        })

    }
//profile last_name edite end





//profile phone edite start
    editePhone=()=>{
        this.setState({
          phoneEdite:true,
        })
    }

    onChangeUpdatePhone=(e)=>{
        this.setState({
          updatePhone:e.target.value,
        })
    }

    editePhoneCancel=()=>{
        this.setState({
            updatePhone:this.state.phone,
            phoneEdite:false,
        })
    }

    editePhoneUpdate=()=>{
        this.setState({
            phoneEdite:false,
        })
        let user = {
            userName: this.state.username,
            userId:this.state.userId,
            email: this.state.email,
            firstName: this.state.first_name,
            lastName: this.state.last_name,
            phoneNumber: this.state.updatePhone,
            address: this.state.address,
	          roles:this.state.roles,
        }
        console.log(user);
        CommonApi.userUpdate(user)
        .then(res =>{
            this.setState({
                phone:this.state.updatePhone,
                message:"Phone number successfully updated.",
                severity:"success",
                AlertTitle:'Success',
            })
        })
        .catch((res) =>{
            this.setState({
                updatePhone:this.state.phone,
                message:"Phone number update Failed.",
                severity:"error",
                AlertTitle:'Error',
            })
        })
    }
//profile phone edite end



//profile address edite start
    editeAddress=()=>{
        this.setState({
          addressEdite:true,
        })
    }

    onChangeUpdateAddress=(e)=>{
        this.setState({
          updateAddress:e.target.value,
        })
    }

    editeAddressCancel=()=>{
        this.setState({
            updateAddress:this.state.address,
            addressEdite:false,
        })
    }

    editeAddressUpdate=()=>{
        this.setState({
            addressEdite:false,
        })
        let user = {
            userName: this.state.username,
            userId:this.state.userId,
            email: this.state.email,
            firstName: this.state.first_name,
            lastName: this.state.last_name,
            phoneNumber: this.state.phone,
            address: this.state.updateAddress,
	          roles:this.state.roles,
        }
        console.log(user);
        CommonApi.userUpdate(user)
        .then(res =>{
            this.setState({
                address:this.state.updateAddress,
                message:"Email successfully updated.",
                severity:"success",
            })
        })
        .catch((res) =>{
            this.setState({
                updateAddress:this.state.address,
                message:"Email update Failed.",
                severity:"error",
                AlertTitle:'Error',
            })
        })
    }
//profile address edite end




  render(){


    return (
      <div>
        {this.state.message&&(
            <Alert variant="filled" style={{position:"fixed",right:"100px",width:"550px",zIndex:"3",color:"white"}} severity={this.state.severity}>
              <AlertTitle>{this.state.AlertTitle}</AlertTitle>
              {this.state.message}
              {this.messageEmpty()}
            </Alert>
          )}


        <Paper className='profileDivWarraper' elevation={1}>
          <Typography id="profileHeading" ><AccountBox style={{marginRight:'5px',fontSize: '40px',position:'relative',top:'10px'}}/>My Profile</Typography>
          {/* <div style={{height:'50px',marginTop:'5px'}}> */}
          {/* {this.state.message&&(
            <Alert variant="filled" style={{width:'400px',margin:'auto',zIndex:'3',marginTop:'10px'}} severity={this.state.severity}>
              {this.state.message}
              {this.messageEmpty()}
            </Alert>
          )} */}
          {/* </div> */}
            <Grid container id="profileGrid">
              {/*<Grid item xs={3} >
                  <div className='profileSideDiv'>
                    <br/>
                    <Button  type='button' onClick={() => this.handleClick('personalInfoContentDiv')}  id='proSideDivBtn'>Personal Info</Button><br/><br/>
                    <Divider />
                    <br/>
                    <Button  onClick={() => this.handleClick('editeProfileDiv')} id='proSideDivBtn'>Edit Personal Info</Button><br/><br/><Divider /><br/>
                    <Button  onClick={() => this.handleClick('myShopDiv')} id='proSideDivBtn'>My Shops</Button><br/><br/><Divider /><br/>
                    <Button  onClick={() => this.handleClick('myReviewDiv')} id='proSideDivBtn'>My Review</Button><br/><br/><Divider /><br/>
                  </div>
              </Grid>*/}


                  <Grid item xs={12} sm={12} md={6}>

                    <Paper id="userNameDiv" elevation={3}>
                        <Typography variant="h6" id="userNameDivTitle">User name</Typography>
                        <Typography variant="h5" id="userNameLabel">{this.state.username}</Typography>
                    </Paper>

                  </Grid>



                  <Grid item xs={12} sm={12} md={6}>
                    <Paper id="emailDiv" elevation={3}>
                        <Box id="emailbox">
                            <Typography variant="h6" id="emailDivTitle">Email</Typography>
                                <Typography variant="h5" id="emailLabel">{this.state.email}</Typography>
                        </Box>
                    </Paper>
                  </Grid>


                  <Grid item xs={12} sm={12} md={6}>

                    <Paper id="firstNameDiv" elevation={3}>
                        <Box id="firstNamebox">
                          <Typography variant="h6" id="firstNameDivTitle">First name</Typography>
                          {!this.state.firstNameEdite &&(
                              <Typography variant="h5" id="firstNameLabel">{this.state.first_name}</Typography>
                          )}
                          {this.state.firstNameEdite &&(
                              <FormControl variant="outlined" id='firstNameIp'>
                                  <InputLabel htmlFor="component-outlined">First Name</InputLabel>
                                  <OutlinedInput
                                      id="component-outlined"
                                      value={this.state.updateFirstName}
                                      onChange={this.onChangeUpdateFirstName}
                                      label="First Name"
                                  />
                              </FormControl>
                          )}
                        </Box>
                        {!this.state.firstNameEdite &&(
                            <Button id="firstNameEditeBtn" onClick={this.editeFirstName}> <CreateIcon style={{marginRight:'5px'}}/> Edit</Button>
                        )}
                        {this.state.firstNameEdite &&(
                          <Box style={{float:'right'}}>
                            <Button id="firstNameEditeCancelBtn" onClick={this.editeFirstNameCancel}><Close style={{marginRight:'5px'}}/>Cancel</Button>
                            <Button id="firstNameEditeUpdateBtn" onClick={this.editeFirstNameUpdate}><SaveIcon style={{marginRight:'5px'}}/>Update</Button>
                          </Box>
                        )}
                    </Paper>

                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <Paper id="lastNameDiv" elevation={3}>
                        <Box id="lastNamebox">
                            <Typography variant="h6" id="lastNameDivTitle">Last name</Typography>
                            {!this.state.lastNameEdite &&(
                                <Typography variant="h5" id="lastNameLabel">{this.state.last_name}</Typography>
                            )}
                            {this.state.lastNameEdite &&(
                                <FormControl variant="outlined" id='proLastNameIp'>
                                    <InputLabel htmlFor="component-outlined">Last Name</InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        value={this.state.updateLastName}
                                        onChange={this.onChangeUpdateLastName}
                                        label="Last Name"
                                    />
                                </FormControl>
                            )}
                        </Box>
                        {!this.state.lastNameEdite &&(
                            <Button id="lastNameEditeBtn" onClick={this.editeLastName}> <CreateIcon style={{marginRight:'5px'}}/> Edit</Button>
                        )}
                        {this.state.lastNameEdite &&(
                          <Box style={{float:'right'}}>
                            <Button id="lastNameEditeCancelBtn" onClick={this.editeLastNameCancel}><Close style={{marginRight:'5px'}}/>Cancel</Button>
                            <Button id="lastNameEditeUpdateBtn" onClick={this.editeLastNameUpdate}> <SaveIcon style={{marginRight:'5px'}}/>Update</Button>
                          </Box>
                        )}
                    </Paper>
                  </Grid>


                  <Grid item xs={12} sm={12} md={6}>

                    <Paper id="phoneDiv" elevation={3}>
                        <Box id="phonebox">
                            <Typography variant="h6" id="lastNameDivTitle">Phone Number</Typography>
                            {!this.state.phoneEdite &&(
                                <Typography variant="h5" id="emailLabel">{this.state.phone}</Typography>
                            )}
                            {this.state.phoneEdite &&(
                                <FormControl variant="outlined" id='emailIp'>
                                    <InputLabel htmlFor="component-outlined">Phone</InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        value={this.state.updatePhone}
                                        onChange={this.onChangeUpdatePhone}
                                        label="Phone"
                                        type="Number"
                                    />
                                </FormControl>
                            )}
                        </Box>
                        {!this.state.phoneEdite &&(
                            <Button id="phoneEditeBtn" onClick={this.editePhone}><CreateIcon style={{marginRight:'5px'}}/>Edit</Button>
                        )}
                        {this.state.phoneEdite &&(
                          <Box style={{float:'right'}}>
                            <Button id="phoneEditeCancelBtn" onClick={this.editePhoneCancel}><Close style={{marginRight:'5px'}}/>Cancel</Button>
                            <Button id="phoneEditeUpdateBtn" onClick={this.editePhoneUpdate}> <SaveIcon style={{marginRight:'5px'}}/> Update</Button>
                          </Box>
                        )}
                    </Paper>

                  </Grid>



                  <Grid item xs={12} sm={12} md={6}>

                    <Paper id="addressDiv" elevation={3}>
                        <Box id="addressbox">
                            <Typography variant="h6" id="lastNameDivTitle">Address</Typography>
                            {!this.state.addressEdite &&(
                                <Typography variant="h5" id="emailLabel">{this.state.address}</Typography>
                            )}
                            {this.state.addressEdite &&(
                                <FormControl variant="outlined" id='emailIp'>
                                    <InputLabel htmlFor="component-outlined">Address</InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        value={this.state.updateAddress}
                                        onChange={this.onChangeUpdateAddress}
                                        label="Address"
                                    />
                                </FormControl>
                            )}
                        </Box>
                        {!this.state.addressEdite &&(
                            <Button id="phoneEditeBtn" onClick={this.editeAddress}><CreateIcon style={{marginRight:'5px'}}/>Edit</Button>
                        )}
                        {this.state.addressEdite &&(
                          <Box style={{float:'right'}}>
                            <Button id="addressEditeCancelBtn" onClick={this.editeAddressCancel}><Close style={{marginRight:'5px'}}/>Cancel</Button>
                            <Button id="addressEditeUpdateBtn" onClick={this.editeAddressUpdate}><SaveIcon style={{marginRight:'5px'}}/>Update</Button>
                          </Box>
                        )}
                    </Paper>

                  </Grid>
            </Grid>
        </Paper>
        </div>

    );
  }
}

export default Profile;

