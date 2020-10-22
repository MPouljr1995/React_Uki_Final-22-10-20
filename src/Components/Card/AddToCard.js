import React, { Component } from 'react'
import {DataContext} from '../Card/Data'
import {Link} from 'react-router-dom'

import './CardCss/AddToCard.css'
import './CardCss/Detail.css'
import Box from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

export  class AddToCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            removeProductId:'',
            visible:'none',
            show:false,
            error:false,
            message:'',
            severity:'',
            alertTitle:'',
        }
    }

    static contextType = DataContext;

    componentDidMount(){
        this.context.getTotal();
    }

    remove = (productId) => {
        this.setState({
            removeProductId:`${productId}`,
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

    conformRemoveProduct =() => {
        this.context.removeProduct(this.state.removeProductId)

        this.setState({visible:'none',show:false})
    }

    render() {
        const {cart,increase,reduction,removeProduct,total} = this.context;

        if(cart.length === 0){
            return <h2 style={{textAlign:"center"}}>Nothings Product</h2>
        }else{
            return (

                <div>
                
                <div className= "fullBox" >
                    {
                        cart.map(item =>(
                            <div className="details cart" key={item.productId}>
                                <img src={item.image_1} alt=""/>
                                <div className="box">
                                    <div className="row">
                                        <h2>{item.title}</h2>
                                        <span> {item.sellPrice} * {item.count}=  Rs{item.sellPrice * item.count}</span>
                                    </div>

                                    <p>{item.description}</p>

                                    <div className="amount">
                                        <button className="count" onClick={() => reduction(item.productId)}> - </button>
                                        <span>{item.count}</span>
                                        <button className="count" onClick={() => increase(item.productId)}> + </button>
                                    </div>
                                </div>
                                {/* <div className="delete" onClick={() => removeProduct(item.productId)}>X</div> */}
                                <div className="delete" onClick={() => this.remove(item.productId)}>X</div>
                            </div>
                        ))
                    }
                    <div className="total">
                        <Link to="/payment">Buy all item</Link>
                        <h3>Total: Rs. {total}.00</h3>
                    </div>
                </div>

                <Box style={{display:this.state.visible,position: 'fixed',top: '0px',left:'0px',width:'100%',height:'100%',zIndex:'2', backgroundColor:'black',opacity:'0.8'}}  onClick={() => this.handlecoverHide()}></Box>
                        {this.state.show&&(
                          <Alert variant="filled" severity="warning" style={{position: 'fixed',top:'300px',width: '550px',zIndex: '3',left: `${window.innerWidth/2-275}px`,color:'white'}}
                                action={
                                    <Box style={{marginTop:'50px'}}>
                                      <Button color="inherit" size="small" style={{fontSize:'14px'}} onClick={() => this.handlecoverHide()} >
                                        Cancel
                                      </Button>
                                      <Button color="inherit" size="small" style={{fontSize:'14px'}} onClick={() => this.conformRemoveProduct()} >
                                        Remove
                                      </Button>
                                    </Box>
                                  }
                          >
                                <AlertTitle>Warning</AlertTitle>
                                Are you sure Remove this Product?

                          </Alert>
                        )}
                </div>
                )
            }
    }
}

export default AddToCard;
