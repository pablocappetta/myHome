import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
import { Appbar, Text, Switch, TextInput } from "react-native-paper";
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
  const [expensas, setExpensas] = React.useState("");
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

  const onToggleCocheras = () => setCocheras(!cocheras);
  const onToggleTerraza = () => setTerraza(!terraza);
  const onToggleBalcon = () => setBalcon(!balcon);

  const [images, setImages] = React.useState([]);

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

    if (!result.cancelled) {
      setImages(result.assets);
    }
  };

  const handleAddProperty = async () => {
    // Manejo de errores
    if (
      encabezado == "" ||
      descripcion == "" ||
      valor == "" ||
      moneda == "" ||
      tipoOperacion == "" ||
      expensas == "" ||
      tipoPropiedad == "" ||
      provincia == "" ||
      ciudad == "" ||
      barrio == "" ||
      calle == "" ||
      numero == "" ||
      CP == "" ||
      metrosCubiertos == "" ||
      metrosDescubiertos == "" ||
      ambientes == "" ||
      baños == "" ||
      antiguedad == "" ||
      dormitorios == "" ||
      orientacionRelativa == "" ||
      orientacionAbsoluta == ""
    ) {
      alert("Por favor, complete todos los campos");
    } else {
      if (images.length == 0) {
        alert("Por favor, suba al menos una imagen");
      } else {
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
            geoLocation: {
              latitude: 0,
              longitude: 0,
            },
            type: tipoPropiedad.charAt(0).toUpperCase() + tipoPropiedad.slice(1).toLowerCase(),
            sqm: {
              covered: parseInt(metrosCubiertos),
              uncovered: parseInt(metrosDescubiertos),
            },
            cardinalOrientation: "N",
            relativeOrientation: orientacionRelativa.charAt(0).toUpperCase() + orientacionRelativa.slice(1).toLowerCase(),
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
        console.log(JSON.stringify(requestBody));
        try {
          const response = await fetch("http://3.144.94.74:8000/api/listings", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          })
          .then((response) => response.json())
          .then((data) => {
            const imageBody = {
              images: images.map((image) => image?.uri),
            }
            console.log("http://3.144.94.74:8000/api/listings/" + data._id + "/images");
            console.log(JSON.stringify(imageBody));
            fetch("http://3.144.94.74:8000/api/listings/" + data._id + "/images", 
            {
              method: "POST",
              headers: {
                "Content-Type": undefined,
              },
              body: JSON.stringify(imageBody),
            }).then((response) => response.json())
            .then((data) => {
              console.log("Success:", data);
              navigation.navigate("Home");
            })
          });
          if (response.ok) {
            navigation.navigate("Home");
          } else {
            console.log(response);
          }
        } catch (error) {
          console.log("Error al agregar la propiedad");
        }
      }
    }
  };

  return (
    <View className="h-full ">
      <Appbar.Header elevated={true}>
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
          ></TextInput>
          <TextInput
            className="rounded-t-md "
            label={"Descripcion"}
            value={descripcion}
            onChangeText={(descripcion) => setDescripcion(descripcion)}
          ></TextInput>
          <View className="flex flex-row justify-between">
            <TextInput
              className="rounded-t-md w-56"
              label={"Valor"}
              value={valor}
              onChangeText={(valor) => setValor(valor)}
            ></TextInput>
            <SelectDropdown
              buttonStyle={{
                backgroundColor: "#e7e0ec",
                borderTopEndRadius: 10,
                borderTopLeftRadius: 10,
                width: 120,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
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
                borderTopEndRadius: 10,
                borderTopLeftRadius: 10,
                width: 170,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
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
            ></TextInput>
          </View>
          <View className="flex flex-row justify-between mb-4">
            <SelectDropdown
              buttonStyle={{
                backgroundColor: "#e7e0ec",
                borderTopEndRadius: 10,
                borderTopLeftRadius: 10,
                width: 170,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
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
          <Text className="text-[25px] mt-4 font-bold my-4">Ubicacion</Text>
          <View className="flex mb-4">
            <TextInput
              className="rounded-t-md mb-2"
              label={"Provicia"}
              value={provincia}
              onChangeText={(provincia) => setProvincia(provincia)}
            ></TextInput>
            <TextInput
              className="rounded-t-md mb-2"
              label={"Ciudad"}
              value={ciudad}
              onChangeText={(ciudad) => setCiudad(ciudad)}
            ></TextInput>
            <TextInput
              className="rounded-t-md mb-2"
              label={"Barrio"}
              value={barrio}
              onChangeText={(barrio) => setBarrio(barrio)}
            ></TextInput>
            <TextInput
              className="rounded-t-md mb-2"
              label={"Calle"}
              value={calle}
              onChangeText={(calle) => setCalle(calle)}
            ></TextInput>
            <View className="flex flex-row gap-2">
              <TextInput
                className="rounded-t-md w-[170px]"
                label={"Numero"}
                value={numero}
                onChangeText={(numero) => setNumero(numero)}
              ></TextInput>
              <TextInput
                className="rounded-t-md w-[170px]"
                label={"CP"}
                value={CP}
                onChangeText={(CP) => setCP(CP)}
              ></TextInput>
            </View>
          </View>

          <Text className="text-[25px] mt-4 font-bold my-4">
            Caracteristicas
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
              ></TextInput>
              <TextInput
                className="rounded-t-md w-[170px] mb-2"
                label={"Mtrs descubiertos"}
                value={metrosDescubiertos}
                onChangeText={(metrosDescubiertos) =>
                  setMetrosDescubiertos(metrosDescubiertos)
                }
              ></TextInput>
            </View>
            <View className="flex flex-row gap-2">
              <TextInput
                className="rounded-t-md w-[170px] mb-2"
                label={"Cant ambientes"}
                value={ambientes}
                onChangeText={(ambientes) => setAmbientes(ambientes)}
              ></TextInput>
              <TextInput
                className="rounded-t-md w-[170px] mb-2"
                label={"Cant dormitorios"}
                value={dormitorios}
                onChangeText={(dormitorios) => setDormitorios(dormitorios)}
              ></TextInput>
            </View>
            <View className="flex flex-row gap-2">
              <TextInput
                className="rounded-t-md w-[170px] mb-2"
                label={"Cant baños"}
                value={baños}
                onChangeText={(baños) => setBaños(baños)}
              ></TextInput>
              <TextInput
                className="rounded-t-md w-[170px] mb-2"
                label={"Antiguedad"}
                value={antiguedad}
                onChangeText={(antiguedad) => setAntiguedad(antiguedad)}
              ></TextInput>
            </View>
            <View className="flex flex-row gap-2">
              <TextInput
                className="rounded-t-md w-full mb-2"
                label={"Orientacion relativa"}
                value={orientacionRelativa}
                onChangeText={(orientacionRelativa) =>
                  setOrientacionRelativa(orientacionRelativa)
                }
              ></TextInput>
            </View>
            <View className="flex flex-row gap-2">
              <TextInput
                className="rounded-t-md w-full mb-2"
                label={"Orientacion absoluta"}
                value={orientacionAbsoluta}
                onChangeText={(orientacionAbsoluta) =>
                  setOrientacionAbsoluta(orientacionAbsoluta)
                }
              ></TextInput>
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
          {images.length < 0 ? (
            <Text>No se añadieron imagenes</Text>
          ) : (
            <ScrollView horizontal>
              {images
                .map((image, index) => (
                  <Image
                    key={index}
                    source={{ uri: image.uri }}
                    style={{ width: 200, height: 200, margin: 5 }}
                  />
                ))
                .reverse()}
            </ScrollView>
          )}
          <View className="flex justify-center items-center">
            <TouchableOpacity
              className="bg-[#e8def8]  mb-2  mt-2 w-[250px] px-4 py-2 rounded-xl justify-center items-center"
              onPress={handleFileUpload}
            >
              <Text className="text-[#6750a4] text-[17px] font-bold">
                Subir Media
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#6750a4]  mb-6 w-[250px] px-4 py-2 rounded-xl justify-center items-center"
              onPress={handleAddProperty}
            >
              <Text className="text-[#e8def8] text-[17px] font-bold">
                Agregar Propiedad
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default NewPost;
