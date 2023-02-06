import React, { useContext } from "react";
import Personal from "../components/Personal/Personal";
import CourseMenu from "../components/Personal/CourseMenu";
import { Menu } from "../tempData";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import { YouTube } from "@mui/icons-material";
import AbcIcon from "@mui/icons-material/Abc";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import VideoContent from "../components/Personal/VideoContent";
import TextContent from "../components/Personal/TextContent";
import SourceContent from "../components/Personal/SourceContent";
import { LoginContext } from "../components/FirebaseContext";
import SignIn from "./SignIn";

export default function Edit() {
  const isUserSignedIn = useContext(LoginContext);
  if (!isUserSignedIn) {
    return (
      <Personal>
        <SignIn />
      </Personal>
    );
  }
  var lesson = [
    {
      type: "video",
      youtubeId: "9ewsEcNEwm0",
    },
    {
      type: "source",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque distinctio cupiditate magnam dolores fuga, tempora, officia, libero modi earum vel tempore quis illum quidem cum unde voluptatum culpa molestias mollitia! Nihil rerum maxime vero, itaque in voluptatibus fugiat quas minus nisi a magnam, perspiciatis cum officiis quasi illo necessitatibus veritatis recusandae reprehenderit, facere totam repellat aspernatur consequuntur? Perferendis repellat vero quam. Voluptates laborum fuga itaque ducimus fugit quia numquam temporibus nobis neque saepe expedita, non exercitationem illo vero beatae odit esse, magnam quibusdam a vel optio! Excepturi obcaecati molestias ut consequuntur doloribus alias magni eligendi quos et natus repudiandae laudantium consectetur officiis asperiores deleniti explicabo repellat blanditiis consequatur odit, cupiditate necessitatibus dicta. Quia hic quam officia nisi ab incidunt facilis consequatur cupiditate. Qui architecto modi consequatur consequuntur temporibus, illo non dignissimos enim quod ipsum voluptate, expedita optio voluptas labore! Distinctio nulla autem dolorem! Quo soluta modi, laboriosam dicta eligendi fugit?",
    },
    {
      type: "text",
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus ducimus odio consectetur fugit possimus omnis, similique officiis error esse numquam aliquam id vitae eius, laudantium provident est quos dolorem excepturi cumque asperiores assumenda. Accusantium aut explicabo nihil deleniti, fugit quo mollitia eveniet cum iste magnam cupiditate officia provident eaque laboriosam itaque dolor porro doloremque! Impedit sint, eaque atque iste accusantium possimus ad non, repudiandae quia fugiat dolorum ullam delectus eius mollitia nemo ratione! Esse voluptate, sit iusto vitae consequatur eveniet tempore eum at quas sapiente doloribus corrupti quidem ut similique suscipit, expedita ullam cumque. Tempore facilis dignissimos explicabo reprehenderit cum recusandae amet animi saepe unde, quidem quas iure, excepturi doloremque possimus ipsa. Id, accusamus. Sunt eum recusandae quidem? Ab minima dolore aliquid consectetur repellendus odio, ipsa perferendis voluptatibus accusamus quo, id tenetur nisi nulla. Itaque consequuntur incidunt vel autem saepe doloribus corrupti suscipit tempora assumenda modi cumque neque deserunt delectus perspiciatis quo illum, rem consectetur quos accusamus quam dolorem laboriosam voluptas. Nostrum quis non qui, sunt cumque placeat dolore maxime? Cupiditate quo eos porro ex quidem molestiae obcaecati quibusdam assumenda adipisci! Soluta id ipsum consequatur fugit ullam illum ea culpa omnis veritatis placeat! Hic ad nihil ratione ipsa, nemo ipsum officia error quidem dolores vel beatae repellendus consequuntur reiciendis minima minus quisquam dicta quia doloremque cupiditate ullam iusto. Sed unde ab totam alias. Aliquid ipsa dolores accusamus facilis at quae, cum ullam. Eaque tempore distinctio ad vero quisquam? Ipsum labore est doloremque, omnis in ullam nesciunt molestiae officiis consequatur maiores? Architecto est officia atque tempore suscipit culpa minima animi impedit quos. Aliquam, ratione? Ex eaque at magni laborum. Mollitia, amet possimus incidunt magnam dolore dolor aliquid eum dolores similique facere itaque laboriosam ratione optio exercitationem totam commodi eos inventore nisi tempora asperiores et! Iure doloribus architecto iusto optio? Laboriosam, necessitatibus?",
    },
    {
      type: "video",
      youtubeId:
        "R1Ehb3JA-cM44444444                                                                                                                                                                                                                                                                                                                           ",
    },
  ];
  return (
    <Personal>
      <CourseMenu>{Menu}</CourseMenu>
      <Box sx={{ flex: 1 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography>לחץ כדי להוסיף לקורס</Typography>
          <ToggleButtonGroup exclusive aria-label="Platform">
            <ToggleButton value="youtube" sx={{ color: "red" }}>
              <YouTube />
            </ToggleButton>
            <ToggleButton value="text" sx={{ color: "purple" }}>
              <AbcIcon />
            </ToggleButton>
            <ToggleButton value="source" sx={{ color: "blue" }}>
              <FormatQuoteIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          <div></div>
        </Toolbar>
        <Box
          sx={{
            "& > *": {
              padding: "1rem",
            },
          }}
        >
          {lesson.map((item) => {
            switch (item.type) {
              case "video":
                return <VideoContent videoId={item.youtubeId} />;
              case "text":
                return <TextContent content={item.content} />;
              case "source":
                return <SourceContent content={item.content} />;
              default:
                return <p>there is an error</p>;
            }
          })}
        </Box>
      </Box>
    </Personal>
  );
}
