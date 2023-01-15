import React, { useEffect, useState } from 'react';
export type ImageComponentProps = {
  formData: any;
};
export function ImageComponent({ formData }: ImageComponentProps) {
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  // useEffect(() => {
  //   fetch(props.imageUrl)
  //     .then(response => response.blob())
  //     .then(blob => URL.createObjectURL(blob))
  //     .then(url => setImageUrl(url))
  //     .catch(error => console.error(error));
  // }, [props.imageUrl]);

  return (
    <>
      <button
        onClick={() => {
          fetch('https://api.cloudflare.com/client/v4/images', {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer u-bIjI0Wu2kAK6ugMGpn6ZE5ZKzsyL4ntrATzTgT',
            },
            body: formData,
          })
            .then(response => response.json())
            .then(data => {
              const imageUrl = data.url;
              setImageUrl(imageUrl);
              // Use the imageUrl to display the image in your app
            });
        }}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Get Image
      </button>
      <img src={imageUrl} alt="Image" />
    </>
  );
}
