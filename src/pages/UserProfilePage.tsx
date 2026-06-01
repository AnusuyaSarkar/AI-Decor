import { Card, SectionHeading } from '../components/ui'
import { analysisHistory, savedDesigns, products } from '../data/mockData'
import styles from '../styles/pages.module.css'

export function UserProfilePage() {
  return (
    <div className={styles.page}>
      <section className="section-gap">
        <div className="page-shell">
          <SectionHeading eyebrow="User Profile" title="Saved designs, analyses, and wishlist items" />

          <div className={styles.profileLayout}>
            <Card className={styles.profileSummary}>
              <div className={styles.profileAvatar}>DW</div>
              <h3>Deepa Williams</h3>
              <p>Decor enthusiast with a love for warm minimal interiors.</p>
              <div className={styles.profileMeta}>
                <span>Saved designs: 8</span>
                <span>Wishlist items: 14</span>
              </div>
            </Card>

            <Card className={styles.profileSection}>
              <SectionHeading eyebrow="Saved Designs" title="Your visual inspirations" />
              <div className={styles.savedGrid}>
                {savedDesigns.map((item) => (
                  <div key={item.title} className={styles.savedCard}>
                    <img src={item.image} alt={item.title} />
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className={styles.profileSection}>
              <SectionHeading eyebrow="Previous AI Analyses" title="Room reports" />
              <div className={styles.timeline}>
                {analysisHistory.map((item) => (
                  <div key={item.title} className={styles.timelineItem}>
                    <span>{item.date}</span>
                    <strong>{item.title}</strong>
                    <p>{item.summary}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className={styles.profileSection}>
              <SectionHeading eyebrow="Wishlist" title="Products you may love" />
              <div className={styles.wishlistGrid}>
                {products.slice(0, 4).map((product) => (
                  <div key={product.id} className={styles.wishlistCard}>
                    <img src={product.image} alt={product.name} />
                    <div>
                      <h4>{product.name}</h4>
                      <p>₹{product.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
