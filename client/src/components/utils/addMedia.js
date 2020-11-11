import Axios from "axios";

const add = async (file, isPrivate, token, callback) => {
  const formData = new FormData();
  // console.log(file);
  formData.append("mediafile", file);
  formData.append("givenFileName", "blank");
  formData.append("isPrivate", isPrivate);

  Axios.post("/api/media/add", formData, {
    headers: {
      ContentType: "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      // console.log(res.data);
      callback(res.data);
    }).catch((err) => {
    console.error(err);
  });
};

export default add;