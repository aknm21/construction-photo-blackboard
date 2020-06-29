import React, { useRef } from 'react';
import ImageDropZone from './ImageDropZone';

const ImageUploadForm = (props) => {
  const { clearImageSrc, handleChangeFile } = props
  const fileInput = document.querySelector("#file-input")
  const inputRef = useRef(null);
  return (
    <div>
      <h2>ImageUploadForm</h2>
      <ImageDropZone
        fileInput={fileInput}
      />
      <input
        id="file-input"
        type="file"
        ref={inputRef}
        onChange={handleChangeFile}
      />
      <button
        type="button"
        onClick={clearImageSrc}
      >
        クリアー
      </button>
    </div>
  );
}

export default ImageUploadForm;
