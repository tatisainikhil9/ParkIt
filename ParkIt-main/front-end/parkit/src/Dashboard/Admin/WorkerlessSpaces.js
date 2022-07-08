import React, { Component } from 'react'
import WorkerlessSpacesService from './WorkerlessSpacesService'
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

class WorkerlessSpace extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }

        this.addButtonClicked = this.addButtonClicked.bind(this)
        this.signInButtonClicked = this.signInButtonClicked.bind(this)
        this.signOutButtonClicked = this.signOutButtonClicked.bind(this)
        this.backButtonClicked = this.backButtonClicked.bind(this)
    }

    componentDidMount() {
        WorkerlessSpacesService.executeGetWorkerlessSpacesService()
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
                <div>
                    <Typography component="h1" variant="h5">
                        Parking Spaces without a worker
                    </Typography>
                    <br />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Location</StyledTableCell>
                                    <StyledTableCell>Address</StyledTableCell>
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
                                                <StyledTableCell><Button variant="contained" color="success" onClick={() => this.addButtonClicked(data.id)}>Add Worker</Button></StyledTableCell>
                                            </StyledTableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <br />
                <Button variant="contained" onClick={this.backButtonClicked}>Back to Dashboard</Button><span> </span>
                <Button variant="contained" onClick={this.signOutButtonClicked}>Sign Out</Button>

            </div>
        );
    }

    addButtonClicked(id) {
        this.state.data.forEach((item) => {
            if (item.id === id) {
                this.props.history.push({
                    pathname: './confirm-add-worker',
                    state: { inputData: item }
                })
            }
        })
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

export default WorkerlessSpace