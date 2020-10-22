import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import {DataContext} from '../Card/Data'

import './CardCss/BuyThins.css'

import {Grid,Paper} from '@material-ui/core';

export class BuyingThings extends Component {

    static contextType = DataContext;

    componentDidMount(){
        this.context.getTotal();
    }

    render() {
        const {payment,cart,remove2,total,removeProduct} = this.context;

        // if(payment.length === 0){
        //     return (
        //         <h2 style={{textAlign:"center", marginTop:"50px"}}>NOTHING PRODUCT</h2>
        //         // window.location(/);
        //     )
        // } else {
            return(
                <Paper className="thingsDetail_P">
                    {/* {payment.length !== 0 && (
                        <Grid container>
                            <Grid item xs={5} style={{textAlign:"center"}}><h3>items</h3></Grid>
                            <Grid item xs={2} style={{textAlign:"center"}}><p>Quanity</p></Grid>
                            <Grid item xs={3} style={{textAlign:"center"}}><p>Sell Price</p></Grid>
                            <Grid item xs={2}></Grid>
                        </Grid>
                    )} */}

                    {cart.length !== 0 && (
                        <Grid container>
                            <Grid item xs={5} style={{textAlign:"center"}}><h3>items</h3></Grid>
                            <Grid item xs={2} style={{textAlign:"center"}}><p>Quanity</p></Grid>
                            <Grid item xs={3} style={{textAlign:"center"}}><p>Sell Price</p></Grid>
                            <Grid item xs={2}></Grid>
                        </Grid>
                    )}
                    

                    {/* <div>
                        {
                            payment.map(pay =>(
                                <div>
                                    <Grid container>
                                        <Grid item xs={5} style={{textAlign:"center"}}>
                                            <Grid container>
                                                <Grid item xs={4}>
                                                    <img src={pay.image_1} style={{width:"100px", height:"100px"}}></img>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <h2>{pay.title}</h2>
                                                    <p>{pay.description}</p>
                                                </Grid>
                                                <Grid item xs={4}></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2} style={{textAlign:"center"}}><p>{pay.count} </p></Grid>
                                        <Grid item xs={3} style={{textAlign:"center"}}>
                                            <p>RS. {pay.sellPrice}</p>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Link style={{textDecoration:"none"}} className="remove" onClick={() => remove2(pay.productId)}>Remove</Link>
                                        </Grid>
                                    </Grid>
                                    <br/>
                                </div>
                            ))
                        }
                    </div> */}

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
                                        <Grid item xs={2}>
                                            <Link style={{textDecoration:"none"}} className="remove" onClick={() => removeProduct(card1.productId)}>Remove</Link>
                                        </Grid>
                                    </Grid>
                                    <br/>
                                </div>
                            ))
                        }
                    </div>
                </Paper>
            )
        // }
    }
}
export default BuyingThings;
