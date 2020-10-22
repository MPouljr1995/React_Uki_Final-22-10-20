import React,{Component} from 'react';
import { Card,  Grid,CardActionArea } from '@material-ui/core';
import { Paper, Typography} from "@material-ui/core";

import User from './AdminImage/user.png';
import Shop from './AdminImage/shop.png';
import Order from './AdminImage/order.png';

import './AdminCss/AdminBord.css';

class AdminBord extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render(){
    return(
      <div id="adminMainDiv">
          <Grid container spacing={5}>
              <Grid item xs={12} sm={12} md={6}>
                  <Card id="shopDetailsDiv">
                    <CardActionArea style={{width:'100%',height:'100%',}} href="/shopdetails">
                      <Typography variant="h4" id="shopDetailsTitle">Shop Details</Typography>
                      <img src={Shop} alt='shop' style={{height:'220px',display:'flex',margin:'auto',marginTop:'15px'}} />
                    </CardActionArea>
                  </Card>
              </Grid>



              <Grid item xs={12} sm={12} md={6}>
                  <Paper id="userDetailsDiv">
                    <CardActionArea style={{width:'100%',height:'100%',}} href="/userdetails">
                      <Typography variant="h4" id="userDetailsTitle">User Details</Typography>
                      <img src={User} alt='shop' style={{height:'250px'}} />
                    </CardActionArea>
                  </Paper>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                  <Paper id="productDetailsDiv">
                    <CardActionArea style={{width:'100%',height:'100%',}} href="/productdetails">
                      <Typography variant="h4" id="productDetailsTitle">Product Details</Typography>
                    </CardActionArea>
                  </Paper>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                  <Paper id="orderDetailsDiv">
                    <CardActionArea style={{width:'100%',height:'100%',}} href="/orderdetails">
                      <Typography variant="h4" id="orderDetailsTitle">Order Details</Typography>
                      <img src={Order} alt='shop' style={{height:'220px',display:'flex',margin:'auto',marginTop:'15px'}} />
                    </CardActionArea>
                  </Paper>
              </Grid>
          </Grid>
      </div>
    )
  }
}
export default AdminBord;
