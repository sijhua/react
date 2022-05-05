import styled from 'styled-components';

export const Container = styled.section`
    display: flex;
    flex-direction: row;
    width: 5vw;
    height: 4vh;

    @media screen and (max-width: 800px) {
        height: 3vh;
    }
`;

export const BtnContainer = styled.section``;

export const FileUploadContainer = styled.section`
    position: relative;
    margin: -5vh 0px 0px 31.6vw;
    padding: 0px 5.6vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(211, 211, 211, 0.6);
    border-radius: 5px;
    width: 14vw;
    height: 13vw;

    &:focus {
        border: 2px dotted lightgray;
    }

    @media screen and (max-width: 1200px) and (min-width: 800px) {
        margin-left: 35.9vw;
        margin-top: -5vh;
    }

    @media screen and (max-width: 800px) {
        margin-left: 32.5vw;
        margin-top: -3.7vh;
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
    top: -21px;
    font-size: 13px;
    color: black;
    left: 0;
    position: absolute;
`;

export const DragDropText = styled.p`
    font-weight: bold;
    letter-spacing: 2.2px;
    margin-top: 2vh;
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
        content: '';
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
    margin-left: -195px;
    margin-top: -42px;
    z-index: 2;
    span {
        font-size: 10px;
    }

    @media screen and (max-width: 1200px) and (min-width: 800px) {
        margin-left: -14.5vw;
        margin-top: -5.4vh;
    }
    @media screen and (max-width: 800px) {
        margin-left: -14.5vw;
        margin-top: -4vh;
    }
`;

export const PreviewList = styled.section`
    display: flex;
    flex-wrap: wrap;

    @media only screen and (max-width: 400px) {
        flex-direction: column;
    }
`;

export const FileMetaData = styled.div`
    display: ${(props) => (props.isImageFile ? 'none' : 'flex')};
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10px;
    border-radius: 5px;
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
    padding: 0.25rem;
    width: 199px;
    height: 186px;
    border-radius: 5px;
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
        width: 14.7vw;
        height: 18vh;
    }
    @media screen and (max-width: 800px) {
        width: 14.7vw;
        height: 10.5vh;
    }
`;

export const ImagePreview = styled.img`
    border-radius: 6px;
    width: 100%;
    height: 100%;
`;
