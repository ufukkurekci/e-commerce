import { Button, Form, Input, InputNumber, Spin, message } from "antd";
import ReactQuill from "react-quill";
import UploadImage from "./UploadImage";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";



const UpdateProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();
  const [imageFileList, setImageFileList] = useState([]);
  const [fetchCompleted, setFetchCompleted] = useState(false);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const params = useParams();
  const productId = params.id;

  // UploadImage bileşeninden gelen fileList'i güncelleyen fonksiyon
  const handleImageFileListChange = useCallback((newFileList) => {
    console.log("handleImageFileListChange worked");
    setImageFileList(newFileList);
  }, []);



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
    if (dataSource && dataSource.product && dataSource.product.images) {
      handleImageFileListChange(dataSource.product.images);
    }
    console.log("fetch sonrası resimler getirildi ");
  }, [dataSource, handleImageFileListChange]);

  const onFinish = async (values) => {
    setLoading(true);

    const productData = {
      name: values.name,
      images: imageFileList.map((file) => ({
        name: file.name,
        originFileObj: {
          uid: file.originFileObj.uid,
          name: file.originFileObj.name,
        },
        thumbUrl: file.thumbUrl,
        type: file.type,
        uid: file.uid,
      })),
      description: values.description,
      brand: "Brand Name",
      price: {
        basePrice: values.basePrice,
        discountPrice: values.discountPrice,
      },
      currency: "TRY",
      stock: values.stock,
      itemType: "PHYSICAL",
      reviews: [], // Assuming reviews is an empty array initially
    };
    console.log(productData);

    try {
      const response = await fetch(`${apiUrl}/product/update/${productId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (response.ok) {
        message.success("Ürün başarıyla güncellendi");
        form.resetFields();
        navigate("/admin/products");
        
      } else {
        message.error("Ürün güncellenemedi");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form name="basic" layout="vertical" form={form} onFinish={onFinish}>
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
