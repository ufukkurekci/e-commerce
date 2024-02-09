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
    const firstFile = newFileList[0];
    setImageFileList([firstFile]);
    console.log("UploadImage bileşeninden gelen file");
    console.log(firstFile); // Dosyayı kontrol et



  };
  const onFinish = async (values) => {
    setLoading(true);
    const parseHTMLToPlainText = (htmlString) => {
      const doc = new DOMParser().parseFromString(htmlString, 'text/html');
      return doc.body.textContent || "";
    };
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("description", parseHTMLToPlainText(values.description));
      formData.append("basePrice", values.basePrice);
      formData.append("discountPrice", values.discountPrice);
      formData.append("stock", values.stock);
      imageFileList.forEach((file, index) => {
        formData.append(`images[${index}]`, file.originFileObj);
      });
    formData.append("images", imageFileList[0].originFileObj);

      for (var pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
      console.log(values.description);
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
