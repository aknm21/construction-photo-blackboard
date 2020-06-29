import React from "react";

const ImageDropZone = (props) => {
  const { fileInput, handleChangeFile } = props;
  const fileArea = document.querySelector("#dragDropArea");

  const style = {
    backgroundColor: "#f4f4f4",
    margin: "10px",
    padding: "10px",
    border: "#0dd dashed 5px",
    minHeight: "200px",
    textAlign: "center",
    ".dragover": {
      backgroundColor: "#000",
    },
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("handleDragEnter");
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fileArea.classList.remove("dragover");
    console.log("handleDragLeave");
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fileArea.classList.add("dragover");
    console.log("handleDragOver");
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fileArea.classList.remove("dragenter");
    const files = e.dataTransfer.files;
    fileInput.files = files;
    handleChangeFile(files)
    console.log("handleDrop");
  };

  return (
    <div
      id="dragDropArea"
      style={style}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <h2>dragDropArea</h2>
    </div>
  );
};

export default ImageDropZone;
