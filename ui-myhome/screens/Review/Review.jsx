import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Dialog, Portal, Appbar, Paragraph, Text } from 'react-native-paper';
import { AirbnbRating } from 'react-native-ratings';

const Review = ({navigation}) => {
    const [review, setReview] = useState('');
    const [comment, setComment] = useState('');
    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const handleCommentChange = (text) => setComment(text);

    const handleSendReview = async () => {
        try {
            // Call dummy API
            const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                body: JSON.stringify({ review, comment }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            // Show success dialog
            showDialog();
        } catch (error) {
            console.error("There was an error:", error);
        }
    };


    const handleRatingChange = (rating) => {
        console.log(rating);
    }

    const title = 'Reseña';

    return (
        <>
            <Appbar.Header elevated={true}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={title} />
            </Appbar.Header>
            <View style={styles.container}>
                <Text style={styles.text}>Dejanos un mensaje para la inmobiliaria</Text>
                <TextInput
                    label="Mensaje"
                    value={comment}
                    onChangeText={handleCommentChange}
                    style={styles.input}
                />
                <Text style={styles.text}>Calificación</Text>
                <AirbnbRating style={styles.rating}
                    type='custom'
                    showRating={false}
                    starContainerStyle={{ padding: 0, margin: 10 }}
                    onFinishRating={handleRatingChange}
                    defaultRating={0}
                    size={20}
                ></AirbnbRating>

                <Button mode="contained" onPress={handleSendReview} style={styles.button}>
                    Enviar
                </Button>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Reseña Enviada</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>Gracias por tu reseña!</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>Volver</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 16,
    },
    rating: {
        padding: 0,
        margin: 10,
        justifyContent: 'center',
    },
    text: {
        fontSize: 15,
        fontWeight: 'normal',
        marginBottom: 16,
    },
});

export default Review;
