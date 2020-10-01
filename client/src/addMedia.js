import Axios from "axios";

const add = async (file, isPrivate, token) => {
  const formData = new FormData();
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
      return res.data;
    }).catch((err) => {
      console.error(err);
  });
};

export default add;