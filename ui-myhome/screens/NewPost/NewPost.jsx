import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from "react-native";
import React, { useEffect } from "react";
import { Appbar, Text, Switch, TextInput, Button } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import * as ImagePicker from "expo-image-picker";
import { useUserContext } from "../../contexts/UserContext";

const NewPost = ({ navigation }) => {
  const { user } = useUserContext();

  const [encabezado, setEncabezado] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [valor, setValor] = React.useState("");
  const [moneda, setMoneda] = React.useState("");
  const [tipoOperacion, setTipoOperacion] = React.useState("");
  const [expensas, setExpensas] = React.useState("Sin expensas");
  const [tipoPropiedad, setTipoPropiedad] = React.useState("");

  const [provincia, setProvincia] = React.useState("");
  const [ciudad, setCiudad] = React.useState("");
  const [barrio, setBarrio] = React.useState("");
  const [calle, setCalle] = React.useState("");
  const [numero, setNumero] = React.useState("");
  const [CP, setCP] = React.useState("");

  const [metrosCubiertos, setMetrosCubiertos] = React.useState("");
  const [metrosDescubiertos, setMetrosDescubiertos] = React.useState("");
  const [ambientes, setAmbientes] = React.useState("");
  const [baños, setBaños] = React.useState("");
  const [antiguedad, setAntiguedad] = React.useState("");
  const [dormitorios, setDormitorios] = React.useState("");
  const [cocheras, setCocheras] = React.useState(false);
  const [terraza, setTerraza] = React.useState(false);
  const [balcon, setBalcon] = React.useState(false);
  const [orientacionRelativa, setOrientacionRelativa] = React.useState("");
  const [orientacionAbsoluta, setOrientacionAbsoluta] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const onToggleCocheras = () => setCocheras(!cocheras);
  const onToggleTerraza = () => setTerraza(!terraza);
  const onToggleBalcon = () => setBalcon(!balcon);

  const [images, setImages] = React.useState([]);
  const [listingId, setListingId] = React.useState(null);

  const orientacionRelativaOptions = ["Frente", "Contrafrente", "Lateral"];
  const orientacionAbsolutaOptions = [
    "N",
    "NE",
    "E",
    "SE",
    "S",
    "SO",
    "O",
    "NO",
  ];

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const handleFileUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages(result.assets);
    }
  };

  const handleAddProperty = async () => {
    setIsLoading(true);

    const requestBody = {
      realtorId: user._id,
      title: encabezado,
      description: descripcion,
      property: {
        age: parseInt(antiguedad),
        address: {
          state: provincia,
          city: ciudad,
          neighborhood: barrio,
          zipCode: CP,
          street: calle,
          number: parseInt(numero),
          floor: "",
          apartment: "",
        },
        // geoLocation: {
        //   coordinates: [0, 0]
        // },
        type:
          tipoPropiedad.charAt(0).toUpperCase() +
          tipoPropiedad.slice(1).toLowerCase(),
        sqm: {
          covered: parseInt(metrosCubiertos),
          uncovered: parseInt(metrosDescubiertos),
        },
        cardinalOrientation: "N",
        relativeOrientation:
          orientacionRelativa.charAt(0).toUpperCase() +
          orientacionRelativa.slice(1).toLowerCase(),
        rooms: parseInt(ambientes),
        bathrooms: parseInt(baños),
        numberOfGarages: 0,
        hasGarden: false,
        hasTerrace: terraza,
        hasBalcony: balcon,
        hasStorageUnit: false,
        amenities: [],
        photos: [],
        video: "",
        expensesPrice: {
          amount: parseInt(expensas),
          currency: moneda.toUpperCase(),
        },
      },
      type: tipoOperacion.toLowerCase(),
      price: {
        amount: parseInt(valor),
        currency: moneda.toUpperCase(),
      },
    };

    images.forEach((image, index) => {
      requestBody.append("images", {
        name: `image-${index}.jpg`,
        type: "image/jpeg",
        uri: image.uri,
      });
    });

    console.log(JSON.stringify(requestBody));

    try {
      const listingPost = await fetch("http://3.144.94.74:8000/api/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }).then((response) => response.json());

      if (listingPost.ok) {
        setIsLoading(false);
        ToastAndroid.show("Propiedad agregada", ToastAndroid.LONG);
        navigation.navigate("Home");
      } else {
        setIsLoading(false);
        ToastAndroid.show(
          "Se agregó la propiedad, pero las imágenes no pudieron ser adjuntadas. Intenta de nuevo más tarde.",
          ToastAndroid.LONG
        );
      }

      setAmbientes("");
      setAntiguedad("");
      setBaños("");
      setBarrio("");
      setCalle("");
      setCiudad("");
      setCP("");
      setCocheras(false);
      setDescripcion("");
      setDormitorios("");
      setEncabezado("");
      setExpensas("");
      setMetrosCubiertos("");
      setMetrosDescubiertos("");
      setMoneda("");
      setNumero("");
      setOrientacionAbsoluta("");
      setOrientacionRelativa("");
      setProvincia("");
      setTerraza(false);
      setTipoOperacion("");
      setTipoPropiedad("");
      setValor("");
      setImages([]);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      ToastAndroid.show("Error al agregar propiedad", ToastAndroid.LONG);
    }
  };

  return (
    <View className="h-full ">
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate("Home")} />
        <Appbar.Content title={"Añade una nueva propiedad"} />
      </Appbar.Header>
      <ScrollView vertical className="px-5 pb-40">
        <Text className="text-[25px] mt-4 font-bold my-4">
          Datos de la propiedad
        </Text>
        <View className="flex gap-2 mb-4">
          <TextInput
            className="rounded-t-md "
            label={"Encabezado"}
            value={encabezado}
            onChangeText={(encabezado) => setEncabezado(encabezado)}
            mode="outlined"
          ></TextInput>
          <TextInput
            className="rounded-t-md "
            label={"Descripcion"}
            value={descripcion}
            onChangeText={(descripcion) => setDescripcion(descripcion)}
            mode="outlined"
          ></TextInput>
          <View className="flex flex-row justify-between">
            <TextInput
              className="rounded-t-md w-56"
              label={"Valor"}
              value={valor}
              onChangeText={(valor) => setValor(valor)}
              mode="outlined"
            ></TextInput>
            <SelectDropdown
              buttonStyle={{
                backgroundColor: "#e7e0ec",
                borderRadius: 4,
                width: 120,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 6,
              }}
              data={["USD", "ARS"]}
              defaultValue={"Seleccionar"}
              onSelect={(selectedItem, index) => {
                setMoneda(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </View>
          <View className="flex flex-row justify-between">
            <SelectDropdown
              buttonStyle={{
                backgroundColor: "#e7e0ec",
                borderRadius: 4,
                width: 170,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 6,
              }}
              data={["Alquiler", "Venta"]}
              defaultValue={"Seleccionar"}
              onSelect={(selectedItem, index) => {
                setTipoOperacion(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
            <TextInput
              className="rounded-t-md w-[170px]"
              label={"Expensas"}
              value={expensas}
              onChangeText={(expensas) => setExpensas(expensas)}
              mode="outlined"
            ></TextInput>
          </View>
          <View className="flex flex-row justify-between mb-4">
            <SelectDropdown
              buttonStyle={{
                backgroundColor: "#e7e0ec",
                borderRadius: 4,
                width: 170,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 6,
              }}
              data={[
                "Casa",
                "Departamento",
                "PH",
                "Local",
                "Oficina",
                "Duplex",
              ]}
              defaultValue={"Seleccionar"}
              onSelect={(selectedItem, index) => {
                setTipoPropiedad(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </View>
          <Text className="text-[25px] mt-4 font-bold my-4">Ubicación</Text>
          <View className="flex mb-4">
            <TextInput
              className="rounded-t-md mb-2"
              label={"Provicia"}
              value={provincia}
              onChangeText={(provincia) => setProvincia(provincia)}
              mode="outlined"
            ></TextInput>
            <TextInput
              className="rounded-t-md mb-2"
              label={"Ciudad"}
              value={ciudad}
              onChangeText={(ciudad) => setCiudad(ciudad)}
              mode="outlined"
            ></TextInput>
            <TextInput
              className="rounded-t-md mb-2"
              label={"Barrio"}
              value={barrio}
              onChangeText={(barrio) => setBarrio(barrio)}
              mode="outlined"
            ></TextInput>
            <TextInput
              className="rounded-t-md mb-2"
              label={"Calle"}
              value={calle}
              onChangeText={(calle) => setCalle(calle)}
              mode="outlined"
            ></TextInput>
            <View className="flex flex-row gap-2">
              <TextInput
                className="rounded-t-md w-[170px]"
                label={"Numero"}
                value={numero}
                onChangeText={(numero) => setNumero(numero)}
                mode="outlined"
              ></TextInput>
              <TextInput
                className="rounded-t-md w-[170px]"
                label={"CP"}
                value={CP}
                onChangeText={(CP) => setCP(CP)}
                mode="outlined"
              ></TextInput>
            </View>
          </View>

          <Text className="text-[25px] mt-4 font-bold my-4">
            Características
          </Text>
          <View mb-4>
            <View className="flex flex-row gap-2">
              <TextInput
                className="rounded-t-md w-[170px] mb-2"
                label={"Mtrs cubiertos"}
                value={metrosCubiertos}
                onChangeText={(metrosCubiertos) =>
                  setMetrosCubiertos(metrosCubiertos)
                }
                mode="outlined"
              ></TextInput>
              <TextInput
                className="rounded-t-md w-[170px] mb-2"
                label={"Mtrs descubiertos"}
                value={metrosDescubiertos}
                onChangeText={(metrosDescubiertos) =>
                  setMetrosDescubiertos(metrosDescubiertos)
                }
                mode="outlined"
              ></TextInput>
            </View>
            <View className="flex flex-row gap-2">
              <TextInput
                className="rounded-t-md w-[170px] mb-2"
                label={"Cant ambientes"}
                value={ambientes}
                onChangeText={(ambientes) => setAmbientes(ambientes)}
                mode="outlined"
              ></TextInput>
              <TextInput
                className="rounded-t-md w-[170px] mb-2"
                label={"Cant dormitorios"}
                value={dormitorios}
                onChangeText={(dormitorios) => setDormitorios(dormitorios)}
                mode="outlined"
              ></TextInput>
            </View>
            <View className="flex flex-row gap-2">
              <TextInput
                className="rounded-t-md w-[170px] mb-2"
                label={"Cant baños"}
                value={baños}
                onChangeText={(baños) => setBaños(baños)}
                mode="outlined"
              ></TextInput>
              <TextInput
                className="rounded-t-md w-[170px] mb-2"
                label={"Antiguedad"}
                value={antiguedad}
                onChangeText={(antiguedad) => setAntiguedad(antiguedad)}
                mode="outlined"
              ></TextInput>
            </View>
            <View className="flex flex-row gap-2">
              <View
                className="flex flex-row gap-2"
                style={{ marginBottom: 10 }}
              >
                <SelectDropdown
                  buttonStyle={{
                    backgroundColor: "#e7e0ec",
                    borderRadius: 4,
                    width: 390,
                    height: 50,
                    marginTop: 6,
                    alignItems: "center",
                  }}
                  buttonTextStyle={{
                    fontSize: 16,
                    color: "#000000",
                    textAlign: "left",
                  }}
                  data={orientacionRelativaOptions}
                  defaultValue={"Seleccionar"}
                  onSelect={(selectedItem, index) => {
                    setOrientacionRelativa(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                />
              </View>
            </View>
            <View className="flex flex-row gap-2">
              <SelectDropdown
                buttonStyle={{
                  backgroundColor: "#e7e0ec",
                  borderRadius: 4,
                  width: 390,
                  height: 50,
                  marginTop: 0,
                  alignItems: "center",
                }}
                buttonTextStyle={{
                  fontSize: 16,
                  color: "#000000",
                  textAlign: "left",
                }}
                data={orientacionAbsolutaOptions}
                defaultValue={"Seleccionar"}
                onSelect={(selectedItem, index) => {
                  setOrientacionAbsoluta(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
            </View>
            <View className="flex flex-row gap-4 px-4">
              <View className="flex flex-row items-center w-[45%] justify-between">
                <Text className="pb-[5px] text-[16px]">Cochera</Text>
                <Switch
                  className="rounded-t-md mb-2"
                  label={"Cochera"}
                  value={cocheras}
                  onValueChange={onToggleCocheras}
                ></Switch>
              </View>
              <View className="flex flex-row items-center w-[45%] justify-between">
                <Text className="pb-[5px] text-[16px]">Terraza</Text>
                <Switch
                  className="rounded-t-md mb-2"
                  label={"Terraza"}
                  value={terraza}
                  onValueChange={onToggleTerraza}
                ></Switch>
              </View>
            </View>
            <View className="flex flex-row gap-4 px-4">
              <View className="flex flex-row items-center w-[45%] justify-between">
                <Text className="pb-[5px] text-[16px]">Balcon</Text>
                <Switch
                  className="rounded-t-md mb-2"
                  label={"Balcon"}
                  value={balcon}
                  onValueChange={onToggleBalcon}
                ></Switch>
              </View>
            </View>
          </View>
          <Text className="text-[25px] mt-4 font-bold my-4">Imágenes</Text>
          <View style={{ marginBottom: 16 }}>
            {images.length < 0 ? (
              <Text>No se añadieron imagenes</Text>
            ) : (
              <ScrollView horizontal>
                {images
                  .map((image, index) => (
                    <Image
                      key={index}
                      source={{ uri: image.uri }}
                      style={{
                        width: 200,
                        height: 200,
                        margin: 5,
                        borderRadius: 10,
                      }}
                    />
                  ))
                  .reverse()}
              </ScrollView>
            )}
          </View>
          <View style={{ display: "flex", gap: 24 }}>
            <Button
              mode="outlined"
              onPress={handleFileUpload}
              icon={"image"}
              disabled={isLoading}
            >
              Subir fotos
            </Button>
            <Button
              mode="contained"
              onPress={handleAddProperty}
              icon={"home"}
              loading={isLoading}
              disabled={isLoading}
            >
              Agregar propiedad
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default NewPost;
