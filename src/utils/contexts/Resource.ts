import React from "react";
import { defaultResource } from "@core/contants/resource";

export default React.createContext({
  resource: defaultResource,
  setResourceContext: () => {},
});
