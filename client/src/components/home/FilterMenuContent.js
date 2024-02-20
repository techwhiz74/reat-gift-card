import React from "react";
import {
  Box,
  Stack,
  Typography,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FilterMenuContent({
  filterA,
  filterB,
  filterC,
  cardFilter,
  setCardFilter,
  menuClose,
}) {
  const clickHandler = (e) => {
    if (e.target.checked) {
      setCardFilter([...cardFilter, e.target.value]);
    } else {
      setCardFilter(cardFilter.filter((filter) => filter !== e.target.value));
    }
  };

  const personTitle = ["Who's it for"];

  const FilterAccordion = ({ title, group }) => {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography variant="body1">
            <strong style={{ fontFamily: "Arial" }}>{title}</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack>
            {group.map((item, index) => (
              <FormControlLabel
                key={index}
                value={item}
                checked={cardFilter.includes(item)}
                control={<Checkbox />}
                onClick={clickHandler}
                label={
                  <Typography sx={{ fontFamily: "cursive" }}>{item}</Typography>
                }
                sx={{ margin: 0, fontFamily: "cursive" }}
              />
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <Box sx={{ width: "250px", maxHeight: "65vh" }}>
      {/* <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ paddingX: 2, paddingY: 1 }}
      >
        <Typography variant="h6">
          <strong>Filters</strong>
        </Typography>
        <CloseIcon onClick={menuClose} />
      </Stack> */}

      <FilterAccordion title="Who's it for" group={filterA.flat()} />

      <FilterAccordion title="Occasion" group={filterB} />

      <FilterAccordion title="Age Milestones" group={filterC} />
    </Box>
  );
}
