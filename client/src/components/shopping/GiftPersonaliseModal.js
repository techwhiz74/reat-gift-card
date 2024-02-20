import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import {
  updateSupplement,
  listSupplementDetail,
} from "../../store/actions/supplementActions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(4),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}));

export default function GiftPersonaliseModal(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id, productId, open, closeFcn, cardImg } = props;

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
            txt_x: res.data.textPositions[0],
            txt_y: res.data.textPositions[1],
            txt_w: res.data.textPositions[2],
            txt_h: res.data.textPositions[3],
          });
        }
      });
    },
    [dispatch]
  );

  useEffect(() => {
    getSupplementDetail(id);
  }, [id, getSupplementDetail]);

  const formatDesign = (id) => {
    dispatch(updateSupplement({ _id: id, frontUrl: null, middleUrl: null }));
  };

  const toDesign = () => {
    history.push(`/giftdesign/${productId}/${id}`);
  };

  const addCartHandler = (id) => {
    formatDesign(id);
    closeFcn();
    history.push(`/addgift/${productId}/${id}`);
  };

  const confirmHandler = () => {
    formatDesign(id);
    toDesign();
    closeFcn();
  };

  return (
    <BootstrapDialog
      onClose={closeFcn}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Gift Card
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={closeFcn}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        dividers
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={cardImg}
          className="img-thumbnail"
          alt="Card"
          style={{ padding: "10px", width: "380px" }}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Stack direction="row" alignItems="center" spacing={6}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => addCartHandler(id)}
          >
            <span>Add to Basket</span>
          </Button>
          {cardData.txt_w ? (
            <Button variant="contained" color="error" onClick={confirmHandler}>
              <span>Personalise</span>
            </Button>
          ) : null}
        </Stack>
      </DialogActions>
    </BootstrapDialog>
  );
}
