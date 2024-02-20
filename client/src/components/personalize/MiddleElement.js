import React, { useContext } from "react";
import ReactHtmlParser from "html-react-parser";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CanvasContext } from "../CanvasMiddleContainer";

export default function MiddleElement(props) {
  const { content, id, isReadOnly, size, fontName, blank } = props;
  const { actions } = useContext(CanvasContext);
  const editorRef = React.useRef(null);

  if (!isReadOnly) {
    const x = document.querySelectorAll(".ql-editor p")[0];
    if (x) {
      x.style.fontFamily = fontName;
      x.style.fontSize = size;
      x.style.border = "none";
    }
  }

  const updateEditorValue = (value) => {
    actions?.updateCanvasData({ id, content: value });
  };

  const modules = {
    toolbar: {
      container: "#toolbar",
    },
  };

  return (
    <div id="123" style={{ maxWidth: "100%", padding: blank ? "5%" : "0%" }}>
      {isReadOnly ? (
        <div
          id="text-component"
          style={{
            fontFamily: fontName,
            fontSize: size,
          }}
        >
          {ReactHtmlParser(content || "")}
        </div>
      ) : (
        <ReactQuill
          ref={editorRef}
          readOnly={false}
          theme="snow"
          className="quill-container"
          modules={modules}
          value={content}
          style={{
            fontFamily: fontName,
            fontSize: size,
          }}
          onChange={updateEditorValue}
        />
      )}
    </div>
  );
}
