import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Appbar, Searchbar, IconButton, List, Text } from 'react-native-paper';
import { mockedListings } from '../mock/MockedHomeData';
import ListingCard from '../../../components/ListingCard/ListingCard';
import FiltersModal from '../Filters/Filters';


const Search = ({ navigation, searchText }) => {
    const [searchQuery, setSearchQuery] = React.useState(searchText);
    const [filteredPosts, setFilteredPosts] = React.useState(mockedListings);
    const [isModalOpen, setIsDrawerOpen] = React.useState(false);

    const onChangeSearch = query => setSearchQuery(query);

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
                <IconButton icon="filter" onPress={() => { setIsDrawerOpen(true)}} />
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
                        <Text
                            variant="titleLarge"
                            style={{ fontWeight: "bold", marginBottom: 8, width: "100%" }}
                        >
                            {filteredPosts.length} resultados
                        </Text>
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
            />
        </View>
    );
};

export default Search;
