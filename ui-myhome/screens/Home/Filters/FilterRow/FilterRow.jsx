import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Chip, Slider } from 'react-native-paper';

export const FilterRow = ({ headerText, options, showSlider, sliderValue, onSliderValueChange, multiSelect, onChange }) => {
    const [selected, setSelected] = React.useState(new Map(
        options?.map((option) => [option, option.selected]),
    ));

    const onSelect = React.useCallback(
        (id) => {
            const newSelected = new Map(selected);
            newSelected.set(id, !selected.get(id));
            if (!multiSelect) {
                [...newSelected.keys()].forEach((key) => {
                    if (key !== id) {
                        newSelected.set(key, false);
                    }
                });
            }

            setSelected(newSelected);
            onChange(newSelected, headerText);
        },
        [selected],
    );

    return (
        <View>
            <Text
            style={{ fontWeight: 'bold', marginBottom: 8, width: '100%', textAlign: 'left' }}
            variant='bodyLarge'
            >{headerText}</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {options?.map((option) => (
                    <Chip
                        key={option.key}
                        onPress={() => onSelect(option)}
                        selected={!!selected.get(option)}
                        style={styles.chip}
                        selectedColor='white'
                    >
                        {option.label}
                    </Chip>
                ))}
            </ScrollView>
            {showSlider && (
                <Slider
                    value={sliderValue}
                    onValueChange={onSliderValueChange}
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                />
            )}
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
