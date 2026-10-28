"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import { persistStore, type PersistorOptions } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { makeStore } from "./store";

export default function ReduxProvider({ children }: { children: ReactNode }) {
  const [store] = useState(makeStore);
  const [persistor] = useState(() => {
    // redux-persist v6 supports manualPersist but omits it from its types.
    const options: PersistorOptions & { manualPersist: boolean } = {
      manualPersist: true,
    };

    return persistStore(store, options);
  });

  useEffect(() => {
    persistor.persist();
    return () => persistor.pause();
  }, [persistor]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
