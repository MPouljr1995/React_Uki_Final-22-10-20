import React, { Component } from 'react';
import './ShopCss/ShopProfile.css'

import {Grid,Card,CardContent,Typography} from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Rating from '@material-ui/lab/Rating';
// import Box from '@material-ui/core/Box';

import Photo from './ShopImage/phone4.jpg'
import ShopApi from '../ApiServices/ShopApi';



class ShopProfile extends Component {

    constructor(props){
        super(props)
        this.state={
            shops:[]
        }
    }

    componentDidMount() {
        this.loadAllShops();
    }
    
    loadAllShops = () => {
        ShopApi.GetAllShops()
        .then((res)=> {
          console.log(res);
          this.setState({shops : res.data.content})
        })
    }



    render(){
        return(
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {
                        this.state.shops.map(shop =>(
                            <Card className= 'shopProfileMain' key={shop.shopId}>
                                <CardActionArea href={`shopprofileviwe/${shop.shopId}`}>
                                    <Grid container>
                                        <Grid item xs={5}>
                                            <CardMedia>
                                                <img src= {shop.shopLogo} alt="Logo"/>
                                            </CardMedia>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {shop.shopName}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {shop.description}
                                                </Typography> 
                                                <Rating name="read-only" value={shop.rating} readOnly />   
                                            </CardContent>
                                        </Grid>        
                                    </Grid>                                   
                                </CardActionArea>                                   
                            </Card>
                        ))
                    }
                </Grid>
            </Grid>
        )
    }


}
export default ShopProfile;