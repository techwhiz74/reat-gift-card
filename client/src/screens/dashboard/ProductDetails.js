import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { ColorPicker } from "primereact/colorpicker";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Grid,
  TextField,
  Button,
  MenuItem,
  CardMedia,
  InputAdornment,
  Switch,
  useMediaQuery,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";

import {
  createProduct,
  updateProduct,
  listProductDetail,
  Upload,
} from "../../store/actions/productActions";

import { listCategories } from "../../store/actions/categoryActions";
import FilterMultipleSelect from "../../components/admin/FilterMultipleSelect";

export default function ProductDetails(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const isMobile = useMediaQuery("(max-width: 576px");
  const [imgEdit, setImgEdit] = useState(false);
  const [txtEdit, setTxtEdit] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isPreWritten, setIsPreWritten] = useState(false);

  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    category: "",
    price: "0",
    postageFee: "0",
    sales: "0",
    imageUrl: "",
    blankUrl: "",
    preSMSUrl: "",
    description: "",
    trending: false,
    fontName: "",
    fontUrl: "",
    fontColor: "",
    filters: [],
    imagePositions: [0, 0, 0, 0],
    textPositions: [0, 0, 0, 0],
  });

  const [isDrawing, setIsDrawing] = useState(false);
  const [imgStartX, setImgStartX] = useState(0);
  const [imgStartY, setImgStartY] = useState(0);
  const [imgEndX, setImgEndX] = useState(0);
  const [imgEndY, setImgEndY] = useState(0);
  const [txtStartX, setTxtStartX] = useState(0);
  const [txtStartY, setTxtStartY] = useState(0);
  const [txtEndX, setTxtEndX] = useState(0);
  const [txtEndY, setTxtEndY] = useState(0);
  const [rectLeft, setRectLeft] = useState(0);
  const [rectTop, setRectTop] = useState(0);
  const imgRef = useRef(null);

  const { categories } = useSelector((state) => state.categoryList);
  const cardCategories = categories.filter((item) => item.card === true);

  useEffect(() => {
    const image = imgRef.current;
    const { width, height } = image.getBoundingClientRect();
    const rect = image.getBoundingClientRect();
    setRectLeft(rect.left);
    setRectTop(rect.top);

    const handleMouseDown = (event) => {
      setIsDrawing(true);
      const { clientX, clientY } = event.touches ? event.touches[0] : event;
      if (imgEdit) {
        setImgStartX(clientX);
        setImgStartY(clientY);
        const imgX = (((clientX - rect.left) / width) * 100).toFixed(2);
        const imgY = (((clientY - rect.top) / height) * 100).toFixed(2);
        setFormData((prevState) => ({
          ...prevState,
          imagePositions: [
            imgX,
            imgY,
            prevState.imagePositions[2],
            prevState.imagePositions[3],
          ],
        }));
      }
      if (txtEdit) {
        setTxtStartX(clientX);
        setTxtStartY(clientY);
        const txtX = (((clientX - rect.left) / width) * 100).toFixed(2);
        const txtY = (((clientY - rect.top) / height) * 100).toFixed(2);
        setFormData((prevState) => ({
          ...prevState,
          textPositions: [
            txtX,
            txtY,
            prevState.textPositions[2],
            prevState.textPositions[3],
          ],
        }));
      }
    };

    const handleMouseMove = (event) => {
      if (!isDrawing) return;
      const { clientX, clientY } = event.touches ? event.touches[0] : event;

      if (imgEdit) {
        setImgEndX(clientX);
        setImgEndY(clientY);
      }

      if (txtEdit) {
        setTxtEndX(clientX);
        setTxtEndY(clientY);
      }
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
      if (imgEdit) {
        const imgW = ((Math.abs(imgEndX - imgStartX) / width) * 100).toFixed(2);
        const imgH = ((Math.abs(imgEndY - imgStartY) / height) * 100).toFixed(
          2
        );
        setFormData((prevState) => ({
          ...prevState,
          imagePositions: [
            prevState.imagePositions[0],
            prevState.imagePositions[1],
            imgW,
            imgH,
          ],
        }));
        setImgEdit(false);
      } else if (txtEdit) {
        const txtW = ((Math.abs(txtEndX - txtStartX) / width) * 100).toFixed(2);
        const txtH = ((Math.abs(txtEndY - txtStartY) / height) * 100).toFixed(
          2
        );
        setFormData((prevState) => ({
          ...prevState,
          textPositions: [
            prevState.textPositions[0],
            prevState.textPositions[1],
            txtW,
            txtH,
          ],
        }));
        setTxtEdit(false);
      } else {
        document.getElementById("image-upload").click();
      }
    };

    image.addEventListener("mousedown", handleMouseDown);
    image.addEventListener("touchstart", handleMouseDown);
    image.addEventListener("mousemove", handleMouseMove);
    image.addEventListener("touchmove", handleMouseMove);
    image.addEventListener("mouseup", handleMouseUp);
    image.addEventListener("touchend", handleMouseUp);

    return () => {
      image.removeEventListener("mousedown", handleMouseDown);
      image.removeEventListener("touchstart", handleMouseDown);
      image.removeEventListener("mousemove", handleMouseMove);
      image.removeEventListener("touchmove", handleMouseMove);
      image.removeEventListener("mouseup", handleMouseUp);
      image.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDrawing, imgEndX, imgEdit, txtEndX, txtEdit]);

  const getProductDetail = useCallback(
    (id) => {
      dispatch(listProductDetail(id)).then((res) => {
        if (res.data) {
          setFormData({
            _id: res.data._id,
            name: res.data.name,
            category: res.data.category,
            price: parseFloat(res.data.price).toFixed(2),
            postageFee: parseFloat(res.data.postageFee).toFixed(2),
            sales: res.data.sales,
            imageUrl: res.data.imageUrl,
            blankUrl: res.data.blankUrl,
            preSMSUrl: res.data.preSMSUrl,
            description: res.data.description,
            trending: res.data.trending,
            fontName: res.data.fontName,
            fontUrl: res.data.fontUrl,
            fontColor: res.data.fontColor,
            filters: res.data.filters,
            imagePositions: [
              res.data.imagePositions[0],
              res.data.imagePositions[1],
              res.data.imagePositions[2],
              res.data.imagePositions[3],
            ],
            textPositions: [
              res.data.textPositions[0],
              res.data.textPositions[1],
              res.data.textPositions[2],
              res.data.textPositions[3],
            ],
          });
        }
      });
    },
    [dispatch]
  );

  useEffect(() => {
    formData.blankUrl && setIsEditable(true);
    formData.preSMSUrl && setIsPreWritten(true);
  }, [formData]);

  useEffect(() => {
    dispatch(listCategories());
    if (props.method !== "Add") {
      getProductDetail(id);
    }
  }, [dispatch, id, getProductDetail, props.method]);

  const changeImage = (e) => {
    const file = e.target.files[0];
    handleImageSelect(file);
  };
  const handleImageSelect = async (file) => {
    var uploadData = new FormData();
    uploadData.append("file", file);
    await dispatch(Upload(uploadData)).then((res) => {
      setFormData({
        ...formData,
        imageUrl: "/uploads/" + res.image,
      });
    });
  };

  const changeBlankImage = (e) => {
    const file = e.target.files[0];
    handleFrontImageSelect(file);
  };
  const handleFrontImageSelect = async (file) => {
    var frontData = new FormData();
    frontData.append("file", file);
    await dispatch(Upload(frontData)).then((res) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        blankUrl: "/uploads/" + res.image,
      }));
    });
  };

  const changeMiddleImage = (e) => {
    const file = e.target.files[0];
    handleMiddleImageSelect(file);
  };
  const handleMiddleImageSelect = async (file) => {
    var middleData = new FormData();
    middleData.append("file", file);
    await dispatch(Upload(middleData)).then((res) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        preSMSUrl: "/uploads/" + res.image,
      }));
    });
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    if (
      (name === "price" || name === "sales" || name === "postageFee") &&
      value >= 0
    ) {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    } else if (name !== "price" && name !== "sales" && name !== "postageFee") {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const imageSwitch = (event) => {
    setImgEdit(!imgEdit);
    resetImgArea();
  };

  const textSwitch = (event) => {
    setTxtEdit(!txtEdit);
    resetTxtArea();
  };

  const editableSwitch = (event) => {
    setIsEditable(!isEditable);
  };

  const middleSwitch = (event) => {
    setIsPreWritten(!isPreWritten);
  };

  const resetImgArea = () => {
    setFormData((prevData) => ({
      ...prevData,
      imagePositions: [],
    }));
    setImgStartX(0);
    setImgStartY(0);
    setImgEndX(0);
    setImgEndY(0);
  };

  const resetTxtArea = () => {
    setFormData((prevData) => ({
      ...prevData,
      textPositions: [],
    }));
    setTxtStartX(0);
    setTxtStartY(0);
    setTxtEndX(0);
    setTxtEndY(0);
  };

  function onReturn(e) {
    e.preventDefault();
    history.push("/admin/products");
  }

  const handleCheck = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      trending: event.target.checked,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (props.method === "Add") {
      dispatch(createProduct(formData));
    } else {
      dispatch(updateProduct(formData));
    }
    history.push("/admin/products");
  };

  // Font-file upload
  const handleFontUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      var uploadData = new FormData();
      uploadData.append("file", file);
      try {
        dispatch(Upload(uploadData)).then((res) => {
          const fontUrl = "/uploads/" + res.image;
          const newFontName = file.name.split(".")[0];
          loadAndApplyFont(fontUrl, newFontName);
          setFormData({
            ...formData,
            fontName: newFontName,
            fontUrl: fontUrl,
          });
        });
      } catch (error) {
        console.error("Error uploading font:", error);
      }
    }
  };
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
    if (formData.fontUrl) {
      loadAndApplyFont(formData.fontUrl, formData.fontName);
    }
  }, [formData]);

  // FontColor setting
  const [selectedColor, setSelectedColor] = useState("#000000");
  const colorPickerRef = useRef(null);

  return (
    <Box className="admin-container">
      <Stack
        direction="row"
        justifyContent="left"
        alignItems="center"
        spacing={2}
        sx={{ marginBottom: "10px" }}
      >
        <IconButton aria-label="goback" onClick={onReturn}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">
          <strong>
            {props.method} Greeting Card {props.method ? "" : "Details"}
          </strong>
        </Typography>
      </Stack>
      <form onSubmit={submitHandler}>
        <Grid container spacing={4} className="create_panel">
          {isMobile ? null : <Grid item xs={0} md={1}></Grid>}
          <Grid item xs={12} md={4}>
            <Stack direction="column" alignItems="center" spacing={2}>
              <CardMedia
                ref={imgRef}
                className="product_image"
                image={formData.imageUrl}
                title=""
                sx={{
                  display: "flex",
                  justifyContent: " center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                {formData.imageUrl ? null : (
                  <div className="circleBtn">
                    <AddPhotoAlternateOutlinedIcon
                      sx={{ color: "#3168fc" }}
                      fontSize="large"
                    />
                  </div>
                )}
                {imgEndX !== 0 ? (
                  <div
                    style={{
                      position: "absolute",
                      border: "dotted",
                      borderWidth: "3px",
                      borderColor: "aqua",
                      top: `${Math.min(imgStartY, imgEndY) - rectTop}px`,
                      left: `${Math.min(imgStartX, imgEndX) - rectLeft}px`,
                      width: `${Math.abs(imgEndX - imgStartX)}px`,
                      height: `${Math.abs(imgEndY - imgStartY)}px`,
                    }}
                  />
                ) : null}
                {txtEndX !== 0 ? (
                  <div
                    style={{
                      position: "absolute",
                      border: "dotted",
                      borderWidth: "3px",
                      borderColor: "red",
                      top: `${Math.min(txtStartY, txtEndY) - rectTop}px`,
                      left: `${Math.min(txtStartX, txtEndX) - rectLeft}px`,
                      width: `${Math.abs(txtEndX - txtStartX)}px`,
                      height: `${Math.abs(txtEndY - txtStartY)}px`,
                    }}
                  />
                ) : null}
              </CardMedia>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="image-upload"
                type="file"
                onChange={changeImage}
              />
              <TextField
                id="imageUrl"
                label="Card Image"
                value={formData.imageUrl}
                name="imgageUrl"
                InputProps={{
                  readOnly: true,
                }}
                sx={{ display: "none" }}
                variant="standard"
              />
              <div className="row">
                <>
                  <Button
                    variant={imgEdit ? "contained" : "outlined"}
                    color={imgEdit ? "primary" : "inherit"}
                    onClick={imageSwitch}
                    size="small"
                    sx={{ borderRadius: "25px" }}
                  >
                    <span>Image Area</span>
                  </Button>
                  <IconButton
                    color="inherit"
                    onClick={() => {
                      resetImgArea();
                      setImgEdit(false);
                    }}
                  >
                    <RestartAltIcon />
                  </IconButton>
                </>
                <>
                  <Button
                    variant={txtEdit ? "contained" : "outlined"}
                    color={txtEdit ? "primary" : "inherit"}
                    onClick={textSwitch}
                    size="small"
                    sx={{ borderRadius: "25px" }}
                  >
                    <span>Text Area</span>
                  </Button>
                  <IconButton
                    color="inherit"
                    onClick={() => {
                      resetTxtArea();
                      setTxtEdit(false);
                    }}
                  >
                    <RestartAltIcon />
                  </IconButton>
                </>
              </div>
              <div className="row">
                <Switch checked={isEditable} onChange={editableSwitch} />
                <Button
                  variant="outlined"
                  size="small"
                  disabled={isEditable ? false : true}
                  sx={{ width: "145px" }}
                >
                  Editable Card
                </Button>
              </div>
              {isEditable ? (
                <>
                  <CardMedia
                    className="product_image"
                    image={formData.blankUrl}
                    title=""
                    onClick={
                      props.method
                        ? () => document.getElementById("front-upload").click()
                        : null
                    }
                    sx={{
                      display: "flex",
                      justifyContent: " center",
                      alignItems: "center",
                    }}
                  >
                    {formData.blankUrl ? null : (
                      <div className="circleBtn">
                        <AddPhotoAlternateOutlinedIcon
                          sx={{ color: "#3168fc" }}
                          fontSize="large"
                        />
                      </div>
                    )}
                  </CardMedia>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="front-upload"
                    type="file"
                    onChange={changeBlankImage}
                  />
                </>
              ) : null}
              <div className="row">
                <Switch checked={isPreWritten} onChange={middleSwitch} />
                <Button
                  variant="outlined"
                  size="small"
                  disabled={isPreWritten ? false : true}
                  sx={{ width: "145px" }}
                >
                  Prewritten Page
                </Button>
              </div>
              {isPreWritten ? (
                <>
                  <CardMedia
                    className="product_image"
                    image={formData.preSMSUrl}
                    title=""
                    onClick={
                      props.method
                        ? () => document.getElementById("middle-upload").click()
                        : null
                    }
                    sx={{
                      display: "flex",
                      justifyContent: " center",
                      alignItems: "center",
                    }}
                  >
                    {formData.preSMSUrl ? null : (
                      <div className="circleBtn">
                        <AddPhotoAlternateOutlinedIcon
                          sx={{ color: "#3168fc" }}
                          fontSize="large"
                        />
                      </div>
                    )}
                  </CardMedia>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="middle-upload"
                    type="file"
                    onChange={changeMiddleImage}
                  />
                </>
              ) : null}
            </Stack>
          </Grid>
          {isMobile ? null : <Grid item xs={0} md={1}></Grid>}
          <Grid item xs={12} md={5}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="stretch"
              spacing={2}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.trending === true}
                    onChange={handleCheck}
                  />
                }
                label="Trending Card"
              />
              <TextField
                label="Card Name"
                variant="outlined"
                name="name"
                placeholder="Enter card name"
                value={formData.name}
                InputProps={{
                  readOnly: props.method ? false : true,
                }}
                required
                fullWidth
                onChange={(e) => onChange(e)}
              />
              <TextField
                label="Price"
                variant="outlined"
                type="number"
                name="price"
                placeholder="Enter price"
                required
                InputProps={{
                  readOnly: props.method ? false : true,
                  startAdornment: (
                    <InputAdornment position="start">£</InputAdornment>
                  ),
                }}
                value={formData.price}
                fullWidth
                onChange={(e) => onChange(e)}
              />
              <TextField
                label="Postage"
                variant="outlined"
                type="number"
                name="postageFee"
                placeholder="Enter postage"
                required
                InputProps={{
                  readOnly: props.method ? false : true,
                  startAdornment: (
                    <InputAdornment position="start">£</InputAdornment>
                  ),
                }}
                value={formData.postageFee}
                fullWidth
                onChange={(e) => onChange(e)}
              />
              <TextField
                label="Sales"
                variant="outlined"
                type="number"
                name="sales"
                placeholder="Number of saled greeting cards"
                required
                InputProps={{
                  readOnly: props.method ? false : true,
                }}
                value={formData.sales}
                fullWidth
                onChange={(e) => onChange(e)}
              />
              <TextField
                select
                fullWidth
                name="category"
                label="Category"
                value={formData.category}
                required
                InputProps={{
                  readOnly: props.method ? false : true,
                }}
                onChange={(e) => onChange(e)}
              >
                {cardCategories.map((option, index) => (
                  <MenuItem key={index} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>

              <FilterMultipleSelect
                onChange={(e) => onChange(e)}
                value={formData.filters}
              />

              <TextField
                variant="outlined"
                label="Description"
                name="description"
                multiline
                fullWidth
                InputProps={{
                  readOnly: props.method ? false : true,
                }}
                rows={4}
                placeholder="Write card description"
                value={formData.description}
                onChange={(e) => onChange(e)}
              />

              {/* Font-family uploading and color picker */}
              {formData.textPositions[2] !== 0 || formData.fontName ? (
                <>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <input
                      accept=".ttf,.otf"
                      style={{ display: "none" }}
                      id="font-upload"
                      type="file"
                      onChange={handleFontUpload}
                    />
                    <Typography
                      variant="h6"
                      style={{ fontFamily: `${formData.fontName}, sans-serif` }}
                    >
                      <strong>Font Family: </strong> {formData.fontName}
                    </Typography>
                    {props.method && (
                      <label htmlFor="font-upload">
                        <IconButton
                          variant="contained"
                          color="primary"
                          component="span"
                        >
                          <AddBoxOutlinedIcon sx={{ fontSize: "26px" }} />
                        </IconButton>
                      </label>
                    )}
                    <TextField
                      id=""
                      label="Font-family"
                      value={formData.fontName}
                      name="fontName"
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ display: "none" }}
                      variant="standard"
                    />
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h6">
                      <strong>Font Color:</strong>
                    </Typography>
                    <div ref={colorPickerRef} style={{ marginRight: "5px" }}>
                      <ColorPicker
                        value={selectedColor}
                        onChange={(e) => {
                          setFormData({ ...formData, fontColor: e.value });
                        }}
                        appendTo={colorPickerRef.current}
                        position="bottom-right"
                      />
                    </div>
                  </Stack>
                </>
              ) : null}

              {props.method && (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    borderRadius: "10px",
                  }}
                  startIcon={<SaveIcon />}
                >
                  Save
                </Button>
              )}
            </Stack>
          </Grid>
          {isMobile ? null : <Grid item xs={0} md={1}></Grid>}
        </Grid>
      </form>
    </Box>
  );
}
