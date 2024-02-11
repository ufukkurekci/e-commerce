import { Button, Form, Input, InputNumber, Spin, message } from "antd";
import ReactQuill from "react-quill";
import UploadImage from "./UploadImage";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const base64StringToFile = (base64String, contentType, index) => {
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: contentType });

  // File nesnesini oluştur
  return new File([blob], `image_${index + 1}`, { type: contentType });
};

const convertImagesToNewFileList = (images) => {
  return images.map((image, index) => {
    return base64StringToFile(image.data, image.contentType, index);
  });
};

const createNewFileList = (dataSource, handleImageFileListChange) => {
  if (dataSource && dataSource.product && dataSource.product.images) {
    const newFileList = convertImagesToNewFileList(dataSource.product.images);
    handleImageFileListChange(newFileList);
    console.log("create new file list içindeki değer");
    console.log(newFileList);
  }
};

const UpdateProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();
  const [imageFileList, setImageFileList] = useState([]);
  const [fetchCompleted, setFetchCompleted] = useState(false);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const params = useParams();
  const productId = params.id;

  // UploadImage bileşeninden gelen fileList'i güncelleyen fonksiyon
  const handleImageFileListChange = useCallback((newFileList) => {
    console.log("handleImageFileListChange içindeki değer");
    setImageFileList(newFileList);
    console.log(`handleImageFileListChange imageFileList:${imageFileList}`);
  }, []);


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
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        console.log(productId);

        const response = await fetch(`${apiUrl}/product/update/${productId}`, {
          method: "PUT",
        });
        if (response.ok) {
          const data = await response.json();
          console.log(productId);
          setDataSource(data);
          setFetchCompleted(true); 
          console.log(`fetch imageFileList:${imageFileList}`);
          console.log(fetchCompleted);
        //   console.log(dataSource);
        } else {
          message.error("Ürünler çekilemedi.");
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [apiUrl]);

  useEffect(() => {
    // Fetch işlemi tamamlandıktan sonra formu doldur
    if (dataSource && dataSource.product) {
      form.setFieldsValue({
        name: dataSource.product.name,
        basePrice: dataSource.product.price.basePrice,
        discountPrice: dataSource.product.price.discountPrice,
        stock: dataSource.product.stock,
        description: dataSource.product.description,
      });
    }
  }, [dataSource, form]);

  useEffect(() => {
    // Fetch işlemi tamamlandıktan sonra imageFileList'i güncelle
    createNewFileList(dataSource, handleImageFileListChange);
    console.log(` createNewFileList imageFileList:${imageFileList}`);
  }, [dataSource, handleImageFileListChange]);

  return (
    <Spin spinning={loading}>
      <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Ürün İsmi"
          name="name"
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
        {dataSource && ( // Render child component only if fetch is completed
          <Form.Item label="Ürün Görselleri (Linkler)" name="images">
            <UploadImage onFileListChange={handleImageFileListChange} imageFileList={imageFileList}></UploadImage>
          </Form.Item>
        )}
        <Button type="primary" htmlType="submit">
          Kaydet
        </Button>
      </Form>
    </Spin>
  );
};

export default UpdateProductPage;
