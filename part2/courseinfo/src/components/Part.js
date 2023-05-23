const Part = ({ part }) => (   
    part.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)
)

export default Part

/* debugging purposes
const Part = ({ part }) => {
    const name = part.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)
    console.log(name)
    return (name)
}
*/