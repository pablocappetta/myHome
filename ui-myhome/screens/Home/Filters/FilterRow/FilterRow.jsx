import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Chip, Slider } from 'react-native-paper';

export const FilterRow = ({ headerText, options, showSlider, sliderValue, onSliderValueChange, multiSelect }) => {
    const handleChipPress = (option) => {
        console.log(`${option} selected`);
    };

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
                        onPress={() => handleChipPress(option)}
                        selected={multiSelect ? undefined : option === option.selected}
                        style={styles.chip}
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
