import React, { useRef } from 'react';

const ImageUploadForm = (props) => {
  const { clearImageSrc, handleChangeFile } = props
  const inputRef = useRef(null);
  return (
    <div>
      ImageUploadForm
      <input type="file" ref={inputRef} onChange={handleChangeFile} />
      <button type="button" onClick={clearImageSrc}>クリアー</button>
    </div>
  );
}

export default ImageUploadForm;
