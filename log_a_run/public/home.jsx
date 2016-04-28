

var Home = React.createClass({
  render: function() {
    return  (
      <div>
        <h1 id='header'>Log My Run</h1>
        <a id='sign-up' href='/sign-up'>Sign Up</a>
        <a id='sign-in' href='/sign-in'>Sign In</a>
      </div>
    )
  }
})

ReactDOM.render(
  <Home />,
  document.getElementById('entry-point')
)
