import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Avatar,
  Divider,
  IconButton,
  List,
  Text,
} from "react-native-paper";
import MapView from "react-native-maps";
import { SliderBox } from "react-native-image-slider-box";
import { useTheme } from "../../../contexts/ThemeContext";
import ListingTypeChip from "../../../components/ListingTypeChip/ListingTypeChip";
import commaNumber from "comma-number";

//Es un work in progress. Tengo un quilombo de estilos y cosas por todos lados. No me juzguen :P

export const ListingPost = ({ navigation, ...props }) => {
  const { theme } = useTheme();
  const [like, setLike] = useState(false);
  const listing = props.route.params;

  const handleLikePress = () => {
    setLike(!like);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header elevated={true}>
        <Appbar.BackAction onPress={() => navigation.navigate("Home")} />
        <Appbar.Content title={listing.location} />
      </Appbar.Header>

      <ScrollView vertical style={styles.listingContainer}>
        <View style={styles.containerImage}>
          <SliderBox
            dotColor={theme.colors.primary}
            inactiveDotColor={theme.colors.secondary}
            images={[
              listing.image,
              listing.image,
              listing.image,
              listing.image,
            ]}
            circleLoop
            imageLoader={() => (
              <ActivityIndicator size="large" color={theme.colors.primary} />
            )}
          />
        </View>
        <View style={styles.listingDetailsContainer}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 16,
              marginTop: 8,
            }}
          >
            <View>
              <ListingTypeChip listingType={listing.listingType}>
                {listing.listingType}
              </ListingTypeChip>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignSelf: "flex-end",
              }}
            >
              <IconButton
                icon={like ? "heart" : "heart-outline"}
                mode={like && "contained"}
                onPress={handleLikePress}
              />
              <IconButton icon="share-variant" />
            </View>
          </View>
          <View style={styles.containerDescription}>
            <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Text
                variant="titleLarge"
                style={{ color: theme.colors.primary, fontWeight: 800 }}
              >
                {listing.type}
              </Text>
              <Text
                variant="labelLarge"
                style={{ color: theme.colors.secondary }}
              >
                {listing.location}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",

                alignItems: "center",
              }}
            >
              <IconButton icon="currency-usd" />
              <View>
                <Text variant="titleLarge" style={styles.price}>
                  {commaNumber(listing.price)}
                </Text>
                <Text
                  variant="labelSmall"
                  style={{ color: theme.colors.secondary }}
                >
                  +50,000 expensas
                </Text>
              </View>
            </View>
          </View>

          <Divider />
          <List.Subheader style={{ fontWeight: 800 }}>
            Publicado por
          </List.Subheader>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 24,
              alignItems: "center",
              paddingHorizontal: 16,
              marginBottom: 16,
            }}
          >
            <Avatar.Icon icon="account" size={36} />
            <Text variant="titleMedium">Cosme Fulanito Rodriguez</Text>
          </View>
          <Divider />

          <View>
            <List.Subheader style={{ fontWeight: 800 }}>
              Descripción
            </List.Subheader>
            <Text variant="bodyLarge" style={styles.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
              iste ea doloremque. Ipsum voluptatum aspernatur, facere magni
              vero, non excepturi aperiam libero rem neque suscipit qui amet vel
              fuga ducimus! Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Culpa iste ea doloremque. Ipsum voluptatum aspernatur,
              facere magni vero, non excepturi aperiam libero rem neque suscipit
              qui amet vel fuga ducimus! Lorem ipsum dolor sit amet consectetur
              adipisicing
            </Text>
          </View>
          <Divider />
          <List.Subheader style={{ fontWeight: 800 }}>
            Características
          </List.Subheader>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              paddingBottom: 16,
              alignContent: "center",
              flexWrap: "wrap",
            }}
          >
            <List.Item
              title="Superficie"
              description="120 m2"
              left={(props) => <List.Icon {...props} icon="texture-box" />}
              titleStyle={{ fontWeight: 800 }}
              width={180}
            />
            <List.Item
              title="Habitaciones"
              description="4"
              left={(props) => <List.Icon {...props} icon="floor-plan" />}
              titleStyle={{ fontWeight: 800 }}
              width={180}
            />
            <List.Item
              title="Baños"
              description="2"
              left={(props) => <List.Icon {...props} icon="toilet" />}
              titleStyle={{ fontWeight: 800 }}
              width={180}
            />
            <List.Item
              title="Antigüedad"
              description="4"
              left={(props) => <List.Icon {...props} icon="clock-outline" />}
              titleStyle={{ fontWeight: 800 }}
              width={180}
            />
            <List.Item
              title="Estado"
              description="Excelente"
              left={(props) => <List.Icon {...props} icon="list-status" />}
              titleStyle={{ fontWeight: 800 }}
              width={180}
            />
            <List.Item
              title="Animales"
              description="Acepta"
              left={(props) => <List.Icon {...props} icon="paw" />}
              titleStyle={{ fontWeight: 800 }}
              width={180}
            />
          </View>
          <Divider />
          <List.Subheader style={{ fontWeight: 800 }}>
            Vista satelital
          </List.Subheader>

          <View
            style={{
              height: 280,
              zIndex: -1,
              borderRadius: 16,
              overflow: "hidden",
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 16,
              marginHorizontal: 48,
            }}
          >
            <MapView
              style={{
                flex: 1,
                height: "100%",
                width: "100%",
                borderRadius: 16,
                paddingHorizontal: 16,
              }}
            />
          </View>

          <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
            <IconButton
              icon={like ? "heart" : "heart-outline"}
              mode={like && "contained"}
              onPress={() => navigation.navigate("BookingDate")}
            />
            <IconButton icon="share-variant" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listingContainer: {
    flex: 1,
  },
  containerImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  listingDetailsContainer: {
    paddingHorizontal: 16,
  },
  containerDescription: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontWeight: 800,
  },
  description: {
    textAlign: "justify",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default ListingPost;
