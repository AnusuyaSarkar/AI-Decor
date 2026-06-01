import { Card, SectionHeading, StatCard } from '../components/ui'
import { dashboardStats, orders, products } from '../data/mockData'
import styles from '../styles/pages.module.css'

const sidebarItems = ['Overview', 'Products', 'Orders', 'Profile Settings']

export function SellerDashboardPage() {
  return (
    <div className={styles.page}>
      <section className="section-gap">
        <div className="page-shell">
          <SectionHeading eyebrow="Seller Dashboard" title="Manage your catalog, orders, and profile in one place" />

          <div className={styles.dashboardLayout}>
            <aside className={styles.dashboardSidebar}>
              {sidebarItems.map((item) => (
                <button key={item} type="button" className={styles.sidebarButton}>{item}</button>
              ))}
            </aside>

            <div className={styles.dashboardMain}>
              <div className={styles.statsGrid}>
                {dashboardStats.map((stat) => <StatCard key={stat.label} {...stat} />)}
              </div>

              <Card className={styles.dashboardSection}>
                <SectionHeading eyebrow="Add Product" title="Create a new listing" />
                <div className={styles.formGrid}>
                  <input className="textInput" placeholder="Product name" />
                  <input className="textInput" placeholder="Price" />
                  <input className="textInput" placeholder="Seller name" />
                  <select className="selectInput" defaultValue="Decor">
                    <option>Decor</option>
                    <option>Lighting</option>
                    <option>Seating</option>
                    <option>Tables</option>
                  </select>
                  <textarea className="textArea" placeholder="Product description" />
                </div>
              </Card>

              <Card className={styles.dashboardSection}>
                <SectionHeading eyebrow="Product Management" title="Existing listings" />
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.slice(0, 4).map((product) => (
                        <tr key={product.id}>
                          <td>{product.name}</td>
                          <td>{product.category}</td>
                          <td>₹{product.price.toLocaleString('en-IN')}</td>
                          <td><span className="badge">Live</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card className={styles.dashboardSection}>
                <SectionHeading eyebrow="Order Management" title="Recent orders" />
                <div className={styles.orderList}>
                  {orders.map((order) => (
                    <div key={order.orderId} className={styles.orderCard}>
                      <div>
                        <strong>{order.orderId}</strong>
                        <p>{order.customer}</p>
                      </div>
                      <div>
                        <strong>{order.total}</strong>
                        <p>{order.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className={styles.dashboardSection}>
                <SectionHeading eyebrow="Profile Settings" title="Account details" />
                <div className={styles.formGrid}>
                  <input className="textInput" placeholder="Display name" defaultValue="Maison Loom" />
                  <input className="textInput" placeholder="Email" defaultValue="seller@decorwithlove.com" />
                  <input className="textInput" placeholder="Phone" defaultValue="+91 99887 66554" />
                  <button type="button" className="button buttonPrimary buttonMedium">Save Settings</button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
