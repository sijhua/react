import React, { useRef, useState } from "react";
import {
  Container,
  BtnContainer,
  FileUploadContainer,
  FormField,
  DragDropText,
  UploadFileBtn,
  FilePreviewContainer,
  ImagePreview,
  PreviewContainer,
  PreviewList,
  FileMetaData,
  RemoveFileIcon,
  InputLabel,
  RectLarge,
  RectMedium,
  RectSmall,
  RectContent,
} from "./fileUpload.styles";
import DeleteIcon from "@material-ui/icons/Delete";

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 100000000;

const convertNestedObjectToArray = (nestedObj) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = ({
  label,
  updateFilesCb,
  getFile,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  ...otherProps
}) => {
  const fileInputField = useRef(null);
  const [files, setFiles] = useState({});

  const handleUploadBtnClick = () => {
    fileInputField.current.click();
  };

  const addNewFiles = (newFiles) => {
    for (let file of newFiles) {
      if (file.size <= maxFileSizeInBytes) {
        if (!otherProps.multiple) {
          return { file };
        }
        files[file.name] = file;
      }
    }
    return { ...files };
  };

  const callUpdateFilesCb = (files) => {
    const filesAsArray = convertNestedObjectToArray(files);
    updateFilesCb(filesAsArray);
  };

  const handleNewFileUpload = (e) => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
  };

  const removeFile = (fileName) => {
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFilesCb({ ...files });
  };

  return (
    <Container>
      <FileUploadContainer>
        <RectLarge>
          <RectMedium>
            <RectSmall>
              <RectContent>
                <img
                  src="/img/Dashboard/file_icon.svg"
                  style={{
                    height: "35px",
                    width: "27.5px",
                    marginBottom: "15px",
                  }}
                ></img>
                <DragDropText>Drag or Upload your file here</DragDropText>
                <FormField
                  type="file"
                  ref={fileInputField}
                  onChange={handleNewFileUpload}
                  title=""
                  value=""
                  {...otherProps}
                />
              </RectContent>
            </RectSmall>
          </RectMedium>
        </RectLarge>
      </FileUploadContainer>
      <div>
        <FilePreviewContainer>
          <PreviewList>
            {Object.keys(files).map((fileName, index) => {
              let file = files[fileName];
              getFile(file);
              let isImageFile = file.type.split("/")[0] === "image";
              return (
                <PreviewContainer key={fileName}>
                  <div>
                    {isImageFile && (
                      <ImagePreview
                        src={URL.createObjectURL(file)}
                        alt={`file preview ${index}`}
                      />
                    )}
                    <FileMetaData isImageFile={isImageFile}>
                      <span>{file.name}</span>
                      <aside>
                        <span>{convertBytesToKB(file.size)} kb</span>
                        <RemoveFileIcon
                          className="fas fa-trash-alt"
                          onClick={() => removeFile(fileName)}
                        >
                          <DeleteIcon size={10} />
                        </RemoveFileIcon>
                      </aside>
                    </FileMetaData>
                  </div>
                </PreviewContainer>
              );
            })}
          </PreviewList>
        </FilePreviewContainer>
      </div>
    </Container>
  );
};

export default FileUpload;
