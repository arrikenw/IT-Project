import Axios from "axios";

const fetchMediaUtil = (mediaID, token, callback, errorCallback) => {

    if (!mediaID){
        console.log("no media id provided for fetch");
        return;
    }

    // same payload
    const payload = {
        mediaID,
    };

    // fetch with token
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
                console.error(err);
                if (errorCallback){
                    errorCallback(err);
                }
            });
    }else{
        // fetch public image
        const controllerUrl = "/api/media/getPublic";
        Axios.post(controllerUrl, payload)
            .then((res) => {
                callback(res);
            })
            .catch((err) => {
                console.error(err);
                if (errorCallback){
                    errorCallback(err);
                }
            });
    }
};

export default fetchMediaUtil;