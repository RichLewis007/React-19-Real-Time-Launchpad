import { Product, Review, User, Cart, CartItem } from './types';

// Mock database implementation
// In a real app, this would connect to a proper database

class MockDatabase {
  private products: Product[] = [];
  private reviews: Review[] = [];
  private users: User[] = [];
  private carts: Cart[] = [];

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed products with images from Unsplash (https://unsplash.com)
    // All images are free to use under the Unsplash License
    this.products = [
      {
        id: 'p_1',
        title: 'Wireless Bluetooth Headphones',
        priceCents: 19999,
        tags: ['electronics', 'audio', 'wireless'],
        rating: 4.5,
        images: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1741770067276-a10e15ff5197?w=800&h=800&fit=crop&crop=center'
        ],
        specs: {
          'Battery Life': '30 hours',
          'Connectivity': 'Bluetooth 5.0',
          'Weight': '250g',
          'Noise Cancellation': 'Active'
        },
        stock: 25,
        description: 'Premium wireless headphones with active noise cancellation and superior sound quality.',
        createdAt: new Date('2025-01-15'),
        updatedAt: new Date('2025-01-15')
      },
      {
        id: 'p_2',
        title: 'Smart Fitness Watch',
        priceCents: 29999,
        tags: ['electronics', 'fitness', 'wearable'],
        rating: 4.3,
        images: [
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&h=800&fit=crop&crop=center'
        ],
        specs: {
          'Display': '1.4" AMOLED',
          'Battery Life': '7 days',
          'Water Resistance': '5ATM',
          'Sensors': 'Heart rate, GPS, Accelerometer'
        },
        stock: 15,
        description: 'Advanced fitness tracking with comprehensive health monitoring and GPS capabilities.',
        createdAt: new Date('2025-01-20'),
        updatedAt: new Date('2025-01-20')
      },
      {
        id: 'p_3',
        title: 'Mechanical Gaming Keyboard',
        priceCents: 14999,
        tags: ['electronics', 'gaming', 'keyboard'],
        rating: 4.7,
        images: [
          'https://images.unsplash.com/photo-1656711081969-9d16ebc2d210?w=800&h=800&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&h=800&fit=crop&crop=center'
        ],
        specs: {
          'Switch Type': 'Cherry MX Red',
          'Backlight': 'RGB',
          'Connectivity': 'USB-C',
          'Layout': 'Full-size'
        },
        stock: 8,
        description: 'Professional mechanical keyboard with RGB backlighting and premium switches.',
        createdAt: new Date('2025-02-01'),
        updatedAt: new Date('2025-02-01')
      },
      {
        id: 'p_4',
        title: '4K Ultra HD Monitor',
        priceCents: 59999,
        tags: ['electronics', 'display', 'monitor'],
        rating: 4.8,
        images: [
          'https://images.unsplash.com/photo-1547658718-1cdaa0852790?w=800&h=800&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1757774636742-0a5dc7e5c07a?w=800&h=800&fit=crop&crop=center'
        ],
        specs: {
          'Resolution': '3840 x 2160',
          'Panel Type': 'IPS',
          'Refresh Rate': '60Hz',
          'Connectivity': 'HDMI, DisplayPort, USB-C'
        },
        stock: 5,
        description: 'Stunning 4K monitor with wide color gamut and professional-grade color accuracy.',
        createdAt: new Date('2025-02-10'),
        updatedAt: new Date('2025-02-10')
      },
      {
        id: 'p_5',
        title: 'Wireless Gaming Mouse',
        priceCents: 8999,
        tags: ['electronics', 'gaming', 'mouse'],
        rating: 4.4,
        images: [
          'https://images.unsplash.com/photo-1625750188088-f6cd6756349c?w=800&h=800&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1563297007-0686b7003af7?w=800&h=800&fit=crop&crop=center'
        ],
        specs: {
          'DPI': '16000',
          'Connectivity': 'Wireless 2.4GHz',
          'Battery Life': '70 hours',
          'Buttons': 'Programmable'
        },
        stock: 20,
        description: 'High-precision wireless gaming mouse with customizable RGB lighting.',
        createdAt: new Date('2025-02-15'),
        updatedAt: new Date('2025-02-15')
      },
      {
        id: 'p_6',
        title: 'USB-C Hub',
        priceCents: 8999,
        tags: ['electronics', 'accessories', 'connectivity'],
        rating: 4.6,
        images: [
          'https://images.unsplash.com/photo-1616578273461-3a99ce422de6?w=800&h=800&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1760376789478-c1023d2dc007?w=800&h=800&fit=crop&crop=center'
        ],
        specs: {
          'Ports': 'HDMI, USB-A x3, USB-C, SD/TF card readers',
          'Compatibility': 'MacBook, Windows laptops, tablets',
          'Material': 'Aluminum housing',
          'Features': '4K HDMI output, fast charging'
        },
        stock: 15,
        description: 'Premium USB-C hub with multiple ports for laptops and tablets, featuring 4K HDMI output and fast charging.',
        createdAt: new Date('2025-02-20'),
        updatedAt: new Date('2025-02-20')
      },
      {
        id: 'p_7',
        title: 'Ergonomic Office Chair',
        priceCents: 39999,
        tags: ['furniture', 'office', 'ergonomic'],
        rating: 4.6,
        images: [
          'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&h=800&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&h=800&fit=crop&crop=center'
        ],
        specs: {
          'Material': 'Mesh Back, Leather Seat',
          'Adjustable': 'Height, Armrests, Lumbar Support',
          'Weight Capacity': '300 lbs',
          'Warranty': '5 years'
        },
        stock: 3,
        description: 'Premium ergonomic office chair designed for all-day comfort and productivity.',
        createdAt: new Date('2025-02-25'),
        updatedAt: new Date('2025-02-25')
      },
      {
        id: 'p_8',
        title: 'Wireless Charging Pad',
        priceCents: 2999,
        tags: ['electronics', 'charging', 'wireless'],
        rating: 4.1,
        images: [
          'https://images.unsplash.com/photo-1591290619618-904f6dd935e3?w=800&h=800&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1568246387285-527f42cd0833?w=800&h=800&fit=crop&crop=center'
        ],
        specs: {
          'Power Output': '15W Fast Charging',
          'Compatibility': 'Qi-enabled devices',
          'Material': 'Silicone, LED indicator',
          'Safety': 'Overcharge protection'
        },
        stock: 18,
        description: 'Fast wireless charging pad with LED indicator and universal Qi compatibility.',
        createdAt: new Date('2025-03-01'),
        updatedAt: new Date('2025-03-01')
      },
      {
        id: 'p_9',
        title: 'Bluetooth Speaker',
        priceCents: 7999,
        tags: ['electronics', 'audio', 'portable'],
        rating: 4.3,
        images: [
          'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?w=800&h=800&fit=crop&crop=center'
        ],
        specs: {
          'Battery Life': '12 hours',
          'Connectivity': 'Bluetooth 5.0',
          'Water Resistance': 'IPX7',
          'Sound': '360-degree audio'
        },
        stock: 22,
        description: 'Portable Bluetooth speaker with 360-degree sound and waterproof design.',
        createdAt: new Date('2025-03-05'),
        updatedAt: new Date('2025-03-05')
      },
      {
        id: 'p_10',
        title: 'LED Desk Lamp',
        priceCents: 7999,
        tags: ['furniture', 'office', 'lighting'],
        rating: 4.7,
        images: [
          'https://images.unsplash.com/photo-1708513427809-728a7913fc9f?w=800&h=800&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1623678624314-c3efb63fb2d2?w=800&h=800&fit=crop&crop=center'
        ],
        specs: {
          'Light Type': 'LED with adjustable brightness',
          'Color Temperature': '3000K-6000K adjustable',
          'Material': 'Aluminum and plastic',
          'Features': 'Touch control, USB charging port, flexible arm'
        },
        stock: 12,
        description: 'Modern LED desk lamp with adjustable brightness and color temperature, featuring touch controls and USB charging port.',
        createdAt: new Date('2025-03-10'),
        updatedAt: new Date('2025-03-10')
      }
    ];

    // Seed reviews
    this.reviews = [
      {
        id: 'r_1',
        productId: 'p_1',
        userId: 'u_1',
        body: 'Excellent sound quality and comfortable to wear for long periods.',
        stars: 5,
        createdAt: new Date('2025-01-20'),
        helpful: 12
      },
      {
        id: 'r_2',
        productId: 'p_1',
        userId: 'u_2',
        body: 'Good headphones but the battery life could be better.',
        stars: 4,
        createdAt: new Date('2025-01-25'),
        helpful: 8
      },
      {
        id: 'r_3',
        productId: 'p_2',
        userId: 'u_3',
        body: 'Great fitness tracker with accurate heart rate monitoring.',
        stars: 4,
        createdAt: new Date('2025-01-30'),
        helpful: 15
      }
    ];

    // Seed users
    this.users = [
      {
        id: 'demo_user',
        name: 'Demo User',
        email: 'demo@example.com',
        avatarUrl: '/avatars/demo.jpg',
        preferences: {
          favoriteCategories: ['electronics', 'gaming'],
          notifications: true,
          theme: 'light'
        },
        starredProducts: [],
        createdAt: new Date('2025-01-01')
      },
      {
        id: 'u_1',
        name: 'John Doe',
        email: 'john@example.com',
        avatarUrl: '/avatars/john.jpg',
        preferences: {
          favoriteCategories: ['electronics', 'gaming'],
          notifications: true,
          theme: 'light'
        },
        starredProducts: [],
        createdAt: new Date('2025-01-01')
      },
      {
        id: 'u_2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        avatarUrl: '/avatars/jane.jpg',
        preferences: {
          favoriteCategories: ['electronics', 'audio'],
          notifications: false,
          theme: 'dark'
        },
        starredProducts: [],
        createdAt: new Date('2025-01-05')
      }
    ];
  }

  // Product operations
  async getProducts(filters?: { category?: string; limit?: number }): Promise<Product[]> {
    let products = [...this.products];
    
    if (filters?.category) {
      products = products.filter(p => p.tags.includes(filters.category!));
    }
    
    if (filters?.limit) {
      products = products.slice(0, filters.limit);
    }
    
    return products;
  }

  async getProduct(id: string): Promise<Product | null> {
    return this.products.find(p => p.id === id) || null;
  }

  async searchProducts(query: string): Promise<Product[]> {
    const searchTerm = query.toLowerCase();
    return this.products.filter(p => 
      p.title.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  async getTrendingProducts(): Promise<Product[]> {
    // Mock trending based on rating and recent activity
    return this.products
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  }

  async getRecommendedProducts(userId: string): Promise<Product[]> {
    // Mock recommendations based on user preferences
    const user = this.users.find(u => u.id === userId);
    if (!user) return this.getTrendingProducts();
    
    return this.products
      .filter(p => user.preferences.favoriteCategories.some(cat => p.tags.includes(cat)))
      .slice(0, 4);
  }

  // Review operations
  async getReviews(productId: string): Promise<Review[]> {
    return this.reviews.filter(r => r.productId === productId);
  }

  async addReview(review: Omit<Review, 'id' | 'createdAt' | 'helpful'>): Promise<Review> {
    const newReview: Review = {
      ...review,
      id: `r_${Date.now()}`,
      createdAt: new Date(),
      helpful: 0
    };
    this.reviews.push(newReview);
    return newReview;
  }

  // Cart operations
  async getCart(userId: string): Promise<Cart | null> {
    return this.carts.find(c => c.userId === userId) || null;
  }

  async addToCart(userId: string, productId: string, quantity: number): Promise<Cart> {
    let cart = await this.getCart(userId);
    
    if (!cart) {
      cart = {
        id: `cart_${userId}`,
        userId,
        items: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.carts.push(cart);
    }

    const existingItem = cart.items.find(item => item.productId === productId);
    const product = await this.getProduct(productId);
    
    if (!product) {
      throw new Error('Product not found');
    }

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity,
        priceAtAddCents: product.priceCents,
        addedAt: new Date()
      });
    }

    cart.updatedAt = new Date();
    return cart;
  }

  async updateCartItem(userId: string, productId: string, quantity: number): Promise<Cart> {
    const cart = await this.getCart(userId);
    if (!cart) {
      throw new Error('Cart not found');
    }

    const item = cart.items.find(item => item.productId === productId);
    if (!item) {
      throw new Error('Item not found in cart');
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(item => item.productId !== productId);
    } else {
      item.quantity = quantity;
    }

    cart.updatedAt = new Date();
    return cart;
  }

  async removeFromCart(userId: string, productId: string): Promise<Cart> {
    return this.updateCartItem(userId, productId, 0);
  }

  // User operations
  async getUser(id: string): Promise<User | null> {
    return this.users.find(u => u.id === id) || null;
  }

  async updateUserPreferences(userId: string, preferences: Partial<User['preferences']>): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.preferences = { ...user.preferences, ...preferences };
    return user;
  }

  // Starred products operations
  async getStarredProducts(userId: string): Promise<Product[]> {
    const user = await this.getUser(userId);
    if (!user) {
      return [];
    }

    return this.products.filter(product => 
      user.starredProducts.includes(product.id)
    );
  }

  async addToStarred(userId: string, productId: string): Promise<boolean> {
    const user = await this.getUser(userId);
    if (!user) {
      return false;
    }

    if (!user.starredProducts.includes(productId)) {
      user.starredProducts.push(productId);
    }
    return true;
  }

  async removeFromStarred(userId: string, productId: string): Promise<boolean> {
    const user = await this.getUser(userId);
    if (!user) {
      return false;
    }

    user.starredProducts = user.starredProducts.filter(id => id !== productId);
    return true;
  }

  async isProductStarred(userId: string, productId: string): Promise<boolean> {
    const user = await this.getUser(userId);
    if (!user) {
      return false;
    }

    return user.starredProducts.includes(productId);
  }
}

// Singleton instance
export const db = new MockDatabase();
