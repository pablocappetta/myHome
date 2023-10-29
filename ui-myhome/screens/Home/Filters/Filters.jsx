import React, { useState } from 'react';
import { Button, List, Divider, Modal, Text } from 'react-native-paper';
import  FilterRow  from './FilterRow/FilterRow';
import { filters } from './FilterRow/filters';
import { View, StyleSheet } from 'react-native';

export const FiltersModal = ({ isModalOpen, onClose }) => {
    const [selectedFilters, setSelectedFilters] = useState([]);

    const handleFilterChange = (filter) => {
        const index = selectedFilters.findIndex((f) => f.id === filter.id);
        if (index === -1) {
            setSelectedFilters([...selectedFilters, filter]);
        } else {
            const updatedFilters = [...selectedFilters];
            updatedFilters.splice(index, 1, filter);
            setSelectedFilters(updatedFilters);
        }
    };

    const [filterList, setFilters] = useState(filters);

    const handleApplyFilters = () => {
        // Handle applying filters logic here
        onClose();
    };

    const handleClearFilters = () => {
        setSelectedFilters([]);
    };

    return (
        <Modal visible={isModalOpen} onDismiss={onClose} contentContainerStyle={styles.modal}>
            <Text 
            variant='titleLarge'
            style={{ fontWeight: 'bold', marginBottom: 8, width: '100%', textAlign: 'center' }}
            >Filtros</Text>
            <View style={styles.header}>
                <Button onPress={onClose}>Cerrar</Button>
                <Button onPress={handleApplyFilters}>Aplicar</Button>
            </View>
            <View style={styles.content}>
                <List.Section style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                    {
                    filterList.map((filter) => (
                        <React.Fragment key={filter.id}>
                            <FilterRow headerText={filter.title} filter={filter} options={filter.options} onChange={handleFilterChange} />
                        </React.Fragment>
                    ))}
                </List.Section>
            </View>
            <View style={styles.footer}>
                <Button mode="contained" onPress={handleClearFilters}>
                    Limpiar
                </Button>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        backgroundColor: '#F5F5F5', // Update the background color to match the theme
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
        height: '80%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    content: {
        flex: 1,
    },
    footer: {
        marginTop: 16,
    },
});

export default FiltersModal;
