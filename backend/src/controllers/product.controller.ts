import { Request, Response } from 'express';
import Product, { IProduct } from '../models/Product';
import { generateSKU } from '../utils/helpers';

// Get all products
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, category, lowStock, page = 1, limit = 10 } = req.query;
    
    const query: any = {};
    
    // Apply filters
    if (search) {
      query.$text = { $search: search as string };
    }
    
    if (category) {
      query.category = category;
    }
    
    if (lowStock === 'true') {
      query.$expr = { $lte: ['$quantity', '$minStockLevel'] };
    }
    
    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    
    const total = await Product.countDocuments(query);
    
    res.status(200).json({
      products,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Get all products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single product by ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const product = await Product.findById(id);
    
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    
    res.status(200).json({ product });
  } catch (error) {
    console.error('Get product by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new product
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      description,
      price,
      costPrice,
      category,
      quantity,
      minStockLevel,
      imageUrl,
      barcode,
      expiryDate,
    } = req.body;
    
    // Generate SKU
    const sku = generateSKU(name, category);
    
    const product = new Product({
      name,
      description,
      price,
      costPrice,
      category,
      quantity,
      minStockLevel: minStockLevel || 5,
      imageUrl,
      sku,
      barcode,
      expiryDate,
    });
    
    await product.save();
    
    res.status(201).json({
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a product
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const product = await Product.findById(id);
    
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    
    // Update product fields
    Object.assign(product, updateData);
    
    await product.save();
    
    res.status(200).json({
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const product = await Product.findById(id);
    
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    
    // Soft delete by marking as inactive
    product.isActive = false;
    await product.save();
    
    res.status(200).json({
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get low stock products
export const getLowStockProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const lowStockProducts = await Product.find({
      $expr: { $lte: ['$quantity', '$minStockLevel'] },
      isActive: true,
    });
    
    res.status(200).json({ products: lowStockProducts });
  } catch (error) {
    console.error('Get low stock products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};