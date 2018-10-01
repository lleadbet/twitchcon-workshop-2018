import React from 'react'

import './Schedule.css'

export default class Schedule extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            events:this.props.events
        }
    }

    render(){
        if(this.state.events){
            return(
                <div className="Schedule">
                    Here's the current schedule!
                </div>
            )

        }
    }
}