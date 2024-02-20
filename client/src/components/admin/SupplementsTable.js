import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  IconButton,
  Avatar,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import ConfirmModal from "../ConfirmModal";

import { deleteSupplement } from "../../store/actions/supplementActions";

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

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function SupplementsTable(props) {
  const history = useHistory();
  const { items, keyword, setKeyword } = props;

  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("_id");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = items.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(items, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [items, order, orderBy, page, rowsPerPage]
  );

  const editHandler = (id) => {
    history.push(`/admin/supplement/${id}/edit`);
  };

  const showHandler = (id) => {
    history.push(`/admin/supplement/${id}/detail`);
  };

  const [open, setOpen] = useState(false);
  const [selectedID, setSelectedID] = useState();
  const handleOpen = (id) => {
    setOpen(true);
    setSelectedID(id);
  };
  const handleClose = () => setOpen(false);

  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Name",
    },
    {
      id: "category",
      numeric: false,
      disablePadding: false,
      label: "Category",
    },
    {
      id: "occasion",
      numeric: false,
      disablePadding: false,
      label: "Occasion",
    },
    {
      id: "price",
      numeric: false,
      disablePadding: false,
      label: "Price",
    },
    {
      id: "shipping",
      numeric: false,
      disablePadding: false,
      label: "Shipping Cost",
    },
    {
      id: "sales",
      numeric: false,
      disablePadding: false,
      label: "Sales",
    },
    {
      id: "created_at",
      numeric: false,
      disablePadding: false,
      label: "Created At",
    },
    {
      id: "actions",
      numeric: false,
      disablePadding: false,
      label: "Actions",
    },
  ];

  return (
    <Box sx={{ width: "100%", paddingX: "1%", paddingY: "1%" }}>
      <EnhancedTableToolbar
        title="Extra gifts"
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <TableContainer>
        <Table sx={{ minWidth: 576 }} aria-labelledby="tableTitle">
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={items.length}
            headCells={headCells}
          />

          <TableBody>
            {visibleRows.map((row, index) => {
              return (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={row._id}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell align="left">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Avatar
                        alt="img"
                        variant="rounded"
                        src={row.imageUrl}
                        sx={{ width: 56, height: 60 }}
                      />

                      <Typography variant="body1">{row.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1">{row.category}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    {row.occasion.map((item, index) => {
                      return (
                        <Typography variant="body1" key={index}>
                          {item}
                        </Typography>
                      );
                    })}
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1">
                      £ {parseFloat(row.price).toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1">
                      £ {parseFloat(row.shipping).toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1">{row.sales}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1">
                      {moment(row.createdAt).format("DD/MM/YYYY hh:mm")}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <IconButton
                      aria-label="edit"
                      size="small"
                      color="primary"
                      onClick={() => editHandler(row._id)}
                    >
                      <BootstrapTooltip title="Edit">
                        <EditOutlinedIcon />
                      </BootstrapTooltip>
                    </IconButton>
                    <IconButton
                      aria-label="show"
                      size="small"
                      onClick={() => showHandler(row._id)}
                    >
                      <BootstrapTooltip title="Detail">
                        <VisibilityOutlinedIcon />
                      </BootstrapTooltip>
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      color="error"
                      onClick={() => handleOpen(row._id)}
                    >
                      <BootstrapTooltip title="Delete">
                        <DeleteOutlinedIcon />
                      </BootstrapTooltip>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ConfirmModal
        id={selectedID}
        open={open}
        closeFcn={handleClose}
        actionFcn={deleteSupplement}
        type="Delete"
      />
    </Box>
  );
}
