export default {
    namespaced: true,
    state: {
        lists: [
            {
                id: 1,
                name: 'Mới',
            },
            {
                id: 2,
                name: 'Đang thực hiện',
            },
            {
                id: 3,
                name: 'Đánh giá',
            }
        ],
        cards: [
            {
                id: 1,
                name: 'a',
                description: 'hello',
                directory_id: 8,
            },
            {
                id: 2,
                name: 'b',
                description: 'hello',
                directory_id: 8,
            },
            {
                id: 3,
                name: 'c',
                description: 'hello',
                list_id: 2,
            },
            {
                id: 4,
                name: 'd',
                description: 'hello',
                list_id: 3,
            },
        ]
    },
    getters: {
        // Khai báo getters
    },
    mutations: {
        addList(state, newList) {
            state.lists.push({id: newList[0], name: newList[1]})
        },
        addNewCard(state, newCard) {
            state.cards.push({id: newCard[0], name: newCard[1], description: '', list_id: newCard[2]})
        },
        removeList(state, list) {
            if (state.lists.indexOf(list) > -1) {
                state.lists.splice(this.lists.indexOf(list), 1);
            }
        }
    },
}