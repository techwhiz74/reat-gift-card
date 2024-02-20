import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, Typography, Card, CardContent } from "@mui/material";

import { listCategories } from "../../store/actions/categoryActions";

const CardFilter = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categoryList);

  const items = categories.filter((item) => item.card === true);

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  const handleClick = (occasion) => {
    history.push(`/theme/${occasion}/1`);
  };

  return (
    <Container sx={{ marginTop: 5 }}>
      <div className="cardFilters">
        <div style={{ padding: 3, textAlign: "center", color: "#007373" }}>
          <Typography variant="h5">
            <strong>SEND A FREE-CARD NOW</strong>
          </Typography>
        </div>

        <div className="filterCardPanel">
          {items.map((category, index) => (
            <Card
              key={index}
              className="filterCard"
              onClick={() => handleClick(category.name)}
            >
              {/* <img
                src={`/assets/landing/filtercards/${category.name.replace(
                  /\s+/g,
                  ""
                )}.png`}
                alt="card-filter"
                width="100%"
              /> */}
              <img src={category.imageUrl} alt="card-filter" width="100%" />
              <CardContent>
                <Typography
                  variant="body2"
                  component="div"
                  className="cardText"
                >
                  <span style={{ fontFamily: "sans-serif" }}>
                    <strong>{category.name} Cards</strong>
                  </span>
                </Typography>
              </CardContent>
            </Card>
            // <div key={index} className="filterCard">
            //   <Button
            //     variant="outlined"
            //     // color="inherit"
            //     sx={{ width: "100%", height: "100%" }}
            //     onClick={() => handleClick(category.name)}
            //   >
            //     <span>{category.name}</span>
            //   </Button>
            // </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default CardFilter;
