// import React, { useContext, useEffect, Link } from "react";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
// COMMENT THIS TEMPORARILY IF IT CRASHES
import { UserDetailContext } from "../../context/UserDetailContext";

const Facilities = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
}) => {
    const navigate = useNavigate(); // Add this right after the component declaration
  // console.log("✅ Facilities component loaded");

  const form = useForm({
    initialValues: {
      bedrooms: 1,
      parkings: 1,
      bathrooms: 1,
    },
  });

  // const { bedrooms, parkings, bathrooms } = form.values;
  // const { user } = useAuth0();

  // Log auth0 user
  // console.log("Auth0 user:", user);
  // ...existing code...
  const { bedrooms, parkings, bathrooms } = form.values;
  const { user, isLoading: authLoading, error: authError } = useAuth0();

  // Add auth state effect
  // useEffect(() => {
  //   if (authError) {
  //     toast.error("Authentication error. Please try again.");
  //     console.error("Auth0 error:", authError);
  //   }
  //   if (!user && !authLoading) {
  //     toast.warning("Please login to add properties");
  //   }
  // }, [user, authLoading, authError]);

  // Safe Context read
  let token = "";
  try {
    const context = useContext(UserDetailContext);
    token = context?.userDetails?.token;
    console.log("Token from context:", token);
  } catch (err) {
    console.log("⚠️ Error accessing context:", err);
  }

  // const handleSubmit = () => {
  //   const { hasErrors } = form.validate();
  //   if (!hasErrors) {
  //     setPropertyDetails((prev) => ({
  //       ...prev,
  //       facilities: { bedrooms, parkings, bathrooms },
  //     }));
  //     mutate();
  //   }
  // };

  const handleSubmit = () => {
    if (!user) {
      toast.warning("Please login to add properties");
      return;
    }

    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        facilities: { bedrooms, parkings, bathrooms },
      }));
      mutate();
    }
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      createResidency(
        { ...propertyDetails, facilities: { bedrooms, parkings, bathrooms } },
        token
      ),
    onSuccess: () => {
      toast.success("Property added");
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
        userEmail: user?.email,
      });
      setOpened(false);
      setActiveStep(0);
      navigate('/properties');
    },
    onError: (error) => {
      console.log("❌ Error while creating residency:", error);
      toast.error("Error while adding property");
    },
  });

  return (
    <Box maw="30%" mx="auto" my="sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
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
            <Button
              type="submit"
              color="green"
              disabled={isLoading || authLoading}
            >
              {isLoading ? "Adding..." : "Add Property"}
            </Button>
        
        </Group>
      </form>
    </Box>
  );
};

export default Facilities;
