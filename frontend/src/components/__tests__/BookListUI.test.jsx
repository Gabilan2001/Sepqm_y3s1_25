import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BookList from '../BookList';

describe('BookList Component UI', () => {
  it('should navigate to add new book page when Add New Book button is clicked', () => {
    render(
      <BrowserRouter>
        <BookList />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Add New Book'));

    expect(window.location.pathname).toBe('/books/new');  // Assuming path is '/books/new'
  });
});
