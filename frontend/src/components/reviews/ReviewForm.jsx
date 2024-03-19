import { useState } from "react";
import PropTypes from "prop-types";
import { message } from "antd";
import axios from "axios";
import ApiError from "../../../../backend/src/error/ApiError";

const ReviewForm = ({ product, setcurrentProduct }) => {
  const [rating, setrating] = useState(0);
  const [review, setreview] = useState("");
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const authData = localStorage.getItem("authdata")
    ? JSON.parse(localStorage.getItem("authdata"))
    : null;

  const handleRating = (e, newRating) => {
    e.preventDefault();
    setrating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      reviews: {
        text: review,
        rating: parseInt(rating),
        user: authData?.user._id,
      },
    };

    console.log(product);

    // if(authData.token != undefined){
    //   message.error("Yorum yapmak için lütfen giriş yapın");
    //   throw new ApiError("Yorum yapmak için lütfen giriş yapın",401,"unAuthorized");

    // }

    try {
      const token = authData?.token;
      await axios.post(`${apiUrl}/authControl`, null, {
        headers: {
          Authorization: `${token}`
        }
      })
    } catch (error) {
      console.log(error);
      message.error("Yorum yapmak için lütfen giriş yapın");
      throw new ApiError("Birşeyler ters gitti lütfen tekrar dene ! ", 401, "unAuthorized");
    }
    
    try {
      const response = await axios.post(`${apiUrl}/product/addReview/${product._id}`, data);
      if (response.status === 200) {
        const product = await response.data.product;
        setcurrentProduct(product);
        message.success("Yorumunuz eklendi :)");
        setreview("");
        setrating(0);
      } else {
        message.error("Birşeyler ters gitti lütfen tekrar dene ! ");
      }
    } catch (error) {
      console.log(error);
    }

    console.log(data);
  };
  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <p className="comment-notes">
        Your email address will not be published. Required fields are marked
        <span className="required">*</span>
      </p>
      <div className="comment-form-rating">
        <label>
          Your rating
          <span className="required">*</span>
        </label>
        <div className="stars">
          <a
            href="#"
            className={`star ${rating === 1 && "active"}`}
            onClick={(e) => handleRating(e, 1)}
          >
            <i className="bi bi-star-fill"></i>
          </a>
          <a
            href="#"
            className={`star ${rating === 2 && "active"}`}
            onClick={(e) => handleRating(e, 2)}
          >
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </a>
          <a
            href="#"
            className={`star ${rating === 3 && "active"}`}
            onClick={(e) => handleRating(e, 3)}
          >
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </a>
          <a
            href="#"
            className={`star ${rating === 4 && "active"}`}
            onClick={(e) => handleRating(e, 4)}
          >
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </a>
          <a
            href="#"
            className={`star ${rating === 5 && "active"}`}
            onClick={(e) => handleRating(e, 5)}
          >
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </a>
        </div>
      </div>
      <div className="comment-form-comment form-comment">
        <label htmlFor="comment">
          Your review
          <span className="required">*</span>
        </label>
        <textarea
          id="comment"
          cols="50"
          rows="10"
          onChange={(e) => setreview(e.target.value)}
          value={review}
        ></textarea>
      </div>

      <div className="comment-form-cookies">
        <input id="cookies" type="checkbox" />
        <label htmlFor="cookies">
          Save my name, email, and website in this browser for the next time I
          comment.
          <span className="required">*</span>
        </label>
      </div>
      <div className="form-submit">
        <input type="submit" className="btn submit" />
      </div>
    </form>
  );
};

export default ReviewForm;

ReviewForm.propTypes = {
  product: PropTypes.object,
  setcurrentProduct: PropTypes.func,
};
