import React from "react";
import { Chip } from "react-native-paper";

const ListingTypeChip = ({ children, listingType }) => (
  <Chip icon={listingType === "Alquiler" ? "key-chain" : "currency-usd"}>
    {children}
  </Chip>
);

export default ListingTypeChip;
