import { Button, Form, Input, InputNumber, Spin, message } from "antd";
import ReactQuill from "react-quill";
import UploadImage from "./UploadImage";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();
  const [imageFileList, setImageFileList] = useState([]);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const params = useParams();
  const productId = params.id;

  // UploadImage bileşeninden gelen fileList'i güncelleyen fonksiyon
  const handleImageFileListChange = useCallback((newFileList) => {
    console.log("handleImageFileListChange worked");
    setImageFileList(newFileList);
    console.log(imageFileList);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        console.log(productId);

        const response = await fetch(`${apiUrl}/product/get/${productId}`, {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          setDataSource(data);
          console.log(data);
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
    if (dataSource._id !== undefined) {
      form.setFieldsValue({
        name: dataSource.name,
        basePrice: dataSource.price.basePrice,
        discountPrice: dataSource.price.discountPrice,
        stock: dataSource.stock,
        description: dataSource.description,
      });
    }
  }, [dataSource, form]);

  useEffect(() => {
    const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

    // Fetch işlemi tamamlandıktan sonra imageFileList'i güncelle
    if (dataSource._id !== undefined) {
      const handleImageUpload = async () => {
        try {
          const uploadedFiles = await Promise.all(
            dataSource.images.map(async (image) => {
              try {
                const response = await axios.get(`${baseUrl}${image.pathUrl}`, {
                  responseType: "blob",
                });

                const file = new File([response.data], image.imageName, {
                  type: image.type,
                  lastModified: image.lastModified,
                  lastModifiedDate: image.lastModifiedDate,
                  thumbUrl: image.pathUrl
                });

                const thumbUrl = await getBase64(file);

                // Dosyayı istediğiniz obje formatına dönüştür
                const transformedFile = {
                  originFileObj: file,
                  name: image.imageName,
                  type: image.type,
                  status: "success", // Dosya başarıyla yüklendi
                  response: "Server response or error message", // Sunucudan dönen cevap veya hata mesajı
                  thumbUrl: thumbUrl, // İlgili thumbnail URL (base64 formatında)
                  url:baseUrl+image.pathUrl,
                  lastModified: file.lastModified, // Dosyanın son değiştirme tarihi (lastModified özelliği)
                  lastModifiedDate: file.lastModifiedDate, // Dosyanın son değiştirme tarihi (lastModifiedDate özelliği)
                };

                return transformedFile;
              } catch (error) {
                console.error("Resim Yükleme Hatası:", error);
                // Hata durumunda bir nesne dönüşü
                return {
                  name: image.imageName,
                  status: "error", // Hata durumu
                  response: "Hata mesajı", // Hata mesajı
                  thumbUrl: "", // İlgili thumbnail URL
                  lastModified: image.lastModified, // Dosyanın son değiştirme tarihi (lastModified özelliği)
                  lastModifiedDate: image.lastModifiedDate, // Dosyanın son değiştirme tarihi (lastModifiedDate özelliği)`${apiUrl}/product/update/${productId}`
                };
              }
            })
          );

          handleImageFileListChange(uploadedFiles);
          console.log("Yüklenen Dosyalar:", uploadedFiles);
        } catch (error) {
          console.error("Resim Yükleme Hatası:", error);
        }
      };

      handleImageUpload();
      console.log("imagefilelist : ", imageFileList);
    }
    console.log("fetch sonrası resimler getirildi ");
  }, [dataSource, handleImageFileListChange]);

  const onFinish = async (values) => {
    setLoading(true);
    console.log(values);
    const productData = {
      name: values.name,
      description: values.description,
      brand: "Brand Name",
      price: {
        basePrice: values.basePrice,
        discountPrice: values.discountPrice,
      },
      images:imageFileList.map((file) => ({
        imageName:file.name,
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
        thumbUrl:file.thumbUrl,
        type: file.type
      })),
      currency: "TRY",
      stock: values.stock,
      itemType: "PHYSICAL",
      reviews: [], // Assuming reviews is an empty array initially
    };
    console.log(productData);
    console.log(JSON.stringify(productData));

    const formdata = new FormData();
    formdata.append("product", JSON.stringify(productData));
    if (imageFileList && imageFileList.length > 0) {
      imageFileList.forEach((file) => {
        formdata.append("files", file.originFileObj, file.name);
      })
    }

    try {
      const response = await axios.post(`${apiUrl}/product/update/${productId}`,formdata);
      if (response.status === 200) {
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
            <UploadImage
              onFileListChange={handleImageFileListChange}
              imageFileList={imageFileList}
            ></UploadImage>
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
