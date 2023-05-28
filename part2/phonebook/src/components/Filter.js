const Filter = ({ filterInput, handleFilter }) => (
    <div key={filterInput.id}>
      filter shown with: <input
        value={filterInput}
        onChange={handleFilter}
      />
    </div>
)

export default Filter