const express = require('express');
const ProductModel = require('../Models/product.model');

const productRouter = express.Router();

// Route to create products
productRouter.post('/create-products', async (req, res) => {
    try {
        const { title, price, category, subCategory, image } = req.body;
        const product = new ProductModel({
            title, price, image, category, subCategory
        });

        await product.save();
        res.status(201).send('Product added successfully');
    } catch (error) {
        res.status(404).json({ message: `Error while adding product: ${error}` });
    }
});

// Get all products with sorting and filtering support
productRouter.get('/get-products', async (req, res) => {
    try {
        const { category, subCategory, sortBy, order } = req.query;

        let filter = {};
        if (category) filter.category = category;
        if (subCategory) filter.subCategory = subCategory;

        console.log("Filter:", filter);  // Debugging filter

        let query = ProductModel.find(filter);

        // Apply sorting
        if (sortBy) {
            const sortOrder = order === 'desc' ? -1 : 1;
            query = query.sort({ [sortBy]: sortOrder });
        }

        const products = await query;

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found.' });
        }

        res.status(200).json({
            message: 'Products retrieved successfully',
            products
        });
    } catch (error) {
        res.status(500).json({ message: `Error while retrieving products: ${error}` });
    }
});

// Get a product by ID
productRouter.get('/get-product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        res.status(200).json({
            message: 'Product fetched successfully',
            product
        });
    } catch (error) {
        res.status(404).json({ message: `Error fetching product with ID ${error}` });
    }
});

module.exports = productRouter;
