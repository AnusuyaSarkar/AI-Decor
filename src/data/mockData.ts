import type {
  AnalysisHistory,
  CategoryItem,
  DashboardStat,
  FAQItem,
  FeatureCard,
  NavItem,
  OrderItem,
  Product,
  SavedDesign,
  TeamMember,
  Testimonial,
} from '../types'

export const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'AI Assistant', path: '/assistant' },
  { label: 'Marketplace', path: '/marketplace' },
  { label: 'About', path: '/about' },
  { label: 'Profile', path: '/profile' },
  { label: 'Dashboard', path: '/dashboard' },
]

export const featureCards: FeatureCard[] = [
  {
    title: 'AI Room Analysis',
    description: 'Upload a room photo and let the model detect layout, light, and mood cues.',
    icon: '01',
  },
  {
    title: 'AI Room Redesign',
    description: 'Generate elegant style directions from minimalist to luxe, boho, and modern.',
    icon: '02',
  },
  {
    title: 'Decor Recommendations',
    description: 'Discover shoppable pieces matched to budget, size, and aesthetic preferences.',
    icon: '03',
  },
  {
    title: 'Marketplace',
    description: 'Browse premium decor from verified sellers with ratings and detailed insights.',
    icon: '04',
  },
]

export const testimonials: Testimonial[] = [
  {
    name: 'Aanya Mehra',
    role: 'Homeowner',
    quote:
      'Decor With Love helped me turn a blank bedroom into a calming sanctuary within budget.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=80',
  },
  {
    name: 'Rohan Kapoor',
    role: 'Interior Enthusiast',
    quote:
      'The AI suggestions felt thoughtful and realistic, and the marketplace made shopping effortless.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=320&q=80',
  },
  {
    name: 'Sara Iyer',
    role: 'Seller Partner',
    quote:
      'The dashboard keeps product management simple while showcasing my catalog beautifully.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=320&q=80',
  },
]

export const categories: CategoryItem[] = [
  {
    name: 'Living Room',
    description: 'Warm sofas, layered rugs, and statement lighting.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Bedroom',
    description: 'Soft textiles, balanced storage, and restful palettes.',
    image: 'https://images.unsplash.com/photo-1505693416388-3f0f4b1f6e4d?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Dining',
    description: 'Elegant tablescapes with sculptural accents.',
    image: 'https://images.unsplash.com/photo-1505693416388-8f3d3b8d8bbf?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Workspace',
    description: 'Productive, polished, and calm home-office decor.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
  },
]

export const products: Product[] = [
  {
    id: 'p1',
    slug: 'amber-linen-sofa',
    name: 'Amber Linen Sofa',
    price: 18999,
    seller: 'Maison Loom',
    rating: 4.8,
    category: 'Seating',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
    description:
      'A soft, contemporary sofa with plush cushions and warm linen upholstery designed for cozy modern homes.',
    gallery: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    ],
    reviews: [
      { name: 'Nisha', rating: 5, comment: 'Beautiful quality and exactly as pictured.' },
      { name: 'Kunal', rating: 4.7, comment: 'Comfortable, elegant, and easy to maintain.' },
    ],
  },
  {
    id: 'p2',
    slug: 'ivory-arc-floor-lamp',
    name: 'Ivory Arc Floor Lamp',
    price: 6499,
    seller: 'Glow Atelier',
    rating: 4.6,
    category: 'Lighting',
    image: 'https://images.unsplash.com/photo-1505693416388-10b3dc2c2a0f?auto=format&fit=crop&w=1000&q=80',
    description:
      'A slender arc lamp that adds sculptural presence and soft ambient light to reading corners.',
    gallery: [
      'https://images.unsplash.com/photo-1505693416388-10b3dc2c2a0f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=1000&q=80',
    ],
    reviews: [
      { name: 'Aditi', rating: 4.8, comment: 'Creates a very premium ambience.' },
      { name: 'Suresh', rating: 4.5, comment: 'Minimal and functional.' },
    ],
  },
  {
    id: 'p3',
    slug: 'sandstone-coffee-table',
    name: 'Sandstone Coffee Table',
    price: 8999,
    seller: 'Crafted Nest',
    rating: 4.9,
    category: 'Tables',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80',
    description:
      'A rounded coffee table with soft edges and a textured finish that complements contemporary spaces.',
    gallery: [
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551298370-9d3d53740c72?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80',
    ],
    reviews: [
      { name: 'Meera', rating: 5, comment: 'Perfect centerpiece for our living room.' },
      { name: 'Arjun', rating: 4.9, comment: 'Very polished look.' },
    ],
  },
  {
    id: 'p4',
    slug: 'linen-tufted-bed',
    name: 'Linen Tufted Bed',
    price: 21999,
    seller: 'Rest Studio',
    rating: 4.7,
    category: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1505693416388-3f0f4b1f6e4d?auto=format&fit=crop&w=1000&q=80',
    description:
      'A softly tufted bed frame designed to make bedrooms feel elevated, soothing, and cohesive.',
    gallery: [
      'https://images.unsplash.com/photo-1505693416388-3f0f4b1f6e4d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1505693416388-58e4fbf9c6e1?auto=format&fit=crop&w=1000&q=80',
    ],
    reviews: [
      { name: 'Riya', rating: 4.8, comment: 'Feels premium and looks stunning.' },
      { name: 'Vivek', rating: 4.6, comment: 'High-quality finish.' },
    ],
  },
  {
    id: 'p5',
    slug: 'artisan-ceramic-vase',
    name: 'Artisan Ceramic Vase',
    price: 2499,
    seller: 'Clay & Co.',
    rating: 4.5,
    category: 'Decor',
    image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1000&q=80',
    description:
      'Hand-finished ceramic vase ideal for adding tactile warmth to shelves and console tables.',
    gallery: [
      'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507646227500-4d7d9d0b6d76?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1456045551899-55a017b6d1cb?auto=format&fit=crop&w=1000&q=80',
    ],
    reviews: [
      { name: 'Tara', rating: 4.7, comment: 'Simple, soulful, and beautiful.' },
      { name: 'Dev', rating: 4.3, comment: 'Great value decor accent.' },
    ],
  },
  {
    id: 'p6',
    slug: 'walnut-storage-bench',
    name: 'Walnut Storage Bench',
    price: 7799,
    seller: 'Urban Hearth',
    rating: 4.6,
    category: 'Storage',
    image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=1000&q=80',
    description:
      'A versatile entryway bench with hidden storage and a refined walnut finish.',
    gallery: [
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1505693416388-866d45a3fd5f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1505693416388-2f7b4f0f1c4b?auto=format&fit=crop&w=1000&q=80',
    ],
    reviews: [
      { name: 'Ishita', rating: 4.6, comment: 'Functional and compact.' },
      { name: 'Rahul', rating: 4.5, comment: 'Love the storage space.' },
    ],
  },
]

export const dashboardStats: DashboardStat[] = [
  { label: 'Products Live', value: '128', detail: '+18 this month' },
  { label: 'Orders', value: '346', detail: '98% fulfillment' },
  { label: 'Revenue', value: '₹4.8L', detail: 'This quarter' },
  { label: 'Rating', value: '4.9', detail: 'Average seller score' },
]

export const orders: OrderItem[] = [
  { orderId: '#DWL-1042', customer: 'Ananya Gupta', total: '₹18,999', status: 'Processing' },
  { orderId: '#DWL-1039', customer: 'Mohit Bansal', total: '₹8,999', status: 'Shipped' },
  { orderId: '#DWL-1031', customer: 'Sana Khan', total: '₹6,499', status: 'Delivered' },
]

export const savedDesigns: SavedDesign[] = [
  {
    title: 'Soft Beige Bedroom',
    subtitle: 'Minimal, airy, and layered with linen textures.',
    image: 'https://images.unsplash.com/photo-1505693416388-3f0f4b1f6e4d?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Warm Modern Living',
    subtitle: 'Curved silhouettes and grounded wood tones.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
  },
]

export const analysisHistory: AnalysisHistory[] = [
  {
    title: 'Studio apartment refresh',
    summary: 'Suggested layered lighting, compact storage, and budget-friendly artwork.',
    date: '14 May 2026',
  },
  {
    title: 'Guest room redesign',
    summary: 'Recommended soft headboard, warm neutrals, and cozy bedside lamps.',
    date: '27 Apr 2026',
  },
]

export const teamMembers: TeamMember[] = [
  {
    name: 'Aarav Sen',
    role: 'Founder & Product Vision',
    bio: 'Blends AI product thinking with premium interior design curation.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Naina Roy',
    role: 'Lead Interior Stylist',
    bio: 'Shapes the aesthetic system and ensures every recommendation feels livable.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Dev Malik',
    role: 'ML Experience Lead',
    bio: 'Translates room understanding into practical, budget-aware design paths.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
  },
]

export const faqs: FAQItem[] = [
  {
    question: 'How does the AI decor assistant work?',
    answer:
      'Upload your room image, describe your goals, and the assistant generates style suggestions, budget estimates, and product recommendations.',
  },
  {
    question: 'Can I use Decor With Love on mobile?',
    answer:
      'Yes. The interface is fully responsive and adapts to desktop, tablet, and phone layouts.',
  },
  {
    question: 'Do sellers manage their own listings?',
    answer:
      'Sellers can add products, edit inventory, and track orders from the dashboard area.',
  },
]
