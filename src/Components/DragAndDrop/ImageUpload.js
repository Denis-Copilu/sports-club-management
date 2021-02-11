import React from "react";
import { useDropzone } from "react-dropzone";
import './ImageUpload.css';
export const ImageUpload = () => {
    const [files, setFiles] = React.useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                }))
            )
        }
    })
    const images = files.map((file) => (
        <div key={file.name}>
            <div>
                <img src={file.preview} style={{ width: "200px" }} alt="preview" />
            </div>
        </div>
    ))
    return (
        <>
            <div id="dragAndDrop" {...getRootProps()}>
                <input {...getInputProps()} />
                <div style={{ display: "inline-flex" }}>
                    <p style={{ color: "black" }, { fontStyle: "bold" }}>Upload File </p>
                    <p>&nbsp;&nbsp; or drag&drop here</p>
                </div>
            </div>
            <div>{images}</div>
        </>
    );
}

