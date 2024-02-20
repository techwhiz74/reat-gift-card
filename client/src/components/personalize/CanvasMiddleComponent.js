import React, { useContext, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { CanvasContext } from "../CanvasMiddleContainer.js";
import { resizeHandleClasses } from "../canvasUtils.js";
import MiddleElement from "./MiddleElement.js";

const componentMap = {
  TEXT: MiddleElement,
};

export default function CanvasMiddleComponent(props) {
  const { state, actions } = useContext(CanvasContext);
  const { dimension, position, content, id, type, size, fontName, blank } =
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
        fontName={fontName}
        blank={blank}
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

  const onfocus = (event) => {
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
          actions?.updateCanvasData({ id, position: { left: d.x, top: d.y } });
        }}
        resizeHandleWrapperClass={handleClass}
        resizeHandleClasses={resizeHandleClasses}
        enableResizing={null}
        minWidth={100}
        minHeight={50}
        disableDragging={!isReadOnly}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onDoubleClick={onDoubleClick}
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
