import * as React from "react";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography, Paper, Button } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import colors from "../../constant/Colors";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.backpink,
    color: colors.deeppink,
    textAlign: "center",
    width: "33.33%",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(order) {
  return {
    _id: order._id,
    createdAt: order.createdAt.substring(0, 10),
    orderId: order.orderId,
    totalPrice: order.totalPrice,
  };
}

export default function OrderHistoryTable({ orders }) {
  const history = useHistory();
  const rows = orders.map((element) => createData(element));

  return (
    <TableContainer component={Paper}>
      <Table
        size="small"
        aria-label="customized table"
        sx={{ textAlign: "center" }}
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Typography sx={{ paddingY: 1 }}>
                <strong>DATE</strong>
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography sx={{ paddingY: 1 }}>
                <strong>ORDER ID</strong>
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography sx={{ paddingY: 1 }}>
                <strong>AMOUNT</strong>
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography sx={{ paddingY: 1 }}></Typography>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                {row.createdAt}
              </StyledTableCell>
              <StyledTableCell align="right">{row.orderId}</StyledTableCell>
              <StyledTableCell align="right">{row.totalPrice}</StyledTableCell>
              <StyledTableCell
                align="right"
                onClick={() => history.push(`/admin/order/${row._id}/detail`)}
              >
                <Button>
                  <VisibilityOutlinedIcon />
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
