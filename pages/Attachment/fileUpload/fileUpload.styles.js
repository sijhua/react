import styled from 'styled-components';

export const Container = styled.section`
    display: flex;
    width: 5vw;
    height: 4vh;

    @media screen and (max-width: 1200px) and (min-width: 800px) {
        height: 3vh;
    }

    @media screen and (max-width: 800px) {
        height: 3vh;
    }
`;

export const FileUploadContainer = styled.section`
    position: relative;
    margin: -5vh 0px 0px 31.8vw;
    padding: 0px 3vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(211, 211, 211, 0.6);
    border-radius: 10px;
    width: 22vw;
    height: 6.3vw;

    &:focus {
        border: 2px dotted lightgray;
    }

    @media screen and (max-width: 1200px) and (min-width: 800px) {
        margin-left: 27vw;
        margin-top: -5vh;
        padding-left: 3.1vw;
        height: 8.5vw;
    }

    @media screen and (max-width: 800px) {
        margin-left: 19.9vw;
        margin-top: -3.6vh;
        width: 20vw;
        height: 11.3vw;
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
    margin-top: 2.5vh;
    opacity: 0.6;
    font-size: 12px;
    width: 8vw;
    text-align: center;

    @media screen and (max-width: 1200px) and (min-width: 800px) {
        font-size: 10px;
    }

    @media screen and (max-width: 800px) {
        font-size: 10px;
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
    border-radius: 6px;
    color: #7499f0;
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: color 250ms ease-in-out;
    font-family: 'Roboto';
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
        margin-right: 5px;
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
    margin-left: -44vw;
    margin-top: -2vh;
    width: 100%;

    span {
        font-size: 12px;
    }

    @media screen and (max-width: 1200px) and (min-width: 800px) {
        margin-left: -40vw;
        span {
            font-size: 10px;
        }
    }
    @media screen and (max-width: 800px) {
        margin-left: -32vw;
        margin-top: -1.5vh;
        span {
            font-size: 10px;
            margin-top: 1.5vh;
        }
    }
`;

export const PreviewList = styled.section`
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;

    @media only screen and (max-width: 400px) {
        flex-direction: column;
    }
`;

export const FileMetaData = styled.div`
    display: ${(props) => (props.isImageFile ? 'none' : 'flex')};
    flex-direction: row;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 1.5vh;
    padding-left: 2vw;
    border-radius: 6px;
    color: black;
    font-weight: bold;
    background-color: #f2f4f7;
    font-family: 'Roboto';
    width: 18vw;

    aside {
        display: flex;
        justify-content: space-between;
        span {
            margin-left: 0vw;
            width: 3vw;
        }
    }

    @media screen and (max-width: 1200px) and (min-width: 800px) {
    }
    @media screen and (max-width: 800px) {
        width: 10vw;
        height: 5vh;
        flex-direction: column;
    }
`;

export const MetaDataName = styled.section`
    font-size: 10px;
    font-family: 'Roboto';
    width: 10vw;
    overflow: hidden;
    display: block;
    height: 2vh;

    &:hover {
        overflow: visible;
    }

    @media screen and (max-width: 1200px) and (min-width: 800px) {
        font-size: 9px;
    }
    @media screen and (max-width: 800px) {
        font-size: 9px;
    }
`;

export const RemoveFileIcon = styled.i`
    cursor: pointer;
    margin-left: 5vw;
    margin-top: -1vh;

    &:hover {
        transform: scale(1.3);
    }

    @media screen and (max-width: 1200px) and (min-width: 800px) {
        margin-top: -0.5vh;
    }
    @media screen and (max-width: 800px) {
        margin-top: 1.6vh;
    }
`;

export const PreviewContainer = styled.section`
    padding: 0.25rem;
    width: 20%;
    height: 42px;
    border-radius: 6px;
    box-sizing: border-box;

    &:hover {
        opacity: 0.55;

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
`;

export const ImagePreview = styled.img`
    border-radius: 6px;
    width: 100%;
    height: 100%;
`;
