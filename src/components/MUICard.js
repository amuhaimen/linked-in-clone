import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
} from "@mui/material";

const MUICard = ({
  postimgsrc,
  posterimgsrc,
  postername,
  postertitle,
  posttitle,
  postdescription,
}) => {
  return (
    <Box width="850px" marginTop="30px">
      <Card style={{ padding: "30px" }}>
        <div className="card-topper">
          <img className="posterimg" src={posterimgsrc} />
          <div>
            <h3>{postername}</h3>
            <p>{postertitle}</p>
          </div>
        </div>
        <CardMedia component="img" height="auto" src={postimgsrc} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {posttitle}
          </Typography>
          <Typography>{postdescription}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">See More</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default MUICard;
