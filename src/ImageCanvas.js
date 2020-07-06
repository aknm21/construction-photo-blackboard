import React, { useRef, useState, useEffect } from "react";
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

  // console.log(props.url, status);
  return (
    status === "loaded" && (
      <Image
        // {...draggableProps}
        image={image}
        {...props}
      />
    )
  );
};

const BoardGroup = (props) => {
  const {
    board,
    // boardFormat,
    boardX,
    setBoardX,
    boardY,
    setBoardY,
    isBoardSelected,
    setIsBoardSelected,
  } = props;

  // const [isSelected, toggleSelect] = useState(false);
  const groupRef = useRef();
  const trRef = useRef();
  useEffect(() => {
    // console.log(isBoardSelected);
    if (isBoardSelected) {
      // we need to attach transformer manually
      // console.log(trRef, groupRef);
      trRef.current.setNode(groupRef.current);
      trRef.current.getLayer().batchDraw();
    }
  }, [isBoardSelected]);

  return (
    <>
      <Group
        ref={groupRef}
        draggable={true}
        x={boardX}
        setX={setBoardX}
        y={boardY}
        setY={setBoardY}
        onmouseover={() => {
          document.body.style.cursor = "move";
        }}
        onmouseout={() => {
          document.body.style.cursor = "default";
        }}
        onDragStart={() => {
          setIsBoardSelected(true);
        }}
        onClick={() => {
          setIsBoardSelected(!isBoardSelected);
        }}
      >
        <URLImage url={board.svgCode} width={320} height={240} />
        {board.inputs.map((input, i) => {
          return (
            <Text
              fontSize={board.fontSize}
              text={input.value}
              key={i}
              x={input.offsetX + 6}
              y={input.offsetY + 6}
              width={input.width - 12}
              height={input.height - 12}
              fill={board.color}
            />
          );
        })}
      </Group>
      {isBoardSelected && (
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
  const {
    handleChangeFile,
    imageFile,
    boardFormat,
    isBoardSelected,
    setIsBoardSelected,
  } = props;

  const board = boardFormat.filter((board) => board.active)[0];
  // const svgString = board.svgCode;
  // const url = "data:image/svg+xml;base64," + window.btoa(svgString);

  const [boardX, setBoardX] = useState(15);
  const [boardY, setBoardY] = useState(15);

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

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.add("dragover");
    // console.log("handleDragEnter");
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.remove("dragover");
    // console.log("handleDragLeave");
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log("handleDragOver");
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.remove("dragover");
    const files = e.dataTransfer.files;
    const fileInput = document.querySelector("#file-input");

    if (fileInput) {
      fileInput.files = files;
    }
    // console.log(fileInput);
    handleChangeFile(files);
    // console.log("handleDrop");
  };

  return (
    <div
      className="canvas-wrapper"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      style={{
        // margin: "0 auto 1.5em",
        width: isOverSize ? Math.ceil(imageFile.width * scale) : imageFile.width || 450,
        // maxHeight: imageFile.height * scale || 300
        height: isOverSize ? Math.ceil(imageFile.height * scale) : imageFile.height || 300,
      }}
    >
      <Stage
        width={imageFile.width || 450}
        height={imageFile.height || 300}
        className="stage"
        style={{
          transform: isOverSize ? `scale(${scale})` : null,
          transformOrigin: "left top",
        }}
      >
        {imageFile.src && (
          <Layer>
            <URLImage
              url={imageFile.src}
              onTouchEnd={() => {
                setIsBoardSelected(false);
              }}
              onclick={() => {
                setIsBoardSelected(false);
              }}
            />
            <BoardGroup
              {...{
                board,
                // boardFormat,
                boardX,
                setBoardX,
                boardY,
                setBoardY,
                isBoardSelected,
                setIsBoardSelected,
              }}
            />
          </Layer>
        )}
      </Stage>
      {!imageFile.src && (
        <div className="canvas-text">画像をドラッグドロップ</div>
      )}
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
