import fastify from 'fastify'
import { Apiary } from './database'

const server = fastify()

server.get('/apiary', async (_, reply) => {
    try {
        const apiaries = await Apiary.find().exec()
        return reply.code(200).send({apiaries})
    } catch(err) {
        return reply.code(404).send()
    }
})

interface AddApiaryBody {
    apiaryName: string
    controlNumber?: number
}

server.post<{Body: AddApiaryBody}>('/apiary', async (request, reply) => {
    const { body } = request
    const timestamp = new Date()
    try {
        return reply.code(200)
    } catch(err) {
        return reply.code(404).send()
    }
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
