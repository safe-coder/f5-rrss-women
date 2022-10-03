export const checkimage = (file) => {
  let err = "";
  if (!file) return (err = "file not found");
  if (file.size > 1024 * 1024)
    return (err = "file size should be less than 1mb");
  if (file.type !== "image/jpeg" && file.type !== "image/png")
    return (err = "file not supported");
};

export const imageupload = async (images) => {
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();
    if (item.camera) {
      formData.append("file", item.camara);
    } else {
      formData.append("file", item);
    }
    formData.append("upload_preset", "llzwckxy");
    formData.append("cloud_name", "dz00dzutg");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dz00dzutg/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    imgArr.push({ public_id: data.public_id, secure_url: data.secure_url });
  }
  return imgArr;
};
