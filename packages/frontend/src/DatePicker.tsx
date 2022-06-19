import React from 'react'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateFormat } from './types'
import { TextField } from '@mui/material'

interface DatePickerProps {
  date: DateFormat
  setDate: React.Dispatch<React.SetStateAction<DateFormat>>
  label: string
}

const DatePicker = ({ date, setDate, label }: DatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props: any) => <TextField {...props} />}
        value={date}
        onChange={setDate}
        label={label}
      />
    </LocalizationProvider>
  )
}

export default DatePicker
