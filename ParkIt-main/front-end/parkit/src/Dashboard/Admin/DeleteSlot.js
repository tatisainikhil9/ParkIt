import React, { Component } from 'react'
import DeleteSlotService from './DeleteSlotService'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'

class DeleteSlot extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            data: []
        }
        this.deleteButtonClicked = this.deleteButtonClicked.bind(this)
        this.signOutButtonClicked = this.signOutButtonClicked.bind(this)
        this.backButtonClicked = this.backButtonClicked.bind(this)
        this.signInButtonClicked = this.signInButtonClicked.bind(this)

    }
    componentDidMount() {
        DeleteSlotService.executeGetSlotsService()
            .then(
                response => {
                    this.setState({ data: response.data })
                }
            )
    }
    render() {
        if (localStorage.getItem('username') !== 'admin') {
            return (
                <div>
                    <h3>You do not have access to this page</h3>
                    <button type="button" onClick={this.signInButtonClicked}>Back to Sign</button>
                </div>
            )
        }
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
            <div style={{ padding: "2rem" }}>
                <Typography component="h1" variant="h5">
                    Delete Slot
                </Typography>
                <br />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Location</StyledTableCell>
                                <StyledTableCell>Address</StyledTableCell>
                                <StyledTableCell>Date</StyledTableCell>
                                <StyledTableCell>Start Time</StyledTableCell>
                                <StyledTableCell>End Time</StyledTableCell>
                                <StyledTableCell>Username</StyledTableCell>
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
                                            <StyledTableCell>{data.username}</StyledTableCell>
                                            <StyledTableCell><Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => this.deleteButtonClicked(data.id)}>Delete</Button></StyledTableCell>
                                        </StyledTableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <br />
                {this.state.message && <div>{this.state.message}</div>}
                <span>
                    <Button variant="contained" onClick={this.backButtonClicked}>Back to Dashboard</Button><span> </span>
                    <Button variant="contained" onClick={this.signOutButtonClicked}>Sign Out</Button>
                </span>
            </div>
        )
    }
    deleteButtonClicked(id) {
        let location
        let address
        let date
        let startTime
        let endTime
        let username
        for (var i = 0; i < this.state.data.length; i++) {
            let item = this.state.data[i]
            if (item.id === id) {
                location = item.location
                address = item.address
                date = item.date
                startTime = item.startTime
                endTime = item.endTime
                username = item.username
                break
            }
        }
        DeleteSlotService.executeDeleteSlotService(location, address, date, startTime, endTime, username)
            .then(
                response => {
                    if (response.data === 'Success') {
                        window.location.reload();
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
export default DeleteSlot