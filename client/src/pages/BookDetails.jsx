import './BookDetails.css';
import greenCheck from '../assets/green-check.svg';
import unreadX from '../assets/unread-x.svg';
import closeX from '../assets/close-x.svg';
import noImage from '../assets/no-image.svg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function BookDetails() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const location = useLocation();
  let { book } = location.state;

  //true or false, coming from Add Book component, using find book method in book controller
  let inUsersList = book.inUsersBooks;
  let hasRead;
  // to test if data is coming from my book list component, if so books will have hasRead property
  if (book.hasRead !== undefined) {
    inUsersList = true;
    hasRead = book.hasRead;
    book = book._id;
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (hasRead !== undefined) {
        navigate('/booklist');
      } else {
        navigate('/addbook');
      }
    }
  };

  async function handleRemoveClick(e) {
    const id = e.target.dataset.id;

    const res = await fetch(`/api/v1/users/delete/${id}`, {
      method: 'DELETE',
    });

    navigate('/booklist');
  }

  async function handleAddClick(e) {
    try {
      const id = e.target.dataset.id;

      const res = await fetch(`/api/v1/books/${id}`, {
        method: 'POST',
      });

      const data = await res.json();

      if (data.status === 'success') {
        navigate('/addbook');
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <div className='book-details'>
        <div className='container'>
          <Link to={hasRead !== undefined ? '/booklist' : '/addbook'}>
            <img
              src={closeX}
              tabIndex='0'
              alt='close x'
              className='close-x'
              onKeyDown={handleKeyDown}
            />
          </Link>
          <h2 className='details-header'>Book Details</h2>
          {error && <p>{error}</p>}
          <div className='book-info'>
            {book && (
              <>
                <h3 className='details-title'>Title: {book.title}</h3>
                <p className='book-detail-p'>
                  Google Book's Rating {book.avgGoogleBooksRating} (
                  {book.googleBooksRatingsCount} reviews)
                </p>
                <p className='book-detail-p'>
                  Author: {book.authors.join(', ')}
                </p>
                <p className='book-detail-p summary'>{book.description}</p>
                <p className='book-detail-p'>ISBN: {book.isbn}</p>
                <p className='book-detail-p'>
                  Category: {book.categories.join(', ')}
                </p>
                <p className='book-detail-p'>
                  Number of Pages: {book.pageCount}
                </p>
                <p className='book-detail-p'>Publisher: {book.publisher}</p>
                <p className='book-detail-p'>
                  Date of Publication: {book.publishedDate}
                </p>
                {inUsersList && (
                  <p className='book-detail-p'>
                    Read Status:{' '}
                    <img
                      src={hasRead ? greenCheck : unreadX}
                      alt={hasRead ? 'read check' : 'unread check'}
                    />
                  </p>
                )}
                <img
                  className='book-image'
                  src={
                    book.imageLinks?.thumbnail
                      ? book.imageLinks?.thumbnail
                      : noImage
                  }
                  alt='cover of book'
                />
                {!inUsersList && (
                  <button
                    className='btn'
                    data-id={book.googleBookId}
                    onClick={handleAddClick}
                  >
                    Add Book
                  </button>
                )}
                {inUsersList && (
                  <button
                    className='btn'
                    data-id={book._id}
                    onClick={handleRemoveClick}
                  >
                    Remove Book
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
