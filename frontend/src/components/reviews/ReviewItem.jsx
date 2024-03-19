import PropTypes from "prop-types";
const ReviewItem = ({ item }) => {
  const options = {year: "numeric" , month: "long" , day: "numeric"};
  const formattedDate = new Date(item.createdAt).toLocaleDateString("tr-TR",options)
  const authdata = localStorage.getItem("authdata") ? JSON.parse(localStorage.getItem("authdata")) : null;
  const username = authdata?.user.name;
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
        <div className="comment-meta">
          <strong>{username}</strong>
          <span> - </span>
          <time>{formattedDate}</time>
        </div>
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
