import { Button, Table , Popconfirm} from "antd";
import { useCallback, useEffect, useState } from "react";
import { message } from "antd";

const AdminUserPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiURL = import.meta.env.VITE_API_BASE_URL;

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiURL}/getAllUsers`);
      if (response.ok) {
        const data = await response.json();
        setDataSource(data);
      } else {
        message.error("Kullanıcılar çekilemedi.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [apiURL]);


  const deleteUser = async (userId) => {
    try {
        const response = await fetch(`${apiURL}/user/delete/${userId}`,{
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            }
        });
        if (response.ok) {
          fetchUser();
          message.success("Kullanıcı silindi.");
        } else {
          message.error("Silinmek istenen kullanıcı bulunamadı.");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
  }
  useEffect(() => {
    fetchUser();
  }, []);

  const columns = [
    {
      title: "Ad",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Soyad",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "E-Posta",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_,record) => (
        <Popconfirm
        title="Kullanıcıyı sil"
        description="Kullanıcıyı silmek istediğinizden emin misiniz?"
        onConfirm={() => deleteUser(record._id)}
        okText="Evet"
        cancelText="Hayır"
      >
        <Button type="primary" danger>Sil</Button>
      </Popconfirm>
      ),
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
};

export default AdminUserPage;
