import React, { Component } from 'react'
import RatingService from './RatingService'
import Button from '@mui/material/Button';

class Rating extends Component {

    constructor(props) {
        super(props)

        this.state = {
            message: '',
            url: /[^/]*$/.exec(window.location.href)[0],
            location: '',
            address: '',
            date: '',
            startTime: '',
            endTime: '',
            rating: 0,
        }
        this.oneClicked = this.oneClicked.bind(this)
        this.twoClicked = this.twoClicked.bind(this)
        this.threeClicked = this.threeClicked.bind(this)
        this.fourClicked = this.fourClicked.bind(this)
        this.fiveClicked = this.fiveClicked.bind(this)
        this.submitButtonClicked = this.submitButtonClicked.bind(this)
        this.backButtonClicked = this.backButtonClicked.bind(this)
    }

    componentDidMount() {
        if (this.state.url === 'rating') { this.props.history.push('/dashboard') }
        else {
            let temp = window.atob(this.state.url)
            let tempList = temp.split('_')
            let location = tempList[0]
            let address = tempList[1].split('.').join(' ')
            let date = tempList[2]
            let startTime = tempList[3] + ":00"
            let endTime = tempList[4] + ":00"
            this.setState({
                location: location,
                address: address,
                date: date,
                startTime: startTime,
                endTime: endTime
            })
        }
    }

    render() {
        if (!localStorage.getItem('username')) {
            this.props.history.push('/signin')
        }
        return (
            <div>
                <div>Please give the worker a rating</div>
                <br/>
                <input type="radio" id="1" name="rating" onClick={this.oneClicked} />
                <label>1 </label>
                <input type="radio" id="2" name="rating" onClick={this.twoClicked} />
                <label>2 </label>
                <input type="radio" id="3" name="rating" onClick={this.threeClicked} />
                <label>3 </label>
                <input type="radio" id="4" name="rating" onClick={this.fourClicked} />
                <label>4 </label>
                <input type="radio" id="5" name="rating" onClick={this.fiveClicked} />
                <label>5</label>
                <br/>

                {this.state.message}
                <br />
                <Button onClick={this.submitButtonClicked}>Submit</Button>
                <br />
                <Button onClick={this.backButtonClicked}>Back to Dashboard</Button>
                  
            </div>
        )
    }

    oneClicked() {
        this.setState({
            rating: 1,
            message: ''
        });
    }
    twoClicked() {
        this.setState({
            rating: 2,
            message: ''
        });
    }
    threeClicked() {
        this.setState({
            rating: 3,
            message: ''
        });
    }
    fourClicked() {
        this.setState({
            rating: 4,
            message: ''
        });
    }
    fiveClicked() {
        this.setState({
            rating: 5,
            message: ''
        });
    }

    submitButtonClicked() {
        if (this.state.rating === 0) {
            this.setState({ message: 'Please choose a rating' });
        }
        else {
            RatingService.executeRatingService(
                this.state.location,
                this.state.address,
                this.state.date,
                this.state.startTime,
                this.state.endTime,
                this.state.rating
            )
                .then(
                    response => {
                        if (response.data === 'Success') {
                            this.setState({ message: 'Thank you for rating' });
                        }
                        else if(response.data === 'Rating given') {
                            this.setState({ message: 'You have already given the rating' });
                        }
                    }
                )
        }
    }

    backButtonClicked() {
        this.props.history.push('/dashboard')
    }
}

export default Rating