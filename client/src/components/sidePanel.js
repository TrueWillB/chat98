import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MediaCard() {
  return (
    <div id="sidePanelContainer">
      <Card sx={{ width: 300, margin: 1.5, maxHeight: 200 }}>
        <CardMedia sx={{ height: 10 }} image="" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Username
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained">Unfriend</Button>
        </CardActions>
      </Card>
      <Card sx={{ width: 300, margin: 3, maxHeight: 200 }}>
        <CardMedia sx={{ height: 10 }} image="" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Username
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained">Unfriend</Button>
        </CardActions>
      </Card>
    </div>
  );
}
