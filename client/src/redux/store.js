// import { applyMiddleware}  from "redux";
// import {configureStore} from "@reduxjs/toolkit"
// import thunk from 'redux-thunk';
// import  {composeWithDevTools} from 'redux-devtools-extension';

// import rootReducer from './reducers/index';
// import {Provider} from 'react-redux';


// const store = configureStore(
//     {
//         reducer: rootReducer},
//      composeWithDevTools(applyMiddleware(thunk))
// //    { middleware: [thunk]}
//     );
import { legacy_createStore as createStore} from 'redux'
import { applyMiddleware}  from "redux";
import thunk from 'redux-thunk';
import  {composeWithDevTools} from 'redux-devtools-extension';

import rootReducer from './reducers/index';
import {Provider} from 'react-redux';


const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

const DataProvider = ({children}) => {
    return (
       <Provider store={store}>
           {children}
        </Provider>
)
}

export default DataProvider;