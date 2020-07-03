import React, { /* useEffect, */ useRef, useState, useEffect } from "react";
// import Konva from 'konva';
import {
  Stage,
  Layer,
  Text,
  Image,
  Group,
  Transformer,
} from "react-konva";
import useImage from "use-image";

const URLImage = (props) => {
  const [image, status] = useImage(props.url, "Anonymous");
  // const [isDragging, setIsDragging] = useState(false);
  // const [x, setX] = useState(50);
  // const [y, setY] = useState(50);

  // status can be "loading", "loaded" or "failed"
  const draggableProps = props.draggable
    ? {
        draggable: true,
        x: props.x,
        y: props.y,
        onDragStart: () => {
          // setIsDragging(true)
        },
        onDragEnd: (e) => {
          // setIsDragging(false)
          props.setX(e.target.x());
          props.setY(e.target.y());
        },
      }
    : null;

  console.log(props.url, status);
  return <Image {...draggableProps} image={image} width={props.width} height={props.height} />;
};

const BoardGroup = (props) => {
  const [isSelected, toggleSelect] = useState(false);
  const groupRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    console.log(isSelected);
    if (isSelected) {
      // we need to attach transformer manually
      console.log(trRef, groupRef);
      trRef.current.setNode(groupRef.current);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Group
        ref={groupRef}
        draggable={true}
        x={props.boardX}
        setX={props.setBoardX}
        y={props.boardY}
        setY={props.setBoardY}
        onmouseover={() => {
          document.body.style.cursor = "pointer";
        }}
        onmouseout={() => {
          document.body.style.cursor = "default";
        }}
        onClick={() => {
          toggleSelect(!isSelected);
        }}
      >
        <URLImage url={props.url} width={640} height={480} />
        {props.board.inputs.map((input, i) => {
          return (
            <Text
              key={`${props.board.id}-${i}`}
              text={input.value}
              fontSize={60}
              x={input.offsetX}
              y={input.offsetY}
            />
          );
        })}
      </Group>
      {isSelected && (
        <Transformer
          ref={trRef}
          rotateEnabled={false}
          keepRatio={true}
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
          ]}
        />
      )}
    </>
  );
};

const ImageCanvas = (props) => {
  // const { imageFile, canvas, updateCanvas } = props;
  const { imageFile, boardFormat } = props;

  const board = boardFormat.filter((board) => board.active)[0];
  const svgString = board.svgCode;
  const url = "data:image/svg+xml;base64," + window.btoa(svgString);

  const [boardX, setBoardX] = useState(50);
  const [boardY, setBoardY] = useState(50);

  return (
    <div>
      <h2>ImageCanvas</h2>
      <div>
        <Stage width={imageFile.width || 300} height={imageFile.height || 300}>
          <Layer>
            {imageFile.src && <URLImage url={imageFile.src} />}
            {imageFile.src && (
              <BoardGroup
                {...{
                  board,
                  url,
                  boardX,
                  setBoardX,
                  boardY,
                  setBoardY,
                }}
              />
            )}
          </Layer>
        </Stage>
      </div>
      {/* {imageFile.src ? (
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
      ) : null} */}
    </div>
  );
};

export default ImageCanvas;
