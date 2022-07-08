import React, { Component } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Paper from '@mui/material/Paper'
import Parkimg from '../../images/park.jpeg'

const styles = {
    paperContainer: {
        minHeight: '100vh',
        backgroundImage: `url(${Parkimg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }
};

class AdminLandingPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            data: []
        }
        this.deleteSlotButtonClicked = this.deleteSlotButtonClicked.bind(this)
        this.addSlotButtonClicked = this.addSlotButtonClicked.bind(this)
        this.signInButtonClicked = this.signInButtonClicked.bind(this)
        this.addWorkerButtonClicked = this.addWorkerButtonClicked.bind(this)
        this.removeWorkerButtonClicked = this.removeWorkerButtonClicked.bind(this)
        this.userListButtonClicked = this.userListButtonClicked.bind(this)
        this.removeSpaceButtonClicked = this.removeSpaceButtonClicked.bind(this)
        this.signOutButtonClicked = this.signOutButtonClicked.bind(this)
    }
    render() {
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
        const theme = createTheme({
            typography: {
                "fontFamily": '"Readex Pro", sans-serif',
                "fontWeightRegular": 300
            }
        });
        return (
            <ThemeProvider theme={theme}>
                <Paper style={styles.paperContainer}>
                    <CssBaseline />
                    <div>
                        <br />
                        <Typography component="h1" variant="h4">
                            Dashboard
                        </Typography>
                        <br />
                        <span>
                            <Button type="button" variant="contained" onClick={this.deleteSlotButtonClicked}>View Booked Slots</Button><span> </span>
                            <Button type="button" variant="contained" onClick={this.addSlotButtonClicked}>Add Parking Space</Button><span> </span>
                            <Button type="button" variant="contained" onClick={this.removeSpaceButtonClicked}>Remove Parking Space</Button><span> </span>
                            <Button type="button" variant="contained" onClick={this.removeWorkerButtonClicked}>Worker List</Button><span> </span>
                            <Button type="button" variant="contained" onClick={this.addWorkerButtonClicked}>Add Worker</Button><span> </span>
                            <Button type="button" variant="contained" onClick={this.userListButtonClicked}>User List</Button><br /><br />
                            <Button type="button" variant="contained" onClick={this.signOutButtonClicked}>Sign Out</Button>
                        </span>
                    </div>
                </Paper>
            </ThemeProvider>
        )
    }
    deleteSlotButtonClicked() {
        this.props.history.push('/delete-slot')
    }
    addSlotButtonClicked() {
        this.props.history.push('/add-space')
    }
    signInButtonClicked() {
        this.props.history.push('/signin')
    }
    addWorkerButtonClicked() {
        this.props.history.push('/add-worker')
    }
    removeWorkerButtonClicked() {
        this.props.history.push('/view-workers')
    }
    userListButtonClicked() {
        this.props.history.push('/user-list')
    }
    removeSpaceButtonClicked() {
        this.props.history.push('/remove-space')
    }
    signOutButtonClicked() {
        localStorage.clear()
        this.props.history.push('/signin')
    }
}

export default AdminLandingPage