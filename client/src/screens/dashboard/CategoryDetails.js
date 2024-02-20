import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  TextField,
  Button,
  CardMedia,
  useMediaQuery,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import {
  createCategory,
  listCategoryDetail,
  updateCategory,
} from "../../store/actions/categoryActions";
import { Upload } from "../../store/actions/productActions";

export default function CategoryDetails(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const imgRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 576px");

  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    card: true,
    imageUrl: "",
  });

  const getCategoryDetail = useCallback(
    (id) => {
      dispatch(listCategoryDetail(id)).then((res) => {
        if (res.data) {
          setFormData({
            _id: res.data._id,
            name: res.data.name,
            card: res.data.card,
            imageUrl: res.data.imageUrl,
          });
        }
      });
    },
    [dispatch]
  );

  useEffect(() => {
    if (props.method !== "Add") {
      getCategoryDetail(id);
    }
  }, [id, history, getCategoryDetail, props.method]);

  const handleChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      card: event.target.value === "true",
    }));
  };

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

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function onReturn(e) {
    e.preventDefault();
    history.push("/admin/categories");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (props.method === "Add") {
      dispatch(createCategory(formData));
    } else {
      dispatch(updateCategory(formData));
    }
    history.push("/admin/categories");
  };

  return (
    <Box className="admin-container">
      <Stack
        direction="row"
        justifyContent="left"
        alignItems="center"
        spacing={2}
        sx={{ marginBottom: "30px" }}
      >
        <IconButton aria-label="goback" onClick={onReturn}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">
          <strong>{props.method} Category</strong>
        </Typography>
      </Stack>

      <form onSubmit={submitHandler}>
        <Stack
          direction="column"
          spacing={3}
          style={
            isMobile
              ? null
              : { paddingLeft: "5%", paddingRight: "10%", width: "100%" }
          }
        >
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            value={formData.card.toString()}
            onChange={handleChange}
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="Greeting Card"
            />
            <FormControlLabel value="false" control={<Radio />} label="Gift" />
          </RadioGroup>
          <Stack
            direction={isMobile ? "column" : "row"}
            justifyContent="stretch"
            alignItems={isMobile ? "center" : "flex-end"}
            spacing={6}
            sx={{ width: "100%" }}
          >
            {formData.card ? (
              <>
                <CardMedia
                  ref={imgRef}
                  className="category_image"
                  image={formData.imageUrl}
                  title=""
                  onClick={() => document.getElementById("icon-upload").click()}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {formData.imageUrl ? null : (
                    <div className="circleBtn">
                      <AddPhotoAlternateOutlinedIcon
                        sx={{ color: "#3168fc" }}
                      />
                    </div>
                  )}
                </CardMedia>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="icon-upload"
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
              </>
            ) : null}
            <TextField
              label="Category Name"
              variant="standard"
              name="name"
              placeholder="Enter category name"
              value={formData.name}
              fullWidth
              required
              onChange={(e) => onChange(e)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{ borderRadius: "10px", width: "30%" }}
              startIcon={<SaveOutlinedIcon />}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}
