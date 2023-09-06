import React from "react";
import { Chip } from "react-native-paper";
import { StyleSheet } from "react-native";

const ListingTypeChip = ({ children, listingType }) => (
  <Chip
    icon={listingType === "Alquiler" ? "key-chain" : "currency-usd"}
    style={listingType === "Alquiler" ? styles.alquiler : styles.venta}
  >
    {children}
  </Chip>
);

const sharedStyles = {
  position: "absolute",
  zIndex: 1,
  right: 8,
  top: 8,
};

const styles = StyleSheet.create({
  //Esto nos permite customizar los estilos por si queremos definir colores para cada caso
  alquiler: {
    ...sharedStyles,
  },
  venta: {
    ...sharedStyles,
  },
});

export default ListingTypeChip;
