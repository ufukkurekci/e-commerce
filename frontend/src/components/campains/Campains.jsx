import CampainItem from "./CampainItem";
import "./Campains.css";

const Campains = () => {
  return (
    <section class="campaigns">
      <div class="container">
        <div class="campaigns-wrapper">
          <CampainItem></CampainItem>
        </div>
        <div class="campaigns-wrapper">
          <CampainItem></CampainItem>
        </div>
      </div>
    </section>
  );
};

export default Campains;
