import DisplaySel from './DisplaySel'

const Persons = ({ filter, init, input, del }) => {
    if (input === '') {
        return <DisplaySel key={init.id} target={init} del={del} />
        
    } else
    return <DisplaySel key={filter.id} target={filter} del={del} />
}

export default Persons
