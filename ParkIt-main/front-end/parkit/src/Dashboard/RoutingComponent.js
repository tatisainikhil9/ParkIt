import React, { Component } from 'react'

class RoutingComponent extends Component {

    componentDidMount() {
        if (!localStorage.getItem('role')) {
            this.props.history.push('/signin')
        }
        else if (localStorage.getItem('role') === 'user') {
            this.props.history.push('/dashboard')
        }
        else if (localStorage.getItem('role') === 'admin') {
            this.props.history.push('/admin-dashboard')
        }
        else if (localStorage.getItem('role') === 'worker') {
            this.props.history.push('/worker-dashboard')
        }
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default RoutingComponent