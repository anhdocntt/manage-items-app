const database = {
    "products": [
        {
            "id": "1",
            "name": "Item 1",
            "type": "Type A",
            "category": "Category 1",
            "price": 10.49,
            "image": "https://placehold.co/200x200",
            "isDeleted": false
        },
        {
            "id": "2",
            "name": "Item 2",
            "type": "Type B",
            "category": "Category 1",
            "price": 15.49,
            "image": null,
            "isDeleted": false
        },
        {
            "id": "3",
            "name": "Item 3",
            "type": "Type A",
            "category": "Category 2",
            "price": 20,
            "image": null,
            "isDeleted": false
        },
        {
            "id": "4",
            "name": "Item 4",
            "type": "Type C",
            "category": "Category 2",
            "price": 5.75,
            "image": null,
            "isDeleted": false
        },
        {
            "id": "5",
            "name": "Item 5",
            "type": "Type B",
            "category": "Category 1",
            "price": 12.3,
            "image": "https://placehold.co/300x200",
            "isDeleted": false
        },
    ]
}
console.log(JSON.stringify(database));