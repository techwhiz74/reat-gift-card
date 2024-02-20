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
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";

import GiftOccasionMultiSelect from "../../components/admin/GiftOccasionMultiSelect";

import {
  createSupplement,
  updateSupplement,
  listSupplementDetail,
  Upload,
} from "../../store/actions/supplementActions";

import { listCategories } from "../../store/actions/categoryActions";

export default function SupplementDetails(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [txtEdit, setTxtEdit] = useState(false);
  const [subTxtEdit, setSubTxtEdit] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    category: "",
    occasion: [],
    price: "",
    shipping: "",
    imageUrl: "",
    blankUrl: "",
    fontName: "",
    fontUrl: "",
    fontColor: "",
    reviews: "",
    description: "",
    popular: false,
    textPositions: [0, 0, 0, 0],
    subTextPositions: [0, 0, 0, 0],
  });

  const [isDrawing, setIsDrawing] = useState(false);
  const [txtStartX, setTxtStartX] = useState(0);
  const [txtStartY, setTxtStartY] = useState(0);
  const [txtEndX, setTxtEndX] = useState(0);
  const [txtEndY, setTxtEndY] = useState(0);
  const [subTxtStartX, setSubTxtStartX] = useState(0);
  const [subTxtStartY, setSubTxtStartY] = useState(0);
  const [subTxtEndX, setSubTxtEndX] = useState(0);
  const [subTxtEndY, setSubTxtEndY] = useState(0);
  const [rectLeft, setRectLeft] = useState(0);
  const [rectTop, setRectTop] = useState(0);
  const imgRef = useRef(null);

  const { categories } = useSelector((state) => state.categoryList);
  const occasions = categories.filter((item) => item.card === true);
  const gift_sorts = categories.filter((item) => item.card === false);

  const handleCheck = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      category: event.target.checked ? "Gift Card" : "",
    }));
  };

  const popularCheck = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      popular: event.target.checked,
    }));
  };

  useEffect(() => {
    const image = imgRef.current;
    const { width, height } = image.getBoundingClientRect();
    const rect = image.getBoundingClientRect();
    setRectLeft(rect.left);
    setRectTop(rect.top);

    const handleMouseDown = (event) => {
      setIsDrawing(true);
      const { clientX, clientY } = event.touches ? event.touches[0] : event;
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
      if (subTxtEdit) {
        setSubTxtStartX(clientX);
        setSubTxtStartY(clientY);
        const subTxtX = (((clientX - rect.left) / width) * 100).toFixed(2);
        const subTxtY = (((clientY - rect.top) / height) * 100).toFixed(2);
        setFormData((prevState) => ({
          ...prevState,
          subTextPositions: [
            subTxtX,
            subTxtY,
            prevState.subTextPositions[2],
            prevState.subTextPositions[3],
          ],
        }));
      }
    };

    const handleMouseMove = (event) => {
      if (!isDrawing) return;
      const { clientX, clientY } = event.touches ? event.touches[0] : event;
      if (txtEdit) {
        setTxtEndX(clientX);
        setTxtEndY(clientY);
      }
      if (subTxtEdit) {
        setSubTxtEndX(clientX);
        setSubTxtEndY(clientY);
      }
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
      if (txtEdit) {
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
      } else if (subTxtEdit) {
        const subTxtW = (
          (Math.abs(subTxtEndX - subTxtStartX) / width) *
          100
        ).toFixed(2);
        const subTxtH = (
          (Math.abs(subTxtEndY - subTxtStartY) / height) *
          100
        ).toFixed(2);
        setFormData((prevState) => ({
          ...prevState,
          subTextPositions: [
            prevState.subTextPositions[0],
            prevState.subTextPositions[1],
            subTxtW,
            subTxtH,
          ],
        }));
        setSubTxtEdit(false);
      } else {
        document.getElementById("gift-upload").click();
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
  }, [isDrawing, txtEndX, txtEdit, subTxtEndX, subTxtEdit]);

  const getSupplementDetail = useCallback(
    (id) => {
      dispatch(listSupplementDetail(id)).then((res) => {
        if (res.data) {
          setFormData({
            _id: res.data._id,
            name: res.data.name,
            category: res.data.category,
            occasion: res.data.occasion,
            price: parseFloat(res.data.price).toFixed(2),
            shipping: parseFloat(res.data.shipping).toFixed(2),
            imageUrl: res.data.imageUrl,
            blankUrl: res.data.blankUrl,
            description: res.data.description,
            popular: res.data.popular,
            fontName: res.data.fontName,
            fontUrl: res.data.fontUrl,
            fontColor: res.data.fontColor,
            reviews: res.data.reviews,
            textPositions: [
              res.data.textPositions[0],
              res.data.textPositions[1],
              res.data.textPositions[2],
              res.data.textPositions[3],
            ],
            subTextPositions: [
              res.data.subTextPositions[0],
              res.data.subTextPositions[1],
              res.data.subTextPositions[2],
              res.data.subTextPositions[3],
            ],
          });
        }
      });
    },
    [dispatch]
  );

  useEffect(() => {
    formData.blankUrl && setIsEditable(true);
  }, [formData]);

  useEffect(() => {
    dispatch(listCategories());
    if (props.method !== "Add") {
      getSupplementDetail(id);
    }
  }, [dispatch, id, getSupplementDetail, props.method]);

  // Generate a random integer
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const randomInt = getRandomInt(300, 700);
  useEffect(() => {
    if (props.method === "Add") {
      setFormData({
        ...formData,
        reviews: randomInt,
      });
    }
  }, []);

  // GiftImage upload
  const changeImage = (e) => {
    const file = e.target.files[0];
    handleImageSelect(file);
  };
  const handleImageSelect = async (file) => {
    if (file) {
      var uploadData = new FormData();
      uploadData.append("file", file);
      await dispatch(Upload(uploadData)).then((res) => {
        setFormData({
          ...formData,
          imageUrl: "/uploads/" + res.image,
        });
      });
    }
  };

  const changeBlankImage = (e) => {
    const file = e.target.files[0];
    handleBlankImageSelect(file);
  };
  const handleBlankImageSelect = async (file) => {
    if (file) {
      var frontData = new FormData();
      frontData.append("file", file);
      await dispatch(Upload(frontData)).then((res) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          blankUrl: "/uploads/" + res.image,
        }));
      });
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    if ((name === "price" || name === "sales") && value >= 0) {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    } else if (name !== "price" && name !== "sales") {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const editableSwitch = () => {
    setIsEditable(!isEditable);
  };

  const textSwitch = () => {
    setTxtEdit(!txtEdit);
    resetTxtArea();
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

  const subTextSwitch = () => {
    setSubTxtEdit(!txtEdit);
    resetSubTxtArea();
  };

  const resetSubTxtArea = () => {
    setFormData((prevData) => ({
      ...prevData,
      subTextPositions: [],
    }));
    setSubTxtStartX(0);
    setSubTxtStartY(0);
    setSubTxtEndX(0);
    setSubTxtEndY(0);
  };

  function onReturn(e) {
    e.preventDefault();
    history.push("/admin/products");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (props.method === "Add") {
      dispatch(createSupplement(formData));
    } else {
      dispatch(updateSupplement(formData));
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
            {props.method} Suggested Product {props.method ? "" : "Details"}
          </strong>
        </Typography>
      </Stack>
      <form onSubmit={submitHandler}>
        <Grid container spacing={4} className="create_panel">
          <Grid item xs={12} sm={12} md={5}>
            <Stack direction="column" alignItems="center" spacing={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.category === "Gift Card"}
                    onChange={handleCheck}
                  />
                }
                label="Gift Card"
              />
              <CardMedia
                ref={imgRef}
                title="gifts"
                className="gift_image"
                image={formData.imageUrl}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  aspectRatio:
                    formData.category === "Gift Card" ? "152/100" : "1",
                  maxWidth: formData.category === "Gift Card" ? "95%" : "75%",
                  width: formData.category === "Gift Card" ? "400px" : "330px",
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
                {subTxtEndX !== 0 ? (
                  <div
                    style={{
                      position: "absolute",
                      border: "dotted",
                      borderWidth: "3px",
                      borderColor: "aqua",
                      top: `${Math.min(subTxtStartY, subTxtEndY) - rectTop}px`,
                      left: `${
                        Math.min(subTxtStartX, subTxtEndX) - rectLeft
                      }px`,
                      width: `${Math.abs(subTxtEndX - subTxtStartX)}px`,
                      height: `${Math.abs(subTxtEndY - subTxtStartY)}px`,
                    }}
                  />
                ) : null}
              </CardMedia>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="gift-upload"
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
              {formData.category === "Gift Card" ? (
                <>
                  <Stack direction="row">
                    <Button
                      variant={txtEdit ? "contained" : "outlined"}
                      color={txtEdit ? "primary" : "inherit"}
                      onClick={textSwitch}
                      size="small"
                      sx={{ borderRadius: "25px" }}
                    >
                      <span>Setting Text Area</span>
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
                  </Stack>
                  <Stack direction="row">
                    <Button
                      variant={subTxtEdit ? "contained" : "outlined"}
                      color={subTxtEdit ? "primary" : "inherit"}
                      onClick={subTextSwitch}
                      size="small"
                      sx={{ borderRadius: "25px" }}
                    >
                      <span>Setting Subtext Area</span>
                    </Button>
                    <IconButton
                      color="inherit"
                      onClick={() => {
                        resetSubTxtArea();
                        setSubTxtEdit(false);
                      }}
                    >
                      <RestartAltIcon />
                    </IconButton>
                  </Stack>
                </>
              ) : null}

              {formData.category === "Gift Card" ? (
                <div className="row">
                  <Switch checked={isEditable} onChange={editableSwitch} />
                  <Button
                    variant="outlined"
                    size="small"
                    disabled={isEditable ? false : true}
                  >
                    Editable Gift Card
                  </Button>
                </div>
              ) : null}
              {isEditable ? (
                <>
                  <CardMedia
                    className="gift_image"
                    image={formData.blankUrl}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      maxWidth:
                        formData.category === "Gift Card" ? "95%" : "75%",
                      width:
                        formData.category === "Gift Card" ? "400px" : "330px",
                      aspectRatio:
                        formData.category === "Gift Card" ? "152/100" : "1",
                    }}
                    onClick={() =>
                      document.getElementById("front-upload").click()
                    }
                    title=""
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
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="stretch"
              spacing={3}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.popular === true}
                    onChange={popularCheck}
                  />
                }
                label="Popular Gift"
              />
              <TextField
                label="Gift Name"
                variant="outlined"
                name="name"
                placeholder="Enter gift name"
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
                  readOnly:
                    formData.category === "Gift Card" || !props.method
                      ? true
                      : false,
                  startAdornment: (
                    <InputAdornment position="start">£</InputAdornment>
                  ),
                }}
                value={formData.category === "Gift Card" ? 0 : formData.price}
                fullWidth
                onChange={(e) => onChange(e)}
              />
              <TextField
                label="Shipping Cost"
                variant="outlined"
                type="number"
                name="shipping"
                placeholder="Shipping cost"
                required
                InputProps={{
                  readOnly:
                    formData.category === "Gift Card" || !props.method
                      ? true
                      : false,
                  startAdornment: (
                    <InputAdornment position="start">£</InputAdornment>
                  ),
                }}
                value={formData.shipping}
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
                {gift_sorts.map((option, index) => (
                  <MenuItem key={index} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>

              {/* <TextField
                select
                fullWidth
                name="occasion"
                label="Occasion"
                value={formData.occasion}
                required
                InputProps={{
                  readOnly: props.method ? false : true,
                }}
                onChange={(e) => onChange(e)}
              >
                {occasions.map((option, index) => (
                  <MenuItem key={index} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField> */}

              <GiftOccasionMultiSelect
                onChange={(e) => onChange(e)}
                value={formData.occasion}
                itemlist={occasions}
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
                placeholder="Write gift description"
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
                  sx={{ borderRadius: "10px" }}
                  startIcon={<SaveIcon />}
                >
                  Save
                </Button>
              )}
            </Stack>
          </Grid>
          <Grid item xs={0} sm={0} md={1} lg={2}></Grid>
        </Grid>
      </form>
    </Box>
  );
}
