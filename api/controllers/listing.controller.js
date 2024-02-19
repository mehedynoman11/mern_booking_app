import Listing from "../models/listing.model.js"
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}

export const deleteListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return next(errorHandler(404, 'Listing not found!'));
        }

        if (req.user.id !== listing.userRef.toString()) {
            return next(errorHandler(409, 'This listing does not belong to you!'));
        }

        await Listing.findByIdAndDelete(req.params.id);
        
        res.status(200).json({ message: 'Listing has been deleted successfully!' });
    } catch (error) {
        next(error);
    }
}
