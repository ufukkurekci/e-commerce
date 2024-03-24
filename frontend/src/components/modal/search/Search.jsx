import axios from "axios";
import "./Search.css";
import PropTypes from "prop-types";
import { message } from "antd";
import { useState } from "react";
const Search = ({ isSearchShow, setIsSearchShow }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [searchResult, setsearchResult] = useState(null);

  const handleCloseModal = () => {
    setIsSearchShow(false);
    setsearchResult(null);
    document.getElementById("searchInput").value = "";
  }
  const handleSearch = async (e) => {
    e.preventDefault();
    const productName = e.target[0].value.trim();
    if(!productName){
      message.error("Lütfen arama kriteri giriniz");
      return;
    }
    try {


      const response = await axios.get(
        `${apiUrl}/product/search/${productName.trim()}`
      );
      if (response.statusText) {
        const data = await response.data;
        setsearchResult(data);
        console.log(data);
      }
    } catch (error) {
      message.error("ürün getirilirken hata olustu");
      console.log("Veri hatası:", error);
    }
  };
  return (
    <div className={`modal-search ${isSearchShow ? "show" : ""} `}>
      <div className="modal-wrapper">
        <h3 className="modal-title">Search for products</h3>
        <p className="modal-text">
          Start typing to see products you are looking for.
        </p>
        <form className="search-form" onSubmit={handleSearch}>
          <input id="searchInput" type="text" placeholder="Search a product" />
          <button>
            <i className="bi bi-search"></i>
          </button>
        </form>
        <div className="search-results">
          <div className="search-heading">
            <h3>RESULTS FROM PRODUCT</h3>
          </div>
          <div
            className="results"
            style={{
              display: `${
                searchResult?.length === 0 || !searchResult ? "flex" : "grid"
              }`,
            }}
          >
            {!searchResult && (
              <b
                className="result-item"
                style={{
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                ürün ara
              </b>
            )}
            {searchResult?.length === 0 && (
              <a
                href="#"
                className="result-item"
                style={{
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                &#128532; Aradgınız ürün bulunamadı &#128532;
              </a>
            )}
            {searchResult?.length > 0 &&
              searchResult?.map((resultItem) => (
                <a
                  href="http://localhost:5173/product/65ef4906fccb80e88a986ccb"
                  className="result-item"
                  key={resultItem._id}
                >
                  <img
                    src={resultItem.images[0].thumbUrl}
                    className="search-thumb"
                    alt=""
                  />
                  <div className="search-info">
                    <h4>{resultItem.name}</h4>
                    <span className="search-sku">SKU: PD0016</span>
                    <span className="search-price">
                      {resultItem.price.basePrice.toFixed(2)}
                    </span>
                  </div>
                </a>
              ))}
          </div>
        </div>
        <i
          className="bi bi-x-circle"
          id="close-search"
          onClick={handleCloseModal}
        ></i>
      </div>
      <div
        className="modal-overlay"
        onClick={handleCloseModal}
      ></div>
    </div>
  );
};

Search.propTypes = {
  isSearchShow: PropTypes.bool,
  setIsSearchShow: PropTypes.func,
};

export default Search;
