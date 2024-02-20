import React, { useCallback, useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import html2canvas from "html2canvas";

import {
  Button,
  Container,
  Box,
  Stack,
  useMediaQuery,
  Typography,
  styled,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import CanvasMiddleComponent from "./personalize/CanvasMiddleComponent";
import MiddleToolbar from "./personalize/MiddleToolbar";

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

const getInitialData = (
  data,
  drawTxt_x,
  drawTxt_y,
  blank,
  message,
  size,
  fontName
) => {
  const position = blank
    ? { top: 0, left: 0 }
    : { top: drawTxt_y, left: drawTxt_x };
  const dimension = blank
    ? { width: "100%", height: "100%" }
    : { width: "80%", height: "20%" };
  return {
    type: "TEXT",
    id: `"TEXT"__${Date.now()}__${data?.length}`,
    position,
    dimension,
    content: message,
    size: size,
    fontName: fontName,
    blank: blank,
  };
};

export const CanvasContext = React.createContext({});

export default function CanvasMiddleContainer() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id, forGift } = useParams();
  const isMobile = useMediaQuery("(max-width: 576px");
  const [blank, setBlank] = useState();

  const [cardData, setCardData] = useState({});
  const getProductDetail = useCallback(
    (id) => {
      dispatch(listProductDetail(id))
        .then((res) => {
          if (res.data) {
            setCardData({
              _id: res.data._id,
              middleUrl: res.data.middleUrl,
              preSMSUrl: res.data.preSMSUrl,
              fontName: res.data.fontName,
              fontUrl: res.data.fontUrl,
            });
            setBlank(res.data.preSMSUrl ? false : true);
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

  const [drawTxt_x, setDrawTxtX] = useState(0);
  const [drawTxt_y, setDrawTxtY] = useState(0);
  const [fontSize, setFontSize] = useState("18px");
  const [message, setMessage] = useState("Write Here");

  const [canvasData, setCanvasData] = useState([]);
  const [activeSelection, setActiveSelection] = useState(new Set());
  const [enableQuillToolbar, setEnableQuillToolbar] = useState(false);

  const containerRef = useRef(null);
  const middleRef = useRef(null);
  const isSelectAll = useRef(false);

  useEffect(() => {
    const container = middleRef.current;
    const { width, height } = container.getBoundingClientRect();
    setDrawTxtX(width * 0.1);
    setDrawTxtY(height * 0.7);
    if (width > 400) {
      setFontSize("24px");
    }
  }, []);

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

  // CanvasData for text
  const updateCanvasData = (data) => {
    const currentDataIndex =
      canvasData.findIndex((canvas) => canvas.id === data.id) ?? -1;
    const updatedData = { ...canvasData?.[currentDataIndex], ...data };
    canvasData.splice(currentDataIndex, 1, updatedData);
    setCanvasData([...(canvasData || [])]);
  };

  const addElement = (type) => {
    const defaultData = getInitialData(
      canvasData,
      drawTxt_x,
      drawTxt_y,
      blank,
      message,
      fontSize,
      cardData.fontName
    );
    setCanvasData([...canvasData, { ...defaultData, type: "TEXT" }]);
    activeSelection.clear();
    // activeSelection.add(defaultData.id);
    setActiveSelection(new Set(activeSelection));
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
  }, [activeSelection, canvasData]);

  const selectAllElement = useCallback(() => {
    isSelectAll.current = true;
    canvasData?.map((data, index) =>
      activeSelection.add(data.id || "", `${data.id}-${index}`)
    );
    setActiveSelection(new Set(activeSelection));
  }, [activeSelection, canvasData]);

  const context = {
    actions: {
      setCanvasData,
      setActiveSelection,
      updateCanvasData,
      addElement,
      setEnableQuillToolbar,
    },
    state: {
      canvasData,
      activeSelection,
      enableQuillToolbar,
    },
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Delete") {
        deleteElement();
      } else if (["a", "A"].includes(event.key) && event.ctrlKey) {
        event.preventDefault();
        selectAllElement();
      }
    },
    [deleteElement, selectAllElement]
  );

  const outSideClickHandler = () => {
    isSelectAll.current = false;
    setActiveSelection(new Set());
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const choiceHandler = (index) => {
    setBlank(index);
  };

  const saveContainerAsImage = async () => {
    const container = middleRef.current;
    const canvas = await html2canvas(container);
    const blob = await new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/png");
    });
    const uploadData = new FormData();

    uploadData.append("file", blob, "middle_image.png");

    await dispatch(Upload(uploadData)).then((res) => {
      setCardData((prevCardData) => ({
        ...prevCardData,
        middleUrl: "/uploads/" + res.image,
      }));
      dispatch(
        updateProduct({ ...cardData, middleUrl: "/uploads/" + res.image })
      );
    });
    setCanvasData([]);
  };

  const addCartHandler = () => {
    saveContainerAsImage();
    if (forGift) {
      history.push(`/cart/${id}`);
    } else {
      history.push(`/addgift/${id}`);
    }
  };

  const resetHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ ...cardData, middleUrl: null }));
    window.location.reload();
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          marginTop: "3vh",
          marginBottom: "2vh",
          // width: isMobile ? "auto" : "40%",
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
              <div ref={middleRef} className="print-container">
                {canvasData?.map((canvas, index) => {
                  return <CanvasMiddleComponent key={index} {...canvas} />;
                })}
                <img
                  src={
                    blank ? "/assets/cards/blankpage.png" : cardData.preSMSUrl
                  }
                  alt=""
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </Box>
          <Box sx={{ paddingX: "24px", height: "25vh", paddingTop: "3vh" }}>
            <Stack direction="column" spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="column" alignItems="center" spacing={1}>
                  <div
                    className={
                      cardData.preSMSUrl ? "circleBtn" : "circleBtnDisable"
                    }
                    onClick={() => cardData.preSMSUrl && choiceHandler(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: isMobile ? "41px" : "51px",
                      height: isMobile ? "41px" : "51px",
                    }}
                  >
                    <img
                      alt=""
                      src="/assets/icons/pre_filled_icon.png"
                      width={isMobile ? "18px" : "27px"}
                    />
                  </div>
                  <Typography
                    variant="caption"
                    sx={{
                      color: cardData.preSMSUrl
                        ? "#007373"
                        : "rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    <strong>Pre-Filled</strong>
                  </Typography>
                </Stack>
                <Stack direction="column" alignItems="center" spacing={1}>
                  <div
                    className="circleBtn"
                    onClick={() => choiceHandler(true)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: isMobile ? "41px" : "51px",
                      height: isMobile ? "41px" : "51px",
                    }}
                  >
                    <img
                      alt=""
                      src="/assets/icons/blank_icon.png"
                      width={isMobile ? "18px" : "27px"}
                    />
                  </div>
                  <Typography variant="caption" sx={{ color: "#007373" }}>
                    <strong>Blank</strong>
                  </Typography>
                </Stack>
                <MiddleToolbar
                  isEditEnable={enableQuillToolbar}
                  preWritten={cardData.preSMSUrl}
                  isMobile={isMobile}
                />
                <Stack direction="column" alignItems="center" spacing={1}>
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
                fullWidth
                onClick={addCartHandler}
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
