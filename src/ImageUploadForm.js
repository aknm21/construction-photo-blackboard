import React from 'react';
import ImageDropZone from './ImageDropZone';

const ImageUploadForm = (props) => {
  const { clearImageSrc, handleChangeFile, inputRef } = props
  const fileInput = document.querySelector("#file-input")
  return (
    <div>
      <h2>ImageUploadForm</h2>
      <ImageDropZone
        fileInput={fileInput}
        handleChangeFile={handleChangeFile}
      />
      <input
        id="file-input"
        type="file"
        ref={inputRef}
        onChange={(e) => handleChangeFile(e.target.files)}
      />
      <button
        type="button"
        onClick={() => clearImageSrc(fileInput)}
      >
        クリアー
      </button>
    </div>
  );
}

export default ImageUploadForm;
