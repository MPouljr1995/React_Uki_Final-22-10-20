import axios from "axios";

const API_URL = "http://localhost:8080/api/feedback";

class FeedbackApi {

    getFeedbackByProductId(productId) {
        return axios.get(API_URL+"?productId="+productId)
    }


}
export default new FeedbackApi();