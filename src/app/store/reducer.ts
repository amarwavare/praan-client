import { createSlice } from "@reduxjs/toolkit";

export const praanReducer: string = "praanReducer";

const initialState = {
  isFileUploaded: false,
  isUploading: false,
  isFileProcessed: false,
  isProcessing: false,
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
      state.isUploading = action.payload.isUploading;
    },
    fetchProcessedFilesMetadataAction: () => {},
    processedFilesMetadataResAction: (state,action) => {
        state.processedFilesMetadata = action.payload.processedFilesMetadata;
    },
    fetchFileVisualDataAction: (state,action) => {},
    fileVisualDataResAction: (state,action) => {
        state.fileVisualsData = action.payload.fileVisualsData;
    },
    processFileAction: (state, action) => {},
    fileProcessResAction: (state,action) => {
        state.isFileProcessed = action.payload.isFileProcessed
    },
    processLoadingAction: (state,action) => {
        state.isProcessing = action.payload.isProcessing;
    }
  },
});

export const {
  uploadFileAction,
  uploadFileResAction,
  fileUploadingAction,
  fetchProcessedFilesMetadataAction,
  fetchFileVisualDataAction,
  processFileAction,
  processLoadingAction,
} = praanSlice.actions;
