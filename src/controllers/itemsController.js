import Item from '../models/itemsModel.js'
import Category from '../models/categoryModel.js'

//Add items :  with name, category, note, and image.
export const addItems = async (req, res) => {
  try {
    const { name, category, note, image } = req.body;
    console.log({ name, category, note, image });
    const checkCategory = await Category.find({ name: category });
    console.log(checkCategory);
    if (checkCategory.length == 0) {
      console.log(" inside category");
      const createCategory = await Category.create({ name: category });
      const item = await Item.create({ name, category:createCategory._id, note, image });
      return res.json(item);
    }
    const item = await Item.create({ name, category:checkCategory[0]._id, note, image });
    return res.json(item);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'An error occurred while adding items.' });
  }

}

// get individual item details
export const getItemDetails = async (req, res) => {
  try {
    const id = req.params.itemId
    console.log("id is : ", id);
    const item = await Item.findById(id);
    console.log(item);
    res.json(item)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching items.' });
  }
}
// get all items grouped using category wise 
export const getAllItems = async (req, res) => {
  try {
    const itemsWithCategories = await Item.aggregate([
      {
        $lookup: {
          from: 'categories', // Name of the Category collection
          localField: 'category',
          foreignField: '_id',
          as: 'categoryData'
        }
      },
      {
        $unwind: '$categoryData'
      },
      {
        $group: {
          _id: '$category',
          categoryName: { $first: '$categoryData.name' },
          items: {
            $push: {
              _id: '$_id',
              name: '$name',
              note: '$note',
              image: '$image'
            }
          }
        }
      }
    ]).sort({ categoryName: 1 });
    res.json(itemsWithCategories)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching items.' });
  }
}


// Get all items category-wise: with :category id  provided 
export const getAllItemsCategory = async (req, res) => {
  try {
    const id = req.params.categoryId
    const items = await Item.find({ category: id }).populate('category');

    res.json(items)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching items.' });
  }
}

// get all items page wise 
export async function getItemsByPage(req, res) {
  const { page, perPage } = req.query;
  const pageNumber = parseInt(page) || 1;
  const itemsPerPage = parseInt(perPage) || 5;

  try {
    const totalCount = await Item.countDocuments();
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const items = await Item.find()
      .skip((pageNumber - 1) * itemsPerPage)
      .limit(itemsPerPage);

    res.json({
      items,
      currentPage: pageNumber,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching items.' });
  }
}






