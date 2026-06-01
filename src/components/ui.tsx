import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import type { Product } from '../types'
import styles from './ui.module.css'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'small' | 'medium' | 'large'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  to?: string
  children: ReactNode
}

function buttonClassName(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return [
    styles.button,
    variant === 'primary' ? styles.buttonPrimary : '',
    variant === 'secondary' ? styles.buttonSecondary : '',
    variant === 'ghost' ? styles.buttonGhost : '',
    size === 'small' ? styles.buttonSmall : '',
    size === 'medium' ? styles.buttonMedium : '',
    size === 'large' ? styles.buttonLarge : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')
}

export function Button({
  variant = 'primary',
  size = 'medium',
  to,
  children,
  className,
  ...props
}: ButtonProps) {
  const resolvedClassName = buttonClassName(variant, size, className)

  if (to) {
    return (
      <Link to={to} className={resolvedClassName}>
        {children}
      </Link>
    )
  }

  return (
    <button className={resolvedClassName} {...props}>
      {children}
    </button>
  )
}

export function Card({ children, className = '', padded = true }: { children: ReactNode; className?: string; padded?: boolean }) {
  return <div className={[styles.card, padded ? styles.cardPadded : '', className].filter(Boolean).join(' ')}>{children}</div>
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <div className={styles.sectionHeading}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h2 className={styles.title}>{title}</h2>
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  )
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button type="button" className={styles.themeToggle} onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'light' ? '◐' : '☼'}
    </button>
  )
}

export function StatCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <Card className={styles.statCard}>
      <p className={styles.statValue}>{value}</p>
      <p className={styles.statLabel}>{label}</p>
      <span className={styles.badge}>{detail}</span>
    </Card>
  )
}

export function FilterChip({
  active,
  children,
  onClick,
}: {
  active?: boolean
  children: ReactNode
  onClick?: () => void
}) {
  return (
    <button type="button" className={[styles.chip, active ? styles.chipActive : ''].filter(Boolean).join(' ')} onClick={onClick}>
      {children}
    </button>
  )
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className={styles.productCard}>
      <Link to={`/marketplace/${product.slug}`} className={styles.productMedia}>
        <img className={styles.productImage} src={product.image} alt={product.name} loading="lazy" />
      </Link>
      <div className={styles.productMeta}>
        <p className={styles.productCategory}>{product.category}</p>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productSeller}>Seller: {product.seller}</p>
      </div>
      <div className={styles.productFooter}>
        <div>
          <p className={styles.productPrice}>₹{product.price.toLocaleString('en-IN')}</p>
          <p className={styles.productRating}>★ {product.rating.toFixed(1)}</p>
        </div>
        <Button variant="secondary" size="small">Add to Cart</Button>
      </div>
    </Card>
  )
}

export function SkeletonCard() {
  return (
    <Card className={styles.skeletonCard}>
      <div className={[styles.skeleton, styles.skeletonImage].join(' ')} />
      <div className={[styles.skeleton, styles.skeletonLine].join(' ')} />
      <div className={[styles.skeleton, styles.skeletonLine].join(' ')} style={{ width: '72%' }} />
      <div className={[styles.skeleton, styles.skeletonLine].join(' ')} style={{ width: '45%' }} />
    </Card>
  )
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Card className={styles.emptyState}>
      <h3>{title}</h3>
      <p>{description}</p>
    </Card>
  )
}

export function ErrorState({ title, description }: { title: string; description: string }) {
  return (
    <Card className={styles.errorState}>
      <h3>{title}</h3>
      <p>{description}</p>
    </Card>
  )
}

export function LoadingState({ title, description }: { title: string; description: string }) {
  return (
    <Card className={styles.loadingState}>
      <div className={styles.spinner} />
      <h3>{title}</h3>
      <p>{description}</p>
    </Card>
  )
}
