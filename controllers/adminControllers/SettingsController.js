const {category} = require('../../models/admin/category')
const {subcategory} = require('../../models/admin/subcategory')
const {slider} = require('../../models/slider')
const { validationResult } = require("express-validator");

exports.sliders = async(req,res) => {
    const categories = await category.find()
    const Slider = await slider.find()
    return res.render('admin/sliders/index',{categories,Slider,success:req.flash('success')})
}

exports.create = async(req,res) => {
    const categories = await category.find()
    return res.render('admin/sliders/create',{categories,success:req.flash('success'),error:req.flash('error'),oldInput: req.flash("oldInput")})
}

exports.store = async(req,res) => {
    
    try{
        const errors = await validationResult(req);

        if (!errors.isEmpty()) {
            req.flash("oldInput", req.body);
            errors.array().forEach((e) => {
             req.flash("errors", e);
                  
            });
            return res.redirect("back");
        }
        
        const Slider = await slider.create({
            title : req.body.title,
            category_id : req.body.category_id,
            subcategory_id : req.body.subcategory_id,
            image : req.file.path
        })

        req.flash("success", "New slider added successfully"); 
        return res.redirect('/admin/slider-list');

    }catch (error){
        console.log(error.message)
    }

}

