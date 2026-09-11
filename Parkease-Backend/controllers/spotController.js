const Spot = require("../models/spot");

const getspots = async (req, res, next) => {
  try {
    const {
      search,
      category,
      sort,
    } = req.query;

    const filter = {};

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      filter.category = {
        $regex: category,
        $options: "i",
      };
    }

    let query = Spot.find(filter);

    if (sort) {
      query = query.sort(sort);
    }

    const spots = await query;

    res.status(200).json({
      count: spots.length,
      spots,
    });
  } catch (error) {
    next(error);
  }
};

const getspotById = async (req, res, next) => {
  try {
    const spot = await Spot.findById(
      req.params.id
    );

    if (!spot) {
      return res.status(404).json({
        message: "spot not found",
      });
    }

    res.status(200).json({
      spot,
    });
  } catch (error) {
    next(error);
  }
};

const createspot = async (req, res, next) => {
  try {
    const {
      name,
      location,
      description,
      price,
      category,
      stock,
      image,
      latitude,
      longitude,
      hasEv,
      isCovered,
    } = req.body;

    if (
      !name ||
      !location ||
      price === undefined ||
      !Array.isArray(category) ||
      category.length === 0 ||
      stock === undefined
    ) {
      return res.status(400).json({
        message:
          "Name, location, price, category and stock are required",
      });
    }

    const spot = await Spot.create({
      name,
      location,
      description,
      price,
      category,
      stock,
      image,
      latitude: latitude !== undefined && latitude !== null ? Number(latitude) : null,
      longitude: longitude !== undefined && longitude !== null ? Number(longitude) : null,
      hasEv: Boolean(hasEv),
      isCovered: Boolean(isCovered),
    });

    res.status(201).json({
      message: "spot created successfully",
      spot,
    });
  } catch (error) {
    next(error);
  }
};

const updatespot = async (req, res, next) => {
  try {
    const spot = await Spot.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!spot) {
      return res.status(404).json({
        message: "spot not found",
      });
    }

    res.status(200).json({
      message: "spot updated successfully",
      spot,
    });
  } catch (error) {
    next(error);
  }
};

const deletespot = async (req, res, next) => {
  try {
    const spot = await Spot.findByIdAndDelete(
      req.params.id
    );

    if (!spot) {
      return res.status(404).json({
        message: "spot not found",
      });
    }

    res.status(200).json({
      message: "spot deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getspots,
  getspotById,
  createspot,
  updatespot,
  deletespot,
};