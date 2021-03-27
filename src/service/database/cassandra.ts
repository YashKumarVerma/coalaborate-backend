import { Client } from 'cassandra-driver'
import path from 'path'
import config from 'config'
import { logger } from '../logger/winston'

const client = new Client({
  cloud: {
    secureConnectBundle: path.join(__dirname, './secure.zip'),
  },
  credentials: {
    username: config.get('astra.client_id'),
    password: config.get('astra.client_secret'),
  },
})

const initializeConnection = () => {
  try {
    client.connect()
    logger.info('Database connected')
  } catch (e) {
    logger.error('Error connecting database')
  }
  //   const rs = await client.execute('SELECT * FROM system.local')
  //   console.log(`Your cluster returned ${rs.rowLength} row(s)`)

  //   await client.shutdown()
}

const getCassandra = () => client

export { initializeConnection, getCassandra }
