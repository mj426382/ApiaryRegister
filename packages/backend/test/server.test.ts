import { build } from '../src/server'
import { FastifyInstance } from 'fastify'
import { expect } from 'chai'
import { getNewApiaryNumber, getControlSumDigits } from '../src/utils'

describe('utils.ts', async () => {
  let app: FastifyInstance

  beforeEach(async () => {
    app = await build()
  })

  it('is empty at beggining', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/apiary',
    })

    expect(response.body).to.equal(JSON.stringify({ apiaries: [] }))
  })

  it('cannot add apiery with not number value', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/apiary',
      payload: {
        name: 'test',
        number: 'test',
      },
    })

    expect(response.statusCode).to.equal(422)
  })

  it('cannot add apiery with not integer value', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/apiary',
      payload: {
        name: 'test',
        number: '1.2',
      },
    })

    expect(response.statusCode).to.equal(422)
  })

  it('has one apiary after adding without number', async () => {
    const time = new Date()
    await app.inject({
      method: 'POST',
      url: '/apiary',
      payload: {
        name: 'test',
      },
    })

    const response = await app.inject({
      method: 'GET',
      url: '/apiary',
    })

    const number = await getNewApiaryNumber(undefined, time, [])
    const responseObject = JSON.parse(response.body)

    const addedApiary = responseObject.apiaries[0]

    expect(addedApiary.number).to.equal(number + getControlSumDigits(number))
    expect(addedApiary.name).to.equal('test')
  })

  it('has one apiary after adding with number', async () => {
    const time = new Date()
    await app.inject({
      method: 'POST',
      url: '/apiary',
      payload: {
        name: 'test',
        number: '12345',
      },
    })

    const response = await app.inject({
      method: 'GET',
      url: '/apiary',
    })

    const number = await getNewApiaryNumber('12345', time, [])
    const responseObject = JSON.parse(response.body)

    const addedApiary = responseObject.apiaries[1] // has one from previous test

    expect(addedApiary.number).to.equal(number + getControlSumDigits(number))
    expect(addedApiary.name).to.equal('test')
  })
})
