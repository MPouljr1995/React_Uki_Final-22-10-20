import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import AddBox from '@material-ui/icons/AddBox';
import Box from '@material-ui/core/Typography';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import OderApi from '../ApiServices/OderApi';
import CommonApi from '../ApiServices/CommonApi';
// import AccountBox from '@material-ui/icons/AccountBox';




const style ={
    display: 'flex',
    justifyContent: 'center'
}

class OrderDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            orders: [],
            ordersDetail: [],
            item:'',
            
            message: '',
            severity:'',
            alertTitle:'',

            visible:'none',

            deleteUserId:'',
            show:false,
            error:false,
            
        }
    }

    componentDidMount() {
        this.reloadOrderList();
    }

    reloadOrderList = () => {
        OderApi.getAllOders()
        .then((res) => {
            // console.log(res);
            this.setState({item : res.data});
            console.log(this.state.item);

            {
            this.state.item.map(item_1 => (
                CommonApi.getUserById(item_1.userId)
                .then((user) => {
                    // console.log(user);
                    let oneUser = user.data;
                    console.log(oneUser);

                    this.setState(prevState => ({
                        ordersDetail: [...prevState.ordersDetail, {
                            "oderId" :item_1.orderId,
                            "userName":oneUser.userName,
                            "address":oneUser.address,
                            "email" :oneUser.email,
                            "orderDateTime":item_1.orderDateTime,
                            "totalPrice":item_1.totalPrice,
                            "orderId":item_1.orderId,
                            "userId":item_1.userId,
                            "buyProductDetails":item_1.buyProductDetails,
                            
                        }]
                    }))

                    // {
                    //     item_1.buyProductDetails.map(item_2 =>(
                    //         console.log(item_2),
                    //         this.setState(prevState => ({
                    //             ordersDetail: [{...prevState.ordersDetail {
                                    
                    //                 "buyProductId":item_2.buyProductId,
                    //                 "quantity":item_2.quantity,
                    //                 "price":item_2.price,
                                        
                    //             }]
                    //         }))
                    //     ))
                    // }

                    
                })    
            ))}
        
        })

        .catch((error) => {
            console.log("error..");
        })
        console.log("res............");
    }

    deleteOrder = (orderId) => {
        this.setState({
            deleteOrderId:`${orderId}`,
            visible:'block',
            show:true,
            error:false,
        })
    }

    handlecoverHide = (e) =>{
        this.setState({
          visible:'none',
          show:false,
          error:false,
          message:'',
          severity:'',
          alertTitle:'',
        })
    }

    conformDeleteProduct = () =>{

        OderApi.deleteOderById(this.state.deleteOrderId)
           .then(res => {
               this.setState({message:'Order deleted successfully.',severity:'success',alertTitle:'Success',show:false,error:false,visible:'none'});
               this.setState({ordersDetail: this.state.ordersDetail.filter(ordersDetail => ordersDetail.orderId !== this.state.deleteOrderId)})
               setTimeout(() => {
                  this.setState({message:'',severity:'',alertTitle:''});
               },2500)
           })
           .catch(error => {
               this.setState({message:'Order delete Failed.',severity:'error',alertTitle:'Failed',rror:true,show:false,visible:'none'});
               setTimeout(() => {
                   this.setState({message:'',severity:'',alertTitle:'',error:false,show:false});
               },2500);
           })

    }

    // deleteOrder = (orderId) => {
    //     // ApiService.deleteOrder(orderId)
    //     //    .then(res => {
    //     //        this.setState({message : 'User deleted successfully.'});
    //     //        this.setState({orders: this.state.orders.filter(order => order.id !== orderId)});
    //     //    })
    //     console.log(this.state.ordersDetail);
    // }

    editOrder = (id) => {
        window.localStorage.setItem("editOrder", id);
        this.props.history.push('/editOrder');
    }

    addOrder = () => {
        window.localStorage.removeItem("orderId");
        this.props.history.push('/addOrder');
    }

    render() {
        const {ordersDetail} =this.state;
   
        return (
            <div style={{width:'90%',margin:'auto', backgroundColor:'white' , marginTop:'50px',}}>
                <Typography variant="h4" style={style}>Order Details</Typography>
                {/* <Button variant="contained" style={{backgroundColor:'#03a9f4',color:'white',float:'right',marginRight:'30px',fontWeight:'bold'}} onClick={() => this.addOrder()}><AddBox style={{marginRight:'5px'}}/>
                    Add Order
                </Button> */}

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">USER NAME</TableCell>
                            <TableCell align="center">ODER ID</TableCell>
                            <TableCell align="center">TIME</TableCell>
                            <TableCell align="left">TOTAL PRICE</TableCell>
                            <TableCell align="center"> Buy Product Details</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Address</TableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ordersDetail.map(row => (
                            <TableRow key={row.orderId}>
                                <TableCell align="center">{row.userName}</TableCell>
                                <TableCell align="center">{row.orderId}</TableCell>
                                <TableCell align="center">{row.orderDateTime}</TableCell>
                                <TableCell align="center">{row.totalPrice}</TableCell>

                                <TableCell align="center">
                                    <TableRow>
                                        <TableCell align="center">Index</TableCell>
                                        <TableCell align="center">Product Id</TableCell>
                                        <TableCell align="center">Shop Id</TableCell>
                                        <TableCell align="center">Quantity</TableCell>
                                        <TableCell align="center">Price</TableCell>
                                    </TableRow>
                                    {row.buyProductDetails.map((row2, index)=>(
                                    <TableRow key={index}>
                                        <TableCell align="center">{index+1}</TableCell>
                                        <TableCell align="center">{row2.buyProductId}</TableCell>
                                        <TableCell align="center">{row2.shopId}</TableCell>
                                        <TableCell align="center">{row2.quantity}</TableCell>
                                        <TableCell align="center">{row2.price}</TableCell>
                                    </TableRow>
                                    ))}
                                </TableCell>

                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{row.address}</TableCell>
                                {/* <TableCell align="left" onClick={() => this.editOrder(row.orderId)}><CreateIcon /></TableCell> */}
                                <TableCell align="center" style={{cursor: "pointer"}} onClick={() => this.deleteOrder(row.orderId)}><DeleteIcon /></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Box style={{display:this.state.visible,position: 'fixed',top: '0px',left:'0px',width:'100%',height:'100%',zIndex:'2', backgroundColor:'black',opacity:'0.8'}}  onClick={() => this.handlecoverHide()}></Box>
                        {this.state.show&&(
                          <Alert variant="filled" severity="warning" style={{position: 'fixed',top:'300px',width: '550px',zIndex: '3',left: `${window.innerWidth/2-275}px`,color:'white'}}
                                action={
                                    <Box style={{marginTop:'50px'}}>
                                      <Button color="inherit" size="small" style={{fontSize:'14px'}} onClick={() => this.handlecoverHide()} >
                                        Cancel
                                      </Button>
                                      <Button color="inherit" size="small" style={{fontSize:'14px'}} onClick={() => this.conformDeleteProduct()} >
                                        Delete
                                      </Button>
                                    </Box>
                                  }
                          >
                                <AlertTitle>Warning</AlertTitle>
                                Are you sure delete this product?

                          </Alert>
                        )}

            </div>
        );
    }

}

export default OrderDetail;
