import Category from '../models/categoryModel.js'

// Add category 
export const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        console.log(name);
        const category = await Category.create({ name });
        return res.json(category);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'An error occurred while addinbg categories.' });
    }

}
// insert many categories
export const addCategories = async (req, res) => {
    try {
        const categories = await Category.insertMany(req.body);
        return res.json(categories);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'An error occurred while addinbg categories.' });
    }

}

// Get all  category: 
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching categories.' });
    }
};


// add intial data :
// export const addIntialdata = async () => {
//     try {
//         const categories = [
//             { name: 'Fruits and Vegetables' },
//             { name: 'Meat and Fish' },
//             { name: 'Beverages' },
//         ];

//         Category.insertMany(categories)
//             .then((insertedCategories) => {
//                 console.log('Inserted categories:', insertedCategories);

//                 // Retrieve category IDs
//                 const [fruitsCategory, meatCategory, bevCateegory] = insertedCategories;
//                 const fruitsCategoryId = fruitsCategory._id;
//                 const meatCategoryId = meatCategory._id;
//                 const bevCateegoryId = bevCateegory._id;

//                 // Create and save items with category references
//                 const items = [
//                     {
//                         name: "Apple",
//                         category: fruitsCategoryId,
//                         note: "Delicious and healthy",
//                         image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
//                     },
//                     {
//                         name: "Banana",
//                         category: fruitsCategoryId,
//                         note: "Rich in potassium",
//                         image: "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QmFuYW5hfGVufDB8fDB8fHww&auto=format&fit=crop&w=1000&q=60"
//                     },
//                     {
//                         name: "Orange",
//                         category: fruitsCategoryId,
//                         note: "Packed with vitamin C",
//                         image: "https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8T3JhbmdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=1000&q=60"
//                     },
//                     {
//                         name: "Strawberry",
//                         category: fruitsCategoryId,
//                         note: "Sweet and juicy",
//                         image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8U3RyYXdiZXJyeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=60"
//                     },
//                     {
//                         name: "Carrot",
//                         category: fruitsCategoryId,
//                         note: "Great for salads",
//                         image: "https://images.unsplash.com/photo-1576181256399-834e3b3a49bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=875&q=80"
//                     },
//                     {
//                         name: "Broccoli",
//                         category: fruitsCategoryId,
//                         note: "Nutrient-rich and versatile",
//                         image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QnJvY2NvbGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1000&q=60"
//                     },
//                     {
//                         name: "Tea",
//                         category: bevCateegoryId,
//                         note: "Classic hot beverage",
//                         image: "https://images.unsplash.com/photo-1567922045116-2a00fae2ed03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VGVhfGVufDB8fDB8fHww&auto=format&fit=crop&w=1000&q=60"
//                     },
//                     {
//                         name: "Coffee",
//                         category: bevCateegoryId,
//                         note: "Popular caffeinated drink",
//                         image: "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29mZmVlJTIwYWVzaHRoZXRpY3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=60"
//                     },
//                     {
//                         name: "Orange Juice",
//                         category: bevCateegoryId,
//                         note: "Freshly squeezed citrus goodness",
//                         image: "https://plus.unsplash.com/premium_photo-1667543228378-ec4478ab2845?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8T3JhbmdlJTIwSnVpY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1000&q=60"
//                     },
//                     {
//                         name: "Lemonade",
//                         category: bevCateegoryId,
//                         note: "Refreshing summer drink",
//                         image: "https://plus.unsplash.com/premium_photo-1661540754348-50ae254e4a3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TGVtb25hZGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1000&q=60"
//                     },
//                     {
//                         name: "Smoothie",
//                         category: bevCateegoryId,
//                         note: "Blended fruits and yogurt",
//                         image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U21vb3RoaWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1000&q=60"
//                     },
//                     {
//                         name: "Chicken Breast",
//                         category: meatCategoryId,
//                         note: "Lean source of protein",
//                         image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Q2hpY2tlbiUyMEJyZWFzdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=60"
//                     },
//                     {
//                         name: "Salmon",
//                         category: meatCategoryId,
//                         note: "Rich in omega-3 fatty acids",
//                         image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2FsbW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=1000&q=60"
//                     },
//                     {
//                         name: "Ground Beef",
//                         category: meatCategoryId,
//                         note: "Versatile meat option",
//                         image: "https://plus.unsplash.com/premium_photo-1668616815268-a1449bb02b1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8R3JvdW5kJTIwQmVlZnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=60"
//                     },
//                     {
//                         name: "Tuna",
//                         category: meatCategoryId,
//                         note: "Canned tuna for various dishes",
//                         image: "https://plus.unsplash.com/premium_photo-1675864033915-9a677ea3c515?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFR1bmF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1000&q=60"
//                     }
//                 ]


//                 Item.insertMany(items)
//                     .then((insertedItems) => {
//                         console.log('Inserted items:', insertedItems);
//                     })
//                     .catch((error) => {
//                         console.error('Error inserting items:', error);
//                     });
//             })
//             .catch((error) => {
//                 console.error('Error inserting categories:', error);
//             });
//     }
//     catch {
//         console.log("found ");
//     }
// }