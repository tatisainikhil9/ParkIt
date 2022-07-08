import React, { Component } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Parkimg from '../images/park2.jpeg'

const styles = {
    paperContainer: {
        maxHeight: '100vh',
        backgroundImage: `url(${Parkimg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }
};

class LandingPage extends Component {

    constructor(props) {
        super(props)
        if (localStorage.getItem('role') !== "user") {
            this.props.history.push('/signin')
        }

        this.state = {
        }

        this.bookingsButtonClicked = this.bookingsButtonClicked.bind(this)
        this.searchButtonClicked = this.searchButtonClicked.bind(this)
        this.signOutButtonClicked = this.signOutButtonClicked.bind(this)
    }

    render() {
        const theme = createTheme({
            typography: {
                "fontFamily": '"Readex Pro", sans-serif',
                "fontWeightRegular": 300, "color": "white"
            }
        });
        return (
            <ThemeProvider theme={theme}>
                <Paper style={styles.paperContainer}>
                        <Typography component="h1" variant="h3" color="#ffffff" >
                            Welcome To Parkit
                        </Typography>
                    <div style={{ padding: '2rem',display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                        <br />
                        <span>
                            <Button variant="contained" onClick={this.bookingsButtonClicked}>My bookings</Button><span> </span>
                            <Button variant="contained" onClick={this.searchButtonClicked}>Book slots</Button><span> </span>
                            <br/><br/>
                            <Button variant="contained" onClick={this.signOutButtonClicked}>Sign Out</Button>
                        </span>
                    </div>
                </Paper>
            </ThemeProvider>
        );
    }
    bookingsButtonClicked() {
        this.props.history.push('/bookings')
    }
    searchButtonClicked() {
        this.props.history.push('/search-slots')
    }
    signOutButtonClicked() {
        localStorage.clear()
        this.props.history.push('/signin')
    }
}
export default LandingPage