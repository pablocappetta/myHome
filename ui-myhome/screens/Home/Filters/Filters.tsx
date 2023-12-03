import React, { useState, useEffect } from 'react';
import { Button, List, Modal, Text, useTheme } from 'react-native-paper';
import FilterRow from './FilterRow/FilterRow';
import { DisplayFilter } from './FilterRow/filters';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Filter } from '../../../helpers/filterHelper';

export const FiltersModal: React.FC<{ isModalOpen: boolean, onClose: () => void, onCommitFilters: (selectedFilters: Filter[]) => void, initialFilters: DisplayFilter[] }> = ({ isModalOpen, onClose, onCommitFilters, initialFilters }) => {
    const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);
    const [filterList, setFilterList] = useState<DisplayFilter[]>(initialFilters);

    useEffect(() => {
        setSelectedFilters([]);
        setFilterList(initialFilters);
    }, [initialFilters]);

    const handleFilterChange = (filter: Filter) => {
        //get all values in filter that are true 
        const newSelectedFilters = [...selectedFilters];
        // check if a filter with the same key already exists
        const existingFilterIndex = newSelectedFilters.findIndex(f => f.key === filter.key);
        if (existingFilterIndex === -1) {
            // if it doesn't exist, add it
            newSelectedFilters.push(filter);
        } else {
            // if it does exist, replace it
            newSelectedFilters[existingFilterIndex] = filter;
        }
        setSelectedFilters(newSelectedFilters);
    };

    const handleApplyFilters = () => {
        // Handle applying filters logic here
        onCommitFilters(selectedFilters);
        onClose();
    };

    const handleClearFilters = () => {
        setSelectedFilters([]);
        onCommitFilters([]);
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
                            filterList.map((filter, index) => (
                                <React.Fragment key={filter.value + index}>
                                    <FilterRow headerText={filter.title} filterKey={filter.value} options={filter.options} onChange={handleFilterChange} value={filter.value} showSlider={filter.isSlider} sliderValue={undefined} onSliderValueChange={undefined} multiSelect={filter.isMultiselect} 
                                    type={filter.type}
                                    />
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
        bottom: 0,
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
