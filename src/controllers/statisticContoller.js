import ShoppingList from '../models/shoppingListModel.js';

// Get top items:  
export const getTopItems = async (req, res) => {
    try {
        const topItems = await ShoppingList.aggregate([
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
                $unwind: '$itemData'
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
                $unwind: '$categoryData'
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
            { $limit: 5 },
            {
                $project: {
                    _id: 1,
                    totalQuantity: 1,
                    percentage: {
                        $multiply: [
                            { $divide: ['$totalQuantity', { $sum: '$totalQuantity'}] },100 // Multiply by 100 to get the percentage
                        ]
                    }
                }
            }
        ]);



        res.status(200).json(topItems);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
// Get top categories:  
export const getTopCategories = async (req, res) => {
    try {
        const topCategories = await ShoppingList.aggregate([
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
                $unwind: '$itemData'
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
                $unwind: '$categoryData'
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
            { $limit: 5 },
            {
                $project: {
                    _id: 1,
                    totalQuantity: 1,
                    percentage: {
                        $multiply: [
                            { $divide: ['$totalQuantity', { $sum: '$totalQuantity'}] },100 // Multiply by 100 to get the percentage
                        ]
                    }
                }
            }
        ]);

        res.status(200).json(topCategories);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
// Get stats for weekly status:
export const getWeeklyStatus = async (req, res) => {
};
// Get stats for monthly status:
export const getMonthlyStatus = async (req, res) => {
} 
