import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Avatar, Button, Card, Text, Searchbar } from "react-native-paper";

const Home = ({ navigation }) => {
  const user = {
    name: "Pablo",
  };

  const [notification, setNotification] = useState(true);

  const [selected, setSelected] = useState("alquilar");

  function handleSelection(selection) {
    setSelected(selection);
  }

  return (
    <ScrollView vertical>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 24,
          marginTop: 48,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar.Image
          size={36}
          source={require("../../assets/images/pablo.png")}
        />
        <Text variant="titleLarge">¡Hola, {user.name}!</Text>
      </View>

      <View
        style={{
          display: "flex",
          marginTop: 16,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 16,
          marginBottom: 16,
        }}
      >
        <Searchbar placeholder="Buscar..." />
      </View>

      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 16,
          }}
        >
          <Text
            variant="titleLarge"
            style={{
              paddingHorizontal: 16,
            }}
          >
            Destacados
          </Text>
          <TouchableOpacity>
            <Text
              variant="labelLarge"
              style={{
                paddingHorizontal: 16,
              }}
            >
              Ver más
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          style={{
            marginTop: 16,
            marginBottom: 16,
            marginHorizontal: 16,
          }}
        >
          <Card style={{ marginHorizontal: 4, marginVertical: 8 }}>
            <Card.Cover
              source={{
                uri: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
              }}
            />
            <Card.Content style={{ display: "flex", flexDirection: "column" }}>
              <Text variant="titleSmall" style={{ marginTop: 6 }}>
                Departamento
              </Text>
              <Text variant="bodySmall">Recoleta, Buenos Aires</Text>
              <Text variant="bodySmall" style={{ fontWeight: 800 }}>
                $500.000
              </Text>
            </Card.Content>
          </Card>
          <Card style={{ marginHorizontal: 4, marginVertical: 8 }}>
            <Card.Cover
              source={{
                uri: "https://images.unsplash.com/photo-1515263487990-61b07816b324?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
              }}
            />
            <Card.Content style={{ display: "flex", flexDirection: "column" }}>
              <Text variant="titleSmall" style={{ marginTop: 6 }}>
                Departamento
              </Text>
              <Text variant="bodySmall">Recoleta, Buenos Aires</Text>
              <Text variant="bodySmall" style={{ fontWeight: 800 }}>
                $500.000
              </Text>
            </Card.Content>
          </Card>
          <Card style={{ marginHorizontal: 4, marginVertical: 8 }}>
            <Card.Cover
              source={{
                uri: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
              }}
            />
            <Card.Content style={{ display: "flex", flexDirection: "column" }}>
              <Text variant="titleSmall" style={{ marginTop: 6 }}>
                Departamento
              </Text>
              <Text variant="bodySmall">Recoleta, Buenos Aires</Text>
              <Text variant="bodySmall" style={{ fontWeight: 800 }}>
                $500.000
              </Text>
            </Card.Content>
          </Card>
          <Card style={{ marginHorizontal: 4, marginVertical: 8 }}>
            <Card.Cover
              source={{
                uri: "https://images.unsplash.com/photo-1580216643062-cf460548a66a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1867&q=80",
              }}
            />
            <Card.Content style={{ display: "flex", flexDirection: "column" }}>
              <Text variant="titleSmall" style={{ marginTop: 6 }}>
                Departamento
              </Text>
              <Text variant="bodySmall">Recoleta, Buenos Aires</Text>
              <Text variant="bodySmall" style={{ fontWeight: 800 }}>
                $500.000
              </Text>
            </Card.Content>
          </Card>
          <Card style={{ marginHorizontal: 4, marginVertical: 8 }}>
            <Card.Cover
              source={{
                uri: "https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2572&q=80",
              }}
            />
            <Card.Content style={{ display: "flex", flexDirection: "column" }}>
              <Text variant="titleSmall" style={{ marginTop: 6 }}>
                Departamento
              </Text>
              <Text variant="bodySmall">Recoleta, Buenos Aires</Text>
              <Text variant="bodySmall" style={{ fontWeight: 800 }}>
                $500.000
              </Text>
            </Card.Content>
          </Card>
        </ScrollView>
      </View>

      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 16,
          }}
        >
          <Text
            variant="titleLarge"
            style={{
              paddingHorizontal: 16,
            }}
          >
            Últimas publicaciones
          </Text>
          <TouchableOpacity>
            <Text
              variant="labelLarge"
              style={{
                paddingHorizontal: 16,
              }}
            >
              Ver más
            </Text>
          </TouchableOpacity>
        </View>
        <View
          horizontal
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 16,
            marginBottom: 16,
            marginHorizontal: 16,
          }}
        >
          <Card style={{ marginHorizontal: 4, marginVertical: 8 }}>
            <Card.Cover
              source={{
                uri: "https://images.unsplash.com/photo-1525438160292-a4a860951216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
              }}
            />
            <Card.Content style={{ display: "flex", flexDirection: "column" }}>
              <Text variant="titleSmall" style={{ marginTop: 6 }}>
                Departamento
              </Text>
              <Text variant="bodySmall">Recoleta, Buenos Aires</Text>
              <Text variant="bodySmall" style={{ fontWeight: 800 }}>
                $500.000
              </Text>
            </Card.Content>
          </Card>
          <Card style={{ marginHorizontal: 4, marginVertical: 8 }}>
            <Card.Cover
              source={{
                uri: "https://images.unsplash.com/photo-1619994121345-b61cd610c5a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
              }}
            />
            <Card.Content style={{ display: "flex", flexDirection: "column" }}>
              <Text variant="titleSmall" style={{ marginTop: 6 }}>
                Departamento
              </Text>
              <Text variant="bodySmall">Recoleta, Buenos Aires</Text>
              <Text variant="bodySmall" style={{ fontWeight: 800 }}>
                $500.000
              </Text>
            </Card.Content>
          </Card>
          <Card style={{ marginHorizontal: 4, marginVertical: 8 }}>
            <Card.Cover
              source={{
                uri: "https://images.unsplash.com/photo-1568295123886-8d09a5986b4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
              }}
            />
            <Card.Content style={{ display: "flex", flexDirection: "column" }}>
              <Text variant="titleSmall" style={{ marginTop: 6 }}>
                Departamento
              </Text>
              <Text variant="bodySmall">Recoleta, Buenos Aires</Text>
              <Text variant="bodySmall" style={{ fontWeight: 800 }}>
                $500.000
              </Text>
            </Card.Content>
          </Card>
          <Card style={{ marginHorizontal: 4, marginVertical: 8 }}>
            <Card.Cover
              source={{
                uri: "https://images.unsplash.com/photo-1605283176568-9b41fde3672e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
              }}
            />
            <Card.Content style={{ display: "flex", flexDirection: "column" }}>
              <Text variant="titleSmall" style={{ marginTop: 6 }}>
                Departamento
              </Text>
              <Text variant="bodySmall">Recoleta, Buenos Aires</Text>
              <Text variant="bodySmall" style={{ fontWeight: 800 }}>
                $500.000
              </Text>
            </Card.Content>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
