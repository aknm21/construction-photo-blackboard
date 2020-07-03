import React from "react";

const Controller = (props) => {
  const { boardFormat, updateInput, updateBoardSelect } = props;
  const activeBoard = boardFormat.filter((board) => board.active)[0];
  const inputs = boardFormat[activeBoard.id].inputs;
  return (
    <div>
      <h2>Controller</h2>
      <select onChange={(e) => updateBoardSelect(e)}>
        {boardFormat.map((board) => {
          return (
            <option key={board.id} value={board.id}>
              {board.name}
            </option>
          );
        })}
      </select>
      {inputs.map((input, i) => {
        const id = `board-input-${activeBoard.id}-${i}`;
        return (
          <li key={id}>
            <label>
              {input.label}
              <input
                onChange={(e) => updateInput(e.target.value, i, activeBoard.id)}
                value={input.value}
                type={input.type}
              />
            </label>
          </li>
        );
      })}
    </div>
  );
};

export default Controller;
