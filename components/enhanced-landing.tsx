'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ShoppingBag, Menu, X, Instagram, Facebook, Twitter, Minus, ChevronRight, Search, Heart, Star, ArrowLeft, ArrowRight, Truck, RefreshCcw, ShieldCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const products = [
  { 
    id: 1, 
    name: "Summer Breeze Dress", 
    price: 79.99, 
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"], 
    category: "women", 
    type: "clothing",
    description: "A lightweight, flowy summer dress perfect for warm days and casual outings. Made with breathable fabric for all-day comfort.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Sky Blue", "Soft Pink"],
    rating: 4.5,
    reviews: [
      { user: "Emily", rating: 5, comment: "Love this dress! So comfortable and stylish." },
      { user: "Sarah", rating: 4, comment: "Great fit, but the color was slightly different from the picture." }
    ],
    discount: 10
  },
  { 
    id: 2, 
    name: "Urban Explorer Backpack", 
    price: 129.99, 
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"], 
    category: "accessories", 
    type: "accessory",
    description: "A versatile and durable backpack designed for the modern urban explorer. Features multiple compartments and water-resistant material.",
    colors: ["Black", "Navy", "Forest Green"],
    rating: 4.8,
    reviews: [
      { user: "Alex", rating: 5, comment: "Perfect for my daily commute and weekend adventures!" },
      { user: "Jamie", rating: 4, comment: "Great quality, but I wish it had a few more pockets." }
    ],
    discount: 0
  },
  { 
    id: 3, 
    name: "Classic Denim Jacket", 
    price: 89.99, 
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"], 
    category: "men", 
    type: "clothing",
    description: "A timeless denim jacket that never goes out of style. Perfect for layering in any season.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Light Wash", "Medium Wash", "Dark Wash"],
    rating: 4.7,
    reviews: [
      { user: "Chris", rating: 5, comment: "Fits perfectly and looks great with everything!" },
      { user: "Pat", rating: 4, comment: "Good quality, but runs a bit small." }
    ],
    discount: 5
  },
  { 
    id: 4, 
    name: "Sunset Glow Eyeshadow Palette", 
    price: 49.99, 
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"], 
    category: "beauty", 
    type: "accessory",
    description: "A stunning eyeshadow palette inspired by the colors of a beautiful sunset. Includes 12 highly pigmented shades.",
    colors: ["Multi"],
    rating: 4.6,
    reviews: [
      { user: "Mia", rating: 5, comment: "The colors are gorgeous and so blendable!" },
      { user: "Sophia", rating: 4, comment: "Love the shades, but there's some fallout with the shimmer colors." }
    ],
    discount: 0
  },
]

const categories = [
  { name: "All", icon: ShoppingBag },
  { name: "Women", icon: ShoppingBag },
  { name: "Men", icon: ShoppingBag },
  { name: "Accessories", icon: ShoppingBag },
  { name: "Beauty", icon: ShoppingBag },
  { name: "Sale", icon: ShoppingBag },
]

export function StyleVogueEnhancedLanding() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  interface CartItem {
    id: number;
    name: string;
    price: number;
    images: string[];
    category: string;
    type: string;
    description: string;
    sizes?: string[];
    colors: string[];
    rating: number;
    reviews: { user: string; rating: number; comment: string }[];
    discount: number;
    selectedSize?: string | null;
    selectedColor: string;
  }

  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeType, setActiveType] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<CartItem | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [isCheckoutDialogOpen, setIsCheckoutDialogOpen] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [favorites, setFavorites] = useState<CartItem[]>([])
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")

  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.8])

  useEffect(() => {
    setFilteredProducts(
      products.filter(product => 
        (activeCategory === "All" || product.category.toLowerCase() === activeCategory.toLowerCase()) &&
        (activeType === "all" || product.type === activeType) &&
        product.price >= priceRange[0] && product.price <= priceRange[1] &&
        (searchQuery === "" || product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    )
  }, [activeCategory, activeType, priceRange, searchQuery])

  const addToCart = (product: { id: number; name: string; price: number; images: string[]; category: string; type: string; description: string; sizes: string[]; colors: string[]; rating: number; reviews: { user: string; rating: number; comment: string }[]; discount: number } | { id: number; name: string; price: number; images: string[]; category: string; type: string; description: string; colors: string[]; rating: number; reviews: { user: string; rating: number; comment: string }[]; discount: number; sizes?: undefined }, size: string | null, color: string) => {
    if ((product.sizes && !size) || !color) {
      alert("Please select a size and color")
      return
    }
    setCartItems([...cartItems, { ...product, selectedSize: size, selectedColor: color }])
    setSelectedSize("")
    setSelectedColor("")
  }

  const removeFromCart = (index: number) => {
    const newCartItems = [...cartItems]
    newCartItems.splice(index, 1)
    setCartItems(newCartItems)
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      selectedProduct && prevIndex === selectedProduct.images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? (selectedProduct ? selectedProduct.images.length - 1 : 0) : prevIndex - 1
    )
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!")
      return
    }
    setIsCheckoutDialogOpen(true)
  }

  const sendToWhatsApp = () => {
    if (!phoneNumber || !deliveryAddress || !paymentMethod) {
      alert("Please fill in all required fields")
      return
    }
    
    const orderDetails = cartItems.map(item => 
      `${item.name} - Size: ${item.selectedSize || 'N/A'}, Color: ${item.selectedColor}, Price: $${item.price.toFixed(2)}`
    ).join('\n')
    
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)
    
    const message = `New order from StyleVogue:

Order Details:
${orderDetails}

Total: $${totalPrice}

Delivery Address: ${deliveryAddress}
Payment Method: ${paymentMethod}
Customer Phone: ${phoneNumber}`
    
    const whatsappUrl = `https://wa.me/6266656036?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    
    setCartItems([])
    setIsCheckoutDialogOpen(false)
    setIsCartOpen(false)
    setDeliveryAddress("")
    setPaymentMethod("")
    setPhoneNumber("")
  }

  const toggleFavorite = (product: { id: number; name: string; price: number; images: string[]; category: string; type: string; description: string; sizes: string[]; colors: string[]; rating: number; reviews: { user: string; rating: number; comment: string }[]; discount: number } | { id: number; name: string; price: number; images: string[]; category: string; type: string; description: string; colors: string[]; rating: number; reviews: { user: string; rating: number; comment: string }[]; discount: number; sizes?: undefined }) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.id === product.id)
      if (isFavorite) {
        return prevFavorites.filter(fav => fav.id !== product.id)
      } else {
        const newFavorite: CartItem = {
          ...product,
          selectedColor: product.colors[0],
          selectedSize: product.sizes ? product.sizes[0] : null
        }
        return [...prevFavorites, newFavorite]
      }
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted font-poppins">
      <motion.header 
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        style={{ opacity: headerOpacity }}
      >
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">StyleVogue</span>
          </Link>
          <nav className="hidden md:flex">
            <motion.ul className="flex space-x-4">
              {categories.map((category, index) => (
                <motion.li key={category.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Button
                    variant="ghost"
                    className={`text-sm font-medium transition-colors hover:text-primary ${activeCategory === category.name ? 'text-primary' : 'text-muted-foreground'}`}
                    onClick={() => setActiveCategory(category.name)}
                  >
                    <category.icon className="w-4 h-4 mr-2" />
                    {category.name}
                  </Button>
                </motion.li>
              ))}
            </motion.ul>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative" onClick={() => setIsFavoritesOpen(true)}>
              <Heart className="h-6 w-6" />
              <span className="sr-only">Favorites</span>
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag className="h-6 w-6" />
              <span className="sr-only">Open cart</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background border-b z-40"
          >
            <nav className="container py-4 px-4">
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm font-medium transition-colors hover:text-primary"
                      onClick={() => {
                        setActiveCategory(category.name)
                        setIsMenuOpen(false)
                      }}
                    >
                      <category.icon className="w-4 h-4 mr-2" />
                      {category.name}
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-primary/10 via-background to-primary/10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-xl aspect-video shadow-2xl"
              >
                <Image
                  alt="Hero Image"
                  className="object-cover object-center"
                  fill
                  src="/placeholder.svg"
                />
              </motion.div>
              <div className="flex flex-col justify-center space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-2"
                >
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
                    Elevate Your Style
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Discover the latest trends and timeless classics. Shop our curated collection of fashion-forward pieces.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                >
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">Shop Now</Button>
                  <Button size="lg" variant="outline" className="transition-all duration-300 transform hover:scale-105">View Lookbook</Button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground"
            >
              Explore Our Collection
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row justify-between items-start mb-6 space-y-4 md:space-y-0 md:space-x-4"
            >
              <Select onValueChange={(value) => setActiveType(value)}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="accessory">Accessories</SelectItem>
                  <SelectItem value="footwear">Footwear</SelectItem>
                </SelectContent>
              </Select>

              <motion.div 
                className="w-full md:w-auto space-y-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-sm font-medium">Price Range</p>
                <Slider
                  min={0}
                  max={200}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="w-full md:w-[200px]"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </motion.div>

              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  className="pl-8 w-full md:w-[300px]" 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-lg bg-background shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="aspect-square overflow-hidden">
                    <Image
                      alt={product.name}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                      height={300}
                      src={product.images[0]}
                      width={300}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
                      {product.discount > 0 && (
                        <span className="text-xs text-red-500 font-medium">-{product.discount}% OFF</span>
                      )}
                    </div>
                    <div className="mt-2 flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">({product.reviews.length})</span>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => {
                            setSelectedProduct({
                              ...product,
                              selectedColor: product.colors[0] || '',
                              selectedSize: product.sizes ? product.sizes[0] : ''
                            })
                            setCurrentImageIndex(0)
                            setSelectedSize("")
                            setSelectedColor("")
                          }}>
                            Quick View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                          <DialogHeader>
                            <DialogTitle>{product.name}</DialogTitle>
                            <DialogDescription>
                              {product.description}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto">
                            <div className="relative aspect-square">
                              <Image
                                alt={product.name}
                                className="object-cover rounded-lg"
                                fill
                                src={product.images[currentImageIndex]}
                              />
                              <Button size="icon" variant="ghost" className="absolute left-2 top-1/2 transform -translate-y-1/2" onClick={prevImage}>
                                <ArrowLeft className="h-4 w-4" />
                              </Button>
                              <Button size="icon" variant="ghost" className="absolute right-2 top-1/2 transform -translate-y-1/2" onClick={nextImage}>
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                              {product.discount > 0 && (
                                <span className="text-sm text-red-500 font-medium">-{product.discount}% OFF</span>
                              )}
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                              ))}
                              <span className="text-sm text-muted-foreground ml-2">({product.reviews.length} reviews)</span>
                            </div>
                            {product.sizes && (
                              <div>
                                <h4 className="text-sm font-medium mb-2">Select Size:</h4>
                                <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                                  <div className="flex flex-wrap gap-2">
                                    {product.sizes.map((size) => (
                                      <div key={size}>
                                        <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
                                        <Label
                                          htmlFor={`size-${size}`}
                                          className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary"
                                        >
                                          {size}
                                        </Label>
                                      </div>
                                    ))}
                                  </div>
                                </RadioGroup>
                              </div>
                            )}
                            <div>
                              <h4 className="text-sm font-medium mb-2">Select Color:</h4>
                              <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
                                <div className="flex flex-wrap gap-2">
                                  {product.colors.map((color) => (
                                    <div key={color}>
                                      <RadioGroupItem value={color} id={`color-${color}`} className="peer sr-only" />
                                      <Label
                                        htmlFor={`color-${color}`}
                                        className="flex items-center justify-center rounded-full w-8 h-8 border-2 border-muted hover:border-primary peer-data-[state=checked]:border-primary"
                                        style={{ backgroundColor: color.toLowerCase() }}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </RadioGroup>
                            </div>
                          </div>
                          <Button className="w-full" onClick={() => addToCart(product, selectedSize, selectedColor)}>Add to Cart</Button>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm" onClick={() => addToCart(product, product.sizes ? product.sizes[0] : null, product.colors[0])}>
                        Add to Cart
                      </Button>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" onClick={() => toggleFavorite(product)}>
                        <Heart className={`h-5 w-5 ${favorites.some(fav => fav.id === product.id) ? 'fill-primary' : ''}`} />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary/20 to-primary-foreground/20">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose StyleVogue?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We are committed to providing you with the best shopping experience possible.
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-4xl mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex flex-col items-center space-y-2 border rounded-lg p-4"
                >
                  <Truck className="h-10 w-10 text-primary" />
                  <h3 className="text-xl font-bold">Free Shipping</h3>
                  <p className="text-sm text-muted-foreground text-center">Enjoy free shipping on all orders over $50</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col items-center space-y-2 border rounded-lg p-4"
                >
                  <RefreshCcw className="h-10 w-10 text-primary" />
                  <h3 className="text-xl font-bold">Easy Returns</h3>
                  <p className="text-sm text-muted-foreground text-center">30-day return policy for a stress-free shopping</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col items-center space-y-2 border rounded-lg p-4"
                >
                  <ShieldCheck className="h-10 w-10 text-primary" />
                  <h3 className="text-xl font-bold">Secure Payment</h3>
                  <p className="text-sm text-muted-foreground text-center">Your payment information is always protected</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Join Our Community</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Subscribe to our newsletter for exclusive offers, style tips, and new arrivals.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">Subscribe</Button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/50">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 px-4">
          <div className="flex-1 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6" />
              <span className="font-bold">StyleVogue</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Elevating your style with curated fashion pieces for every occasion.
            </p>
          </div>
          <div className="flex-1 space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
            </ul>
          </div>
          <div className="flex-1 space-y-4">
            <h3 className="font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t py-6 text-center text-sm text-muted-foreground">
          <p>© 2024 StyleVogue. All rights reserved.</p>
        </div>
      </footer>

      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={() => setIsCartOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-background shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-lg font-semibold">Your Cart</h2>
                  <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  {cartItems.length === 0 ? (
                    <p className="text-center text-muted-foreground">Your cart is empty</p>
                  ) : (
                    <ul className="space-y-4">
                      {cartItems.map((item, index) => (
                        <li key={index} className="flex items-center space-x-4">
                          <Image src={item.images[0]} alt={item.name} width={80} height={80} className="rounded-md" />
                          <div className="flex-1">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">Size: {item.selectedSize}, Color: {item.selectedColor}</p>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeFromCart(index)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="p-4 border-t">
                  <div className="flex justify-between mb-4">
                    <span className="font-semibold">Total:</span>
                    <span className="font-semibold">
                      ${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
                    </span>
                  </div>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105" onClick={handleCheckout}>
                    Checkout <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isFavoritesOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={() => setIsFavoritesOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-background shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-lg font-semibold">Your Favorites</h2>
                  <Button variant="ghost" size="icon" onClick={() => setIsFavoritesOpen(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  {favorites.length === 0 ? (
                    <p className="text-center text-muted-foreground">You have not added any favorites yet</p>
                  ) : (
                    <ul className="space-y-4">
                      {favorites.map((item) => (
                        <li key={item.id} className="flex items-center space-x-4">
                          <Image src={item.images[0]} alt={item.name} width={80} height={80} className="rounded-md" />
                          <div className="flex-1">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => toggleFavorite(item)}>
                            <Heart className="h-5 w-5 fill-primary" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={isCheckoutDialogOpen} onOpenChange={setIsCheckoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Your Order</DialogTitle>
            <DialogDescription>
              Please provide your delivery details to complete your purchase.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Delivery Address
              </Label>
              <Input
                id="address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Enter your delivery address"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="payment" className="text-right">
                Payment Method
              </Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cod">Cash on Delivery</SelectItem>
                  <SelectItem value="online">Online Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone Number
              </Label>
              <Input
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={sendToWhatsApp}>Complete Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}