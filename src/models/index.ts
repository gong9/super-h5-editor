import h5_model_type from '@/types/dvaTypes/h5_model_type'

export default {
  state: {
    currentCacheCopm: [],
  },
  effects: {},
  reducers: {
    setCurrentCacheCopm(state, { payload }) {
      return {
        ...state,
        user: payload,
      };
    },
  }
} as h5_model_type;