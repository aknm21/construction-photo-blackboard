import React, { useEffect } from "react";
import { fabric } from "fabric";

const ImageCanvas = (props) => {
  // const { imageFile, canvas, updateCanvas } = props;
  const { imageFile } = props;

  const local = new fabric.Canvas("c");
  // // canvas.
  // useEffect(() => {
  //   const local = new fabric.Canvas("c");
  //   updateCanvas(local);
  // }, []);
  // const setCanvas = (src) => {
  //   local.setBackgroundImage(src, local.renderAll.bind(local));
  // };

  useEffect(() => {
    if (imageFile.src) {
      // console.log(local)
      console.log(
        `Canvas Update. src: ${imageFile.src}, width: ${imageFile.width}, height: ${imageFile.height}`
      );
      local.setBackgroundImage(imageFile.src, local.renderAll.bind(local));
      local.setHeight(imageFile.height);
      local.setWidth(imageFile.width);
      // setCanvas(imageFile.src)
    }
    // document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <h2>ImageCanvas</h2>
      <div>
        <canvas id="c"></canvas>
      </div>
      {imageFile.src ? (
        <>
          <h3>Preview</h3>
          <div>
            {imageFile.src}
            <img
              src={imageFile.src}
              alt=""
              style={{ maxWidth: "80%", maxHeight: "50%" }}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ImageCanvas;
