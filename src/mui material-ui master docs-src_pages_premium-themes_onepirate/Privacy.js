import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Markdown from './modules/components/Markdown';
import Typography from './modules/components/Typography';
import AppAppBar from './modules/views/AppAppBar';
import AppFooter from './modules/views/AppFooter';
import withRoot from './modules/withRoot';
// import privacy from './modules/views/privacy.md';
const privacy =`# Privacy Policy

We take your privacy seriously. This policy describes what personal information we collect and how we use it.

## Information We Collect

We may collect the following types of personal information:

- Name
- Email address

## How We Use Your Information

We use your personal information for the following purposes:

- To communicate with you
- To process your orders and payments
- To provide customer support
- To improve our services and website

## Information Sharing and Disclosure

We do not sell, trade, or otherwise transfer your personal information to third parties. However, we may share your information with our service providers who help us with our business operations.

## Data Retention

We will retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.

## Your Rights

You have the right to:

- Access and request a copy of your personal information
- Correct any inaccuracies in your personal information
- Object to the processing of your personal information
- Request the deletion of your personal information

## Contact Us

If you have any questions or concerns about our privacy policy, please contact us.
`

function Privacy() {
  return (
    <React.Fragment>
      <Container>
        <Box sx={{ mt: 7, mb: 12 }} dir="ltr">
          <Typography variant="h3" gutterBottom marked="center" align="center" >
            Privacy
          </Typography>
          <Markdown>{privacy}</Markdown>
        </Box>
      </Container>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Privacy);
