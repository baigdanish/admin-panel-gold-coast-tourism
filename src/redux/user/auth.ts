import { createSlice } from "@reduxjs/toolkit";
import type IUserstate from "../../interfaces/auth/auth.types";

const initialState: IUserstate = {
  token: "",
  isLoggedIn: false,
};

export interface IPermissionAccess {
  userId?: number;
  isRecording?: boolean;
  isTranscription?: boolean;
  isEmail?: boolean;
  isSms?: boolean;
  toggledByRole?: string;
  toggledById?: number;
}

export interface IPermissionAccessResponse {
  statusCode: number;
  data: IPermissionAccess;
  totalCount: number;
}

//TODO: we need discussion about below interface with sajid
interface IPayload {
  isLoggedIn?: boolean;
  token?: string;
  companyId?: number;
  signalRConnectionId?: string;
  getCommunicationAccess?: IPermissionAccess;
  profilePic?: string;

  companyName?: string;
}

interface IAction {
  payload: IPayload;
  type: string;
}
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserCredential: (state, action: IAction) => {
      state.isLoggedIn = action.payload.isLoggedIn || false;
      state.token = action.payload.token || "";
    },
  },
});

export const { setUserCredential } = authSlice.actions;

const { reducer } = authSlice;
export default reducer;
