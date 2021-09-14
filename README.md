## Module structure
```bash
src/modules/Sample/
├── bootstraps.ts
├── config
│   └── constants.ts
├── pages
│   └── SamplePage.tsx
├── reducers
│   └── sample.ts
└── services
    └── sample.ts
```

bootstraps.ts
```javascript
import { ModuleConfig } from "@core/interfaces";
import { name as sample } from "@modules/Sample/reducers/sample";

const config: ModuleConfig = {
  name: "Sample", // name of the folder module
  baseUrl: "/sample", // base url
  routes: [
    {
      path: "/sample-page", // url of the page => http://example.com/sample/sample-page
      page: "SamplePage", // name of the file in pages folder
      title: "Sample Page", // title of the page
      exact: true, // config exact in Route of react-router-dom
      reducer: { // reducer config, single or array
        name: sample, // name of state in store
        resource: "sample" // name of the file in folder reducer
      }
    }
  ],
  requireAuthenticated: false // need login to access page or not. If value = "any", login or not login both can access
}

export default config;
```

config/constants.ts
```javascript
export const namespace = "namespace:sample"; // define namespace of module
```

reducers/sample.ts
```javascript
import { Action } from "redux";

interface SampleState {
}

const initialState: SampleState = {};

export const name = `${namespace}_sample`; // name of state in store, concat with namespace to prevent conflict state name with other namespace
export default function sample(state: SampleState = initialState, action: Action<string>) {
  switch (action.type) {
    default:
      return state;
  }
}
```

services/sample.ts
```javascript
import BaseService from "@core/class/BaseService";
import { Object } from "@core/interfaces";

class SampleService extends BaseService { // need to extends BaseService

  list = (body: Object<string>) => {
    return this.get("/sample", body);
  }

}

export default new SampleService("/api", false);
```