import React, { Component } from 'react'
import ProductApi from '../ApiServices/ProductApi';

export const DataContext = React.createContext();

export class Data extends Component {

    state = {
        products:[],
        cart: [],
        total: 0,

        message:'',
        severity:'',
        AlertTitle:'',

        // visible:'none',
        // removeProductid:'',
        // show:false,
        // error:false,

        // payment:[],       
        // buyNowTotal:0,
    };

    

    addCart = (id) =>{
        const {products, cart} = this.state;
        const check = cart.every(item =>{
            return item.productId !== id
        })
        if(check){
            const data = products.filter(product =>{
                return product.productId === id
            })
            this.setState({cart: [...cart,...data]});
            this.getTotal();

            this.setState({
                message:'The product has been added to cart.',
                severity:'success',
                AlertTitle:'Success', 
            })

            setTimeout(() => {
                this.setState({message:''})
            },2000)

        }else{
            // alert("The product has been added to cart.")
            this.setState({
                message:'The product has been added to cart.',
                severity:'error',
                AlertTitle:'Error', 
            })

            setTimeout(() => {
                this.setState({message:''})
            },2000)
        }
    };

    increase = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item.productId === id){
                item.count += 1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    reduction = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item.productId === id){
                item.count === 1 ? item.count = 1 : item.count -=1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    removeProduct = id =>{
        // if(window.confirm("Do you want to delete this product?")){
            const {cart} = this.state;
            cart.forEach((item1, index) =>{
                if(item1.productId === id){
                    cart.splice(index, 1)
                }
            })
            this.setState({cart: cart});
            this.getTotal();
        // }       
    };
    /////////////////////////
    // remove2 = (id) =>{
    //     if(window.confirm("Do you want to delete this product?")){
    //         const {payment} = this.state;
    //         payment.forEach((item2, index) =>{
    //             if(item2.productId === id){
    //                 payment.splice(index, 1)
    //             }
    //         })
    //         this.setState({payment: payment});
    //         this.getbuyNowTotal();
    //     }       
    // };
    /////////////

    getTotal = ()=>{
        const{cart} = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.sellPrice * item.count);
        },0)
        this.setState({total: res})
    };

    // getbuyNowTotal = ()=>{
    //     const{payment} = this.state;
    //     const res = payment.reduce(( item) => {
    //         return  (item.sellPrice * item.count);
    //     },0)
    //     this.setState({buyNowTotal: res})
    // };

    //////////////////////////////////////////////////////////////
    // buythins =(id) =>{
    //     const {products, payment} = this.state;
    //     const data = products.filter(product =>{
    //         return product.productId === id
    //     })
    //     this.setState({payment: [...payment,...data]})
    //     this.getTotal();
    // }

    // buythins =(id) =>{
    //     const {products} = this.state;
    //     const data = products.filter(product =>{
    //         return product.productId === id
    //     })
    //     this.setState({payment: [...data]})
    //     this.getbuyNowTotal();

        // this.props.history.push({
        //     pathname:'/payment',
        //     thinsByNowIs : "true"
        // })
    // }
    ////////////////////////////////////////////////////////////
    
    componentDidUpdate(){
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))

        // localStorage.setItem('dataBuythins', JSON.stringify(this.state.payment))
        ////
        // localStorage.setItem('dataBuyNowTotal', JSON.stringify(this.state.buyNowTotal))
    };

    componentDidMount(){
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if(dataCart !== null){
            this.setState({cart: dataCart});
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if(dataTotal !== null){
            this.setState({total: dataTotal});
        }

        // const dataBuythins = JSON.parse(localStorage.getItem('dataBuythins'));
        // if(dataBuythins !== null){
        //     this.setState({payment: dataBuythins});
        // }
        //////
        // const dataBuyNowTotal = JSON.parse(localStorage.getItem('dataBuyNowTotal'));
        // if(dataBuyNowTotal !== null){
        //     this.setState({buyNowTotal: dataBuyNowTotal});
        // }

        this.productLoad();
    }

    productLoad = () => {
        ProductApi.getAllProduct()
        .then((res)=> {
          console.log(res);
          this.setState({products : res.data.data}) 
        })
    }

    render() {
        const {products, cart,total,message,severity,AlertTitle} = this.state;
        // console.log(this.state.cart);
        console.log(this.state.buyNowTotal);
        const {addCart,reduction,increase,removeProduct,getTotal} = this;
        return (
            <DataContext.Provider 
            value={{products, addCart, cart, reduction,increase,removeProduct,total,getTotal,message,severity,AlertTitle}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}