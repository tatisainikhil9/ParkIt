import React, { Component } from "react";
import WorkerService from "./WorkerService"
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

class viewWorker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }

        this.removeButtonClicked = this.removeButtonClicked.bind(this)
        this.dashboardButtonClicked = this.dashboardButtonClicked.bind(this)
        this.signOutButtonClicked = this.signOutButtonClicked.bind(this)
        this.signInButtonClicked = this.signInButtonClicked.bind(this)

    }
    componentDidMount() {
        WorkerService.executeGetWorkersService()
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
                    <button type="button" onClick={this.signInButtonClicked}>Back to Signin</button>
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
                    Workers List
                </Typography>
                <br />
                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Worker Name</StyledTableCell>
                                    <StyledTableCell>Location</StyledTableCell>
                                    <StyledTableCell>Address</StyledTableCell>
                                    <StyledTableCell>Rating</StyledTableCell>
                                    <StyledTableCell>Total Hours Worked</StyledTableCell>
                                    <StyledTableCell></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.data.map(
                                        data =>
                                            <StyledTableRow key={data.id}>
                                                <StyledTableCell>{data.worker}</StyledTableCell>
                                                <StyledTableCell>{data.location}</StyledTableCell>
                                                <StyledTableCell>{data.address}</StyledTableCell>
                                                <StyledTableCell>{(data.rating === null) ? 0 : data.rating}</StyledTableCell>
                                                <StyledTableCell>{(data.totalTime === null) ? 0 : data.totalTime}</StyledTableCell>
                                                <StyledTableCell><Button variant="outlined" color="error" onClick={() => this.removeButtonClicked(data.id)}>Remove</Button></StyledTableCell>
                                            </StyledTableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <br />
                <Button variant="contained" onClick={this.dashboardButtonClicked}>Back to Dashboard</Button><span> </span>
                <Button variant="contained" onClick={this.signOutButtonClicked}>Sign Out</Button>
            </div>
        )
    }
    removeButtonClicked(id) {
        let worker
        this.state.data.forEach((item) => {
            if (item.id === id) {
                worker = item.worker
            }
        })
        WorkerService.executeRemoveWorkerService(worker)
            .then(
                response => {
                    if (response.data === 'Success') {
                        window.location.reload()
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

    dashboardButtonClicked() {
        this.props.history.push('/admin-dashboard')
    }
}

export default viewWorker