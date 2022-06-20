import React from 'react'
import App from '../src/components/App'
import Header from '../src/components/Header'
import DatePicker from '../src/components/DatePicker'
import Home from '../src/components/Home'
import AddApiary from '../src/components/AddApiary'
import { render } from '@testing-library/react'
import { expect } from 'chai'

describe('components', () => {
  it('renders correctly title and table for App', async () => {
    const app = render(<App />)
    expect(app.queryByText('APIARIES')).not.to.be.null
    expect(app.queryAllByTitle('To')).not.to.be.null
    expect(app.queryAllByTitle('From')).not.to.be.null
    expect(app.queryAllByTitle('Number')).not.to.be.null
    expect(app.queryAllByTitle('Date')).not.to.be.null
    expect(app.queryAllByTitle('Name')).not.to.be.null
  })

  it('renders correctly Home', () => {
    const app = render(<Home />)
    expect(app.queryAllByTitle('To')).not.to.be.null
    expect(app.queryAllByTitle('From')).not.to.be.null
    expect(app.queryAllByTitle('Number')).not.to.be.null
    expect(app.queryAllByTitle('Date')).not.to.be.null
    expect(app.queryAllByTitle('Name')).not.to.be.null
  })

  it('renders correctly Header', () => {
    const app = render(<Header />)
    expect(app.queryByText('APIARIES')).not.to.be.null
  })

  it('renders correctly DatePicker', () => {
    const app = render(<DatePicker date={null} setDate={() => undefined} label={'To'} />)
    expect(app.queryAllByTitle('To')).not.to.be.null
  })

  it('renders correctly AddApiary', () => {
    const app = render(<AddApiary />)
    expect(app.queryAllByTitle('Name')).not.to.be.null
    expect(app.queryAllByTitle('Number(optional)')).not.to.be.null
  })
})
