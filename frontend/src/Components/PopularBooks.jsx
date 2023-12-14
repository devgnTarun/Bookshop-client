import { useState } from 'react';
import Carousel from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import * as style from './PopularBooks.css.ts'

const PopularBooks = () => {
  const [books] = useState([
    {
      title: 'Book 1',
      author: 'Author 1',
      image: '', 
    },
    {
      title: 'Book 2',
      author: 'Author 2',
      image: '', 
    },
    {
      title: 'Book 3',
      author: 'Author 3',
      image: '', 
    },
    {
      title: 'Book 4',
      author: 'Author 4',
      image: '', 
    },
    {
      title: 'Book 5',
      author: 'Author 5',
      image: '', 
    },
    {
      title: 'Book 6',
      author: 'Author 6',
      image: '', 
    },
  ]);

  return (
    <div className={style.popularBooks}>
      <Carousel
      className={style.carousel}
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
      >
        {books.map((book, index) => (
          <div key={index}>
            <img
              src={book.image}
              alt={book.title}
              className={style.carouselImage}
            />
            <div className={style.carouselCaption}>
              <h3 className={style.bookTitle}>{book.title}</h3>
              <p className={style.bookAuthor}>{book.author}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default PopularBooks;
