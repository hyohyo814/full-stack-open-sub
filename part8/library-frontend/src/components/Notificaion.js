

const Notification = ({ errMsg }) => {
  if (errMsg) {
    return (
      <div style={{padding: '10px', border: 'line'}}>
        {errMsg}
      </div>
    )
  }
}

export default Notification