import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Card, EmptyState, FilterChip, ProductCard, SectionHeading } from '../components/ui'
import { categories, products } from '../data/mockData'
import styles from '../styles/pages.module.css'

const pageSize = 6

export function MarketplacePage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [maxPrice, setMaxPrice] = useState(25000)
  const [page, setPage] = useState(1)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase()) || product.seller.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === 'All' || product.category === category
      const matchesPrice = product.price <= maxPrice
      return matchesQuery && matchesCategory && matchesPrice
    })
  }, [category, maxPrice, query])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize))
  const visibleProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className={styles.page}>
      <section className="section-gap">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Marketplace"
            title="Search premium decor, filter by budget, and browse by mood"
            description="A backend-ready product grid with search, category filters, price controls, and pagination."
          />

          <div className={styles.marketToolbar}>
            <input className="filterInput" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products or sellers" />
            <Card className={styles.pricePanel}>
              <label className="label" htmlFor="price-range">Price range: up to ₹{maxPrice.toLocaleString('en-IN')}</label>
              <input
                id="price-range"
                type="range"
                min={2000}
                max={25000}
                step={500}
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
              />
            </Card>
          </div>

          <div className={styles.filterRow}>
            {['All', 'Seating', 'Lighting', 'Tables', 'Bedroom', 'Decor', 'Storage'].map((item) => (
              <FilterChip key={item} active={category === item} onClick={() => { setCategory(item); setPage(1) }}>
                {item}
              </FilterChip>
            ))}
          </div>

          <div className={styles.marketGrid}>
            {visibleProducts.length ? visibleProducts.map((product) => <ProductCard key={product.id} product={product} />) : (
              <div className={styles.marketEmpty}>
                <EmptyState title="No products match these filters" description="Try a broader search term or increase the price range." />
              </div>
            )}
          </div>

          <div className={styles.paginationRow}>
            <Button variant="secondary" size="small" onClick={() => setPage((current) => Math.max(1, current - 1))}>
              Previous
            </Button>
            <span>Page {page} of {totalPages}</span>
            <Button variant="secondary" size="small" onClick={() => setPage((current) => Math.min(totalPages, current + 1))}>
              Next
            </Button>
          </div>

          <div className={styles.categoryBanner}>
            {categories.map((item) => (
              <motion.div key={item.name} whileHover={{ y: -4 }} className={styles.categoryBannerCard}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
