import React from "react";

import {
  Typography,
  IconButton,
  Box,
  Paper,
  InputBase,
  Divider,
  Stack,
  Button,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";

export default function EnhancedTableToolbar(props) {
  const { filterItem, setFilter, setKeyword, all_No, unpro_No, shipped_No } =
    props;

  return (
    <Stack
      spacing={2}
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Stack direction="row" spacing={2}>
        <Button
          color="inherit"
          sx={{
            borderBottom: filterItem === "All" ? "2px solid #000000" : "none",
            gap: 1,
          }}
          onClick={() => setFilter("All")}
        >
          <Typography sx={{ color: "#000000B3" }}>
            <span>All</span>
          </Typography>
          <Chip label={all_No} size="small" />
        </Button>
        <Button
          color="inherit"
          sx={{
            borderBottom:
              filterItem === "Unprocessed" ? "2px solid #000000" : "none",
            gap: 1,
          }}
          onClick={() => setFilter("Unprocessed")}
        >
          <Typography sx={{ color: "#000000B3" }}>
            <span>Unprocessed</span>
          </Typography>
          <Chip label={unpro_No} size="small" />
        </Button>
        <Button
          color="inherit"
          sx={{
            borderBottom:
              filterItem === "Shipped" ? "2px solid #000000" : "none",
            gap: 1,
          }}
          onClick={() => setFilter("Shipped")}
        >
          <Typography sx={{ color: "#000000B3" }}>
            <span>Shipped</span>
          </Typography>
          <Chip label={shipped_No} size="small" />
        </Button>
      </Stack>

      <Stack direction="row">
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {filterItem} orders
        </Typography>

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
      </Stack>
    </Stack>
  );
}
