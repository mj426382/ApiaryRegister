import { build } from './server'
import 'dotenv/config'

const PORT = parseInt(process.env.PORT ?? '8080')
const ADDRESS = process.env.ADDRESS

const startServer = async () => {
  const server = await build()

  server.listen({ port: PORT, host: ADDRESS }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })
}

void startServer()
