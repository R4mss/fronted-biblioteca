import { configureStore } from "@reduxjs/toolkit";

import general from "@/store/slices/general";

const store = configureStore({
    reducer: {        
        general,        
    },
    devTools: import.meta.env.MODE !== 'production',
});
export type RootState = ReturnType<typeof store.getState>;
export default store;