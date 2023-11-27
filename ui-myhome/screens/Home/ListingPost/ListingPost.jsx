import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Avatar,
  Button,
  Divider,
  IconButton,
  List,
  Switch,
  Text,
  TextInput,
} from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";
import { useTheme } from "../../../contexts/ThemeContext";
import ListingTypeChip from "../../../components/ListingTypeChip/ListingTypeChip";
import commaNumber from "comma-number";
import AntDesign from "@expo/vector-icons/AntDesign";
import SelectDropdown from "react-native-select-dropdown";
import { useUserContext } from "../../../contexts/UserContext";
import { isStringALink, upperCaseFirst } from "../../../helpers/helpers";

export const ListingPost = ({ navigation, ...props }) => {
  const { user, isUserLogged } = useUserContext();

  // Si es owner
  const [isOwner, setIsOwner] = useState(user?.isRealtor || false);

  //toggle edit
  const [edit, setEdit] = useState(false);

  const handleEdition = () => {
    if (edit) {
      Alert.alert("Propiedad editada", "Desea guardar los cambios?", [
        {
          text: "Cancelar",
          onPress: () => (console.log("Cancel Pressed"), setEdit(!edit)),
        },
        {
          text: "Guardar",
          onPress: () => (console.log("Cambios guardados"), setEdit(!edit)),
        }, //Aca deberia enviar los datos al backend
      ]);
    } else {
      setEdit(!edit);
    }
  };

  const { theme } = useTheme();
  const [like, setLike] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const listing = props.route.params;
  const [listingRealtorName, setListingRealtorName] = useState(null);
  const [listingRealtorAvatar, setListingRealtorAvatar] = useState(null);

  const getNameFromId = async (id) => {
    try {
      const response = await fetch(
        `http://3.144.94.74:8000/api/realtors/${id}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to get name from ID", error);
      throw error;
    }
  };

  useEffect(() => {
    const getListingRealtorData = async () => {
      console.log(listing?.realtorId);
      if (listing?.realtorId === undefined) return;
      const realtorName = await getNameFromId(listing.realtorId);
      setListingRealtorName(realtorName.name);
      setListingRealtorAvatar(realtorName.logo);
    };
    getListingRealtorData();
  }, [listing?.realtorId]);

  const handleLikePress = () => {
    const userId = user?._id; // Assuming you have the user ID available
    const postId = listing.realtorId; // Assuming you have the post ID available

    if (like) {
      // Remove favorite
      fetch(`http://3.144.94.74:8000/api/users/${userId}/favorites/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, postId }),
      })
        .then((response) => {
          if (response.ok) {
            setLike(false);
          } else {
            // Handle error
            console.error("Failed to remove favorite");
          }
        })
        .catch((error) => {
          // Handle error
          console.error("Failed to remove favorite", error);
        });
    } else {
      // Add favorite
      fetch(`http://3.144.94.74:8000/api/users/${userId}/favorites/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, postId }),
      })
        .then((response) => {
          if (response.ok) {
            setLike(true);
          } else {
            // Handle error
            console.error("Failed to add favorite");
          }
        })
        .catch((error) => {
          // Handle error
          console.error("Failed to add favorite", error);
        });
    }
  };

  const width = Dimensions.get("window").width;

  const handleDelete = () => {
    Alert.alert(
      "Eliminar propiedad",
      "La propiedad se eliminara permanentemente. Esta seguro que desea eliminarla?",
      [
        { text: "Cancelar", onPress: () => console.log("Cancel Pressed") },
        {
          text: "Eliminar",
          onPress: () => (
            console.log("Propiedad eliminada"), navigation.navigate("Home")
          ),
        },
      ]
    );
  };

  const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];

  const [type, setType] = useState("");
  const [property, setProperty] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [expenses, setExpenses] = useState("");
  const [description, setDescription] = useState("");
  const [cubiertos, setCubiertos] = useState("");
  const [descubiertos, setDescubiertos] = useState("");
  const [ambientes, setAmbientes] = useState("");
  const [dormitorios, setDormitorios] = useState("");
  const [baños, setBaños] = useState("");
  const [antiguedad, setAntiguedad] = useState("");
  const [orAbsoluta, setOrAbsoluta] = useState("");
  const [orRelativa, setOrRelativa] = useState("");

  const [cocheras, setCocheras] = useState(true);
  const [terraza, setTerraza] = useState(true);
  const [balcon, setBalcon] = useState(true);

  const handleType = (e) => {
    setType(e);
  };

  const handleProperty = (e) => {
    setProperty(e);
  };

  const handleLocation = (e) => {
    setLocation(e);
  };

  const handlePrice = (e) => {
    setPrice(e);
  };

  const handleExpenses = (e) => {
    setExpenses(e);
  };

  const handleDescription = (e) => {
    setDescription(e);
  };

  const handleCubiertos = (e) => {
    setCubiertos(e);
  };

  const handleDescubiertos = (e) => {
    setDescubiertos(e);
  };

  const handleDormitorios = (e) => {
    setDormitorios(e);
  };

  const handleBaños = (e) => {
    setBaños(e);
  };

  const handleAntiguedad = (e) => {
    setAntiguedad(e);
  };

  const handleOrAbsoluta = (e) => {
    setOrAbsoluta(e);
  };

  const handleOrRelativa = (e) => {
    setOrRelativa(e);
  };

  const handleAmbientes = (e) => {
    setAmbientes(e);
  };

  const onToggleCocheras = () => {
    setCocheras(!cocheras);
  };

  const onToggleTerraza = () => {
    setTerraza(!terraza);
  };

  const onToggleBalcon = () => {
    setBalcon(!balcon);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title={listing?.location || listing?.property?.address?.neighborhood}
        />
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
            data={listing?.property?.photos || [listing?.image]}
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
            {edit ? (
              <SelectDropdown
                data={["Alquiler", "Venta"]}
                onSelect={(selectedItem, index) => {
                  handleType(selectedItem);
                }}
                buttonStyle={{
                  width: 150,
                  height: 30,
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#6750a4",
                }}
                buttonTextStyle={{ color: "#6750a4" }}
                renderDropdownIcon={() => {
                  return <AntDesign name="down" size={24} color="#6750a4" />;
                }}
                dropdownIconPosition={"right"}
                dropdownStyle={{
                  width: 200,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#6750a4",
                }}
                rowStyle={{
                  width: 200,
                  height: 50,
                  borderWidth: 1,
                  borderColor: "#6750a4",
                }}
                rowTextStyle={{ color: "#6750a4" }}
                defaultValueByIndex={0}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
            ) : (
              <ListingTypeChip
                listingType={listing?.property?.type || listing?.listingType}
              >
                {upperCaseFirst(listing?.type) || listing?.listingType}
              </ListingTypeChip>
            )}
            {isOwner ? (
              <View style={styles.actionButtonsContainer}>
                {edit ? (
                  <IconButton icon="check-bold" onPress={handleEdition} />
                ) : (
                  <IconButton icon="pencil" onPress={handleEdition} />
                )}
                <IconButton icon={"trash-can-outline"} onPress={handleDelete} />
              </View>
            ) : (
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
            )}
          </View>
          <View style={styles.containerListingMainDetails}>
            <View style={styles.containerHomeLocationDetails}>
              {edit ? (
                <TextInput
                  value={listing?.property?.type || listing?.type}
                  className="rounded-t-md w-[180px] "
                  label={"Tipo propiedad"}
                  onChange={(property) => handleProperty(property)}
                  mode="outlined"
                />
              ) : (
                <Text
                  variant="titleLarge"
                  style={{
                    color: theme.colors.primary,
                    fontWeight: 800,
                    overflow: "hidden",
                    width: 180,
                  }}
                  numberOfLines={3}
                  ellipsizeMode="tail"
                >
                  {listing?.title || listing?.type}
                </Text>
              )}
              {edit ? (
                <TextInput
                  value={listing?.property?.neighborhood || listing?.location}
                  className="rounded-t-md w-[170px]"
                  label={"Ubicacion"}
                  onChange={(location) => handleLocation(location)}
                  mode="outlined"
                />
              ) : (
                <Text
                  variant="labelLarge"
                  style={{ color: theme.colors.secondary }}
                >
                  {listing?.property?.address?.neighborhood ||
                    listing?.location}
                </Text>
              )}
            </View>
            <View style={styles.containerPriceDetails}>
              <IconButton icon="currency-usd" />
              <View>
                {edit ? (
                  <TextInput
                    value={commaNumber(listing?.price?.amount) || "Mock"}
                    className="rounded-t-md w-[100px]"
                    label={"Precio"}
                    onChange={(price) => handlePrice(price)}
                    mode="outlined"
                  />
                ) : (
                  <Text variant="titleLarge" style={styles.price}>
                    {commaNumber(listing?.price?.amount) || "Mock"}
                  </Text>
                )}
                {edit ? (
                  <TextInput
                    value={
                      commaNumber(listing?.property?.expensesPrice?.amount) ||
                      "Mock"
                    }
                    className="rounded-t-md w-[100px]"
                    label={"Expensas"}
                    onChange={(expenses) => handleExpenses(expenses)}
                    mode="outlined"
                  />
                ) : (
                  <Text
                    variant="labelSmall"
                    style={{ color: theme.colors.secondary }}
                  >
                    {commaNumber(listing?.property?.expensesPrice?.amount) ||
                      "Mock"}
                  </Text>
                )}
              </View>
            </View>
          </View>

          {edit ? null : (
            <View>
              <Divider />
              <List.Subheader style={styles.listSubheader}>
                Publicado por
              </List.Subheader>
              <View style={styles.containerListingOwner}>
                {listingRealtorAvatar && isStringALink(listingRealtorAvatar) ? (
                  <Avatar.Image
                    source={{ uri: listingRealtorAvatar }}
                    size={36}
                  />
                ) : (
                  <Avatar.Icon icon="account" size={36} />
                )}
                <Text variant="titleMedium">
                  {listingRealtorName || "Mocked Name"}
                </Text>
              </View>
              <Divider />
            </View>
          )}

          <View>
            <List.Subheader style={styles.listSubheader}>
              Descripción
            </List.Subheader>
            {edit ? (
              <TextInput
                value={listing.description}
                className="rounded-t-md w-[95%] ml-[10px] "
                multiline
                label={"Descripcion"}
                onChange={(description) => handleDescription(description)}
                mode="outlined"
              />
            ) : (
              <Text variant="bodyLarge" style={styles.description}>
                {listing.description ||
                  `Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                iste ea doloremque. Ipsum voluptatum aspernatur, facere magni
                vero, non excepturi aperiam libero rem neque suscipit qui amet
                vel fuga ducimus! Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Culpa iste ea doloremque. Ipsum voluptatum
                aspernatur, facere magni vero, non excepturi aperiam libero rem
                neque suscipit qui amet vel fuga ducimus! Lorem ipsum dolor sit
                amet consectetur adipisicing`}
              </Text>
            )}
          </View>
          <Divider />
          <List.Subheader style={styles.listSubheader}>
            Características
          </List.Subheader>

          <View style={styles.containerListingSpecialDetails}>
            {edit ? (
              <TextInput
                value={listing?.property?.sqm?.covered || "120"}
                className="rounded-t-md w-[170px] ml-[8px] mb-2"
                label={"Metros"}
                onChange={(cubiertos) => handleCubiertos(cubiertos)}
                mode="outlined"
              />
            ) : (
              <List.Item
                title="Metros"
                description={listing?.property?.sqm?.covered || "120"}
                left={(props) => <List.Icon {...props} icon="texture-box" />}
                titleStyle={{ fontWeight: 800 }}
                width={width / 2 - 16}
              />
            )}
            {edit ? (
              <TextInput
                value={listing?.property?.sqm?.uncovered || "120"}
                className="rounded-t-md w-[170px] ml-[8px] mb-2"
                label={"Descubiertos"}
                onChange={(descubiertos) => handleDescubiertos(descubiertos)}
                mode="outlined"
              />
            ) : (
              <List.Item
                title="Descubiertos"
                description={listing?.property?.sqm?.uncovered || "120"}
                left={(props) => <List.Icon {...props} icon="texture-box" />}
                titleStyle={{ fontWeight: 800 }}
                width={width / 2 - 16}
              />
            )}
            {edit ? (
              <TextInput
                value={listing?.property?.rooms || "4"}
                className="rounded-t-md w-[170px] ml-[8px] mb-2"
                label={"Ambientes"}
                onChange={(ambientes) => handleAmbientes(ambientes)}
                mode="outlined"
              />
            ) : (
              <List.Item
                title="Ambientes"
                description={listing?.property?.rooms || "4"}
                left={(props) => <List.Icon {...props} icon="floor-plan" />}
                titleStyle={{ fontWeight: 800 }}
                width={width / 2 - 16}
              />
            )}
            {edit ? (
              <TextInput
                value={listing?.property?.bedrooms || "4"}
                className="rounded-t-md w-[170px] ml-[8px] mb-2"
                label={"Dormitorios"}
                onChange={(dormitorios) => handleDormitorios(dormitorios)}
                mode="outlined"
              />
            ) : (
              <List.Item
                title="Dormitorios"
                description={listing?.property?.bedrooms || "4"}
                left={(props) => (
                  <List.Icon {...props} icon="bed-king-outline" />
                )}
                titleStyle={{ fontWeight: 800 }}
                width={width / 2 - 16}
              />
            )}
            {edit ? (
              <TextInput
                value={listing?.property?.bathrooms || "4"}
                className="rounded-t-md w-[170px] ml-[8px] mb-2"
                label={"Baños"}
                onChange={(baños) => handleBaños(baños)}
                mode="outlined"
              />
            ) : (
              <List.Item
                title="Baños"
                description={listing?.property?.bathrooms || "4"}
                left={(props) => <List.Icon {...props} icon="toilet" />}
                titleStyle={{ fontWeight: 800 }}
                width={width / 2 - 16}
              />
            )}
            {edit ? (
              <TextInput
                value={listing?.property?.age || "4"}
                className="rounded-t-md w-[170px] ml-[8px] mb-2"
                label={"Antiguedad"}
                onChange={(antiguedad) => handleAntiguedad(antiguedad)}
                mode="outlined"
              />
            ) : (
              <List.Item
                title="Antigüedad"
                description={listing?.property?.age || "4"}
                left={(props) => <List.Icon {...props} icon="clock-outline" />}
                titleStyle={{ fontWeight: 800 }}
                width={width / 2 - 16}
              />
            )}
            {edit ? (
              <TextInput
                value={listing?.property?.cardinalOrientation || "N"}
                className="rounded-t-md w-[170px] ml-[8px] mb-2"
                label={"Or. Absoluta"}
                onChange={(orAbsoluta) => handleOrAbsoluta(orAbsoluta)}
                mode="outlined"
              />
            ) : (
              <List.Item
                title="Or. Absoluta"
                description={listing?.property?.cardinalOrientation || "N"}
                left={(props) => <List.Icon {...props} icon="sign-direction" />}
                titleStyle={{ fontWeight: 800 }}
                width={width / 2 - 16}
              />
            )}
            {edit ? (
              <TextInput
                value={listing?.property?.relativeOrientation || "Frente"}
                className="rounded-t-md w-[170px] ml-[8px] mb-2"
                label={"Or. Relativa"}
                onChange={(orRelativa) => handleOrRelativa(orRelativa)}
                mode="outlined"
              />
            ) : (
              <List.Item
                title="Or. Relativa"
                description={listing?.property?.relativeOrientation || "Frente"}
                left={(props) => <List.Icon {...props} icon="sign-direction" />}
                titleStyle={{ fontWeight: 800 }}
                width={width / 2 - 16}
              />
            )}

            {edit ? (
              <View className="flex flex-row items-center w-[45%] justify-between ml-[12px] mt-2">
                <Text className="pb-[5px] text-[16px]">Cochera</Text>
                <Switch
                  className="rounded-t-md mb-2 "
                  label={"Cochera"}
                  value={cocheras}
                  onValueChange={onToggleCocheras}
                ></Switch>
              </View>
            ) : (
              <List.Item
                title="Cochera"
                description="Si"
                left={(props) => <List.Icon {...props} icon="car" />}
                titleStyle={{ fontWeight: 800 }}
                width={width / 2 - 16}
              />
            )}
            {edit ? (
              <View className="flex flex-row items-center w-[45%] justify-between ml-[12px] mt-2">
                <Text className="pb-[5px] text-[16px]">Terraza</Text>
                <Switch
                  className="rounded-t-md mb-2 "
                  label={"Terraza"}
                  value={terraza}
                  onValueChange={onToggleTerraza}
                ></Switch>
              </View>
            ) : (
              <List.Item
                title="Terraza"
                description="Si"
                left={(props) => <List.Icon {...props} icon="home-roof" />}
                titleStyle={{ fontWeight: 800 }}
                width={width / 2 - 16}
              />
            )}
            {edit ? (
              <View className="flex flex-row items-center w-[45%] justify-between ml-[12px] ">
                <Text className="pb-[5px] text-[16px]">Balcon</Text>
                <Switch
                  className="rounded-t-md mb-2 "
                  label={"Balcon"}
                  value={balcon}
                  onValueChange={onToggleBalcon}
                ></Switch>
              </View>
            ) : (
              <List.Item
                title="Balcon"
                description="Si"
                left={(props) => <List.Icon {...props} icon="balcony" />}
                titleStyle={{ fontWeight: 800 }}
                width={width / 2 - 16}
              />
            )}
          </View>

          {edit ? null : (
            <View>
              <Divider />
              <List.Subheader style={styles.listSubheader}>
                Vista satelital
              </List.Subheader>

              <View style={styles.containerMapView}>
                <Text>Placeholder for Map</Text>
              </View>
            </View>
          )}

          <View style={{ marginTop: 16, marginBottom: 32 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 24,
                justifyContent: "center",
              }}
            >
              {edit && isOwner && (
                <Button mode="contained" onPress={handleEdition}>
                  Guardar
                </Button>
              )}
            </View>

            {!isOwner && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 24,
                  justifyContent: "center",
                }}
              >
                <Button
                  mode="outlined"
                  onPress={() => navigation.navigate("SendQuestion")}
                >
                  Contactar
                </Button>
                <Button
                  mode="contained"
                  onPress={() => {
                    navigation.navigate("Booking", {
                      screen: "Info",
                      params: {
                        realtorId: listing.realtorId,
                        listingId: listing._id,
                      },
                    });
                  }}
                  icon={"calendar-clock"}
                  width={width / 2 - 16}
                >
                  Reservar
                </Button>
              </View>
            )}
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
    width: 350,
    zIndex: -1,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
    marginHorizontal: 6,
  },
  mapView: {
    flex: 1,
    height: "100%",
    width: "100%",
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  button: {
    marginVertical: 16,
    marginHorizontal: 20,
  },
});

export default ListingPost;
