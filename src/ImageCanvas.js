import React, { /* useEffect, */ useRef, useState, useEffect } from "react";
import { Stage, Layer, Text, Image, Group, Transformer } from "react-konva";
import useImage from "use-image";

const URLImage = (props) => {
  const [image, status] = useImage(props.url, "Anonymous");
  // const [isDragging, setIsDragging] = useState(false);
  // const [x, setX] = useState(50);
  // const [y, setY] = useState(50);

  // status can be "loading", "loaded" or "failed"
  // const draggableProps = props.draggable
  //   ? {
  //       draggable: true,
  //       x: props.x,
  //       y: props.y,
  //       onDragStart: () => {
  //         // setIsDragging(true)
  //       },
  //       onDragEnd: (e) => {
  //         // setIsDragging(false)
  //         props.setX(e.target.x());
  //         props.setY(e.target.y());
  //       },
  //     }
  //   : null;

  console.log(props.url, status);
  return (
    <Image
      // {...draggableProps}
      image={image}
      width={props.width}
      height={props.height}
    />
  );
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
        <URLImage url={props.board.svgCode} width={320} height={240} />
        {props.board.inputs.map((input, i) => {
          return (
            <Text
              fontSize={props.board.fontSize}
              text={input.value}
              key={i}
              x={input.offsetX + 6}
              y={input.offsetY + 6}
              width={input.width - 12}
              height={input.height - 12}
              fill={props.board.color}
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
  // const svgString = board.svgCode;
  // const url = "data:image/svg+xml;base64," + window.btoa(svgString);

  const [boardX, setBoardX] = useState(50);
  const [boardY, setBoardY] = useState(50);

  const safeAreaWidth = window.innerWidth * 0.95;
  const safeAreaHeight = window.innerHeight * 0.95;

  const isOverSize =
    safeAreaWidth <= imageFile.width || safeAreaHeight <= imageFile.height;

  const scale = isOverSize
    ? Math.min(
        safeAreaWidth / imageFile.width,
        safeAreaHeight / imageFile.height
      )
    : 1;

  return (
    <div
      style={{
        border: `1px red solid`,
        transform: isOverSize ? `scale(${scale})` : null,
      }}
    >
      <Stage
        width={imageFile.width || 300}
        height={imageFile.height || 300}
      >
        {imageFile.src && (
          <Layer>
            <URLImage url={imageFile.src} />
            <BoardGroup
              {...{
                board,
                boardFormat,
                boardX,
                setBoardX,
                boardY,
                setBoardY,
              }}
            />
          </Layer>
        )}
      </Stage>
      {/* <h2>Inputs</h2> */}
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
