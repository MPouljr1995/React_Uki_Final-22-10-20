import axios from "axios";

const API_URL = "http://localhost:8080/api/products/";

class ProductApi {

    getAllProduct() {
        return axios.get(API_URL);
    }

    getSearchProducts(searchKey) {
        return axios.get(API_URL+ "?search="+ searchKey)
    }

    // getSearchProducts(searchKey,minPrice,maxPrice,warranty) {
    //     return axios.get(API_URL+ "?search="+ searchKey)
    // }

    addNewProduct(product) {
        return axios.post(API_URL, product)
    }

    getProductById(id) {
        return axios.get(API_URL + id)
    }

    getProductByShopId(id) {
        return axios.get(API_URL + "shop/"+id)
    }

    updateProductById(product) {
        return axios.put(API_URL + product.productId,product)
    }

}
export default new ProductApi();