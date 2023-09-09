import React, { useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
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
import Carousel from "react-native-reanimated-carousel";
import { useTheme } from "../../../contexts/ThemeContext";
import ListingTypeChip from "../../../components/ListingTypeChip/ListingTypeChip";
import commaNumber from "comma-number";

//Es un work in progress. Tengo un quilombo de estilos y cosas por todos lados. No me juzguen :P

export const ListingPost = ({ navigation, ...props }) => {
  const { theme } = useTheme();
  const [like, setLike] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const listing = props.route.params;

  const handleLikePress = () => {
    setLike(!like);
  };

  const width = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <Appbar.Header elevated={true}>
        <Appbar.BackAction onPress={() => navigation.navigate("Home")} />
        <Appbar.Content title={listing.location} />
      </Appbar.Header>

      <ScrollView vertical style={styles.listingContainer}>
        <View style={styles.containerImage}>
          <Carousel
            loop
            width={width}
            height={width / 2}
            scrollAnimationDuration={1000}
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
            data={[listing.image, listing.image, listing.image]}
            renderItem={({ item, index }) => (
              <View style={styles.containerImageCarousel}>
                {imageLoading && (
                  <ActivityIndicator style={styles.activityIndicatorImage} />
                )}
                <Image
                  key={index + item}
                  style={styles.listingImage}
                  src={item}
                  onLoadStart={() => setImageLoading(true)}
                  onLoadEnd={() => setImageLoading(false)}
                  mode="cover"
                />
              </View>
            )}
          />
        </View>

        <View style={styles.listingDetailsContainer}>
          <View style={styles.topListingDetailsContainer}>
            <ListingTypeChip listingType={listing.listingType}>
              {listing.listingType}
            </ListingTypeChip>
            <View style={styles.actionButtonsContainer}>
              <IconButton
                icon={like ? "heart" : "heart-outline"}
                mode={like && "contained"}
                onPress={handleLikePress}
              />
              <IconButton
                icon="share-variant"
                onPress={() => console.debug("Share TBD")}
              />
            </View>
          </View>
          <View style={styles.containerListingMainDetails}>
            <View style={styles.containerHomeLocationDetails}>
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
            <View style={styles.containerPriceDetails}>
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
          <List.Subheader style={styles.listSubheader}>
            Publicado por
          </List.Subheader>
          <View style={styles.containerListingOwner}>
            <Avatar.Icon icon="account" size={36} />
            <Text variant="titleMedium">Cosme Fulanito Rodriguez</Text>
          </View>
          <Divider />

          <View>
            <List.Subheader style={styles.listSubheader}>
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
          <List.Subheader style={styles.listSubheader}>
            Características
          </List.Subheader>

          <View style={styles.containerListingSpecialDetails}>
            <List.Item
              title="Superficie"
              description="120 m2"
              left={(props) => <List.Icon {...props} icon="texture-box" />}
              titleStyle={{ fontWeight: 800 }}
              width={width / 2 - 16}
            />
            <List.Item
              title="Habitaciones"
              description="4"
              left={(props) => <List.Icon {...props} icon="floor-plan" />}
              titleStyle={{ fontWeight: 800 }}
              width={width / 2 - 16}
            />
            <List.Item
              title="Baños"
              description="2"
              left={(props) => <List.Icon {...props} icon="toilet" />}
              titleStyle={{ fontWeight: 800 }}
              width={width / 2 - 16}
            />
            <List.Item
              title="Antigüedad"
              description="4"
              left={(props) => <List.Icon {...props} icon="clock-outline" />}
              titleStyle={{ fontWeight: 800 }}
              width={width / 2 - 16}
            />
            <List.Item
              title="Estado"
              description="Excelente"
              left={(props) => <List.Icon {...props} icon="list-status" />}
              titleStyle={{ fontWeight: 800 }}
              width={width / 2 - 16}
            />
            <List.Item
              title="Animales"
              description="Acepta"
              left={(props) => <List.Icon {...props} icon="paw" />}
              titleStyle={{ fontWeight: 800 }}
              width={width / 2 - 16}
            />
          </View>
          <Divider />
          <List.Subheader style={styles.listSubheader}>
            Vista satelital
          </List.Subheader>

          <View style={styles.containerMapView}>
            <MapView style={styles.mapView} />
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
  topListingDetailsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 8,
  },
  actionButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  listingDetailsContainer: {
    paddingHorizontal: 16,
  },
  containerListingMainDetails: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerHomeLocationDetails: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  containerPriceDetails: {
    display: "flex",
    flexDirection: "row",

    alignItems: "center",
  },
  price: {
    fontWeight: 800,
  },
  containerListingOwner: {
    display: "flex",
    flexDirection: "row",
    gap: 24,
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  description: {
    textAlign: "justify",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  containerListingSpecialDetails: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 16,
    flexWrap: "wrap",
  },
  elemento: {
    alignItems: "center",
    textAlign: "center",
  },
  listSubheader: { fontWeight: 800 },
  containerImageCarousel: {
    flex: 1,
  },
  activityIndicatorImage: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  listingImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  containerMapView: {
    height: 280,
    zIndex: -1,
    borderRadius: 16,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
    marginHorizontal: 48,
  },
  mapView: {
    flex: 1,
    height: "100%",
    width: "100%",
    borderRadius: 16,
    paddingHorizontal: 16,
  },
});

export default ListingPost;
