const Notification = ({ message, handle }) => {
    if (message === null) {
      return null;
    }
    if (handle === "success") {
    return <div className="notif">{message}</div>;
    }
    if (handle === "error") {
    return <div className="error">{message}</div>;
    }
  };
  
  export default Notification