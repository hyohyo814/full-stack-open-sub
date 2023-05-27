import DisplaySel from './DisplaySel'

const Persons = ({ filter, init, input }) => {
    if (input === '') {
        return <DisplaySel target={init} />
        
    } else
    return <DisplaySel target={filter} />
}

export default Persons
