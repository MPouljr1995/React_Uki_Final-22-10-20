import React,{Component} from 'react';

import './ProductCss/ProductView.css';
import {DataContext} from '../Card/Data';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import {  Typography,CardMedia,Paper,Divider,Link, } from '@material-ui/core';
import { Grid, FormControl, Box,Select, Button, } from '@material-ui/core';
import Rating from 'material-ui-rating';

import SignIn from '../Common/SignIn';
import ProductApi from '../ApiServices/ProductApi';
import ShopApi from '../ApiServices/ShopApi';
import FeedbackApi from '../ApiServices/FeedbackApi';
import CommonApi from '../ApiServices/CommonApi';





class ProductView extends Component {
  constructor(props){
      super(props)
      this.state={
          quantity:'',
          userName:localStorage.getItem('userName'),
          logInAlert:'none',

          //img view set
          viewImg1:'',
          viewImg2:'',
          viewImg3:'',
          viewImg4:'',
          viewImg5:'',

          imgBtnBorder1:'1px solid black',
          imgBtnBorder2:'',
          imgBtnBorder3:'',
          imgBtnBorder4:'',
          imgBtnBorder5:'',


          productId:'' ,
          shopId:'' ,
          title:'' ,
          description:'' ,
          lastPrice:'' ,
          sellPrice:'' ,
          warranty:'' ,
          rating:'' ,
          stock:'' ,
          brand:'' ,
          model:'' ,
          image_1:'' ,
          image_2:'' ,
          image_3:'' ,
          image_4:'' ,
          image_5:'' ,
          category:'',

          //this is shop data
          shopName: '',
          shopAddress: '',

          //Feedback...........
          feedback:[],
          haveFeedback:false,

      };
}

static contextType = DataContext;





  handleChangeQuantity=(e) =>{
    this.setState({
      quantity:e.target.value,
    });
  }

  handleImgChange=(e) =>{
    if(e==='listImg1'){
        this.setState({
          viewImg1:'block',

          viewImg2:'none',
          viewImg3:'none',
          viewImg4:'none',
          viewImg5:'none',



          imgBtnBorder1:'1px solid black',

          imgBtnBorder2:'none',
          imgBtnBorder3:'none',
          imgBtnBorder4:'none',
          imgBtnBorder5:'none',
        });
    }else if (e==='listImg2'){
      this.setState({
        viewImg2:'block',

        viewImg1:'none',
        viewImg3:'none',
        viewImg4:'none',
        viewImg5:'none',


        imgBtnBorder2:'1px solid black',

        imgBtnBorder1:'none',
        imgBtnBorder3:'none',
        imgBtnBorder4:'none',
        imgBtnBorder5:'none',
      });
    }
    else if (e==='listImg3'){
      this.setState({
        viewImg3:'block',

        viewImg1:'none',
        viewImg2:'none',
        viewImg4:'none',
        viewImg5:'none',


        imgBtnBorder3:'1px solid black',

        imgBtnBorder2:'none',
        imgBtnBorder1:'none',
        imgBtnBorder4:'none',
        imgBtnBorder5:'none',
      });
    }
    else if (e==='listImg4'){
      this.setState({
        viewImg4:'block',

        viewImg1:'none',
        viewImg2:'none',
        viewImg3:'none',
        viewImg5:'none',


        imgBtnBorder4:'1px solid black',

        imgBtnBorder2:'none',
        imgBtnBorder3:'none',
        imgBtnBorder1:'none',
        imgBtnBorder5:'none',
      });
    }
    else if (e==='listImg5'){
      this.setState({
        viewImg5:'block',

        viewImg1:'none',
        viewImg2:'none',
        viewImg3:'none',
        viewImg4:'none',


        imgBtnBorder5:'1px solid black',

        imgBtnBorder2:'none',
        imgBtnBorder3:'none',
        imgBtnBorder4:'none',
        imgBtnBorder1:'none',
      });
    }
  }



      onChangeUsername = (e) => {
        this.setState({
          username: e.target.value
        });
      }

      onChangePassword = (e) => {
        this.setState({
          password: e.target.value
        });
      }




      buyItNowFun = (e) =>{
      {!this.state.username &&(
        this.setState({
          logInAlert:`${e}`,
        })
      )}

      // {!localStorage.setItem('userId') &&(
      //   this.setState({
      //     logInAlert:`${e}`,
      //   })
      // )}

      }

  componentDidMount() {
    const productId = this.props.match.params.id;
    // console.log(productId);
    if(productId) {
      this.loadProductDetail(productId);
    }
  }

  loadProductDetail(productId){
    ProductApi.getProductById(productId)
    .then((res) => {
      // console.log(res);
      this.setState({
          productId:res.data.productId ,
          shopId:res.data.shopId ,
          title:res.data.title ,
          description:res.data.description,
          lastPrice:res.data.lastPrice ,
          sellPrice:res.data.sellPrice ,
          warranty:res.data.warranty ,
          rating:res.data.rating ,
          stock:res.data.stock ,
          brand:res.data.brand ,
          model:res.data.model ,
          image_1:res.data.image_1 ,
          image_2:res.data.image_2 ,
          image_3:res.data.image_3 ,
          image_4:res.data.image_4 ,
          image_5:res.data.image_5 ,
          category:res.data.category,
      })
      this.getShopDetail()
    })
  }

  getShopDetail() {
    ShopApi.GetShopById(this.state.shopId)
    .then((res) => {
        this.setState({
          shopName: res.data.shopName,
          shopAddress: res.data.address
        })

        this.getFeedbackByProductId()
    })
  }

  getFeedbackByProductId() {
    FeedbackApi.getFeedbackByProductId(this.state.productId)
    .then((res) => {
        let totalfeedback = res.data;
        this.setState({haveFeedback:true})
        {
          totalfeedback && (
            totalfeedback.map(feed =>(
              CommonApi.getUserById(feed.userId)
              .then((user) => {
                let user1 = user.data;

                this.setState(prevState => ({
                  feedback: [...prevState.feedback, {
                    "userName":user1.userName,
                    "feedback":feed.feedback,
                    "rating":feed.rating,
                    "date":feed.feedbackDate
                  }]
                }))
                
              })
            ))
          )
        }
    })
  }




  render(){
    const {addCart,message,severity,AlertTitle} = this.context;


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

      <div id="productMainDiv">
          <Paper id="productBox" elevation={3}>
                <Grid container>

                      <Grid item xs={12} sm={12} md={6} lg={6} id="imgGrid">
                            <Paper id='productImgBox' elevation={3}>
                                  <CardMedia
                                    Id='productImg1'
                                    component="img"
                                    image={this.state.image_1}
                                    class="img-responsive"
                                    style={{display:this.state.viewImg1}}
                                  />
                                  <CardMedia
                                    Id='productImg2'
                                    component="img"
                                    image={this.state.image_2}
                                    class="img-responsive"
                                    style={{display:this.state.viewImg2}}
                                  />
                                  <CardMedia
                                    Id='productImg3'
                                    component="img"
                                    image={this.state.image_3}
                                    class="img-responsive"
                                    style={{display:this.state.viewImg3}}
                                  />
                                  <CardMedia
                                    Id='productImg4'
                                    component="img"
                                    image={this.state.image_4}
                                    class="img-responsive"
                                    style={{display:this.state.viewImg4}}
                                  />
                                  <CardMedia
                                    Id='productImg5'
                                    component="img"
                                    image={this.state.image_5}
                                    class="img-responsive"
                                    style={{display:this.state.viewImg5}}
                                  />
                            </Paper>
                            <Paper id="imgListBox" elevation={4}>
                              <Button id="imgBtn1" onClick={() => this.handleImgChange('listImg1')}   style={{border:this.state.imgBtnBorder1}}>
                                <CardMedia
                                  Id='listImg1'
                                  component="img"
                                  image={this.state.image_1}
                                  class="img-responsive"

                                />
                              </Button>
                              <Button id="imgBtn2" onClick={() => this.handleImgChange('listImg2')} style={{border:this.state.imgBtnBorder2}}>
                                <CardMedia
                                  Id='listImg2'
                                  component="img"
                                  image={this.state.image_2}
                                  class="img-responsive"

                                />
                              </Button>
                              <Button id="imgBtn3" onClick={() => this.handleImgChange('listImg3')}   style={{border:this.state.imgBtnBorder3}}>
                                <CardMedia
                                  Id='listImg3'
                                  component="img"
                                  image={this.state.image_3}
                                  class="img-responsive"

                                />
                              </Button>
                              <Button id="imgBtn4" onClick={() => this.handleImgChange('listImg4')} style={{border:this.state.imgBtnBorder4}}>
                                <CardMedia
                                  Id='listImg4'
                                  component="img"
                                  image={this.state.image_4}
                                  class="img-responsive"

                                />
                              </Button>
                              <Button id="imgBtn5" onClick={() => this.handleImgChange('listImg5')} style={{border:this.state.imgBtnBorder5}}>
                                <CardMedia
                                  Id='listImg5'
                                  component="img"
                                  image={this.state.image_5}
                                  title="Contemplative Reptile"
                                  class="img-responsive"

                                />
                              </Button>
                            </Paper>
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={6} id="productInfoGrid">
                            <Paper id="productDetail" className="productDetail" elevation={0}>
                                <Typography gutterBottom  id='producViewTitle' elevation={0} variant="h3">
                                  {this.state.title}
                                </Typography>
                                <Box id='reviewInfoDiv' elevation={0}>
                                    <Box gutterBottom  id='ratingDiv' elevation={0} >
                                        <Rating name="read-only" value={this.state.rating} readOnly style={{}} /> <Link variant='span' id="reviewText" href="#feedbackMainDiv">10 Reviews</Link>
                                    </Box>
                                    <Typography gutterBottom  id='offer' elevation={0} variant="subtitle1">
                                        {this.state.lastPrice} Rs
                                    </Typography>
                                    <Typography gutterBottom  id='sellPrice' elevation={0} variant="subtitle1">
                                        {this.state.sellPrice} Rs
                                    </Typography>

                                    <Typography gutterBottom  id='warrantyDiv' elevation={0} variant="subtitle1">
                                      Warranty -  {this.state.warranty} Months
                                    </Typography>
                                    <Box gutterBottom  id='quantityDiv' elevation={0} variant="subtitle1">
                                      <Typography variant="span">Quantity :-</Typography>
                                        <FormControl variant="outlined" id="quantityIp">

                                            <Select
                                                Id="quantitySelect"
                                                native
                                                value={this.state.gender}
                                                onChange={this.handleChangeQuantity}
                                                inputProps={{
                                                  name:'quantity',
                                                  id:'outline-quantity-native-simple'
                                                }}
                                            >
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                                <option value={6}>6</option>
                                                <option value={7}>7</option>
                                                <option value={8}>8</option>
                                                <option value={9}>9</option>
                                                <option value={10}>10</option>
                                            </Select>
                                        </FormControl>
                                    </Box>

                                </Box>


                                <Box id="buyBtnArea" elevation={0}>

                                    {/* <Button Id="buyNowBtn" onClick={() => this.buyItNowFun('block')} ><ShoppingBasketIcon/> Buy Now</Button> */}

                                    <Button Id="buyNowBtn" href={`/buynowpayment/${this.state.productId}`} ><ShoppingBasketIcon/> Buy Now</Button>

                                    <Button Id="addToCartBtn" onClick={()=> addCart(this.state.productId)} ><ShoppingCartIcon/> Add To Cart</Button>

                                </Box>




                                <Divider id='divider'/>
                                <Box id='sellerInfoDiv' elevation={0}>
                                    <Typography gutterBottom  id='soldByText' elevation={0} variant="p">
                                        SOLD BY :
                                    </Typography>
                                    <Typography gutterBottom  id='soldShopName' elevation={0} variant="h6" >
                                        <Link href="/shop?shopId=id" id="shopLink">{this.state.shopName}</Link>
                                    </Typography>
                                    <Typography gutterBottom  id='soldShopAddress' elevation={0} variant="p">
                                        {this.state.shopAddress}
                                    </Typography>
                                    <Typography gutterBottom  id='soldShopRating' elevation={0} variant="p">

                                    </Typography>
                                </Box>
                            </Paper>

                      </Grid>

                </Grid>

          </Paper>



          <Box id="loginAlertDivWaraper" style={{display:this.state.logInAlert}} onClick={() => this.buyItNowFun('none')} elevation={3}>
          </Box>

          <Paper id="loginAlertDiv"  style={{ display:this.state.logInAlert, left: `${window.innerWidth/2-300}px` }} >
              <SignIn/>
          </Paper>



          {/* Description and feedback area */}

          <Paper id="DescriptionDivWarraper" elevation="3">
              <Grid container id="">
                    <Grid  item xs={12} >
                          <Typography id='descriptionHeading' variant="h5" id="desTitile" style={{marginLeft:'30px',marginTop:'20px'}}>Description</Typography>
                          <Box id="DescriptionDiv">
                              {this.state.description}
                          </Box>
                    </Grid>
              </Grid>
          </Paper>


          <Paper id="feedbackMainDiv" elevation="3">

              <Grid container id="feedbackSection">
                  <Typography id='descriptionHeading' variant="h5" id="desTitile" style={{marginLeft:'30px',marginTop:'20px'}}>Rating And Feedbacks</Typography>

                  {
                    this.state.feedback && (
                      this.state.feedback.map(oneFeedback =>(
                        <Paper  id="feedbackPaper" >
                              <Grid container>
                                  <Grid  item xs={12} md={4} id="nameAndRatingDivGrid">
                                        <Box id="nameAndRatingDiv">
                                            <Typography id="raterName"> {oneFeedback.userName}</Typography>
                                            <Typography id="feedbackRating"><Rating name="read-only" value={oneFeedback.rating} readOnly style={{}} /></Typography><Typography Id="feedbackRatingNumber">{oneFeedback.rating}</Typography>
                                            <Typography id="ratingDate"> {oneFeedback.date}</Typography>
                                        </Box>
                                  </Grid>
                                  <Grid  item xs={12} md={8} id="feedbackWarraperGrid">
                                        <Box id="feedbackDiv">
                                            <Typography id="feedbackText"> {oneFeedback.feedback} </Typography>
                                        </Box>
                                  </Grid>
                              </Grid>
                          </Paper>
                      ))
                    )
                  }
              </Grid>
          </Paper>
      </div>
      </div>
    );
  }
}
export default ProductView;
