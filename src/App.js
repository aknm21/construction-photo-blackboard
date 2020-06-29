import React, {useState} from 'react';
import './App.css';
import ImageUploadForm from './ImageUploadForm';
import ImageCanvas from './ImageCanvas';
import Controller from './Controller';

const createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

const App = () => {
  // const [img, inverse] = useState({done: false, id: 0});
  const [uploadImage, setImage] = useState("");
  // const [boardFormat, setBoard] = useState([])

  // const handleToggle = (img) => {
  //   inverse({done: !img.done, id: img.id})
  // }

  const handleChangeFile = (e) => {
    const files = e.target.files;
    const imageUrl = createObjectURL(files[0]);
    setImage(imageUrl);
  }

  const clearImageSrc = () => {
    setImage("");
  }

  return (
    <div className="App">
      <header className="App-header">
        <ImageUploadForm
          clearImageSrc={clearImageSrc}
          handleChangeFile={handleChangeFile}
          />
        <ImageCanvas
          uploadImage={uploadImage}
        />
        <Controller />
      </header>
    </div>
  );
}

export default App;
