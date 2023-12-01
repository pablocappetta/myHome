import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Appbar, Searchbar, IconButton, List, Text, Chip } from 'react-native-paper';
import { mockedListings } from '../mock/MockedHomeData';
import ListingCard from '../../../components/ListingCard/ListingCard';
import FiltersModal from '../Filters/Filters';
import { Property, filterProperties, Filter } from '../../../helpers/filterHelper';
import { DisplayFilter, filters } from '../Filters/FilterRow/filters';

interface SearchProps {
    navigation: any;
    route: any;
}

const Search: React.FC<SearchProps> = ({ navigation, route }) => {
    const initialProperties = [...route?.params?.listings];
    const [searchQuery, setSearchQuery] = useState(route.params.searchText);
    const [filteredPosts, setFilteredPosts] = useState<Property[]>(route?.params?.listings); // Set filteredPosts to be of type FilterProperty[]
    const [isModalOpen, setIsDrawerOpen] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState<Filter[]>([]);
    const [initialFilters, setInitialFilters] = useState<DisplayFilter[]>([...filters]);

    const onChangeSearch = (query: string) => setSearchQuery(query);

    const onCommitFilters = (filters: Filter[]) => {
        // Filter out the filters where the values include "todas" or "todos"
        const filteredFilters: Filter[] = [];
        for (const filter of filters) {
            const filteredValues = filter.values.filter(value => !value.toLowerCase().includes("todas") && !value.toLowerCase().includes("todos"));
            if (filteredValues.length > 0) {
                filteredFilters.push(filter);
            }
        }
        const newProperties = filterProperties(filteredPosts, filteredFilters, true);
        setFilteredPosts(newProperties);
        setIsDrawerOpen(false);
        setAppliedFilters(filteredFilters);
    }

    const onRemoveFilter = (filterKey: string) => {
        const newFilters = [...appliedFilters];
        const filterIndex = newFilters.findIndex(filter => filter.key === filterKey);
        newFilters.splice(filterIndex, 1);
        const newProperties = filterProperties(initialProperties, newFilters, true);
        setFilteredPosts(newProperties);
        setAppliedFilters(newFilters);
        let newInitialFilters = [...filters];
        if(newFilters.length === 0) {
            newInitialFilters = newInitialFilters.map(filter => {
                return {
                    ...filter,
                    options: filter.options.map(option => {
                        return {
                            ...option,
                            selected: false
                        }
                    })
                }
            });
        }
        console.log(JSON.stringify(newInitialFilters));
        setInitialFilters(newInitialFilters);
    }
    

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => { navigation.goBack() }} />
                <Searchbar
                    placeholder="Buscar"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style={{ flex: 1 }}
                />
                <IconButton icon="filter" onPress={() => { setIsDrawerOpen(true) }} style={{ alignSelf: 'center' }} />
            </Appbar.Header>

            <ScrollView>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 15,
                        flexWrap: "wrap",
                    }}
                >
                    <View style={{ flexDirection: "column", alignItems: "center" }}>
                        <Text
                            variant="titleLarge"
                            style={{ fontWeight: "bold", marginBottom: 8, marginRight: 8, alignSelf: "flex-start" }}
                        >
                            {filteredPosts?.length ? filteredPosts?.length : 0} resultados
                        </Text>
                        {
                            appliedFilters?.length > 0 && (
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {appliedFilters?.map((filter) => {
                                        const capitalizedValues = filter.values.map(value => value.charAt(0).toUpperCase() + value.slice(1));
                                        return (
                                            <Chip
                                                icon={"close"}
                                                onPress={() => onRemoveFilter(filter.key)}
                                                key={filter.key} style={{ marginRight: 8 }}>
                                                <Text style={{ textTransform: "capitalize" }}>{filter.title}: </Text>
                                                <Text>{capitalizedValues?.join(", ")}</Text>
                                            </Chip>
                                        )
                                    })}
                                </ScrollView>
                            )
                        }
                    </View>
                </View>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 8,
                        flexWrap: "wrap",
                    }}
                >

                    {filteredPosts?.map((post: any, index: number) => {
                        return (
                            <TouchableOpacity
                                key={index + post._id}
                                onPress={() => navigation.navigate("Post", post)}
                                style={{ width: "50%", marginBottom: 15 }}
                            >
                                <ListingCard listing={post} type={"highlighted"} />
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
            <FiltersModal
                isModalOpen={isModalOpen}
                onClose={() => setIsDrawerOpen(false)}
                onCommitFilters={onCommitFilters}
                initialFilters={initialFilters}
            />
        </View>
    );
};

export default Search;
