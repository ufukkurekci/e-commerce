import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "./layouts/Layout.jsx";
import CardProvider from "./context/CardProvider.jsx";
import App from "./App.jsx";
import dotenv from "dotenv";
import config from "../../backend/src/config";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

const envPath = config?.production
    ? "../../backend/env/.prod"
    : "../../backend/env/.dev"

dotenv.config({
    path: envPath
})
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CardProvider>
      <Layout>
        <App />
      </Layout>
    </CardProvider>
  </BrowserRouter>
);
