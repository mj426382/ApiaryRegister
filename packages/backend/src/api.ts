import { FastifyInstance } from 'fastify'
import { Apiary } from './types'
import { getControlSumDigits, getNewApiaryNumber } from './utils'

const apiaries: Apiary[] = []

interface AddApiaryBody {
  name: string
  number?: string
}

export const addApi = (server: FastifyInstance) => {
  server.get('/apiary', async (request, reply) => {
    request.log.info(request)
    return reply.code(200).send({ apiaries })
  })

  server.post<{ Body: AddApiaryBody }>('/apiary', async (request, reply) => {
    request.log.info(request)
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

  return server
}
