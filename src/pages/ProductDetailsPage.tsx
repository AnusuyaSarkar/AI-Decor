import { Link, useParams } from 'react-router-dom'
import { Button, Card, ErrorState, SectionHeading } from '../components/ui'
import { products } from '../data/mockData'
import styles from '../styles/pages.module.css'

export function ProductDetailsPage() {
  const { productId } = useParams()
  const product = products.find((item) => item.slug === productId || item.id === productId)

  if (!product) {
    return (
      <div className={styles.page}>
        <section className="section-gap">
          <div className="page-shell">
            <ErrorState title="Product not found" description="This product may have moved or is unavailable in the mock catalog." />
          </div>
        </section>
      </div>
    )
  }

  const similarProducts = products.filter((item) => item.id !== product.id).slice(0, 3)

  return (
    <div className={styles.page}>
      <section className="section-gap">
        <div className="page-shell">
          <SectionHeading eyebrow="Product Details" title={product.name} description={product.description} />

          <div className={styles.productLayout}>
            <div className={styles.galleryColumn}>
              <Card className={styles.galleryMain} padded={false}>
                <img src={product.gallery[0]} alt={product.name} className={styles.galleryImage} />
              </Card>
              <div className={styles.thumbGrid}>
                {product.gallery.map((image) => (
                  <img key={image} src={image} alt={product.name} className={styles.thumbImage} />
                ))}
              </div>
            </div>

            <div className={styles.detailsColumn}>
              <Card className={styles.detailsCard}>
                <div className={styles.detailHeader}>
                  <div>
                    <p className="badge">{product.category}</p>
                    <h3>{product.name}</h3>
                    <p>Seller: {product.seller}</p>
                  </div>
                  <div className={styles.priceStack}>
                    <strong>₹{product.price.toLocaleString('en-IN')}</strong>
                    <span>★ {product.rating.toFixed(1)}</span>
                  </div>
                </div>
                <p>{product.description}</p>
                <div className={styles.inlineActions}>
                  <Button>Add to Cart</Button>
                  <Button to="/marketplace" variant="secondary">Back to Marketplace</Button>
                </div>
              </Card>

              <Card className={styles.detailsCard}>
                <SectionHeading eyebrow="Seller" title="Seller information" />
                <div className={styles.sellerCard}>
                  <p><strong>{product.seller}</strong></p>
                  <p>Verified marketplace partner with premium home decor focus.</p>
                  <p>Fast shipping, careful packaging, and custom styling support.</p>
                </div>
              </Card>

              <Card className={styles.detailsCard}>
                <SectionHeading eyebrow="Reviews" title="Customer feedback" />
                <div className={styles.reviewList}>
                  {product.reviews.map((review) => (
                    <div key={review.name} className={styles.reviewItem}>
                      <strong>{review.name}</strong>
                      <span>★ {review.rating.toFixed(1)}</span>
                      <p>{review.comment}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className={styles.detailsCard}>
                <SectionHeading eyebrow="Similar Products" title="You may also like" />
                <div className={styles.similarGrid}>
                  {similarProducts.map((item) => (
                    <Link key={item.id} to={`/marketplace/${item.slug}`} className={styles.similarCard}>
                      <img src={item.image} alt={item.name} />
                      <div>
                        <h4>{item.name}</h4>
                        <p>₹{item.price.toLocaleString('en-IN')}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
