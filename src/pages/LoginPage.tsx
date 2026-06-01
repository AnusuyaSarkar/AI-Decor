import { Link } from 'react-router-dom'
import { Button, Card } from '../components/ui'
import styles from '../styles/pages.module.css'

export function LoginPage() {
  return (
    <div className={styles.authPage}>
      <div className={styles.authShell}>
        <div className={styles.authCopy}>
          <p className={styles.heroEyebrow}>Welcome Back</p>
          <h1 className={styles.authTitle}>A premium sign-in for returning users and sellers</h1>
          <p className={styles.authText}>
            Access saved designs, order management, and AI recommendations from a single calm interface.
          </p>
        </div>

        <Card className={styles.authCard}>
          <div className={styles.glassHeader}>
            <h2>Login</h2>
            <p>Continue with your email or Google account.</p>
          </div>
          <div className={styles.authForm}>
            <input className="textInput" type="email" placeholder="Email address" />
            <input className="textInput" type="password" placeholder="Password" />
            <label className={styles.checkboxRow}>
              <input type="checkbox" /> Remember me
            </label>
            <Button size="large">Login</Button>
            <Button variant="secondary" size="large">Google Login</Button>
            <p className={styles.helperLink}>
              New here? <Link to="/signup">Create an account</Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
