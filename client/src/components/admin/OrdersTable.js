import React, { useState, useEffect } from "react";
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
  Stack,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import EnhancedTableHead from "./EnhancedTableHead";
import OrdersTableToolbar from "./OrdersTableToolbar";
import ConfirmModal from "../ConfirmModal";

import { deleteOrder, listOrders } from "../../store/actions/orderActions";

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

export default function OrdersTable(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    items,
    keyword,
    setKeyword,
    filterItem,
    setFilterItem,
    all_No,
    unpro_No,
  } = props;
  const { success: successDelete } = useSelector((state) => state.orderDelete);

  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("");
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

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch, successDelete]);

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

  const shipped_No = all_No - unpro_No;

  const editHandler = (id) => {
    history.push(`/admin/order/${id}/edit`);
  };

  const showHandler = (id) => {
    history.push(`/admin/order/${id}/detail`);
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
      id: "createdAt",
      numeric: false,
      disablePadding: false,
      label: "Ordered Date",
    },
    {
      id: "orderId",
      numeric: false,
      disablePadding: false,
      label: "Order Id",
    },
    {
      id: "user",
      numeric: false,
      disablePadding: false,
      label: "Customer name",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: "Email",
    },
    {
      id: "orderItems",
      numeric: false,
      disablePadding: false,
      label: "Items",
    },
    {
      id: "totalPrice",
      numeric: false,
      disablePadding: false,
      label: "Total price",
    },
    {
      id: "status",
      numeric: false,
      disablePadding: false,
      label: "Status",
    },
    {
      id: "deliveredAt",
      numeric: false,
      disablePadding: false,
      label: "Shipped Date",
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
      <OrdersTableToolbar
        filterItem={filterItem}
        setFilter={setFilterItem}
        keyword={keyword}
        setKeyword={setKeyword}
        all_No={all_No}
        unpro_No={unpro_No}
        shipped_No={shipped_No}
      />
      <TableContainer>
        <Table sx={{ minWidth: 465 }} aria-labelledby="tableTitle">
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
                    <Typography variant="body1">
                      {moment(row.createdAt).format("DD/MM/YYYY hh:mm")}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="body1">{row.orderId}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="left">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="body1">{row.user.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1">{row.user.email}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1">
                      {row.orderItems.length}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1">
                      £ {row.totalPrice.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Stack direction="row" spacing={1}>
                      {row.isPaid ? (
                        row.totalPrice > 0 ? (
                          <Chip
                            label="Paid"
                            color="success"
                            sx={{ minWidth: "66px" }}
                          />
                        ) : (
                          <Chip
                            label="Free"
                            color="secondary"
                            sx={{ minWidth: "66px" }}
                          />
                        )
                      ) : (
                        <Chip label="Unpaid" color="default" />
                      )}
                      <Chip
                        label={row.status}
                        color={
                          row.status === "Unprocessed" ? "default" : "primary"
                        }
                      />
                    </Stack>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1">
                      {row.deliveredAt
                        ? moment(row.deliveredAt).format("DD/MM/YYYY hh:mm")
                        : "N/A"}
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
        actionFcn={deleteOrder}
        type="Delete"
      />
    </Box>
  );
}
