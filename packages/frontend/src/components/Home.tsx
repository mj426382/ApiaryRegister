import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Apiary, DateFormat } from '../types'
import DatePicker from './DatePicker'
import { BACKEND_URL } from '../globals'

interface ApiaryResponse {
  apiaries: Apiary[]
}

const Home = () => {
  const [apiaries, setApiaries] = useState<Apiary[]>([])
  const [filteredApiaries, setFilteredApiaries] = useState<Apiary[]>([])
  const [status, setStatus] = useState<string | undefined>(undefined)
  const [from, setFrom] = useState<DateFormat>(null)
  const [to, setTo] = useState<DateFormat>(null)

  useEffect(() => {
    const filteredApiaries = apiaries.filter(({ date }) => {
      const timestamp = new Date(date).getTime()
      return (!to || to.valueOf() >= timestamp) && (!from || from.valueOf() <= timestamp)
    })
    setFilteredApiaries(filteredApiaries)
  }, [from, to, apiaries])

  useEffect(() => {
    const fetchApiaries = async () => {
      const apiariesRequest = await fetch(`${BACKEND_URL}/apiary`)
      if (!apiariesRequest.ok) {
        setStatus('Cannot fetch apiaries')
        return
      }
      const apiariesResponse: ApiaryResponse = await apiariesRequest.json()
      setApiaries(apiariesResponse.apiaries)
    }
    void fetchApiaries()
  }, [])

  return status ? (
    <p>Cannot fetch data</p>
  ) : (
    <div style={{ height: '600px', width: '1000px', margin: 'auto' }}>
      <DatePicker date={from} setDate={setFrom} label={'From'} />
      <DatePicker date={to} setDate={setTo} label={'To'} />
      <DataGrid
        rows={filteredApiaries.map((value, id) => {
          return {
            ...value,
            id,
            date: new Date(value.date).toUTCString(),
          }
        })}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  )
}

export default Home

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 350 },
  { field: 'date', headerName: 'Date', width: 300 },
  { field: 'number', headerName: 'Number', width: 350 },
]
