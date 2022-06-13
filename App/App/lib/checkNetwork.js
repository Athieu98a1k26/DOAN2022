import React, { Component } from "react"


export default class Index extends Component {
    state = {
        isOnline: navigator.onLine, // true, false
        showNotification: false,
        animateDown: false,
        animateUp: false,
    }

    componentDidMount() {
        window.addEventListener("online", this.handleOnline)
        window.addEventListener("offline", this.handleOffline)
    }

    componentWillUnmount() {
        window.removeEventListener("online", this.handleOnline)
        window.removeEventListener("offline", this.handleOffline)
    }

    handleOnline = () => {
        this.handleEvent(true)
    }

    handleOffline = () => {
        this.handleEvent(false)
    }

    handleEvent = (isOnline = true) => {
        if (isOnline) {
            this.setState({
                isOnline,
                showNotification: true
            }, () => {
                setTimeout(() => {
                    this.setState(state => ({ animateDown: state.isOnline === true }))
                }, (this.props.timeout - 150) || 2850)
                setTimeout(() => {
                    this.setState((state) => ({
                        showNotification: (state.isOnline === false) && true,
                        animateDown: false
                    }))
                }, this.props.timeout || 3000)
            })
        }
        else {
            this.setState(state => ({
                isOnline,
                animateUp: state.showNotification === false,
                showNotification: true
            }))
        }
    }

    renderToast() {
        let { isOnline, animateDown, animateUp } = this.state
        let { onlineText, offlineText } = this.props
        return (
            <div className={`offline-toast-container ${isOnline ? 'online' : 'offline'} ${animateDown ? 'offline-toast-down' : ''} ${animateUp ? 'offline-toast-up' : ''}`}>
                <span style={{ color: "#000", fontSize: 22, fontWeight: "bold" }}> {
                    isOnline ? (onlineText || 'Online') : (offlineText || 'Offline')
                }
                </span>
                {
                    !isOnline &&
                    <div className="cussor" style={{ backgroundColor: "#d7d7d7", fontWeight: "bold", marginTop: 22, paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20 }}><span style={{ color: "#000", fontSize: 20 }}>Retry</span></div>
                }
            </div>
        )
    }

    render() {
        if (this.state.showNotification) return this.renderToast()
        else return null
        // return this.renderToast()
    }
}