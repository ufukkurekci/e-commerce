import { Button, Popconfirm, Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

const ProductPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const columns = [
    {
        title: "Özel Sütun",
        dataIndex: "images",
        key: "images",
        render: (images) => {
          console.log(images[0].data); // Eklendi
          var buffer = Buffer.from(JSON.stringify(images[0].data));
        //   console.log(buffer);
          const base64String = buffer.toString('base64');
          console.log(`string:${base64String}`);
          return (
            <span>
              {/* Özel içeriği burada görüntüle */}
              {images && images.length > 0 && (
                <img src={`data:${images[0].contentType};base64,${base64String}`} alt="Image" />
              )}
            </span>
          );
        },
      },
    {
      title: "Ürün Adı",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Açıklama",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Fiyat",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span>
          {price.basePrice}
        </span>
      ),
    },
    {
      title: "İndirimli Fiyat",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span>
          {price.discountPrice}
        </span>
      ),
    },
    {
      title: "Stok",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/products/update/${record._id}`)}
          >
            Güncelle
          </Button>
          <Popconfirm
            title="Ürünü Sil"
            description="Ürünü silmek istediğinizden emin misiniz?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteProduct(record._id)}
          >
            <Button type="primary" danger>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/product/delete/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        message.success("Ürün başarıyla silindi.");
        setDataSource((prevProducts) => {
          return prevProducts.filter((product) => product._id !== productId);
        });
      } else {
        message.error("Silme işlemi başarısız.");
      }
    } catch (error) {
      console.log("Silme hatası:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${apiUrl}/product/getall`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setDataSource(data);
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

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
};

export default ProductPage;
