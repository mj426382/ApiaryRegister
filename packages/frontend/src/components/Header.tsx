import React from 'react'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'

const Header = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            APIARIES
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button
              key="Home"
              sx={{ color: '#fff' }}
              onClick={() => {
                window.location.replace('/')
              }}
            >
              Home
            </Button>
            <Button
              key="Add"
              sx={{ color: '#fff' }}
              onClick={() => {
                window.location.replace('/add')
              }}
            >
              Add
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  )
}

export default Header
