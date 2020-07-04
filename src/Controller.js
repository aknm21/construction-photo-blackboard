import React from "react";

const Controller = (props) => {
  const {
    boardFormat,
    imageFile,
    updateInput,
    updateBoardSelect,
    setIsBoardSelected,
  } = props;
  const activeBoard = boardFormat.filter((board) => board.active)[0];
  return (
    <div>
      <h2>合成結果ダウンロード</h2>
      <button
        onClick={() => {
          setIsBoardSelected(false);
          const canvas = document.querySelector(".konvajs-content canvas");
          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/png");
          link.download = imageFile.name + "_modified.png";
          link.click();
        }}
      >
        ダウンロード
      </button>
      <h2>テンプレート選択</h2>
      <select onChange={(e) => updateBoardSelect(e)}>
        {boardFormat.map((board) => {
          return (
            <option key={board.id} value={board.id}>
              {board.name}
            </option>
          );
        })}
      </select>
      <h2>テキスト操作</h2>
      <table className="controller-table">
        <tbody>
          {activeBoard.inputs.map((input, i) => {
            const id = `board-input-${activeBoard.id}-${i}`;
            return (
              <tr key={id}>
                <td>
                  <label htmlFor={id}>{input.label}</label>
                </td>
                <td>
                  <input
                    id={id}
                    onChange={(e) =>
                      updateInput(e.target.value, i, activeBoard.id)
                    }
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
