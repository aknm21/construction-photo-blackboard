import React, { useEffect } from 'react';
import { fabric } from 'fabric';

const ImageCanvas = (props) => {
  const { uploadImage, canvas, updateCanvas } = props

  // canvas.
  useEffect(() => {
    const local = new fabric.Canvas('c')
    updateCanvas(local);
  }, [])

  return (
    <div>
      ImageCanvas
      <img src={uploadImage} alt="" style={{maxWidth: "80%", maxHeight: "50%"}} />
      <canvas id="c"></canvas>
    </div>
  );
}

export default ImageCanvas;
