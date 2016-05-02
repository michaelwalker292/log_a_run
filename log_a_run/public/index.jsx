'use strict'
var Home = React.createClass({
  render: function() {
    return  (
      <div className='container-fluid'>
        <div className="text-right pad-righ">
          <a id='sign-up' href='/sign-up'>Sign Up</a> | <a id='sign-in' href='/sign-in'>Sign In</a>
        </div>
        <div className="text-center">
          <h1 id='header'>Log My Run</h1>
        </div>
      </div>
    )
  }
})

var MyRuns = React.createClass({
  render: function() {
    var userRuns = JSON.parse(this.props.data)
    var user = userRuns.user

    var runs = userRuns.runs

    var runrows = runs.map(function(element) {
      return <RunRow data={element}/>
    })

    return  (
      <div>
        <h1 id='header'>My Runs</h1>
        <div id='runlist'>
        List of Runs
          <table className="table table-striped">
          {runrows}
          </table>
        </div>
        <a id='logmyrun' href='/log-run'>Log a Run</a>
      </div>
    )
  }
})

var RunRow = React.createClass({
  render: function(){
      return (
        <tr>
          <td>{this.props.data.name}</td>
        </tr>
      )
    }
  })

var SignUp = React.createClass({
  onRegisterClick: function() {
    var user = {
      name: this.refs.name_text.value,
      email: this.refs.email_text.value,
      password: this.refs.password_text.value
    }
    return $.post('http://localhost:3000/sign-up', user, function(result) {
      $(window.location).attr('href', '/my-runs/' + result._id);

    }.bind(this))
  },
  render: function() {
    return  (
      <div className='container'>
        <h1 id='header'>Register</h1>
        <div className="row">
          <form>
            <div className="col-md-1">
              <label id='name'>Name</label>
              <label id='email'>Email</label>
              <label id='password'>Password</label>
              <label id='confirm-password'>Confirm Password</label>
            </div>
            <div className="col-md-1">
              <input id='name-text' type='text' ref='name_text'></input><br />
              <input id='email-text' type='email' ref='email_text'></input><br />
              <input id='password-text' type='password' ref='password_text'></input><br />
              <input id='confirm-password-text' type='password' ref='confirm_password_text'></input><br />
              <input id='register-button' type='submit' onClick={this.onRegisterClick}></input><br />
            </div>
          </form>
        </div>
      </div>
    )
  }
})

var App = React.createClass({
  render: function() {
    var Child

    if (this.props.route.indexOf('sign-up') > -1) {
      Child = SignUp
    }
    else if (this.props.route.indexOf('my-runs') > -1) {
      Child = MyRuns
    }
    else {
      Child = Home
    }

    return (
      <div>
        <Child data={data} />
      </div>
    )
  }
})

function render() {
  var route = window.location.pathname.substr(1)

  ReactDOM.render(
    <App route={route} />,
    document.getElementById('entry-point'))
}

window.addEventListener('hashchange', render)
render()