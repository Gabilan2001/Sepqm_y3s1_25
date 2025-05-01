// // controllers/offerController.js
// import Offer from '../models/Offer.js';

// // @desc    Get all offers
// // @route   GET /api/offers
// // @access  Public
// const getOffers = async (req, res) => {
//   try {
//     const offers = await Offer.find({ isActive: true });
//     res.json(offers);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// // @desc    Create new offer
// // @route   POST /api/offers
// // @access  Private/Admin
// const createOffer = async (req, res) => {
//   try {
//     const { title, description, discount, validUntil, imageUrl } = req.body;

//     const offer = new Offer({
//       title,
//       description,
//       discount,
//       validUntil,
//       imageUrl,
//     });

//     const createdOffer = await offer.save();
//     res.status(201).json(createdOffer);
//   } catch (error) {
//     res.status(400).json({ message: 'Invalid offer data' });
//   }
// };

// // @desc    Update offer
// // @route   PUT /api/offers/:id
// // @access  Private/Admin
// const updateOffer = async (req, res) => {
//   try {
//     const { title, description, discount, validUntil, imageUrl, isActive } = req.body;

//     const offer = await Offer.findById(req.params.id);

//     if (offer) {
//       offer.title = title || offer.title;
//       offer.description = description || offer.description;
//       offer.discount = discount || offer.discount;
//       offer.validUntil = validUntil || offer.validUntil;
//       offer.imageUrl = imageUrl || offer.imageUrl;
//       offer.isActive = isActive !== undefined ? isActive : offer.isActive;

//       const updatedOffer = await offer.save();
//       res.json(updatedOffer);
//     } else {
//       res.status(404).json({ message: 'Offer not found' });
//     }
//   } catch (error) {
//     res.status(400).json({ message: 'Invalid offer data' });
//   }
// };

// // @desc    Delete offer
// // @route   DELETE /api/offers/:id
// // @access  Private/Admin
// const deleteOffer = async (req, res) => {
//   try {
//     const offer = await Offer.findById(req.params.id);

//     if (offer) {
//       await offer.remove();
//       res.json({ message: 'Offer removed' });
//     } else {
//       res.status(404).json({ message: 'Offer not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// export { getOffers, createOffer, updateOffer, deleteOffer };

import Offer from '../models/Offer.js';

export const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find({ isActive: true });
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createOffer = async (req, res) => {
  try {
    const { title, description, discount, validUntil, imageUrl } = req.body;

    const offer = new Offer({
      title,
      description,
      discount,
      validUntil,
      imageUrl,
    });

    const createdOffer = await offer.save();
    res.status(201).json(createdOffer);
  } catch (error) {
    res.status(400).json({ message: 'Invalid offer data' });
  }
};

export const updateOffer = async (req, res) => {
  try {
    const { title, description, discount, validUntil, imageUrl, isActive } = req.body;

    const offer = await Offer.findById(req.params.id);

    if (offer) {
      offer.title = title || offer.title;
      offer.description = description || offer.description;
      offer.discount = discount || offer.discount;
      offer.validUntil = validUntil || offer.validUntil;
      offer.imageUrl = imageUrl || offer.imageUrl;
      offer.isActive = isActive !== undefined ? isActive : offer.isActive;

      const updatedOffer = await offer.save();
      res.json(updatedOffer);
    } else {
      res.status(404).json({ message: 'Offer not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid offer data' });
  }
};

export const deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (offer) {
      await offer.remove();
      res.json({ message: 'Offer removed' });
    } else {
      res.status(404).json({ message: 'Offer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};