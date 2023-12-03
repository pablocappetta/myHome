import React, { useCallback, useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Chip, TextInput } from 'react-native-paper';
import { Filter } from '../../../../helpers/filterHelper';

interface FilterRowProps {
    headerText: string;
    filterKey: string;
    options: { filterValue: string; value: string; label: string; selected: boolean }[];
    showSlider: boolean;
    sliderValue: number;
    onSliderValueChange: (value: number) => void;
    multiSelect: boolean;
    onChange: (
        selectedOptions: Filter,
    ) => void;
    value: any;
    type: string;
}

const FilterRow: React.FC<FilterRowProps> = ({
    headerText,
    filterKey,
    options,
    showSlider,
    sliderValue,
    onSliderValueChange,
    multiSelect,
    onChange,
    value,
    type
}) => {
    const [selected, setSelected] = useState<Filter>({ key: '', title: '', values: [] });
    const [viewOptions, setOptions] = useState<{ filterValue: string; value: string; label: string; selected: boolean }[]>(options);
    const [rangeInput, setRangeInput] = useState<{ from: number; to: number }>({ from: 0, to: 100 });
    useEffect(() => {
        const newSelected: Filter = {
            key: filterKey,
            title: headerText,
            values: viewOptions.filter((value) => value.selected).map((value) => value.value),
            type: type
        };
        setSelected(newSelected);
        onChange(newSelected);
    }, [viewOptions]);

    const onSelect = useCallback(
        (id: string) => {
            const newOptions = viewOptions.map((option) => {
                if (option.value === id) {
                    return {
                        ...option,
                        selected: !option.selected,
                    };
                } else if (!multiSelect) {
                    return {
                        ...option,
                        selected: false,
                    };
                }
                return option;
            });
            const newSelected: Filter = {
                key: filterKey,
                title: headerText,
                values: newOptions.filter((value) => value.selected).map((value) => value.value),
                type: type
            };
            setOptions(newOptions);
            setSelected(newSelected);
            onChange(newSelected);
        },
        [filterKey, headerText, viewOptions, multiSelect, onChange]
    );



    return (
        <View>
            <Text
                style={{
                    fontWeight: 'bold',
                    marginBottom: 8,
                    width: '100%',
                    textAlign: 'left',
                }}
                variant="bodyLarge"
            >
                {headerText}
            </Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                type === 'rangeInput' ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <Text style={{ marginRight: 8 }}>Desde</Text>
                        <TextInput
                            value={rangeInput.from.toString()}
                            onChangeText={(text) => {
                                const newRangeInput = { ...rangeInput, from: Number.isNaN(parseInt(text)) ? 0 : parseInt(text) };
                                setRangeInput(newRangeInput);
                                const newSelected: Filter = {
                                    key: filterKey,
                                    title: headerText,
                                    values: [newRangeInput.from.toString(), newRangeInput.to.toString()],
                                    type: type
                                };
                                setSelected(newSelected);
                                onChange(newSelected);
                            }}
                            style={styles.input}
                        />
                        <TextInput
                            value={rangeInput.to.toString()}
                            onChangeText={(text) => {
                                const newRangeInput = { ...rangeInput, to: Number.isNaN(parseInt(text)) ? 0 : parseInt(text) };
                                setRangeInput(newRangeInput);
                                const newSelected: Filter = {
                                    key: filterKey,
                                    title: headerText,
                                    values: [newRangeInput.from.toString(), newRangeInput.to.toString()],
                                    type: type
                                };
                                setSelected(newSelected);
                                onChange(newSelected);
                            }}
                            style={styles.input}
                        />
                        <Text style={{ marginRight: 8 }}>Hasta</Text>
                    </View>
                ) : viewOptions?.map((option) => (
                        <Chip
                            key={option.value}
                            onPress={() => onSelect(option.value)}
                            selected={option.selected}
                            style={styles.chip}
                            selectedColor="white"
                        >
                            {option.label}
                        </Chip>
                    ))}
            </ScrollView>
            {/* {showSlider && (
                <Slider
                    value={sliderValue}
                    onValueChange={onSliderValueChange}
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                />
            )} */}
        </View>
    );
};

const styles = StyleSheet.create({
    chip: {
        margin: 4,
        minWidth: 50,
    },
    input: {
        width: 120,
        height: 20,
        marginRight: 8,
        backgroundColor: 'white',
        borderRadius: 4,
        padding: 8,
    },
});

export default FilterRow;
