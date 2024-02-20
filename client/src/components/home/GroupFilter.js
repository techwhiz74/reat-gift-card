import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Box, Stack, Menu } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";

import { filterA, filterB, filterC } from "../constant/CardFilterItems";
import FilterMenuContent from "./FilterMenuContent";

const GroupFilter = (props) => {
  const history = useHistory();
  const { items, type, cardFilter, setCardFilter } = props;
  const { occasion } = useParams();

  const handleClick = (occasion) => {
    if (type === "themes") {
      history.push(`/theme/${occasion}/1`);
    } else if (type === "gifts") {
      history.push(`/gift/${occasion}/1`);
    } else if (type === "addcard") {
      history.push(`/addcard/${occasion}/1`);
    }
  };

  const handleAll = () => {
    if (type === "themes") {
      history.push(`/themes/page/1`);
    } else if (type === "gifts") {
      history.push(`/gifts/page/1`);
    } else if (type === "addcard") {
      history.push("/addcards/page/1");
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const menuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const menuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className="filterCardPanel">
      <Stack direction="row" spacing={2}>
        {type === "themes" || type === "addcard" ? (
          <>
            <Button
              variant="outlined"
              startIcon={<TuneIcon />}
              sx={{ borderRadius: "10px", paddingX: "20px" }}
              onClick={menuOpen}
            >
              <span>Filters</span>
            </Button>
          </>
        ) : null}

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={menuClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
            dense: true,
          }}
        >
          <FilterMenuContent
            filterA={filterA}
            filterB={filterB}
            filterC={filterC}
            cardFilter={cardFilter}
            setCardFilter={setCardFilter}
            menuClose={menuClose}
          />
        </Menu>

        <Button
          variant={occasion ? "outlined" : "contained"}
          sx={{ borderRadius: "10px" }}
          onClick={() => handleAll()}
        >
          <span>All</span>
        </Button>
        {items.map((category, index) => (
          <Button
            key={index}
            variant={category.name === occasion ? "contained" : "outlined"}
            sx={{
              lineHeight: "1",
              borderRadius: "10px",
            }}
            onClick={() => handleClick(category.name)}
          >
            <span>{category.name}</span>
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default GroupFilter;
