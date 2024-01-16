import CampainItem from "./CampainItem";
import "./Campains.css";

const Campains = () => {
  return (
    <section className="campaigns">
      <div className="container">
        <div className="campaigns-wrapper">
          <CampainItem></CampainItem>
          <CampainItem></CampainItem>
        </div>
        <div className="campaigns-wrapper">
          <CampainItem></CampainItem>
          <CampainItem></CampainItem>
        </div>
      </div>
    </section>
  );
};

export default Campains;
