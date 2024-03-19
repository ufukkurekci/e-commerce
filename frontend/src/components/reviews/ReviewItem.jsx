import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
const ReviewItem = ({ item }) => {
  const options = {year: "numeric" , month: "long" , day: "numeric"};
  const formattedDate = new Date(item.createdAt).toLocaleDateString("tr-TR",options)
  // const authdata = localStorage.getItem("authdata") ? JSON.parse(localStorage.getItem("authdata")) : null;
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [user, setuser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {

      try {
        const response = await axios.get(`${apiUrl}/get/user/${item.user}`);
        if (response.status === 200) {
          const data = await response.data;
          if (data) {
            setuser(data);
          }
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      }
    };
    fetchUser();
  }, [apiUrl,item.user]);

  return (
    <li className="comment-item">
      <div className="comment-avatar">
        <img src="img/avatars/avatar1.jpg" alt="" />
      </div>
      <div className="comment-text">
        <ul className="comment-star">
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
        </ul>
        {user && (
          <div className="comment-meta">
            <strong>{user.name}</strong>
            <span> - </span>
            <time>{formattedDate}</time>
          </div>
        )}
        <div className="comment-description">
          <p>
              {item.text}
          </p>
        </div>
      </div>
    </li>
  );
};

export default ReviewItem;

ReviewItem.propTypes = {
  item: PropTypes.object,
};
