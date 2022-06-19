import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import { addApi } from './api'

export const build = async () => {
  const server = fastify()
  await server.register(fastifyCors, {
    origin: '*',
  })
  return addApi(server)
}
