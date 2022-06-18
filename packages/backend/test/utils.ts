import { expect } from 'chai'
import { getControlSum, isToday, formatDate, getControlSumDigits } from '../src/utils'

const DAY = 86400 * 1000

describe('utils.ts', function () {
  const someDate = new Date(0) // 01.01.1970 00:00

  describe('getControlSum', () => {
    it('without 0', () => {
      expect(getControlSum('12').toString()).to.be.equal('24')
    })

    it(' with 0', () => {
      expect(getControlSum('1201').toString()).to.be.equal('2402')
    })
  })

  describe('getControlSumDigits', () => {
    it('base example', () => {
      expect(getControlSumDigits('2022060900002')).to.be.equal('708')
    })

    it('base example 2', () => {
      expect(getControlSumDigits('2022060912987')).to.be.equal('852')
    })
  })

  describe('isToday', () => {
    it('same day', () => {
      expect(isToday(someDate, someDate)).to.be.true
    })

    it('next day', () => {
      expect(isToday(someDate, new Date(DAY))).to.be.false
    })
  })

  describe('formatDate', () => {
    it('correctly cuts rest of iso', () => {
      expect(formatDate(someDate)).to.be.equal('19700101')
    })
  })
})
