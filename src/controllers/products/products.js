import Product from "../../models/Product";

const getProducts = (req, res) => {
  Product.find({})
    .then((result) => res.status(200).json([...result]))
    .catch((error) => res.status(500).json({ msg: error }));
};

const getProduct = async (req, res) => {
  Product.findOne({ _id: req.params.id })
    .then((result) => res.status(200).json({ result }))
    .catch(() => res.status(404).json({ error: "Product not found" }));
};

const updateProduct = async (req, res) => {
  const { name, price, quantity, image } = req.body;
  const product = {
    name,
    price,
    quantity,
    image,
  };

  const exists = await Product.find({ _id: req.params.id });

  if (!exists) {
    return res
      .status(404)
      .json({ message: "Product with associated id doesn't exist!" });
  }

  Product.updateOne(
    { _id: req.params.id },
    {
      $set: product,
    },
    { new: true }
  )
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({ error: "Product not found" }));
};

const createProduct = async (req, res) => {
  const { name, price, quantity, image } = req.body;

  if (!name || !price || !quantity || !image) {
    return res.status(400).json({
      message: "Please enter all fields(name, price, quantity, image)",
    });
  }

  const product = {
    name,
    price,
    quantity,
    image,
  };

  const exists = await Product.find({ name });

  if (exists.length > 0) {
    return res
      .status(400)
      .json({ message: "Product already exists! Try editing instead" });
  }

  Product.create(product)
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
};

export { getProducts, getProduct, createProduct, updateProduct };
