import React, { useEffect } from "react";
import { fabric } from "fabric";

const ImageCanvas = (props) => {
  const { imageFile, canvas, updateCanvas } = props;

  // canvas.
  useEffect(() => {
    const local = new fabric.Canvas("c");
    updateCanvas(local);
  }, []);

  return (
    <div>
      <h2>ImageCanvas</h2>
      <canvas id="c"></canvas>
      {imageFile.src ? (
        <>
          <h3>Preview</h3>
          {imageFile.src}
          <img
            src={imageFile.src}
            alt=""
            style={{ maxWidth: "80%", maxHeight: "50%" }}
          />
        </>
      ) : null}
    </div>
  );
};

export default ImageCanvas;
