const Filter = ({ filterInput, handleFilter }) => (
    <div>
      filter shown with: <input
        value={filterInput}
        onChange={handleFilter}
      />
    </div>
)

export default Filter