import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Alert,
  AlertTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import DownloadIcon from "@mui/icons-material/Download";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

import CustomersTable from "../../components/admin/CustomersTable";

export default function Customers() {
  const history = useHistory();
  const [keyword, setKeyword] = useState("");
  const { users, error } = useSelector((state) => state.userList);

  const exportToPDF = () => {
    // Extract the emails from the users
    const customers = users.filter((user) => user.isAdmin === false);
    const userEmails = customers.map((user) => user.email);

    // Create a new PDF document
    const doc = new jsPDF();
    doc.text("User Emails", 10, 10);
    doc.text(userEmails.join("\n"), 10, 20);

    // Save the PDF file
    const pdfBlob = doc.output("blob");
    saveAs(pdfBlob, "user_emails.pdf");
  };

  const searchResult = keyword
    ? users.filter(
        (user) =>
          user.name.toLowerCase().includes(keyword.toLowerCase()) ||
          user.email.includes(keyword.toLowerCase())
      )
    : users;

  const addHandler = (e) => {
    e.preventDefault();
    history.push("/admin/customer/add");
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
            alignItems="center"
            spacing={2}
          >
            <Typography variant="h4">
              <strong>Customers</strong>
            </Typography>

            <Stack direction="row" alignItems="center" spacing={2}>
              <IconButton
                variant="contained"
                color="primary"
                onClick={exportToPDF}
                sx={{ borderRadius: "10px" }}
              >
                <Tooltip title="Export emails">
                  <DownloadIcon />
                </Tooltip>
              </IconButton>

              <Button
                variant="contained"
                color="primary"
                onClick={addHandler}
                sx={{ borderRadius: "10px" }}
                startIcon={<AddBoxOutlinedIcon />}
              >
                New User
              </Button>
            </Stack>
          </Stack>

          {error ? (
            <Box sx={{ paddingTop: "2%", paddingX: "2%" }}>
              <Alert severity="error">
                <AlertTitle>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Error
                  </Typography>
                </AlertTitle>
                <Typography variant="body1">
                  Excuse me. Your authorized token expired. Please log in again.
                </Typography>
              </Alert>
            </Box>
          ) : (
            <Paper
              sx={{
                width: "100%",
                paddingX: "1%",
                paddingY: "1%",
                boxShadow: 2,
              }}
            >
              <CustomersTable
                items={searchResult}
                keyword={keyword}
                setKeyword={setKeyword}
              />
            </Paper>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
