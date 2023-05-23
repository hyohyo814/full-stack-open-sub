import Part from "./Part"

const Content = ({ parts }) => (
    <div>
      <Part key={parts.id} part={parts}/>
    </div>
)

export default Content