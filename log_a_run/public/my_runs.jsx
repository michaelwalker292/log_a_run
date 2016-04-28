var MyRuns = React.createClass({
  render: function() {
    return  (
      <div>
        <h1 id='header'>My Runs</h1>
        <div id='runlist'>
          List of Runs
        </div>
        <a id='logmyrun' href='/log-run'>Log a Run</a>
      </div>
    )
  }
})

ReactDOM.render(
  <MyRuns />,
  document.getElementById('entry-point')
)
