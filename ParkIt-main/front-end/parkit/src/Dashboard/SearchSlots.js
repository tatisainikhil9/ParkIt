import React, { Component } from 'react'
import SearchSlotsService from './SearchSlotsService'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

class SearchSlots extends Component {
    constructor(props) {
        super(props)

        if (localStorage.getItem('role') !== "user") {
            this.props.history.push('/signin')
        }

        this.state = {
            data: [],
            showSlotsClicked: false,
            availableSlots: false,
            unavailableSlots: false,
            unavailableSlotsData: [],
            date: '',
            locations: [],
            selectedLocation: 'Select Location',
            message: ''
        }

        this.dashboardButtonClicked = this.dashboardButtonClicked.bind(this)
        this.showSlotsButtonClicked = this.showSlotsButtonClicked.bind(this)
        this.bookButtonClicked = this.bookButtonClicked.bind(this)
        this.signOutButtonClicked = this.signOutButtonClicked.bind(this)
        this.locationClickedHandler = this.locationClickedHandler.bind(this)
    }
    componentDidMount(){
        SearchSlotsService.executeGetLocations()
            .then(
                response => {
                    let locations = response.data
                    locations.push('Select Location')
                    this.setState({ locations: locations });
                }
            )
    }
    render() {
        const StyledTableCell = styled(TableCell)(({ theme }) => ({
            [`&.${tableCellClasses.head}`]: {
                backgroundColor: theme.palette.common.black,
                color: theme.palette.common.white,
            },
            [`&.${tableCellClasses.body}`]: {
                fontSize: 14,
            },
        }));

        const StyledTableRow = styled(TableRow)(({ theme }) => ({
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
            '&:last-child td, &:last-child th': {
                border: 0,
            },
        }));
        return (
            <div>
                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Enter Slot Parameters
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <Select 
                            id="location"
                            defaultValue={this.state.selectedLocation}
                        >
                            {
                                this.state.locations.map(
                                    item =>
                                    <MenuItem onClick={() => this.locationClickedHandler(item)} key={item} value={item}>{item}</MenuItem>
                                )
                            }
                        </Select >
                            <br />
                            <TextField
                                margin="normal"
                                required
                                type="date"
                                id="date"
                                name="date"
                            /><br />
                            <div>Start Time</div>
                            <TextField
                                margin="normal"
                                required
                                type="time"
                                id="start-time"
                                name="start-time"
                            /><br />
                            <div>End Time</div>
                            <TextField
                                margin="normal"
                                required
                                type="time"
                                id="end-time"
                                name="end-time"
                            />
                            <br /><br />

                            <Button variant="contained" onClick={this.showSlotsButtonClicked}>Show Available Slots</Button>
                            <br /><br />
                            {
                                this.state.showSlotsClicked &&
                                <div>
                                    <br />
                                    <Typography component="h1" variant="h5">
                                        Available Spaces
                                    </Typography>
                                    <br />
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell>Location</StyledTableCell>
                                                    <StyledTableCell>Address</StyledTableCell>
                                                    <StyledTableCell>Date</StyledTableCell>
                                                    <StyledTableCell>Start-Time</StyledTableCell>
                                                    <StyledTableCell>End-Time</StyledTableCell>
                                                    <StyledTableCell>Worker Name</StyledTableCell>
                                                    <StyledTableCell>Rating</StyledTableCell>
                                                    <StyledTableCell>Amenities</StyledTableCell>
                                                    <StyledTableCell>Total Cost</StyledTableCell>
                                                    <StyledTableCell></StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    this.state.data.map(
                                                        data =>
                                                            <StyledTableRow key={data.id}>
                                                                <StyledTableCell>{data.location}</StyledTableCell>
                                                                <StyledTableCell>{data.address}</StyledTableCell>
                                                                <StyledTableCell>{data.date}</StyledTableCell>
                                                                <StyledTableCell>{data.startTime}</StyledTableCell>
                                                                <StyledTableCell>{data.endTime}</StyledTableCell>
                                                                <StyledTableCell>{(data.worker == null) ? "-" : data.worker}</StyledTableCell>
                                                                <StyledTableCell>{(data.worker == null) ? "-" : (data.rating == null) ? '-' : data.rating}</StyledTableCell>
                                                                <StyledTableCell>{(data.worker == null) ? "-" : "Dry Cleaning, Car Wash, Air Filling, Tyre Repair"}</StyledTableCell>
                                                                <StyledTableCell>{data.cost}</StyledTableCell>
                                                                <StyledTableCell><Button variant="contained" color="success" onClick={() => this.bookButtonClicked(data.id)}>Book</Button></StyledTableCell>
                                                            </StyledTableRow>
                                                    )
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            }

                            {
                                this.state.unavailableSlots &&
                                <div>
                                    <br />
                                    <Typography component="h1" variant="h5">
                                        Unavailable Spaces
                                    </Typography>
                                    <br />
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell>Location</StyledTableCell>
                                                    <StyledTableCell>Address</StyledTableCell>
                                                    <StyledTableCell>Date</StyledTableCell>
                                                    <StyledTableCell>Avaialble From</StyledTableCell>
                                                    <StyledTableCell>Worker Name</StyledTableCell>
                                                    <StyledTableCell>Rating</StyledTableCell>
                                                    <StyledTableCell>Amenities</StyledTableCell>
                                                    <StyledTableCell>Total Cost</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    this.state.unavailableSlotsData.map(
                                                        data =>
                                                            <StyledTableRow key={data.id}>
                                                                <StyledTableCell>{data.location}</StyledTableCell>
                                                                <StyledTableCell>{data.address}</StyledTableCell>
                                                                <StyledTableCell>{data.date}</StyledTableCell>
                                                                <StyledTableCell>{data.availableFrom}</StyledTableCell>
                                                                <StyledTableCell>{(data.worker == null) ? "-" : data.worker}</StyledTableCell>
                                                                <StyledTableCell>{(data.worker == null) ? "-" : (data.rating == null) ? '-' : data.rating}</StyledTableCell>
                                                                <StyledTableCell>{(data.worker == null) ? "-" : "Dry Cleaning, Car Wash, Air Filling, Tyre Repair"}</StyledTableCell>
                                                                <StyledTableCell>{data.cost}</StyledTableCell>
                                                            </StyledTableRow>
                                                    )
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            }
                            {this.state.message && <div>{this.state.message}</div>}
                            <br/>
                            <span>
                                <Button variant="contained" onClick={this.dashboardButtonClicked}>Back to Dashboard</Button><span> </span>
                                <Button variant="contained" onClick={this.signOutButtonClicked}>Sign Out</Button>
                            </span>
                    </Box>
                </Box>
            </div >
        );
    }
    dashboardButtonClicked() {
        this.props.history.push('/dashboard')
    }

    showSlotsButtonClicked() {
        if (this.state.selectedLocation === 'Select Location') {
            this.setState({ message: 'Please select a valid location' }) 
        }
        else {
            this.setState({ 
                unavailableSlotsData: [],
                unavailableSlots: false
            })
            let location = this.state.selectedLocation;
            let date = document.getElementById('date').value;
            let startTime = document.getElementById('start-time').value;
            let endTime = document.getElementById('end-time').value;
            this.setState({
                showSlotsClicked: true
            })
            SearchSlotsService.executeSearchSlotsService(location, date, startTime, endTime)
                .then(
                    response => {
                        this.setState({ data: response.data })
                    }
                )
            SearchSlotsService.executeSearchUnavailableSlotsService(location, date, startTime, endTime)
                .then(
                    response => {
                        if (response.data.length > 0)
                            this.setState(
                                {
                                    unavailableSlotsData: response.data,
                                    unavailableSlots: true
                                }
                            )
                    }
                )
        }
    }

    bookButtonClicked(id) {
        this.state.data.forEach((item) => {
            if (item.id === id) {
                this.props.history.push({
                    pathname: './confirm-booking',
                    state: { inputData: item }
                })
            }
        })
    }
    locationClickedHandler(location) {
        // document.getElementById('location').value = location
        // console.log(location);
        this.setState({ selectedLocation: location })
    }

    signOutButtonClicked() {
        localStorage.clear()
        this.props.history.push('/signin')
    }
}

export default SearchSlots