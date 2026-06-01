import { useMemo, useState } from 'react'
import type { ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import { Button, Card, EmptyState, LoadingState, SectionHeading, SkeletonCard } from '../components/ui'
import { products } from '../data/mockData'
import styles from '../styles/pages.module.css'

interface AssistantResult {
  suggestions: string[]
  budget: string
  products: string[]
  image: string
}

export function AiDecorAssistantPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [preferences, setPreferences] = useState('I want a modern minimalist bedroom under ₹20,000')
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<AssistantResult | null>(null)

  const recommendedProducts = useMemo(() => products.slice(0, 4), [])

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    const previewUrl = URL.createObjectURL(file)
    setSelectedImage(previewUrl)
    setResult(null)
  }

  function handleGenerate() {
    setIsGenerating(true)
    setResult(null)

    window.setTimeout(() => {
      setResult({
        suggestions: [
          'Choose a low-profile bed and keep the palette to cream, oak, and muted terracotta.',
          'Use layered lighting: one ceiling source, one reading lamp, and one warm accent light.',
          'Add storage that doubles as decor so the room stays visually calm.',
        ],
        budget: 'Estimated budget: ₹18,600',
        products: recommendedProducts.map((product) => `${product.name} - ₹${product.price.toLocaleString('en-IN')}`),
        image:
          'https://images.unsplash.com/photo-1505693416388-3f0f4b1f6e4d?auto=format&fit=crop&w=1400&q=80',
      })
      setIsGenerating(false)
    }, 1400)
  }

  return (
    <div className={styles.page}>
      <section className="section-gap">
        <div className="page-shell">
          <SectionHeading
            eyebrow="AI Decor Assistant"
            title="Upload a room, describe your taste, and get a refined decor direction"
            description="This flow is built for fast mockups now and backend inference later, so the structure is ready for integration."
          />

          <div className={styles.assistantGrid}>
            <Card className={styles.uploadPanel}>
              <div className={styles.dropzone}>
                {selectedImage ? (
                  <img src={selectedImage} alt="Uploaded room preview" className={styles.previewImage} />
                ) : (
                  <div className={styles.dropzoneCopy}>
                    <p className={styles.dropzoneIcon}>⤒</p>
                    <h3>Drag and drop a room image</h3>
                    <p>PNG, JPG, or WEBP works well for analysis.</p>
                  </div>
                )}
                <label className={styles.uploadButton}>
                  Choose Image
                  <input type="file" accept="image/*" onChange={handleFileChange} className="sr-only" />
                </label>
              </div>
              <div className={styles.formBlock}>
                <label className="label" htmlFor="preferences">Preferences</label>
                <textarea
                  id="preferences"
                  className="textArea"
                  value={preferences}
                  onChange={(event) => setPreferences(event.target.value)}
                />
              </div>
              <Button onClick={handleGenerate} size="large">
                {isGenerating ? 'Generating...' : 'Generate'}
              </Button>
            </Card>

            <div className={styles.resultsColumn}>
              {isGenerating ? (
                <LoadingState title="Analyzing your space" description="The assistant is detecting room patterns, budget cues, and decor opportunities." />
              ) : result ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className={styles.resultsPanel}>
                    <SectionHeading eyebrow="Results" title="AI suggestions" />
                    <ul className={styles.suggestionList}>
                      {result.suggestions.map((suggestion) => (
                        <li key={suggestion}>{suggestion}</li>
                      ))}
                    </ul>
                    <div className={styles.budgetBar}>{result.budget}</div>
                    <div className={styles.generatedImageWrap}>
                      <img src={result.image} alt="Generated room concept" className={styles.generatedImage} />
                    </div>
                  </Card>

                  <Card className={styles.resultsPanel}>
                    <SectionHeading eyebrow="Recommended Products" title="Shoppable items" />
                    <div className={styles.recommendedList}>
                      {result.products.map((item) => (
                        <div key={item} className={styles.recommendedItem}>{item}</div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ) : (
                <EmptyState
                  title="Your generated recommendations will appear here"
                  description="Upload a room image and describe the look you want to see a premium AI concept with budget guidance."
                />
              )}
              <div className={styles.skeletonRow}>
                <SkeletonCard />
                <SkeletonCard />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
