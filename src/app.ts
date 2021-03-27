import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { HttpExceptionTransformer } from 'http-exception-transformer'
import { initializeConnection } from './service/database/cassandra'
import { cookieDecoder } from './service/cookie/decoder'

import { roleStatusCheck } from './service/roles/definitions'

/** link all modules onto application */
import UserRoutes from './modules/user/routes'
import AuthRoutes from './modules/auth/routes'
import NoteRoutes from './modules/notes/routes'
import { ensureLoggedIn } from './service/middleware/loggedIn.middleware'

/** initialize database connections */
initializeConnection()
roleStatusCheck()

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
app.use(cookieDecoder())

app.get('', (req, res) => {
  res.json({ alive: true })
})

app.use('/user', UserRoutes)
app.use('/auth', AuthRoutes)

app.use('/note', ensureLoggedIn())
app.use('/note', NoteRoutes)

app.use(HttpExceptionTransformer)
export default app
