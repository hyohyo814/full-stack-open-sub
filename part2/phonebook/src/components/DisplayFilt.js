import DisplaySel from './DisplaySel'

const DisplayFilt = ({ filter, init, input }) => {
    if (input === '') {
        <DisplaySel target={init} />
    } else
        <DisplaySel target={filter} />
}

export default DisplayFilt
