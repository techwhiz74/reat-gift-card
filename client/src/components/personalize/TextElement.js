import React, { useContext, useRef } from "react";
import ReactHtmlParser from "html-react-parser";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CanvasContext } from "../CanvasContainer";

const TextElement = (props) => {
  const { content, id, isReadOnly, size, fontName, color } = props;
  const { actions } = useContext(CanvasContext);
  const editorRef = useRef(null);

  if (!isReadOnly) {
    // document.querySelectorAll(".ql-editor p")[0].style.fontFamily = fontName;
    const x = document.querySelectorAll(".ql-editor p")[0];
    if (x) {
      x.style.fontFamily = fontName;
      x.style.fontSize = size;
      x.style.color = color;
      x.style.border = "none";
    }
  }

  const updateEditorValue = (value) => {
    actions?.updateCanvasData({ id, content: value });
  };

  // const modules = {
  //   toolbar: "#toolbar",
  // };

  const modules = {
    toolbar: {
      container: "#toolbar",
    },
  };

  return (
    <div>
      {isReadOnly ? (
        <div
          id="text-component"
          style={{
            fontFamily: fontName,
            fontSize: size,
            color: `#${color}`,
          }}
        >
          {ReactHtmlParser(content || "")}
        </div>
      ) : (
        <div>
          <ReactQuill
            ref={editorRef}
            readOnly={false}
            theme="snow"
            modules={modules}
            value={content}
            style={{
              fontFamily: fontName,
              fontSize: size,
              color: `#${color}`,
            }}
            onChange={updateEditorValue}
          />
        </div>
      )}
    </div>
  );
};

export default TextElement;
