import React from 'react';

const Controller = (props) => {
  const { boardFormat, updateInput, updateBoardSelect } = props;
  const activeBoardID = boardFormat.filter(board => board.active)[0].id
  const inputs = boardFormat[activeBoardID].inputs
  return (
    <div>
      <h2>Controller</h2>
      <select onChange={(e) => updateBoardSelect(e)}>
        {boardFormat.map(board => {
          return (<option key={board.id} value={board.id}>{board.name}</option>)
        })}
      </select>
      {inputs.map((input, i) => {
        const id = `board-input-${activeBoardID}-${i}`;
        return (
          <li key={id}>
            <label>
              {input.label}
              <input
                onChange={(e) => updateInput(e.target.value, i, activeBoardID)}
                id={id}
                type={input.type}
                value={input.value}
              />
            </label>
          </li>
        )
      })}
    </div>
  );
}

export default Controller;
