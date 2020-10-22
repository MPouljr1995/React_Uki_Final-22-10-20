import React,{Component} from 'react';
import { Grid, FormControl, OutlinedInput } from '@material-ui/core';
import { Paper, Typography, Button,Box,Select } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';

import UpdateIcon from '@material-ui/icons/Update';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@material-ui/icons/CheckBox';

import './AdminCss/EditUser.css';

import CommonApi from '../ApiServices/CommonApi';


const style={
    float:'right',
    marginRight:'50px',
    marginTop:'30px',

}

class EditUser extends Component {
  constructor(props){
    super(props);
    this.state = {show: 'true'};
    this.state={
      id: '',
      username:'',
      firstName: '',
      lastName: '',
      email:'',
      phone:'',
      address:'',
      roles:[],
      changeRole:'',

      severity:'',
      AlertTitle:'',
      message:'',
      // users: [],
      // userRole:false,
      // shopRole:false,
      // adminRole:false,
    }

  }
      componentDidMount() {

        const userid = this.props.match.params.id;
        if (userid) {
            this.loadUser(userid);
            console.log(userid);
        }
          
      }

      loadUser = (userid) => {
          CommonApi.getUserById(userid)
              .then((res) => {
                  console.log(res)
                  let user = res.data;
                  // localStorage.setItem("edituserRole",user.roles)
                  this.setState({
                      id: user.userId,
                      username: user.userName,
                      firstName: user.firstName,
                      lastName: user.lastName,
                      email:user.email,
                      phone:user.phoneNumber,
                      address:user.address,
                      roles:user.roles,

                  })
                  {
                    this.state.roles.map(role => (
                      role.name.includes("USER_ROLE") && (
                        this.setState({changeRole:'user'})
                      ),
                      role.name.includes("SHOP_ROLE") && (
                        this.setState({changeRole:'shop'})
                      ),
                      role.name.includes("ADDMIN_ROLE") && (
                        this.setState({changeRole:'admin'})
                      )

                      // if (role.name.includes("USER_ROLE")) {
                      //   this.setState({changeRole:'user'})
                      // } else
                    // this.setState({
                      
                    //   userRole:role.name.includes("USER_ROLE"),
                    //   shopRole:role.name.includes("SHOP_ROLE"),
                    //   adminRole:role.name.includes("ADMIN_ROLE")
                    // })
                  ))}
              });
      }


      //update user api
            updateUser = (e) => {
                e.preventDefault();
                let UPuser = {
                      userId : this.state.id,
                      userName: this.state.username,
                      firstName: this.state.firstName,
                      lastName: this.state.lastName,
                      email:this.state.email,
                      phoneNumber:this.state.phone,
                      address:this.state.address,
                      updateRole:[this.state.changeRole]
                    };
                CommonApi.userUpdate(UPuser)
                    .then(res => {
                        this.setState({
                          message : 'User added successfully.',
                          severity:'success',
                          AlertTitle:'success',
                        });

                        setTimeout(() => {
                          this.setState({message:''})
                          this.props.history.push('/userDetails');
                        },2000)
                        
                    });
                    // console.log(this.state.userRole);
                    // console.log(this.state.userRole);
                    // console.log(localStorage.getItem("edituserRole"));
            }




//profile_name edite start


    onChangeUpdateFirstName=(e)=>{
        this.setState({
          firstName:e.target.value,
        })
    }


//profile_name edite end


//profile last_name edite start


    onChangeUpdateLastName=(e)=>{
        this.setState({
          lastName:e.target.value,
        })
    }

//profile last_name edite end



//profile email edite start


    onChangeUpdateEmail=(e)=>{
        this.setState({
          email:e.target.value,
        })
    }

//profile email edite end


//profile phone edite start

    onChangeUpdatePhone=(e)=>{
        this.setState({
          phone:e.target.value,
        })
    }

//profile phone edite end



//profile address edite start


    onChangeUpdateAddress=(e)=>{
        this.setState({
          address:e.target.value,
        })
    }

//profile address edite end

changeRole=(event) =>{
  this.setState({
    changeRole:event.target.value
  })
} 

// changeShopRole=(event) =>{
//   this.setState({
//     shopRole:event.target.checked
//   })
// } 

// changeAdminRole=(event) =>{
//   this.setState({
//     adminRole:event.target.checked
//   })
// } 



  render(){


    return (
      <div>

                {this.state.message&&(
                    <div>
                        <Alert variant="filled" severity={this.state.severity} style={{position:"fixed",right:"100px",width:"550px",marginTop:'150px', zIndex:"3",color:"white"}}>
                            <AlertTitle>{this.state.AlertTitle}</AlertTitle>
                            {this.state.message}
                        </Alert>

                    </div>
                )}



        <Paper id='profileDivWarraper' elevation={2}>
          <Typography id="profileHeading">Edit User</Typography>
            <Grid container id="profileGrid">
              {/*<Grid item xs={3} >
                  <div className='profileSideDiv'>
                    <br/>
                    <Button  type='button' onClick={() => this.handleClick('personalInfoContentDiv')}  id='proSideDivBtn'>Personal Info</Button><br/><br/>
                    <Divider />
                    <br/>
                    <Button  onClick={() => this.handleClick('editeProfileDiv')} id='proSideDivBtn'>Edite Personal Info</Button><br/><br/><Divider /><br/>
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

                    <Paper id="userNameDiv" elevation={3}>
                        <Typography variant="h6" id="userNameDivTitle">Email</Typography>
                        <Typography variant="h5" id="userNameLabel">{this.state.email}</Typography>
                    </Paper>

                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>

                    <Paper id="firstNameDiv" elevation={3}>
                        <Box id="firstNamebox">
                          <Typography variant="h6" id="firstNameDivTitle">First name</Typography>

                              <FormControl variant="outlined" id='firstNameIp'>
                                  <InputLabel htmlFor="component-outlined">First Name</InputLabel>
                                  <OutlinedInput
                                      id="component-outlined"
                                      value={this.state.firstName}
                                      onChange={this.onChangeUpdateFirstName}
                                      label="First Name"
                                  />
                              </FormControl>
                        </Box>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>

                    <Paper id="lastNameDiv" elevation={3}>
                        <Box id="lastNamebox">
                            <Typography variant="h6" id="lastNameDivTitle">Last name</Typography>

                                <FormControl variant="outlined" id='proLastNameIp'>
                                    <InputLabel htmlFor="component-outlined">Last Name</InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        value={this.state.lastName}
                                        onChange={this.onChangeUpdateLastName}
                                        label="Last Name"
                                    />
                                </FormControl>
                       </Box>
                    </Paper>
                  </Grid>

                  {/* <Grid item xs={12} sm={12} md={6}>

                    <Paper id="emailDiv" elevation={3}>
                        <Box id="emailbox">
                            <Typography variant="h6" id="emailDivTitle">Email</Typography>


                                <FormControl variant="outlined" id='emailIp'>
                                    <InputLabel htmlFor="component-outlined">Email</InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        value={this.state.email}
                                        onChange={this.onChangeUpdateEmail}
                                        label="Email"
                                    />
                                </FormControl>
                        </Box>
                    </Paper>
                  </Grid> */}


                  <Grid item xs={12} sm={12} md={6}>
                    <Paper id="phoneDiv" elevation={3}>
                        <Box id="phonebox">
                            <Typography variant="h6" id="lastNameDivTitle">Phone Number</Typography>

                                <FormControl variant="outlined" id='emailIp'>
                                    <InputLabel htmlFor="component-outlined">Phone</InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        value={this.state.phone}
                                        onChange={this.onChangeUpdatePhone}
                                        label="Phone"
                                        type="Number"
                                    />
                                </FormControl>
                        </Box>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <Paper id="addressDiv" elevation={3}>
                        <Box id="addressbox">
                            <Typography variant="h6" id="lastNameDivTitle">Address</Typography>

                                <FormControl variant="outlined" id='emailIp'>
                                    <InputLabel htmlFor="component-outlined">Address</InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        value={this.state.address}
                                        onChange={this.onChangeUpdateAddress}
                                        label="Address"
                                    />
                                </FormControl>
                        </Box>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <Paper id="addressDiv" elevation={3}>
                        <Box id="addressbox">
                            <Typography variant="h6" id="lastNameDivTitle">Roles</Typography>

                            {/* <FormGroup>
                              <FormControlLabel
                                control={<Checkbox checked={this.state.userRole} onChange={this.changeUserRole} name="User_Role" />}
                                label="User_Role"
                              /> 
                              <FormControlLabel
                                control={<Checkbox checked={this.state.shopRole} onChange={this.changeShopRole} name="Shop_Role" />}
                                label="Shop_Role"
                              /> 
                              <FormControlLabel
                                control={<Checkbox checked={this.state.adminRole} onChange={this.changeAdminRole} name="Admin_Role" />}
                                label="Admin_Role"
                              />
                            </FormGroup> */}

                            <FormControl variant="outlined" >
                                  <InputLabel htmlFor="outlined-category-native-simple">Role</InputLabel>
                                  <Select
                                        native
                                        value={this.state.changeRole}
                                        onChange={this.changeRole}
                                        label="Role"
                                        validators={['required']}
                                        errorMessages={['this field is required']}

                                  >
                                        <option value={''}></option>
                                        <option value={'user'}>ROLE_USER</option>
                                        <option value={'shop'}>ROLE_SHOP</option>
                                        <option value={'admin'}>ROLE_ADMIN</option>
                                  </Select>
                            </FormControl>
                        </Box>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={12} >
                      <Box style={style}>
                        <Button onClick={this.updateUser} style={{backgroundColor:'white',fontWeight:'bold',backgroundColor:'#03a9f4',color:'white'}}><UpdateIcon/> Update</Button>
                      </Box>
                  </Grid>
            </Grid>
        </Paper>
      </div>
    );
  }
}

export default EditUser;
