const database = {
    "items": [
        {
            "id": "1",
            "name": "Item 1",
            "type": "Type A",
            "category": 0,
            "price": 10.49,
            "images": [
                "https://placehold.co/200x200"
            ]
        },
        {
            "id": "2",
            "name": "Item 2",
            "type": "Type B",
            "category": 1,
            "price": 15.49,
            "images": []
        },
        {
            "id": "3",
            "name": "Item 3",
            "type": "Type A",
            "category": 2,
            "price": 20,
            "images": []
        },
        {
            "id": "4",
            "name": "Item 4",
            "type": "Type C",
            "category": 0,
            "price": 5.75,
            "images": []
        },
        {
            "id": "5",
            "name": "Item 5",
            "type": "Type B",
            "category": 1,
            "price": 12.3,
            "images": [
                "https://placehold.co/200x200",
                "https://placehold.co/300x200",
            ]
        },
    ]
}
console.log(JSON.stringify(database));