import React, { Component } from 'react'
import RemoveUserService from './UserService'
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

class UsersList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message: '',
            data: []
        }

        this.dashboardButtonClicked = this.dashboardButtonClicked.bind(this)
        this.signOutButtonClicked = this.signOutButtonClicked.bind(this)
        this.signInButtonClicked = this.signInButtonClicked.bind(this)

    }
    componentDidMount() {
        RemoveUserService.executeGetUsersService()
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
                    Users List
                </Typography>
                <br />
                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Username</StyledTableCell>
                                    <StyledTableCell>First Name</StyledTableCell>
                                    <StyledTableCell>Last Name</StyledTableCell>
                                    <StyledTableCell>Address</StyledTableCell>
                                    <StyledTableCell>Email</StyledTableCell>
                                    <StyledTableCell>Phone No. </StyledTableCell>
                                    <StyledTableCell>Car Number </StyledTableCell>
                                    <StyledTableCell>Money </StyledTableCell>
                                    <StyledTableCell></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.data.map(
                                        data =>
                                            <StyledTableRow key={data.id}>
                                                <StyledTableCell>{data.username}</StyledTableCell>
                                                <StyledTableCell>{data.firstName}</StyledTableCell>
                                                <StyledTableCell>{data.lastName}</StyledTableCell>
                                                <StyledTableCell>{data.address}</StyledTableCell>
                                                <StyledTableCell>{data.email}</StyledTableCell>
                                                <StyledTableCell>{data.phone}</StyledTableCell>
                                                <StyledTableCell>{data.carNumber}</StyledTableCell>
                                                <StyledTableCell>{data.money}</StyledTableCell>
                                                <StyledTableCell><Button variant="outlined" color="error" onClick={() => this.removeButtonClicked(data.id)}>Remove</Button></StyledTableCell>
                                            </StyledTableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <br/>
                <Button variant="contained" onClick={this.dashboardButtonClicked}>Back to Dashboard</Button><span> </span>
                <Button variant="contained" onClick={this.signOutButtonClicked}>Sign Out</Button>
            </div>
        )
    }

    removeButtonClicked(id) {
        let username
        this.state.data.forEach((item) => {
            if (item.id === id) {
                username = item.username
            }
        })
        RemoveUserService.executeRemoveUserService(username)
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

    dashboardButtonClicked() {
        this.props.history.push('/admin-dashboard')
    }

    signInButtonClicked() {
        this.props.history.push('/signin')
    }

}
export default UsersList