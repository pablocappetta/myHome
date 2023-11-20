import React, { useState, useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { Button, TextInput, Appbar } from 'react-native-paper';
import { useUserContext } from '../../contexts/UserContext';

const ProfileEdit = () => {
  const { user  } = useUserContext();

  console.log(user);

    const [isEditing, setIsEditing] = useState(true);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.loginEmail);
    const [phone, setPhone] = useState(user.phone);
    const [address, setAddress] = useState(user.address);
    const [country, setCountry] = useState(user.country);
    const [profilePicture, setProfilePicture] = useState('');

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        // Save the updated user information to the server
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        // Reset the input fields to their original values
    };

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        // Handle the file upload and update the profile picture state
    };

    return (
        <View>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => {}} />
                <Appbar.Content title="Editar Perfil" />
            </Appbar.Header>
            <View style={styles.container}>
                <View>
                    <Image source={profilePicture} alt="Foto de Perfil" />
                    <Button
                    style={styles.editPictureButton}
                    mode="contained" onPress={handleProfilePictureChange}>
                        Elegir Foto de Perfil
                    </Button>
                </View>
                <View>
                    <TextInput
                        mode="outlined"
                        label="Nombre"
                        value={name}
                        disabled={!isEditing}
                        onChangeText={(text) => setName(text)}
                        style={styles.input}
                    />
                </View>
                <View>
                    <TextInput
                        mode="outlined"
                        label="Correo Electrónico"
                        value={email}
                        disabled={!isEditing}
                        onChangeText={(text) => setEmail(text)}
                        style={styles.input}
                    />
                </View>
                <View>
                    <TextInput
                        mode="outlined"
                        label="Teléfono"
                        value={phone}
                        disabled={!isEditing}
                        onChangeText={(text) => setPhone(text)}
                        style={styles.input}
                    />
                </View>
                <View>
                    <TextInput
                        mode="outlined"
                        label="Dirección"
                        value={address}
                        disabled={!isEditing}
                        onChangeText={(text) => setAddress(text)}
                        style={styles.input}
                    />
                </View>
                <View>
                    <TextInput
                        mode="outlined"
                        label="País"
                        value={country}
                        disabled={!isEditing}
                        onChangeText={(text) => setCountry(text)}
                        style={styles.input}
                    />
                </View>
                <View>
                    {isEditing ? (
                        <>
                            <Button mode="contained" onPress={handleSaveClick} style={styles.button}>
                                Guardar
                            </Button>
                            <Button mode="outlined" onPress={handleCancelClick} style={styles.button}>
                                Cancelar
                            </Button>
                        </>
                    ) : (
                        <Button mode="contained" onPress={handleEditClick} style={styles.button}>
                            Editar
                        </Button>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = {
    container: {
        padding: 16,
    },
    input: {
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
    },
    editPictureButton: {
        marginBottom: 10,
        width: 200
    },
};

export default ProfileEdit;
