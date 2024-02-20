import React from "react";
import { useHistory } from "react-router-dom";

import { Pagination, PaginationItem, useMediaQuery } from "@mui/material";

const Paginate = ({ pages, page, type, occasion }) => {
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width: 576px");

  const handlePageChange = (event, page) => {
    event.preventDefault();
    if (type === "myorder") {
      history.push(`/account/order/page/${page}`);
    } else if (type === "themes") {
      if (occasion) {
        history.push(`/theme/${occasion}/${page}`);
      } else {
        history.push(`/themes/page/${page}`);
      }
    } else if (type === "gifts") {
      if (occasion) {
        history.push(`/gifts/${occasion}/${page}`);
      } else {
        history.push(`/gifts/page/${page}`);
      }
    }
  };

  return (
    <div style={{ marginTop: "1%", marginBottom: "5%" }}>
      {pages > 1 && (
        <Pagination
          count={pages}
          page={page}
          showFirstButton
          showLastButton
          color="primary"
          size={isMobile ? "small" : "medium"}
          sx={{ display: "flex", justifyContent: "center" }}
          onChange={handlePageChange}
          renderItem={(item) => <PaginationItem component="div" {...item} />}
        />
      )}
    </div>
  );
};

export default Paginate;
