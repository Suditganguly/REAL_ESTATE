import React, { useContext, useState } from "react";
import { Modal, Button, Group } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMutation } from "react-query";
import { UserDetailContext } from "../../context/UserDetailContext.jsx";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { BiCalendarCheck } from "react-icons/bi";

const BookingModal = ({ opened, setOpened, propertyId, email }) => {
  const [value, setValue] = useState(null);
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(UserDetailContext);

  const handleBookingSuccess = () => {
    setShowSuccess(true);
    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...(prev.bookings || []),
        {
          id: propertyId,
          date: dayjs(value).format("DD/MM/YYYY"),
        },
      ],
    }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email, token),
    onSuccess: () => handleBookingSuccess(),
    onError: (error) =>
      toast.error(error?.response?.data?.message || "Booking failed"),
  });

  const handleViewBookings = () => {
    setOpened(false);
    navigate("/bookings");
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        setOpened(false);
        setShowSuccess(false);
      }}
      title={showSuccess ? "Booking Confirmed!" : "Select your date of visit"}
      centered
    >
      {!showSuccess ? (
        <div className="flexColCenter" style={{ gap: "1rem" }}>
          <DatePicker
            value={value}
            onChange={setValue}
            minDate={new Date()}
            placeholder="Pick a date"
          />
          <Button disabled={!value || isLoading} onClick={() => mutate()}>
            Book visit
          </Button>
        </div>
      ) : (
        <div className="flexColCenter" style={{ gap: "1rem", padding: "1rem" }}>
          <div className="flexCenter" style={{ gap: "1rem" }}>
            <BiCalendarCheck size={25} color="#4CAF50" />
            <p style={{ margin: 0, fontSize: "1.1rem" }}>
              Your visit has been scheduled for {dayjs(value).format("DD/MM/YYYY")}
            </p>
          </div>
          <Group position="center" style={{ marginTop: "1rem" }}>
            <Button variant="outline" onClick={() => setOpened(false)}>
              Close
            </Button>
            <Button color="blue" onClick={handleViewBookings}>
              View All Bookings
            </Button>
          </Group>
        </div>
      )}
    </Modal>
  );
};

export default BookingModal;