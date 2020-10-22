import React, { Component } from 'react';
import './ShopCss/OneShopProfile.css'

import {DataContext} from '../Card/Data';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import {Grid,Card,CardContent,Typography,Button, CardActions} from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

// import Photo from './ShopImage/phone4.jpg'
import ShopApi from '../ApiServices/ShopApi';
import ProductApi from '../ApiServices/ProductApi';

class OneShopProfile extends Component {
    constructor(props){
        super(props)
        this.state={
            shop:[],
            product:[],
            showEditPutton:false,
        }
    }

    static contextType = DataContext;

    componentDidMount() {
        const shopid = this.props.match.params.shopid;
        // console.log(searchKey);
        if(shopid) {
        this.getShop(shopid)
        this.getProductsForOneShop(shopid)
        }
    }

    getShop(shopid) {
        ShopApi.GetShopById(shopid)
        .then((res) =>(
            this.setState({shop:res.data})
        ))

        if (localStorage.getItem('ShopId')== shopid) {
               this.setState({showEditPutton:true}) ;
        }
    }

    getProductsForOneShop(shopid) {
        ProductApi.getProductByShopId(shopid)
        .then(produ => (
            this.setState({product:produ.data})
        ))
    }


    editShop = (id) =>  {
        this.props.history.push('/editshop/'+ id);
        // window.location('/editshop/'+ id)
    }

    editProduct= (id)=> {
        this.props.history.push('/editproduct/'+ id);
    }
        

    render() {
        const {addCart,message,severity,AlertTitle} = this.context;
        const {shop,product} = this.state;
        return(
            <div>
                {message&&(
                    <div>
                        <Alert variant="filled" severity={severity} style={{position:"fixed",right:"100px",width:"550px", zIndex:"3",color:"white"}}>
                            <AlertTitle><p>{AlertTitle}</p></AlertTitle>
                            {message}
                        </Alert>

                    </div>
              )}
            
            


                <div style={{width:'90%',margin: "auto"}}>
            <Grid container spacing={3}>
                    <Grid item xs={12}>
                          <Card className= "shopCover" elevation= {10}>

                                    <CardMedia style={{width:'200px',height:'200px',marginTop:'30px',marginLeft:'30px'}}>
                                        {shop.shopLogo&&(
                                          <img src= {shop.shopLogo} alt="Logo" className= "ShopProfilePhoto"/>
                                        )}
                                    </CardMedia>

                                  <CardContent className="shopNameCover">
                                      <Typography gutterBottom variant="h5" component="h2" className="shopname" style={{fontWeight:'bold'}}>
                                          {shop.shopName}
                                      </Typography>

                                      <Typography>
                                        <Rating name="read-only" value={shop.rating} readOnly />
                                      </Typography>



                                  </CardContent>
                                  {/* {this.state.thisOwer&&( */}
                                    <Button id="shopEditeBtn" href={"/editShop/"+shop.shopId} >EDIT</Button>

                                  {/* )} */}
                                  {/* {this.state.thisOwer&&( */}

                                    <Button id="shopEditeBtn" href="/addproduct">Add Product</Button>
                                  {/* )} */}


                          </Card>
                    </Grid>
                 </Grid>

                {/* ///////////////////////////////////////////////// */}
                <Grid container spacing={3}>
                    {
                        product && (
                            product.map(product => (
                                <Grid item xs={6} sm={4} md={3} lg={3} style={{marginTop:'20px'}}>
                                <Card className='productCard'   elevation={3}>
                            <CardActionArea >
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
                                    <Rating name="read-only" value={product.rating} readOnly  />
                                </Typography>
                            </CardContent>
                            </CardActionArea>
                            <CardActions >
                            
                            {/* {!this.state.showEditPutton && ( */}
                               
                                <Button href={`/buynowpayment/${product.productId}`} variant="contained" id="btn" style={{backgroundColor:'#03a9f4',color:'white',margin:'auto'}} >
                                <ShoppingBasketIcon/> BUY NOW
                              </Button>
                              <Button  onClick={()=> addCart(product.productId)} variant="contained" style={{backgroundColor:'#03a9f4',color:'white',margin:'auto'}} >
                                 <ShoppingCartIcon/> ADD TO CARD
                              </Button>
                             
                            {/* )} */}
                            
                            {/* {this.state.showEditPutton && ( */}
                                {/* <Button  onClick={()=>this.editProduct(product.productId)}  variant="contained" style={{backgroundColor:'#03a9f4',color:'white',margin:'auto'}} >
                                EDIT
                                </Button> */}
                            {/* )} */}
                            
                            </CardActions>
                            </Card>
                            </Grid>
                            ))
                        )
                        
                    }               
            </Grid>
            </div>
        </div> 
        )
    }
}
export default OneShopProfile;


// import React, { Component } from 'react'
// import {Link} from 'react-router-dom'
// import {DataContext} from '../Card/Data';
// import './ShopCss/OneShopProfile.css'

// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

// import ShopApi from '../ApiServices/ShopApi';
// import ProductApi from '../ApiServices/ProductApi';

// import Rating from 'material-ui-rating';
// import {Grid,Paper,Card,CardContent,Typography,Button, CardActions,CardMedia,CardActionArea,Box} from '@material-ui/core';

// export class OneShopProfile extends Component {
//   constructor(props) {
//     super(props)
//     this.state={
//       shop_owner_username:'',
//       userId:localStorage.getItem("userId"),


//       shop:[],
//       products:[],

//       shopId:"",
//       ownerId:"",
//       description:"",
//       address:"",
//       telephone:"",
//       product:"",
//       shopName:"",
//       shopLogo:"",
//       rating:"",

//       file1:"",

//       thisOwer:false,

//     };
//   }

//   componentDidMount(){
//     const shopId = this.props.match.params.id;
//     this.loadShop(shopId)
//     this.loadProduct(shopId)
//   }


//   loadShop = (shopId) => {
//     ShopApi.GetShopById(shopId)
//           .then((res) => {
//             //  console.log("shops :- " + res.data);
//               let shops = res.data;
//               this.setState({
//                   shop:shops,
//                   shopId: shops.shopId,
//                   ownerId: shops.ownerId,
//                   description: shops.description,
//                   address: shops.address,
//                   telephone: shops.telephone,
//                   product: shops.product,
//                   shopName: shops.shopName,
//                   shopLogo: shops.shopLogo,
//                   rating: shops.rating,

//                   file1: shops.shopLogo,
//               })
//               if(shops.ownerId == this.state.userId){
//                 this.setState({
//                   thisOwer:true,
//                 })
//               }else {
//                 this.setState({
//                   thisOwer:false,
//                 })
//               }

//           });

//   }


//   loadProduct = (shopId) => {
//     ProductApi.getProductByShopId(shopId)
//         .then((res) => {
//           let products = res.data;
//           this.setState({
//               products:products,
//           })
//         })
//   }

//     static contextType = DataContext;

//     state = {value:3};

//     render() {
//         const {addCart,buythins} = this.context;
//         const shop = this.state.shop;
//         const products = this.state.products;

//         return (
//             <div>
//                   <div style={{position:"relative",top:"50px"}}>
//                           <Card className= "shopCover" elevation= {10}>

//                                     <CardMedia style={{width:'200px',height:'200px',marginTop:'30px',marginLeft:'30px'}}>
//                                         {shop.shopLogo&&(
//                                           <img src= {shop.shopLogo} alt="Logo" className= "ShopProfilePhoto"/>
//                                         )}
//                                     </CardMedia>

//                                   <CardContent className="shopNameCover">
//                                       <Typography gutterBottom variant="h5" component="h2" className="shopname" style={{fontWeight:'bold'}}>
//                                           {shop.shopName}
//                                       </Typography>

//                                       <Typography>
//                                         <Rating name="read-only" value={shop.rating} readOnly />
//                                       </Typography>



//                                   </CardContent>
//                                   {this.state.thisOwer&&(
//                                     <Button id="shopEditeBtn" href={"/editShop/"+shop.shopId} >EDIT</Button>

//                                   )}
//                                   {this.state.thisOwer&&(

//                                     <Button id="shopEditeBtn" href="/additem">Add Product</Button>
//                                   )}


//                           </Card>


//                 <div  className='shopResultDiv'>
//                   <Grid container >
//                   {products&&(
//                           products.map(product =>(
//                               <Grid item xs={6} sm={4} md={3} lg={3} style={{marginTop:'20px'}}  >
//                                       <Card className='productCard' key={product.id}  elevation={3}>
//                                         <CardActionArea href={'/product/'+product.productId}>
//                                           <Box className='showImgDiv'>
//                                             <CardMedia
//                                               className='showImg'
//                                               component="img"
//                                               image={product.image1}
//                                               title="Contemplative Reptile"
//                                               class="img-responsive"
//                                               id="showImg"
//                                             />
//                                           </Box>
//                                           <CardContent>
//                                             <Typography gutterBottom  className='productTitle'>
//                                             {product.title}
//                                             </Typography>
//                                             <Typography className='offerPrice' variant="h6">
//                                               {product.lastPrice}
//                                             </Typography>
//                                               <Typography className='sellPrice' variant="h6">
//                                               {product.sellPrice}
//                                               </Typography>
//                                               <Typography className='offerPrice'>
//                                                   <Rating name="read-only" value={product.rating} readOnly style={{}} />
//                                               </Typography>
//                                           </CardContent>
//                                         </CardActionArea>
//                                         <CardActions >
//                                         <Button variant="contained" id="btn" style={{backgroundColor:'#03a9f4',color:'white',margin:'auto'}} >
//                                             Buy now
//                                         </Button>
//                                         <Button variant="contained" onClick={()=> addCart(product.productId)} style={{backgroundColor:'#03a9f4',color:'white',margin:'auto'}} ><ShoppingCartIcon/>
//                                             Add to cart
//                                         </Button>
//                                         </CardActions>
//                                         {this.state.thisOwer&&(
//                                             <Button variant="contained"  style={{backgroundColor:'#03a9f4',color:'white',display:'flex',margin:'auto',width:"80%"}} href={"/editProduct/"+product.productId} >
//                                                 Edit product
//                                             </Button>
//                                         )}
//                                         <br/><br/>
//                                       </Card>
//                               </Grid>
//                           ))
//                   )}

//                   </Grid>
//                 </div>
//             </div>
//         </div>
//     )
// }
// }

// export default OneShopProfile;
