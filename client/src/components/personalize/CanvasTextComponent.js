import React, { useContext, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { CanvasContext } from "../CanvasContainer";
import { resizeHandleClasses } from "../canvasUtils.js";
import TextElement from "./TextElement.js";
import { useMediaQuery } from "@mui/material";

const componentMap = {
  TEXT: TextElement,
};

const getEnableResize = (type) => {
  return {
    bottomLeft: true,
    bottomRight: true,

    topLeft: true,
    topRight: true,

    left: true,
    right: true,

    top: true,
    bottom: true,
  };
};

export default function CanvasTextComponent(props) {
  const isMobile = useMediaQuery("(max-width: 576px");
  const { state, actions } = useContext(CanvasContext);
  const { dimension, position, content, id, type, size, fontName, fontColor } =
    props;

  const [showGrids, setShowGrids] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const elementRef = useRef(null);
  const isDragged = useRef(false);

  const activeSelection = state?.activeSelection;

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
    if (id && activeSelection) {
      activeSelection.delete(id);
      actions?.setActiveSelection(new Set(activeSelection));
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
        size={size}
        color={fontColor}
        fontName={fontName}
        isReadOnly={isReadOnly}
      />
    );
  };

  const style = {
    outline: "none",
    border: `2px dashed ${
      (id && state?.activeSelection.has(id)) || showGrids || isDragged.current
        ? "#3168fc"
        : "transparent"
    }`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const onMouseEnter = () => {
    setShowGrids(true);
  };

  const onMouseLeave = () => {
    setShowGrids(false);
  };

  const onfocus = (e, event) => {
    if (id) {
      actions?.setActiveSelection(new Set(state?.activeSelection.add(id)));
    }
  };

  const onKeyDown = (event) => {
    if (!isReadOnly) event.stopPropagation();
  };

  const handleClass =
    id && state?.activeSelection.has(id) && state?.activeSelection.size === 1
      ? "showHandles"
      : "";

  const onDoubleClick = () => {
    if (!isReadOnly) return;
    setIsReadOnly(false);
    actions?.setEnableQuillToolbar(true);
  };

  const divRef = useRef(null);
  const resizeText = () => {
    const div = divRef.current;
    const txtDiv = divRef.current.querySelector("#text-component");
    let fontSize = parseInt(size);

    if (txtDiv) {
      txtDiv.style.fontSize = fontSize + "px";
      while (div.offsetWidth > txtDiv.offsetWidth && fontSize <= 72) {
        fontSize++;
        txtDiv.style.fontSize = fontSize + "px";
      }
    }
  };

  const resizeFcn = () => {
    resizeText();
    window.addEventListener("resize", resizeText);
    return () => {
      window.removeEventListener("resize", resizeText);
    };
  };

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
          isMobile
            ? actions?.updateCanvasData({
                id,
                position: { left: d.x - d.deltaX, top: d.y - d.deltaY },
              })
            : actions?.updateCanvasData({
                id,
                position: { left: d.x, top: d.y },
              });
        }}
        resizeHandleWrapperClass={handleClass}
        resizeHandleClasses={resizeHandleClasses}
        onResize={(e, direction, ref, delta, position) => {
          actions?.updateCanvasData({
            id,
            dimension: { width: ref.style.width, height: ref.style.height },
            position: {
              top: position.y,
              left: position.x,
            },
          });
          resizeFcn();
        }}
        enableResizing={getEnableResize(type)}
        minWidth={100}
        minHeight={50}
        disableDragging={!isReadOnly}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onDoubleClick={onDoubleClick} // For desktop
        onTouchStart={() => {
          onfocus();
        }}
        onTouchMove={() => {
          onfocus();
        }}
        onTouchCancel={() => {
          onBlur();
        }}
        onKeyDown={onKeyDown}
        onFocus={onfocus}
        onBlur={onBlur}
        tabIndex={0}
        lockAspectRatio={type === "IMAGE"}
      >
        <div
          className="item-container"
          ref={divRef}
          style={{ margin: "10%" }}
          onMouseEnter={onDoubleClick}
          onTouchStart={() => {
            onDoubleClick();
          }}
        >
          {getComponent()}
        </div>
      </Rnd>
    </div>
  );
}
