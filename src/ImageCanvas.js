import React from 'react';

const ImageCanvas = (props) => {
  const { uploadImage } = props

  return (
    <div>
      ImageCanvas
      <img src={uploadImage} alt="" style={{maxWidth: "80%", maxHeight: "50%"}} />
      
    </div>
  );
}

export default ImageCanvas;
