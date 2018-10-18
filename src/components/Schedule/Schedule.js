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
        if(this.state.events && this.state.events.length > 0){
            return(
                <div className="Schedule">
                    Here's the current schedule!
                </div>
            )
        }
        else{
            return(
                <div className="Schedule">
                    No current events scheduled!
                </div>
            )
        }
    }
}