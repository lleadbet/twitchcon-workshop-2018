import React from 'react'
import Authentication from '../../util/Authentication/Authentication'

import './App.css'

export default class App extends React.Component{
    constructor(props){
        super(props)
        this.Authentication = new Authentication()

        //if the extension is running on twitch or dev rig, set the shorthand here. otherwise, set to null. 
        this.twitch = window.Twitch ? window.Twitch.ext : null
        this.state={
            finishedLoading:false,
            theme:'light',
            isVisible:true,
            events:[]
        }
    }

    contextUpdate(context, delta){
        if(delta.includes('theme')){
            this.setState(()=>{
                return {
                    theme:context.theme
                }
            })
        }
    }

    visibilityChanged(isVisible){
        this.setState(()=>{
            return {
                isVisible
            }
        })
    }

    componentDidMount(){
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

            this.twitch.listen('broadcast',(target,contentType,body)=>{
                this.twitch.rig.log(`New PubSub message!\n${target}\n${contentType}\n${body}`)
                // now that you've got a listener, do something with the result... 

                // do something...

            })

            this.twitch.onVisibilityChanged((isVisible,_c)=>{
                this.visibilityChanged(isVisible)
            })

            this.twitch.onContext((context,delta)=>{
                this.contextUpdate(context,delta)
            })
        }
    }

    componentWillUnmount(){
        if(this.twitch){
            this.twitch.unlisten('broadcast', ()=>console.log('successfully unlistened'))
        }
    }
    
    render(){
        if(this.state.finishedLoading && this.state.isVisible && this.state.events.length > 0){
            return (
                <div className={this.state.theme === 'light' ? 'App App-light' : 'App App-dark'} >
                    <p>Hello world!</p>
                </div>
            )
        }
        if(this.state.finishedLoading && this.state.isVisible){
            return (
                <div className={this.state.theme === 'light' ? 'App App-light' : 'App App-dark'} >
                    <p>No current events planned!</p>
                </div>
            )
        }
        else{
            return (
                <div className="App">
                    Loading....
                </div>
            )
        }

    }
}