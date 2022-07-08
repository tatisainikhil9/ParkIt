import React, { Component } from 'react'
import ConfirmBookingService from './ConfirmBookingService'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

class ConfirmBooking extends Component {
    constructor(props) {

        super(props)

        try {
            if (this.props.location.state.inputData) { }
        }

        catch (e) {
            this.props.history.push('/dashboard')
            window.location.reload()
        }
        if (localStorage.getItem('role') !== "user") {
            this.props.history.push('/signin')
        }

        this.state = {
            message: '',
            dryCleaning: 'No',
            carWash: 'No',
            airFilling: 'No',
            tyreRepair: 'No',
            cost: parseInt(this.props.location.state.inputData.cost, 10),
            done: false,
            loading: false
        }

        this.onValueChange = this.onValueChange.bind(this)
        this.confirmButtonClicked = this.confirmButtonClicked.bind(this)
        this.cancelButtonClicked = this.cancelButtonClicked.bind(this)
        this.signOutButtonClicked = this.signOutButtonClicked.bind(this)
        this.dryCleaningHandler = this.dryCleaningHandler.bind(this)
        this.carWashHandler = this.carWashHandler.bind(this)
        this.airFillingHandler = this.airFillingHandler.bind(this)
        this.tyreRepairHandler = this.tyreRepairHandler.bind(this)
        this.backButtonClicked = this.backButtonClicked.bind(this)

    }

    render() {

        if (!this.state.done) {
            return (
                <div>
                    <br/>
                    <Typography component="h1" variant="h5">
                        Confirm Booking
                    </Typography>
                    <br/>
                    <TextField
                        margin="normal"
                        required
                        type="text"
                        id="location"
                        label="Location"
                        value={this.props.location.state.inputData.location}
                        name="location"
                    /><br />
                    <TextField
                        margin="normal"
                        required
                        type="text"
                        id="address"
                        label="address"
                        value={this.props.location.state.inputData.address}
                        name="address"
                    /><br />
                    <TextField
                        margin="normal"
                        required
                        type="text"
                        id="date"
                        label="date"
                        value={this.props.location.state.inputData.date}
                        name="date"
                    /><br />
                    <TextField
                        margin="normal"
                        required
                        type="text"
                        id="startTime"
                        label="startTime"
                        value={this.props.location.state.inputData.startTime}
                        name="startTime"
                    /><br />
                    <TextField
                        margin="normal"
                        required
                        type="text"
                        id="endTime"
                        label="endTime"
                        value={this.props.location.state.inputData.endTime}
                        name="endTime"
                    /><br />
                    {
                        this.props.location.state.inputData.worker &&
                        <div>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Choose Serivces</FormLabel>
                                <FormControlLabel
                                    value="dry-cleaning"
                                    id="dry-cleaning"
                                    control={<Radio />}
                                    label="Dry Cleaning"
                                    labelPlacement="start"
                                    onClick={this.dryCleaningHandler} 
                                    checked={(this.state.dryCleaning === 'No') ? false : true}
                                /><br />
                                <FormControlLabel
                                    value="car-wash"
                                    id="car-wash"
                                    control={<Radio />}
                                    label="Car Wash"
                                    labelPlacement="start"
                                    onClick={this.carWashHandler} 
                                    checked={(this.state.carWash === 'No') ? false : true}
                                /><br />
                                <FormControlLabel
                                    value="air-filling"
                                    id="air-filling"
                                    control={<Radio />}
                                    label="Air Filling"
                                    labelPlacement="start"
                                    onClick={this.airFillingHandler} 
                                    checked={(this.state.airFilling === 'No') ? false : true}
                                /><br />
                                <FormControlLabel
                                    value="tyre-repair"
                                    id="tyre-repair"
                                    control={<Radio />}
                                    label="Tyre Repair"
                                    labelPlacement="start"
                                    onClick={this.tyreRepairHandler} 
                                    checked={(this.state.tyreRepair === 'No') ? false : true}
                                />
                                </FormControl>
                        </div>
                    }

                    {this.state.cost && <h3>Total Cost: {this.state.cost}</h3>}
                    <span>
                    <Button variant="contained" color="success" onClick={this.confirmButtonClicked}>Confirm Booking</Button>
                    <span> </span>
                    <Button variant="contained" color="error" onClick={this.cancelButtonClicked}>Cancel Booking</Button>
                    </span>
                    {this.state.loading && <Box sx={{ display: 'flex',  justifyContent: 'center', padding:'20px'}}><CircularProgress /></Box>}
                    {!this.state.loading && <div><br/><br/></div>}
                    <Button variant="contained" onClick={this.signOutButtonClicked}>Sign Out</Button>
                    {this.state.message && <div>{this.state.message}</div>}
                </div>
            )
        }
        else {
            return (
                <div>
                    <br/>
                    <Typography component="h1" variant="h5">
                        {this.state.message && <div>{this.state.message}</div>}
                    </Typography>
                    <br/>
                    <Button variant="contained" onClick={this.backButtonClicked}>Back to Dashboard</Button><span> </span>
                    <Button variant="contained" onClick={this.signOutButtonClicked}>Sign Out</Button>
                </div>
            )
        }

    }

    dryCleaningHandler() {
        let temp = this.state.dryCleaning;
        let tempcost = this.state.cost;
        if (temp === 'No') {
            this.setState({
                dryCleaning: 'Yes',
                cost: tempcost + 100
            })
        }
        else {
            this.setState({
                dryCleaning: 'No',
                cost: tempcost - 100
            })
        }
    }

    carWashHandler() {
        let temp = this.state.carWash;
        let tempcost = this.state.cost;
        if (temp === 'No') {
            this.setState({
                carWash: 'Yes',
                cost: tempcost + 100

            })
        }
        else {
            this.setState({
                carWash: 'No',
                cost: tempcost - 100
            })
        }
    }

    airFillingHandler() {
        let temp = this.state.airFilling;
        let tempcost = this.state.cost;
        if (temp === 'No') {
            this.setState({
                airFilling: 'Yes',
                cost: tempcost + 100
            })
        }
        else {
            this.setState({
                airFilling: 'No',
                cost: tempcost - 100

            })
        }
    }

    tyreRepairHandler() {
        let temp = this.state.tyreRepair;
        let tempcost = this.state.cost;
        if (temp === 'No') {
            this.setState({
                tyreRepair: 'Yes',
                cost: tempcost + 100

            })
        }
        else {
            this.setState({
                tyreRepair: 'No',
                cost: tempcost - 100

            })
        }
    }

    confirmButtonClicked() {
        this.setState({ loading: true })
        let location = this.props.location.state.inputData.location
        let address = this.props.location.state.inputData.address
        let date = this.props.location.state.inputData.date
        let startTime = this.props.location.state.inputData.startTime
        let endTime = this.props.location.state.inputData.endTime
        let slotId = window.btoa((location + "_" + address + "_" + date + "_" + startTime.split(':')[0] + "_" + endTime.split(':')[0]).split(' ').join('.'))

        ConfirmBookingService.executeConfirmBookingService(
            location,
            address,
            date,
            startTime,
            endTime,
            localStorage.getItem('username'),
            this.state.dryCleaning,
            this.state.carWash,
            this.state.airFilling,
            this.state.tyreRepair,
            this.state.cost,
            slotId
        )
            .then(
                response => {
                    if (response.data === 'Success') {
                        this.setState(
                            {
                                message: 'Booking successfull!',
                                done: true
                            }
                        );
                    }
                    else if (response.data === 'Not enough money') {
                        this.setState(
                            {
                                message: 'Not enough money',
                                done: true
                            }
                        )
                    }
                }
            )
    }

    onValueChange() {
        let temp = this.state.cost
        if (this.state.dryCleaning === 'Yes') {
            temp += 100
        }
        if (this.state.carWash === 'Yes') {
            temp += 100
        }
        if (this.state.airFilling === 'Yes') {
            temp += 100
        }
        if (this.state.tyreRepair === 'Yes') {
            temp += 100
        }
        this.setState({
            cost: temp
        })
    }

    signOutButtonClicked() {
        localStorage.clear()
        this.props.history.push('/signin')
    }

    backButtonClicked() {
        this.props.history.push('/dashboard')
    }

    cancelButtonClicked() {
        this.props.history.push('/search-slots')
    }

}

export default ConfirmBooking