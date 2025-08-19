import { selectResolver, useEnhancedEditor, useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useState, DragEvent, useRef, useEffect } from 'react';
import './DropZone.css';
import { IDropZoneProps } from './DropZone.config';
import axios from 'axios';
import { Element } from '@ws-ui/craftjs-core';

interface FileDetails {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  webkitRelativePath?: string;
}
const DropZone: FC<IDropZoneProps> = ({
  url = '',
  allowedFileTypes = [{ type: '*' }],
  fileLimit = 0,
  fileSizeLimit = 0,
  style,
  className,
  classNames = [],
  disabled,
}) => {
  const { connect, emit } = useRenderer({
    omittedEvents: [
      'onupload',
      'onuploadsuccess',
      'onuploadfailure',
      'onfileselect',
      'onfileremove',
    ],
    autoBindEvents: !disabled,
  });
  const {
    sources: { datasource: ds },
  } = useSources();

  const { resolver } = useEnhancedEditor(selectResolver);
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [urlApi, setUrlApi] = useState<string>(url);

  let typeString = [...new Set(allowedFileTypes?.map((item) => item?.type))].join(',');

  useEffect(() => {
    if (!ds) return;

    const listener = async (/* event */) => {
      const value = await ds.getValue<string>();
      setUrlApi(value);
    };

    listener();

    ds.addListener('changed', listener);

    return () => {
      ds.removeListener('changed', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ds]);

  const fileToObject = (file: File): FileDetails => {
    return {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      webkitRelativePath: file.webkitRelativePath,
    };
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && e.target.files) {
      const filesArray = Array.from(e.target.files);
      emit(
        'onfileselect',
        filesArray.map((file) => fileToObject(file)),
      );
      const acceptedFiles = filesArray.filter((file) => {
        const fileTypePattern = new RegExp(typeString.replace(/,/g, '|').replace(/\*/g, '.*'));
        return fileTypePattern.test(file.type);
      });

      setFiles((prevFiles) => {
        const newFiles = acceptedFiles.filter(
          (newFile) =>
            !prevFiles.some(
              (existingFile) =>
                existingFile.name === newFile.name && existingFile.size === newFile.size,
            ),
        );

        let isFileSizeAccepted = true;
        let fileName = '';
        newFiles.forEach((file) => {
          if (isFileSizeAccepted) {
            isFileSizeAccepted = fileSizeLimit === 0 || file.size <= fileSizeLimit * 1024 * 1024;
            fileName = !isFileSizeAccepted ? file.name : fileName;
          }
        });
        if (!isFileSizeAccepted) {
          setStatusMessage(`File "${fileName}" exceeds the size limit of ${fileSizeLimit} MB.`);
          return prevFiles;
        }

        if (fileLimit > 0 && prevFiles.length + newFiles.length > fileLimit) {
          setStatusMessage(`You can only upload up to ${fileLimit} files.`);
          return prevFiles;
        }

        setStatusMessage('');
        return [...prevFiles, ...newFiles];
      });
      e.target.value = '';
    }
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    if (!disabled && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);
      emit(
        'onfileselect',
        filesArray.map((file) => fileToObject(file)),
      );
      const acceptedFiles = filesArray.filter((file) => {
        const fileTypePattern = new RegExp(typeString.replace(/,/g, '|').replace(/\*/g, '.*'));
        return fileTypePattern.test(file.type);
      });

      setFiles((prevFiles) => {
        const newFiles = acceptedFiles.filter(
          (newFile) =>
            !prevFiles.some(
              (existingFile) =>
                existingFile.name === newFile.name && existingFile.size === newFile.size,
            ),
        );

        let isFileSizeAccepted = true;
        let fileName = '';
        newFiles.forEach((file) => {
          if (isFileSizeAccepted) {
            isFileSizeAccepted = fileSizeLimit === 0 || file.size <= fileSizeLimit * 1024 * 1024;
            fileName = !isFileSizeAccepted ? file.name : fileName;
          }
        });

        if (!isFileSizeAccepted) {
          setStatusMessage(`File "${fileName}" exceeds the size limit of ${fileSizeLimit} MB.`);
          return prevFiles;
        }

        if (fileLimit > 0 && prevFiles.length + newFiles.length > fileLimit) {
          setStatusMessage(`You can only upload up to ${fileLimit} files.`);
          return prevFiles;
        }

        setStatusMessage('');
        return [...prevFiles, ...newFiles];
      });
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const relatedTarget = e.relatedTarget as HTMLElement;
    const isInside = e.currentTarget.contains(relatedTarget);

    if (!isInside) {
      setDragging(false);
    }
  };

  const handleRemoveFile = (file: File) => {
    emit('onfileremove', fileToObject(file));
    setFiles((prev) => prev.filter((f) => f !== file));
  };

  const handleUpload = (event: any) => {
    event.stopPropagation();
    emit(
      'onupload',
      files.map((file) => fileToObject(file)),
    );
    if (disabled || files.length === 0 || urlApi === '') return; // in case.

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    axios
      .post(urlApi, formData)
      .then((response) => {
        setStatusMessage('Upload successful!');
        emit('onuploadsuccess', response.data);
        setFiles([]); // Clear selected files after upload if desired
      })
      .catch((error) => {
        console.error('Error during upload:', error);
        emit('onuploadfailure', error);
        setStatusMessage('Upload failed. Please try again.');
      });
  };

  return (
    <div
      ref={connect}
      className={cn(className, classNames, {
        dragging,
      })}
      style={style}
    >
      <div
        className="dropZoneHeader"
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <Element
          style={{ fontSize: '100px' }}
          id={`dropZoneHeader`}
          role="dropZoneHeader"
          is={resolver.Icon}
          icon="fa-cloud-arrow-up"
          deletable={false}
          canvas
        />
        {statusMessage ? (
          <p style={{ color: statusMessage === 'Upload successful!' ? 'green' : 'red' }}>
            {statusMessage}
          </p> // Display the status message
        ) : !disabled && dragging ? (
          <p>Drop files here...</p>
        ) : (
          <p>Drag & drop files here, or click to select files</p>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={typeString}
          multiple
          style={{ display: 'none' }}
          onChange={handleFileSelection}
          disabled={disabled}
        />
      </div>
      <div className="dropZoneFooter">
        {files.length > 0 ? (
          files.map((file, index) => (
            <div key={index}>
              <p>{file.name} </p>
              <div onClick={() => handleRemoveFile(file)}>
                <Element
                  id={`dropZoneDelete`}
                  role="dropZoneDelete"
                  is={resolver.Icon}
                  icon="fa-trash"
                  deletable={false}
                  canvas
                />
              </div>
            </div>
          ))
        ) : (
          <p>Not selected file</p>
        )}
      </div>
      {files.length > 0 && (
        <div className="dropZoneButton" onClick={handleUpload}>
          <Element
            id={`dropZoneButton`}
            role="dropZoneButton"
            text="Upload"
            is={resolver.Button}
            deletable={false}
            canvas
          />
        </div>
      )}
    </div>
  );
};

export default DropZone;
