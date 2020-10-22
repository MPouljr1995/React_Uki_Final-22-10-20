import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class CommonApi {

    register(user) {
        return axios.post(API_URL + "signup", user);
    }

    login(regis) {
        return axios.post(API_URL + "signin", regis)
        //   .then(response => {
        //     //   console.log(response.data);
        //     if (response.data.token) {
        //       localStorage.setItem("user", JSON.stringify(response.data));
        //     }
        //     console.log(localStorage.getItem("{user.token}"))
    
        //     return response.data;
        //   });
    }

    getAllUsers() {
        return axios.get(API_URL + "user")
    }

    getUserById(userid) {
        return axios.get(API_URL + "user/" + userid)
    }

    userUpdate(UPuser) {
        console.log(UPuser);
        return axios.put(API_URL + "user/"+ UPuser.userId , UPuser)
    }

    deleteUser(userId) {
        return axios.delete(API_URL + "user/"+ userId)
    }

}
export default new CommonApi();