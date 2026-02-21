import React, { useState, useMemo, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Star, Heart, Share2, Facebook, Twitter, Instagram } from 'lucide-react';
import Footer from '../pages/Footer';
import { products as originalProducts, accessoryProducts } from '../data/products';
import MountReveal from '../components/MountReveal';
import soldBadge from '../assets/soldout.png';

// cache preloaded image urls so we don't create duplicate Image objects
const preloadedImages = new Set()

const StarRow = ({ rating = 5 }) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="text-yellow-400 text-sm mt-2 flex items-center justify-center">
      {Array.from({ length: full }).map((_, i) => (
        <span key={i}>★</span>
      ))}
      {half && <span>☆</span>}
    </div>
  );
};

const Shop = () => {
  console.log('Shop component loaded at:', new Date().toISOString())
  
  const cart = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  // Updated products from admin changes - prioritize localStorage over original data
  const [currentProducts, setCurrentProducts] = useState(() => {
    const savedProducts = localStorage.getItem('wigProducts');
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        console.log('Loading products from localStorage:', parsed);
        return parsed;
      } catch (error) {
        console.error('Error parsing saved products:', error);
        return originalProducts; // Fallback to original products
      }
    }
    // Always use original products as fallback
    return originalProducts;
  });

  // Merge original products with localStorage edits - preserve original titles but allow overrides
  const mergedProducts = useMemo(() => {
    const savedProducts = localStorage.getItem('wigProducts');
    if (savedProducts) {
      try {
        const editedProducts = JSON.parse(savedProducts);
        console.log('Merging with edited products:', editedProducts);
        
        // Create a map of edited products by ID for quick lookup
        const editedProductsMap = new Map(editedProducts.map(p => [p.id, p]));
        
        // Start with original products and override with edited versions
        const merged = originalProducts.map(originalProduct => {
          const editedVersion = editedProductsMap.get(originalProduct.id);
          if (editedVersion) {
            // Merge edited version with original, preserving position if set
            return {
              ...originalProduct,
              ...editedVersion,
              id: originalProduct.id // Ensure ID is preserved
            };
          }
          return originalProduct;
        });
        
        // Sort by position to ensure proper ordering
        merged.sort((a, b) => {
          const aPos = a.position !== undefined ? a.position : 999;
          const bPos = b.position !== undefined ? b.position : 999;
          return aPos - bPos;
        });
        
        console.log('Final merged products:', merged);
        return merged;
      } catch (error) {
        console.error('Error parsing saved products:', error);
        return originalProducts;
      }
    }
    return originalProducts;
  }, [currentProducts]);

  useEffect(() => {
    localStorage.setItem('wigProducts', JSON.stringify(currentProducts));
  }, [currentProducts]);

  // Listen for changes from admin dashboard
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'wigProducts') {
        console.log('Shop detected admin changes via storage, updating products');
        const newProducts = e.newValue ? JSON.parse(e.newValue) : originalProducts;
        setCurrentProducts(newProducts);
      }
    };

    const handleProductsUpdated = (e) => {
      console.log('Shop detected admin changes via custom event, updating products');
      setCurrentProducts(e.detail);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('productsUpdated', handleProductsUpdated);
    
    // Also check for changes on focus (for same-tab updates)
    const handleFocus = () => {
      const savedProducts = localStorage.getItem('wigProducts');
      if (savedProducts) {
        try {
          const newProducts = JSON.parse(savedProducts);
          setCurrentProducts(newProducts);
        } catch (error) {
          console.error('Error parsing products on focus:', error);
        }
      }
    };

    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('productsUpdated', handleProductsUpdated);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const [addedIds, setAddedIds] = useState(() => new Set())
  const addedTimers = React.useRef({})

  useEffect(() => {
    return () => {
      const timers = addedTimers.current || {}
      Object.values(timers).forEach(t => clearTimeout(t))
      addedTimers.current = {}
    }
  }, [])

  const markAdded = (id, duration = 1500) => {
    setAddedIds(prev => {
      const s = new Set(prev)
      s.add(id)
      return s
    })
    if (addedTimers.current[id]) clearTimeout(addedTimers.current[id])
    addedTimers.current[id] = setTimeout(() => {
      setAddedIds(prev => {
        const s = new Set(prev)
        s.delete(id)
        return s
      })
      delete addedTimers.current[id]
    }, duration)
  }

  const handleAdd = (e, p) => {
    const card = e.currentTarget.closest('.product-card') || e.currentTarget.closest('.rounded-lg') || e.currentTarget.parentElement
    const img = card ? (card.querySelector('img[data-product-image]') || card.querySelector('img')) : null
    const rect = img && img.getBoundingClientRect ? img.getBoundingClientRect() : null
    cart.addItem(p, { sourceEl: img, imgSrc: img?.src || p.image, imgRect: rect })
    // show visual added state while preserving fly animation
    markAdded(p.id)
  }

  // preload images for faster product page loads (on hover/focus/touch)
  const preloadImages = (p) => {
    if (!p) return
    const list = p.images && p.images.length ? p.images : [p.image]
    list.forEach(src => {
      if (!preloadedImages.has(src)) {
        const img = new Image()
        img.src = src
        preloadedImages.add(src)
      }
    })
  }

  const [sort, setSort] = useState('default');
  const [category, setCategory] = useState('all');

  const displayedProducts = useMemo(() => {
    let list = [...mergedProducts];
    
    // Sort by position first, then by original order if no position
    list.sort((a, b) => {
      const aPos = a.position !== undefined ? a.position : 999;
      const bPos = b.position !== undefined ? b.position : 999;
      return aPos - bPos;
    });
    
    if (category && category !== 'all') {
      if (category === 'lace') list = list.filter((p) => /lace/i.test(p.name));
      if (category === 'human') list = list.filter((p) => /human/i.test(p.name));
      if (category === 'synthetic') list = list.filter((p) => /synthetic/i.test(p.name));
      if (category === 'curly') list = list.filter((p) => /curly|wave|curl/i.test(p.name));
      if (category === 'straight') list = list.filter((p) => /straight|bob/i.test(p.name));
      if (category === 'colored') list = list.filter((p) => /color|blonde|brunette|red|grey|fashion|ombre|highlight|balayage/i.test(p.name));
      if (category === 'accessories') list = []; // Show no wigs when accessories category is selected
    }
    if (sort === 'low-high') return list.sort((a, b) => a.price - b.price);
    if (sort === 'high-low') return list.sort((a, b) => b.price - a.price);
    // Keep products in position order for 'default' sort
    return list;
  }, [mergedProducts, sort, category]);

  return (
    <>
      <MountReveal className="min-h-screen bg-gray-50 py-12 md:pt-30" style={{
        backgroundColor: 'white',
      }}>
        <div className="max-w-8xl mx-auto px-2 md:px-7">
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
            <div>
              <p className="text-black font-semibold uppercase">Shop</p>
            </div>

            <div className="w-full md:w-auto ">
              <div className="flex flex-col md:flex-row md:items-center gap-4 ">
                <div className="w-full md:w-auto ">
                  <div className="text-xs text-gray-600 mb-3 uppercase tracking-wider">Sort By</div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSort('default')}
                      className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                        sort === 'default' 
                          ? 'bg-black text-white shadow-md' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Featured
                    </button>
                    <button
                      onClick={() => setSort('low-high')}
                      className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                        sort === 'low-high' 
                          ? 'bg-black text-white shadow-md' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Price: Low to High
                    </button>
                    <button
                      onClick={() => setSort('high-low')}
                      className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                        sort === 'high-low' 
                          ? 'bg-black text-white shadow-md' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Price: High to Low
                    </button>
                  </div>
                </div>

                <div className="w-full md:w-auto">
                  <div className="text-xs text-gray-600 mb-3 uppercase tracking-wider">Categories</div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setCategory('all')}
                      className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                        category === 'all' 
                          ? 'bg-black text-white shadow-md' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setCategory('lace')}
                      className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                        category === 'lace' 
                          ? 'bg-black text-white shadow-md' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Lace
                    </button>
                    <button
                      onClick={() => setCategory('human')}
                      className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                        category === 'human' 
                          ? 'bg-black text-white shadow-md' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Human Hair
                    </button>
                    <button
                      onClick={() => setCategory('curly')}
                      className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                        category === 'curly' 
                          ? 'bg-black text-white shadow-md' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Curly
                    </button>
                    <button
                      onClick={() => setCategory('straight')}
                      className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                        category === 'straight' 
                          ? 'bg-black text-white shadow-md' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Straight
                    </button>
                    <button
                      onClick={() => setCategory('colored')}
                      className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                        category === 'colored' 
                          ? 'bg-black text-white shadow-md' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Colored
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {displayedProducts.map((p, index) => {
              console.log('Shop generating link for:', p.id, p.name, 'Link:', `/product/${p.id}`)
              return (
              <div key={p.id} className="product-card rounded-lg overflow-hidden relative" style={{
                backgroundColor: 'white',
              }}>
                <div className="h-50 md:h-80 bg-gray-100 flex items-center justify-center overflow-hidden relative">
                    <Link
                      to={`/product/${p.id}`}
                      className="w-full h-full block"
                      onMouseEnter={() => preloadImages(p)}
                      onFocus={() => preloadImages(p)}
                      onTouchStart={() => preloadImages(p)}
                      onPointerOver={() => preloadImages(p)}
                    >
                      <img src={p.image} alt={p.name} data-product-image="true" className="w-full h-full object-cover" />
                    </Link>
                    {p.soldOut && <img src={soldBadge} alt="Sold out" className="absolute top-2 right-2 w-12 h-12 pointer-events-none" />}
                  </div>

                <div className="p-4 text-center">
                  <div className="text-[10px] tracking-widest uppercase text-gray-700 font-semibold -mt-1">{p.name}</div>
                  <div className="mt-2 font-semibold text-xs">{`₦ ${Number(p.price).toLocaleString()}`}</div>

                  {(() => {
                    const isAdded = addedIds.has(p.id)
                    return (
                      <button
                        onClick={!p.soldOut && !isAdded ? (e) => handleAdd(e, p) : undefined}
                        disabled={p.soldOut || isAdded}
                        className={`${p.soldOut ? 'mt-1 w-full bg-gray-300 text-gray-600 py-2 rounded-md text-sm cursor-not-allowed' : isAdded ? 'mt-1 w-full bg-green-500 text-white py-2 rounded-md text-sm flex items-center justify-center gap-2' : 'mt-1 w-full bg-white text-black border border-gray-300 py-2 rounded-lg text-sm hover:opacity-95 hover:cursor-pointer hover:text-green-700'}`}>
                        {p.soldOut ? 'SOLD OUT' : (isAdded ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            <span>Added</span>
                          </>
                        ) : 'Add to cart')}
                      </button>
                    )
                  })()}
                </div>
              </div>
              )
            })}
          </div>
        </div>
      </MountReveal>
      <Footer />
    </>
  );
};

export default Shop;
