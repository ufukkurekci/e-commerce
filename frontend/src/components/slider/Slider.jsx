import './Slider.css';
import SliderItem from './SliderItem';

const Slider = () => {
  return (
    <section className="slider">
    <div className="slider-elements">
      <SliderItem></SliderItem>
      <div className="slider-buttons">
        <button onClick={()=>console.log()}>
          <i className="bi bi-chevron-left"></i>
        </button>
        <button onClick={()=>console.log()}>
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
      <div className="slider-dots">
        <button className="slider-dot active" onClick={()=>console.log()}>
          <span></span>
        </button>
        <button className="slider-dot" onClick={()=>console.log()}>
          <span></span>
        </button>
        <button className="slider-dot" onClick={()=>console.log()}>
          <span></span>
        </button>
      </div>
    </div>
  </section>
  )
}

export default Slider