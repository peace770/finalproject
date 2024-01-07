import * as React from 'react';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import SearchBar from '../components/SearchBar';

const backgroundImage =
  'https://www.shutterstock.com/image-photo/open-book-on-pile-books-260nw-1039506289.jpg';

export default function ProductHero({courseList, search, setSearch}) {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        קבע עיתים לתורה
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        מצא שיעורים על כל נושא בתורה שמעניין אותך!
      </Typography>
      <SearchBar courseList={courseList} search={search} setSearch={setSearch}/>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        "אלמלא תורתך שעשועי.."
      </Typography>
    </ProductHeroLayout>
  );
}
