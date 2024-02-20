import React, { useContext } from "react";
import ReactHtmlParser from "html-react-parser";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CanvasContext } from "../GiftCardCanvas";

export default function GiftTextElement(props) {
  const { content, id, isReadOnly, size, fontName, color, subText } = props;
  const { actions } = useContext(CanvasContext);
  const editorRef = React.useRef(null);

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
    if (subText) {
      actions?.updateSubCanvasData({ id, content: value });
    } else {
      actions?.updateCanvasData({ id, content: value });
    }
  };

  const modules = {
    toolbar: {
      container: "#toolbar",
    },
  };

  return (
    <>
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
        )}
      </div>
    </>
  );
}
