import "./Brands.css";
import BrandsItem from "./BrandItem.jsx";

const Brands = () => {
  return (
    <section className="brands">
      <div className="container">
        <ul className="brand-list">
            <BrandsItem></BrandsItem>
            <BrandsItem></BrandsItem>
            <BrandsItem></BrandsItem>
            <BrandsItem></BrandsItem>
            <BrandsItem></BrandsItem>
            
        </ul>
      </div>
    </section>
  );
};

export default Brands;
