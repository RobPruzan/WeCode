import React, { useState } from 'react';

import { ImageComponent } from './ImageComponent';
import axios from 'axios';

export type ImageStuff = {
  title?: string;
  content?: string;
  image?: Blob | null;
};
const UploadAndDisplayImage = () => {
  const [imageStuff, setImageStuff] = useState<ImageStuff>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(imageStuff);
    let form_data = new FormData();
    if (
      imageStuff &&
      imageStuff.image &&
      imageStuff.title &&
      imageStuff.content
    ) {
      form_data.append('image', imageStuff.image);
      form_data.append('title', imageStuff.title);
      form_data.append('content', imageStuff.content);

      let url = 'http://localhost:8000/api/test';
      axios
        .post(url, form_data, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => console.log(err));
    } else {
      console.log(
        'not sending anything',
        imageStuff,
        imageStuff && imageStuff.image,
        imageStuff && imageStuff.title,
        imageStuff && imageStuff.content
      );
    }
  };
  return (
    <div>
      {/* <h1>Upload and Display Image usign React Hook's</h1>
      {selectedImage && (
        <div>
          <img
            alt="not fount"
            width={'250px'}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}
      <br />

      <br />
      <input
        type="file"
        name="myImage"
        onChange={event => {
          const a = event.target.files && event.target.files[0];
          console.log(event.target.files && event.target.files[0]);
          if (event.target.files) {
            setSelectedImage(event.target.files[0]);
          }
        }}
      /> */}
      <ImageComponent formData={imageStuff?.image} />

      <form onSubmit={handleSubmit}>
        <p>
          <input
            type="text"
            placeholder="Title"
            id="title"
            value={imageStuff?.title}
            onChange={e =>
              setImageStuff(prev => ({
                ...prev,
                title: e.target.value,
              }))
            }
            required
          />
        </p>
        <p>
          <input
            type="text"
            placeholder="Content"
            id="content"
            value={imageStuff?.content}
            onChange={e =>
              setImageStuff(prev => ({
                ...prev,
                content: e.target.value,
              }))
            }
            required
          />
        </p>
        <p>
          <input
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            onChange={e =>
              setImageStuff(prev => ({
                ...prev,
                image: e.target.files && e.target.files[0],
              }))
            }
            required
          />
        </p>
        <input type="submit" />
      </form>
    </div>
  );
};

export default UploadAndDisplayImage;
