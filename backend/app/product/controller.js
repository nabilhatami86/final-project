const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;
const config = require('../config');
const Product = require('./model');
const Category = require('../category/model')
const Tags = require('../tag/model')

// Fungsi untuk memastikan direktori tujuan ada
const ensureDirectoryExistence = (filePath) => {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

const createProduct = async (req, res, next) => {
    try {
        const { name, description, price, category, tags } = req.body;

        let categoryId = null;
        if (category) {
            console.log("Nama kategori yang diterima:", category);
            let newCategory = await Category.findOne({ name: { $regex: category, $options: 'i' } });
            console.log("Kategori ditemukan di database:", newCategory);

            if (!newCategory) {
                console.warn("Kategori tidak ditemukan, membuat kategori baru.");
                newCategory = await Category.create({ name: category });
                console.log("Kategori baru dibuat:", newCategory);
            }

            categoryId = newCategory._id;
        }

        let tagsId = [];
        if (tags && tags.length > 0) {
            const newTags = await Tags.find({ name: { $in: tags } });
            if (newTags.length > 0) {
                tagsId = newTags.map(tag => tag._id);
            }
        }

        let imageUrl = null;
        if (req.file) {
            const originalName = req.file.originalname.replace(/\s+/g, '_');
            const imagePath = req.file.path;
            const newFilename = `${originalName}`;
            const newPath = path.join(__dirname, '../../public', newFilename);

            const src = fs.createReadStream(imagePath);
            const dest = fs.createWriteStream(newPath);
            src.pipe(dest);

            await new Promise((resolve, reject) => {
                src.on('end', resolve);
                src.on('error', (err) => {
                    fs.unlinkSync(imagePath);
                    reject(err);
                });
            });

            const baseUrl = `${req.protocol}://${req.get('host')}`;
            imageUrl = `${baseUrl}/public/${newFilename}`;
        }

        const product = new Product({
            name,
            description,
            price: price || 0,
            image_url: imageUrl,
            category: categoryId,
            tags: tagsId
        });

        await product.save();

        const populatedProduct = await Product.findById(product._id)
            .populate('tags', 'name-_id')
            .populate('category', 'name-_id')
            .lean();


        return res.status(201).json({
            success: 1,
            message: 'Produk berhasil dibuat',
            data: populatedProduct,
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                error: 1,
                message: err.message,
                fields: err.errors,
            });
        }
        next(err);
    }
};


const updateProduct = async (req, res, next) => {
    try {
        const { name, description, price, category, tags } = req.body;
        const id = req.params.id;

        let categoryId = null;
        if (category) {
            const newCategory = await Category.findOne({ name: { $regex: category, $options: 'i' } });
            if (newCategory) {
                categoryId = newCategory._id;
            }
        }

        let tagsId = [];
        if (tags && tags.length > 0) {
            const newTags = await Tags.find({ name: { $in: tags } });
            if (newTags.length > 0) {
                tagsId = newTags.map(tag => tag._id);
            }
        }

        let imageUrl = null;
        if (req.file) {
            const originalName = req.file.originalname.replace(/\s+/g, '_');
            const imagePath = req.file.path;
            const newFilename = `${originalName}`;
            const newPath = path.join(__dirname, '../../public', newFilename);

            const src = fs.createReadStream(imagePath);
            const dest = fs.createWriteStream(newPath);
            src.pipe(dest);

            await new Promise((resolve, reject) => {
                src.on('end', resolve);
                src.on('error', (err) => {
                    fs.unlinkSync(imagePath);
                    reject(err);
                });
            });

            const baseUrl = `${req.protocol}://${req.get('host')}`;
            imageUrl = `${baseUrl}/public/${newFilename}`;
        }

        const product = await Product.findByIdAndUpdate(id, {
            name,
            description,
            price,
            category: categoryId,
            tags: tagsId,
            image_url: imageUrl,
        }, { new: true });

        res.json(product);
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.status(400).json({
                error: 1,
                message: err.message,
                fields: err.errors,
            });
        }
        next(err);
    }
};

const getProduct = async (req, res, next) => {
    try {
        let { keyword = '', category = '', tag = [], page = 1 } = req.query;

        let criteria = {};

        // Menangani pencarian berdasarkan query keyword
        if (keyword.length) {
            criteria = { ...criteria, name: { $regex: `${keyword}`, $options: 'i' } };
        }

        // Menangani filter berdasarkan kategori
        if (category.length) {
            let categoryResult = await Category.findOne({ name: { $regex: `${category}`, $options: 'i' } });
            if (categoryResult) {
                criteria = { ...criteria, category: categoryResult._id };
            }
        }

        // Menangani filter berdasarkan tag
        if (tag.length) {
            let tagResult = await Tags.find({ name: { $in: tag } });
            if (tagResult.length) {
                criteria = { ...criteria, tags: { $in: tagResult.map(t => t._id) } };
            }
        }

        // Hitung jumlah produk yang sesuai
        let count = await Product.find(criteria).countDocuments();

        // Terapkan paginasi
        let products = await Product.find(criteria)
            .skip((page - 1))
            .populate('category')
            .populate('tags');

        return res.json({
            data: products,
            count
        });
    } catch (err) {
        next(err);
    }
};


const deleteProduct = async (req, res, next) => {
    try {
        let product = await Product.findOneAndDelete({ _id: req.params.id });

        if (!product) {
            return res.status(404).json({ message: "Produk tidak ditemukan" });
        }

        let currentImg = path.join(config.rootPath, `../../public/${product.image_url}`);

        if (fs.existsSync(currentImg)) {
            fs.unlinkSync(currentImg);
        }

        return res.json({ message: "Produk dan gambar berhasil dihapus" });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
