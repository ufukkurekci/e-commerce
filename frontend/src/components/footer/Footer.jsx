import React from "react";
import Policy from "../policy/Policy";
import "./Footer.css"
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <React.Fragment>
      <Policy></Policy>
      <footer className="footer">
      <div className="subscribe-row">
        <div className="container">
          <div className="footer-row-wrapper">
            <div className="footer-subscribe-wrapper">
              <div className="footer-subscribe">
                <div className="footer-subscribe-top">
                  <h3 className="subscribe-title">
                    Yeni ürünler , indirim ve kampanyalardan haberiniz olsun !
                  </h3>
                  <p className="subscribe-desc">
                    We`ll email you a voucher worth $10 off your first order
                    over $50.
                  </p>
                </div>
                <div className="footer-subscribe-bottom">
                  <form>
                    <input
                      type="text"
                      placeholder="Enter your email address."
                    />
                    <button className="btn">ABONE OL</button>
                  </form>
                  {/* <p className="privacy-text">
                    By subscribing you agree to our{" "}
                    <a href="#">
                      Terms & Conditions and Privacy & Cookies Policy.
                    </a>
                  </p> */}
                </div>
              </div>
            </div>
            <div className="footer-contact-wrapper">
              <div className="footer-contact-top">
                <h3 className="contact-title">
                  Need help? <br />
                  (+90) 123 456 78 90
                </h3>
                <p className="contact-desc">We are available 8:00am – 7:00pm</p>
              </div>
              <div className="footer-contact-bottom">
                <div className="download-app">
                  <a href="#">
                    <img src="img/footer/app-store.png" alt="" />
                  </a>
                  <a href="#">
                    <img src="img/footer/google-play.png" alt="" />
                  </a>
                </div>
                <p className="privacy-text">
                  <strong>Yakında tüm platformlarda ..</strong> 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="widgets-row">
        <div className="container">
          <div className="footer-widgets">
            <div className="brand-info">
              <div className="footer-logo">
              <Link to={"/"} className="logo">
                <img
                  src="../../../img/logo.png"
                  alt="logo"
                />
              </Link>
              </div>
              <div className="footer-desc">
                <p>
                  {" "}
                  Muhteşem Tat !
                </p>
              </div>
              <div className="footer-contact">
                <p>
                  <a href="tel:555 555 55 55">(+800) 1234 5678 90</a> –{" "}
                  <a href="mailto:info@example.com">info@bahcembaharat.com</a>
                </p>
              </div>
            </div>
            <div className="widget-nav-menu">
              <h4>Bilgi</h4>
              <ul className="menu-list">
                <li>
                  <a href="#">Hakkımızda</a>
                </li>
                <li>
                  <a href="#">Gizlilik Politikası</a>
                </li>
                <li>
                  <a href="#">İade Politikası</a>
                </li>
                <li>
                  <a href="#">Teslimat Politikası</a>
                </li>
              </ul>
            </div>
            <div className="widget-nav-menu">
              <h4>Hesap</h4>
              <ul className="menu-list">
                <li>
                  <a href="#">Hesabım</a>
                </li>
                <li>
                  <a href="#">Siparişlerim</a>
                </li>
                <li>
                  <a href="#">Favorilerim</a>
                </li>

              </ul>
            </div>
            {/* <div className="widget-nav-menu">
              <h4>Shop</h4>
              <ul className="menu-list">
                <li>
                  <a href="#">Affiliate</a>
                </li>
                <li>
                  <a href="#">Bestsellers</a>
                </li>
                <li>
                  <a href="#">Discount</a>
                </li>
                <li>
                  <a href="#">Latest Products</a>
                </li>
                <li>
                  <a href="#">Sale Products</a>
                </li>
              </ul>
            </div> */}
            {/* <div className="widget-nav-menu">
              <h4>Categories</h4>
              <ul className="menu-list">
                <li>
                  <a href="#">Women</a>
                </li>
                <li>
                  <a href="#">Men</a>
                </li>
                <li>
                  <a href="#">Bags</a>
                </li>
                <li>
                  <a href="#">Outerwear</a>
                </li>
                <li>
                  <a href="#">Shoes</a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
      <div className="copyright-row">
        <div className="container">
          <div className="footer-copyright">
            <div className="site-copyright">
              <p>
                Copyright 2024 © Bahçem Baharat. All right reserved. 
              </p>
            </div>
            <a href="#">
              <img src="img/footer/cards.png" alt="" />
            </a>
            <div className="footer-menu">
              <ul className="footer-menu-list">
                <li className="list-item">
                  <a href="#">Gizlilik Politikası</a>
                </li>
                <li className="list-item">
                  <a href="#">Uzaktan Satış Şartları</a>
                </li>
                <li className="list-item">
                  <a href="#">İade Politikası</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </React.Fragment>

  );
};

export default Footer;
