import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { HttpExceptionTransformer } from 'http-exception-transformer'
import { initializeConnection } from './service/database/cassandra'

/** link all modules onto application */
import UserRoutes from './modules/user/routes'
// import AuthRoutes from './modules/auth/routes'

/** initialize database connections */
initializeConnection()

/**
 * Initialize express application to hook all middleware
 */
const app = express()

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(bodyParser.json())
app.use(cookieParser())

app.get('', (req, res) => {
  res.json({ alive: true })
})

app.use('/user', UserRoutes)
// app.use('/auth', AuthRoutes)

app.use(HttpExceptionTransformer)
export default app
