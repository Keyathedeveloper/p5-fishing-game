import React from "react";
import { createRoot } from "react-dom/client";
import PenguinFishGame from "./components/PenguinFishGame";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<PenguinFishGame />);
