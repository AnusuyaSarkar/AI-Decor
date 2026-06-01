import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink, Outlet } from 'react-router-dom'
import { navItems } from '../data/mockData'
import { ThemeToggle, Button } from './ui'
import styles from './layout.module.css'

export function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.navInner}>
          <NavLink to="/" className={styles.brand} onClick={() => setMenuOpen(false)}>
            <span className={styles.brandMark} aria-hidden="true" />
            <span className={styles.brandText}>
              Decor With Love
              <span>AI-powered interior styling</span>
            </span>
          </NavLink>

          <nav className={styles.desktopNav} aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }: { isActive: boolean }) => [styles.navLink, isActive ? styles.navLinkActive : ''].filter(Boolean).join(' ')}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className={styles.actions}>
            <ThemeToggle />
            <Button to="/assistant" variant="primary" size="small" className="desktop-cta">
              Start Designing
            </Button>
            <button
              type="button"
              className={[styles.themeToggle, styles.menuButton].join(' ')}
              onClick={() => setMenuOpen((value) => !value)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              ☰
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              className={styles.mobilePanel}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
            >
              <div className={styles.mobileMenu}>
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }: { isActive: boolean }) => [styles.mobileLink, isActive ? styles.navLinkActive : ''].filter(Boolean).join(' ')}
                  >
                    {item.label}
                  </NavLink>
                ))}
                <NavLink
                  to="/assistant"
                  onClick={() => setMenuOpen(false)}
                  className={styles.mobileCta}
                >
                  Upload Your Room
                </NavLink>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <h3 className={styles.footerTitle}>Decor With Love</h3>
            <p className={styles.footerText}>
              Premium AI-led interior decoration, beautiful product discovery, and a marketplace that feels curated rather than crowded.
            </p>
          </div>

          <div>
            <p className={styles.footerHeading}>Contact</p>
            <ul className={styles.footerList}>
              <li>hello@decorwithlove.com</li>
              <li>+91 98765 43210</li>
              <li>Bengaluru, India</li>
            </ul>
          </div>

          <div>
            <p className={styles.footerHeading}>Social</p>
            <ul className={styles.footerList}>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://pinterest.com" target="_blank" rel="noreferrer">Pinterest</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>© 2026 Decor With Love</span>
          <span>Built for responsive, backend-ready product experiences.</span>
        </div>
      </footer>
    </div>
  )
}
