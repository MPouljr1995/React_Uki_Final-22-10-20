import React, { Component } from "react";
import {Link} from 'react-router-dom';
import Rating from 'material-ui-rating';
import {Typography,CardActionArea,CardMedia } from '@material-ui/core';
import {Card, CardContent, Grid, Box, Button,CardActions } from '@material-ui/core';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import {DataContext} from '../Card/Data'

import './Css/HomePageProduct.css';
import coverphoto from './Image/banner.jpg'

import ProductApi from "../ApiServices/ProductApi";


class HomePageProductView extends Component {
    constructor(props){
        super(props);
        this.state = {
            products:[]
        }
    }

    ////////////////////////////////////////////////
    static contextType = DataContext;
    //////////////////////////////////////////////////////

    componentDidMount() {
        this.productLoad();
    }

    productLoad = () => {
        ProductApi.getAllProduct()
        .then((res)=> {
          console.log(res);
          this.setState({products : res.data.data}) 
        })
    }



    render(){
      const {addCart,message,severity,AlertTitle} = this.context;
      ///////////////////////////////////////////////////////////////////////////
        const {products} = this.state;
        return(
          <div>
              {message&&(
                    <div>
                        <Alert variant="filled" severity={severity} style={{position:"fixed",right:"100px",width:"550px", zIndex:"3",color:"white"}}>
                            <AlertTitle>{AlertTitle}</AlertTitle>
                            <p>{message}</p>
                        </Alert>

                    </div>
              )}



            <div className='Home' style={{backgroundColor:'#d4e3fc'}}>
              <div className='homeImgDiv'>
                <div className='homeImgWar'>
                <img src={coverphoto} className='homeImg' />
                </div>
              </div>
    
              </div>

            <div  className='searchResultDiv'>
            <Grid container >
              {
                  products.map(product =>(
                        <Grid item xs={6} sm={4} md={3} lg={3} style={{marginTop:'20px'}}  >

                                <Card className='productCard' key={product.productId}  elevation={3}>
                                  <CardActionArea href={`products/${product.productId}`}>
                                    <Box className='showImgDiv'>
                                      <CardMedia
                                        className='showImg'
                                        component="img"
                                        image={product.image_1}
                                        title="Contemplative Reptile"
                                        class="img-responsive"
                                        id="showImg"

                                      />
                                    </Box>

                                    <CardContent>
                                      <Typography gutterBottom  className='productTitle'>
                                      {product.title}
                                      </Typography>
                                      <Typography className='offerPrice' variant="h6">
                                        {product.lastPrice}
                                      </Typography>
                                        <Typography className='sellPrice' variant="h6">
                                        {product.sellPrice}
                                        </Typography>

                                        <Typography className='offerPrice'>
                                            <Rating name="read-only" value={product.rating} readOnly style={{}} />
                                        </Typography>
                                    </CardContent>
                                  </CardActionArea>
                                  <CardActions >
                                  <Button href={`/buynowpayment/${product.productId}`}  variant="contained" id="btn" style={{backgroundColor:'#03a9f4',color:'white',margin:'auto'}} >
                                        <ShoppingBasketIcon/> BUY NOW
                                  </Button>
                                  <Button  onClick={()=> addCart(product.productId)} variant="contained" style={{backgroundColor:'#03a9f4',color:'white',margin:'auto'}} >
                                      <ShoppingCartIcon/> ADD TO CARD
                                  </Button>
                                  </CardActions>
                                </Card>

                        </Grid>
                  ))
              }


            </Grid>
          </div>
        </div>
        )
    }

}
export default  HomePageProductView;