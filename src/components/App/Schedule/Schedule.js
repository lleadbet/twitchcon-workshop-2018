import React from 'react'
import moment from 'moment'

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
                    <div className="Schedule-event-container">
                        {this.state.events.map(event=>{
                            return(
                                <div key={event.id} className="Schedule-event">
                                    <div className="Schedule-event-title">
                                        Title: {event.title}
                                    </div>
                                    Description: {event.description}
                                    <br />
                                    {moment(event.dateTime).format('LLL')}
                                </div>
                            )
                        })}      
                    </div>
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