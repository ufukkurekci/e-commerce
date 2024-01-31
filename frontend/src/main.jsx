import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "./layouts/Layout.jsx";
import CardProvider from "./context/CardProvider.jsx";
import App from "./App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CardProvider>
      <Layout>
        <App />
      </Layout>
    </CardProvider>
  </BrowserRouter>
);
