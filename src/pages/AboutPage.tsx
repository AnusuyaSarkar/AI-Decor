import { Card, SectionHeading } from '../components/ui'
import styles from '../styles/pages.module.css'

export function AboutPage() {
  return (
    <div className={styles.page}>
      <section className="section-gap">
        <div className="page-shell">
          <SectionHeading
            eyebrow="About"
            title="A company mission built around beautiful, intelligent decor guidance"
            description="We pair AI room understanding with premium curation so people can decorate with confidence instead of guesswork."
          />

          <div className={styles.aboutGrid}>
            <Card className={styles.aboutPanel}>
              <h3>Our mission</h3>
              <p>
                Make interior styling accessible, elegant, and more personal by turning inspiration into actionable recommendations.
              </p>
            </Card>

            <Card className={styles.aboutPanel}>
              <h3>How Decor With Love works</h3>
              <ol>
                <li>Upload a room photo and describe your taste and budget.</li>
                <li>The AI suggests layout improvements, colors, and product pairings.</li>
                <li>Shop from the marketplace or save a concept for later.</li>
              </ol>
            </Card>
          </div>

        </div>
      </section>
    </div>
  )
}
