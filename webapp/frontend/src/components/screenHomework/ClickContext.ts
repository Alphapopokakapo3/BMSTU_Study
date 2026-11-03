import { createContext } from "react";

type ClickHandler = (homeworkId: number) => void
export const ClickContext = createContext<ClickHandler>(() => {});