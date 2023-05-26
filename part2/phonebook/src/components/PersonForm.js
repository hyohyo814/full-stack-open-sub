const PersonForm = ({ subForm, nameVal, numVal, handleName, handleNum }) => (
  <form onSubmit={subForm}>
    <div>
      name: <input
        value={nameVal}
        onChange={handleName}
      />
    </div>

    <div>
      number: <input
        value={numVal}
        onChange={handleNum}
      />
    </div>

    <div>
      <button type='submit'>add</button>
    </div>

  </form>
)

export default PersonForm