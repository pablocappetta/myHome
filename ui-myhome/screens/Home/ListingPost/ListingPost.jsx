import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
  Share
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
import ListingComments from "./ListingComments/ListingComments";
// import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export const ListingPost = ({ navigation, ...props }) => {
  const { user, setUser, setUserDataToAsyncStorage } = useUserContext();

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
          onPress: () => {
            updateProperty(), setEdit(!edit);
          },
        },
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
  const [listingRealtorComments, setListingRealtorComments] = useState(null);
  const [listingRealtorReviewScore, setListingRealtorReviewScore] = useState(null);
  const [isModalOpen, setIsDrawerOpen] = useState(false);


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
      console.log(realtorName);
      setListingRealtorName(realtorName?.name);
      setListingRealtorAvatar(realtorName?.logo);
      setListingRealtorComments(realtorName?.reviews);
      const reviewScore = realtorName?.reviews?.reduce((acc, review) => acc + review.rating, 0) / realtorName?.reviews?.length;
      setListingRealtorReviewScore(reviewScore);
    };
    getListingRealtorData();
  }, [listing?.realtorId]);

  const handleLikePress = async () => {
    const userId = user?._id; // Assuming you have the user ID available
    const postId = listing._id; // Assuming you have the post ID available

    if (like) {
      // Remove favorite
      await fetch(
        `http://3.144.94.74:8000/api/users/${userId}/favorites/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, postId }),
        }
      )
        .then((response) => {
          console.log(response);
          if (response.ok) {
            const newUser = {
              ...user,
              favoriteListings: user?.favoriteListings.filter((id) => id !== postId),
            };
            setUser(newUser);
            setUserDataToAsyncStorage(newUser);
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
      await fetch(
        `http://3.144.94.74:8000/api/users/${userId}/favorites/${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            const newUser = {
              ...user,
              favoriteListings: [...user?.favoriteListings, postId],
            };
            setUser(newUser);
            setUserDataToAsyncStorage(newUser);
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

  const handleSharePress = async () => {
    try {
      const result = await Share.share({
        message: `¡Hola! Te comparto esta propiedad que encontré en MyHome

        Titulo: ${listing?.title}. 
        Precio: ${listing?.price?.amount}.
        Descripción: ${listing?.description}.
        Tipo: ${listing?.type}.
        Ambientes: ${listing?.property?.rooms}.
        Baños: ${listing?.property?.bathrooms}.
        Dormitorios: ${listing?.property?.rooms}.
        Orientación absoluta: ${listing?.property?.cardinalOrientation}.
        Orientación relativa: ${listing?.property?.relativeOrientation}.
        Expensas: ${listing?.property?.expensesPrice?.amount ?? 'Sin Expensas'}.
        Antigüedad: ${listing?.property?.age}.
        `,
        url: listing?.property?.photos[0],
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log("shared with activity type of result.activityType");
        } else {
          // shared
          console.log("shared");
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log("dismissed");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSchedulePress = () => {
    const listingId = listing?._id;
    navigation.navigate("Booking", { screen: "Date", params: { listingId } });
  };

  const handleCommentsPress = () => {
    setIsDrawerOpen(true);
  };


  const width = Dimensions.get("window").width;

  const handleDelete = () => {
    Alert.alert(
      "Eliminar propiedad",
      "La propiedad se eliminará permanentemente. ¿Está seguro de que desea eliminarla?",
      [
        { text: "Cancelar", onPress: () => console.log("Cancel Pressed") },
        {
          text: "Eliminar",
          onPress: () => (
            fetch(`http://3.144.94.74:8000/api/listings/visit/${listing._id}`, {
              method: "DELETE",
            }),
            ToastAndroid.show("Propiedad eliminada", ToastAndroid.LONG),
            console.log(listing._id),
            navigation.navigate("Home")
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

  const [encabezado, setEncabezado] = useState(listing?.title);
  const [type, setType] = useState(listing?.type);
  const [property, setProperty] = useState(listing?.property?.type);
  const [provincia, setProvincia] = React.useState(
    listing?.property?.address?.state
  );
  const [ciudad, setCiudad] = React.useState(listing?.property?.address?.city);
  const [barrio, setBarrio] = React.useState(
    listing?.property?.address?.neighborhood
  );
  const [calle, setCalle] = React.useState(listing?.property?.address?.street);
  const [numero, setNumero] = React.useState(
    listing?.property?.address?.number
  );
  const [CP, setCP] = React.useState(listing?.property?.address?.zipCode);
  const [price, setPrice] = useState(listing?.price?.amount);
  const [expenses, setExpenses] = useState(
    listing?.property?.expensesPrice?.amount
  );
  const [description, setDescription] = useState(listing?.description);
  const [cubiertos, setCubiertos] = useState(listing?.property?.sqm?.covered);
  const [descubiertos, setDescubiertos] = useState(
    listing?.property?.sqm?.uncovered
  );
  const [ambientes, setAmbientes] = useState();
  const [dormitorios, setDormitorios] = useState(listing?.property?.rooms);
  const [baños, setBaños] = useState(listing?.property?.bathrooms);
  const [antiguedad, setAntiguedad] = useState(listing?.property?.age);
  const [orAbsoluta, setOrAbsoluta] = useState(
    listing?.property?.cardinalOrientation
  );
  const [orRelativa, setOrRelativa] = useState(
    listing?.property?.relativeOrientation
  );

  const [cocheras, setCocheras] = useState(true);
  const [terraza, setTerraza] = useState(true);
  const [balcon, setBalcon] = useState(true);

  const handleEncabezado = (e) => {
    setEncabezado(e);
  };

  const handleType = (e) => {
    setType(e.toLowerCase());

    console.log(e.toLowerCase());
  };

  const handleProperty = (e) => {
    // let proper = e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();
    setProperty(e);
    console.log(e);
  };

  const handleProvincia = (e) => {
    setProvincia(e);
  };

  const handleCiudad = (e) => {
    setCiudad(e);
  };

  const handleBarrio = (e) => {
    setBarrio(e);
  };

  const handleCalle = (e) => {
    setCalle(e);
  };

  const handleNumero = (e) => {
    setNumero(e);
  };

  const handleCP = (e) => {
    setCP(e);
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

  // property PUT request
  function updateProperty() {
    const requestBody = {
      title: encabezado,
      description: description,
      property: {
        age: parseInt(antiguedad),
        address: {
          state: provincia,
          city: ciudad,
          neighborhood: barrio,
          zipCode: CP,
          street: calle,
          number: parseInt(numero),
        },
        type: property,
        sqm: {
          covered: parseInt(cubiertos),
          uncovered: parseInt(descubiertos),
        },
        cardinalOrientation: orAbsoluta,
        relativeOrientation: orRelativa,
        rooms: parseInt(dormitorios),
        bathrooms: parseInt(baños),
        hasTerrace: terraza,
        hasBalcony: balcon,
        expensesPrice: {
          amount: parseInt(expenses),
        },
      },
      type: type,
      price: {
        amount: parseInt(price),
      },
    };
    fetch(`http://3.144.94.74:8000/api/listings/${listing._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data:", data);
        ToastAndroid.show("Propiedad actualizada", ToastAndroid.LONG);
        refresh;
      })
      .catch((err) => {
        console.log(err);
        ToastAndroid.show(
          "Lo sentimos, no pudimos actualizar la propiedad. Intentelo mas tarde.",
          ToastAndroid.LONG
        );
      });
  }

  // Map View
  const [region, setRegion] = useState({
    latitude: -34.6036844,
    longitude: -58.3815591,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  // const apiKey = process.env.GOOGLE_APIKEY;

  // Geocoder.init(apiKey);

  // const [address, setAddress] = useState("Buenos Aires");

  // useEffect(() => {
  //   Geocoder.from(address, apiKey).then((json) => {
  //     var location = json.results[0].geometry.location;
  //     console.log(address, location);
  //     setRegion({
  //       latitude: location.lat,
  //       longitude: location.lng,
  //       latitudeDelta: 0.02,
  //       longitudeDelta: 0.02,
  //     });
  //   });
  //   setAddress(
  //     `${listing?.property?.address?.street}, ${listing?.property?.address?.number}, ${listing?.property?.address?.city}, ${listing?.property?.address?.state}`
  //   );
  // }, [address]);

  // const mapa = () => {
  //   return (
  //     <MapView
  //       style={styles.mapView}
  //       // provider={PROVIDER_GOOGLE}
  //       region={region}
  //     >
  //       <Marker
  //         coordinate={{
  //           latitude: region.latitude,
  //           longitude: region.longitude,
  //         }}
  //         title={"Ubicacion"}
  //         description={"Ubicacion"}
  //         draggable={false}
  //       />
  //     </MapView>
  //   );
  // };

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
                defaultValue={upperCaseFirst(listing?.type)}
                buttonStyle={{
                  backgroundColor: "#e7e0ec",
                  borderRadius: 4,
                  width: 170,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 6,
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
                  icon={user?.favoriteListings?.includes(listing._id) ? "heart" : "heart-outline"}
                  mode={like && "contained"}
                  onPress={handleLikePress}
                />
                <IconButton
                  icon="share-variant"
                  onPress={() => handleSharePress()}
                />
                <IconButton icon="calendar-month" onPress={() => handleSchedulePress()} />

              </View>
            )}
          </View>
          <View style={styles.containerListingMainDetails}>
            <View style={styles.containerHomeLocationDetails}>
              {edit ? (
                <View className="flex flex-col">
                  <SelectDropdown
                    data={[
                      "Casa",
                      "Departamento",
                      "PH",
                      "Local",
                      "Oficina",
                      "Duplex",
                    ]}
                    defaultValue={upperCaseFirst(listing?.property?.type)}
                    onSelect={(selectedItem, index) => {
                      handleProperty(selectedItem);
                    }}
                    buttonStyle={{
                      backgroundColor: "#e7e0ec",
                      borderRadius: 4,
                      width: 170,
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 6,
                    }}
                    buttonTextStyle={{ color: "#6750a4" }}
                    renderDropdownIcon={() => {
                      return (
                        <AntDesign name="down" size={24} color="#6750a4" />
                      );
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
                  <TextInput
                    className="rounded-t-md w-[170px] mt-2"
                    label={"Encabezado"}
                    defaultValue={listing.title}
                    onChangeText={(encabezado) => handleEncabezado(encabezado)}
                    mode="outlined"
                    maxLength={12}
                  ></TextInput>
                </View>
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
              {edit ? null : (
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
              <Text
                variant="labelSmall"
                style={{ color: theme.colors.secondary, marginRight: 16 }}
                numberOfLines={1}
              >
                {listing?.price?.currency ?? ""}
              </Text>
              <View>
                {edit ? (
                  <TextInput
                    defaultValue={commaNumber(listing?.price?.amount) || "Mock"}
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
                    defaultValue={
                      commaNumber(listing?.property?.expensesPrice?.amount) || 0
                    }
                    className="rounded-t-md w-[100px] mt-2"
                    label={"Expensas"}
                    onChange={(expenses) => handleExpenses(expenses)}
                    mode="outlined"
                  />
                ) : (
                  <Text
                    variant="labelSmall"
                    style={{ color: theme.colors.secondary }}
                  >
                    {Number(listing?.property?.expensesPrice?.amount) !== 0
                      ? commaNumber(listing?.property?.expensesPrice?.amount)
                      : "Sin expensas"}
                  </Text>
                )}
              </View>
            </View>
          </View>

          {edit ? (
            <View styles={{ marginHorizontal: 10 }}>
              <List.Subheader style={styles.listSubheader}>
                Ubicacion
              </List.Subheader>
              <View className="flex mb-4 mx-[10px]">
                <TextInput
                  className="rounded-t-md mb-2"
                  label={"Provicia"}
                  defaultValue={listing?.property?.address?.state}
                  onChangeText={(provincia) => handleProvincia(provincia)}
                  mode="outlined"
                ></TextInput>
                <TextInput
                  className="rounded-t-md mb-2"
                  label={"Ciudad"}
                  defaultValue={listing?.property?.address?.city}
                  onChangeText={(ciudad) => handleCiudad(ciudad)}
                  mode="outlined"
                ></TextInput>
                <TextInput
                  className="rounded-t-md mb-2"
                  label={"Barrio"}
                  defaultValue={listing?.property?.address?.neighborhood}
                  onChangeText={(barrio) => handleBarrio(barrio)}
                  mode="outlined"
                ></TextInput>
                <TextInput
                  className="rounded-t-md mb-2"
                  label={"Calle"}
                  defaultValue={listing?.property?.address?.street}
                  onChangeText={(calle) => handleCalle(calle)}
                  mode="outlined"
                ></TextInput>
                <View className="flex flex-row gap-2">
                  <TextInput
                    className="rounded-t-md w-[165px]"
                    label={"Numero"}
                    defaultValue={"" + listing?.property?.address?.number}
                    onChangeText={(numero) => handleNumero(numero)}
                    mode="outlined"
                  ></TextInput>
                  <TextInput
                    className="rounded-t-md w-[165px]"
                    label={"CP"}
                    defaultValue={listing?.property?.address?.zipCode}
                    onChangeText={(CP) => handleCP(CP)}
                    mode="outlined"
                  ></TextInput>
                </View>
              </View>
            </View>
          ) : null}

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
                  {listingRealtorName || "Realtor name"}
                </Text>
                {listingRealtorReviewScore ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton
                      icon="star"
                      onPress={() => { }}
                    />
                    <Text variant="labelLarge">
                      {listingRealtorReviewScore.toFixed(1)}{" "}
                    </Text>
                    <IconButton
                    style={{ marginLeft: 38}}
                      icon="comment"
                      onPress={() => handleCommentsPress()}
                    />
                  </View>
                ) : (
                  <Text variant="labelLarge">Sin reseñas</Text>
                )}
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
                defaultValue={listing.description}
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
                defaultValue={"" + listing?.property.sqm.covered}
                className="rounded-t-md w-[170px] ml-[8px] mb-2"
                label={"Metros"}
                onChange={(cubiertos) => handleCubiertos(cubiertos)}
                mode="outlined"
              />
            ) : (
              <List.Item
                title="Metros"
                description={listing?.property?.sqm?.covered}
                left={(props) => <List.Icon {...props} icon="texture-box" />}
                titleStyle={{ fontWeight: 800 }}
                width={width / 2 - 16}
              />
            )}
            {edit ? (
              <TextInput
                defaultValue={"" + listing?.property?.sqm?.uncovered}
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
                defaultValue={"" + listing?.property?.rooms}
                className="rounded-t-md w-[170px] ml-[8px] mb-2"
                label={"Ambientes"}
                onChange={(ambientes) => handleAmbientes(ambientes)}
                mode="outlined"
              />
            ) : (
              <List.Item
                title="Ambientes"
                description={"" + listing?.property?.rooms}
                left={(props) => <List.Icon {...props} icon="floor-plan" />}
                titleStyle={{ fontWeight: 800 }}
                width={width / 2 - 16}
              />
            )}
            {edit ? (
              <TextInput
                defaultValue={"" + listing?.property?.rooms}
                className="rounded-t-md w-[170px] ml-[8px] mb-2"
                label={"Dormitorios"}
                onChange={(dormitorios) => handleDormitorios(dormitorios)}
                mode="outlined"
              />
            ) : (
              <List.Item
                title="Dormitorios"
                description={listing?.property?.rooms}
                left={(props) => (
                  <List.Icon {...props} icon="bed-king-outline" />
                )}
                titleStyle={{ fontWeight: 800 }}
                width={width / 2 - 16}
              />
            )}
            {edit ? (
              <TextInput
                defaultValue={"" + listing?.property?.bathrooms}
                className="rounded-t-md w-[170px] ml-[8px] mb-2"
                label={"Baños"}
                onChange={(baños) => handleBaños(baños)}
                mode="outlined"
              />
            ) : (
              <List.Item
                title="Baños"
                description={listing?.property?.bathrooms}
                left={(props) => <List.Icon {...props} icon="toilet" />}
                titleStyle={{ fontWeight: 800 }}
                width={width / 2 - 16}
              />
            )}
            {edit ? (
              <TextInput
                defaultValue={"" + listing?.property?.age}
                className="rounded-t-md w-[170px] ml-[8px] mb-2"
                label={"Antiguedad"}
                onChange={(antiguedad) => handleAntiguedad(antiguedad)}
                mode="outlined"
              />
            ) : (
              <List.Item
                title="Antigüedad"
                description={listing?.property?.age}
                left={(props) => <List.Icon {...props} icon="clock-outline" />}
                titleStyle={{ fontWeight: 800 }}
                width={width / 2 - 16}
              />
            )}
            {edit ? (
              <TextInput
                defaultValue={listing?.property?.cardinalOrientation}
                className="rounded-t-md w-[170px] ml-[8px] mb-2"
                label={"Or. Absoluta"}
                onChange={(orAbsoluta) => handleOrAbsoluta(orAbsoluta)}
                mode="outlined"
              />
            ) : (
              <List.Item
                title="Or. Absoluta"
                description={listing?.property?.cardinalOrientation}
                left={(props) => <List.Icon {...props} icon="sign-direction" />}
                titleStyle={{ fontWeight: 800 }}
                width={width / 2 - 16}
              />
            )}
            {edit ? (
              <TextInput
                defaultValue={listing?.property?.relativeOrientation}
                className="rounded-t-md w-[170px] ml-[8px] mb-2"
                label={"Or. Relativa"}
                onChange={(orRelativa) => handleOrRelativa(orRelativa)}
                mode="outlined"
              />
            ) : (
              <List.Item
                title="Or. Relativa"
                description={listing?.property?.relativeOrientation}
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

          {/* {edit ? null : (
            <View>
              <Divider />
              <List.Subheader style={styles.listSubheader}>
                Vista satelital
              </List.Subheader>

              <View style={styles.containerMapView}>
                <MapView
                  style={styles.mapView}
                  provider={PROVIDER_GOOGLE}
                  region={region}
                >
                  <Marker
                    coordinate={{
                      latitude: region.latitude,
                      longitude: region.longitude,
                    }}
                    title={"Ubicacion"}
                    description={"Ubicacion"}
                    draggable={false}
                  />
                </MapView>
              </View>
            </View>
          )} */}

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
                  onPress={() =>
                    navigation.navigate("SendQuestion", {
                      params: {
                        realtorId: listing.realtorId,
                        listingId: listing._id,
                      },
                    })
                  }
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
      <ListingComments
        isModalOpen={isModalOpen}
        onClose={() => setIsDrawerOpen(false)}
        comments={listingRealtorComments}
      />
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
  map: {
    width: "100%",
    height: "100%",
  },
});

export default ListingPost;
