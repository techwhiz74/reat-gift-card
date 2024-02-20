import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, Stack, Paper, Typography, Button } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

import CategoriesTable from "../../components/admin/CategoriesTable";

const Categories = () => {
  const history = useHistory();
  const { categories } = useSelector((state) => state.categoryList);

  const addHandler = (e) => {
    e.preventDefault();
    history.push("/admin/category/add");
  };

  return (
    <Box className="admin-container">
      <Box
        sx={{
          width: "100%",
          paddingX: "1%",
          paddingY: "1%",
        }}
      >
        <Stack direction="column" spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Typography variant="h4">
              <strong>Categories</strong>
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginLeft: "auto", borderRadius: "10px" }}
              onClick={addHandler}
              startIcon={<AddBoxOutlinedIcon />}
            >
              Create
            </Button>
          </Stack>
          <Paper
            sx={{
              width: "100%",
              paddingX: "1%",
              paddingY: "1%",
            }}
          >
            <CategoriesTable categories={categories} card={true} />
            <CategoriesTable categories={categories} card={false} />
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
};

export default Categories;
