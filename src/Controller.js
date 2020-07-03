import React from "react";

const Controller = (props) => {
  const { boardFormat, updateInput, updateBoardSelect } = props;
  const activeBoard = boardFormat.filter((board) => board.active)[0];
  const inputs = boardFormat[activeBoard.id].inputs;
  return (
    <div>
      <h2>黒板の操作</h2>
      <select onChange={(e) => updateBoardSelect(e)}>
        {boardFormat.map((board) => {
          return (
            <option key={board.id} value={board.id}>
              {board.name}
            </option>
          );
        })}
      </select>
      <table className="controller-table">
        <tbody>
          {inputs.map((input, i) => {
            const id = `board-input-${activeBoard.id}-${i}`;
            return (
              <tr key={id}>
                <td>
                  <label for={id}>
                    {input.label}
                  </label>
                </td>
                <td>
                  <input
                    id={id}
                    onChange={(e) => updateInput(e.target.value, i, activeBoard.id)}
                    value={input.value}
                    type={input.type}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Controller;
