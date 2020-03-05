import React, { Component } from 'react'
import './App.css'

// $ is a shortcut for jQuery methods
import $ from 'jquery'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {programmersReceived: ""}
        this.getProgrammers = this.getProgrammers.bind(this)
    }

    login () {
        const email = $("#email").val()
        const password = $("#password").val()
        const request = {
            "auth": {
                "email": email,
                "password": password
          }
        }

        console.log(request)

        $.ajax({
            url: "https://apisentris.com/api/v1/auth_token",
            type: "POST",
            data: JSON.stringify(request),
            dataType: "json",
            beforeSend: function(xhr){
                xhr.setRequestHeader('client_id', '224000');
                xhr.setRequestHeader('access_token', 'w_KDrRt_9H3KrwZgRcZing');
                xhr.setRequestHeader('Content-Type', 'application/json');
            },
            success: function (result) {
                console.log(result)
                localStorage.setItem("jwt", result.jwt)
            }
        })
    }

    getProgrammers() {
        let token = "Bearer " + localStorage.getItem("jwt")
        let url = ""
        url ="https://apisentris.com/api/v1/programmers"
        
        console.log(token)

        $.ajax({
            url: url,
            type: "GET",
            beforeSend: function(xhr){
                xhr.setRequestHeader('Authorization', token),
                xhr.setRequestHeader('client_id', '224000');
                xhr.setRequestHeader('access_token', 'w_KDrRt_9H3KrwZgRcZing');
                xhr.setRequestHeader('Content-Type', 'application/json');
            },
            context: this, // Allows us to use this.setState inside success
            success: function (result) {
                console.log(result)
                this.setState({programmersReceived: JSON.stringify(result)})
            }
        })
    }
    render() {
      return (
        <div className="App">
          <h1 style={{marginTop: "20vh", marginBottom: "5vh"}}>
            Programmer Management System
          </h1>
          <form>
            <label htmlFor="email">Email: </label>
            <br />
            <input
              name="email"
              id="email"
              type="email"
            />
            <br /><br />
            <label htmlFor="password">Password:</label>
            <br />
            <input
              name="password"
              id="password"
              type="password"
            />
            </form>
            <br />
            <button
              onClick={this.login}
            >
                Login
            </button>
          <br />
          <button
            onClick={() => { this.getProgrammers() }}
            style={{marginTop: "2vh"}}
            >
            Get Programmers
          </button>
          <p>{this.state.programmersReceived}</p>
        </div>
      );
    }
}

export default App
