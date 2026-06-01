export type ThemeMode = 'light' | 'dark'

export interface NavItem {
  label: string
  path: string
}

export interface FeatureCard {
  title: string
  description: string
  icon: string
}

export interface Testimonial {
  name: string
  role: string
  quote: string
  avatar: string
}

export interface CategoryItem {
  name: string
  description: string
  image: string
}

export interface ProductReview {
  name: string
  rating: number
  comment: string
}

export interface Product {
  id: string
  slug: string
  name: string
  price: number
  seller: string
  rating: number
  category: string
  image: string
  description: string
  gallery: string[]
  reviews: ProductReview[]
}

export interface DashboardStat {
  label: string
  value: string
  detail: string
}

export interface OrderItem {
  orderId: string
  customer: string
  total: string
  status: string
}

export interface SavedDesign {
  title: string
  subtitle: string
  image: string
}

export interface AnalysisHistory {
  title: string
  summary: string
  date: string
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
}

export interface FAQItem {
  question: string
  answer: string
}
