import Axios from "axios";

const fetch = async (mediaID, callback, errorCallback, token) => {

    //same payload
    const payload = {
        mediaID: mediaID,
    };

    //fetch with token
    if (token){
        const controllerUrl = "/api/media/";
        const headers = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        Axios.post(controllerUrl, payload, headers)
            .then((res) => {
                callback(res);
            })
            .catch((err) => {
                console.log(err);
                if (errorCallback){
                    errorCallback(err);
                }
            });
    }else{
        //fetch public image
        const controllerUrl = "/api/media/getPublic";
        Axios.post(controllerUrl, payload)
            .then((res) => {
                callback(res);
            })
            .catch((err) => {
                console.log(err);
                if (errorCallback){
                    errorCallback(err);
                }
            });
    }
};

export default fetch;