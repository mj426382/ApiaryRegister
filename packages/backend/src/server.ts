import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import 'dotenv/config'
import { Apiary } from './types'
import { getControlSumDigits, getNewApiaryNumber } from './utils'

const apiaries: Apiary[] = []

const PORT = parseInt(process.env.PORT ?? '8080')
const ADDRESS = process.env.ADDRESS

const server = fastify()
void server.register(fastifyCors, {
  origin: '*',
})

server.get('/apiary', async (_, reply) => {
  return reply.code(200).send({ apiaries })
})

interface AddApiaryBody {
  name: string
  number?: string
}

server.post<{ Body: AddApiaryBody }>('/apiary', async (request, reply) => {
  const { number, name } = request.body
  const currentDate = new Date()
  const resultNumber = await getNewApiaryNumber(number, currentDate, apiaries)

  apiaries.push({
    name,
    number: resultNumber + getControlSumDigits(resultNumber),
    date: currentDate,
  })

  return reply.code(200).send()
})

server.listen({ port: PORT, host: ADDRESS }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
