import Category from './components/category/Category'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Policy from './components/policy/Policy'
import Product from './components/product/Product.jsx'
import Slider from './components/slider/Slider.jsx'
import './App.css'



function App() {

  return (
    <>
        <Header></Header>
        <Slider></Slider>
        <Category></Category>
        <Product></Product>
        <Policy></Policy>
        <Footer></Footer>
    </>
  )
}

export default App
