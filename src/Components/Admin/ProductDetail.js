import React, { Component } from 'react';
import { CardActionArea,CardMedia } from '@material-ui/core';
import { Card, CardContent, Grid, Box,Button,Typography } from '@material-ui/core';
// import Rating from 'material-ui-rating'

import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
// import SaveIcon from '@material-ui/icons/Save';
// import Close from '@material-ui/icons/Close';
// import AccountBox from '@material-ui/icons/AccountBox';
import AddBox from '@material-ui/icons/AddBox';



// import ApiService from "../../ApiService";

import './AdminCss/ProductDetail.css';
import ProductApi from '../ApiServices/ProductApi';



const style ={
    display: 'flex',
    justifyContent: 'center'
}

class ProductDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            message: null
        }
        // this.deleteProduct = this.deleteProduct.bind(this);
        // this.editProduct = this.editProduct.bind(this);
        // this.addItem = this.addItem.bind(this);
        // this.reloadUserList = this.reloadUserList.bind(this);
    }

    componentDidMount() {
        this.reloadProductsList();
    }

    reloadProductsList = () => {
        ProductApi.getAllProduct()
        .then((res)=> {
          console.log(res)
          this.setState({products:res.data.data})
          console.log(this.state.products);
        })
    }

    deleteProduct = (productId) => {
        // ApiService.deleteProduct(productId)
        //    .then(res => {
        //        this.setState({message : 'User deleted successfully.'});
        //        this.setState({products: this.state.products.filter(product => product.id !== productId)});
        //    })
    }

    editProduct = (id) => {
        localStorage.setItem("editProduct", id);
        this.props.history.push(`/editProduct/${id}`);
    }

    addItem = () => {
        window.localStorage.removeItem("productId");
        this.props.history.push('/addItem');
    }

    render() {
      const {products} = this.state;

      // const products=[
      //   {
      //     id:'phone1',
      //     title:'Apple iphone 11',
      //     imgName1:['https://pbs.twimg.com/media/EhBF69tU8AA30rM?format=jpg&name=small'],
      //     imgName2:['https://pbs.twimg.com/media/EhBF69tU8AA30rM?format=jpg&name=small'],
      //     imgName3:['https://pbs.twimg.com/media/EhBF69tU8AA30rM?format=jpg&name=small'],
      //     imgName4:['https://pbs.twimg.com/media/EhBF69tU8AA30rM?format=jpg&name=small'],
      //     imgName5:['https://pbs.twimg.com/media/EhBF69tU8AA30rM?format=jpg&name=small'],
      //     lastPrice:135000,
      //     salePrice:120000,
      //     warranty:12,
      //     rating:4,
      //     category:'Mobile And Tablets',
      //     description:'64GB ROM , 16GB RAM ,4G network support.',
      //     brand:'Apple',
      //     model:'iphone 11',
      //   },{
      //     id:'phone2',
      //     title:'sumsung galaxy j2',
      //     imgName1:'https://pbs.twimg.com/media/EhCtnLdU0AACxPE?format=jpg&name=360x360',
      //     imgName2:'https://pbs.twimg.com/media/EhCtnLdU0AACxPE?format=jpg&name=360x360',
      //     imgName3:'https://pbs.twimg.com/media/EhCtnLdU0AACxPE?format=jpg&name=360x360',
      //     imgName4:'https://pbs.twimg.com/media/EhCtnLdU0AACxPE?format=jpg&name=360x360',
      //     imgName5:'https://pbs.twimg.com/media/EhCtnLdU0AACxPE?format=jpg&name=360x360',

      //     lastPrice:18500,
      //     salePrice:15000,
      //     warranty:12,
      //     rating:2,
      //     category:'Mobile And Tablets',
      //     description:'64GB ROM , 16GB RAM ,4G network support.',
      //     brand:'Samsung',
      //     model:'iphone 11',
      //   },{
      //     id:'phone3',
      //     title:'One Plus black sheep killer',
      //     imgName1:'https://pbs.twimg.com/media/Egwzx1bVgAkM2xc?format=jpg&name=small',
      //     imgName2:'https://pbs.twimg.com/media/Egwzx1bVgAkM2xc?format=jpg&name=small',
      //     imgName3:'https://pbs.twimg.com/media/Egwzx1bVgAkM2xc?format=jpg&name=small',
      //     imgName4:'https://pbs.twimg.com/media/Egwzx1bVgAkM2xc?format=jpg&name=small',
      //     imgName5:'https://pbs.twimg.com/media/Egwzx1bVgAkM2xc?format=jpg&name=small',
      //     lastPrice:13500,
      //     salePrice:12000,
      //     warranty:12,
      //     rating:3,
      //     category:'Mobile And Tablets',
      //     description:'64GB ROM , 16GB RAM ,4G network support.',
      //     brand:'OnePlus',
      //     model:'OnePlus3',
      //   }
      // ];
        return (
            <div style={{width:'90%',margin:'auto',  marginTop:'50px',}}>
              <Box style={{width:'100%',backgroundColor:'white' ,height:'100px'}}>
                <Typography variant="h4" style={style}>Product Details</Typography>
                <Button variant="contained" style={{backgroundColor:'#03a9f4',color:'white',float:'right',marginRight:'30px',fontWeight:'bold'}} onClick={() => this.addItem()}><AddBox style={{marginRight:'5px'}}/>
                    Add Item
                </Button>
              </Box>


                <Grid container>
                {
                    products.map(product =>(
                          <Grid item xs={12} style={{marginTop:'20px'}}  >

                                  <Card className='productCardPD' key={product.productId}  elevation={5}>
                                    <CardActionArea >
                                      <Box className='productDetailShowImgDiv'>
                                        <CardMedia
                                          id='showImgPD1'
                                          component="img"
                                          image={product.image_1}
                                          title="Contemplative Reptile"
                                          class="img-responsive"
                                        />
                                        <CardMedia
                                          id='showImgPD2'
                                          component="img"
                                          image={product.image_2}
                                          title="Contemplative Reptile"
                                          class="img-responsive"
                                        />
                                        <CardMedia
                                          id='showImgPD3'
                                          component="img"
                                          image={product.image_3}
                                          title="Contemplative Reptile"
                                          class="img-responsive"
                                        />
                                        <CardMedia
                                          id='showImgPD4'
                                          component="img"
                                          image={product.image_4}
                                          title="Contemplative Reptile"
                                          class="img-responsive"
                                        />
                                        <CardMedia
                                          id='showImgPD5'
                                          component="img"
                                          image={product.image_5}
                                          title="Contemplative Reptile"
                                          class="img-responsive"
                                        />
                                      </Box>

                                      <CardContent>
                                        <Typography gutterBottom   id='productTitlePD'>
                                        Title :- {product.title}
                                        </Typography>
                                        <Typography gutterBottom   id='productTitlePD'>
                                        Brand :- {product.brand}
                                        </Typography>
                                        <Typography gutterBottom   id='productTitlePD'>
                                        Model :- {product.model}
                                        </Typography>
                                        <Typography gutterBottom   id='productTitlePD'>
                                        Category :- {product.category}
                                        </Typography>
                                        <Typography id='lastPrice' variant="h6">
                                          Last Price :- {product.lastPrice}
                                        </Typography>
                                          <Typography id='salePrice' variant="h6">
                                          Sale Price :-  {product.salePrice}
                                          </Typography>

                                          <Typography id='offerPrice'>
                                              Rating :- {product.rating} Stars
                                          </Typography>

                                          <Typography id='warranty'>
                                              Warranty :- {product.warranty} Months
                                          </Typography>

                                          <Typography gutterBottom   id='productTitlePD'>
                                          Description :- {product.description}
                                          </Typography>
                                      </CardContent>
                                    </CardActionArea>

                                    <Box style={{float:'right',marginRight:'30px', width:'250px',marginBottom:'30px'}} >
                                        <Button variant="contained" id="editBtn" style={{backgroundColor:'#03a9f4',color:'white',margin:'auto',fontWeight:'bold'}} onClick={() => this.editProduct(product.productId)} ><CreateIcon style={{marginRight:'5px'}}/>
                                        Edit
                                        </Button>
                                        <Button variant="contained" id="deleteBtn" style={{backgroundColor:'#03a9f4',color:'white',margin:'auto',fontWeight:'bold'}} onClick={() => this.deleteProduct(product.productId)} ><DeleteIcon style={{marginRight:'5px'}}/>
                                        Delete
                                        </Button>
                                    </Box>
                                  </Card>

                          </Grid>
                    ))
                }
                </Grid>

            </div>
        );
    }

}

export default ProductDetails;
