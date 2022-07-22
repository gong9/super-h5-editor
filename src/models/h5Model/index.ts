import H5_model_type from "@/types/dvaTypes/h5_model_type";

export default {
  namespace: "h5_model_type",
  state: {
    currentCacheCopm: [],
  },
  effects: {},
  reducers: {
    setCurrentCacheCopm(state, { payload }) {
      return {
        ...state,
        currentCacheCopm: [...state.currentCacheCopm,payload.a],
      };
    },
  },
} as H5_model_type;
