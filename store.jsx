import { configureStore } from "@reduxjs/toolkit"
import useReduser from "./src/feature/Creteslice"
export const store=configureStore({
    reducer:{
        StudentLmsData:useReduser
    }
})