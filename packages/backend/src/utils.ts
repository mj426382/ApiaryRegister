export const isToday = (someDate: Date, today: Date) => {
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  )
}

export const getControlSum = (numberWithoutSum: string) =>
  Array.from(numberWithoutSum).reduce((product, single) => {
    const singleNumber = parseInt(single)
    return singleNumber !== 0 ? product * BigInt(singleNumber) : product
  }, BigInt(numberWithoutSum))

export const getControlSumDigits = (numberWithoutSum: string) => {
  const controlSum = getControlSum(numberWithoutSum).toString()

  return [controlSum[1], controlSum[6], controlSum[controlSum.length - 1]].join('')
}

export const formatDate = (date: Date) => date.toISOString().split('T')[0].replace(/-/g, '')
