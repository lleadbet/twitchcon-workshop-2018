import React from 'react'

import './Event.css'

export default class Event extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="Event-container">
                <div className="Event-action">
                    <div className="Event-delete" onClick={()=>this.props.delete(this.props.event.id)}>
                        X
                    </div>
                </div>
                <div className="Event-details">
                    {this.props.event.title}
                </div>
            </div>
        )
    }
}