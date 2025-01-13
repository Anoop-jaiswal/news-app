import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";

const NewsCard = ({ news }) => {
  const truncateDescription = (description, wordLimit = 14) => {
    const words = description?.split(" ");
    return words?.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : description;
  };
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 300,
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        m: 1,
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={news.urlToImage}
        alt={news.title}
      />

      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          noWrap
          sx={{ height: "40px", overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {news.title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            height: "60px",
          }}
        >
          {truncateDescription(news.description)}
        </Typography>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "150px",
              fontWeight: 500,
            }}
          >
            By {news.author || "Unknown"}
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{
              fontWeight: 500,
            }}
          >
            {new Date(news.publishedAt).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>

      <Box display="flex" justifyContent="center" p={2}>
        <Button
          variant="contained"
          color="primary"
          href={news.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read More
        </Button>
      </Box>
    </Card>
  );
};

const NewsList = ({ articles }) => {
  const filteredArticles = articles.filter((article) => article.urlToImage);

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      sx={{ maxWidth: "100%", margin: "0 auto", paddingRight: "20px" }}
    >
      {filteredArticles.map((article, index) => (
        <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
          <NewsCard news={article} />
        </Grid>
      ))}
    </Grid>
  );
};

export default NewsList;

const ArticleCard = ({ article }) => {
  const truncateDescription = (description, wordLimit = 14) => {
    const words = description?.split(" ");
    return words?.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : description;
  };
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 300,
        height: 250,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        m: 1,
      }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ height: "40px" }}
        >
          {truncateDescription(article.webTitle)}
        </Typography>

        <Box mt={2} display="flex" justifyContent="space-between">
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{
              fontWeight: 500,
            }}
          >
            Published:{" "}
            {new Date(article.webPublicationDate).toLocaleDateString()}
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{
              fontWeight: 500,
            }}
          >
            Pillar: {article.pillarName}
          </Typography>
        </Box>
      </CardContent>

      <Box display="flex" justifyContent="center" p={2}>
        <Button
          variant="contained"
          color="primary"
          href={article.webUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read More
        </Button>
      </Box>
    </Card>
  );
};

export const ArticleList = ({ articles }) => {
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      sx={{ maxWidth: "100%", margin: "0 auto", paddingRight: "20px" }}
    >
      {articles.map((article, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <ArticleCard article={article} />
        </Grid>
      ))}
    </Grid>
  );
};
