import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import BookList from '../BookList';
import { getAllBooks, createBook } from '../../services/bookService';

vi.mock('../../services/bookService');

describe('Book API Tests', () => {
  const mockBooks = [
    { _id: '1', title: 'Test Book 1', author: 'Author 1' },
    { _id: '2', title: 'Test Book 2', author: 'Author 2' },
  ];

  it('should fetch books from API', async () => {
    getAllBooks.mockResolvedValue({ data: mockBooks });

    render(<BookList />);

    await waitFor(() => {
      expect(screen.getByText('Test Book 1')).toBeInTheDocument();
      expect(screen.getByText('Test Book 2')).toBeInTheDocument();
    });
  });

  it('should post a new book to API', async () => {
    createBook.mockResolvedValue({ data: { title: 'New Book' } });

    // Assuming you have a form that submits a new book
    fireEvent.change(screen.getByLabelText('Title:'), { target: { value: 'New Book' } });
    fireEvent.change(screen.getByLabelText('Author:'), { target: { value: 'Author' } });
    fireEvent.submit(screen.getByText('Add Book'));

    await waitFor(() => {
      expect(screen.getByText('New Book')).toBeInTheDocument();
    });
  });
});
