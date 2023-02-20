

const data = {
    collection: [],
    searchData: {
        searchText: '',
        yearStart: '',
        yearEnd: '',
        page: 1,
    },
};

export default function collectionReducer(state = data, action) {
    const temp = { ...state };
    switch (action.type) {
        case "setCollection":
            temp.collection = action.data;
            return temp;
        case "setSearchData":
            temp.searchData = action.data;
            return temp;
        default:
            return temp;
    }
}
