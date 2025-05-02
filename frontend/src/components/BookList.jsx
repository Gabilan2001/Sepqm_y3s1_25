import { useState, useEffect } from 'react';
import { getAllBooks, deleteBook } from '../services/bookService';
import { Link } from 'react-router-dom';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await getAllBooks();
            setBooks(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch books');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await deleteBook(id);
                setBooks(books.filter(book => book._id !== id));
            } catch (err) {
                setError('Failed to delete book');
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="book-list">
            <h2>Books</h2>
            <Link to="/books/new" className="add-button">Add New Book</Link>
            
            <div className="books-grid">
                {books.map((book) => (
                    <div key={book._id} className="book-card">
                        <h3>{book.title}</h3>
                        <p>Author: {book.author}</p>
                        <p>ISBN: {book.isbn}</p>
                        <p>Price: ${book.price}</p>
                        <p>Quantity: {book.quantity}</p>
                        <div className="book-actions">
                            <Link to={`/books/${book._id}`} className="view-button">View</Link>
                            <Link to={`/books/edit/${book._id}`} className="edit-button">Edit</Link>
                            <button 
                                onClick={() => handleDelete(book._id)}
                                className="delete-button"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookList; 