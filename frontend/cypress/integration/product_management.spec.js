describe('Product Management', () => {
    const productData = {
      name: 'Test Product',
      description: 'This is a test product.',
      price: 100,
      category: 'Test Category',
      image: 'http://placekitten.com/200/200',
    };
  
    it('should visit the homepage and verify the product list', () => {
      // Visit the homepage
      cy.visit('http://localhost:3000'); // Adjust the URL to your frontend app
  
      // Check that the product list is visible
      cy.get('.product-list').should('be.visible');
    });
  
    it('should create a new product', () => {
      // Visit the product creation page
      cy.visit('http://localhost:3000/products/create');
  
      // Fill in the product form and submit it
      cy.get('input[name="name"]').type(productData.name);
      cy.get('textarea[name="description"]').type(productData.description);
      cy.get('input[name="price"]').type(productData.price);
      cy.get('input[name="category"]').type(productData.category);
      cy.get('input[name="image"]').type(productData.image);
  
      // Submit the form
      cy.get('button[type="submit"]').click();
  
      // Verify that the new product appears in the product list
      cy.get('.product-list')
        .should('contain', productData.name)
        .and('contain', productData.price);
    });
  
    it('should update a product', () => {
      // Assuming product ID is known or fetched from previous steps
      const productId = 'some-product-id'; 
  
      // Visit the product edit page
      cy.visit(`http://localhost:3000/products/${productId}/edit`);
  
      // Update the product price
      cy.get('input[name="price"]').clear().type(200);
  
      // Submit the form
      cy.get('button[type="submit"]').click();
  
      // Verify that the updated price is reflected
      cy.get('.product-list').should('contain', '200');
    });
  
    it('should delete a product', () => {
      // Assuming product ID is known or fetched from previous steps
      const productId = 'some-product-id'; 
  
      // Visit the product details page
      cy.visit(`http://localhost:3000/products/${productId}`);
  
      // Click the delete button
      cy.get('button.delete-product').click();
  
      // Verify that the product is no longer in the list
      cy.get('.product-list').should('not.contain', productData.name);
    });
  });
  