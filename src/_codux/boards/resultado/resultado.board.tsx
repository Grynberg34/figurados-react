import React from "react";
import { createBoard } from "@wixc3/react-board";
import Resultado from "../../../components/Resultado";

export default createBoard({
  name: "Resultado",
  Board: () => <Resultado />,
  isSnippet: true,
});
