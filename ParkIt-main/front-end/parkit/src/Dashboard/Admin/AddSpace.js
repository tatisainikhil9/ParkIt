import React, { Component } from 'react'
import AddSpaceService from './AddSpaceService'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Container from '@mui/material/Container'

class AddSpace extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }

        this.submitButtonClicked = this.submitButtonClicked.bind(this)
        this.signInButtonClicked = this.signInButtonClicked.bind(this)
        this.signOutButtonClicked = this.signOutButtonClicked.bind(this)
        this.backButtonClicked = this.backButtonClicked.bind(this)

    }

    render() {
        if (localStorage.getItem('role') !== "admin") {
            return (
                <div>
                    <h3>You do not have access to this page</h3>
                    <button type="button" onClick={this.signInButtonClicked}>Back to Signin</button>
                </div>
            )
        }
        const theme = createTheme();
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div>
                        <Box sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: '2rem'
                        }}>
                            <br />
                            <Typography component="h1" variant="h5">
                                Add a parking space
                            </Typography>
                            <br />
                            <Box component="form" noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="location"
                                    label="Location"
                                    name="location"
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="address"
                                    label="Address"
                                    id="address"
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="workerUsername"
                                    label="Worker username"
                                    id="workerUsername"
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="workerPassword"
                                    label="Worker password"
                                    id="workerPassword"
                                    type="password"
                                />
                                
                                <Button variant="contained" color="success" onClick={this.submitButtonClicked}>Submit</Button><br /><br />
                                {this.state.message && <div>{this.state.message}</div>}
                                <span>
                                    <Button variant="contained" onClick={this.backButtonClicked}>Back to Dashboard</Button><span> </span>
                                    <Button variant="contained" onClick={this.signOutButtonClicked}>Sign Out</Button>
                                </span>
                            </Box>
                        </Box>
                    </div >
                </Container>
            </ThemeProvider>
        )
    }
    submitButtonClicked() {
        let location = document.getElementById("location").value
        let address = document.getElementById("address").value
        let workerUsername = document.getElementById("workerUsername").value
        let workerPassword = document.getElementById("workerPassword").value
        AddSpaceService.executeAddSpaceService(location, address, workerUsername, workerPassword)
            .then(
                response => {
                    if (response.data === 'Username exists') {
                        this.setState({ message: 'Username already exists' })
                    }
                    else if (response.data === 'Success') {
                        this.setState({ message: 'Added space successfully' });
                    }
                    else if (response.data === 'Space exists') {
                        this.setState({ message: 'Space already exists' });
                    }
                }
            )
    }

    signOutButtonClicked() {
        localStorage.clear()
        this.props.history.push('/signin')
    }

    signInButtonClicked() {
        this.props.history.push('/signin')
    }

    backButtonClicked() {
        this.props.history.push('/admin-dashboard')
    }

}
export default AddSpace