import { createContext } from "react";
import { organisationContextType } from "../ui-types";

export const OrgnisationContext = createContext<organisationContextType | undefined>(undefined);