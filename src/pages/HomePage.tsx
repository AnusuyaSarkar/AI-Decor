import { motion } from 'framer-motion'
import { Button, Card, SectionHeading } from '../components/ui'
import { categories, featureCards, testimonials } from '../data/mockData'
import styles from '../styles/pages.module.css'

export function HomePage() {
  return (
    <div className={styles.page}>
      <section className={styles.heroSection}>
        <div className={[styles.heroGrid, 'page-shell'].join(' ')}>
          <motion.div
            className={styles.heroCopy}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className={styles.heroEyebrow}>Premium AI Interior Styling</p>
            <h1 className={styles.heroTitle}>Transform Your Space with AI-Powered Decoration Ideas</h1>
            <p className={styles.heroText}>
              Decor With Love turns room photos into thoughtful interior concepts, budget-aware recommendations,
              and a marketplace experience that feels editorial and elevated.
            </p>
            <div className={styles.ctaRow}>
              <Button to="/assistant" size="large">Upload Your Room</Button>
              <Button to="/marketplace" variant="secondary" size="large">Explore Products</Button>
            </div>
            <div className={styles.heroStats}>
              <Card className={styles.heroStatCard}>
                <strong>12k+</strong>
                <span>rooms analyzed</span>
              </Card>
              <Card className={styles.heroStatCard}>
                <strong>4.9/5</strong>
                <span>average experience</span>
              </Card>
              <Card className={styles.heroStatCard}>
                <strong>₹20k</strong>
                <span>smart budget focus</span>
              </Card>
            </div>
          </motion.div>

          <motion.div
            className={styles.heroVisual}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div
              className={styles.heroImage}
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(55, 40, 28, 0.08), rgba(55, 40, 28, 0.36)), url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80')",
              }}
            >
              <div className={styles.heroFloatingCard}>
                <span className={styles.badge}>AI Insight</span>
                <p>Warm neutrals, soft wood finishes, and layered lighting are the strongest opportunities.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-gap">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Platform Highlights"
            title="A polished workflow for inspiration, recommendations, and buying"
            description="Everything is designed to feel premium, calm, and quick to explore on any screen size."
          />
          <div className={styles.featureGrid}>
            {featureCards.map((feature) => (
              <Card key={feature.title} className={styles.featureCard}>
                <span className={styles.featureIcon}>{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.altSection} section-gap`}>
        <div className="page-shell">
          <SectionHeading
            eyebrow="Testimonials"
            title="Loved by homeowners, stylists, and sellers"
          />
          <div className={styles.testimonialGrid}>
            {testimonials.map((item) => (
              <Card key={item.name} className={styles.testimonialCard}>
                <div className={styles.avatarRow}>
                  <img src={item.avatar} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.role}</p>
                  </div>
                </div>
                <p className={styles.quote}>“{item.quote}”</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-gap">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Categories"
            title="Popular decor categories"
            description="Browse the styles most requested by users across bedrooms, living rooms, dining spaces, and work areas."
          />
          <div className={styles.categoryGrid}>
            {categories.map((category) => (
              <Card key={category.name} className={styles.categoryCard} padded={false}>
                <img src={category.image} alt={category.name} className={styles.categoryImage} />
                <div className={styles.categoryBody}>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
