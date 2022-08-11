import { useState, useEffect } from "react";

class GlobalContext<P extends object = {}> {
  //using proxy to prevent set method from looping
  private proxyContext = {} as P;
  //flag to prevent dispatchUpdaters from running while it is still resolving
  private hasQueue = false;
  //stores unique updater function pointer
  private updaters = new Set<Function>();
  private persistStateIsLoaded = false;
  private persistKey: string | null;
  private persistMode: "temp" | "perm";
  private hostname = window.location.hostname;

  /**
   *  @param persistKey - Assign a unique key to enable state to persist
   *  @param persistMode - 'temp' - saves state into sessionStorage, 'perm' - saves state into localStorage
   * */
  constructor(persistKey = null, persistMode: "temp" | "perm" = "temp") {
    //key for persistence session storage
    this.persistKey = persistKey;
    this.persistMode = persistMode;
  }

  //override getter method
  get context() {
    return this.loadPersistContext() || this.proxyContext;
  }

  //override setter method to run dispatchUpdaters
  set context(value) {
    this.proxyContext = new Proxy(value, {
      set: (target, key, value) => {
        //prevent dispatch from running when it is not yet resolved
        if (!this.hasQueue) {
          this.dispatchUpdaters();
        }

        //explicity assign value to this.context
        target[key] = value;

        return true;
      },
    });
  }

  loadPersistContext() {
    if (this.persistKey && !this.persistStateIsLoaded) {
      this.persistStateIsLoaded = true;

      const existingStorageStr =
        this.persistMode === "perm"
          ? localStorage.getItem(this.hostname)
          : sessionStorage.getItem(this.hostname);

      const existingStorageObj = existingStorageStr
        ? JSON.parse(existingStorageStr)
        : null;

      const persistContext = existingStorageObj
        ? existingStorageObj[this.persistKey]
        : null;

      if (persistContext) {
        return (this.context = persistContext);
      }
    }

    return null;
  }

  savePersistContext() {
    if (this.persistKey) {
      const isLocalStorage = this.persistMode === "perm";
      const existingStorageStr = isLocalStorage
        ? localStorage.getItem(this.hostname)
        : sessionStorage.getItem(this.hostname);

      const existingStorageObj = existingStorageStr
        ? JSON.parse(existingStorageStr)
        : null;

      const newStorageStr = JSON.stringify(
        existingStorageStr
          ? {
              ...existingStorageObj,
              [this.persistKey]: this.context,
            }
          : { [this.persistKey]: this.context }
      );

      if (isLocalStorage) {
        localStorage.setItem(this.hostname, newStorageStr);
        return;
      }

      sessionStorage.setItem(this.hostname, newStorageStr);
    }
  }

  //execute the updater functions stored in this.updaters
  dispatchUpdaters = () => {
    //wait for updaters to complete
    Promise.resolve().then(() => {
      this.hasQueue = false;

      this.updaters.forEach((updater) => {
        updater(this.context);
      });

      this.savePersistContext();
    });

    this.hasQueue = true;
  };

  subscribe = (updater: Function) => {
    this.updaters.add(updater);
  };

  unsubscribe = (updater: Function) => {
    this.updaters.delete(updater);
  };
}

export default GlobalContext;

const isEqual = (prev: Function, next: Function) => {
  return JSON.stringify(prev) === JSON.stringify(next);
};

/**
 *  @param contextInstance - instance created from GlobalContext class
 *  @param callback - callback function to get context
 *  */
export const useGlobalContext = (
  contextInstance: GlobalContext,
  callback: Function
) => {
  const [contextCallback, setContextCallback] = useState(
    callback({ ...contextInstance.context })
  );

  //adds new or update context callback to instance subscription
  useEffect(() => {
    const updater = (context: Object) => {
      const newContextCallback = callback({ ...context });

      if (!isEqual(contextCallback, newContextCallback)) {
        //trigger react re-render by setting state
        setContextCallback(newContextCallback);
      }
    };

    //add updater to subscription
    contextInstance.subscribe(updater);

    //remove updater from subscription when unmount
    return () => contextInstance.unsubscribe(updater);
  }, [contextCallback, callback, contextInstance]);

  return callback({ ...contextInstance.context });
};
