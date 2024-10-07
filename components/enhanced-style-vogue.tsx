"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ShoppingBag, Menu, X, Instagram, Facebook, Twitter, Minus, Search, Heart, Star, ArrowLeft, ArrowRight, Truck, RefreshCcw, ShieldCheck,Clock } from "lucide-react"
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
  { 
    id: 5, 
    name: "Eco-Friendly Water Bottle", 
    price: 24.99, 
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"], 
    category: "accessories", 
    type: "accessory",
    description: "Stay hydrated in style with this eco-friendly, BPA-free water bottle. Keeps drinks cold for up to 24 hours.",
    colors: ["Mint Green", "Ocean Blue", "Coral Pink"],
    rating: 4.9,
    reviews: [
      { user: "Liam", rating: 5, comment: "Best water bottle I've ever owned. Keeps my water ice-cold all day!" },
      { user: "Olivia", rating: 5, comment: "Love the design and it's so easy to clean." }
    ],
    discount: 0
  },
  { 
    id: 6, 
    name: "Cozy Knit Sweater", 
    price: 69.99, 
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"], 
    category: "women", 
    type: "clothing",
    description: "Wrap yourself in comfort with this soft, oversized knit sweater. Perfect for chilly evenings and lazy weekends.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Cream", "Dusty Rose", "Sage Green"],
    rating: 4.7,
    reviews: [
      { user: "Emma", rating: 5, comment: "So cozy and warm! I want one in every color." },
      { user: "Ava", rating: 4, comment: "Lovely sweater, but it sheds a bit after washing." }
    ],
    discount: 0
  },
  { 
    id: 7, 
    name: "Smart Fitness Watch", 
    price: 199.99, 
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"], 
    category: "accessories", 
    type: "accessory",
    description: "Track your fitness goals with this advanced smartwatch. Features heart rate monitoring, GPS, and customizable workout modes.",
    colors: ["Black", "Silver", "Rose Gold"],
    rating: 4.8,
    reviews: [
      { user: "Noah", rating: 5, comment: "Amazing battery life and so many useful features!" },
      { user: "Zoe", rating: 4, comment: "Great watch, but the app could be more user-friendly." }
    ],
    discount: 15
  },
  { 
    id: 8, 
    name: "Vintage-Inspired Sunglasses", 
    price: 39.99, 
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"], 
    category: "accessories", 
    type: "accessory",
    description: "Add a touch of retro glamour to any outfit with these vintage-inspired sunglasses. UV400 protection included.",
    colors: ["Tortoiseshell", "Black", "Clear"],
    rating: 4.5,
    reviews: [
      { user: "Isabella", rating: 5, comment: "These sunglasses are so stylish and well-made!" },
      { user: "Ethan", rating: 4, comment: "Look great, but they're a bit large on my face." }
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

const blogPosts = [
  {
    title: "Summer Fashion Trends 2024",
    excerpt: "Discover the hottest styles for the upcoming summer season.",
    image: "/placeholder.svg",
    date: "May 15, 2024",
  },
  {
    title: "Sustainable Fashion: A Guide to Eco-Friendly Shopping",
    excerpt: "Learn how to make environmentally conscious choices when updating your wardrobe.",
    image: "/placeholder.svg",
    date: "April 22, 2024",
  },
  {
    title: "Accessorizing 101: Elevate Your Outfit with the Right Pieces",
    excerpt: "Master the art of accessorizing to take your look to the next level.",
    image: "/placeholder.svg",
    date: "March 8, 2024",
  },
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
    quantity: number;
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
  const [isNewsletterDialogOpen, setIsNewsletterDialogOpen] = useState(false)
  const [email, setEmail] = useState("")

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

  const addToCart = (product: { id: number; name: string; price: number; images: string[]; category: string; type: string; description: string; sizes?: string[]; colors: string[]; rating: number; reviews: { user: string; rating: number; comment: string }[]; discount: number }, size: string | null, color: string) => {
    if ((product.sizes && !size) || !color) {
      alert("Please select a size and color")
      return
    }
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id && item.selectedSize === size && item.selectedColor === color)
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems]
      updatedCartItems[existingItemIndex].quantity += 1
      setCartItems(updatedCartItems)
    } else {
      setCartItems([...cartItems, { ...product, selectedSize: size, selectedColor: color, quantity: 1 }])
    }
    setSelectedSize("")
    setSelectedColor("")
  }

  const removeFromCart = (index: number) => {
    const newCartItems = [...cartItems]
    if (newCartItems[index].quantity > 1) {
      newCartItems[index].quantity -= 1
    } else {
      newCartItems.splice(index, 1)
    }
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
      `${item.name} - Size: ${item.selectedSize || 'N/A'}, Color: ${item.selectedColor}, Quantity: ${item.quantity}, Price: $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n')
    
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
    
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

  const toggleFavorite = (product: { id: number; name: string; price: number; images: string[]; category: string; type: string; description: string; sizes?: string[]; colors: string[]; rating: number; reviews: { user: string; rating: number; comment: string }[]; discount: number }) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.id === product.id)
      if (isFavorite) {
        return prevFavorites.filter(fav => fav.id !== product.id)
      } else {
        const newFavorite: CartItem = {
          ...product,
          selectedColor: product.colors[0],
          selectedSize: product.sizes ? product.sizes[0] : null,
          quantity: 1
        }
        return [...prevFavorites, newFavorite]
      }
    })
  }

  const subscribeToNewsletter = () => {
    // Here you would typically send the email to your backend or newsletter service
    console.log(`Subscribing email: ${email}`)
    setEmail("")
    setIsNewsletterDialogOpen(false)
    alert("Thank you for subscribing to our newsletter!")
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
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
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
                              selectedColor: product.colors[0],
                              selectedSize: product.sizes ? product.sizes[0] : null,
                              quantity: 1
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
                          <DialogFooter>
                            <Button className="w-full" onClick={() => {
                              if (selectedProduct) {
                                addToCart(selectedProduct, selectedSize, selectedColor)
                              }
                            }}>
                              Add to Cart
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm" onClick={() => addToCart(product, product.sizes ? product.sizes[0] : null, product.colors[0])}>
                        Add to Cart
                      </Button>
                      <motion.button
                        className="text-muted-foreground hover:text-primary transition-colors"
                        onClick={() => toggleFavorite(product)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className={`h-5 w-5 ${favorites.some(fav => fav.id === product.id) ? 'fill-primary text-primary' : ''}`} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground"
            >
              Featured Categories
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {categories.slice(1).map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-lg shadow-lg group"
                >
                  <Image
                    alt={category.name}
                    className="object-cover w-full h-64 transition-transform group-hover:scale-105"
                    height={300}
                    src="/placeholder.svg"
                    width={300}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <Button className="w-full bg-white text-black hover:bg-white/90" onClick={() => setActiveCategory(category.name)}>
                      Shop Now
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
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
              Why Choose StyleVogue
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {[
                { icon: Truck, title: "Free Shipping", description: "On orders over $100" },
                { icon: RefreshCcw, title: "Easy Returns", description: "30-day return policy" },
                { icon: ShieldCheck, title: "Secure Payments", description: "100% secure checkout" },
                { icon: Clock, title: "24/7 Support", description: "Always here to help" },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center space-y-2 p-4 bg-background rounded-lg shadow-md"
                >
                  <feature.icon className="h-10 w-10 text-primary" />
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground"
            >
              Latest from Our Blog
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-lg shadow-lg bg-background"
                >
                  <Image
                    alt={post.title}
                    className="object-cover w-full h-48 transition-transform group-hover:scale-105"
                    height={200}
                    src={post.image}
                    width={300}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                      <Button variant="link" className="text-primary">Read More</Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-4 text-center"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
                Join Our Newsletter
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Stay up to date with the latest trends, exclusive offers, and style tips.
              </p>
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
                onClick={() => setIsNewsletterDialogOpen(true)}
              >
                Subscribe Now
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="w-full py-12 bg-background border-t">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">About Us</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Our Story</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Careers</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Press</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Customer Service</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">FAQs</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Shipping & Returns</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Policies</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Accessibility</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Connect With Us</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Twitter className="h-6 w-6" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2024 StyleVogue. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <Image src="/placeholder.svg" alt="Payment Method" width={40} height={24} />
              <Image src="/placeholder.svg" alt="Payment Method" width={40} height={24} />
              <Image src="/placeholder.svg" alt="Payment Method" width={40} height={24} />
              <Image src="/placeholder.svg" alt="Payment Method" width={40} height={24} />
            </div>
          </div>
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
              transition={{ type: 'spring',  stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 h-full w-full sm:w-96 bg-background shadow-lg p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Your Cart</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              {cartItems.length === 0 ? (
                <p className="text-center text-muted-foreground">Your cart is empty.</p>
              ) : (
                <>
                  <div className="space-y-4 mb-4 max-h-[60vh] overflow-y-auto">
                    {cartItems.map((item, index) => (
                      <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex items-center space-x-4">
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Size: {item.selectedSize || 'N/A'}, Color: {item.selectedColor}
                          </p>
                          <p className="text-sm">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                          <Button variant="ghost" size="sm" onClick={() => removeFromCart(index)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold text-lg">
                        ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                      </span>
                    </div>
                    <Button className="w-full" onClick={handleCheckout}>Proceed to Checkout</Button>
                  </div>
                </>
              )}
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
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 h-full w-full sm:w-96 bg-background shadow-lg p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Your Favorites</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsFavoritesOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              {favorites.length === 0 ? (
                <p className="text-center text-muted-foreground">You have not added any favorites yet.</p>
              ) : (
                <div className="space-y-4 mb-4 max-h-[calc(100vh-120px)] overflow-y-auto">
                  {favorites.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => addToCart(item, item.selectedSize ?? null, item.selectedColor ?? null)}>
                          Add to Cart
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => toggleFavorite(item)}>
                          <Heart className="h-4 w-4 fill-current" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={isCheckoutDialogOpen} onOpenChange={setIsCheckoutDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
            <DialogDescription>
              Complete your order by providing the following details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="payment" className="text-right">
                Payment
              </Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash on Delivery</SelectItem>
                  <SelectItem value="card">Credit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={sendToWhatsApp}>Complete Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isNewsletterDialogOpen} onOpenChange={setIsNewsletterDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Subscribe to Our Newsletter</DialogTitle>
            <DialogDescription>
              Get the latest updates on new products and upcoming sales.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                type="email"
                placeholder="your@email.com"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={subscribeToNewsletter}>Subscribe</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}