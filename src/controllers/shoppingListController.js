import ShoppingList from '../models/shoppingListModel.js';
import { isSameDay } from '../utils/dateUtils.js';
export const createShoppingList = async (req, res) => {
    try {
        const { email, userid } = req.userDetail
        const isActiveShoppingList = await ShoppingList.find({ status: 'active', user: userid });
        if (isActiveShoppingList && isActiveShoppingList.length > 0) {
            return res.status(409).json({ error: 'Active shopping list already exists.' });
        }
        const defaultShoppingList = {
            user: userid,
            name: "Shopping List",
            status: 'active',
            items: [],
        }
        const newActiveShoppingList = await ShoppingList.create(defaultShoppingList);
        res.status(201).json([newActiveShoppingList]);
    } catch (error) {
        // console.error("Error creating shopping list:", error);
        res.status(500).json({ error: 'An error occurred while creating shopping list.' });
    }
}
// Add items to shopping list and update purchase history  
export const addItemShoppingList = async (req, res) => {
    try {
        const { id, count } = req.body;
        const { email, userid } = req.userDetail
        const currentDate = new Date();
        const newPurchaseHistory = {
            date: currentDate,
            count
        }
        // item to push 
        const itemtoPush = {
            item: id,
            purchaseHistory: [newPurchaseHistory]
        }
        // check if there is an active shopping list
        const activeShoppingList = await ShoppingList.find({ status: 'active', user: userid });
        if (!activeShoppingList || activeShoppingList.length === 0) {
            res.status(404).json({ error: 'No active shopping list found.' });
        } else {
            // add item to active shopping list
            const isItem = await ShoppingList.find({ status: 'active', user: userid, items: { $elemMatch: { item: id } } });
            //  check if item already exists in the list not exist then push to the items
            if (!isItem || isItem.length === 0) {
                const updatedShoppingList = await ShoppingList.findOneAndUpdate({ status: 'active', user: userid }, { $push: { items: itemtoPush } }, {
                    returnDocument: "after",
                });
                res.status(201).json(updatedShoppingList);
            } else {
                //  item exist 
                const index = isItem[0].items.findIndex((item) => item.item == id);
                // then check if the isSameDay  to increase/decrease in the purchaseHistory
                const purchaseHistory = isItem[0].items[index].purchaseHistory;
                const ischeckDate = isSameDay(currentDate, purchaseHistory)[0];
                const historyIndex = isSameDay(currentDate, purchaseHistory)[1];
                if (!ischeckDate) {
                    // not same day then push to the purchaseHistory
                    const updatedShoppingList = await ShoppingList.findOneAndUpdate({ status: 'active', user: userid },
                        {
                            $push: {
                                [`items.${index}.purchaseHistory`]: newPurchaseHistory,
                            }
                        }, {
                        new: true,
                    }
                    );
                    res.status(201).json(updatedShoppingList);
                } else {
                    // same day then increase/decrease in the purchaseHistory
                    const updatedShoppingList = await ShoppingList.findOneAndUpdate({ status: 'active', user: userid },
                        {
                            $inc: {
                                [`items.${index}.purchaseHistory.${historyIndex}.count`]: count,
                            }
                        }, {
                        new: true,
                    }
                    );
                    res.status(201).json(updatedShoppingList);
                }

            }

        }
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// Delete items from list:
export const deleteItemShoppingList = async (req, res) => {
    try {
        const { id } = req.body;
        const { email, userid } = req.userDetail
        const activeShoppingList = await ShoppingList.findOne({ status: 'active', user: userid });

        if (!activeShoppingList) {
            return res.status(404).json({ error: 'No active shopping list found.' });
        }

        const filter = {
            _id: activeShoppingList._id,
            user: userid,
        };

        const update = {
            $pull: { 'items': { 'item': id } }
        };

        const options = {
            new: true
        };

        const updatedShoppingList = await ShoppingList.findOneAndUpdate(filter, update, options);

        if (!updatedShoppingList) {
            return res.status(404).json({ error: 'Item not found in the shopping list.' });
        }

        res.status(200).json(updatedShoppingList);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the item.' });
    }
};

// update item status to Done : true /false
export const updateItemStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        const { email, userid } = req.userDetail
        const activeShoppingList = await ShoppingList.findOne({ status: 'active', user: userid, });
        if (!activeShoppingList) {
            return res.status(404).json({ error: 'No active shopping list found.' });
        }
        const index = activeShoppingList.items.findIndex((item) => item.item == id);
        if (index === -1) {
            return res.status(404).json({ error: 'Item not found in the shopping list.' });
        }
        const updatedShoppingList = await ShoppingList.findOneAndUpdate({ status: 'active', user: userid, },
            {
                $set: {
                    [`items.${index}.status`]: status,
                }
            }, {
            new: true,
        }
        );
        res.status(201).json(updatedShoppingList);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating item status.' });
    }
};

// update shopping list status: cancel/complete
export const updateShoppingListStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { email, userid } = req.userDetail
        const activeShoppingList = await ShoppingList.findOne({ status: 'active', user: userid, });
        if (!activeShoppingList) {
            return res.status(404).json({ error: 'No active shopping list found.' });
        }
        else {
            const updatedShoppingList = await ShoppingList.findOneAndUpdate({ status: 'active', user: userid, }, { status: status }, {
                returnDocument: "after",
            });
            res.status(201).json(updatedShoppingList);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while updating shopping list status.' });
    }
};

// update the name of the SHopping List 
export const updateShoppingListName = async (req, res) => {
    try {
        const { name } = req.body;
        const { email, userid } = req.userDetail
        const activeShoppingList = await ShoppingList.findOne({ status: 'active', user: userid, });
        if (!activeShoppingList) {
            return res.status(404).json({ error: 'No active shopping list found.' });
        }
        else {
            const updatedShoppingList = await ShoppingList.findOneAndUpdate({ status: 'active', user: userid, }, { name }, {
                returnDocument: "after",
            });
            res.status(201).json(updatedShoppingList);
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating shopping list name.' });
    }
};
// Get active shopping list and its  items;
export const getActiveShopingList = async (req, res) => {
    // console.log("active");
    const { email, userid } = req.userDetail
    try {
        const activeList = await ShoppingList.aggregate([
            {
                // $match: { status: "active" ,user:userid} // Filter the documents to only include 'active' shopping lists

                $match: {
                    $expr: {
                        $and: [
                            { $eq: ['$status', 'active'] }, // Replace 'completed' with the desired status
                            { $eq: ['$user', { $toObjectId: userid }] } // Replace the ObjectId string with the desired ObjectId
                        ]
                    }
                }

            },
            {
                $unwind: {
                    path: "$items",
                    preserveNullAndEmptyArrays: true // Preserve documents with empty arrays
                }
            },
            {
                $addFields: {
                    "items.total": { $sum: "$items.purchaseHistory.count" } // Calculate the total
                }
            },
            {
                $lookup: {
                    from: "items",
                    localField: "items.item",
                    foreignField: "_id",
                    as: "items.item"
                }
            },
            {
                $unwind: {
                    path: "$items.item",
                    preserveNullAndEmptyArrays: true // Preserve documents with empty arrays
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "items.item.category",
                    foreignField: "_id",
                    as: "items.item.category"
                }
            },
            {
                $group: {
                    _id: "$_id", // Group the items back to the original document
                    name: { $first: "$name" },
                    status: { $first: "$status" },
                    items: { $push: "$items" } // Push the modified items back
                }
            }
        ]);


        if (!activeList || activeList.length === 0) {
            return res.status(404).json({ error: 'No active shopping list found.' });
        }

        res.status(200).json(activeList);
    } catch (error) {
        // console.log(error.message);
        res.status(500).json({ error: 'An error occurred while fetching active shopping list.' });
    }

}
// Get all shopping lists:
export const getShoppingLists = async (req, res) => {
    const { email, userid } = req.userDetail
    console.log(userid);
    try {
        const shoppingLists = await ShoppingList.aggregate([
            // $match:{_id:'64fbd6eab8b3a80c9a29ecbe'}
            { $match: { $expr: { $eq: ['$user', { $toObjectId: userid }] } } },
            {
                $unwind:{
                    path:"$items",
                    preserveNullAndEmptyArrays:true
                }
            },
            {
                $addFields: {
                    "items.total": { $sum: "$items.purchaseHistory.count" } // Calculate the total
                }
            },
            {
                $group: {
                    _id: "$_id", // Group the items back to the original document
                    name: { $first: "$name" },
                    status: { $first: "$status" },
                    items: { $push: "$items" } // Push the modified items back
                }
            },
            {
                $lookup: {
                    from: "items",
                    localField: "items.item",
                    foreignField: "_id",
                    as: "items.item"
                }
            },
            {
               $unwind:{
                    path:"$items.item",
                    preserveNullAndEmptyArrays:true
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "items.item.category",
                    foreignField: "_id",
                    as: "items.item.category"
                }
            },
            {
                $group: {
                    _id: {
                        shoppingListId: "$_id",
                        shoppingListName: "$name",
                        categoryName: "$items.item.category.name"
                    },
                    shoppingListId: { $first: "$_id" },
                    shoppingListName: { $first: "$name" },
                    status: { $first: "$status" },
                    categoryName: { $first: "$items.item.category.name" },
                    items: {
                        $push: {
                            itemId: "$items.item._id",
                            itemName: "$items.item.name",
                            total: "$items.total"
                        }
                    }
                }
            },
            {

                $group: {
                    _id: "$shoppingListId",
                    shoppingListId: { $first: "$shoppingListId" },
                    name: { $first: "$shoppingListName" },
                    status: { $first: "$status" },
                    categories: {
                        $push: {
                            categoryName: "$categoryName",
                            items: "$items"
                        }
                    }
                }

            }
        ])
        res.status(200).json(shoppingLists);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}
