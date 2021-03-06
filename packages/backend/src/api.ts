import { FastifyInstance } from 'fastify'
import { Apiary } from './types'
import { getControlSumDigits, getNewApiaryNumber } from './utils'

const apiaries: Apiary[] = []

interface AddApiaryBody {
  name: string
  number?: string
}

export const addApi = (server: FastifyInstance) => {
  server.get('/apiary', async (_, reply) => {
    return reply.code(200).send({ apiaries })
  })

  server.post<{ Body: AddApiaryBody }>('/apiary', async (request, reply) => {
    const { number, name } = request.body

    if (number && !Number.isInteger(Number(number))) {
      return reply.code(422).send()
    }

    const currentDate = new Date()
    const resultNumber = await getNewApiaryNumber(number, currentDate, apiaries)

    apiaries.push({
      name,
      number: resultNumber + getControlSumDigits(resultNumber),
      date: currentDate,
    })

    return reply.code(200).send()
  })

  return server
}
