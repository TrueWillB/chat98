import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

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

const names = [
  "Andrick Siegmund",
  "Derek Szczepanik",
  "Jordan Olguin",
  "Will Brown",
  "Madeline Moore",
];

export default function MultipleSelectCheckmarks() {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  // Madeline's note to self: "theme" button should maybe be a dropdown(?)

  return (
    <div id="toolbar">
      <div id="toolbarButtons">
        {" "}
        <Stack spacing={2} direction="row">
          <Button variant="contained">Theme</Button>
          <Button variant="contained" href="#contained-buttons">
            Add Friend
          </Button>
          <Button variant="contained" disabled>
            Photo
          </Button>
          <Button variant="contained" disabled>
            Video
          </Button>
        </Stack>
      </div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-multiple-checkbox-label">Find friends!</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Find friends!" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
