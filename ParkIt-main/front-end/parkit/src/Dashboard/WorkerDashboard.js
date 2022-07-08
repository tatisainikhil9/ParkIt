import React, { Component } from 'react'
import WorkerDashboardService from './WorkerDashboardService'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'

class WorkerDashboard extends Component {

    constructor(props) {
        super(props)
        if (localStorage.getItem('role') !== "worker") {
            console.log(localStorage.getItem('role'));
            this.props.history.push('/signin')
        }
        this.state = {
            message: '',
            data: []
        }
        this.signOutButtonClicked = this.signOutButtonClicked.bind(this)
    }
    componentDidMount() {
        WorkerDashboardService.executeGetBookingsService(localStorage.getItem('username'))
            .then(
                response => {
                    this.setState({ data: response.data })
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
            // hide last border
            '&:last-child td, &:last-child th': {
                border: 0,
            },
        }));
        return (
            <div style={{padding: "2rem"}}>
                <Typography component="h1" variant="h5">
                    Bookings
                </Typography>
                <br />
                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Username </StyledTableCell>
                                    <StyledTableCell>Location </StyledTableCell>
                                    <StyledTableCell>Address </StyledTableCell>
                                    <StyledTableCell>Date </StyledTableCell>
                                    <StyledTableCell>Start Time </StyledTableCell>
                                    <StyledTableCell>End Time </StyledTableCell>
                                    <StyledTableCell>Dry Cleaning </StyledTableCell>
                                    <StyledTableCell>Car Wash </StyledTableCell>
                                    <StyledTableCell>Air Filling </StyledTableCell>
                                    <StyledTableCell>Tyre Repair </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.data.map(
                                        data =>
                                            <StyledTableRow key={data.id}>
                                                <StyledTableCell>{data.username}</StyledTableCell>
                                                <StyledTableCell>{data.location}</StyledTableCell>
                                                <StyledTableCell>{data.address}</StyledTableCell>
                                                <StyledTableCell>{data.date}</StyledTableCell>
                                                <StyledTableCell>{data.startTime}</StyledTableCell>
                                                <StyledTableCell>{data.endTime}</StyledTableCell>
                                                <StyledTableCell>{data.dryCleaning}</StyledTableCell>
                                                <StyledTableCell>{data.carWash}</StyledTableCell>
                                                <StyledTableCell>{data.airFilling}</StyledTableCell>
                                                <StyledTableCell>{data.tyreRepair}</StyledTableCell>
                                            </StyledTableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <br/>
                <Button variant="contained" onClick={this.signOutButtonClicked}>Sign Out</Button>
            </div >
        )
    }
    signOutButtonClicked() {
        localStorage.clear()
        this.props.history.push('/signin')
    }
}
export default WorkerDashboard