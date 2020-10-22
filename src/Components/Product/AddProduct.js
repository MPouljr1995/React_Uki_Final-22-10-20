import React,{Component} from 'react';
import './ProductCss/AddProduct.css'

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import { Typography,Paper } from '@material-ui/core';
import { Grid, FormControl, InputLabel, Box,Select, Button } from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import AddImg from './ProductImage/add.png';
import ProductApi from '../ApiServices/ProductApi';

// import ApiService from "./../ApiService";



class AddProduct extends Component {
    constructor(props){
      super(props)
      this.state={
        message:'',
        productTitle:'',
        category:'',
        productDescription:'',
        productBrand:'',
        productModel:'',
        lastPrice:'',
        salePrice:'',
        warranty:'',
        rating:'',

        severity:'',
        AlertTitle:'',

        shopId:localStorage.getItem('ShopId'),


        file1: '',
        imagePreviewUrl1: '',

        file2: '',
        imagePreviewUrl2: '',

        file3: '',
        imagePreviewUrl3: '',

        file4: '',
        imagePreviewUrl4: '',

        file5: '',
        imagePreviewUrl5: '',
      }
    }



  _handleImg1Submit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file1);
  }





  _handleImage1Change1(e) {
    e.preventDefault();

    let reader1 = new FileReader();
    let file1 = e.target.files[0];

    reader1.onloadend = () => {
      this.setState({
        file1: file1,
        imagePreviewUrl1: reader1.result
      });
    }

    reader1.readAsDataURL(file1)
  }



  _handleImage1Change2(e) {
    e.preventDefault();

    let reader2 = new FileReader();
    let file2 = e.target.files[0];

    reader2.onloadend = () => {
      this.setState({
        file2: file2,
        imagePreviewUrl2: reader2.result
      });
    }

    reader2.readAsDataURL(file2)
  }


  _handleImage1Change3(e) {
    e.preventDefault();

    let reader3 = new FileReader();
    let file3 = e.target.files[0];

    reader3.onloadend = () => {
      this.setState({
        file3: file3,
        imagePreviewUrl3: reader3.result
      });
    }

    reader3.readAsDataURL(file3)
  }


  _handleImage1Change4(e) {
    e.preventDefault();

    let reader4 = new FileReader();
    let file4 = e.target.files[0];

    reader4.onloadend = () => {
      this.setState({
        file4: file4,
        imagePreviewUrl4: reader4.result
      });
    }

    reader4.readAsDataURL(file4)
  }


  _handleImage1Change5(e) {
    e.preventDefault();

    let reader5 = new FileReader();
    let file5 = e.target.files[0];

    reader5.onloadend = () => {
      this.setState({
        file5: file5,
        imagePreviewUrl5: reader5.result
      });
    }

    reader5.readAsDataURL(file5)
  }



  onChangeProductTitle = (e) =>{
    this.setState({
      productTitle:e.target.value,
    })
  }

  handleChangCategorye = (e) =>{
    this.setState ({
      category:e.target.value
    });
  }

  onChangeProductDescription = (e) => {
    this.setState({
      productDescription: e.target.value
    });
  }

  onChangeProductBrand = (e) => {
    this.setState({
      productBrand: e.target.value
    });
  }

  onChangeProductModel = (e) => {
    this.setState({
      productModel: e.target.value
    });
  }

  onChangeLastPrice = (e) => {
    this.setState({
      lastPrice: e.target.value
    });
  }

  onChangeSalePrice = (e) => {
    this.setState({
      salePrice: e.target.value
    });
  }

  onChangeWarranty = (e) =>{
    this.setState({
      warranty:e.target.value
    });
  }

  addProductFormSubmit = (e) =>{
    e.preventDefault();
    let product = {
        shopId:localStorage.getItem("ShopId"),
        title: this.state.productTitle,
        category: this.state.category,
        description: this.state.productDescription,
        brand: this.state.productBrand,
        model: this.state.productModel,
        lastPrice: this.state.lastPrice,
        sellPrice: this.state.salePrice,
        warranty: this.state.warranty,
        stock:10,
        image_1: "https://pbs.twimg.com/media/EhCtnLdU0AACxPE?format=jpg&name=360x360",
        image_2: "https://pbs.twimg.com/media/EhCtnLdU0AACxPE?format=jpg&name=360x360",
        image_3: "https://pbs.twimg.com/media/EhCtnLdU0AACxPE?format=jpg&name=360x360",
        image_4: "https://pbs.twimg.com/media/EhCtnLdU0AACxPE?format=jpg&name=360x360",
        image_5: "https://pbs.twimg.com/media/EhCtnLdU0AACxPE?format=jpg&name=360x360",

        // image_1:this.state.imagePreviewUrl1,
        // image_2:this.state.imagePreviewUrl2,
        // image_3:this.state.imagePreviewUrl3,
        // image_4:this.state.imagePreviewUrl4,
        // image_5:this.state.imagePreviewUrl5  
    };


    ProductApi.addNewProduct(product)
        .then(res => {
            this.setState({
              message : 'Product added successfully.',
              severity:'success',
              AlertTitle:'success',
            });

            setTimeout(() => {
              this.setState({message:''})

              this.props.history.push('/shopprofileviwe/'+ this.state.shopId);
            },2000)
            
        })

        .catch(error => {
          this.setState({
            message:'error',
            severity:'error',
            AlertTitle:'error'
          })

          setTimeout(() => {
            this.setState({message:''})
          },2000)
        })
    }






  render(){
    let {imagePreviewUrl1} = this.state;
    let {imagePreviewUrl2} = this.state;
    let {imagePreviewUrl3} = this.state;
    let {imagePreviewUrl4} = this.state;
    let {imagePreviewUrl5} = this.state;



    return(
      <div>

                {this.state.message&&(
                    <div>
                        <Alert variant="filled" severity={this.state.severity} style={{position:"fixed",right:"100px",width:"550px",zIndex:"3",color:"white"}}>
                            <AlertTitle>{this.state.AlertTitle}</AlertTitle>
                            {this.state.message}
                        </Alert>

                    </div>
                )}


        <Paper id="addProductMainDiv">
        <Typography variant="h4" style={{textAlign:'center'}}>Add Product</Typography>

        <ValidatorForm onSubmit={this.addProductFormSubmit} >

        <Grid container>

          <Grid item xs={12} sm={12} md={6}>
            <Paper elevation={3} id="productTitleDiv">
                  <Typography variant="h5" id="producTitleText">Product Title</Typography>


                  <TextValidator
                      Id='productTitleIp'
                      variant="outlined"
                      label="Product Title"
                      onChange={this.onChangeProductTitle}
                      name="productTitle"
                      value={this.state.productTitle}
                      validators={['required']}
                      errorMessages={['this field is required']}
                  />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <Paper elevation={3} id="productCategoryDiv">
                  <Typography variant="h5" id="producCategoryText">Product Category</Typography>
                  <FormControl variant="outlined" id='sortSelectIp'>
                        <InputLabel htmlFor="outlined-category-native-simple">Category</InputLabel>
                        <Select
                              native
                              value={this.state.category}
                              onChange={this.handleChangCategorye}
                              label="Category"
                              validators={['required']}
                              errorMessages={['this field is required']}

                        >
                              <option value={''}></option>
                              <option value={'Mobile And Tablets'}>Mobile And Tablets</option>
                              <option value={'Mobile And Tablets Accessories'}>Mobile And Tablets Accessories</option>
                              <option value={'Computers & Labtops'}>Computers & Labtops</option>
                              <option value={'Computers & Labtops Accessories'}>Computers & Labtops Accessories</option>
                              <option value={'Cameras'}>Cameras</option>
                              <option value={'Cameras Accessories'}>Cameras Accessories</option>
                              <option value={'TV , Video & Audio'}>TV , Video & Audio</option>

                        </Select>
                  </FormControl>

            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <Paper elevation={3} id="productImageInputDiv">
                <Typography variant="h5" id="producImageText">Product Images</Typography>
                <div className="previewComponent">
                  <form onSubmit={(e)=>this._handleImg1Submit(e)}>
                      <Grid container>
                            <Grid xs={12}>

                                  <div id="imgPreview1">
                                      <input className="fileInput1"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e)=>this._handleImage1Change1(e)}
                                       />

                                       {!imagePreviewUrl1&&(
                                          <img src={AddImg} alt="photo" className="addItemImg1" />
                                        )}
                                          <img src={imagePreviewUrl1} className="addItemImg1" />

                                  </div>

                                {this.state.file1&&(
                                  <div id="imgPreview2">
                                      <input className="fileInput2"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e)=>this._handleImage1Change2(e)}
                                      />

                                      {!imagePreviewUrl2&&(
                                         <img src={AddImg} alt="photo" className="addItemImg2" />
                                       )}

                                      <img src={imagePreviewUrl2} alt="photo" className="addItemImg2" />
                                  </div>
                                )}

                                {this.state.file2&&(
                                  <div id="imgPreview3">
                                      <input className="fileInput3"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e)=>this._handleImage1Change3(e)}
                                      />

                                      {!imagePreviewUrl3&&(
                                         <img src={AddImg} alt="photo" className="addItemImg3" />
                                       )}

                                      <img src={imagePreviewUrl3} alt="photo" className="addItemImg3" />
                                  </div>
                                )}

                                {this.state.file3&&(
                                  <div id="imgPreview4">
                                      <input className="fileInput4"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e)=>this._handleImage1Change4(e)}
                                      />

                                      {!imagePreviewUrl4&&(
                                         <img src={AddImg} alt="photo" className="addItemImg4" />
                                       )}

                                      <img src={imagePreviewUrl4} alt="photo" className="addItemImg4" />
                                  </div>
                                )}
                                {this.state.file4&&(
                                  <div id="imgPreview5">
                                      <input className="fileInput5"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e)=>this._handleImage1Change5(e)}
                                      />

                                      {!imagePreviewUrl5&&(
                                         <img src={AddImg} alt="photo" className="addItemImg5" />
                                       )}

                                      <img src={imagePreviewUrl5} alt="photo" className="addItemImg5" />
                                  </div>
                                )}
                            </Grid>
                      </Grid>

                  </form>
                </div>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <Paper elevation={3} id="productDescriptionDiv">
                  <Typography variant="h5" id="producCategoryText">Product Description</Typography>
                  <textarea aria-label="minimum height" rowsMin={3} placeholder="Minimum 3 rows" id="productDesId" value={this.state.productDescription} onChange={this.onChangeProductDescription} />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <Paper elevation={3} id="productBrandDiv">
                  <Typography variant="h5" id="producCategoryText">Product Brand</Typography>

                  <TextValidator
                      Id='productBrandIP'
                      variant="outlined"
                      label="Product Brand"
                      onChange={this.onChangeProductBrand}
                      name="productBrand"
                      value={this.state.productBrand}
                      validators={['required']}
                      errorMessages={['this field is required']}
                  />


            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <Paper elevation={3} id="productModelDiv">
                  <Typography variant="h5" id="producCategoryText">Product Model</Typography>

                  <TextValidator
                      Id='productModelIP'
                      variant="outlined"
                      label="Product Model"
                      onChange={this.onChangeProductModel}
                      name="productModel"
                      value={this.state.productModel}
                      validators={['required']}
                      errorMessages={['this field is required']}
                  />

            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <Paper elevation={3} id="productLastPriceDiv">
                  <Typography variant="h5" id="producCategoryText">Last Price (Rs) (Optional)</Typography>

                  <TextValidator
                      Id='productLastPriceIP'
                      variant="outlined"
                      label="Last Price"
                      onChange={this.onChangeLastPrice}
                      name="lastPrice"
                      value={this.state.lastPrice}
                      validators={['required']}
                      errorMessages={['this field is required']}
                      type="number"
                  />

            </Paper>
          </Grid>


          <Grid item xs={12} sm={12} md={6}>
            <Paper elevation={3} id="productSalePriceDiv">
                  <Typography variant="h5" id="producCategoryText">Sale Price (Rs) </Typography>


                  <TextValidator
                      Id='productSalePriceIP'
                      variant="outlined"
                      label="Sale Price"
                      onChange={this.onChangeSalePrice}
                      name="lastPrice"
                      value={this.state.salePrice}
                      validators={['required']}
                      errorMessages={['this field is required']}
                      type="number"
                  />

            </Paper>
          </Grid>


          <Grid item xs={12} sm={12} md={6}>
            <Paper elevation={3} id="productWarrantyDiv">
                  <Typography variant="h5" id="producCategoryText">Warranty (Months)</Typography>


                  <TextValidator
                      Id='productWarrantyIP'
                      variant="outlined"
                      label="Warranty"
                      onChange={this.onChangeWarranty}
                      name="warranty"
                      value={this.state.warranty}
                      validators={['required']}
                      errorMessages={['this field is required']}
                      type="number"
                  />
            </Paper>
          </Grid>


        </Grid>
        <br/><br/>

              <Box id="addProductDiv">
                  <Button id="addProductBtn" type="submit"   >Add Product</Button>
              </Box>

          <br/><br/><br/>
      </ValidatorForm>
        </Paper>
    </div>
    );
  }
}

export default AddProduct;
