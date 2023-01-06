import Course from '../models/Courses.js';
import ultil from '../../util/mongoose.js';
import Category from '../models/Category.js';
const ITEM_PER_PAGE = 3
const categoryController = {
    view: async (req, res) => {
      const all_category = await Category.find({})
      const category = req.params.id
      const page = +req.query.page || 1;
      if(page == null){
        return;
      }
      let totalItems;
      Course.find({category: category})
      .count()
      .then(numProducts => {
        totalItems= numProducts
        return Course.find({category: category})
        .skip((page - 1) * ITEM_PER_PAGE)
        .limit(ITEM_PER_PAGE)
      })
     
      .then(data => {
        res.render("category/viewCourse", {
          data: data,
          active: req.params.id,
          length: totalItems,
          currentPage : page,
          hasNextPage: ITEM_PER_PAGE * page < totalItems,
          hasPreviousPage: page > 1,
          nextPage: page + 1,
          previousPage: page - 1,
          lastPage: Math.ceil(totalItems/ITEM_PER_PAGE),
          all_category: all_category

        });
      })
    },
    subCategory: async (req, res) => {
      const subCate = req.params.id
      const categoryMain = await Course.findOne({ subCategory: subCate})
      const categoryParent = categoryMain.category
      console.log(categoryParent, 111111)

      const data_cate = await Category.findOne({category: categoryParent})
      const all_data = data_cate.subCategories

      const page = +req.query.page || 1;
      if(page == null){
        return;
      }
      let totalItems;
      Course.find({subCategory: subCate})
      .count()
      .then(numProducts => {
        totalItems= numProducts
        return Course.find({subCategory: subCate})
        .skip((page - 1) * ITEM_PER_PAGE)
        .limit(ITEM_PER_PAGE)
      })
     
      .then(data => {
        res.render("category/subCategory", {
          data: data,
          active: req.params.id,
          length: totalItems,
          currentPage : page,
          hasNextPage: ITEM_PER_PAGE * page < totalItems,
          hasPreviousPage: page > 1,
          nextPage: page + 1,
          previousPage: page - 1,
          lastPage: Math.ceil(totalItems/ITEM_PER_PAGE),
          all_category: all_data,
          nameCategory: categoryParent

        });
      })
    },
  }
  
  export default categoryController;
  