import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ActionAreaCard ({ mal_id, image, title, genres, scores,page }) {
  const genreNames = genres ? genres.map(genre => genre.name).join(', ') : '';

  return (
    <Card sx={{ width: 300}}>
      <CardActionArea component={Link} to={`/${page}/${mal_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Genres: {genreNames}
          </Typography>
          <Typography variant="body2" color="text.primary">
          <h3>Score: {scores}</h3>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
