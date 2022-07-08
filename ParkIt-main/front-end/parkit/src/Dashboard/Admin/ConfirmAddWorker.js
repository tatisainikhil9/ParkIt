import React, { Component } from 'react'
import AddWorkerService from './ConfirmAddWorkerService'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'


class AddWorker extends Component {
    constructor(props) {
        super(props)
        try {
            if (this.props.location.state.inputData) { }
        }

        catch (e) {
            this.props.history.push('/admin-dashboard')
            window.location.reload()
        }

        if (localStorage.getItem('username') !== 'admin') {
            return (
                <div>
                    <Typography component="h1" variant="h5">
                        You do not have access to this page
                    </Typography>
                    <Button type="button" variant="contained" onClick={this.signInButtonClicked}>Back to Sign</Button>
                </div>
            )
        }
        this.state = {
            message: '',
            buttonText: 'Cancel'
        }

        this.addButtonClicked = this.addButtonClicked.bind(this)
        this.signOutButtonClicked = this.signOutButtonClicked.bind(this)
        this.cancelButtonClicked = this.cancelButtonClicked.bind(this)
    }

    render() {
        try {
            if (this.props.location.state.inputData) { }
        }

        catch (e) {
            this.props.history.push('/admin-dashboard')
            window.location.reload()
        }
        const theme = createTheme();
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <div>
                        <br />
                        <Typography component="h1" variant="h5">
                            Add a parking space
                        </Typography>
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
                            <Button variant="contained" color="success" onClick={this.addButtonClicked}>Add</Button><span> </span>
                            {this.state.message && <div>{this.state.message}</div>}
                            <span>
                                <Button variant="contained" onClick={this.cancelButtonClicked}>{this.state.buttonText}</Button><br /><br />
                                <Button variant="contained" onClick={this.signOutButtonClicked}>Sign Out</Button>
                            </span>
                        </Box>
                    </div >
                </Container>
            </ThemeProvider>
        )
    }
    addButtonClicked() {
        let location = document.getElementById("location").value
        let address = document.getElementById("address").value
        let workerUsername = document.getElementById("workerUsername").value
        let workerPassword = document.getElementById("workerPassword").value
        AddWorkerService.executeAddWorkerService(location, address, workerUsername, workerPassword)
            .then(
                response => {
                    if (response.data === 'Success') {
                        this.setState({ message: 'Added Worker successfully' });
                        this.setState({ buttonText: 'Back to dashboard' })
                        document.getElementById("location").value = ''
                        document.getElementById("address").value = ''
                        document.getElementById("workerUsername").value = ''
                        document.getElementById("workerPassword").value = ''
                    }
                    if (response.data === 'Username exists') {
                        this.setState({ message: 'Username already exists' })
                    }
                }
            )
    }

    signOutButtonClicked() {
        localStorage.clear()
        this.props.history.push('/signin')
    }

    cancelButtonClicked() {
        this.props.history.push('/add-worker')
    }
}
export default AddWorker