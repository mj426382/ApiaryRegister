import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'

const AddApiary = () => {
    const [name, setName] = useState<string | undefined>(undefined)
    const [number, setNumber] = useState<string | undefined>(undefined)
    const [status, setStatus] = useState<string | undefined>(undefined)

    const onNameChanged = (value: string) => {
        setName(value)
    }

    const onNumberChanged = (value: string) => {
        setNumber(value)
    }

    const submitApiary = () => {
        fetch('http://127.0.0.1:8080/apiary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                number
            })
        }).then((response) => setStatus(response.status !== 200 ? 'Server error' : 'Apiary was added'))
    }

    return (
        <div>
            <TextField id="outlined-basic" label="Name" variant="outlined" onChange={(e) => onNameChanged(e.target.value)} />
            <TextField id="filled-basic" label="Number(optional)" variant="outlined" onChange={(e) => onNumberChanged(e.target.value)} />
            <p>{status}</p>
            <Button variant="contained" onClick={() => submitApiary()}>Add</Button>
        </div>
    )
}

export default AddApiary
