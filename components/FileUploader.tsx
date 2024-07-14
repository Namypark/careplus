"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { convertFileToUrl } from "@/lib/utils";

type FileUploadProps = {
  file: File[] | undefined;
  onChange: (file: File[]) => void;
};

const FileUploader = ({ file, onChange }: FileUploadProps) => {
  const onDrop = useCallback(
    (acceptedFile: File[]) => {
      // Do something with the files
      onChange(acceptedFile);
    },
    [onChange]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // const Accept = (props) => {
  //   const {
  //     getRootProps,
  //     getInputProps,
  //     isDragActive,
  //     isDragAccept,
  //     isDragReject
  //   } = useDropzone({
  //     accept: {
  //       'image/jpeg': ['.jpeg', '.png']
  //       // 'image/jpeg': ['.jpeg', '.png']
  //     }
  //   });

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {file && file?.length > 0 ? (
        <Image
          src={convertFileToUrl(file[0])}
          alt="uploaded-image"
          width={1000}
          height={1000}
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <>
          {" "}
          <Image
            src="/assets/icons/upload.svg"
            width={40}
            height={40}
            alt="upload"
          />
          <div className="file-upload_label">
            <p>
              <span className="text-green-500">Click to upload</span> or drag
              and drop
            </p>
            <p>SVG,PNG,JPG or GIF(max. 800x400px)</p>
          </div>
        </>
      )}
    </div>
  );
};
export default FileUploader;
