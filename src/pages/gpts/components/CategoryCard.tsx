import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import styles from "./CategoryCard.module.css";

const CategoryCard = ({ category }) => {
  return (
    <Card className={styles.card}>
      <CardContent>
        <Typography variant="h6" component="div">
          {category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Explore apps for {category.toLowerCase()}.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
