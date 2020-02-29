const express = require("express");
const router = express.Router();
const productCategoriesController = require("../../controllers/admin/productCategoriesController");
const productSubCategoriesController = require("../../controllers/admin/productSubCategoriesController");
const productCompaniesController = require("../../controllers/admin/productCompaniesController");
const productBrandController = require("../../controllers/admin/productBrandController");
const productController = require("../../controllers/admin/productController.js");
const adminController = require("../../controllers/admin/adminController.js");
const userController = require("../../controllers/user/userController");
const countryController = require("../../controllers/admin/countryController");
const regionController = require("../../controllers/admin/regionController");
const areaController = require("../../controllers/admin/areaController");
const territoryController = require("../../controllers/admin/territoryController");
const routeController = require("../../controllers/admin/routeController");
const adminRoleController = require("../../controllers/admin/adminRoleController");
const userDesignationController = require("../../controllers/admin/userDesignationController");
const userAdminController = require("../../controllers/admin/userController");
const outletController = require("../../controllers/user/outletController.js");
const submissionController = require("../../controllers/user/submissionController");
const sosTargetController = require("../../controllers/admin/sosTargetController");
const submissionTargetController = require("../../controllers/admin/submissionTargetController");
const visitTargetController = require("../../controllers/admin/visitTargetController");
const mslTargetController = require("../../controllers/admin/mslTargetController");
const feedbackSubjectController = require("../../controllers/admin/feedbackSubjectController");
const feedbackController = require("../../controllers/admin/feedbackController");

const { check } = require("express-validator/check");
const auth = require("../../middleware/admin/auth");
const userAuth = require("../../middleware/user/auth.js");

const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");
const config = require("config");

cloudinary.config({
  cloud_name: "feta",
  api_key: "469625335772348",
  api_secret: "1qismeh6D-TiDmgGeNMQ6n1EZeY"
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: "submissions",
  allowedFormats: ["jpg", "png"]
});

const parser = multer({ storage });

/*---------------------Admin Product category Routes --------------------------- */
//Routes
//Admin Categories Routes
//@route   POST admin/signup
//@decs    Sign up Admin
//@access  Private/Admin
router.get("/admin/categories", auth, productCategoriesController.categories);

//Admin Categories Routes
//@route   POST admin/category
//@decs    Admin add Product Category
//@access  Private/Admin
router.post("/admin/category", auth, productCategoriesController.addCategory);

//Admin Auth Routes
//@route   POST admin/signup
//@decs    Sign up Admin
//@access  Private/Admin
router.delete(
  "/admin/category/:id",
  auth,
  productCategoriesController.deleteCategory
);

/*---------------------Admin Product category Routes  ends --------------------------- */

/*---------------------Admin Product subcategory category Routes --------------------------- */
//Admin Categories Routes
//@route   GET admin/sub-category
//@decs    Admin Get all Product sub Category
//@access  Private/Admin
router.get(
  "/admin/sub-categories",
  auth,
  productSubCategoriesController.getSubCategory
);

//Admin Categories Routes
//@route   POST admin/sub-category
//@decs    Admin add Product sub Category
//@access  Private/Admin
router.post(
  "/admin/sub-category",
  auth,
  productSubCategoriesController.addSubCategory
);

//Admin Categories Routes
//@route   GET admin/sub-category/:cat_id
//@decs    Admin add Product sub Category
//@access  Private/Admin
router.get(
  "/admin/sub-category/:cat_id",
  auth,
  productSubCategoriesController.getSubCategoryByCategory
);

//Admin Categories Routes
//@route   POST admin/sub-category/delete/:id
//@decs    Admin delete Product sub Category
//@access  Private/Admin
router.delete(
  "/admin/sub-category/:id",
  auth,
  productSubCategoriesController.deleteSubCategory
);

/*---------------------Admin Product subcategory category Routes ends--------------------------- */

/*---------------------Admin Product company Routes --------------------------- */
//Admin Company Routes
//@route   GET admin/companies
//@decs    Admin Get all Product Companies
//@access  Private/Admin
router.get("/admin/companies", auth, productCompaniesController.getCompanies);

//Admin Company Routes
//@route   POST admin/company
//@decs    Admin add Product company
//@access  Private/Admin
router.post("/admin/company", auth, productCompaniesController.addCompany);

//Admin Company Routes
//@route   POST admin/company/:id
//@decs    Admin delete Product company
//@access  Private/Admin
router.delete(
  "/admin/company/:id",
  auth,
  productCompaniesController.deleteCompany
);

/*---------------------Admin Product Company Routes ends--------------------------- */

/*---------------------Admin Product Brand Routes --------------------------- */
//Admin Brands Routes
//@route   GET admin/brand
//@decs    Admin Get all Product Brands
//@access  Private/Admin
router.get("/admin/brands", auth, productBrandController.getBrands);

//Admin Company Routes
//@route   POST admin/brand
//@decs    Admin add Product brand
//@access  Private/Admin
router.post("/admin/brand", auth, productBrandController.addBrand);

//Admin Categories Routes
//@route   GET admin/sub-category/:cat_id
//@decs    Admin add Product sub Category
//@access  Private/Admin
router.get(
  "/admin/brand/:company_id",
  auth,
  productBrandController.getBrandsByCompany
);

//Admin Brand Routes
//@route   POST admin/brand/:id
//@decs    Admin delete Product brand
//@access  Private/Admin
router.delete("/admin/brand/:id", auth, productBrandController.deleteBrand);

/*---------------------Admin Product Brand Routes ends--------------------------- */

/*---------------------Admin Product Routes --------------------------- */
//Admin Brands Routes
//@route   GET admin/product
//@decs    Admin Get all Product
//@access  Private/Admin
router.get("/admin/products", auth, productController.getProducts);

//Admin Products Routes
//@route   GET admin/products/:company_id
//@decs    Admin Get all company Product
//@access  Private/Admin
router.get(
  "/admin/products/:company_id",
  auth,
  productController.getProductsByCompany
);

router.get(
  "/user/products/:company_id",
  userAuth,
  productController.getProductsByCompany
);

//Admin Product Routes
//@route   POST admin/product
//@decs    Admin add Product
//@access  Private/Admin
router.post(
  "/admin/product",
  auth,
  [
    check("sku", "Please name is required")
      .not()
      .isEmpty()
      .trim(),

    check("brand", "Please brand is required")
      .not()
      .isEmpty()
      .trim(),
    check("company_name", "Please company is required")
      .not()
      .isEmpty()
      .trim(),
    check("sub_cat_name", "Please Sub Category is required")
      .not()
      .isEmpty()
      .trim(),
    check("cat_name", "Please Category is required")
      .not()
      .isEmpty()
      .trim()
  ],
  productController.addProduct
);

//Admin Product Routes
//@route   POST admin/product/:id
//@decs    Admin delete Product
//@access  Private/Admin
router.delete("/admin/product/:id", auth, productController.deleteProduct);

/*---------------------Admin Product Brand Routes ends--------------------------- */

/*---------------------Admin Roles Routes --------------------------- */
//Admin Roles Routes
//@route   GET admin/roles
//@decs    Admin Get all Roles
//@access  Private/Admin
router.get("/admin/roles", auth, adminRoleController.getAdminRoles);

//Admin Roles Routes
//@route   POST admin/role
//@decs    Admin add Role
//@access  Private/Admin
router.post(
  "/admin/role",
  auth,
  [
    check("name", "Please name is required")
      .not()
      .isEmpty()
      .trim(),

    check("power", "Please Admin Power is required")
      .not()
      .isEmpty()
      .trim(),
    check("description", "Please Admin Role description is required")
      .not()
      .isEmpty()
      .trim()
  ],
  adminRoleController.addAdminRole
);

//Admin Roles Routes
//@route   POST admin/role/:id
//@decs    Admin delete role
//@access  Private/Admin
router.delete("/admin/role/:id", auth, adminRoleController.deleteAdminRole);

/*---------------------Admin Roles Routes ends--------------------------- */

/*---------------------Admin Designation Routes --------------------------- */
//Admin - User Designation Routes
//@route   GET admin-user/designation
//@decs    Admin Get all user designation
//@access  Private/Admin
router.get(
  "/admin/user/designations",
  auth,
  userDesignationController.getUserDesignations
);

//Admin - User Designation Routes
//@route   POST admin-user/designation
//@decs    Admin add User Designation
//@access  Private/Admin
router.post(
  "/admin/user/designation",
  auth,
  [
    check("name", "Please name is required")
      .not()
      .isEmpty()
      .trim(),
    check("description", "Please Description description is required")
      .not()
      .isEmpty()
      .trim()
  ],
  userDesignationController.addUserDesignation
);

//Admin-User Designation Routes
//@route   POST admin/user/designation/:id
//@decs    Admin delete user designation
//@access  Private/Admin
router.delete(
  "/admin/user/designation/:id",
  auth,
  userDesignationController.deleteUserDesignation
);

/*---------------------Admin Designation Routes ends--------------------------- */

//Admin Auth Routes
//@route   POST admin/signup
//@decs    Sign up Admin
//@access  Private/Admin
router.post(
  "/admin/signup",
  [
    check("name", "Please name is required")
      .not()
      .isEmpty(),

    check("email", "Please input a valid email")
      .not()
      .isEmpty()
      .isEmail()
  ],
  adminController.signUp
);

//@route   POST admin/signin
//@decs    Sign in Admin
//@access  Private/Admin
router.post(
  "/admin/signin",
  [
    // Check for email
    check("email", "Please input a valid email")
      .not()
      .isEmpty()
      .isEmail(),

    // username must be an email
    check("password", "Password is required")
      .not()
      .isEmpty()
  ],
  adminController.signIn
);

//@route   POST Admin/Forgot Password
//@decs    Admin Forgot Passworf
//@access  Private/User
router.post(
  "/admin/forgot-password",
  [
    // Check for phone
    check("phone", "Phone is required")
      .not()
      .isEmpty()
  ],
  adminController.forgotPassword
);

//@route   POST Admin/Verify Password Token
//@decs    Admin Verify Password Token
//@access  Public/Admin
router.post(
  "/admin/verify-token",
  [
    // Check for phone
    check("code", "Code is required")
      .not()
      .isEmpty()
  ],
  adminController.verifyToken
);

//@route   POST Admin/Change Password
//@decs    User Forgot Password
//@access  Private/Admin
router.post(
  "/admin/change-password",
  [
    // Check for phone
    check("password", "password is required and 8 minimum")
      .not()
      .isEmpty()
      .isLength({ min: 6 })
  ],
  adminController.changePassword
);

//@route   GET admins/
//@decs    Get All Admin
//@access  Private/Admin
router.get("/admin/admins", auth, adminController.getAdmins);

//@route   GET admins/
//@decs    Get Company Admins
//@access  Private/Admins
router.get("/admin/admins/:company", auth, adminController.getCompanyAdmins);

//@route   GET admin/
//@decs    Get logged in Admin
//@access  Private/Admin
router.get("/admin/auth", auth, adminController.getAdmin);

//@route   DELETE admin/:admin_id
//@decs    Remove Admin
//@access  Private/Admin
router.delete("/admin/remove/:admin_id", auth, adminController.removeAdmin);

//Admin Auth Routes
//@route   POST user/signup
//@decs    Sign up User
//@access  Private/Admin
router.post(
  "/admin/user/signup",
  [
    check("name", "Please name is required")
      .not()
      .isEmpty(),

    check("email", "Please input a valid email")
      .not()
      .isEmpty()
      .isEmail(),

    check("phone", "Please Phone number is required")
      .not()
      .isEmpty()
  ],
  userAdminController.signUp
);

//@route   GET Users/
//@decs    Get All Users
//@access  Private/Admin
router.get("/admin/users/:company", auth, userAdminController.getUsers);

//@route   Update user/route/:admin_id
//@decs    Update User Route
//@access  Private/Admin
router.patch(
  "/admin/user/route/:user_id",
  auth,
  userAdminController.updateUserRoute
);

//@route   DELETE user/:admin_id
//@decs    Remove User
//@access  Private/Admin
router.delete(
  "/admin/remove/user/:user_id",
  auth,
  userAdminController.removeUser
);

//@route   POST admin/country
//@decs    Add New Country
//@access  Private/Admin

router.post("/admin/country", countryController.addCountry);

//@route   DELETE admin/country
//@decs    Delete Country
//@access  Private/Admin

router.delete("/admin/country/:id", auth, countryController.deleteCountry);

//@route   GET admin/country
//@decs    Get  Countries
//@access  Private/Admin
router.get("/admin/countries/", auth, countryController.getCountry);
router.get("/user/countries/", userAuth, countryController.getCountry);

//@route   POST admin/region
//@decs     Add new  Region
//@access  Private/Admin
router.post("/admin/region", auth, regionController.addRegion);

//@route  GET admin/region
//@decs     Get region
//@access   Private/Admin

router.get("/admin/regions", auth, regionController.getRegion);
router.get("/user/regions", userAuth, regionController.getRegion);

//@route  GET admin/regions/:country
//@decs     Get region by Country
//@access   Private/Admin

router.get(
  "/admin/regions/:country_id",
  auth,
  regionController.getRegionsByCountry
);

router.get(
  "/user/regions/:country_id",
  userAuth,
  regionController.getRegionsByCountry
);

//@route  DELETE admin/region
//@decs     Delete region
//@access   Private/Admin

router.delete("/admin/region/:id", auth, regionController.deleteRegion);

//@route GET admin/area
//@desc   Get area
//@access Private/Admin

router.get("/admin/areas", auth, areaController.getArea);
router.get("/user/areas", userAuth, areaController.getArea);

//@route  GET admin/area/:region
//@decs     Get area by region
//@access   Private/Admin

router.get("/admin/areas/:region_id", auth, areaController.getAreasByRegion);
router.get("/user/areas/:region_id", userAuth, areaController.getAreasByRegion);

//@route POST admin/area
//@desc   Add new Area
//@access  Private/Admin
router.post("/admin/area", areaController.addArea);

//@route DELETE admin/area
//@desc Delete  area
//@access Private/Admin

router.delete("/admin/area/:id", areaController.deleteArea);

//@route GET admin/territory
//@desc  Get Territories
//@access Private/Admin

router.get("/admin/territories", auth, territoryController.getTerritory);

router.get("/user/territories", userAuth, territoryController.getTerritory);

//@route  GET admin/territory/:area
//@decs     Get territorry by area
//@access   Private/Admin

router.get(
  "/admin/territory/:area_id",
  auth,
  territoryController.getTerritoriesByArea
);

router.get(
  "/user/territory/:area_id",
  userAuth,
  territoryController.getTerritoriesByArea
);

//@route POST admin/territory
//@desc   Add new Territory
//@access  Private/Admin
router.post("/admin/territory", territoryController.addTerritory);

//@route DELETE admin/territory
//@desc   Delete Territory
//@access  Private/Admin
router.delete("/admin/territory/:id", territoryController.deleteTerritory);

router.get("/admin/routes", auth, routeController.getRoutes);

router.get("/user/routes", userAuth, routeController.getRoutes);

//@route  GET admin/route/:territory
//@decs     Get route by territoty
//@access   Private/Admin

router.get(
  "/admin/route/:territory_id",
  auth,
  routeController.getRoutesByTerritory
);

router.get(
  "/user/routes/:territory_id",
  userAuth,
  routeController.getRoutesByTerritory
);

//@route POST admin/route
//@desc   Add new Route
//@access  Private/Admin
router.post("/admin/route", auth, routeController.addRoute);

//@route DELETE admin/Route
//@desc   Delete Route
//@access  Private/Admin
router.delete("/admin/route/:id", auth, routeController.deleteRoute);

//@route POST User/Outlet
//@desc   Add new Outlet
//@access  Private/User
router.post("/user/outlet", userAuth, outletController.addOutlet);

//@route Get User/Outlet
//@desc   fetch user Outlet
//@access  Private/User
router.get(
  "/user/:user_id/outlets",
  userAuth,
  outletController.getOutletsByUser
);

//@route Get Admin/Outlet
//@desc   fetch user Outlet
//@access  Private/User
router.get("/admin/outlets", auth, outletController.getOutlets);

//@route Get Admin/Outlet
//@desc   fetch user Outlet
//@access  Private/User
router.delete("/admin/outlet/:id", auth, outletController.deleteOutlet);

/*---------------------Admin SOS Target Routes --------------------------- */
//Routes
//Admin Sos target Routes
//@route   Get admin/sos-targets/:id
//@decs    Company Admin Get all SOS Targets
//@access  Private/Admin
router.get("/admin/sos-targets/:id", auth, sosTargetController.getSosTarget);

//Admin Sos target Routes
//@route   POST admin/sos-targets/
//@decs    Company Admin Get all SOS Targets
//@access  Private/Admin
router.post("/admin/sos-target", auth, sosTargetController.addSosTarget);

//Admin Sos target Routes
//@route   Update admin/sos-targets/
//@decs    Company Admin Update SOS Target
//@access  Private/Admin
router.patch(
  "/admin/sos-target/:id",
  auth,
  sosTargetController.updateSosTarget
);

//Admin Sos target Routes
//@route   Delete admin/sos-targets/
//@decs    Company Admin Delete SOS Target
//@access  Private/Admin
router.delete(
  "/admin/sos-target/:id",
  auth,
  sosTargetController.deleteSosTarget
);

/*---------------------Admin Submission Target Routes --------------------------- */
//Routes
//Admin Submission target Routes
//@route   Get admin/submission-target/:company_id
//@decs    Company Admin Get all Submission Targets
//@access  Private/Admin
router.get(
  "/admin/submission-targets/:id",
  auth,
  submissionTargetController.getSubmissionTarget
);

//Admin Ssubmission target Routes
//@route   POST admin/submission-targets/
//@decs    Company Admin Get all Submission Targets
//@access  Private/Admin
router.post(
  "/admin/submission-target",
  auth,
  submissionTargetController.addSubmissionTarget
);

//Admin Submission target Routes
//@route   Update admin/submission-targets/
//@decs    Company Admin Update Submission Target
//@access  Private/Admin
router.patch(
  "/admin/submission-target/:id",
  auth,
  submissionTargetController.updateSubmissionTarget
);

//Admin Sos target Routes
//@route   Delete admin/submission-targets/:target_id
//@decs    Company Admin Delete Submission Target
//@access  Private/Admin
router.delete(
  "/admin/submission-target/:id",
  auth,
  submissionTargetController.deleteSubmissionTarget
);

/*---------------------Admin Visit Target Routes --------------------------- */
//Routes
//Admin Submission target Routes
//@route   Get admin/visit-target/:company_id
//@decs    Company Admin Get all visit Targets
//@access  Private/Admin
router.get(
  "/admin/visit-targets/:id",
  auth,
  visitTargetController.getVisitTarget
);

//Admin Visit target Routes
//@route   POST admin/visit-targets/
//@decs    Company Admin Get all visit Targets
//@access  Private/Admin
router.post("/admin/visit-target", auth, visitTargetController.addVisitTarget);

//Admin Visit target Routes
//@route   Patch admin/visit-targets/:id
//@decs    Company Admin update a visit Targets
//@access  Private/Admin
router.patch(
  "/admin/visit-target/:id",
  auth,
  visitTargetController.updateVisitTarget
);

//Admin Visit target Routes
//@route   Delete admin/visit-targets/:target_id
//@decs    Company Admin Delete Submission Target
//@access  Private/Admin
router.delete(
  "/admin/visit-target/:id",
  auth,
  visitTargetController.deleteVisitTarget
);

/*---------------------Admin MSL Target Routes --------------------------- */
//Routes
//Admin Msl target Routes
//@route   Get admin/msl-target/:company_id
//@decs    Company Admin Get all msl Targets
//@access  Private/Admin
router.get("/admin/msl-targets/:id", auth, mslTargetController.getMslTarget);

//Admin Msl target Routes
//@route   POST admin/msl-targets/
//@decs    Company Admin Get all msl Targets
//@access  Private/Admin
router.post("/admin/msl-target", auth, mslTargetController.addMslTarget);

//Admin MSl target Routes
//@route   Delete admin/visit-targets/:target_id
//@decs    Company Admin Delete Submission Target
//@access  Private/Admin
router.delete(
  "/admin/msl-target/:id",
  auth,
  mslTargetController.deleteMslTarget
);

//Admin Msl target Routes
//@route   patch admin/msl-targets/:target_id
//@decs    Company Admin update Msl Target
//@access  Private/Admin
router.patch(
  "/admin/msl-target/:id",
  auth,
  mslTargetController.updateMslTarget
);

//Admin Roles Routes
//@route   GET admin/feedback-subjects
//@decs    Admin Get all feedback Subjects
//@access  Private/Admin
router.get(
  "/admin/feedback-subjects",
  auth,
  feedbackSubjectController.getFeedbackSubjects
);

router.get(
  "/user/feedback-subjects",
  userAuth,
  feedbackSubjectController.getFeedbackSubjects
);

//Admin Feedback Subject Routes
//@route   POST admin/feedback-subject
//@decs    Admin add feedback subject
//@access  Private/Admin
router.post(
  "/admin/feedback-subject",
  auth,
  [
    check("name", "Please name is required")
      .not()
      .isEmpty()
      .trim()
  ],
  feedbackSubjectController.addFeedbackSubject
);

//Admin Roles Routes
//@route   POST admin/feeback-subject/:id
//@decs    Admin delete feedback subject
//@access  Private/Admin
router.delete(
  "/admin/feedback-subject/:id",
  auth,
  feedbackSubjectController.deleteFeedbackSubject
);

//User Feedback Routes
//@route   POST user/feedback
//@decs    User add feedback
//@access  Private/User
router.post(
  "/user/feedback",
  userAuth,
  [
    check("feedback", "Please Feedback is required")
      .not()
      .isEmpty()
      .trim(),
    check("subject", "Please Subject is required")
      .not()
      .isEmpty()
      .trim(),
    check("rating", "Please Rating is required")
      .not()
      .isEmpty()
      .trim()
  ],
  feedbackController.addFeedback
);

//User Feedback Routes
//@route   POST user/feedbacks/:user_id
//@decs    User get feedbacks
//@access  Private/User

router.get(
  "/user/feedbacks/:user_id",
  userAuth,
  feedbackController.getFeedbacksByUser
);

router.get(
  "/admin/feedbacks/:company",
  auth,
  feedbackController.getFeedbacksByCompany
);

//User Feedback Routes
//@route   Delete user/feedbacks/:id
//@decs    User Delete feedback
//@access  Private/User

router.delete(
  "/user/feedback/:id",
  userAuth,
  feedbackController.deleteFeedback
);

/*-------------- User Routes------------------------- */

//@route   POST User/signin
//@decs    Sign in User
//@access  Private/User
router.post(
  "/signin",
  [
    // Check for phone
    check("phone", "Phone is required")
      .not()
      .isEmpty(),

    // username must be an email
    check("password", "Password is required")
      .not()
      .isEmpty()
  ],
  userController.signIn
);

//@route Put User/update-profile
//@desc Update user profile
//@access Private/user

router.put(
  "/user/update-profile",
  [
    // Check for phone
    check("name", "Name is required")
      .not()
      .isEmpty(),

    //  must be an email
    check("email", "Please input a valid Email")
      .not()
      .isEmpty()
      .isEmail()
  ],
  userController.updateProfile
);

//@route   POST User/Forgot Password
//@decs    User Forgot Passworf
//@access  Private/User
router.post(
  "/forgot-password",
  [
    // Check for phone
    check("phone", "Phone is required")
      .not()
      .isEmpty()
  ],
  userController.forgotPassword
);

//@route   POST User/Verufy Password Token
//@decs    User Verify Password Token
//@access  Public/User
router.post(
  "/verify-token",
  [
    // Check for phone
    check("code", "Code is required")
      .not()
      .isEmpty()
  ],
  userController.verifyToken
);

//@route   POST User/Change Password
//@decs    User Forgot Password
//@access  Private/User
router.post(
  "/change-password",
  [
    // Check for phone
    check("password", "password is required and 8 minimum")
      .not()
      .isEmpty()
      .isLength({ min: 6 })
  ],
  userController.changePassword
);

//@route   GET User/
//@decs    Get logged in User
//@access  Private/User
router.get("/auth", userAuth, userController.getUser);

router.post(
  "/user/submission",
  parser.single("image"),
  submissionController.userSubmission
);

module.exports = router;
