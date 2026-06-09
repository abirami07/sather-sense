import React, { useState } from 'react';

const UploadFloorPlanPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
    setStatus(null);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setStatus('Please select a file first.');
      return;
    }
    // For now we only simulate upload.
    setStatus(`Simulated upload of "${selectedFile.name}".`);
  };

  return (
    <main>
      <h2>Upload Floor Plan</h2>
      <p>
        Supported formats: JPG, PNG, PDF. This page only simulates uploads for now.
      </p>

      <div style={{ marginTop: 16, marginBottom: 16 }}>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleFileChange}
        />
      </div>

      <button onClick={handleUpload}>Upload</button>

      {status && <p style={{ marginTop: 12 }}>{status}</p>}
    </main>
  );
};

export default UploadFloorPlanPage;

