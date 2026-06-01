import { Button, Card } from '../components/ui'
import styles from '../styles/pages.module.css'

export function NotFoundPage() {
  return (
    <div className={styles.page}>
      <section className="section-gap">
        <div className="page-shell">
          <Card className={styles.notFoundCard}>
            <p className="badge">404</p>
            <h1>Page not found</h1>
            <p>The page you requested is not available in this mock frontend.</p>
            <Button to="/" size="large">Return Home</Button>
          </Card>
        </div>
      </section>
    </div>
  )
}
