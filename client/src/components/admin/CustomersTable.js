import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import ConfirmModal from "../ConfirmModal";

import { deleteUser, listUsers } from "../../store/actions/userActions";

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

export default function CustomersTable(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { items, keyword, setKeyword } = props;
  const { success: successDelete } = useSelector((state) => state.userDelete);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  React.useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, history, successDelete]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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
    history.push(`/admin/customer/${id}/edit`);
  };

  const showHandler = (id) => {
    history.push(`/admin/customer/${id}/detail`);
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
      label: "Username",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: "Email",
    },
    {
      id: "freeCards",
      numeric: false,
      disablePadding: false,
      label: "Free Cards",
    },
    {
      id: "orders",
      numeric: false,
      disablePadding: false,
      label: "Orders",
    },
    {
      id: "spent",
      numeric: false,
      disablePadding: false,
      label: "Spent",
    },
    {
      id: "createdAt",
      numeric: false,
      disablePadding: false,
      label: "Register At",
    },
    {
      id: "role",
      numeric: false,
      disablePadding: false,
      label: "Role",
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
        title="All customers"
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <TableContainer>
        <Table sx={{ minWidth: 576 }} aria-labelledby="tableTitle">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={headCells}
          />

          <TableBody>
            {visibleRows.map((row, index) => {
              const isItemSelected = isSelected(row._id);

              return (
                <TableRow
                  hover
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row._id}
                  selected={isItemSelected}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell align="left">
                    <Typography variant="body1">{row.name}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1">{row.email}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1">{row.freeCards}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1">{row.orders}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1">
                      £ {parseFloat(row.spent).toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1">
                      {moment(row.createdAt).format("DD/MM/YYYY hh:mm")}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    {row.isAdmin ? (
                      <IconButton>
                        <BootstrapTooltip title="Admin">
                          <VerifiedUserIcon color="success" />
                        </BootstrapTooltip>
                      </IconButton>
                    ) : (
                      <IconButton>
                        <BootstrapTooltip title="Customer">
                          <AccountCircleIcon color="primary" />
                        </BootstrapTooltip>
                      </IconButton>
                    )}
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
        actionFcn={deleteUser}
        type="Delete"
      />
    </Box>
  );
}
