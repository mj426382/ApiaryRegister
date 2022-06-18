import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import { Apiary } from './database'
import { formatDate, isToday, getControlSumDigits } from './utils'

const server = fastify()
void server.register(fastifyCors, {
  origin: '*',
})

interface Apiary {
  number: number
  name: string
  date: Date
}

server.get('/apiary', async (_, reply) => {
  try {
    const apiaries: Apiary[] = await Apiary.find().exec()
    return reply.code(200).send({ apiaries })
  } catch (err) {
    return reply.code(404).send()
  }
})

interface AddApiaryBody {
  name: string
  number?: string
}

server.post<{ Body: AddApiaryBody }>('/apiary', async (request, reply) => {
  const { body } = request
  try {
    const { number, name } = body
    const currentDate = new Date()
    const formattedDate = formatDate(currentDate)

    const apiaries: Apiary[] = await Apiary.find().exec()
    const todayApiaries = apiaries.filter(({ date }) => isToday(date, currentDate)).length
    const todayApiariesDigits = todayApiaries.toString().length

    const leadingZeros = new Array(5 - todayApiariesDigits).fill('0').join('')

    const overridenNumber = number ?? leadingZeros + todayApiaries

    const resultNumber = formattedDate + overridenNumber

    const apiary = new Apiary({
      name,
      number: resultNumber + getControlSumDigits(resultNumber),
      date: currentDate,
    })
    if (!apiary) {
      return reply.code(409)
    }
    await apiary.save()
    return reply.code(200).send()
  } catch (err) {
    return reply.code(500).send()
  }
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
