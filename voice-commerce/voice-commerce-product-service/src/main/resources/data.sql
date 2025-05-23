-- Clear existing data
DELETE FROM product_images;
DELETE FROM products;
DELETE FROM categories;

-- Root Categories
INSERT INTO categories (name, description, display_order, active) VALUES
('Electronics', 'Electronic devices and accessories', 1, true),
('Fashion', 'Clothing, shoes, and accessories', 2, true),
('Home & Living', 'Furniture, decor, and household items', 3, true),
('Books', 'Books, e-books, and publications', 4, true),
('Sports & Outdoors', 'Sports equipment and outdoor gear', 5, true),
('Beauty & Health', 'Beauty products and healthcare items', 6, true),
('Toys & Games', 'Toys, games, and entertainment items', 7, true),
('Automotive', 'Car parts and accessories', 8, true);

-- Electronics Subcategories
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Smartphones', 'Mobile phones and accessories', id, 1, true FROM categories WHERE name = 'Electronics';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Laptops', 'Notebooks and laptops', id, 2, true FROM categories WHERE name = 'Electronics';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Audio', 'Headphones, speakers, and audio equipment', id, 3, true FROM categories WHERE name = 'Electronics';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Cameras', 'Digital cameras and photography equipment', id, 4, true FROM categories WHERE name = 'Electronics';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Gaming', 'Gaming consoles and accessories', id, 5, true FROM categories WHERE name = 'Electronics';

-- Fashion Subcategories
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Men''s Clothing', 'Clothing for men', id, 1, true FROM categories WHERE name = 'Fashion';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Women''s Clothing', 'Clothing for women', id, 2, true FROM categories WHERE name = 'Fashion';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Kids'' Clothing', 'Clothing for children', id, 3, true FROM categories WHERE name = 'Fashion';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Footwear', 'Shoes and footwear', id, 4, true FROM categories WHERE name = 'Fashion';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Accessories', 'Fashion accessories', id, 5, true FROM categories WHERE name = 'Fashion';

-- Home & Living Subcategories
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Furniture', 'Home furniture', id, 1, true FROM categories WHERE name = 'Home & Living';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Kitchen', 'Kitchen and dining', id, 2, true FROM categories WHERE name = 'Home & Living';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Decor', 'Home decoration', id, 3, true FROM categories WHERE name = 'Home & Living';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Bedding', 'Bed and bath', id, 4, true FROM categories WHERE name = 'Home & Living';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Lighting', 'Home lighting', id, 5, true FROM categories WHERE name = 'Home & Living';

-- Books Subcategories
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Fiction', 'Fiction books', id, 1, true FROM categories WHERE name = 'Books';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Non-Fiction', 'Non-fiction books', id, 2, true FROM categories WHERE name = 'Books';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Academic', 'Academic and educational books', id, 3, true FROM categories WHERE name = 'Books';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Children''s Books', 'Books for children', id, 4, true FROM categories WHERE name = 'Books';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Comics & Manga', 'Comics and manga', id, 5, true FROM categories WHERE name = 'Books';

-- Sports & Outdoors Subcategories
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Exercise Equipment', 'Fitness and exercise equipment', id, 1, true FROM categories WHERE name = 'Sports & Outdoors';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Team Sports', 'Team sports equipment', id, 2, true FROM categories WHERE name = 'Sports & Outdoors';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Camping', 'Camping and hiking gear', id, 3, true FROM categories WHERE name = 'Sports & Outdoors';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Cycling', 'Cycling equipment and accessories', id, 4, true FROM categories WHERE name = 'Sports & Outdoors';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Water Sports', 'Water sports equipment', id, 5, true FROM categories WHERE name = 'Sports & Outdoors';

-- Beauty & Health Subcategories
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Skincare', 'Skin care products', id, 1, true FROM categories WHERE name = 'Beauty & Health';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Makeup', 'Makeup and cosmetics', id, 2, true FROM categories WHERE name = 'Beauty & Health';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Hair Care', 'Hair care products', id, 3, true FROM categories WHERE name = 'Beauty & Health';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Personal Care', 'Personal care items', id, 4, true FROM categories WHERE name = 'Beauty & Health';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Health Care', 'Health care products', id, 5, true FROM categories WHERE name = 'Beauty & Health';

-- Toys & Games Subcategories
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Board Games', 'Board games and puzzles', id, 1, true FROM categories WHERE name = 'Toys & Games';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Action Figures', 'Action figures and collectibles', id, 2, true FROM categories WHERE name = 'Toys & Games';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Educational Toys', 'Educational and learning toys', id, 3, true FROM categories WHERE name = 'Toys & Games';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Outdoor Toys', 'Outdoor play equipment', id, 4, true FROM categories WHERE name = 'Toys & Games';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Arts & Crafts', 'Arts and crafts supplies', id, 5, true FROM categories WHERE name = 'Toys & Games';

-- Automotive Subcategories
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Car Parts', 'Automobile parts', id, 1, true FROM categories WHERE name = 'Automotive';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Car Electronics', 'Car electronics and accessories', id, 2, true FROM categories WHERE name = 'Automotive';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Car Care', 'Car care products', id, 3, true FROM categories WHERE name = 'Automotive';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Tools', 'Automotive tools', id, 4, true FROM categories WHERE name = 'Automotive';
INSERT INTO categories (name, description, parent_id, display_order, active) SELECT
'Motorcycle', 'Motorcycle parts and accessories', id, 5, true FROM categories WHERE name = 'Automotive';
