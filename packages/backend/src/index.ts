import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import { Apiary } from './database'

const server = fastify()
server.register(fastifyCors, {
    origin: '*'
})

server.get('/apiary', async (_, reply) => {
    try {
        const apiaries = await Apiary.find().exec()
        return reply.code(200).send({apiaries})
    } catch(err) {
        return reply.code(404).send()
    }
})

interface AddApiaryBody {
    name: string
    number?: number
}

server.post<{Body: AddApiaryBody}>('/apiary', async (request, reply) => {
    const { body } = request
    try {
        const apiary = new Apiary({
            ...body,
            date: new Date()
        })
        if (!apiary) {
            return reply.code(409)
        }
        await apiary.save()
        return reply.code(200).send()
    } catch(err) {
        console.log(err)
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
