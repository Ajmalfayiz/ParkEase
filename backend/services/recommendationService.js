const Spot = require("../models/spot");

const getRecommendedSpots =
  async (spotId) => {
    const selectedSpot =
      await Spot.findById(spotId);

    if (!selectedSpot) {
      return [];
    }

    const selectedCategories = Array.isArray(selectedSpot.category)
      ? selectedSpot.category
      : [selectedSpot.category];

    const recommendations =
      await Spot.find({
        category: {
          $in: selectedCategories,
        },

        _id: {
          $ne: selectedSpot._id,
        },
      })
        .sort({
          createdAt: -1,
        })
        .limit(4);

    return recommendations;
  };

module.exports = {
  getRecommendedSpots,
};