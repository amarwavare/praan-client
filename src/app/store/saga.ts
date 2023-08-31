import { put, takeLatest, call } from "redux-saga/effects";
import {
  praanAxiosFileInterceptor,
  praanAxiosInterceptor,
} from "../networkCalls";

function* uploadFile(action: any): any {
  try {
    let response: any = yield call(praanAxiosFileInterceptor as any, {
      method: "post",
      url: "/praan/upload",
      requestData: action.payload.file,
      params: null,
    });
    console.log("response file upload Saga", response);
    if (response.data.success === true && response.data.data.fileId) {
      yield put({
        type: "praanReducer/uploadFileResAction",
        payload: { isFileUploaded: true },
      });
      sessionStorage.setItem("fileName", response.data.data.fileName);
      sessionStorage.setItem("fileId", response.data.data.fileId);
    } else {
      yield put({
        type: "praanReducer/uploadFileResAction",
        payload: { isFileUploaded: false },
      });
    }
  } catch (error) {
    console.log("Error in upload file Saga", error);
    yield put({
      type: "praanReducer/uploadFileResAction",
      payload: { isFileUploaded: false },
    });
  } finally {
    yield put({
      type: "praanReducer/fileUploadingAction",
      payload: { isUploading: false },
    });
  }
}

function* fetchProcessedFiles(): any {
  try {
    let response: any = yield call(praanAxiosInterceptor as any, {
      method: "get",
      url: "/praan/fetchProcessedFilesMetadata",
      requestData: null,
      params: null,
    });
    console.log("response in fetchProcessedFiles Saga", response);
    if (response.data.success === true) {
      yield put({
        type: "praanReducer/processedFilesMetadataResAction",
        payload: { processedFilesMetadata: response.data.data },
      });
    } else {
      console.log(
        "fetchProcessedFiles Saga failure Scenario with response",
        response
      );
    }
  } catch (error) {
    console.log("error in fetchProcessedFiles Saga", error);
  }
}

function* fetchFileVisualData(action: any): any {
  try {
    let response: any = yield call(praanAxiosInterceptor as any, {
      method: "post",
      url: "/praan/fetchFileVisualData",
      requestData: action.payload,
      params: null,
    });
    console.log("response in fetchFileVisualData Saga", response);
    if (response.data.success === true) {
      yield put({
        type: "praanReducer/fileVisualDataResAction",
        payload: { fileVisualsData: response.data.data },
      });
    } else {
      console.log(
        "fetchFileVisualData Saga failure Scenario with response",
        response
      );
    }
  } catch (error) {
    console.log("error in fetchFileVisualData Saga", error);
  }
}

function* processFile(action: any): any {
    yield put({
        type: "praanReducer/processLoadingAction",
        payload: { isProcessing: true },
      });
  try {
    let response: any = yield call(praanAxiosInterceptor as any, {
      method: "post",
      url: "/praan/process/file",
      requestData: action.payload,
      params: null,
    });
    console.log("response in fetchFileVisualData Saga", response);
    if (response.data.success === true) {
      yield put({
        type: "praanReducer/fileProcessResAction",
        payload: { isFileProcessed: response.data.data },
      });
    } else {
      console.log(
        "fetchFileVisualData Saga failure Scenario with response",
        response
      );
    }
  } catch (error) {
    console.log("error in fetchFileVisualData Saga", error);
  } finally {
    yield put({
        type: "praanReducer/processLoadingAction",
        payload: { isProcessing: false },
      });
  }
}

export function* watcherSaga() {
  yield takeLatest("praanReducer/uploadFileAction", uploadFile);
  yield takeLatest(
    "praanReducer/fetchProcessedFilesMetadataAction",
    fetchProcessedFiles
  );
  yield takeLatest(
    "praanReducer/fetchFileVisualDataAction",
    fetchFileVisualData
  );
  yield takeLatest(
    "praanReducer/processFileAction",
    processFile
  );
}

export default watcherSaga;
