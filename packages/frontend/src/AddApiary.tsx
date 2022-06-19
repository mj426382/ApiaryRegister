import React, { useState } from 'react'
import { Alert, Button, TextField } from '@mui/material'

const AddApiary = () => {
  const [name, setName] = useState<string | undefined>(undefined)
  const [number, setNumber] = useState<string | undefined>(undefined)
  const [status, setStatus] = useState<string | undefined>(undefined)
  const [error, setError] = useState(false)

  const onNameChanged = (value: string) => {
    setName(value)
  }

  const onNumberChanged = (value: string) => {
    setNumber(value === '' ? undefined : value) // in case of removing text
  }

  const submitApiary = async () => {
    if (!name || name === '') {
      setStatus('You must fill at least name to add an apiary')
      setError(true)
      return
    }
    if (number && number.length > 5) {
      setStatus('Number should have at most 5 characters')
      setError(true)
      return
    }
    const response = await fetch('http://127.0.0.1:8080/apiary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        number,
      }),
    })
    const newStatus = response.ok ? `Apiary ${name} was added` : 'Server error'
    setStatus(newStatus)
    setError(!response.ok)
  }

  return (
    <>
      <TextField id="outlined-basic" label="Name" variant="outlined" onChange={(e) => onNameChanged(e.target.value)} />
      <TextField
        id="filled-basic"
        label="Number(optional)"
        variant="outlined"
        onChange={(e) => onNumberChanged(e.target.value)}
      />
      {status && <Alert severity={error ? 'error' : 'success'}>{status}</Alert>}
      <Button variant="contained" onClick={() => submitApiary()}>
        Add
      </Button>
    </>
  )
}

export default AddApiary
