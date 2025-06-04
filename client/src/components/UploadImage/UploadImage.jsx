import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./UploadImage.css";
import { Button, Group } from "@mantine/core";

const UploadImage = ({ propertyDetails, setPropertyDetails, nextStep, prevStep }) => {
  const [imageURL, setImageURL] = useState(propertyDetails.image || null);
  const cloudinaryRef = useRef(null);
  const widgetRef = useRef(null);

  const handleNext = () => {
    setPropertyDetails((prev) => ({ ...prev, image: imageURL }));
    nextStep();
  };

  useEffect(() => {
    const initWidget = () => {
      if (window.cloudinary && window.cloudinary.createUploadWidget) {
        cloudinaryRef.current = window.cloudinary;

        widgetRef.current = cloudinaryRef.current.createUploadWidget(
          {
            cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
            uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
            maxFiles: 1,
            sources: ["local", "url", "camera"],
            cropping: false,
            folder: "uploads",
          },
          (err, result) => {
            if (!err && result.event === "success") {
              setImageURL(result.info.secure_url);
            } else if (err) {
              console.error("Upload Error:", err);
            }
          }
        );
      }
    };

    if (!window.cloudinary) {
      const interval = setInterval(() => {
        if (window.cloudinary) {
          initWidget();
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    } else {
      initWidget();
    }
  }, []);

  return (
    <div className="flexColCenter uploadWrapper">
      {!imageURL ? (
        <div
          className="flexColCenter uploadZone"
          onClick={() => widgetRef.current?.open()}
        >
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Upload Image</span>
        </div>
      ) : (
        <div
          className="uploadedImage"
          onClick={() => widgetRef.current?.open()}
        >
          <img src={imageURL} alt="Uploaded" />
          <span className="changeText">Click to Change Image</span>
        </div>
      )}

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!imageURL}>
          Next
        </Button>
      </Group>
    </div>
  );
};

export default UploadImage;
