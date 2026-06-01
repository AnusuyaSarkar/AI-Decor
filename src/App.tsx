import { AnimatePresence, motion } from 'framer-motion'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { MainLayout } from './components/layout'
import { HomePage } from './pages/HomePage'
import { AiDecorAssistantPage } from './pages/AiDecorAssistantPage'
import { MarketplacePage } from './pages/MarketplacePage'
import { ProductDetailsPage } from './pages/ProductDetailsPage'
import { SellerDashboardPage } from './pages/SellerDashboardPage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { UserProfilePage } from './pages/UserProfilePage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { NotFoundPage } from './pages/NotFoundPage'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="assistant" element={<AiDecorAssistantPage />} />
            <Route path="marketplace" element={<MarketplacePage />} />
            <Route path="marketplace/:productId" element={<ProductDetailsPage />} />
            <Route path="dashboard" element={<SellerDashboardPage />} />
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
