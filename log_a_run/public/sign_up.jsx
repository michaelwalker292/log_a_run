

var SignUp = React.createClass({
  onRegisterClick: function() {
    var user = {
      name: this.refs.name_text.value,
      email: this.refs.email_text.value,
      password: this.refs.password_text.value
    }

    return $.post(this.props.source, user, function(result) {
      $(window.location).attr('href', '/my-runs/' + result._id);

    }.bind(this))
  },
  render: function() {
    return  (
      <div>
        <h1 id='header'>Register</h1>
        <fieldset>
          <legend>Register</legend>
          <form>
            <label id='name'>Name</label>
            <input id='name-text' type='text' ref='name_text'></input><br />
            <label id='email'>Email</label>
            <input id='email-text' type='email' ref='email_text'></input><br />
            <label id='password'>Password</label>
            <input id='password-text' type='password' ref='password_text'></input><br />
            <label id='confirm-password'>Confirm Password</label>
            <input id='confirm-password-text' type='password' ref='confirm_password_text'></input><br />
            <input id='register-button' type='submit' onClick={this.onRegisterClick}></input><br />
          </form>
        </fieldset>
      </div>
    )
  }
})

ReactDOM.render(
  <SignUp source_cat='/sign-up' />,
  document.getElementById('entry-point')
)
