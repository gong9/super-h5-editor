import { Effect, Model } from "dva-type";
import type {Action,AnyAction } from "redux"

interface H5_state_type {
  currentCacheCopm: any[];
}

export type currentReducer<S=any, A extends Action = AnyAction> = (
  state: H5_state_type,
  action: A
) => S

interface H5_model_type extends Model {
  state: H5_state_type;
  effects: {};
  reducers: {
    setCurrentCacheCopm: currentReducer;
  };
}

export default H5_model_type;
