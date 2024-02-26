import { createContext } from "react";

type StepperContextType = {
  userData: string;
  setUserData: (data: string) => void;
  finalData: any[];
  setFinalData: (data: any[]) => void;
};

const initialData: StepperContextType = {
  userData: '',
  setUserData: (data: string) => {
    //
    console.log(data)
    //
  },
  finalData: [],
  setFinalData: (data: any[]) => {
    //
    console.log(data)
    //
  },
};

export const StepperContext = createContext(initialData);