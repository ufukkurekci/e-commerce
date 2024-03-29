import { Button, Popconfirm, Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ProductPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "images",
      key: "images",
      render: (images) => {
        return (
          <span>
            {images && images.length > 0 && (
              <img
                src={images[0].thumbUrl}
                alt="Image"
                style={{ height: "100px" }}
              />
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
      render: (price) => <span>{price.basePrice.toFixed(2)}</span>,
    },
    {
      title: "İndirimli Oranı",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>%{price.discountPrice}</span>,
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
      const response = await fetch(`${apiUrl}/product/delete/${productId}`, {
        method: "DELETE",
      });

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
      pagination={{ pageSize: 5 }}
    />
  );
};

export default ProductPage;
