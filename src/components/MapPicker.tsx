import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface MapPickerProps {
  value: string;
  onChange: (val: string) => void;
}

const MapPicker: React.FC<MapPickerProps> = ({ value, onChange }) => {
  const handleSelect = () => {
    const fakeCoords = "12.9716, 77.5946"; // mock: Bangalore coords
    onChange(fakeCoords);
  };

  return (
    <Box
      onClick={handleSelect}
      p={4}
      border="2px dashed gray"
      borderRadius="md"
      textAlign="center"
      cursor="pointer"
      _hover={{ bg: "gray.50" }}
    >
      <Text>{value || "Click to pick a mock location"}</Text>
    </Box>
  );
};

export default MapPicker;
