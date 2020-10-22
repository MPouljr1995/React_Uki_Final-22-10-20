import React,{Component} from 'react';
import {Typography,CardActionArea,CardMedia } from '@material-ui/core';
import {Card, CardContent, Grid, FormControl, InputLabel, OutlinedInput, Box,Select, Button,CardActions } from '@material-ui/core';
import Rating from 'material-ui-rating'

import {DataContext} from '../Card/Data'

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import './Css/Search.css';
import ProductApi from '../ApiServices/ProductApi';


class Search extends Component {
  constructor(props) {
    super(props)
    this.state={
      searchKey:'',
      minPrice:'',
      maxPrice:'',
      warranty:'',
      products:[],
    };
  }

  static contextType = DataContext;


  componentDidMount() {
    const searchKey = this.props.match.params.id;
    console.log(searchKey);
    if(searchKey) {
      this.loadSearchProducts(searchKey)
    }

    // const authResult = new URLSearchParams(window.location.search);
    //  const searchKey = authResult.get('searchKey');

    //  const minPrice = authResult.get('minPrice');
    //  const maxPrice = authResult.get('maxPrice');
    //  // const sort = authResult.get('sort');
    //  const warranty = authResult.get('warranty');

    //  this.setState({
    //    minPrice:minPrice,
    //    maxPrice:maxPrice,
    //    warranty:warranty,
    //    searchKey:searchKey,
    //  })

    //  this.loadSearchProducts(searchKey,minPrice,maxPrice,warranty)
  }


  loadSearchProducts(searchKey) {
    ProductApi.getSearchProducts(searchKey)
    .then((res)=> {
      // console.log(res);
      this.setState({products:res.data.data});
      console.log(this.state.products);
    })
  }


  onChangeMinPrice = (e) =>{
    this.setState({
      minPrice:e.target.value,
    });
  }
  onChangeMaxPrice = (e) =>{
    this.setState({
      maxPrice:e.target.value,
    });
  }
  onChangeWarranty = (e) =>{
    this.setState({
      warranty:e.target.value,
    });
  }




  render(){

    const {addCart,message,severity,AlertTitle} = this.context;

    const {products} =this.state;

   
    return (
        <div>

              {message&&(
                    <div>
                        <Alert variant="filled" severity={severity} style={{position:"fixed",right:"100px",width:"550px", zIndex:"3",color:"white"}}>
                            <AlertTitle>{AlertTitle}</AlertTitle>
                            <p>{message}</p>
                        </Alert>

                    </div>
              )}


          <div className='searchMainDiv' >
            <Grid container spacing={5} >
              <Grid item xs={3}  >
                <Box  className='priceBox'>
                <Typography className='sortTitle'>Price (RS)</Typography>
                  <FormControl variant="outlined" className='minPriceInput'>
                    <InputLabel htmlFor="component-outlined">Min Price</InputLabel>
                    <OutlinedInput id="component-outlined" value={this.state.minPrice} onChange={this.onChangeMinPrice} label="Min Price" type='number' />
                  </FormControl>
                  <FormControl variant="outlined" className='maxPriceInput'>
                    <InputLabel htmlFor="component-outlined">Max Price</InputLabel>
                    <OutlinedInput id="component-outlined" value={this.state.maxPrice} onChange={this.onChangeMaxPrice} label="Max Price" type='number' />
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={3} >
                <Box  className='sortBox'>
                <Typography className='sortTitle'>Sort</Typography>
                <FormControl variant="outlined" className='sortSelect'>
                  <InputLabel htmlFor="outlined-age-native-simple">Sort</InputLabel>
                  <Select
                    native
                    value={this.state.gender}
                    onChange={this.handleChangeGender}
                    label="Sort"
                    inputProps={{
                      name: 'age',
                      id: 'outlined-age-native-simple',
                    }}
                  >

                    <option value={'Best Match'}>Best Match</option>
                    <option value={'Price: Hight to low'}>Price: Hight to low</option>
                    <option value={'Price: Low to Height'}>Price: Low to height</option>
                  </Select>
                </FormControl>
                </Box>
              </Grid>

              <Grid item xs={3} >
                <Box  className='warrantyBox'>
                <Typography className='sortTitle'>warranty (Month)</Typography>
                  <FormControl variant="outlined" className='warrantyInput'>
                    <InputLabel htmlFor="component-outlined">Warranty</InputLabel>
                    <OutlinedInput id="component-outlined" value={this.state.warranty} onChange={this.onChangeWarranty} label="warranty" type='number' />
                  </FormControl>

                </Box>
              </Grid>

              <Grid item xs={3}  >
                <Box  className='applyBtnBox'>
                  <Button variant="contained" style={{backgroundColor:'#03a9f4',color:'white'}} className='applyBtn'>
                  <b>Apply</b>
                  </Button>
                  <br/>
                  <Button variant="contained" href="/" style={{backgroundColor:'#03a9f4',color:'white'}} className='applyBtn'>
                  <b>BACK</b>
                  </Button>
                </Box>
              </Grid>
            </Grid>

          </div>

          <div  className='searchResultDiv'>
            <Grid container >
              {
                  products.map(product =>(
                        <Grid item xs={6} sm={4} md={3} lg={3} style={{marginTop:'20px'}}  >

                                <Card className='productCard' key={product.productId}  elevation={3}>
                                  <CardActionArea href={`/products/${product.productId}`}>
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
                                  <Button href={`/buynowpayment/${product.productId}`} variant="contained" id="btn" style={{backgroundColor:'#03a9f4',color:'white',margin:'auto'}} >
                                      <ShoppingBasketIcon/> BUY NOW
                                  </Button>
                                  <Button onClick={()=> addCart(product.productId)} variant="contained" style={{backgroundColor:'#03a9f4',color:'white',margin:'auto'}} >
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

export default Search;
