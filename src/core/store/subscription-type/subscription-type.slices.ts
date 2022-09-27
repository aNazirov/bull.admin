import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISubscriptionType } from "core/interfaces";

interface IState {
  subscriptionTypes: ISubscriptionType[];
  subscriptionType: ISubscriptionType | null;
  count: number;
}

const initialState: IState = {
  subscriptionTypes: [],
  subscriptionType: null,
  count: 0,
};

export const {
  actions: subscriptionTypesAction,
  reducer: subscriptionTypesReducer,
} = createSlice({
  name: "subscriptionTypes",
  initialState,
  reducers: {
    setMoreSubscriptionTypes: (
      state,
      action: PayloadAction<{ subscriptionTypes: ISubscriptionType[] }>
    ) => ({
      ...state,
      ...action.payload,
    }),
    setSubscriptionTypes: (
      state,
      action: PayloadAction<{
        subscriptionTypes: ISubscriptionType[];
        count: number;
      }>
    ) => ({
      ...state,
      ...action.payload,
    }),
    setSubscriptionType: (
      state,
      action: PayloadAction<{ subscriptionType: ISubscriptionType | null }>
    ) => ({
      ...state,
      ...action.payload,
    }),
  },
});
