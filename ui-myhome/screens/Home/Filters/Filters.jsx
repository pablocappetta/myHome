import React, { useState } from 'react';
import { Button, List, Divider, Modal, Text, useTheme } from 'react-native-paper';
import  FilterRow  from './FilterRow/FilterRow';
import { filters } from './FilterRow/filters';
import { View, StyleSheet, ScrollView } from 'react-native';

export const FiltersModal = ({ isModalOpen, onClose, onCommitFilters }) => {
    const [selectedFilters, setSelectedFilters] = useState(new Map(filters.map((filter) => [filter.title, filter.options.filter((f) => f.selected).map((f) => f.value)])));

    const handleFilterChange = (filter, title) => {   
        //get all values in filter that are true 
        const values = Array.from(filter.keys()).filter((value) => filter.get(value) === true).map((value) => value.value);
        const newSelectedFilters = new Map(selectedFilters);
        newSelectedFilters.set(title, values);
        setSelectedFilters(newSelectedFilters);
    };

    const [filterList, setFilters] = useState(filters);

    const handleApplyFilters = () => {
        // Handle applying filters logic here
        onCommitFilters(selectedFilters);
        onClose();
    };

    const handleClearFilters = () => {
       setSelectedFilters(new Map(filters.map((filter) => [filter.title, filter.options.filter((f) => f.selected).map((f) => f.value)])))
       onClose();
    };


    const theme = useTheme();

    return (
        <Modal visible={isModalOpen} onDismiss={onClose} contentContainerStyle={[styles.modal, { backgroundColor: theme.colors.background }]}>
            <Text 
            variant='titleLarge'
            style={{ fontWeight: 'bold', marginBottom: 8, width: '100%', textAlign: 'center' }}
            >Filtros</Text>
            <View style={styles.header}>
                <Button onPress={onClose}>Cerrar</Button>
                <Button onPress={handleApplyFilters}>Aplicar</Button>
            </View>
            <View style={styles.content}>
                <ScrollView style={{ maxHeight: 'calc(100vh - 200px)' }}>
                    <List.Section>
                        {
                        filterList.map((filter) => (
                            <React.Fragment key={filter.id}>
                                <FilterRow headerText={filter.title} filter={filter} options={filter.options} onChange={handleFilterChange} />
                            </React.Fragment>
                        ))}
                    </List.Section>
                </ScrollView>
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
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
        height: '80%',
        bottom:0,
        position: 'absolute',
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
