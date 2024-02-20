import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

import colors from "../../constant/Colors";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.backpink,
    color: colors.deeppink,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

function createData(name, value) {
  return { name, value };
}

export default function DataTable({ title, name, value }) {
  const rows = [
    createData(name[0], value[0]),
    createData(name[1], value[1]),
    createData(name[2], value[2]),
    createData(name[3], value[3]),
    createData(name[4], value[4]),
    createData(name[5], value[5]),
    createData(name[6], value[6]),
    createData(name[7], value[7]),
    createData(name[8], value[8]),
    createData(name[9], value[9]),
    createData(name[10], value[10]),
    createData(name[11], value[11]),
  ];

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell colSpan={2} sx={{ textAlign: "center" }}>
              <Typography sx={{ paddingY: 1 }}>
                <strong>{title}</strong>
              </Typography>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.value}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
