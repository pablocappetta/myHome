import React from 'react';
import { View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Appbar, Searchbar, IconButton, List, Text, Chip } from 'react-native-paper';
import { mockedListings } from '../mock/MockedHomeData';
import ListingCard from '../../../components/ListingCard/ListingCard';
import FiltersModal from '../Filters/Filters';


const Search = ({ navigation, searchText }) => {
    const [searchQuery, setSearchQuery] = React.useState(searchText);
    const [filteredPosts, setFilteredPosts] = React.useState(mockedListings);
    const [isModalOpen, setIsDrawerOpen] = React.useState(false);
    const [appliedFilters, setAppliedFilters] = React.useState({});

    const onChangeSearch = query => setSearchQuery(query);

    const onCommitFilters = (filters) => {
        // Handle applying filters logic here
        // create an object from the map of filters, the key is the title and the value is the filters selected
        const filtersObject = Object.fromEntries(filters.entries());
        setIsDrawerOpen(false);
        setAppliedFilters(filtersObject);
    }

    const onRemoveFilter = (filterTitle) => {
        const newFilters = { ...appliedFilters };
        delete newFilters[filterTitle];
        setAppliedFilters(newFilters);
    }

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => { navigation.goBack() }} />
                <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style={{ flex: 1 }}
                />
                <IconButton icon="filter" onPress={() => { setIsDrawerOpen(true)}} style={{alignSelf: 'center'}} />
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
                            {filteredPosts.length} resultados
                        </Text>
                        {
                            Object.keys(appliedFilters).length > 0 && (
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {Object.keys(appliedFilters).map((filterTitle) => {
                                        const capitalizedValues = appliedFilters[filterTitle].map(value => value.charAt(0).toUpperCase() + value.slice(1));
                                        return(
                                            <Chip 
                                            icon={"close"}
                                            onPress={() => onRemoveFilter(filterTitle)}
                                            key={filterTitle} style={{ marginRight: 8 }}>
                                                <Text style={{ textTransform: "capitalize" }}>{filterTitle}: </Text>
                                                <Text>{capitalizedValues.join(", ")}</Text>
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

                    {filteredPosts.map((post, index) => {
                        return (
                            <TouchableOpacity
                                key={index + post.id}
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
            />
        </View>
    );
};

export default Search;
