import React from 'react'
import DateTime from 'react-datetime'
import Event from './Event/Event'

import './ConfigSchedule.css'
import './DateTime.css'

export default class ConfigSchedule extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            events:this.props.events
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        });
    }

    handleDateTimeChange(event){
        if(typeof(event) === 'object'){
            this.setState({
                dateTime:event.toDate()
            })
        }
    }

    handleScheduleSubmit(e){
        e.preventDefault()
        this.setState(prevState=>{
            let events = prevState.events
            events.push({
                id:Date.now(),
                title:this.state.title,
                description:this.state.title,
                dateTime:this.state.dateTime
            })
            return{
                events
            }
        })
    }

    render(){
        return(
            <div className="ConfigSchedule">
                Here's the current schedule!
                <form onSubmit={(e)=>this.handleScheduleSubmit(e)}>
                    <label htmlFor="title">Title: </label>
                    <input 
                        name="title" 
                        onChange={e=>this.handleInputChange(e)} 
                    />
                    <br/>
                    <label htmlFor="description">Description: </label>
                    <input 
                        name="description" 
                        onChange={e=>this.handleInputChange(e)}
                    />
                    <br/>
                    <label>Time: </label>
                    <DateTime 
                        onChange={e=>this.handleDateTimeChange(e)}
                    />
                    <br />
                    <input type="submit" value="Add" disabled={!this.state.title || !this.state.description || !this.state.dateTime} />
                </form>
                <hr />
                {this.state.events.map(v=>{
                    return(<Event key={v.id} delete={(key)=>console.log(key)} event={v} />)
                })}
            </div>
        )
    }
}