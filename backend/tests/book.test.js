import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { getAllBooks, deleteBook } from '../frontend/src/services/bookService';  // Adjusted path
import { vi, describe, it, expect, beforeAll, afterAll } from 'vitest';

let mongoServer;

// Set up the MongoMemoryServer before all tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Close the in-memory MongoDB connection after all tests
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

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
});
