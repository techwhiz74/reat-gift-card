import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, cardFilter, theme) {
  return {
    fontWeight:
      cardFilter.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function GiftOccasionMultiSelect({ onChange, value, itemlist }) {
  const theme = useTheme();
  const [cardFilter, setCardFilter] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCardFilter(typeof value === "string" ? value.split(",") : value);
    onChange(event);
  };

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-multiple-filter-label">Occasions</InputLabel>
        <Select
          labelId="demo-multiple-nafilterme-label"
          id="demo-multiple-filter"
          multiple
          name="occasion"
          value={value}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {itemlist.map((filter, index) => (
            <MenuItem
              key={index}
              value={filter.name}
              style={getStyles(filter.name, cardFilter, theme)}
            >
              {filter.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
