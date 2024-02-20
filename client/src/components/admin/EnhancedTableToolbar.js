import React from "react";

import { alpha } from "@mui/material/styles";
import {
  Toolbar,
  Typography,
  IconButton,
  Box,
  Paper,
  InputBase,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

export default function EnhancedTableToolbar(props) {
  const { numSelected, title, filterItems, setFilter, keyword, setKeyword } =
    props;

  // Occasion filter for Products
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const chooseHandler = (value) => {
    setFilter(value);
    handleClose();
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}

      {keyword === undefined ? null : (
        <Box sx={{ width: "100%" }}>
          <Paper
            component="form"
            style={{
              width: "100%",
              display: "flex",
              margin: "auto",
              borderRadius: "25px",
              paddingLeft: "10px",
              paddingRight: "5px",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search here..."
              size="small"
              onChange={(e) => setKeyword(e.target.value)}
              inputProps={{ "aria-label": "search google maps" }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="submit" sx={{ p: "5px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
      )}

      {numSelected > 0 ? (
        <IconButton>
          <BootstrapTooltip title="Delete">
            <DeleteIcon />
          </BootstrapTooltip>
        </IconButton>
      ) : filterItems ? (
        <IconButton sx={{ marginLeft: "auto" }} onClick={handleClick}>
          <BootstrapTooltip title="Filter list">
            <FilterListIcon />
          </BootstrapTooltip>
        </IconButton>
      ) : null}

      {filterItems ? (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => chooseHandler()}>All Cards</MenuItem>
          {filterItems.map((filterItem, index) => (
            <MenuItem
              key={index}
              onClick={() => chooseHandler(filterItem.name)}
            >
              {filterItem.name}
            </MenuItem>
          ))}
        </Menu>
      ) : null}
    </Toolbar>
  );
}
