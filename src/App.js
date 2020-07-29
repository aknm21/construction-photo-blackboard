import React, { useState, useRef } from "react";
import "./App.css";
import ImageUploadForm from "./ImageUploadForm";
import ImageCanvas from "./ImageCanvas";
import Controller from "./Controller";

import Board1 from "./assets/board1.svg";
import Board2 from "./assets/board2.svg";

const createObjectURL =
  (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

const App = () => {
  const imageFileInitialValue = {
    src: null,
    name: null,
    type: null,
    width: NaN,
    height: NaN,
  };
  const [imageFile, setImageFile] = useState(imageFileInitialValue);
  // const [canvas, updateCanvas] = useState(null);
  const [isBoardSelected, setIsBoardSelected] = useState(false);
  const [boardFormat, setBoard] = useState([
    {
      id: 0,
      name: "ホワイトボード",
      svgCode: Board1,
      inputs: [
        {
          label: "工事名",
          type: "text",
          maxRow: 8,
          maxCol: 1,
          value: "",
          offsetX: 126,
          offsetY: 6,
          width: 186,
          height: 36,
        },
        {
          label: "工種",
          type: "text",
          maxRow: 8,
          maxCol: 1,
          value: "",
          offsetX: 126,
          offsetY: 42,
          width: 186,
          height: 36,
        },
        {
          label: "撮影日",
          type: "text",
          maxRow: 8,
          maxCol: 4,
          value: "",
          offsetX: 126,
          offsetY: 78,
          width: 186,
          height: 36,
        },
        {
          label: "自由記入欄",
          type: "text",
          maxRow: 8,
          maxCol: 4,
          value: "",
          offsetX: 12,
          offsetY: 114,
          width: 298,
          height: 117,
        },
      ],
      active: true,
      color: "#000000",
      fontSize: 20,
    },
    {
      id: 1,
      name: "黒板1",
      svgCode: Board2,
      inputs: [
        {
          label: "工事名",
          type: "text",
          maxRow: 8,
          maxCol: 1,
          value: "",
          offsetX: 126,
          offsetY: 6,
          width: 186,
          height: 36,
        },
        {
          label: "工種",
          type: "text",
          maxRow: 8,
          maxCol: 1,
          value: "",
          offsetX: 126,
          offsetY: 42,
          width: 186,
          height: 36,
        },
        {
          label: "側点",
          type: "text",
          maxRow: 8,
          maxCol: 4,
          value: "",
          offsetX: 126,
          offsetY: 78,
          width: 186,
          height: 36,
        },
        {
          label: "自由記入欄",
          type: "text",
          maxRow: 8,
          maxCol: 4,
          value: "",
          offsetX: 12,
          offsetY: 114,
          width: 298,
          height: 117,
        },
      ],
      active: false,
      color: "#ffffff",
      fontSize: 20,
    },
  ]);
  const inputRef = useRef(null);

  const handleChangeFile = (files) => {
    // console.table(files);
    if (!files.length || !files[0].type.includes("image/")) {
      return;
    }
    const imageUrl = createObjectURL(files[0]);
    // console.log({ imageFile });
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      const newImage = {
        src: imageUrl,
        name: files[0].name,
        type: files[0].type,
        width: image.width,
        height: image.height,
      };
      setImageFile(newImage);
    };
  };

  const clearImageSrc = (fileInput) => {
    if (fileInput) {
      fileInput.value = null;
    }
    // fileInput.files = []
    // fileInput.reset()
    // fileInput.ref = null
    setImageFile(imageFileInitialValue);
  };

  const updateBoardSelect = (targetID) => {
    // const targetID = Number(e.target.value);
    const updated = boardFormat
      .slice()
      .map((board) => Object.assign(board, { active: board.id === targetID }));
    setBoard(updated);
  };

  const updateInput = (value, i, activeBoardID) => {
    const updated = boardFormat.slice();
    updated[activeBoardID].inputs[i].value = value;
    setBoard(updated);
    // console.log(boardFormat);
  };

  return (
    <div className="App">
      <header className={imageFile.src ? "App-header active" : "App-header"}>
        <h1>
          <span role="img" aria-label="Construction">
            🚧
          </span>
          <span role="img" aria-label="Construction">
            🚧
          </span>
          <span role="img" aria-label="Pick">
            ⛏️
          </span>
          <span role="img" aria-label="Camera">
            📷
          </span>
          工事写真風黒板合成アプリ
          <span role="img" aria-label="Tractor">
            🚜
          </span>
          <span role="img" aria-label="Construction Worker">
            👷
          </span>
          <span role="img" aria-label="Construction">
            🚧
          </span>
          <span role="img" aria-label="Construction">
            🚧
          </span>
        </h1>
      </header>
      <main>
        <ImageCanvas
          imageFile={imageFile}
          boardFormat={boardFormat}
          handleChangeFile={handleChangeFile}
          isBoardSelected={isBoardSelected}
          setIsBoardSelected={setIsBoardSelected}
        />
        <ImageUploadForm
          inputRef={inputRef}
          clearImageSrc={clearImageSrc}
          handleChangeFile={handleChangeFile}
        />
          <Controller
            imageFile={imageFile}
            boardFormat={boardFormat}
            updateBoardSelect={updateBoardSelect}
            updateInput={updateInput}
            setIsBoardSelected={setIsBoardSelected}
          />
      </main>
    </div>
  );
};

export default App;
