import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import BlogDummy from "../../assets/BlogDummy.svg";

const BlogsComponent = () => {
  return (
    <>
      <Card sx={{ width: "500px", borderRadius: "20px" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="340"
            image={BlogDummy}
            alt="green iguana"
          />
          <CardContent>
            <Typography
              sx={{ fontSize: "1rem", color: "#EF1068", fontWeight: "500" }}
            >
              VALENTINES DAY
            </Typography>
            <Typography gutterBottom component="div" sx={{ fontSize: "24px" }}>
              Top 10 Valentine’s Gifts She Actually Wants From You
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "1rem" }}
            >
              Valentine’s Day Gift Ideas for Men Like how Christmasday we start
              the New Year with a healthy dose ofgreetings before focusing on
              keeping our resolutionsalive. As the year goes and the first
              month...{" "}
              <span style={{ color: "black", fontWeight: 600 }}>
                {" "}
                Read More
              </span>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default BlogsComponent;
