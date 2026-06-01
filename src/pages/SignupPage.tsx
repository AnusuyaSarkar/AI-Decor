import { Link } from 'react-router-dom'
import { Button, Card } from '../components/ui'
import styles from '../styles/pages.module.css'

export function SignupPage() {
  return (
    <div className={styles.authPage}>
      <div className={styles.authShell}>
        <div className={styles.authCopy}>
          <p className={styles.heroEyebrow}>Join Decor With Love</p>
          <h1 className={styles.authTitle}>Create an account for smarter room planning</h1>
          <p className={styles.authText}>
            Sign up as a customer to save ideas or as a seller to manage your decor catalog.
          </p>
        </div>

        <Card className={styles.authCard}>
          <div className={styles.glassHeader}>
            <h2>Signup</h2>
            <p>Choose your role and get started.</p>
          </div>
          <div className={styles.authForm}>
            <input className="textInput" placeholder="Name" />
            <input className="textInput" type="email" placeholder="Email" />
            <input className="textInput" type="password" placeholder="Password" />
            <input className="textInput" type="password" placeholder="Confirm Password" />
            <select className="selectInput" defaultValue="Customer">
              <option>Customer</option>
              <option>Seller</option>
            </select>
            <Button size="large">Create Account</Button>
            <p className={styles.helperLink}>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
