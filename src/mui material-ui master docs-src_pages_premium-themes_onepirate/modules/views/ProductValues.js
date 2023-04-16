import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function ProductValues() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
            <PlaceOutlinedIcon sx={{fontSize: 80}}/>
              <Typography variant="h6" sx={{ my: 5 }}>
                בכל מקום
              </Typography>
              <Typography variant="h5">
                {
                  'בבית, בעבודה, בנסיעה, בקניות... '
                }

                {'השיעור תמיד נמצא איתך. '}
              </Typography>
              </Box>
          </Grid>
          <Grid item xs={12} md={4}>
          <Box sx={item}>
              <AccessTimeSharpIcon sx={{ fontSize: 80 }} />
              <Typography variant="h6" sx={{ my: 5 }}>
                בכל זמן
              </Typography>
              <Typography variant="h5">
                {
                  'לפני תפילה, אחרי תפילה, בהפסקת הצהריים, '
                }

                {
                  'בין מנחה לערבית, או לפני השינה, בכל רגע קבע עיתים לתורה. '
                }
              </Typography>
            </Box>
            
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
               <AutoStoriesOutlinedIcon sx={{fontSize: 80}}/>
              <Typography variant="h6" sx={{ my: 5 }}>
                בכל נושא
              </Typography>
              <Typography variant="h5">
                {'שיעורים מסודרים בכל מקצועות התורה  '}
                {'ללמוד, להבין, לדעת. '}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
