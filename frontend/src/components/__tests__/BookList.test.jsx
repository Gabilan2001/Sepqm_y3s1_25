import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BookList from '../BookList';
import { getAllBooks, deleteBook } from '../../services/bookService';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mocking bookService
vi.mock('../../services/bookService');

// Test cases
describe('BookList Component', () => {
  const mockBooks = [
    {
      _id: '1',
      title: 'Test Book 1',
      author: 'Author 1',
      isbn: '1234567890',
      price: 29.99,
      quantity: 10
    },
    {
      _id: '2',
      title: 'Test Book 2',
      author: 'Author 2',
      isbn: '0987654321',
      price: 39.99,
      quantity: 5
    }
  ];

  beforeEach(() => {
    getAllBooks.mockResolvedValue({ data: mockBooks });
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <BookList />
      </BrowserRouter>
    );
  };

  it('renders book list with mock data', async () => {
    renderComponent();
    
    // Check if loading state is shown initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // Wait for books to load and check if they're displayed
    await waitFor(() => {
      expect(screen.getByText('Test Book 1')).toBeInTheDocument();
      expect(screen.getByText('Test Book 2')).toBeInTheDocument();
    });
  });

  it('shows error message when API call fails', async () => {
    getAllBooks.mockRejectedValue(new Error('Failed to fetch'));
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch books')).toBeInTheDocument();
    });
  });

  it('deletes a book when delete button is clicked', async () => {
    deleteBook.mockResolvedValue({ success: true });
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Test Book 1')).toBeInTheDocument();
    });

    // Mock window.confirm to always return true (confirming the deletion)
    window.confirm = vi.fn(() => true);

    // Click delete button for first book
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    // Verify delete was called with the correct book id
    expect(deleteBook).toHaveBeenCalledWith('1');
  });

  it('navigates to add new book page', async () => {
    renderComponent();
    
    // Use findAllByText instead of getAllByText to allow for async rendering
    const addNewBookLinks = await screen.findAllByText('Add New Book');
    expect(addNewBookLinks.length).toBeGreaterThanOrEqual(1); // Ensure there's at least one "Add New Book" button
    expect(addNewBookLinks[0].closest('a')).toHaveAttribute('href', '/books/new');
  });
});
