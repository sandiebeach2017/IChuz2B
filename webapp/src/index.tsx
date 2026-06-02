import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { homePage } from './routes/home'
import { caregivingPage } from './routes/caregiving'
import { careerPage } from './routes/career'
import { selfcarePage } from './routes/selfcare'
import { mediaPage } from './routes/media'
import { medicationApi } from './routes/medication-api'

const app = new Hono()

// Serve static assets
app.use('/static/*', serveStatic({ root: './' }))
app.use('/favicon.ico', serveStatic({ root: './', path: '/public/favicon.ico' }))

// Page routes
app.get('/', homePage)
app.get('/caregiving', caregivingPage)
app.get('/career', careerPage)
app.get('/selfcare', selfcarePage)
app.get('/media', mediaPage)

// API routes
app.route('/api/medication', medicationApi)

export default app
