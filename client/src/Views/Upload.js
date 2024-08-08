import React, { useState } from 'react';
import axios from 'axios';

function Upload({ history, mostrarError }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Debes seleccionar un archivo.');
      return;
    }

    const formData = new FormData();
    formData.append('files', selectedFile);
    formData.append('caption', caption); // Agrega el caption al FormData

    try {
      const response = await axios.post('/api/posts/newupload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      history.push('/');

    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };

  return (
    <>
      <div className="Upload">
        <form onSubmit={handleSubmit}>
          <div className="Upload__image-section">
            <input
              type="file"
              name="files"
              id="fileInput"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
            />
          </div>
          <textarea
            name="caption"
            className="Upload__caption"
            required
            maxLength="180"
            placeholder="Caption de tu post."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <button className="Upload__submit" type="submit">
            Post
          </button>
        </form>
      </div>
    </>
  );
}

export default Upload;


