import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    const product = new Product({
      name,
      description,
      price,
      category,
      image,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: 'Invalid product data' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.category = category || product.category;
      product.image = image || product.image;
      
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid product data' });
  }
};

export const deleteProduct = async (req, res) => {
    try {
      const id = req.params.id; 
  
      const product = await Product.findById(id);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      await product.deleteOne(); // or Product.findByIdAndDelete(id);
      res.status(200).json({ message: 'Product removed' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
  