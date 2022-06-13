import Order from "../../models/Order";

const validateProductsCustomers = async (products, customer) => {
  const productsExist = Array.isArray(products) ? products.length : 0;

  if (!productsExist) {
    return res.status(400).json({
      message: "Order items are required!",
    });
  }

  if (!customer.name || !customer.phone || !customer.address) {
    return res.status(400).json({
      message: "Please provide all user details!",
    });
  }
};

const createOrder = async (req, res) => {
  const { products, total, customer } = req.body;

  validateProductsCustomers(products, customer);

  const order = {
    products,
    total,
    customer,
    created_at: new Date(),
    status: "pending",
    events: [
      {
        timestamp: new Date(),
        eventType: "Order Created",
        eventMessage: "Order created successfully",
        driverDetails: {},
        location: "",
      },
    ],
  };

  Order.create(order)
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ message: error }));
};

const getOrders = (req, res) => {
  Order.find({})
    .then((result) => res.status(200).json([...result]))
    .catch((error) => res.status(500).json({ message: error }));
};

const getOrder = async (req, res) => {
  Order.findOne({ _id: req.params.id })
    .then((result) => res.status(200).json({ result }))
    .catch(() =>
      res
        .status(404)
        .json({ message: "Order with associated order number doesn't exist!" })
    );
};

const updateOrder = async (req, res) => {
  const { type, payload, orderNumber } = req.body;

  if (type === "ORDER_EDIT") {
    validateProductsCustomers(payload.products, payload.customer);
  }

  const exists = await Order.find({ _id: orderNumber });

  if (!exists) {
    return res
      .status(404)
      .json({ message: "Order with associated order number doesn't exist!" });
  }

  let order = exists[0];

  let events = order?.events || [];
  const updateObj = {};

  const statusTypes = {
    ASSIGNED: "dispatched",
    DELIVERED: "delivered",
    CANCELLED: "cancelled",
    UPDATE: order.status,
  };

  events.push({
    ...payload.event,
    timestamp: new Date(),
    ...((type !== "ORDER_EDIT") &
      {
        location: payload?.location || "",
        driverName: payload?.driver?.name || "",
        car: payload?.driver?.car_identity || "",
      }),
  });

  updateObj.events = [...events];

  if (type !== "ORDER_EDIT") {
    updateObj.status = statusTypes[type];
    updateObj.driver = payload?.driver;
    updateObj.location = payload?.location;
  } else {
    updateObj.products = payload.products;
    updateObj.customer = payload.customer;
    updateObj.total = payload.total;
  }

  Order.updateOne(
    { _id: req.params.id },
    {
      $set: {
        ...updateObj,
      },
    },
    { new: true, runValidators: true }
  )
    .then((result) => res.status(200).json({ result, orderNumber }))
    .catch((error) => res.status(404).json({ message: "Order not found!" }));
};

export { getOrders, getOrder, createOrder, updateOrder };
