import React, { useEffect, useState } from "react";

import { HelmetProvider } from "react-helmet-async";
import { IntlProvider } from "react-intl";
import LocaleContext from "@utils/contexts/Locale";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import Resource from "@utils/helpers/resource";
import ResourceContext from "@utils/contexts/Resource";
import Routes from "@core/components/Init/Routes";
import configureStore from "@store/configureStore";
import { defaultResource } from "@core/contants/resource";

export const [store, persistor] = configureStore();

const App = () => {
  const [resource, setResource] = useState(defaultResource);
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    setResourceContext();
  }, []);

  const setResourceContext = () => {
    const authenticated = false;

    Resource.init(authenticated).then((resource) => {
      setResource(resource);
    });
  };

  const setLocaleContext = (locale: string) => {
    setLocale(locale);
  };

  return resource.initiated ? (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HelmetProvider>
          <IntlProvider
            locale={locale}
            messages={resource.message[locale]}
            onError={(e) => console.log(e)}
          >
            <ResourceContext.Provider value={{ resource, setResourceContext }}>
              <LocaleContext.Provider value={{ locale, setLocaleContext }}>
                <div className="app">
                  <Routes
                    routes={resource.routes}
                    authenticated={resource.authenticated}
                  />
                </div>
              </LocaleContext.Provider>
            </ResourceContext.Provider>
          </IntlProvider>
        </HelmetProvider>
      </PersistGate>
    </Provider>
  ) : (
    <div>Loading...</div>
  );
};

export default App;
