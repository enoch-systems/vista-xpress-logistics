import React, { useMemo, useState, useRef, useEffect, useLayoutEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { products, accessoryProducts } from '../data/products'
import { useCart } from '../context/CartContext'
import NewArrival from '../pages/NewArrival'
import Footer from '../pages/Footer'
import leftIcon from '../assets/left.svg'
import rightIcon from '../assets/right.svg'
import soldBadge from '../assets/soldout.png'
import MountReveal from '../components/MountReveal'

// Generate product description based on name with minimum 16 words
const generateProductDescription = (productName) => {
  const descriptions = {
    'chuwudi hair': 'Premium quality human hair wig with natural texture and beautiful movement. Perfect for everyday wear with comfortable fit and long-lasting durability.',
    'grey hair wig': 'Elegant grey colored wig with sophisticated styling and premium materials. Features realistic appearance and comfortable all-day wear.',
    'premium quality wig': 'Luxury human hair wig with exceptional quality and natural appearance. Handcrafted with attention to detail for perfect styling.',
    'bone straight': 'Sleek straight hair wig with smooth texture and natural shine. Versatile styling options for any occasion or professional setting.',
    'wig of brazil': 'Authentic Brazilian human hair wig with rich texture and volume. Premium quality with natural luster and minimal shedding.',
    'curly wig': 'Beautiful curly hair wig with defined curls and natural bounce. Perfect for voluminous styling and confident appearance.',
    'glueless front wig': 'Convenient glueless wig with easy application and secure fit. No adhesive required for comfortable all-day wear.',
    'brazilian virgin hair': 'Premium Brazilian virgin hair wig with exceptional quality. Thick, full-bodied hair with natural luster and durability.',
    'peruvian straight wig': 'Silky smooth Peruvian straight hair wig with natural shine. Easy to manage with versatile styling options.',
    'malaysian body wave': 'Stunning Malaysian body wave wig with beautiful waves. Soft to touch with natural movement and lasting construction.',
    'indian remy hair': 'High-quality Indian Remy hair wig with cuticle alignment. Prevents tangling and maintains natural appearance.',
    'european human hair': 'Exceptionally soft European human hair wig with finest quality. Natural appearance with easy styling versatility.',
    'african american wig': 'Natural texture African American wig designed for perfect blend. Comfortable fit with authentic appearance.',
    'lace front wig': 'Realistic lace front wig with seamless hairline. Defined curls with premium synthetic fibers.',
    'wavy human hair': 'Natural wave human hair wig with beach waves. Easy to maintain with versatile styling options.',
    'straight bob wig': 'Classic straight bob wig with professional styling. Perfect for business or casual elegant settings.',
    'short pixie cut': 'Modern short pixie cut wig with bold styling. Confident look with minimal maintenance required.',
    'long layered wig': 'Beautiful long layered wig with volume and movement. Versatile styling for any face shape.',
    'loose wave wig': 'Casual loose wave wig with soft appearance. Beach-ready style with effortless beauty.',
    'tight curl wig': 'Bouncy tight curl wig with full volume. Fun and playful personality with defined curls.',
    'kinky curly wig': 'Natural kinky curly wig with authentic texture. Bold and confident style celebrating natural beauty.',
    'afro curl wig': 'Full volume afro curl wig with bold appearance. Celebrates natural hair texture beautifully.',
    'coily wig': 'Springy coily wig with defined coils. Moisture-rich for healthy natural appearance.',
    'silk base wig': 'Premium silk base wig with undetectable hairline. Most natural-looking construction available.',
    'mono part wig': 'Realistic mono part wig with versatile styling. Professional appearance with realistic parting.',
    'hd lace closure': 'High-definition lace closure with seamless blend. Perfect for natural-looking installations.',
    'lace front wig': 'Advanced lace front technology with realistic appearance. Breathable construction for comfortable wear.'
  };

  // Convert to lowercase for matching
  const lowerName = productName.toLowerCase();
  
  // Check for exact matches first
  if (descriptions[lowerName]) {
    return descriptions[lowerName];
  }
  
  // Check for partial matches
  for (const [key, description] of Object.entries(descriptions)) {
    if (lowerName.includes(key) || key.includes(lowerName)) {
      return description;
    }
  }
  
  // Generate generic description if no match found
  const hairTypes = ['human hair', 'synthetic fiber', 'premium quality', 'luxury material'];
  const features = ['natural appearance', 'comfortable fit', 'versatile styling', 'long-lasting durability'];
  const occasions = ['everyday wear', 'special occasions', 'professional settings', 'casual outings'];
  
  const hairType = hairTypes[Math.floor(Math.random() * hairTypes.length)];
  const feature1 = features[Math.floor(Math.random() * features.length)];
  const feature2 = features[Math.floor(Math.random() * features.length)];
  const occasion = occasions[Math.floor(Math.random() * occasions.length)];
  
  return `Premium ${hairType} wig with ${feature1} and ${feature2}. Perfect for ${occasion} with exceptional quality and beautiful styling.`;
};



function Dynamic({ product: propProduct }) {
  const { id } = useParams() || {}
  const cart = useCart()
  const navigate = useNavigate()
  
  console.log('Dynamic component mounted - ID:', id, 'Type:', typeof id)

  const product = useMemo(() => {
    console.log('Looking up product for ID:', id)
    
    if (propProduct) {
      console.log('Using propProduct:', propProduct.title)
      return propProduct
    }
    
    // Check for admin-edited products in localStorage
    const savedProducts = localStorage.getItem('wigProducts');
    let editedProductsMap = new Map();
    
    if (savedProducts) {
      try {
        const editedProducts = JSON.parse(savedProducts);
        editedProductsMap = new Map(editedProducts.map(p => [p.id, p]));
        console.log('Loaded admin-edited products:', editedProductsMap.size);
      } catch (error) {
        console.error('Error parsing saved products:', error);
      }
    }
    
    // Check if it's an accessory ID (starts with 'acc')
    if (typeof id === 'string' && id.startsWith('acc')) {
      let found = accessoryProducts.find(p => p.id === id);
      // Merge with admin-edited data if available
      if (editedProductsMap.has(id)) {
        found = { ...found, ...editedProductsMap.get(id) };
      }
      // Generate description if not present
      if (found && !found.description) {
        found.description = generateProductDescription(found.name || found.title);
      }
      // Ensure rating has a default value
      if (found && !found.rating) {
        found.rating = 4.0;
      }
      console.log('Accessory lookup result:', found?.title || 'Not found')
      return found || products[1]
    }
    
    // Check if it's a numeric accessory ID
    const productId = id ? parseInt(id, 10) : null
    if (productId && productId > 1000) {
      const accessoryId = `acc${productId - 1000}`
      let found = accessoryProducts.find(p => p.id === accessoryId);
      // Merge with admin-edited data if available
      if (editedProductsMap.has(accessoryId)) {
        found = { ...found, ...editedProductsMap.get(accessoryId) };
      }
      // Generate description if not present
      if (found && !found.description) {
        found.description = generateProductDescription(found.name || found.title);
      }
      // Ensure rating has a default value
      if (found && !found.rating) {
        found.rating = 4.0;
      }
      console.log('Numeric accessory lookup - productId:', productId, 'accessoryId:', accessoryId, 'result:', found?.title || 'Not found')
      return found || products[1]
    }
    
    // Default to shop products
    if (productId) {
      let found = products.find(p => p.id === productId);
      // Merge with admin-edited data if available
      if (editedProductsMap.has(productId)) {
        found = { ...found, ...editedProductsMap.get(productId) };
        console.log('Merged with admin data:', editedProductsMap.get(productId));
      }
      // Generate description if not present
      if (found && !found.description) {
        found.description = generateProductDescription(found.name || found.title);
      }
      // Ensure rating has a default value
      if (found && !found.rating) {
        found.rating = 4.0;
      }
      console.log('Main product lookup - productId:', productId, 'result:', found?.title || 'Not found')
      return found || products[1]
    }
    
    console.log('No valid ID found, returning default product')
    return products[1]
  }, [propProduct, id])

  // single main image only
  const [qty, setQty] = useState(1)
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const toastTimer = useRef(null)
  const mainImgRef = useRef(null)
  // temporary added state for visual feedback after add-to-cart
  const [justAdded, setJustAdded] = useState(false)
  const addedTimer = useRef(null)
  const [mainSrc, setMainSrc] = useState(product?.image || '')
  const [flipMain, setFlipMain] = useState(false)
  const [selectedThumb, setSelectedThumb] = useState(0)
  // responsive thumbnail size
  const THUMB_CLASS = 'w-15 h-15 sm:w-14 sm:h-14 md:w-16 md:h-16'
  // prepare thumbnails dynamically based on available images
  const _baseImages = []
  
  // Add main image
  if (product?.image) {
    _baseImages.push(product.image)
  }
  
  // Add modal images if they exist
  if (product?.modalImages && Array.isArray(product.modalImages)) {
    product.modalImages.forEach(img => {
      if (img) { // Only add non-null images
        _baseImages.push(img)
      }
    })
  }
  
  // If no modal images, add main image again for consistency
  if (_baseImages.length === 1 && product?.image) {
    _baseImages.push(product.image)
  }
  
  const thumbImages = _baseImages.length > 0 ? _baseImages : [product?.image]

  // insert <link rel="preload" as="image"> tags ASAP so thumbnails and main image are prioritized
  useLayoutEffect(() => {
    const created = []
    const preloaders = []
    try {
      const imgs = thumbImages && thumbImages.length ? thumbImages : [product?.image]
      imgs.forEach(src => {
        if (!src) return
        if (!document.querySelector(`link[rel="preload"][href="${src}"]`)) {
          const link = document.createElement('link')
          link.rel = 'preload'
          link.as = 'image'
          link.href = src
          // hint high priority for preloads
          try { link.setAttribute('fetchpriority', 'high') } catch (e) { void e }
          document.head.appendChild(link)
          created.push(link)
        }
        // create an Image() in layout phase so the browser starts fetching immediately
        try {
          const im = new Image()
          im.decoding = 'sync'
          im.loading = 'eager'
          // set attribute as some browsers honor it on dynamically created images
          try { im.setAttribute('fetchpriority', 'high') } catch (e) { void e }
          im.src = src
          preloaders.push(im)
        } catch (err) { void err }
      })

      if (product?.image && !document.querySelector(`link[rel="preload"][href="${product.image}"]`)) {
        const mainLink = document.createElement('link')
        mainLink.rel = 'preload'
        mainLink.as = 'image'
        mainLink.href = product.image
        try { mainLink.setAttribute('fetchpriority', 'high') } catch (e) { void e }
        document.head.appendChild(mainLink)
        created.push(mainLink)
        try {
          const im = new Image()
          im.decoding = 'sync'
          im.loading = 'eager'
          try { im.setAttribute('fetchpriority', 'high') } catch (e) { void e }
          im.src = product.image
          preloaders.push(im)
        } catch (err) { void err }
      }
    } catch (err) { void err }

    return () => {
      created.forEach(l => { if (l.parentNode) l.parentNode.removeChild(l) })
      // release references
      preloaders.forEach(p => { try { p.src = '' } catch (e) {} })
    }
  }, [product])

  useEffect(() => {
    // clear timers when product changes/unmounts
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current)
      if (addedTimer.current) clearTimeout(addedTimer.current)
    }
  }, [product])

  // keep mainSrc in sync when product changes and preload thumbnails
  useEffect(() => {
    if (product?.image) {
      setMainSrc(product.image)
      setFlipMain(false)
      setSelectedThumb(0)
    }
    // preload thumbnails so navigating from listing feels instant
    const imgs = thumbImages && thumbImages.length ? thumbImages : [product?.image]
    imgs.forEach(src => {
      try {
        const img = new Image()
        img.src = src
      } catch (err) { void err }
    })
  }, [product, thumbImages])

  const goToIndex = (idx) => {
    const i = (idx + thumbImages.length) % thumbImages.length
    const src = thumbImages[i]
    setMainSrc(src)
    setSelectedThumb(i)
    setFlipMain(false)
    if (mainImgRef.current) mainImgRef.current.src = src
  }

  const prevImage = () => {
    let cur = selectedThumb
    if (mainSrc !== thumbImages[selectedThumb]) {
      const found = thumbImages.findIndex(s => s === mainSrc)
      if (found !== -1) cur = found
    }
    goToIndex(cur - 1)
  }

  const nextImage = () => {
    let cur = selectedThumb
    if (mainSrc !== thumbImages[selectedThumb]) {
      const found = thumbImages.findIndex(s => s === mainSrc)
      if (found !== -1) cur = found
    }
    goToIndex(cur + 1)
  }


  const handleAddToCart = () => {
    if (cart && cart.addItem) {
      cart.addItem(product, { sourceEl: mainImgRef.current, imgSrc: product.image, qty })
    }
    // visual feedback: show green "Added" button briefly
    setJustAdded(true)
    if (addedTimer.current) clearTimeout(addedTimer.current)
    addedTimer.current = setTimeout(() => setJustAdded(false), 1500)

    setToastMsg('Added to cart')
    setToastVisible(true)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToastVisible(false), 1600)
  }

  const handleBuyNow = () => {
    if (cart && cart.addItem) {
      cart.addItem(product, { sourceEl: mainImgRef.current, imgSrc: product.image, qty })
    }
    // navigate to checkout after a small tick so state updates and animation can start
    setTimeout(() => navigate('/checkout'), 150)
  }

  if (!product) {
    console.log('Product not found - ID:', id, 'Final product state:', product)
    return <div className="p-6">Product not found</div>
  }

  console.log('Final product being rendered:', product?.title, 'ID:', product?.id)

  return (
    <>
      <div className="min-h-screen bg-white md:pt-25 font-inter text-[#111] px-3">
        {/* Toast */}
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${toastVisible ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'}`} role="status" aria-live="polite">
          <div className="bg-black text-gray-400 px-7 py-2 text-sm rounded-md shadow">{toastMsg}</div>
        </div>
        <div className="lg:max-w-8xl mx-auto lg:px-28 py-10 px-0">
          {/* Back button */}
          <Link to="/" className="inline-flex items-center gap-3 px-4 py-2 rounded-md border border-gray-400 bg-black/1 text-sm font-semibold shadow-sm">← Back</Link>

          {/* Top area */}
          <div className="mt-7 lg:ml-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 items-start">
            {/* Left: Image */}
            <div className="md:col-span-1 lg:col-span-1">
              <div className="relative bg-[hsl(44,45%,98%)] p-0 rounded-xl overflow-hidden">
                {/* Main image wrapper for navigation positioning */}
                <div className="relative">
                  {/* Navigation controls - centered within main image only */}
                  <button onClick={prevImage} aria-label="Previous image" className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 bg-blue-300/20 rounded-full border border-gray-300 shadow-sm hover:scale-105">
                    <img src={leftIcon} alt="Previous" className="w-5 h-5" />
                  </button>

                  <button onClick={nextImage} aria-label="Next image" className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 bg-blue-300/20 rounded-full border border-gray-300 shadow-sm hover:scale-105">
                    <img src={rightIcon} alt="Next" className="w-5 h-5" />
                  </button>

                  <img
                    ref={mainImgRef}
                    src={mainSrc}
                    alt={product.title}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    onError={(e) => {
                      try {
                        if (e.currentTarget.src !== product.image) {
                          e.currentTarget.src = product.image
                        } else {
                          e.currentTarget.style.display = 'none'
                        }
                      } catch (err) { void err }
                    }}
                    className={`w-full h-[420px] md:h-[600px] lg:h-[800px] object-cover rounded-md ${flipMain ? 'transform -scale-x-100' : ''}`}
                    style={undefined}
                  />

                  {product.soldOut && (
                    <img src={soldBadge} alt="Sold out" className="absolute top-4 right-4 w-25 h-25 pointer-events-none z-30" />
                  )}
                </div>

                {/* Thumbnails: use product.images if present, otherwise show main image */}
                <div className="p-3 flex items-center gap-3 bg-white rounded-md">
                  {thumbImages.map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setMainSrc(src)
                        setFlipMain(false)
                        setSelectedThumb(idx)
                        if (mainImgRef.current) mainImgRef.current.src = src
                      }}
                      className={`${THUMB_CLASS} rounded-md overflow-hidden flex-shrink-0 border ${selectedThumb === idx ? 'ring-2 ring-amber-400 border-transparent' : 'border-gray-100'}`}
                      aria-label={`Show image ${idx + 1}`}>
                      <img src={src} alt={`${product.title} ${idx + 1}`} loading="eager" decoding="async" fetchPriority="high" width="80" height="80" className={`w-full h-full object-cover`} />
                    </button>
                  ))}

                  {/* Offscreen preloader images (force immediate multi-download) */}
                  <div aria-hidden="true" style={{position: 'absolute', left: -9999, top: -9999, width: 1, height: 1, overflow: 'hidden', pointerEvents: 'none'}}>
                    {thumbImages.map((s, i) => (
                      <img key={`pre-${i}`} src={s} alt="" loading="eager" decoding="sync" fetchPriority="high" width={1} height={1} style={{width: 1, height: 1}} />
                    ))}
                  </div>
                </div>

                {/* Product Title, Rating and Price */}
                <div className="mt-6 px-3">
                  <h2 className="text-base md:text-2xl font-bold tracking-widest uppercase">{product.name || product.title}</h2>
                  
                  <div className="flex items-center gap-3 mt-3 text-sm text-gray-400">
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? 'fill-current' : 'text-gray-200'}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .587l3.668 7.431L24 9.75l-6 5.847 1.417 8.27L12 19.77l-7.417 4.097L6 15.597 0 9.75l8.332-1.732z"/></svg>
                      ))}
                    </div>
                    <span className="text-gray-400">({product.rating}) rating</span>
                  </div>
                  
                  <div className="md:text-2xl text-xl font-[verdana] font-extrabold text-[#111] mt-3">N{product.price.toLocaleString()}</div>
                </div>

                {/* Quantity Selector */}
                <div className="mt-6 px-3">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">QUANTITY</h3>
                  <div className="flex items-center border border-gray-300 rounded-md w-32">
                    <button 
                      onClick={() => setQty(q => Math.max(1, q - 1))}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-l-md"
                    >
                      −
                    </button>
                    <input
                      type="text"
                      className="w-full text-center border-l border-r border-gray-300 py-2 text-sm font-medium text-gray-700 focus:outline-none"
                      value={qty}
                      readOnly
                    />
                    <button 
                      onClick={() => setQty(q => q + 1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-r-md"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Length Selector */}
                <div className="mt-6 px-3">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">LENGTH</h3>
                  <div className="flex flex-wrap gap-2">
                    {['10"', '12"', '14"', '16"', '18"', '20"', '24"', '30"'].map((length) => (
                      <button
                        key={length}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        {length}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Details */}
            <div className="max-w-xl -mt-4 md:mt-3 ml-4 md:ml-0 md:col-span-1 lg:col-span-1">
              <p className="text-gray-500 text-sm leading-7 mt-3 md:mt-6 font-[verdana] md:text-base font-thin">
                {product.description || 'Product description not available.'}
              </p>

              <div className="mt-8 flex items-center gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.soldOut || justAdded}
                  className={`${product.soldOut ? 'flex items-center gap-1 bg-gray-300 text-gray-600 px-4 py-3 rounded-md font-semibold shadow-sm cursor-not-allowed' : justAdded ? 'flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-md font-semibold shadow-sm cursor-not-allowed' : 'flex items-center gap-1 bg-black text-xs text-white px-4 py-3 rounded-md font-semibold shadow-sm cursor-pointer hover:opacity-95 hover:scale-[1.01] transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-amber-400'}`}
                >
                  {product.soldOut ? (
                    'SOLD OUT'
                  ) : justAdded ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="20" r="1"/><circle cx="20" cy="20" r="1"/></svg>
                      ADD TO CART
                    </>
                  )}
                </button>

                {!product.soldOut && (
                  <button onClick={handleBuyNow} className="px-4 py-3 rounded-md border border-black/20 text-xs font-semibold cursor-pointer hover:bg-black hover:text-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-amber-200">BUY NOW</button>
                )}
              </div>
            </div>

            <hr className="my-10 border-gray-200" />

            {/* Related products */}
            <h3 className="text-sm tracking-widest font-semibold">YOU MIGHT ALSO LIKE</h3>
            <NewArrival limit={4} className="mt-6" hideTitle product={product} showSeeMore={true} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dynamic
