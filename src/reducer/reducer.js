import {combineReducers} from "redux";
import {reducer as dataReducer} from "./data/reducer.js";
import {reducer as userReducer} from "./user/reducer.js";
import {NameSpace} from "./name-spaces.js";

export default combineReducers({
  [NameSpace.DATA]: dataReducer,
  [NameSpace.USER]: userReducer,
});
