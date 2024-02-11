import { Button, Form, Input, InputNumber, Spin, message } from "antd";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadImage from "./UploadImage";

const CreateProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [imageFileList, setImageFileList] = useState([]);
  const apiURL = import.meta.env.VITE_API_BASE_URL;

  // UploadImage bileşeninden gelen fileList'i güncelleyen fonksiyon
  const handleImageFileListChange = (newFileList) => {
    setImageFileList(newFileList);
  };
  const onFinish = async (values) => {
    setLoading(true);

    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("basePrice", values.basePrice);
    formData.append("discountPrice", values.discountPrice);
    formData.append("stock", values.stock);

    // Use Promise.all to wait for all asynchronous tasks to complete
    await Promise.all(
      imageFileList.map(async (file) => {
        formData.append("images", file.originFileObj, file.name);
      })
    );

    try {
      const response = await fetch(`${apiURL}/product/add`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        message.success("Ürün başarıyla oluşturuldu");
        form.resetFields();
      } else {
        message.error("Ürün oluşturulamadı");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Ürün İsmi"
          name="name"
          initialValue="test ürünü"
          rules={[
            {
              required: true,
              message: "Lütfen Ürün adını girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Fiyat"
          name="basePrice"
          initialValue={100}
          rules={[
            {
              required: true,
              message: "Lütfen ürün fiyatını girin!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="İndirim Oranı"
          name="discountPrice"
          initialValue={10}
          rules={[
            {
              required: true,
              message: "Lütfen bir ürün indirim oranı girin!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Stock Bilgisi"
          name="stock"
          initialValue={20}
          rules={[
            {
              required: true,
              message: "Lütfen bir stock adedi girin!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Ürün Açıklaması"
          name="description"
          initialValue="acıklama"
          rules={[
            {
              required: true,
              message: "Lütfen bir ürün açıklaması girin!",
            },
          ]}
        >
          <ReactQuill
            theme="snow"
            style={{
              backgroundColor: "white",
            }}
          />
        </Form.Item>
        <Form.Item label="Ürün Görselleri (Linkler)" name="images">
          <UploadImage
            onFileListChange={handleImageFileListChange}
          ></UploadImage>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Oluştur
        </Button>
      </Form>
    </Spin>
  );
};

export default CreateProductPage;
