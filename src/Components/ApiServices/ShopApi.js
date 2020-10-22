import axios from "axios";

const API_URL = "http://localhost:8080/api/shops/";

class ShopApi {

    GetAllShops() {
        return axios.get(API_URL);
    }

    GetShopIdByUserId(userId) {
        return axios.get(API_URL + "?userId="+userId)
    }

    NewShopCreate(shop) {
        return axios.post(API_URL,shop)
    }

    GetShopById(id) {
        return axios.get(API_URL +id)
    }

    deleteShopById(id) {
        return axios.delete(API_URL + id)
    }

}
export default new ShopApi();