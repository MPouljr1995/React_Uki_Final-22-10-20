import React, { Component } from "react";

import './Css/HomePage.css';
import ShopApi from '../ApiServices/ShopApi';
import {DataContext} from '../Card/Data'

import Ibaseshop from './Image/ibaseshopLogo.png';

import { Paper, AppBar, Toolbar, Button, IconButton } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import LocationOnIcon from '@material-ui/icons/LocationOn';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

class HomePage extends Component {

  static contextType = DataContext;

    constructor(props){
        super(props);
        this.state = {
          search:'',
          locationSelectDiv:'show',
          currentUser: undefined,
          logIn:false,
          shopOwner:false,
          showAdminBoard:false,
          shopName:'',
          shopId:''
        };
    }
    
      componentDidMount(){
          let user;
          if (localStorage.getItem('userName')) {
            user = {
              username: localStorage.getItem('userName'),
              id: localStorage.getItem('userId'),
              // email: localStorage.getItem('email'),
              roles: localStorage.getItem('roles'),
            };

            this.setState({
              currentUser: user,
              logIn:true,
              showAdminBoard: user.roles.includes("USER_ROLE")
            });

            ShopApi.GetShopIdByUserId(localStorage.getItem("userId"))
            .then((res) =>{
                console.log(res);
                if (res.data === '') {
                  this.setState({shopOwner:false})
                } else {
                  this.setState({shopOwner:true})
                }
                localStorage.setItem("ShopId",res.data.shopId);
                this.setState({
                  shopName:res.data.shopName,
                  shopId: res.data.shopId
                })
                // window.reload();
            })
          }

          console.log(user);
          console.log(localStorage.getItem("userId"));
          console.log(localStorage.getItem("ShopId"));
      };
    
      onChangeSearch = (e) =>{
        this.setState({
          search:e.target.value
        })

      }
    

      search = () =>{
        //alert('hiii')
        // window.location.href=`/search/${this.state.search}`
        window.location.href=`?search=${this.state.search}&minPrice=0&maxPrice=10000000&warranty=0`
      }

    
      logOut = () => {
          localStorage.clear();
          window.location.href='./';
          window.location.reload();
        }
        


    render() {
      const {cart} = this.context;

        const { currentUser } = this.state;

        return(
          <div>
              <div className="App">
                <AppBar  className='App-AppBar' style={{backgroundColor:'#03a9f4', color:'white'}}>
                  <Toolbar>
                    <IconButton edge="start"   color="inherit" aria-label="menu">
                        <MenuIcon style={{fontSize:'40px'}} />
                    </IconButton>
                    <Button href="/" className='App-LogoDiv'><img src={Ibaseshop} alt='ibase' style={{width:'50px',color:'white'}}/><strong style={{fontSize:'20px',marginTop:'10px',color:'white'}} className='logoText'>Ibaseshop</strong></Button>

                    <div className='App-SearchDiv'>
                        <IconButton edge="start"  onClick={this.search} style={{width:'45px',height:'45px',marginTop:'2px',marginLeft:'2px',float:'right'}} >
                            <SearchIcon style={{fontSize:'40px'}} />
                        </IconButton>
                      <input type='text' value={this.state.search} placeholder="Search for electronics" onChange={this.onChangeSearch} className='searchIP'/>
                    </div>

                    <Paper style={{'backgroundColor': '#1a237e', 'color': '#c5cae9','flexGrow': '1'}} elevation={0}>
                    </Paper>

                    <Paper style={{backgroundColor: '#03a9f4', color: '#fff',}} elevation={0}>

                      {/* {this.state.showAdminBoard&& (
                        <Button href="/admin" style={{fontSize:'17px',color:'white'}}>
                          <strong>Admin</strong>
                        </Button>
                      )} */}
                      
                      <Button href="/addcard" style={{fontSize:'17px',color:'white'}}>
                        <ShoppingCartIcon style={{height:'30px'}}/>
                        <span className='cardLength'>{cart.length}</span>
                        <strong>Cart</strong>
                      </Button>
                      {/* <Button style={{fontSize:'17px',color:'white'}}>
                        <LocationOnIcon style={{height:'30px',}}/>
                        <strong>jaffna</strong>
                      </Button> */}

                      {/* {this.state.shopOwner &&(
                        <Button href="/addproduct" style={{fontSize:'17px',color:'white'}}>
                          <strong>add product</strong>
                        </Button>
                      )} */}

                      {!this.state.logIn&&(
                          <Button href="/signin" style={{fontSize:'17px',color:'white'}}>
                                <strong>SignIn</strong>
                          </Button>
                      )}

                      {this.state.logIn&&(
                        <PopupState variant="popover" popupId="demo-popup-menu"  >
                          {(popupState) => (
                            <React.Fragment>
                              <Button  style={{fontSize:'17px',fontWeight:'bold',color:'white'}} {...bindTrigger(popupState)}>
                                <AccountCircle style={{height:'30px',marginRight:'5px'}}/>{currentUser.username}
                              </Button>
                              <Menu {...bindMenu(popupState)} style={{marginTop:'40px'}} >
                                <MenuItem onClick={popupState.close} style={{width:'160px'}} ><a href="/profile" style={{color:'black',textDecoration:'none'}}>{currentUser.username}</a></MenuItem>
                                
                                {!this.state.shopOwner &&(
                                  <MenuItem onClick={popupState.close}><a href="/createshop" style={{color:'black',textDecoration:'none'}}>CREATE SHOP</a></MenuItem>
                                )}

                                {this.state.shopOwner &&( 
                                  <MenuItem onClick={popupState.close}><a href={"/shopprofileviwe/"+ this.state.shopId}  style={{color:'black',textDecoration:'none'}}>{this.state.shopName} </a> </MenuItem>
                                )}

                                {this.state.showAdminBoard&& (
                                  <MenuItem onClick={popupState.close}><a href="/admin" style={{color:'black',textDecoration:'none'}}>ADDMIN</a> </MenuItem>
                                )}
                                
                                <MenuItem onClick={popupState.close} onClick={this.logOut}>Log Out</MenuItem>
                              </Menu>
                            </React.Fragment>
                          )}
                        </PopupState>
                      )}
                    </Paper>
                  </Toolbar>

                  {/* <div className='topBar2'>
                    <Button href="/shopprofile" style={{fontSize:'17px',color:'red',height:'30px',marginLeft:'90px'}}>
                      <strong>AllShop</strong>
                    </Button>
                  </div> */}
                </AppBar>    
              </div>
          </div>
        )
    }
}
export default HomePage;