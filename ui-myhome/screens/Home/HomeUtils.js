export const getFilteredListingByType = (listings, type) => {
  if (type === "todos") return listings;
  return listings.filter(
    (listing) => listing.listingType.toLowerCase() === type
  );
};

export const getFilteredListingByQuery = (listings, query) => {
  if (!query) return listings;
  return listings.filter(
    (listing) =>
      listing.location.toLowerCase().match(query.toLowerCase()) ||
      listing.type.toLowerCase().match(query.toLowerCase()) ||
      listing.listingType.toLowerCase().match(query.toLowerCase()) ||
      listing.price.toString().includes(query.toLowerCase()) ||
      listing.currency.toLowerCase().match(query.toLowerCase())
  );
};
