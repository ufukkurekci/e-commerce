import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
// import axios from "axios";
import PropTypes from "prop-types";

  const UploadImage = ({ onFileListChange , imageFileList}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    // if (!file.url && !file.preview) {
    //    file.preview = await getBase64(file.originFileObj);
    //   file.url = `${baseUrl}${file.thumbUrl}`;
    // }
    
    setPreviewImage(file.url);
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
