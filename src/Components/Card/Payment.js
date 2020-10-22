import React, { Component } from 'react'
import {Link} from 'react-router-dom'

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

// import BuyingThings from './BuyThins';
import CommonApi from '../ApiServices/CommonApi';
import OderApi from '../ApiServices/OderApi';
// import './cssPages/Payment.css';

// import BuyingThings from './BuyingThings';


export default class Payment extends Component {

    constructor(props){
        super(props);
        this.state = {
            user:[],
            showReselt:'',

            buyProductDetails:[],

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
        // this.context.getTotal();

        // const{thinsByNowIs} = this.props.location
        //     console.log(thinsByNowIs);

        this.getUserDetail();
        this.getCardOderAllProduct();
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

   getCardOderAllProduct ()  {
       {
           this.context.cart.map(pro => (
               console.log(pro),
                this.setState(prevState =>({
                    buyProductDetails: [...prevState.buyProductDetails,{
                        "buyProductId":pro.productId,
                        "shopId":pro.shopId,
                        "quantity":pro.count,
                        "price":pro.sellPrice,
                    }]
                }))
           ))
       }

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
                this.context({
                    cart:[],
                    total:0
                })
                this.props.history.push('/');
                localStorage.removeItem("dataCart")
                localStorage.removeItem("dataTotal")

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

onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})

    }
   
   
    render() {

        const {total,buyNowTotal,payment,cart,remove2,removeProduct} = this.context;
        const {user} = this.state;

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
                                    {cart.length !== 0 && (
                                        <Grid container>
                                            <Grid item xs={5} style={{textAlign:"center"}}><h3>items</h3></Grid>
                                            <Grid item xs={2} style={{textAlign:"center"}}><p>Quanity</p></Grid>
                                            <Grid item xs={3} style={{textAlign:"center"}}><p>Sell Price</p></Grid>
                                            <Grid item xs={2}></Grid>
                                        </Grid>
                                    )}
                                    

                                    <div>
                                        {
                                            cart.map(card1 =>(
                                                <div>
                                                    <Grid container>
                                                        <Grid item xs={5} style={{textAlign:"center"}}>
                                                            <Grid container>
                                                                <Grid item xs={4}>
                                                                    <img src={card1.image_1} style={{width:"100px", height:"100px"}}></img>
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <h2>{card1.title}</h2>
                                                                    <p>{card1.description}</p>
                                                                </Grid>
                                                                <Grid item xs={4}></Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={2} style={{textAlign:"center"}}><p>{card1.count}</p></Grid>
                                                        <Grid item xs={3} style={{textAlign:"center"}}>
                                                            <p>RS. {card1.sellPrice}</p>
                                                        </Grid>
                                                    </Grid>
                                                    <br/>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </Paper>

                {/* /////////////////////////////////////////////////////////////////////////// */}

                    <Box className="total_B">
                        <div className="total_d"> 
                            <div>
                                <h4>Subtotal -</h4>
                                <h4>Shipping fee -</h4>
                                <h1>TOTAL -</h1>
                            </div>
                            <div className="price_d">
                                <h4>RS. {total}.00</h4>
                                <h4>RS. {total*0.2}.00</h4>
                                <h1>RS. {total+total*0.2}.00</h1>
                            </div>
                        </div>
                        <Button onClick={this.oderAllProduct} id="oder_2">PLACE ODER</Button>                        
                    </Box> 
                </div>
            </Paper>
        </div>
        )
    }
}