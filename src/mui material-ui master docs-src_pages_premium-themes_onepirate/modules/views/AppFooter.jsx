import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";
import TextField from "../components/TextField";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link as Linker } from "react-router-dom";
import { CANCEL_A_TAG_DEFAULT_STYLE } from "../../../util";

function Copyright() {
  return (
    <React.Fragment>
      {" "}
      <Link color="inherit" href="https://mui.com/">
        learn-torah-site
      </Link>{" "}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const iconStyle = {
  width: 48,
  height: 48,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "warning.main",
  mr: 1,
  "&:hover": {
    bgcolor: "warning.dark",
  },
};

const LANGUAGES = [
  {
    code: "en-US",
    name: "English",
  },
  {
    code: "he",
    name: "עברית",
  },
];

export default function AppFooter() {
  const [dailyPage, setDailyPage] = React.useState(null)
  React.useEffect(() => {
    fetch(
      `https://www.sefaria.org/api/calendars`
    )
      .then((data) => data.json())
      .then((data) => {
        var dailypages = data.calendar_items
        var mutatedData ={date : data.date, heberwDate: dailypages[12].displayValue.he, lessonsArray: [dailypages[0], dailypages[12],dailypages[5],dailypages[6],dailypages[2],dailypages[13]]}
        console.log(mutatedData);
        setDailyPage(mutatedData)
      });
  }, []);

  return (
    <Typography
      component="footer"
      sx={{ display: "flex", bgcolor: "secondary.light" }}
    >
      <Container sx={{ my: 8, display: "flex" }}>
        <Grid container spacing={4}>
          <Grid item xs={6} sm={4} md={2}>
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              spacing={2}
              sx={{ height: 120 }}
            >
              <Grid item sx={{ display: "flex" }}>
                <Box
                  component="a"
                  href="https://github.com/peace770/finalproject"
                  sx={iconStyle}
                >
                  <GitHubIcon fontSize="large" />
                </Box>
                <Box
                  component="a"
                  href="https://github.com/eliorsch"
                  sx={iconStyle}
                >
                  <GitHubIcon fontSize="large" />
                </Box>
              </Grid>
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={1}>
            <Typography variant="h6" marked="left" gutterBottom>
              Legal
            </Typography>
            <Box component="ul" sx={{ m: 0, listStyle: "none", p: 0 }}>
              <Box component="li" sx={{ py: 0.5 }}>
                <Linker to="/terms">Terms</Linker>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Linker to="/privacy">Privacy</Linker>
              </Box>
            </Box>
          </Grid>

          <Grid  item xs={6} sm={4} md={2} sx={{display: 'flex', flexDirection: 'column', gap:'1em'}}>
            <Linker to={"/about"} style={CANCEL_A_TAG_DEFAULT_STYLE}>
              About
            </Linker>
            <Linker to={"/contactus"} style={CANCEL_A_TAG_DEFAULT_STYLE}>
              Contact Us
            </Linker>
          </Grid>
          <Grid item xs={6} sm={8} md={7}>
          {dailyPage?<Grid item xs={6} sm={8} md={7}>
            <Typography variant="h6" marked="left" gutterBottom>
              {`שיעורים יומים לתאריך ${dailyPage.date} ${dailyPage.heberwDate}`}
            </Typography>
            {dailyPage.lessonsArray.map((item, i)=>{
              return(
              <Typography key={i} component="a" href={`https://www.sefaria.org/${item.url}`} style={{ textDecoration: 'none', color: 'black', display: 'block'}}>
              {`${item.title.he} : ${item.displayValue.he}`}
              </Typography>)
            })}
          </Grid> : <Grid item xs={6} sm={8} md={4}></Grid>}

            {/* <Typography variant="h6" marked="left" gutterBottom>
              Language
            </Typography>
            <TextField
              select
              size="medium"
              variant="standard"
              SelectProps={{
                native: true,
              }}
              sx={{ mt: 1, width: 150 }}
            >
              {LANGUAGES.map((language) => (
                <option value={language.code} key={language.code}>
                  {language.name}
                </option>
              ))}
            </TextField> */}
          </Grid>
          <Grid item>
            <Typography variant="caption">
              {"Icons made by "}
              <Link
                href="https://mui.com/material-ui/material-icons/"
                rel="open source"
                title="MUI icons"
              >
                MUI
              </Link>
              {" and taken from "}
              <Link href="https://mui.com/" rel="open source" title="MUI">
                www.mui.com
              </Link>
              {" is licensed by "}
              <Link
                href="https://www.tldrlegal.com/license/mit-license"
                title="mit-license"
                target="_blank"
                rel="noopener noreferrer"
              >
                MIT
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
