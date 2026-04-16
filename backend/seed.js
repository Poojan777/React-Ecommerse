const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

const Product = mongoose.model('Product', productSchema);

// Sample products with image URLs (using placeholder images)
const sampleProducts = [
  {
    name: 'Ergonomic Office Chair',
    price: 299.99,
    image: '/uploads/chair.jpg',
  },
  {
    name: 'Premium Desk Lamp',
    price: 149.99,
    image: '/uploads/lamp.jpg',
  },
  {
    name: 'Mechanical Keyboard',
    price: 199.99,
    image: '/uploads/keyboard.jpg',
  },
  {
    name: 'Monitor Stand',
    price: 89.99,
    image: '/uploads/stand.jpg',
  },
  {
    name: 'USB-C Hub',
    price: 49.99,
    image: '/uploads/hub.jpg',
  },
  {
    name: 'Wireless Mouse',
    price: 79.99,
    image: '/uploads/mouse.jpg',
  },
];

const seedDatabase = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Add new products
    const result = await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully seeded ${result.length} products!`);
    
    // Display added products
    console.log('\nAdded products:');
    result.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - $${product.price}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();
