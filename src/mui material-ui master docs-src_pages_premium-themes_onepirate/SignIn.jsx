import * as React from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import AppForm from './modules/views/AppForm';
import { email, required } from './modules/form/validation';
import RFTextField from './modules/form/RFTextField';
import FormButton from './modules/form/FormButton';
import FormFeedback from './modules/form/FormFeedback';
import withRoot from './modules/withRoot';
import GoogleButton from 'react-google-button';
import { LoginContext,  signInWithGoogle, signInWithPassword } from '../components/FirebaseContext';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const user = React.useContext(LoginContext);

  let navigate = useNavigate();
  if (user) navigate('/dashboard');

  const [sent, setSent] = React.useState(false);
  const [serverError, setServerError]= React.useState("")
  const validate = (values) => {
    const errors = required(['email', 'password'], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleSubmit = (form) => {
    setSent(true);
    signInWithPassword(form.email, form.password)
    .then()
    .catch((error) =>{
      setServerError(error.code.split("/")[1].replaceAll("-", " "));
      setSent(false); 
    }) 
    
  };

  return (
    <React.Fragment>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
          <Typography variant="body2" align="center">
            {'Not a member yet? '}
            <Link
              href="/signup/"
              align="center"
              underline="always"
            >
              Sign Up here
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
              {serverError === "user not found" ?<Typography variant="h5" align="center" sx={{color:"red"}}>{serverError.toUpperCase()}</Typography>:null}
              <Field
                autoComplete="email"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
              />
              {serverError === "wrong password"?<Typography variant="h5" align="center" sx={{color:"red", paddingTop: "1em"}}>{serverError.toUpperCase()}</Typography>:null}
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Sign In'}
              </FormButton>
            </Box>
          )}
        </Form>
        {/* <Typography align="center">
          <Link underline="always" href="/premium-themes/onepirate/forgot-password/">
            Forgot password?
          </Link>
        </Typography>
         */}
      <GoogleButton style={{margin:'auto'}} onClick={signInWithGoogle}/>
      </AppForm>
    </React.Fragment>
  );
}

export default SignIn;
