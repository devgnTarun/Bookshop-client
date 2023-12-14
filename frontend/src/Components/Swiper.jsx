import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import PropTypes from 'prop-types';

export default function Slider({ sliderData }) {
  Slider.propTypes = {
    sliderData: PropTypes.array.isRequired,
  };

  return (
    <div className="container">
      <Swiper
        slidesPerView={1}
        breakpoints={{
          780: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        spaceBetween={20}
        navigation
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {sliderData.map((item) => (
          <SwiperSlide key={item.id} className="swiper-slide">
            <div className="card" style={{ width: '18rem' }}>
              <img
                className="card-img-top"
                src={item.src}
                alt={item.title}
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">Price: {item.price}</p>
                <button className="btn btn-secondary mb-2">
  <FaShoppingCart className="me-2" />
  Add to Cart
</button>
<button className="btn btn-secondary">
  <FaHeart className="me-2" />
  Add to Wishlist
</button>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
