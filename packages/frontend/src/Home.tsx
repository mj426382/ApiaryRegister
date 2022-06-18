import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

interface Apiary {
    name: string
    date: Date
    number: number
}

interface ApiaryResponse {
    apiaries: Apiary[]
}

const Home = () => {
    const [apiaries, setApiaries] = useState<Apiary[]>([])
    const [status, setStatus] = useState<string | undefined>(undefined)

    useEffect(() => {
        const fetchApiaries = async() => {
            const apiariesRequest = await fetch('http://127.0.0.1:8080/apiary')
            if (!apiariesRequest.ok) {
                setStatus('Cannot fetch apiaries')
                return
            }
            const apiariesResponse: ApiaryResponse = await apiariesRequest.json()
            setApiaries(apiariesResponse.apiaries)
        }
        fetchApiaries()
    }, [])

    return status 
    ? <p>Cannot fetch data</p> 
    : (
        <div style={{height: '400px', width: '800px'}}>
        <DataGrid
            rows={apiaries.map((value, id) => {
                return {...value, id}
            })}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
        />
        </div>
    )
}

export default Home

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'number', headerName: 'Number', width: 150 },
]
