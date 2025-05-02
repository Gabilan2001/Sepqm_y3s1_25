const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
let mongoServer;

// Sample product schema (assuming you have this model in your application)
const Product = mongoose.model('Product', new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
}));

beforeAll(async () => {
  // Create an instance of MongoMemoryServer
  mongoServer = await MongoMemoryServer.create();
  
  // Get the connection URI for the MongoDB memory server
  const mongoUri = mongoServer.getUri();

  // Ensure that the mongoose connection happens only once, before all tests
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Ensure mongoose disconnects after all tests finish
  await mongoose.disconnect();

  // Stop the in-memory server after the tests finish
  await mongoServer.stop();

  // Make sure all timers are cleared before exiting
  jest.clearAllTimers(); 
});

describe('Product API', () => {
  let createdProductId;

  test('should create a new product', async () => {
    const newProduct = {
      name: 'Test Product',
      price: 100,
      description: 'This is a test product',
    };

    const product = await Product.create(newProduct);
    createdProductId = product._id; // Save the product ID for later tests

    expect(product.name).toBe(newProduct.name);
    expect(product.price).toBe(newProduct.price);
    expect(product.description).toBe(newProduct.description);
  });

  test('should fetch all products', async () => {
    const products = await Product.find();
    expect(products.length).toBeGreaterThan(0); // Assuming at least 1 product is in the database
  });

  test('should fetch a product by ID', async () => {
    const product = await Product.findById(createdProductId);
    expect(product).not.toBeNull();
    expect(product._id.toString()).toBe(createdProductId.toString());
  });

  test('should update an existing product', async () => {
    const updatedData = { price: 150 };
    const updatedProduct = await Product.findByIdAndUpdate(
      createdProductId,
      updatedData,
      { new: true }
    );

    expect(updatedProduct.price).toBe(updatedData.price);
  });

  test('should delete a product by ID', async () => {
    const result = await Product.findByIdAndDelete(createdProductId);
    expect(result).not.toBeNull();

    const deletedProduct = await Product.findById(createdProductId);
    expect(deletedProduct).toBeNull();
  });
});
