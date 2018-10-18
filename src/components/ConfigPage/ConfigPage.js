import React from 'react'
import Authentication from '../../util/Authentication/Authentication'
import ConfigSchedule from './ConfigSchedule/ConfigSchedule'

import './Config.css'
import './DateTime.css'

export default class ConfigPage extends React.Component{
    constructor(props){
        super(props)
        this.Authentication = new Authentication()

        //if the extension is running on twitch or dev rig, set the shorthand here. otherwise, set to null. 
        this.twitch = window.Twitch ? window.Twitch.ext : null
        this.state={
            finishedLoading:false,
            theme:'light',
            events:[]
        }
    }

    contextUpdate(context, delta){
        if(delta.includes('theme')){
            this.setState(()=>{
                return {theme:context.theme}
            })
        }
    }

    componentDidMount(){
        // do config page setup as needed here
        if(this.twitch){
            this.twitch.onAuthorized((auth)=>{
                this.Authentication.setToken(auth.token, auth.userId)
                if(!this.state.finishedLoading){
                    // if the component hasn't finished loading (as in we've not set up after getting a token), let's set it up now.
    
                    // now we've done the setup for the component, let's set the state to true to force a rerender with the correct data.
                    this.setState(()=>{
                        return {finishedLoading:true}
                    })
                }
            })

            this.twitch.configuration.onChanged(()=>{
                // We've gotten a configuration! Sweet! Now, let's set that to our state to update our Schedule (if one!)
                
                // We're going to use the broadcaster semgent here to store our data, so let's access that segment. 
                if(this.twitch.configuration.broadcaster){
                    let configuration = this.twitch.configuration.broadcaster.content

                    // because the object could be null/empty string, let's ensure we catch when the extension fails to parse the configuraiton
                    try{
                        configuration = JSON.parse(config)
                    }catch(e){
                        configuration = []
                    }

                    this.setState(()=>{
                        return{
                            events:configuration
                        }
                    })
                }  
            })

            this.twitch.onContext((context,delta)=>{
                this.contextUpdate(context,delta)
            })
        }
    }

    render(){
        if(this.state.finishedLoading && this.Authentication.isModerator()){
            return(
                <div className="Config">
                    <div className={this.state.theme==='light' ? 'Config-light' : 'Config-dark'}>
                        Current Schedule:
                        <ConfigSchedule events={this.state.events} /> 
                    </div>
                </div>
            )
        }
        else{
            return(
                <div className="Config">
                    <div className={this.state.theme==='light' ? 'Config-light' : 'Config-dark'}>
                        Loading...
                    </div>
                </div>
            )
        }
    }
}