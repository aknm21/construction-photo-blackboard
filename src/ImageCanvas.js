import React, {/* useEffect, useRef, useState */} from "react";
import Konva from 'konva';
import { Stage, Layer, Rect, Text, Circle, Line, Image } from "react-konva";
import useImage from 'use-image';

function ComplexApp(imageFile) {
  const url = imageFile.imageFile.src
  // set crossOrigin of image as second argument
  const [image] = useImage(url, 'Anonymous');
  // const [image, status] = useImage(url, 'Anonymous');

  // status can be "loading", "loaded" or "failed"
  // console.log(url, status)

  return (
    <Image image={image} />
  );
}

// function URLImage(props) {

//   const imageRef = useRef(null);
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     loadImage();
//     return () => {
//       if(imageRef.current) {
//         imageRef.current.removeEventListener('load', handleLoad);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     loadImage();
//   }, [props.src])

//   function handleLoad() {
//     setImage(imageRef.current);
//   }

//   function loadImage() {
//     const img = new window.Image();
//     img.src = props.src;
//     img.crossOrigin="Anonymous";
//     imageRef.current = img;
//     imageRef.current.addEventListener('load', handleLoad);
//   }

//   return (
//     <image image={image}/>
//   );
// }

const ImageCanvas = (props) => {
  // const { imageFile, canvas, updateCanvas } = props;
  const { imageFile } = props;

  // const local = new fabric.Canvas("c");
  // // canvas.
  // useEffect(() => {
  //   const local = new fabric.Canvas("c");
  //   updateCanvas(local);
  // }, []);
  // const setCanvas = (src) => {
  //   local.setBackgroundImage(src, local.renderAll.bind(local));
  // };

  // useEffect(() => {
  //   if (imageFile.src) {
  //     // console.log(local)
  //     console.log(
  //       `Canvas Update. src: ${imageFile.src}, width: ${imageFile.width}, height: ${imageFile.height}`
  //     );
  //     local.setBackgroundImage(imageFile.src, local.renderAll.bind(local));
  //     local.setHeight(imageFile.height);
  //     local.setWidth(imageFile.width);
  //     // setCanvas(imageFile.src)
  //   }
  //   // document.title = `You clicked ${count} times`;
  // });

  return (
    <div>
      <h2>ImageCanvas</h2>
      <div>
        <Stage width={imageFile.width||300} height={imageFile.height||300}>
          <Layer>
            <ComplexApp imageFile={imageFile} />
            <Text text="Some text on canvas" fontSize={15} />
            <Rect
              x={20}
              y={50}
              width={100}
              height={100}
              fill="red"
              shadowBlur={10}
            />
            <Circle x={200} y={100} radius={50} fill="green" />
            <Line
              x={20}
              y={200}
              points={[0, 0, 100, 0, 100, 100]}
              tension={0.5}
              closed
              stroke="black"
              fillLinearGradientStartPoint={{ x: -50, y: -50 }}
              fillLinearGradientEndPoint={{ x: 50, y: 50 }}
              fillLinearGradientColorStops={[0, "red", 1, "yellow"]}
            />
          </Layer>
        </Stage>
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
