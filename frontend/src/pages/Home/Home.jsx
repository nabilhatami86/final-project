import Product from "../../components/Product/ProductList";
import Slider from "react-slick";
import "./css/Home.css";
import Promosi1 from "../../assets/test1.jpg";
import Promosi2 from "../../assets/sale.jpg";
import Promosi3 from "../../assets/promosi4.jpeg";
import { FaStar, FaQuoteLeft, FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";

const ScrollToTop = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button onClick={scrollTop} className="scroll-to-top">
      ⬆
    </button>
  );
};

const Home = ({ searchTerm }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      {/* Gambar Promosi */}
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <Slider {...settings} className="promo-slider">
          <div className="slider-item">
            <img src={Promosi1} alt="Fashion Trends" className="img-fluid" />
            <div className="slider-content">
              <h2>Fashion Trends 2024</h2>
              <p>Discover the latest styles and stay trendy all year round!</p>
              <a href="/product" className="btn btn-primary">
                Shop Now
              </a>
            </div>
          </div>
          <div className="slider-item">
            <img src={Promosi2} alt="Sale" className="img-fluid" />
            <div className="slider-content">
              <h2>Big Sale!</h2>
              <p>Enjoy up to 50% off on selected items. Hurry up!</p>
              <a href="/product" className="btn btn-danger">
                Check Deals
              </a>
            </div>
          </div>
          <div className="slider-item">
            <img src={Promosi3} alt="New Arrivals" className="img-fluid" />
            <div className="slider-content">
              <h2>New Arrivals</h2>
              <p>Be the first to grab our newest products.</p>
              <a href="/product" className="btn btn-success">
                Explore Now
              </a>
            </div>
          </div>
        </Slider>
      )}

      {/* Produk Terbaru */}
      <div className="product-container mt-5">
        <h2 className="text-center mb-4">Produk Terbaru</h2>
        <div className="product-list">
          <Product searchTerm={searchTerm} />
        </div>
      </div>

      {/* Promo Spesial */}
      <div className="promotion-section text-center mt-5 py-5">
        <div className="promotion-content">
          <h3 className="promotion-title">
            Jangan Lewatkan Promo Spesial Kami!
          </h3>
          <p className="promotion-text">
            Segera dapatkan berbagai penawaran menarik dan diskon hingga 50%
            hanya di toko kami.
          </p>
          <a href="/product" className="btn btn-warning btn-promo">
            Lihat Promo
          </a>
        </div>
      </div>

      {/* Testimonial */}
      <div className="testimonial-section text-center mt-5 py-5">
        <h3 className="mb-5">Apa Kata Pelanggan Kami?</h3>
        <div className="testimonial-slider">
          <Slider {...settings}>
            <div className="testimonial-item">
              <FaQuoteLeft className="quote-icon" />
              <p>
                "Produk yang sangat berkualitas! Pengiriman cepat dan harga
                terjangkau."
              </p>
              <div className="user-info mt-4">
                <FaUserCircle className="user-icon" />
                <h5>Andi</h5>
                <div className="rating">
                  <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                </div>
              </div>
            </div>
            <div className="testimonial-item">
              <FaQuoteLeft className="quote-icon" />
              <p>"Pengalaman belanja yang menyenangkan, akan kembali lagi."</p>
              <div className="user-info mt-4">
                <FaUserCircle className="user-icon" />
                <h5>Siti</h5>
                <div className="rating">
                  <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                </div>
              </div>
            </div>
            <div className="testimonial-item">
              <FaQuoteLeft className="quote-icon" />
              <p>
                "Kualitas produk sangat bagus, sangat puas dengan layanan
                pelanggan."
              </p>
              <div className="user-info mt-4">
                <FaUserCircle className="user-icon" />
                <h5>Budi</h5>
                <div className="rating">
                  <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>

      {/* Scroll to Top */}
      <ScrollToTop />
    </div>
  );
};

export default Home;
