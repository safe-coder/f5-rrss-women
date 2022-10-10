import { legacy_createStore as createStore} from 'redux'
import rootReducers from "./reducers";
import store from "./store";


it("Should create a store", () => {
  const store = createStore(rootReducers);
  expect(store).toBeTruthy();
});

