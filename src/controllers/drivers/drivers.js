import Driver from "../../models/Driver";

const getDrivers = (req, res) => {
  Driver.find({})
    .then((result) => res.status(200).json([...result]))
    .catch((error) => res.status(500).json({ message: error }));
};

export { getDrivers };
