import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { IconButton, useTheme, List, Modal, Text, Avatar, Divider } from 'react-native-paper';

const ListingComments = ({ isModalOpen, onClose, comments }) => {
  const theme = useTheme();
  const windowWidth = Dimensions.get('window').width;

  const styles = StyleSheet.create({
    modal: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      top: '20%',
      padding: 16,
      height: '80%',
      bottom: 0,
      position: 'absolute',
      backgroundColor: theme.colors.background, // Use the theme's background color
      width: windowWidth,
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    userImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 8,
    },
  });

  // Default image URL
  const defaultImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";

  const handleSwipeDown = () => {
    onClose(); // Call the onClose callback to dismiss the modal
  };

  return (
    <Modal
      visible={isModalOpen}
      onDismiss={onClose}
      animationType="slide"
      contentContainerStyle={[styles.modal, { backgroundColor: theme.colors.background }]}
      onSwipeDown={handleSwipeDown} // Dismiss the modal on swipe down
    >
      <View style={styles.modal}>
        <Text
          variant='titleLarge'
          style={{ fontWeight: 'bold', marginBottom: 8, width: '100%', textAlign: 'center', marginTop: -68}}
        >Comentarios</Text>
        <ScrollView>
          <List.Section>
            {comments?.map((comment, index) => (
              <View style={{
                marginTop: 16,
              }} key={index}>
                <View style={styles.userContainer}>
                  {/* User image URL */}
                  <Avatar.Image source={{ uri: comment.userImage || defaultImage }} size={40} />
                  <Text>  {comment.userName ?? "Usuario"}</Text>
                </View>

                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 8
                }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>{comment.comment}</Text>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}>
                    <Text>{comment.rating}</Text>
                    <IconButton icon="star" onPress={() => { }} />
                  </View>
                </View>
                <Divider />
              </View>
            ))}
          </List.Section>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ListingComments;
