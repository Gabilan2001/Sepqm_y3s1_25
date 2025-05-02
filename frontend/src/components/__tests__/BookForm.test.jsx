import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import BookForm from '../BookForm'; // Add Book Form Component
import { createBook } from '../../services/bookService';

vi.mock('../../services/bookService');

describe('BookForm Component', () => {
  it('should add a new book', async () => {
    createBook.mockResolvedValue({ success: true, data: { title: 'New Book' } });

    render(<BookForm />);

    fireEvent.change(screen.getByLabelText('Title:'), { target: { value: 'New Book' } });
    fireEvent.change(screen.getByLabelText('Author:'), { target: { value: 'Author' } });
    fireEvent.submit(screen.getByText('Add Book'));

    await waitFor(() => {
      expect(screen.getByText('New Book')).toBeInTheDocument();
    });
  });
});
