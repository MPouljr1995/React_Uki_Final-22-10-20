import React, { Component } from 'react'

import {DataContext} from '../Card/Data'

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

// import Input from '@material-ui/core/Input';
// import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

import {Grid,Paper,Button} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import './CardCss/Payment.css'
import './CardCss/BuyThins.css'

import CommonApi from '../ApiServices/CommonApi';
import OderApi from '../ApiServices/OderApi';
import ProductApi from '../ApiServices/ProductApi';



export default class BuyNowPayment extends Component {

    constructor(props){
        super(props);
        this.state = {

            buyProductDetails:[],
            price:'',
            productDetail:[],

            severity:'',
            AlertTitle:'',
            message:"",

            userDetailUpdated:false,
            userId:'',
            address:'',
            phone:'',
            email:'',
            userName:'',
            firstName:'',
            lastName:'',
            role:[],
        }
    }

    static contextType = DataContext;

    componentDidMount(){

        const reseltid = this.props.match.params.id;
        if (reseltid) {
            this.getCardOderProduct(reseltid);
        }

        this.getUserDetail();
        
    }

   getUserDetail() {
       CommonApi.getUserById(localStorage.getItem('userId'))
       .then(res => {
        this.setState({
            userId:res.data.userId,
            userName:res.data.userName,
            firstName:res.data.firstName,
            lastName:res.data.lastName,
            email:res.data.email,
            address:res.data.address,
            phone:res.data.phoneNumber,
            role:res.data.roles,
        })
       })
   }  

   onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})

    }


updateUser = () => {
    let user = {
        userId:this.state.userId,
        firstName:this.state.firstName,
        lastName:this.state.lastName,
        address:this.state.address,
        phoneNumber:this.state.phone,
        roles:this.state.role,
    }

    CommonApi.userUpdate(user)
    .then(res => {
        this.setState({
            severity:'success',
            AlertTitle:'Success',
            message:"User Detail Updated..",
            userDetailUpdated:true,
        })

        setTimeout(() => {
            this.setState({message:''})
        },2500)
    })

    .catch(error => {
        this.setState({
            severity:'error',
            AlertTitle:'Error',
            message:"Update UnSuccessFull..",
        })

        setTimeout(() => {
            this.setState({message:''})
        },2500)
    })

}

   getCardOderProduct (reseltid)  {
       console.log("hi....All")

       ProductApi.getProductById(reseltid)
       .then(res => {
       console.log("end....");
           this.setState({
            productDetail:res.data,
            buyProductDetails: [{
                "buyProductId":res.data.productId,
                "shopId":res.data.shopId,
                "quantity":res.data.count,
                "price":res.data.sellPrice,
            }],
            price:res.data.sellPrice,
           })
       })
   }

   oderAllProduct= () => {

    if (this.state.firstName !="" && this.state.lastName !="" && this.state.email !="" && this.state.phone !="" && this.state.userDetailUpdated) {

        let oder = {
            userId : localStorage.getItem("userId"),
            buyProductDetails: this.state.buyProductDetails,
            totalPrice: this.state.price *1.2,
           }
    
        OderApi.addNewOder(oder)
        .then(res => {
            this.setState({
                message:"YOUR ODER SUCCESS",
                severity:'success',
                AlertTitle:'Success',
            })
    
            setTimeout(() => {
                this.setState({message:''})
                this.props.history.push('/');
            },2000)
        })
    
        .catch(res => {
            this.setState({
                message:"YOUR ODER NOT COMPILITE",
                severity:'error',
                AlertTitle:'Error',
            })
    
            setTimeout(() => {
                this.setState({message:''})
            },2000)
        })
        
    } else{
            this.setState({
                message:"Plase fill your details first and  then click update button",
                severity:'error',
                AlertTitle:'Error',
            })

            setTimeout(() => {
                this.setState({message:''})
            },3000)
    }
    

    // console.log(this.state.buyProductDetails);
    // console.log(oder)
   }
   
   
    render() {

        // const {payment} = this.context;
        const {user , productDetail} = this.state;

        return(

            <div>
                <div>
                {this.state.message&&(
                    <div>
                        <Alert variant="filled" severity={this.state.severity} style={{position:"fixed",right:"100px", width:"550px",zIndex:"3",color:"white"}}>
                            <AlertTitle>{this.state.AlertTitle}</AlertTitle>
                            {this.state.message}
                        </Alert>

                    </div>
                )}
                </div>

            
            <Paper id="paper1">
                
                <div className="payment_d">
                    <ValidatorForm ref="form" onSubmit={this.updateUser}>
                    <div className="heading">
                        <h2>Oder confirmation</h2>
                    </div>

                        <div className="boder">
                            <div className="detail_1">
                                <Grid container>
                                    <Grid item xs={12} md={6}>
                                        <Box className="box">
                                            <h3>Your Information</h3>
                                            <hr/>
                                            <TextValidator
                                                variant="outlined"
                                                label="First name"
                                                name="firstName"
                                                value={this.state.firstName}
                                                onChange={this.onChange}
                                                style={{width:'90%',display:'flex',margin:'auto',marginTop:'20px'}}
                                                validators={['required',]}
                                                errorMessages={['This field is required',]}
                                            />

                                            <TextValidator
                                                variant="outlined"
                                                label="Last name"
                                                name="lastName"
                                                value={this.state.lastName}
                                                onChange={this.onChange}
                                                style={{width:'90%',display:'flex',margin:'auto',marginTop:'20px'}}
                                                validators={['required',]}
                                                errorMessages={['This field is required',]}
                                            />

                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box className="box">
                                            <h3>Shipping Address</h3>
                                            <hr/>
                                            <TextValidator
                                                variant="outlined"
                                                label="address"
                                                name="address"
                                                value={this.state.address}
                                                onChange={this.onChange}
                                                style={{width:'90%',display:'flex',margin:'auto',marginTop:'20px'}}
                                                validators={['required',]}
                                                errorMessages={['This field is required',]}
                                                multiline
                                                rows={4}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box className="box">
                                            <h3>Payment method</h3>
                                            <hr/>

                                            <RadioGroup aria-label="quiz" name="quiz" value="Cash On Delivery" style={{marginLeft:'5%'}} >
                                              <FormControlLabel value="Cash On Delivery" control={<Radio />} label="Cash On Delivery" cheked />
                                            </RadioGroup>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box className="box">
                                            <h3>Phone Number</h3>
                                            <hr/>
                                                <TextValidator
                                                    variant="outlined"
                                                    label="Phone number"
                                                    name="phone"
                                                    value={this.state.phone}
                                                    onChange={this.onChange}
                                                    style={{width:'90%',display:'flex',margin:'auto',marginTop:'20px'}}
                                                    validators={['required',]}
                                                    errorMessages={['This field is required',]}
                                                    type="number"
                                                />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} >
                                    <Button type="submit" id="EDIT_B">UPDATE</Button>
                                    </Grid>
                                </Grid>
                                <br/>
                            </div>
                            
                        </div>
                        </ValidatorForm>
                    

                    <Paper className="thingsDetail_P">
                                    {productDetail.length !== 0 && (
                                        <Grid container>
                                            <Grid item xs={5} style={{textAlign:"center"}}><h3>Items</h3></Grid>
                                            <Grid item xs={2} style={{textAlign:"center"}}><p>Quanity</p></Grid>
                                            <Grid item xs={3} style={{textAlign:"center"}}><p>Sell Price</p></Grid>
                                            <Grid item xs={2}></Grid>
                                        </Grid>
                                    )}

                                    <div>
                                       
                                        <div>
                                            <Grid container>
                                                <Grid item xs={5} style={{textAlign:"center"}}>
                                                    <Grid container>
                                                        <Grid item xs={4}>
                                                            <img src={productDetail.image_1} style={{width:"100px", height:"100px"}}></img>
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <h2>{productDetail.title}</h2>
                                                            <p>{productDetail.description}</p>
                                                        </Grid>
                                                        <Grid item xs={4}></Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={2} style={{textAlign:"center"}}><p>{productDetail.count} </p></Grid>
                                                <Grid item xs={3} style={{textAlign:"center"}}>
                                                    <p>RS. {productDetail.sellPrice}</p>
                                                </Grid>
                                                <Grid item xs={2}>
                                                </Grid>
                                            </Grid>
                                            <br/>
                                        </div>
                                         
                                    </div>

                    </Paper>

                    <Box className="total_B">
                        <div className="total_d"> 
                            <div>
                                <h4>Subtotal -</h4>
                                <h4>Shipping fee -</h4>
                                <h1>TOTAL -</h1>
                            </div>

                            <div className="price_d">
                                <h4>RS. {this.state.price}.00</h4>
                                <h4>RS. {this.state.price*0.2}.00</h4>
                                <h1>RS. {this.state.price*1.2}.00</h1>
                            </div>
                        </div>
                        <Button onClick={this.oderAllProduct} id="oder_2">Place Order</Button>                        
                    </Box> 
                </div>
            </Paper>
        </div>
        )
    }
}