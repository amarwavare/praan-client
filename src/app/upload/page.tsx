"use client";
import { Fragment, useEffect } from "react";
import { Group, Text, useMantineTheme, rem } from "@mantine/core";
import {
  IconUpload,
  IconPhoto,
  IconX,
  IconFileChart,
} from "@tabler/icons-react";
import { Dropzone, DropzoneProps, MIME_TYPES } from "@mantine/dropzone";
import { useDispatch, useSelector } from "react-redux";
import {
  fileUploadingAction,
  praanReducer,
  uploadFileAction,
  uploadFileResAction,
} from "../store/reducer";

export default function Upload(props: Partial<DropzoneProps>) {
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const isFileUploaded: boolean = useSelector(
    (state: any) => state[praanReducer].isFileUploaded
  );
  const isUploading: boolean = useSelector(
    (state: any) => state[praanReducer].isUploading
  );
  useEffect(() => {
    return () => {
      dispatch(uploadFileResAction({isFileUploaded: false}));
    }
  }, []);

  return (
    <Fragment>
      {isFileUploaded ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            border: "1px solid lightBlue",
            height: "fit-content",
            padding: "50px",
          }}
        >
          <IconFileChart color="green" size={100} />
          <br />
          <br />
          {sessionStorage.getItem("fileName")}
          <br />
          <br />
          <h4>File Uploaded Successfully</h4>
          <br />
          <br />
        </div>
      ) : (
        <Dropzone
          onDrop={(files) => {
            const formData = new FormData();
            formData.append("file", files[0]);
            dispatch(uploadFileAction({ file: formData }));
            dispatch(fileUploadingAction({ isUploading: true }));
          }}
          onReject={(files) => console.log("rejected files", files)}
          maxSize={3 * 1024 ** 2}
          accept={[MIME_TYPES.csv]}
          loading={isUploading}
          sx={{ height: "min-content" }}
          {...props}
        >
          <Group
            position="center"
            spacing="md"
            style={{ minHeight: rem(220), pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <IconUpload
                size="3.2rem"
                stroke={1.5}
                color={
                  theme.colors[theme.primaryColor][
                    theme.colorScheme === "dark" ? 4 : 6
                  ]
                }
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                size="3.2rem"
                stroke={1.5}
                color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto size="3.2rem" stroke={1.5} />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Drag CSV file here or click to select file
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                Only CSV File is allowed, file should not exceed 5mb
              </Text>
            </div>
          </Group>
        </Dropzone>
      )}
    </Fragment>
  );
}
