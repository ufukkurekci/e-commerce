import { useParams } from "react-router-dom";
import ProductDetails from "../components/productDetails/ProductDetails";

const ProductDetailPage = () => {

  const {id} = useParams();
  return <ProductDetails productId={id}></ProductDetails>;
};

export default ProductDetailPage;
