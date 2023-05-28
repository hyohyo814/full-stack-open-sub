const DisplaySel = ({ target, del }) => (
  target.map(person => (
    <p key={Math.random()}>
      {person.name} {person.number}
      <button
        onClick={() => {
          del(person.id);
        }}>
        delete
      </button>
    </p>
  ))
)

export default DisplaySel;
