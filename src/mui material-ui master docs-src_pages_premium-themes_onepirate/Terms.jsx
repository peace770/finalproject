import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Markdown from './modules/components/Markdown';
import Typography from './modules/components/Typography';
import AppAppBar from './modules/views/AppAppBar';
import AppFooter from './modules/views/AppFooter';
import withRoot from './modules/withRoot';
// import terms from './modules/views/terms.md';
const terms=
`# Terms and Conditions

Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern our relationship with you in relation to this website. If you disagree with any part of these terms and conditions, please do not use our website.

## The content of the pages of this website is for your general information and use only. It is subject to change without notice.

## Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.

## Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.

## This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.

## Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.

## From time to time, this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).

## Your use of this website and any dispute arising out of such use of the website is subject to the laws of israel.`

function Terms() {
  // const [term, setTerm]= React.useState('')
  // // React.useEffect(()=>{
  // //   fetch({terms}).then((data)=>data.text()).then((data)=>setTerm(data))
  // // },[])
  return (
    <React.Fragment>
      <Container>
        <Box sx={{ mt: 7, mb: 12 }} dir="ltr">
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Terms
          </Typography>
          <Markdown>{terms}</Markdown>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default withRoot(Terms);