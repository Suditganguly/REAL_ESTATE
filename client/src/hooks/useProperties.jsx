import React, { useState, useEffect } from "react";

// Mock property data from PropertyPage.jsx - formatted for PropertyCard component
const mockProperties = [
  {
    id: 1,
    title: 'Sunset Villa',
    place: 'Goa',
    price: '2,50,00,000',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    description: 'A luxurious villa with a sea view, modern interiors, and a private pool.',
  },
  {
    id: 2,
    title: 'Urban Heights',
    place: 'Mumbai',
    price: '3,10,00,000',
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    description: 'High-rise apartment with city view, gym, and clubhouse access.',
  },
  {
    id: 3,
    title: 'Green Acres',
    place: 'Bangalore',
    price: '1,80,00,000',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80',
    description: 'Eco-friendly home with solar panels and a green backyard.',
  },
  {
    id: 4,
    title: 'Palm Residency',
    place: 'Pune',
    price: '2,10,00,000',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80',
    description: 'Spacious flat with palm-lined views and elegant interiors.',
  },
  {
    id: 5,
    title: 'Lakeview Mansion',
    place: 'Udaipur',
    price: '4,00,00,000',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    description: 'Palatial mansion with a lake view, marble floors, and a home theater.',
  },
  {
    id: 6,
    title: 'Royal Enclave',
    place: 'Delhi',
    price: '3,50,00,000',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80',
    description: 'Elegant home in a gated community with traditional decor.',
  },
  {
    id: 7,
    title: 'Hilltop Cottage',
    place: 'Shimla',
    price: '1,20,00,000',
    image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=400&q=80',
    description: 'Cozy cottage with a fireplace and panoramic hill views.',
  },
  {
    id: 8,
    title: 'Seaside Retreat',
    place: 'Chennai',
    price: '2,80,00,000',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80',
    description: 'Beachfront property with open interiors and a large patio.',
  },
];

const useProperties = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      try {
        setData(mockProperties);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const refetch = () => {
    setIsLoading(true);
    setIsError(false);
    setTimeout(() => {
      setData(mockProperties);
      setIsLoading(false);
    }, 500);
  };

  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};

export default useProperties;
