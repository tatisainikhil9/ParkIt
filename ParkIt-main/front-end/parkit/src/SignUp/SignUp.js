import React, { Component } from 'react'
import SignUpService from './SignUpService'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import CircularProgress from '@mui/material/CircularProgress'

class SignUp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      message: '',
      otpSent: false,
      loading: false
    }
    this.signUpButtonClicked = this.signUpButtonClicked.bind(this)
    this.signInButtonClicked = this.signInButtonClicked.bind(this)
    this.submitButtonClicked = this.submitButtonClicked.bind(this)
  }

  render() {
    const theme = createTheme();
    if (this.state.otpSent) {
      return (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <div>
              <br />
              <Typography component="h1" variant="h5">
                Enter OTP sent to your mail id:
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="otp"
                label="OTP"
                name="otp"
              />
              <Button type="button" variant="contained" color="success" onClick={this.submitButtonClicked}>Submit</Button><br /><br />
              <Button type="button" variant="contained" onClick={this.signInButtonClicked}>Sign In</Button>
              <br />
              <br />
              <Typography component="h1" variant="h5">
                {this.state.message && <div>{this.state.message}</div>}
              </Typography>
            </div>
          </Container>
        </ThemeProvider >
      )
    }

    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="SignUp">
            <Box
              sx={{
                marginTop: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar src="/broken-image.jpg" />
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="fname"
                      label="First Name"
                      name="fname"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="lname"
                      label="Last Name"
                      name="lname"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="uname"
                      label="Username"
                      name="uname"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="password"
                      label="Password"
                      name="password"
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="confirm-password"
                      label="Confirm Password"
                      name="confirm-password"
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="address"
                      label="Address"
                      name="address"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="phone"
                      label="Phone Number"
                      name="phone"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required="true"
                      fullWidth
                      id="car-number"
                      label="Car Number"
                      name="car-number"
                    />
                  </Grid>
                </Grid>
                {!this.state.loading && <div>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }} onClick={this.signUpButtonClicked}>
                  Sign Up
                </Button><span> </span>            
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/signin" variant="body2" onClick={this.signInButtonClicked}>
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
                </div>}
                {this.state.message && <div>{this.state.message}</div>}
                {this.state.loading && <Box sx={{ display: 'flex',  justifyContent: 'center', padding:'20px'}}><CircularProgress /></Box>}
                <br /><br /><br /><br />
              </Box>
            </Box>
          </div>
        </Container>
      </ThemeProvider>
    );
  }

  signUpButtonClicked() {

    let firstName = document.getElementById('fname').value;
    let lastName = document.getElementById('lname').value;
    let username = document.getElementById('uname').value;
    let password = document.getElementById('password').value;
    let address = document.getElementById('address').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let carNumber = document.getElementById('car-number').value;

    if (username === '') {
      this.setState({ message: 'Username can not be empty'})
    }

    else if (password === '') {
      this.setState({ message: 'Password can not be empty'})
    }

    else if (phone === '') {
      this.setState({ message: 'Phone number can not be empty'})
    }

    else if (address === '') {
      this.setState({ message: 'Address can not be empty'})
    }

    else if (username.indexOf(' ') >= 0) {
      this.setState({ message: 'Username should not contain spaces'})
    }

    else if (password.indexOf(' ') >= 0) {
      this.setState({ message: 'Password should not contain spaces'})
    }
    
    else if (email.indexOf(' ') >= 0) {
      this.setState({ message: 'Invalid Email'})
    }

    else if (!(email.indexOf('@') >= 0)) {
      this.setState({ message: 'Invalid Email'})
    }

    else if (!(email.indexOf('.') >= 0)) {
      this.setState({ message: 'Invalid Email'})
    }

    else if (phone.indexOf(' ') >= 0) {
      this.setState({ message: 'Invalid Phone Number'})
    }

    else {
      this.setState( {loading: true} )
    if (document.getElementById('password').value !== document.getElementById('confirm-password').value) {
      this.setState({ message: 'Passwords do not match' })
    }
    else {
      SignUpService.executeSignUpService(firstName, lastName, username, password, address, email, phone, carNumber)
        .then(
          response => {
            if (response.data === 'Username exists') {
              this.setState({ message: 'Username already exists' })
            }
            else if (response.data === 'Email exists') {
              this.setState({ message: 'Email ID already registered' })
            }
            else if (response.data === 'Phone exists') {
              this.setState({ message: 'Phone number already registered' })
            }
            else if (response.data === 'Otp sent') {
              this.setState({ otpSent: true })
            }
            else {
              this.setState({ message: 'Failed' })
            }
          }
        )
    }
    }
  }

  signInButtonClicked() {
    this.props.history.push('/signin')
  }

  submitButtonClicked() {
    let otp = document.getElementById("otp").value
    SignUpService.executeAddUserService(otp)
      .then(
        response => {
          if (response.data === 'User saved') {
            this.setState({ message: 'Registration Successful, click Sign In button to sign in' })
          }
          else if (response.data === 'Invalid OTP') {
            this.setState({ message: 'Invalid OTP' })
          }
          else {
            this.setState({ message: 'Failed' })
          }
        }
      )
  }
}

export default SignUp;