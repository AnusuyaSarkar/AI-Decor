import { Card, SectionHeading } from '../components/ui'
import { faqs } from '../data/mockData'
import styles from '../styles/pages.module.css'

export function ContactPage() {
  return (
    <div className={styles.page}>
      <section className="section-gap">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Contact"
            title="Talk to the team, ask questions, or request a demo"
            description="A simple contact area with an FAQ panel and a map placeholder ready for future API integration."
          />

          <div className={styles.contactGrid}>
            <Card className={styles.contactFormCard}>
              <div className={styles.formGrid}>
                <input className="textInput" placeholder="Name" />
                <input className="textInput" placeholder="Email" />
                <input className="textInput" placeholder="Subject" />
                <textarea className="textArea" placeholder="Message" />
              </div>
              <button type="button" className="button buttonPrimary buttonLarge">Send Message</button>
            </Card>

            <Card className={styles.contactFaqCard}>
              <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
              <div className={styles.faqList}>
                {faqs.map((faq) => (
                  <details key={faq.question} className={styles.faqItem}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </Card>

            <Card className={styles.mapPlaceholder}>
              <h3>Google Maps placeholder</h3>
              <p>Map integration can replace this block later with live location details and store visits.</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
