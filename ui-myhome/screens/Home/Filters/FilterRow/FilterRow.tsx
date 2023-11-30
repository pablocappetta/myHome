import React, { useCallback, useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Chip } from 'react-native-paper';
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
}) => {
    const [selected, setSelected] = useState<Filter>({ key: '', title: '', values: [] });
    const [viewOptions, setOptions] = useState<{ filterValue: string; value: string; label: string; selected: boolean }[]>(options);

    useEffect(() => {
        const newSelected: Filter = {
            key: filterKey,
            title: headerText,
            values: options.filter((value) => value.selected).map((value) => value.value),
        };
        setSelected(newSelected);
        onChange(newSelected);
    }, [options]);

    const onSelect = useCallback(
        (id: string) => {
            const newOptions = options.map((option) => {
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
            };
            setOptions(newOptions);
            setSelected(newSelected);
            onChange(newSelected);
        },
        [filterKey, headerText, options, multiSelect, onChange]
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
                {viewOptions?.map((option) => (
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
});

export default FilterRow;
