import { Box } from "@mui/material";
import React from "react";
import CourseMenu from "../components/Personal/CourseMenu";
import Personal from "../components/Personal/Personal";
import { Menu } from '../tempData'
export default function View() {
  

  return (
    <Personal>
      <Box sx={{ display: "flex" }}>
        <CourseMenu>{Menu}</CourseMenu>
        <Box
          sx={{
            border: "0.1rem solid var(--light)",
            padding: "2rem",
            position: { xs: "absolute", md: "unset" },
            zIndex: -1,
          }}
        >
          {Array(10).fill(lorem)}
        </Box>
      </Box>
    </Personal>
  );
}

var lorem = (
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis nobis
    doloribus officiis sint impedit deleniti dolorem ipsum tempora! Tempore unde
    atque ipsam mollitia voluptates aperiam quia laboriosam, quaerat neque
    inventore, accusamus animi consectetur hic recusandae voluptate maxime odit
    eveniet dolores dolor cum! Voluptatibus earum aspernatur ipsa exercitationem
    facilis labore eveniet suscipit alias voluptatem similique illo quam
    doloribus numquam, deserunt dicta. Possimus sapiente molestiae quidem.
    Facilis aliquid aspernatur delectus? Inventore exercitationem pariatur
    cupiditate ullam officiis eligendi, quae sint, unde praesentium doloremque
    eaque aut. Nesciunt, pariatur ex! Nulla a, accusamus fuga saepe blanditiis
    amet inventore laboriosam ipsum voluptate aut non odio, corporis dolore,
    rerum in laudantium aspernatur. Excepturi ut, magnam, velit consequatur
    natus numquam, deserunt optio fuga dicta doloribus maxime labore possimus
    laboriosam quis minus impedit? Illo cupiditate delectus, laborum soluta
    molestiae quibusdam possimus. Inventore aperiam voluptatum porro tempore
    quae sint voluptatem deserunt deleniti fuga pariatur laboriosam aut
    reprehenderit eaque, cupiditate accusantium.
  </p>
);
