import React, { createContext, useContext } from "react";
import { useGigReducer } from "./reducers";

const StoreContext = createContext();
const { Provider } = StoreContext;

const GigProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useGigReducer({
    gigs: [],
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { GigProvider, useStoreContext };
