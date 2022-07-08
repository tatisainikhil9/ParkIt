import React, { Component } from 'react'
import SignInService from './SignInService.js'
import Avatar from '@mui/material/Avatar'
import LocalParkingIcon from '@mui/icons-material/LocalParking'
import Button from '@mui/material/Button'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

class SignIn extends Component {

  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }

    this.signInButtonClicked = this.signInButtonClicked.bind(this)
    this.signUpButtonClicked = this.signUpButtonClicked.bind(this)
  }

  render() {
    const theme = createTheme({
      typography: {"fontFamily": '"Readex Pro", sans-serif',
      "fontWeightRegular": 300
    }
    });
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="SignIn">
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LocalParkingIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Username"
                  name="email"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
                {/* <br/><br/><br/><br/><br/>
      <label htmlFor="uname">Username: </label>
      <input type="text" id="uname" name="uname" />
      <br />
      <br />
      <label htmlFor="password">Password: </label>
      <input type="password" id="password" name="password" />
      <br />
      <br /> */}
                <Button size="medium"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }} onClick={this.signInButtonClicked}>
                  Sign In
                </Button>
                <span> </span>
                <Button  size="medium"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }} onClick={this.signUpButtonClicked}>
                  Sign Up
                </Button>
                {this.state.message && <div>{this.state.message}</div>}
              </Box>
            </Box>
          </div>
        </Container>
      </ThemeProvider>
    );
  }

  signInButtonClicked() {
    let username = document.getElementById('email').value
    let password = document.getElementById('password').value
    SignInService.executeLogInService(username, password)
      .then(
        response => {
          if (response.data === 'Invalid credentials') {
            this.setState({ message: 'Invalid credentials' });
          } else {
            localStorage.setItem('username', username)
            if (localStorage.getItem('username') === 'admin') {
              localStorage.setItem('role', 'admin')
              this.props.history.push('/admin-dashboard')
            }
            else if (response.data === 'Worker logged in') {
              localStorage.setItem('role', 'worker')
              this.props.history.push('/worker-dashboard')
            }
            else {
              localStorage.setItem('role', 'user')
              this.props.history.push('/dashboard')
            }
          }
        }
      )
  }

  signUpButtonClicked() {
    this.props.history.push('/signup')
  }
}

export default SignIn;
