import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBook, deleteBook } from '../services/bookService';

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBook();
    }, [id]);

    const fetchBook = async () => {
        try {
            const response = await getBook(id);
            setBook(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch book details');
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await deleteBook(id);
                navigate('/books');
            } catch (err) {
                setError('Failed to delete book');
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!book) return <div>Book not found</div>;

    return (
        <div className="book-details">
            <h2>{book.title}</h2>
            <div className="book-info">
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>ISBN:</strong> {book.isbn}</p>
                <p><strong>Price:</strong> ${book.price}</p>
                <p><strong>Quantity:</strong> {book.quantity}</p>
                <p><strong>Description:</strong></p>
                <p>{book.description}</p>
            </div>
            <div className="book-actions">
                <button onClick={() => navigate(`/books/edit/${id}`)}>
                    Edit Book
                </button>
                <button onClick={handleDelete} className="delete-button">
                    Delete Book
                </button>
                <button onClick={() => navigate('/books')}>
                    Back to List
                </button>
            </div>
        </div>
    );
};

export default BookDetails; 