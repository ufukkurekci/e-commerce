import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import CardProvider from "./context/CardProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CardProvider>
    <MainLayout>
      <App />
    </MainLayout>
  </CardProvider>
);
