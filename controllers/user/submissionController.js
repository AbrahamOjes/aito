const automl = require("@google-cloud/automl");
const fs = require("fs");
const Submission = require("../../models/admin/Submission");
const Product = require("../../models/admin/Product");
const User = require("../../models/user/User");
const Outlet = require("../../models/admin/Outlet");
const MSLTarget = require("../../models/admin/MSLTarget");
const ShelfExcecution = require("../../models/admin/ShelfExcecution");

exports.userSubmission = async (req, res) => {
  // console.log(req.file);
  // console.log(req.body);
  const formData = JSON.parse(req.body.form);

  const { file, blobImage, latitude, longitude, user_id } = formData;

  try {
    // Create client for prediction service.
    const client = new automl.PredictionServiceClient();

    /**
     * TODO(developer): Uncomment the following line before running the sample.
     */
    const projectId = `1005250150172`;
    const computeRegion = `us-central1`;
    const modelId = `IOD8093593052989358080`;
    // const filePath = `close.jpg`;
    const scoreThreshold = `0.50`;

    // Get the full path of the model.
    const modelFullId = client.modelPath(projectId, computeRegion, modelId);

    // Read the file content for prediction.

    // const content = fs.readFileSync(filePath, "base64");

    const blob = blobImage.split(",")[1];

    const params = {
      score_threshold: scoreThreshold
    };

    // if (scoreThreshold) {
    //   params.score_threshold = scoreThreshold;
    // }

    // Set the payload by giving the content and type of the file.
    const payload = {};
    payload.image = { imageBytes: blob };

    // params is additional domain-specific parameters.
    // currently there is no additional parameters supported.
    const [response] = await client.predict({
      name: modelFullId,
      payload: payload,
      params: params
    });

    if (response.payload.length < 1) {
      return res.status(202).json({ errors: [{ msg: "Product Less than 0" }] });
    }

    // console.log(`Prediction results:`);
    // response.payload.forEach(result => {
    //   console.log(`Predicted class name: ${result.displayName}`);
    //   console.log(`Predicted class score: ${result.classification.score}`);
    // });
    const distinctProducts = [];
    const allProducts = [];
    const products = [];
    const map = new Map();
    for (const item of response.payload) {
      if (!map.has(item.displayName)) {
        map.set(item.displayName, true);
        distinctProducts.push(item.displayName);
      } else if (map.has(item.displayName)) {
        map.set(item.displayName, true);
        allProducts.push(item.displayName);
      }
    }

    const countAppearance = (a1, a2) => {
      for (var i = 0; i < a1.length; i++) {
        var count = 0;
        for (var z = 0; z < a2.length; z++) {
          if (a2[z] === a1[i]) count++;
        }
        products.push({
          product: a1[i],
          count: count + 1
        });
        // console.log({ products });
      }
    };

    countAppearance(distinctProducts, allProducts);
    // console.log({ products });

    const user = await User.findById(user_id);
    const outlet = await Outlet.findOne({ longitude, latitude });
    if (!outlet) {
      return res.status(400).json({
        msg: "Location Error. Kindly enable Location on your phone"
      });
    }
    const mslTarget = await MSLTarget.findOne({
      company: user.company,
      territory: user.territory
    });
    const mslTargetCount = mslTarget.products.length;
    const mslProducts = mslTarget.products;
    let mslProductCount = 0;
    const recognizedProducts = [];
    const companyProducts = [];
    let companyProductsCount = 0;
    let nonCompanyProductsCount = 0;
    for (let i = 0; i <= products.length - 1; i++) {
      console.log(products[i].product, products[i].count);
      const searchProduct = await Product.findById(
        products[i].product.split("_")[0]
      );
      if (!searchProduct) {
        console.log("Product not found");
      }
      const productCompany = String(searchProduct.company);
      const userCompany = String(user.company);
      if (productCompany === userCompany) {
        companyProducts.push({
          product: searchProduct,
          count: products[i].count
        });
        companyProductsCount += products[i].count;
        if (mslProducts.includes(searchProduct.name)) {
          mslProductCount += 1;
        }
      } else {
        nonCompanyProductsCount += products[i].count;
      }
      recognizedProducts.push({
        product: searchProduct,
        count: products[i].count
      });
    }

    const submission = await new Submission({
      image: req.file.secure_url,
      products: recognizedProducts,
      outlet,
      outlet_name: outlet.name,
      outlet_address: outlet.address,
      route_name: outlet.route_name,
      company: user.company,
      company_name: user.company_name,
      user,
      user_name: user.name
    });
    await submission.save();

    for (const companyProduct of companyProducts) {
      const sosRaw = (companyProduct.count / nonCompanyProductsCount) * 100;
      const mslRaw = (mslProductCount / mslTargetCount) * 100;
      let msl;
      let sos;
      if (isFinite(sosRaw)) {
        sos = Math.round(sosRaw);
      } else {
        sos = 0;
      }

      if (isFinite(mslRaw)) {
        msl = Math.round(mslRaw);
      } else {
        msl = 0;
      }
      const shelfExecution = await new ShelfExcecution({
        image: req.file.secure_url,
        product: companyProduct.product._id,
        product_name: companyProduct.product.name,
        msl,
        sos,
        facing: companyProduct.count,
        outlet,
        outlet_name: outlet.name,
        route_name: outlet.route_name,
        territory_name: outlet.territory_name,
        area_name: outlet.area_name,
        region_name: outlet.region_name,
        country_name: outlet.counttry_name,
        company: user.company,
        company_name: user.company_name,
        user: user._id,
        user_name: user.name
      });

      await shelfExecution.save();
      console.log({
        // companyProduct: companyProduct.product,
        // companyProductCount: companyProduct.count,
        // nonCompanyProductsCount: nonCompanyProductsCount,
        mslTargetCount,
        mslProductCount
        // companyProducts
        // products
        // shelfExecution
      });
    }

    // console.log(recognizedProducts);
    // console.log({
    //   companyProducts,
    //   companyProductsCount,
    //   nonCompanyProductsCount
    // });
    // console.log(response.payload, response.payload.length);
    res.status(201).json({ msg: "successful" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ errors: [{ error: "Server Error" }] });
  }
};

// exports.getUserSubmission = async (req, res) => {
//   try {
//     const submissions = await Submission.find({ user: req.params.user_id });

//   } catch (error) {}
// };
