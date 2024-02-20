import React, { useCallback, useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import html2canvas from "html2canvas";

import {
  Button,
  Stack,
  Container,
  Box,
  Typography,
  useMediaQuery,
  styled,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import GiftCanvasComponent from "./giftdesign/GiftCanvasComponent";
import GiftSubCanvasComponent from "./giftdesign/GiftSubCanvasComponent";
import GiftTextToolbar from "./giftdesign/GiftTextToolbar";
import GiftSubTextToolbar from "./giftdesign/GiftSubTextToolbar";

import {
  listSupplementDetail,
  updateSupplement,
} from "../store/actions/supplementActions";
import { giftToCart } from "../store/actions/cartActions";
import { Upload } from "../store/actions/productActions";

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
      height: "auto",
    },
    content: message,
    size: size,
    fontName: fontName,
    fontColor: fontColor,
  };
};
const getInitialSubText = (
  data,
  drawSubTxt_x,
  drawSubTxt_y,
  subTxt_w,
  subTxt_h,
  message,
  size,
  fontName,
  fontColor
) => {
  return {
    type: "Text",
    id: `"Text"__${Date.now()}__${data?.length}`,
    position: {
      top: drawSubTxt_y,
      left: drawSubTxt_x,
    },
    dimension: {
      width: subTxt_w + "%",
      height: "auto",
    },
    content: message,
    size: size,
    fontName: fontName,
    fontColor: fontColor,
  };
};

export const CanvasContext = React.createContext({});

export default function GiftCardCanvas() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { productId, id, amount, fee, prevData } = useParams();
  const isMobile = useMediaQuery("(max-width: 576px");

  const [drawTxt_x, setDrawTxtX] = useState(0);
  const [drawTxt_y, setDrawTxtY] = useState(0);
  const [message, setMessage] = useState("Write Here");
  const [fontSize, setFontSize] = useState("18px");
  const [drawSubTxt_x, setDrawSubTxtX] = useState(0);
  const [drawSubTxt_y, setDrawSubTxtY] = useState(0);
  const [subMessage, setSubMessage] = useState("Here...");
  const [subFontSize, setSubFontSize] = useState("14px");

  const [cardData, setCardData] = useState({});
  const getSupplementDetail = useCallback(
    (id) => {
      dispatch(listSupplementDetail(id)).then((res) => {
        if (res.data) {
          setCardData({
            _id: res.data._id,
            imageUrl: res.data.imageUrl,
            blankUrl: res.data.blankUrl,
            frontUrl: res.data.frontUrl,
            occasion: res.data.occasion,
            fontName: res.data.fontName,
            fontUrl: res.data.fontUrl,
            fontColor: res.data.fontColor,
            txt_x: res.data.textPositions[0],
            txt_y: res.data.textPositions[1],
            txt_w: res.data.textPositions[2],
            txt_h: res.data.textPositions[3],
            subTxt_x: res.data.subTextPositions[0],
            subTxt_y: res.data.subTextPositions[1],
            subTxt_w: res.data.subTextPositions[2],
            subTxt_h: res.data.subTextPositions[3],
          });
        }
      });
    },
    [dispatch]
  );

  useEffect(() => {
    getSupplementDetail(id);
  }, [dispatch, id, getSupplementDetail]);

  const [canvasData, setCanvasData] = useState([]);
  const [subCanvasData, setSubCanvasData] = useState([]);
  const [activeSelection, setActiveSelection] = useState(new Set());
  const [activeSubSelection, setActiveSubSelection] = useState(new Set());
  const [enableQuillToolbar, setEnableQuillToolbar] = useState(false);

  const containerRef = useRef(null);
  const frontRef = useRef(null);
  const imgRef = useRef(null);
  const isSelectAll = useRef(false);
  const isSelectAllSub = useRef(false);

  useEffect(() => {
    const image = imgRef.current;
    const { width, height } = image.getBoundingClientRect();
    setDrawTxtX((width * cardData.txt_x) / 100);
    setDrawTxtY((height * cardData.txt_y) / 100);
    setDrawSubTxtX((width * cardData.subTxt_x) / 100);
    setDrawSubTxtY((height * cardData.subTxt_y) / 100);
    if (width > 400) {
      setFontSize("24px");
      setSubFontSize("18px");
    }
  }, [cardData.txt_x, cardData.txt_y, cardData.subTxt_x, cardData.subTxt_y]);

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

  const updateCanvasData = (data) => {
    const currentDataIndex =
      canvasData.findIndex((canvas) => canvas.id === data.id) ?? -1;
    const updatedData = { ...canvasData?.[currentDataIndex], ...data };
    canvasData.splice(currentDataIndex, 1, updatedData);
    setCanvasData([...(canvasData || [])]);
  };
  const updateSubCanvasData = (data) => {
    const currentDataIndex =
      subCanvasData.findIndex((canvas) => canvas.id === data.id) ?? -1;
    const updatedData = { ...subCanvasData?.[currentDataIndex], ...data };
    subCanvasData.splice(currentDataIndex, 1, updatedData);
    setSubCanvasData([...(subCanvasData || [])]);
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
    setActiveSelection(new Set(activeSelection));
  };
  const addSubElement = (type) => {
    const defaultData = getInitialSubText(
      subCanvasData,
      drawSubTxt_x,
      drawSubTxt_y,
      cardData.subTxt_w,
      cardData.subTxt_h,
      subMessage,
      subFontSize,
      cardData.fontName,
      cardData.fontColor
    );
    setSubCanvasData([...subCanvasData, { ...defaultData, type: "TEXT" }]);
    activeSubSelection.clear();
    // activeSubSelection.add(defaultData.id);
    setActiveSubSelection(new Set(activeSubSelection));
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
    setSubCanvasData([
      ...subCanvasData.filter((data) => {
        if (data.id && activeSubSelection.has(data.id)) {
          activeSubSelection.delete(data.id);
          return false;
        }
        return true;
      }),
    ]);
    setActiveSubSelection(new Set(activeSubSelection));
  }, [activeSelection, canvasData, activeSubSelection, subCanvasData]);

  const selectAllElement = useCallback(() => {
    isSelectAll.current = true;
    canvasData?.map((data, index) =>
      activeSelection.add(data.id || "", `${data.id}-${index}`)
    );
    setActiveSelection(new Set(activeSelection));
  }, [activeSelection, canvasData]);
  const selectAllSubElement = useCallback(() => {
    isSelectAllSub.current = true;
    subCanvasData?.map((data, index) =>
      activeSubSelection.add(data.id || "", `${data.id}-${index}`)
    );
    setActiveSubSelection(new Set(activeSubSelection));
  }, [activeSubSelection, subCanvasData]);

  const context = {
    actions: {
      setCanvasData,
      setActiveSelection,
      updateCanvasData,
      addElement,
      deleteElement,
      setEnableQuillToolbar,
      setSubCanvasData,
      setActiveSubSelection,
      updateSubCanvasData,
      addSubElement,
    },
    state: {
      canvasData,
      activeSelection,
      enableQuillToolbar,
      subCanvasData,
      activeSubSelection,
    },
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Delete") {
        deleteElement();
      } else if (["a", "A"].includes(event.key) && event.ctrlKey) {
        event.preventDefault();
        selectAllElement();
        selectAllSubElement();
      }
    },
    [deleteElement, selectAllElement, selectAllSubElement]
  );

  const outSideClickHandler = () => {
    isSelectAll.current = false;
    isSelectAllSub.current = false;
    setActiveSelection(new Set());
    setActiveSubSelection(new Set());
  };

  const handleMouseDown = useCallback((event) => {
    if (!isSelectAll.current) {
      return;
    }
    if (!isSelectAllSub.current) {
      return;
    }

    outSideClickHandler();
    isSelectAll.current = false;
    isSelectAllSub.current = false;
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
          updateSupplement({ ...cardData, frontUrl: "/uploads/" + res?.image })
        );
      })
      .catch((error) => {
        console.log("Update error");
      });
    setCanvasData([]);
    setSubCanvasData([]);
  };

  const toSupplement = () => {
    if (productId !== "undefined") {
      if (prevData) {
        history.push(`/addgift/${productId}/${prevData},${id}`);
      } else {
        history.push(`/addgift/${productId}/${id}`);
      }
    } else {
      history.push(`/addcard/${cardData.occasion}/1`);
    }
  };

  const addCartHandler = async (e) => {
    e.preventDefault();
    try {
      await outSideClickHandler();
      await saveContainerAsImage();
      dispatch(giftToCart(id, 1, parseFloat(amount), parseFloat(fee)));
      toSupplement();
    } catch (error) {
      console.log(
        "An error occurred while saving the image and updating the gift card data"
      );
    }
  };

  const resetHandler = (e) => {
    e.preventDefault();
    dispatch(updateSupplement({ ...cardData, frontUrl: null }));
    window.location.reload();
  };

  function onReturn(e) {
    e.preventDefault();
    history.goBack();
  }

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          marginTop: "8vh",
          marginBottom: "3vh",
          // width: isMobile ? "100%" : "50%",
        }}
        ref={containerRef}
      >
        <CanvasContext.Provider value={context}>
          <Stack
            direction="column"
            alignItems="stretch"
            spacing={8}
            sx={{ height: "100%" }}
          >
            <Box>
              <div
                id="canvas-container"
                className="giftcanvas-container"
                style={{ position: "relative" }}
              >
                <div ref={frontRef} className="giftprint-container">
                  {canvasData?.map((canvas, index) => {
                    return <GiftCanvasComponent key={index} {...canvas} />;
                  })}
                  {subCanvasData?.map((subCanvas, index) => {
                    return (
                      <GiftSubCanvasComponent key={index} {...subCanvas} />
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
                    width="100%"
                    height="100%"
                    style={{ zIndex: 0 }}
                  />
                </div>
              </div>
            </Box>
            <Box sx={{ paddingX: "5%" }}>
              <Stack direction="column" spacing={2}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                  sx={{ marginTop: "20px" }}
                >
                  <Stack direction="column" alignItems="center" spacing={1}>
                    <div className="circleBtn" onClick={onReturn}>
                      <ArrowBackOutlinedIcon
                        fontSize={isMobile ? "medium" : "large"}
                      />
                    </div>
                    <Typography variant="caption" sx={{ color: "#007373" }}>
                      <strong>Back</strong>
                    </Typography>
                  </Stack>

                  <GiftTextToolbar
                    isEditEnable={enableQuillToolbar}
                    isEnable={cardData.txt_w}
                    isMobile={isMobile}
                  />
                  <GiftSubTextToolbar
                    isEditEnable={enableQuillToolbar}
                    isEnable={cardData.subTxt_w}
                    isMobile={isMobile}
                  />

                  <Stack direction="column" alignItems="center" spacing={1}>
                    <div className="circleBtn" onClick={resetHandler}>
                      <RestartAltIcon
                        fontSize={isMobile ? "medium" : "large"}
                      />
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
                  <span>Add To Basket</span>
                </ColorButton>
              </Stack>
            </Box>
          </Stack>
        </CanvasContext.Provider>
      </Box>
    </Container>
  );
}
