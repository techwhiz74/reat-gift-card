import React, { useContext, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { CanvasContext } from "../CanvasContainer";
import { resizeHandleClasses } from "../canvasUtils.js";
import ImageElement from "./ImageElement";

const componentMap = {
  IMAGE: ImageElement,
};

const getEnableResize = (type) => {
  return {
    bottom: type === "IMAGE",
    bottomLeft: true,
    bottomRight: true,

    top: type === "IMAGE",
    topLeft: true,
    topRight: true,

    left: true,
    right: true,
  };
};

const CanvasImageComponent = (props) => {
  const { state, actions } = useContext(CanvasContext);
  const { dimension, position, content, id, type } = props;

  const [uploaded, setUploaded] = useState(false);
  const [showGrids, setShowGrids] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const elementRef = useRef(null);
  const isDragged = useRef(false);

  const activeImgSelection = state?.activeImgSelection;

  const onBlur = (event) => {
    const toolbarElement = document.querySelector("#toolbar");
    if (
      event.currentTarget.contains(event?.relatedTarget) ||
      toolbarElement?.contains(event?.relatedTarget)
    ) {
      return;
    }
    setIsReadOnly(true);
    actions?.setEnableQuillToolbar(false);
    if (id && activeImgSelection) {
      activeImgSelection.delete(id);
      actions?.setActiveImgSelection(new Set(activeImgSelection));
    }
  };

  const getComponent = () => {
    const Component = type && componentMap[type];
    if (!Component || !id) return null;
    return (
      <Component
        key={id}
        id={id}
        type={type}
        position={position}
        dimension={dimension}
        content={content}
        isReadOnly={isReadOnly}
        uploaded={uploaded}
        setUploaded={setUploaded}
      />
    );
  };

  const style = {
    outline: "none",
    left: "20%",
    border: `3px solid ${
      (id && state?.activeImgSelection.has(id)) ||
      showGrids ||
      isDragged.current
        ? "#31f8fc"
        : "transparent"
    }`,
    zIndex: -10,
  };

  const onMouseEnter = () => {
    setShowGrids(true);
  };

  const onMouseLeave = () => {
    setShowGrids(false);
  };

  const onfocus = (event) => {
    if (id) {
      actions?.setActiveImgSelection(
        new Set(state?.activeImgSelection.add(id))
      );
    }
  };

  const onKeyDown = (event) => {
    if (!isReadOnly) event.stopPropagation();
  };

  const handleClass =
    id &&
    state?.activeImgSelection.has(id) &&
    state?.activeImgSelection.size === 1
      ? "showHandles"
      : "";

  // const onDoubleClick = () => {
  //   if (!isReadOnly) return;
  //   setIsReadOnly(false);
  // };

  return (
    <div ref={elementRef}>
      <Rnd
        style={style}
        size={{ width: dimension?.width || 0, height: dimension?.height || 0 }}
        position={{ x: position?.left || 0, y: position?.top || 0 }}
        onDragStart={() => {
          isDragged.current = true;
        }}
        onDragStop={(e, d) => {
          isDragged.current = false;
          actions?.updateCanvasImgData({
            id,
            position: { left: d.x, top: d.y },
          });
        }}
        resizeHandleWrapperClass={handleClass}
        resizeHandleClasses={resizeHandleClasses}
        onResize={(e, direction, ref, delta, position) => {
          actions?.updateCanvasImgData({
            id,
            dimension: { width: ref.style.width, height: ref.style.height },
            position: { top: position.y, left: position.x },
          });
        }}
        enableResizing={getEnableResize(type)}
        minWidth={100}
        minHeight={50}
        disableDragging={!isReadOnly}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onKeyDown={onKeyDown}
        onFocus={onfocus}
        onBlur={onBlur}
        tabIndex={0}
        lockAspectRatio={true}
      >
        <div className="item-container">{getComponent()}</div>
      </Rnd>
    </div>
  );
};

export default CanvasImageComponent;
