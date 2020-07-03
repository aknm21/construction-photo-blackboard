import React, { useState, useRef } from "react";
import "./App.css";
import ImageUploadForm from "./ImageUploadForm";
import ImageCanvas from "./ImageCanvas";
import Controller from "./Controller";

import Board1 from './assets/board1.svg';
import Board2 from './assets/board2.svg';

const createObjectURL =
  (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

const App = () => {
  const imageFileInitialValue = { url: "", width: NaN, height: NaN };
  const [imageFile, setImageFile] = useState(imageFileInitialValue);
  // const [canvas, updateCanvas] = useState(null);
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
          value: "placeholder",
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
          value: "placeholder",
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
          value: "placeholder",
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
          value: "placeholder",
          offsetX: 12,
          offsetY: 114,
          width: 298,
          height: 117,
        },
      ],
      active: true,
      color: "#000000",
      fontSize: 30
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
          value: "placeholder",
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
          value: "placeholder",
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
          value: "placeholder",
          offsetX: 12,
          offsetY: 114,
          width: 298,
          height: 117,
        },
      ],
      active: false,
      color: "#ffffff",
      fontSize: 30
    },
  ]);
  const inputRef = useRef(null);

  const handleChangeFile = (files) => {
    // const files = e.target.files;
    // console.table(files);
    // TODO: 画像判定入れる
    if (!files.length) {
      // setImageFile("");
      return;
    }
    const imageUrl = createObjectURL(files[0]);
    console.log({ imageFile });
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      const newImage = {
        src: imageUrl,
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

  const updateBoardSelect = (e) => {
    const targetID = Number(e.target.value);
    const updated = boardFormat
      .slice()
      .map((board) => Object.assign(board, { active: board.id === targetID }));
    setBoard(updated);
  };

  const updateInput = (value, i, activeBoardID) => {
    const updated = boardFormat.slice();
    updated[activeBoardID].inputs[i].value = value;
    setBoard(updated);
    console.log(boardFormat);
  };

  return (
    <div className="App">
      <header className="App-header">
        <ImageUploadForm
          inputRef={inputRef}
          clearImageSrc={clearImageSrc}
          handleChangeFile={handleChangeFile}
        />
        <ImageCanvas
          imageFile={imageFile}
          boardFormat={boardFormat}
        />
        <Controller
          boardFormat={boardFormat}
          updateBoardSelect={updateBoardSelect}
          updateInput={updateInput}
        />
      </header>
    </div>
  );
};

export default App;
