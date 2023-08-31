import { createSlice } from "@reduxjs/toolkit";

export const praanReducer: string = "praanReducer";

const initialState = {
  isFileUploaded: false,
  isUploading: false,
  processedFilesMetadata: null,
  fileVisualsData: null,
};

export const praanSlice = createSlice({
  name: praanReducer,
  initialState,
  reducers: {
    uploadFileAction: (state, action) => {},
    uploadFileResAction: (state, action) => {
      state.isFileUploaded = action.payload.isFileUploaded;
    },
    fileUploadingAction: (state, action) => {
      state.isFileUploaded = action.payload.isUploading;
    },
    fetchProcessedFilesMetadataAction: () => {},
    processedFilesMetadataResAction: (state,action) => {
        state.processedFilesMetadata = action.payload.processedFilesMetadata;
    },
    fetchFileVisualDataAction: (state,action) => {},
    fileVisualDataResAction: (state,action) => {
        state.fileVisualsData = action.payload.fileVisualsData;
    }
  },

  // extraReducers: {
  //     [HYDRATE]: (state, action) => {
  //         return {
  //           ...state,
  //           ...action.payload.auth,
  //         };
  //       },
  // }
});

export const {
  uploadFileAction,
  uploadFileResAction,
  fileUploadingAction,
  fetchProcessedFilesMetadataAction,
  fetchFileVisualDataAction,
} = praanSlice.actions;
