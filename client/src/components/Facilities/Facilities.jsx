import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import { useUser } from "../../context/UserDetailContext";
import axios from "axios";

const Facilities = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
}) => {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      bedrooms: propertyDetails.facilities?.bedrooms || 1,
      parkings: propertyDetails.facilities?.parkings || 1,
      bathrooms: propertyDetails.facilities?.bathrooms || 1,
    },
  });

  const { bedrooms, parkings, bathrooms } = form.values;
  const { user } = useAuth0();
  const { userDetails } = useUser();

  // Function to add property
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPropertyDetails((prev) => ({
      ...prev,
      facilities: { bedrooms, parkings, bathrooms },
    }));
    const token = userDetails?.token;
    console.log("Token used for property add:", token); // Debugging line
    if (!token) {
      toast.error("You must be logged in to add a property.");
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_USER_URL}/add/property`,
        {
          ...propertyDetails,
          facilities: { bedrooms, parkings, bathrooms },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Property added successfully");
      setPropertyDetails({
        title: "",
        description: "",
        price: 0,
        country: "",
        city: "",
        address: "",
        image: null,
        facilities: {
          bedrooms: 0,
          parkings: 0,
          bathrooms: 0,
        },
        location: {
          type: "Point",
          coordinates: [0, 0],
        },
      });
      setOpened(false);
      setActiveStep((prev) => prev + 1); // Move to next step
      navigate("/view-property");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error while adding property"
      );
    }
  };

  return (
    <Box maw="30%" mx="auto" my="sm">
      <form onSubmit={handleSubmit}>
        <NumberInput
          label="No of Bedrooms"
          min={0}
          {...form.getInputProps("bedrooms")}
        />
        <NumberInput
          label="No of Parkings"
          min={0}
          {...form.getInputProps("parkings")}
        />
        <NumberInput
          label="No of Bathrooms"
          min={0}
          {...form.getInputProps("bathrooms")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" color="green">
            Add Property
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Facilities;
