import ShoppingList from '../models/shoppingListModel.js';

// Get top items:  
export const getTopItems = async (req, res) => {
    const { email, userid } = req.userDetail
    try {
        const topItems = await ShoppingList.aggregate([
            { $match: { $expr: { $eq: ['$user', { $toObjectId: userid }] } } },
            { $unwind: '$items' },
            { $unwind: '$items.purchaseHistory' },
            {
                $group: {
                    _id: '$items.item',
                    totalQuantity: { $sum: '$items.purchaseHistory.count' }
                }
            },
            {
                $lookup: {
                    from: 'items', // Name of the Item collection
                    localField: '_id',
                    foreignField: '_id',
                    as: 'itemData'
                }
            },
            {
                $unwind: {
                    path: "$itemData",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'categories', // Name of the Categories collection
                    localField: 'itemData.category', // Assuming category field in itemData holds the category ID
                    foreignField: '_id',
                    as: 'categoryData'
                }
            },
            {
                $unwind: {
                    path: "$categoryData",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    totalQuantity: 1,
                    itemName: '$itemData.name',
                    categoryName: '$categoryData.name'
                }
            },

            { $sort: { totalQuantity: -1 } },
            { $limit: 4 },
        ]);



        res.status(200).json(topItems);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
// Get top categories:  
export const getTopCategories = async (req, res) => {
    const { email, userid } = req.userDetail
    try {
        const topCategories = await ShoppingList.aggregate([
            { $match: { $expr: { $eq: ['$user', { $toObjectId: userid }] } } },
            {
                $unwind: {
                    path: "$items",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$items.purchaseHistory",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: '$items.item',
                    totalQuantity: { $sum: '$items.purchaseHistory.count' }
                }
            },
            {
                $lookup: {
                    from: 'items', // Name of the Item collection
                    localField: '_id',
                    foreignField: '_id',
                    as: 'itemData'
                }
            },
            {
                $unwind: {
                    path: "$itemData",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'categories', // Name of the Categories collection
                    localField: 'itemData.category', // Assuming category field in itemData holds the category ID
                    foreignField: '_id',
                    as: 'categoryData'
                }
            },
            {
                $unwind: {
                    path: "$categoryData",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    totalQuantity: 1,
                    categoryName: '$categoryData.name'
                }
            },
            {
                $group: {
                    _id: '$categoryName',
                    totalQuantity: { $sum: '$totalQuantity' }
                }
            },
            { $sort: { totalQuantity: -1 } },
            { $limit: 4 },
        ]);

        res.status(200).json(topCategories);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
// Get stats for weekly status:
export const getcategoriesWithinInterval = async (req, res) => {
        const { email, userid } = req.userDetail
        try {
            // const { startDate, endDate } = req.body
             const startDate = '2023-9-1'; // Replace with your start date
        const endDate = '2023-9-30';   // Replace with your end date
      
            const categoriesWithinInterval = await ShoppingList.aggregate([
                { $match: { $expr: { $eq: ['$user', { $toObjectId: userid }] } } },
                {
                    $unwind: {
                        path: "$items",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $unwind: {
                        path: "$items.purchaseHistory",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $match: {
                        'items.purchaseHistory.date': {
                            $gte: new Date(startDate), // Convert startDate to Date object
                            $lte: new Date(endDate),   // Convert endDate to Date object
                        }
                    }
                },
                {
                    $group: {
                        _id: '$items.item',
                        totalQuantity: { $sum: '$items.purchaseHistory.count' }
                    }
                },
                {
                    $lookup: {
                        from: 'items', // Name of the Item collection
                        localField: '_id',
                        foreignField: '_id',
                        as: 'itemData'
                    }
                },
                {
                    $unwind: {
                        path: "$itemData",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $lookup: {
                        from: 'categories', // Name of the Categories collection
                        localField: 'itemData.category', // Assuming category field in itemData holds the category ID
                        foreignField: '_id',
                        as: 'categoryData'
                    }
                },
                {
                    $unwind: {
                        path: "$categoryData",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        _id: 1,
                        totalQuantity: 1,
                        categoryName: '$categoryData.name'
                    }
                },
                {
                    $group: {
                        _id: '$categoryName',
                        totalQuantity: { $sum: '$totalQuantity' }
                    }
                },
            ]);
            res.status(200).json(categoriesWithinInterval)
        }
        catch (e) {
            console.log(e.message)
            res.status(500).send({ message: "some error has been occured" })
        }
    

};
// Get stats for monthly status:
export const getMonthlyStatus = async (req, res) => {

} 
