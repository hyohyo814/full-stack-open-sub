const DisplaySel = ({target}) => (target.map(e => <p key={e.id}>{e.name} {e.number}</p>))

export default DisplaySel
