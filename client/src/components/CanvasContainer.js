import React, { useCallback, useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import html2canvas from "html2canvas";

import {
  Button,
  Stack,
  Container,
  Box,
  useMediaQuery,
  Typography,
  styled,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import CanvasTextComponent from "./personalize/CanvasTextComponent";
import CanvasImageComponent from "./personalize/CanvasImageComponent";
import CanvasBorderComponent from "./personalize/CanvasBorderComponent";
import ImageToolbar from "./personalize/ImageToolbar";
import TextToolbar from "./personalize/TextToolbar";

import {
  listProductDetail,
  updateProduct,
  Upload,
} from "../store/actions/productActions";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("rgba(0, 115, 115)"),
  backgroundColor: "rgba(0, 115, 115, 0.8)",
  "&:hover": {
    backgroundColor: "rgba(0, 115, 115, 0.8)",
  },
  borderRadius: "25px",
}));

const getInitialText = (
  data,
  drawTxt_x,
  drawTxt_y,
  txt_w,
  txt_h,
  message,
  size,
  fontName,
  fontColor
) => {
  return {
    type: "Text",
    id: `"Text"__${Date.now()}__${data?.length}`,
    position: {
      top: drawTxt_y,
      left: drawTxt_x,
    },
    dimension: {
      width: txt_w + "%",
      // height: txt_h + "%",
      // width: "auto",
      height: "auto",
    },
    content: message,
    size: size,
    fontName: fontName,
    fontColor: fontColor,
  };
};
const getImageData = (data, draw_x, draw_y, drawImg_w, drawImg_h) => {
  return {
    type: "Image",
    id: `"Image"__${Date.now()}__${data?.length}`,
    position: {
      top: draw_y,
      left: draw_x,
    },
    dimension: {
      width: drawImg_w,
      height: drawImg_h,
    },
    content: "",
  };
};

export const CanvasContext = React.createContext({});

export default function CanvasContainer() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id, forGift } = useParams();
  const isMobile = useMediaQuery("(max-width: 576px");

  const [cardData, setCardData] = useState({});
  const getProductDetail = useCallback(
    (id) => {
      dispatch(listProductDetail(id))
        .then((res) => {
          if (res.data) {
            setCardData({
              _id: res.data._id,
              imageUrl: res.data.imageUrl,
              blankUrl: res.data.blankUrl,
              frontUrl: res.data.frontUrl,
              preSMSUrl: res.data.preSMSUrl,
              fontName: res.data.fontName,
              fontUrl: res.data.fontUrl,
              fontColor: res.data.fontColor,
              img_x: res.data.imagePositions[0],
              img_y: res.data.imagePositions[1],
              img_w: res.data.imagePositions[2],
              img_h: res.data.imagePositions[3],
              txt_x: res.data.textPositions[0],
              txt_y: res.data.textPositions[1],
              txt_w: res.data.textPositions[2],
              txt_h: res.data.textPositions[3],
            });
          }
        })
        .catch((error) => {
          console.log("Catch error", error);
        });
    },
    [dispatch]
  );

  useEffect(() => {
    getProductDetail(id);
  }, [dispatch, id, getProductDetail]);

  const [draw_x, setDrawX] = useState(0);
  const [draw_y, setDrawY] = useState(0);
  const [drawTxt_x, setDrawTxtX] = useState(0);
  const [drawTxt_y, setDrawTxtY] = useState(0);
  const [drawImg_w, setDrawImgW] = useState(0);
  const [drawImg_h, setDrawImgH] = useState(0);
  const [message, setMessage] = useState("Write Here");
  const [fontSize, setFontSize] = useState("18px");

  const [canvasData, setCanvasData] = useState([]);
  const [canvasImgData, setCanvasImgData] = useState([]);
  const [activeSelection, setActiveSelection] = useState(new Set());
  const [activeImgSelection, setActiveImgSelection] = useState(new Set());
  const [enableQuillToolbar, setEnableQuillToolbar] = useState(false);

  const containerRef = useRef(null);
  const frontRef = useRef(null);
  const imgRef = useRef(null);
  const isSelectAll = useRef(false);
  const isSelectAllImg = useRef(false);

  useEffect(() => {
    const image = imgRef.current;
    const { width, height } = image.getBoundingClientRect();
    setDrawX((width * cardData.img_x) / 100);
    setDrawY((height * cardData.img_y) / 100);
    setDrawTxtX((width * cardData.txt_x) / 100);
    setDrawTxtY((height * cardData.txt_y) / 100);
    setDrawImgW((width * cardData.img_w) / 100);
    setDrawImgH((height * cardData.img_h) / 100);
    if (width > 400) {
      setFontSize("24px");
    }
  }, [cardData.img_x, cardData.img_y, cardData.txt_x, cardData.txt_y]);

  // Loading user font-family
  const loadAndApplyFont = (fontUrl, fontName) => {
    const newStyle = `
    @font-face {
      font-family: '${fontName}';
      src: url(${fontUrl}) format('truetype');
    }
  `;
    const styleElement = document.createElement("style");
    styleElement.appendChild(document.createTextNode(newStyle));
    document.head.appendChild(styleElement);
  };
  useEffect(() => {
    if (cardData.fontUrl) {
      loadAndApplyFont(cardData.fontUrl, cardData.fontName);
    }
  }, [cardData]);

  // CanvasData for image and text
  const updateCanvasData = (data) => {
    const currentDataIndex =
      canvasData.findIndex((canvas) => canvas.id === data.id) ?? -1;
    const updatedData = { ...canvasData?.[currentDataIndex], ...data };
    canvasData.splice(currentDataIndex, 1, updatedData);
    setCanvasData([...(canvasData || [])]);
  };
  const updateCanvasImgData = (data) => {
    const currentDataIndex =
      canvasImgData.findIndex((canvas) => canvas.id === data.id) ?? -1;
    const updatedData = { ...canvasImgData?.[currentDataIndex], ...data };
    canvasImgData.splice(currentDataIndex, 1, updatedData);
    setCanvasImgData([...(canvasImgData || [])]);
  };

  const addElement = (type) => {
    const defaultData = getInitialText(
      canvasData,
      drawTxt_x,
      drawTxt_y,
      cardData.txt_w,
      cardData.txt_h,
      message,
      fontSize,
      cardData.fontName,
      cardData.fontColor
    );
    setCanvasData([...canvasData, { ...defaultData, type: "TEXT" }]);
    activeSelection.clear();
    // activeSelection.add(defaultData.id);
    // setActiveSelection(new Set(activeSelection));
  };
  const addImageArea = () => {
    const defaultImgData = getImageData(
      canvasImgData,
      draw_x,
      draw_y,
      drawImg_w,
      drawImg_h
    );
    setCanvasImgData([...canvasImgData, { ...defaultImgData, type: "IMAGE" }]);
    activeImgSelection.clear();
    activeImgSelection.add(defaultImgData.id);
    setActiveImgSelection(new Set(activeImgSelection));
  };

  const deleteElement = useCallback(() => {
    setCanvasData([
      ...canvasData.filter((data) => {
        if (data.id && activeSelection.has(data.id)) {
          activeSelection.delete(data.id);
          return false;
        }
        return true;
      }),
    ]);
    setActiveSelection(new Set(activeSelection));
    setCanvasImgData([
      ...canvasImgData.filter((data) => {
        if (data.id && activeImgSelection.has(data.id)) {
          activeImgSelection.delete(data.id);
          return false;
        }
        return true;
      }),
    ]);
    setActiveImgSelection(new Set(activeImgSelection));
  }, [activeSelection, canvasData, activeImgSelection, canvasImgData]);

  const selectAllElement = useCallback(() => {
    isSelectAll.current = true;
    canvasData?.map((data, index) =>
      activeSelection.add(data.id || "", `${data.id}-${index}`)
    );
    setActiveSelection(new Set(activeSelection));
  }, [activeSelection, canvasData]);
  const selectAllImgElement = useCallback(() => {
    isSelectAllImg.current = true;
    canvasImgData?.map((data, index) =>
      activeImgSelection.add(data.id || "", `${data.id}-${index}`)
    );
    setActiveImgSelection(new Set(activeImgSelection));
  }, [activeImgSelection, canvasImgData]);

  const context = {
    actions: {
      setCanvasData,
      setActiveSelection,
      updateCanvasData,
      addElement,
      deleteElement,
      setEnableQuillToolbar,
      setCanvasImgData,
      setActiveImgSelection,
      updateCanvasImgData,
      addImageArea,
    },
    state: {
      canvasData,
      activeSelection,
      enableQuillToolbar,
      canvasImgData,
      activeImgSelection,
    },
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Delete") {
        deleteElement();
      } else if (["a", "A"].includes(event.key) && event.ctrlKey) {
        event.preventDefault();
        selectAllElement();
        selectAllImgElement();
      }
    },
    [deleteElement, selectAllElement, selectAllImgElement]
  );

  const outSideClickHandler = () => {
    isSelectAll.current = false;
    isSelectAllImg.current = false;
    setActiveSelection(new Set());
    setActiveImgSelection(new Set());
  };

  const handleMouseDown = useCallback((event) => {
    if (!isSelectAll.current) {
      return;
    }
    if (!isSelectAllImg.current) {
      return;
    }

    outSideClickHandler();
    isSelectAll.current = false;
    isSelectAllImg.current = false;
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [handleKeyDown, handleMouseDown]);

  const saveContainerAsImage = async () => {
    const container = frontRef.current;
    const canvas = await html2canvas(container);
    const blob = await new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/png");
    });
    const uploadData = new FormData();

    uploadData.append("file", blob, "front_image.png");

    await dispatch(Upload(uploadData))
      .then((res) => {
        setCardData((prevCardData) => ({
          ...prevCardData,
          frontUrl: "/uploads/" + res?.image,
        }));
        dispatch(
          updateProduct({ ...cardData, frontUrl: "/uploads/" + res?.image })
        );
      })
      .catch((error) => {
        console.log("Update error");
      });
    setCanvasData([]);
    setCanvasImgData([]);
  };

  const nextHandler = async (e) => {
    e.preventDefault();
    try {
      await outSideClickHandler();
      await saveContainerAsImage();
      if (forGift) {
        history.push(`/design/${id}/middle/forGift`);
      } else {
        history.push(`/design/${id}/middle`);
      }
    } catch (error) {
      console.log(
        "An error occurred while saving the image and updating the product data"
      );
    }
  };

  const resetHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ ...cardData, frontUrl: null }));
    window.location.reload();
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          marginTop: "3vh",
          marginBottom: "2vh",
          // width: isMobile ? "auto" : "400px",
          height: isMobile && "100%",
        }}
        ref={containerRef}
      >
        <CanvasContext.Provider value={context}>
          <Box
            sx={{
              paddingX: "24px",
              height: "60vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="canvas-container">
              <div ref={frontRef} className="print-container">
                {canvasData?.map((canvas, index) => {
                  return <CanvasTextComponent key={index} {...canvas} />;
                })}
                {canvasImgData?.map((canvas, index) => {
                  return (
                    <div key={index}>
                      <CanvasImageComponent {...canvas} />
                      <CanvasBorderComponent {...canvas} />
                    </div>
                  );
                })}
                <img
                  ref={imgRef}
                  src={
                    cardData.frontUrl
                      ? cardData.frontUrl
                      : cardData.blankUrl
                      ? cardData.blankUrl
                      : cardData.imageUrl
                  }
                  alt=""
                  width="auto"
                  height="100%"
                  style={{ zIndex: 0 }}
                />
              </div>
            </div>
          </Box>

          <Box
            sx={{
              paddingX: "24px",
              height: "25vh",
              paddingTop: "3vh",
            }}
          >
            <Stack direction="column" spacing={1}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ paddingX: "12px" }}
              >
                <ImageToolbar isMobile={isMobile} isEnable={cardData.img_w} />
                <TextToolbar
                  isEditEnable={enableQuillToolbar}
                  isEnable={cardData.txt_w}
                  isMobile={isMobile}
                  row
                />
                <Stack
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  spacing={1}
                >
                  <div className="circleBtn" onClick={resetHandler}>
                    <RestartAltIcon fontSize={isMobile ? "medium" : "large"} />
                  </div>
                  <Typography variant="caption" sx={{ color: "#007373" }}>
                    <strong>Reset</strong>
                  </Typography>
                </Stack>
              </Stack>
              <ColorButton
                variant="contained"
                size={isMobile ? "medium" : "large"}
                onClick={nextHandler}
              >
                <span>Next</span>
              </ColorButton>
            </Stack>
          </Box>
        </CanvasContext.Provider>
      </Box>
    </Container>
  );
}
