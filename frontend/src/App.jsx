import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage";
import BlogPage from "./pages/BlogPage";
import CartPage from "./pages/CartPage";
import AuthPage from "./pages/AuthPage";
import ContactPage from "./pages/ContactPage";
import AdminUserPage from "./pages/admin/AdminUserPage.jsx";
import CreateProductPage from "./pages/products/CreateProductPage.jsx";
import ProductPage from "./pages/products/ProductPage.jsx";
import UpdateProductPage from "./pages/products/UpdateProductPage.jsx";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/shop" element={<ShopPage />}></Route>
      <Route path="/product/:id" element={<ProductDetailPage />}></Route>
      <Route path="/blog" element={<BlogPage />}></Route>
      <Route path="/cart" element={<CartPage />}></Route>
      <Route path="/auth" element={<AuthPage />}></Route>
      <Route path="/contact" element={<ContactPage />}></Route>
      <Route path="/admin/*">
        <Route path="users" element={<AdminUserPage />}></Route>
        <Route path="products/create" element={<CreateProductPage />}></Route>
        <Route path="products/update/:id" element={<UpdateProductPage />}></Route>
        <Route path="products" element={<ProductPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
