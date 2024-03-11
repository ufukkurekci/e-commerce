import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
// import axios from "axios";
import PropTypes from "prop-types";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
  const UploadImage = ({ onFileListChange , imageFileList}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  // const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log("upload image çalıstı");
   //  console.log(newFileList);
    onFileListChange(newFileList);
    console.log(newFileList);
 };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  // const customRequest = async (newFileList) => {
  //   const formData = new FormData();
  //   if (newFileList && newFileList.length > 0) {
  //     newFileList.forEach((file) => {
  //       formData.append("files", file.originFileObj, file.name);
  //     });
  //     try {
  //       const response = await axios.post(`${apiUrl}/product/upload/`,formData);

  //       console.log("service result", response.data);

  //       console.log("FormData Content:");
  //       formData.forEach((value, key) => {
  //         console.log(`${key}: ${value}`);
  //       });

  //       console.log("File upload successful:");
  //       // onSuccess(); // Invoke onSuccess to signal that the file upload is successful
  //     } catch (error) {
  //       console.error("Error:", error);
  //       // onError(error); // Invoke onError to signal that an error occurred during file upload
  //     }
  //   }
  // };
  return (
    <>
      <Upload
        // customRequest={customRequest} // veya {customRequest} methodu gircez
        listType="picture-card"
        fileList={imageFileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};
export default UploadImage;

UploadImage.propTypes = {
  onFileListChange:PropTypes.func,
  imageFileList:PropTypes.array,
}
