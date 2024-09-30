import { useRenderer } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useState, DragEvent, useRef } from 'react';

import { IDropZoneProps } from './DropZone.config';

const DropZone: FC<IDropZoneProps> = ({ style, className, classNames = [] }) => {
  const { connect } = useRenderer();
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      // Filter for accepted file types and sizes (e.g., max 5MB)
      /*const acceptedFiles = filesArray.filter(
        (file) => file.type === 'image/png' || file.type === 'image/jpeg' // Example: Only accept PNG and JPEG
      ).filter(file => file.size <= 5 * 1024 * 1024); // Example: Max size 5MB*/

      setFiles((prevFiles) => {
        const newFiles = filesArray.filter(
          (newFile) =>
            !prevFiles.some(
              (existingFile) =>
                existingFile.name === newFile.name && existingFile.size === newFile.size,
            ),
        );
        return [...prevFiles, ...newFiles];
      });
      e.target.value = '';
    }
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);

      // Filter for accepted file types and sizes (e.g., max 5MB)
      /*const acceptedFiles = filesArray.filter(
        (file) => file.type === 'image/png' || file.type === 'image/jpeg' // Example: Only accept PNG and JPEG
      ).filter(file => file.size <= 5 * 1024 * 1024); // Example: Max size 5MB*/

      setFiles((prevFiles) => {
        const newFiles = filesArray.filter(
          (newFile) =>
            !prevFiles.some(
              (existingFile) =>
                existingFile.name === newFile.name && existingFile.size === newFile.size,
            ),
        );
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

  /*useEffect(() => {
    if (!ds) return;

    const listener = async () => {
      const v = await ds.getValue<string>();
    };

    listener();

    ds.addListener('changed', listener);

    return () => {
      ds.removeListener('changed', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ds]);*/

  const handleRemoveFile = (event: any, file: File) => {
    event.stopPropagation();
    setFiles((prev) => prev.filter((f) => f !== file));
  };

  return (
    <div
      ref={connect}
      style={{
        ...style,
        borderColor: dragging ? 'purple' : style?.borderColor,
        color: dragging ? 'purple' : style?.color,
      }}
      className={cn(className, classNames, {
        dragging,
      })}
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      {dragging ? (
        <p>Drop files here...</p>
      ) : (
        <p>Drag & drop files here, or click to select files</p>
      )}
      <input
        ref={inputRef}
        type="file"
        multiple
        style={{ display: 'none' }}
        onChange={handleFileSelection}
      />
      <div className="selected-files text-left">
        {files.length > 0 && (
          <>
            <h3 className="selected-files-title text-lg">Selected Files:</h3>
            <ul className="selected-file">
              {files.map((file, index) => (
                <li className="selected-file-title" key={index}>
                  {file.name}{' '}
                  <span
                    className="selected-file-icon text-red-500"
                    onClick={(e) => handleRemoveFile(e, file)}
                  >
                    X
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default DropZone;
