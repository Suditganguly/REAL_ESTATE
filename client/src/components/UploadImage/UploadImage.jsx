import React, { useState, useRef } from "react";
import { BiImageAdd, BiTrash, BiRotateLeft } from "react-icons/bi";
import { MdOutlinePhotoFilter } from "react-icons/md";
import "./UploadImage.css";
import { Button, Group, Text, ActionIcon, Tooltip } from "@mantine/core";
import axios from "axios";

const UploadImage = ({ propertyDetails, setPropertyDetails, nextStep, prevStep }) => {
  const [imageURL, setImageURL] = useState(propertyDetails.image || null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const [previewRotation, setPreviewRotation] = useState(0);
  const [filter, setFilter] = useState('none');

  const filters = {
    none: 'none',
    grayscale: 'grayscale(100%)',
    sepia: 'sepia(100%)',
    warm: 'sepia(50%) saturate(150%)',
    cool: 'hue-rotate(180deg) saturate(120%)',
    bright: 'brightness(120%) contrast(110%)'
  };

  const handleImageUpload = async (file) => {
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPG, PNG, or WEBP)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post(
        `${import.meta.env.VITE_USER_URL}/image/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          },
        }
      );

      setImageURL(response.data.imageUrl);
      setUploadProgress(0);
    } catch (err) {
      setError(err.response?.data?.message || 'Error uploading image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleNext = () => {
    setPropertyDetails((prev) => ({ 
      ...prev, 
      image: imageURL,
      imageStyle: {
        rotation: previewRotation,
        filter: filter
      }
    }));
    nextStep();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    handleImageUpload(file);
  };

  const rotateImage = () => {
    setPreviewRotation((prev) => (prev + 90) % 360);
  };

  const cycleFilter = () => {
    const filterKeys = Object.keys(filters);
    const currentIndex = filterKeys.indexOf(filter);
    const nextIndex = (currentIndex + 1) % filterKeys.length;
    setFilter(filterKeys[nextIndex]);
  };

  const removeImage = () => {
    setImageURL(null);
    setPreviewRotation(0);
    setFilter('none');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="uploadWrapper">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {!imageURL ? (
        <div
          className={`uploadZone ${isDragging ? 'dragActive' : ''} ${error ? 'errorState' : ''}`}
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <BiImageAdd size={60} className="icon" />
          <Text className="text">
            Click or drag image to upload
          </Text>
          <Text className="subText">
            Supports: JPG, JPEG, PNG, WEBP (max 5MB)
          </Text>
          {error && <Text color="red" size="sm" mt="xs">{error}</Text>}
          {isUploading && (
            <>
              <Text size="sm" mt="md">Uploading... {uploadProgress}%</Text>
              <div className="uploadProgress">
                <div 
                  className="uploadProgressBar" 
                  style={{ width: `${uploadProgress}%` }} 
                />
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="uploadedImageContainer">
          <div className="imageControls">
            <Tooltip label="Rotate Image">
              <ActionIcon onClick={rotateImage} variant="filled" color="blue" size="lg">
                <BiRotateLeft size={20} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Change Filter">
              <ActionIcon onClick={cycleFilter} variant="filled" color="blue" size="lg">
                <MdOutlinePhotoFilter size={20} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Remove Image">
              <ActionIcon onClick={removeImage} variant="filled" color="red" size="lg">
                <BiTrash size={20} />
              </ActionIcon>
            </Tooltip>
          </div>
          <div
            className="uploadedImage"
            onClick={() => fileInputRef.current?.click()}
          >
            <img 
              src={imageURL} 
              alt="Property" 
              style={{ 
                transform: `rotate(${previewRotation}deg)`,
                filter: filters[filter]
              }}
            />
            <span className="changeText">Click to Change Image</span>
          </div>
          <Text size="sm" color="dimmed" mt="xs" align="center">
            Current filter: {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </Text>
        </div>
      )}

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={!imageURL || isUploading}
          color="blue"
        >
          Next
        </Button>
      </Group>
    </div>
  );
};

export default UploadImage;
