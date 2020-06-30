import React from "react";

const ImageDropZone = (props) => {
  const { fileInput, handleChangeFile } = props;

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
    e.target.classList.toggle("dragover");
    console.log("handleDragLeave");
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.toggle("dragover");
    console.log("handleDragOver");
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.toggle("dragenter");
    const files = e.dataTransfer.files;
    if (fileInput) {
      fileInput.files = files;
    }
    console.log(fileInput)
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
