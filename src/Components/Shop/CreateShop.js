import React, { Component } from 'react'
import { Grid, FormControl, OutlinedInput } from '@material-ui/core';
import { Paper, Typography, Button,Box } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import AddBox from '@material-ui/icons/AddBox';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

// import ApiService from "../ApiService";
import AddImg from './ShopImage/add.png';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import './ShopCss/CreateShop.css';
import ShopApi from '../ApiServices/ShopApi';
import CommonApi from '../ApiServices/CommonApi';

const style ={
  float:'right',
  marginRight:'50px',
  marginTop:'30px',
}

class CreateShop extends Component {

    constructor(props){
        super(props);
        this.state ={
          shopName:'',
          phone:'',
          address:'',
          message:'',
          file1: '',
          imagePreviewUrl1: '',
          description: '',
          logoUrl:'',

          shopId:'',

          severity:'',
          AlertTitle:'',
        }
        // this.saveUser = this.saveUser.bind(this);
        // this.loadUser = this.loadUser.bind(this);
    }



    onChange = (e) =>{
        this.setState({ [e.target.name]: e.target.value });
    }
    createShop = (e) => {
        e.preventDefault();
        let shop = {
          ownerId: localStorage.getItem("userId"),
          shopName: this.state.shopName,
          telephone: this.state.phone,
          address: this.state.address,
          description:this.state.description,
          // shopLogo: this.state.logoUrl,
          shopLogo: this.state.imagePreviewUrl1,
        };

        let userUpdateByShop = {
          updateRole:["shop"],
          userId :localStorage.getItem("userId")
        };

        ShopApi.NewShopCreate(shop)
            .then(res => {
                this.setState({
                  message : 'Shop create successfully.',
                  severity:'success',
                  AlertTitle:'success',
                });

                localStorage.setItem("ShopId",res.data.shopId);
                this.setState({shopId:res.data.shopId})

                CommonApi.userUpdate(userUpdateByShop)
                .then(userUpdate => {
                  console.log(userUpdate);
                })

                setTimeout(() => {
                    this.props.history.push('/shopprofileviwe/' + this.state.shopId);
                    window.location.reload();
                },2000);
            });
          // this.setState({message : 'Shop create successfully.'});
          // setTimeout(() => {
          //     this.props.history.push('/createShop');
          //     window.location.reload();
          // },500);
    }

    _handleImage1Change1(e) {
      e.preventDefault();

      let reader1 = new FileReader();
      let file1 = e.target.files[0];

      reader1.onloadend = () => {
        this.setState({
          file1: file1,
          imagePreviewUrl1: reader1.result
        });
      }

      reader1.readAsDataURL(file1)
    }


    render() {
        let {imagePreviewUrl1} = this.state;
        return (
            <div>
            {this.state.message&&(
              // <div>
              //     <div id="shopCreateAlertMsgCoverDiv" style={{width: '100%',height:'100%',position: 'fixed',top:'0px',left: '0px',backgroundColor: 'black',opacity: '0.9',zIndex: '2'}}>

              //     </div>
              //     <Paper elevation="5" id="shopCreateAlertMsgCoverDivPaper" style={{position: 'fixed',width:'500px',height:'150px',backgroundColor:'white',margin:'auto',top:'200px',zIndex: '3',left:`${window.innerWidth/2-250}px`,}} >
              //       <Typography variant="h4" style={{textAlign:'center',position:'relative',top:'50px'}}>{this.state.message}</Typography>
              //     </Paper>
              // </div>
              <div>
                <Alert variant="filled" severity={this.state.severity} style={{position:"fixed",right:"100px",width:"550px",zIndex:"3",color:"white"}}>
                    <AlertTitle>{this.state.AlertTitle}</AlertTitle>
                    {this.state.message}
                </Alert>

            </div>
            )}
            <Paper className='shopCreatePaper' style={{height:'730px',width:'90%',margin:'auto'}} elevation={1}>
              <Typography id="profileHeading">Create Shop</Typography>


              <ValidatorForm onSubmit={this.createShop} >
                <Grid container id="profileGrid">


                <Grid item xs={12} sm={12} md={6}>
                  <Paper style={{height:'150px',width:'90%',margin:'auto',marginTop:'15px',}} elevation={3}>
                      <Typography variant="h6" id="userNameDivTitle">Shop Logo</Typography>
                      <div style={{float: 'left',marginTop: '10px',width: '100px',height: '100px',border: '1px solid black',marginLeft: '40px',}}>
                          <input className="fileInput1"
                            type="file"
                            accept="image/*"
                            onChange={(e)=>this._handleImage1Change1(e)}
                           />

                           {!imagePreviewUrl1 ?(
                              <img src={AddImg} alt='imagee' className="addItemImg1" />
                            ):(
                              <img src={imagePreviewUrl1} alt='imageee' className="addItemImg1" />
                            )}
                              

                      </div>
                  </Paper>
                </Grid>




                      <Grid item xs={12} sm={12} md={6}>
                        <Paper id="userNameDiv"  elevation={3}>
                            <Typography variant="h6" id="userNameDivTitle">Shop Name</Typography>
                            {/* <FormControl variant="outlined" id='firstNameIp'>
                                <InputLabel htmlFor="component-outlined">Shop Name</InputLabel>
                                <OutlinedInput
                                    id="component-outlined"
                                    value={this.state.shopName}
                                    onChange={this.onChange}
                                    label="Shop Namee"
                                    name="shopName"
                                    required
                                />
                            </FormControl> */}
                            <TextValidator

                                variant="outlined"
                                label="Shop Name"
                                onChange={this.onChange}
                                name="shopName"
                                value={this.state.shopName}
                                Id="firstNameIp"
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                        </Paper>
                      </Grid>



                      <Grid item xs={12} sm={12} md={6}>
                        <Paper id="phoneDiv" elevation={3}>
                            <Box id="phonebox">
                                <Typography variant="h6" id="lastNameDivTitle">Phone Number</Typography>

                                    {/* <FormControl variant="outlined" id='emailIp'>
                                        <InputLabel htmlFor="component-outlined">Phone</InputLabel>
                                        <OutlinedInput
                                            id="component-outlined"
                                            value={this.state.phone}
                                            onChange={this.onChange}
                                            label="Phone"
                                            type="Number"
                                            name="phone"
                                            required
                                        />
                                    </FormControl> */}

                                    <TextValidator
                                        variant="outlined"
                                        label="Phone Number"
                                        onChange={this.onChange}
                                        name="phone"
                                        value={this.state.phone}
                                        Id="firstNameIp"
                                        type="Number"
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    />
                            </Box>
                        </Paper>
                      </Grid>



                      <Grid item xs={12} sm={12} md={6}>
                        <Paper id="addressDiv" elevation={3}>
                            <Box id="addressbox">
                                <Typography variant="h6" id="lastNameDivTitle">Address</Typography>
                                    {/* <FormControl variant="outlined" id='emailIp'>
                                        <InputLabel htmlFor="component-outlined">Address</InputLabel>
                                        <OutlinedInput
                                            id="component-outlined"
                                            value={this.state.address}
                                            onChange={this.onChange}
                                            label="Address"
                                            name="address"
                                            required
                                        />
                                    </FormControl> */}

                                    <TextValidator
                                        variant="outlined"
                                        label="Address"
                                        onChange={this.onChange}
                                        name="address"
                                        value={this.state.address}
                                        Id="firstNameIp"
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    />
                            </Box>
                        </Paper>
                      </Grid>


                      <Grid item xs={12} sm={12} md={6}>
                        <Paper id="userNameDiv"  elevation={3}>
                            <Typography variant="h6" id="userNameDivTitle">Description</Typography>
                            {/* <FormControl variant="outlined" id='firstNameIp'>
                                <InputLabel htmlFor="component-outlined">Description</InputLabel>
                                <OutlinedInput
                                    id="component-outlined"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    label="description"
                                    name="description"
                                    required
                                />
                            </FormControl> */}

                            <TextValidator
                                        variant="outlined"
                                        label="description"
                                        onChange={this.onChange}
                                        name="description"
                                        value={this.state.description}
                                        Id="firstNameIp"
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    />
                        </Paper>
                      </Grid>

                      {/* <Grid item xs={12} sm={12} md={6}>
                        <Paper id="userNameDiv"  elevation={3}>
                            <Typography variant="h6" id="userNameDivTitle">Logo URL</Typography>
                            <FormControl variant="outlined" id='firstNameIp'>
                                <InputLabel htmlFor="component-outlined">Logo URL</InputLabel>
                                <OutlinedInput
                                    id="component-outlined"
                                    value={this.state.logoUrl}
                                    onChange={this.onChange}
                                    label="logoUrl"
                                    name="logoUrl"
                                    required
                                />
                            </FormControl>
                        </Paper>
                      </Grid> */}

                      <Grid item xs={12} sm={12} >
                          <Box style={style}>
                            <Button type="submit" style={{background:'white',fontWeight:'bold',backgroundColor:'#03a9f4',color:'white'}}><AddBox style={{marginRight:'5px'}}/>Create Shop</Button>
                          </Box>
                      </Grid>
                </Grid>
                </ValidatorForm>

            </Paper>
            </div>
        );
    }
}

export default CreateShop;
