import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: row;
`;

export const BtnContainer = styled.section``;

export const FileUploadContainer = styled.section`
  position: relative;
  margin: 0 0px 0px 0;
  padding: 0px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;

  &:focus {
    border: 2px dotted lightgray;
  }
  }
`;

export const FormField = styled.input`
  font-size: 18px;
  display: block;
  width: 100%;
  border: none;
  text-transform: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;

  &:focus {
    outline: none;
  }
`;

export const InputLabel = styled.label`
  top: 0px;
  font-size: 0px;
  color: black;
  left: 0;
  position: absolute;
`;

export const DragDropText = styled.p`
  font-family: Roboto;
  font-weight: bold;
  letter-spacing: 2.2px;
  margin-top: 10px;
  text-align: center;
  opacity: 0.6;
  font-size: 12px;

  @media screen and (max-width: 1200px) and (min-width: 800px) {
    font-size: 9px;
  }
  @media screen and (max-width: 800px) {
    font-size: 9px;
    letter-spacing: 0px;
    margin-top: 1vh;
  }
`;

export const UploadFileBtn = styled.button`
  box-sizing: border-box;
  appearance: none;
  background-color: #f2f4f7;
  border: 2px solid #f2f4f7;
  border-redius: 5px;
  cursor: pointer;
  font-size: 10px;
  line-height: 1;
  text-align: center;
  text-transform: uppercase;
  font-weight: 400;
  color: #7499f0;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: color 250ms ease-in-out;
  width: 112px;
  height: 23px;
  display: flex;
  align-items: center;
  padding-right: 0;
  justify-content: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  &:after {
    content: "";
    position: absolute;
    display: block;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 100%;
    background: #3498db;
    z-index: -1;
    transition: width 250ms ease-in-out;
  }

  i {
    font-size: 22px;
    margin-right: 1vw;
    border-right: 2px solid;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  @media only screen and (max-width: 500px) {
    width: 70%;
  }

  @media only screen and (max-width: 350px) {
    width: 100%;
  }

  &:hover {
    color: #fff;
    outline: 0;
    background: transparent;

    &:after {
      width: 110%;
    }
  }

  &:focus {
    outline: 0;
    background: transparent;
  }

  &:disabled {
    opacity: 0.4;
    filter: grayscale(100%);
    pointer-events: none;
  }
`;

export const FilePreviewContainer = styled.article`
  margin: 3.8rem 0rem 0rem -33.8rem;
  z-index: 2;
  span {
    font-size: 10px;
  }
`;

export const PreviewList = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

export const FileMetaData = styled.div`
  display: ${(props) => (props.isImageFile ? "none" : "flex")};
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  background-color: rgba(5, 5, 5, 0.55);

  span {
    font-size: 12px;
    margin-top: 5px;
  }

  aside {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    span {
      font-size: 12px;
    }
  }
`;

export const RemoveFileIcon = styled.i`
  cursor: pointer;
  margin-top: -5px;

  &:hover {
    transform: scale(1.3);
  }
`;

export const PreviewContainer = styled.section`
  width: 470px;
  height: 175px;
  border-radius: 20px;
  box-sizing: border-box;
  opacity: 1;

  &:hover {
    opacity: 1;

    ${FileMetaData} {
      display: flex;
    }
  }

  & > div:first-of-type {
    height: 100%;
    position: relative;
  }

  @media only screen and (max-width: 750px) {
    width: 25%;
  }

  @media only screen and (max-width: 500px) {
    width: 50%;
  }

  @media only screen and (max-width: 400px) {
    width: 100%;
    padding: 0 0 0.4em;
  }

  @media screen and (max-width: 1200px) and (min-width: 800px) {
    width: 470 * 0.5px;
    height: 175 * 0.5px;
  }
  @media screen and (max-width: 800px) {
    width: 329px;
    height: 123px;
  }
`;

export const ImagePreview = styled.img`
  border-radius: 6px;
  width: 100%;
  height: 100%;
`;

export const RectLarge = styled.label`
  width: 615px;
  height: 296px;
  background: #f9fbff;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1200px) and (min-width: 800px) {
    width: 615 * 0.5px;
    height: 296 * 0.5px;
  }
  @media screen and (max-width: 800px) {
    width: 430px;
    height: 207px;
  }
`;
export const RectMedium = styled.label`
  width: 544px;
  height: 226px;
  background: #ffffff;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1200px) and (min-width: 800px) {
    width: 544 * 0.5px;
    height: 226 * 0.5px;
  }
  @media screen and (max-width: 800px) {
    width: 380px;
    height: 158px;
  }
`;
export const RectSmall = styled.label`
  width: 463px;
  height: 169px;
  background: #ffffff;
  border-radius: 20px;
  display: block;
  justify-content: center;
  align-items: center;
  border: 3px dashed #e7f0fb;
  @media screen and (max-width: 1200px) and (min-width: 800px) {
    width: 463 * 0.5px;
    height: 169 * 0.5px;
  }
  @media screen and (max-width: 800px) {
    width: 324px;
    height: 118px;
  }
`;
export const RectContent = styled.label`
  width: 463px;
  height: 169px;
  border-radius: 20px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1200px) and (min-width: 800px) {
    width: 463 * 0.5px;
    height: 169 * 0.5px;
  }
  @media screen and (max-width: 800px) {
    width: 324px;
    height: 118px;
  }
`;
