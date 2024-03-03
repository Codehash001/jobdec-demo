'use client'
import { useState } from 'react';

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isRunning , setIsRunning] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileList = Array.from(files);
      setSelectedFiles(fileList);
    }
  };

  const handleRemoveFile = (fileName: string) => {
    const updatedFiles = selectedFiles.filter(
      (file) => file.name !== fileName
    );
    setSelectedFiles(updatedFiles);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Files uploaded successfully');
        // Optionally, you can reset the selected files state here
      } else {
        console.error('Failed to upload files');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const handleIngest = async () => {

    try {
      const response = await fetch('/api/ingest', {
        method: 'POST',
      });

      if (response.ok) {
        console.log('Files ingested successfully');
        setSelectedFiles([]);
      } else {
        console.error('Failed to ingest files');
      }
    } catch (error) {
      console.error('Error ingesting files:', error);
    }
  };

  const handleClearDirectory = async () => {

    try {
      const response = await fetch('/api/clearDir', {
        method: 'POST',
      });

      if (response.ok) {
        console.log('Files deleted successfully');
      } else {
        console.error('Failed to delete files');
      }
    } catch (error) {
      console.error('Error clearing directory:', error);
    }
  };

  const handleClickRun = async () => {
    setIsRunning(true);
    await handleClearDirectory();
    await handleUpload();
    await handleIngest();
    setIsRunning(false);
  }

  return (
    <div className='w-full flex flex-row items-start'>
        <div className='mt-3'>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className='hidden'
        id="fileInput"
      />
              <label
        htmlFor="fileInput" className='bg-green-500 px-6 py-3 rounded-md hover:cursor-pointer'>Select</label>

      <ul className='pt-5 h-[600px] overflow-y-auto'>
        {selectedFiles.map((file) => (
          <li key={file.name} className='my-2 p-1 bg-slate-50 w-full flex flex-row justify-between'>
            <button onClick={() => handleRemoveFile(file.name)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"></path></svg>
            </button>
            <h1 className='text-sm'>{file.name}</h1>
          </li>
        ))}
      </ul>
        </div>

      <button onClick={handleClickRun} className='px-6 py-3 rounded-3xl font-semibold border shadow-xl mx-4'>
        {isRunning? 'Running' : 'Run'}
      </button>
    </div>
  );
};

export default FileUpload;
