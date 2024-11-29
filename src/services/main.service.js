// main.service.js

import { findPopularReviews, findLatestReviews } from "../repositories/main.repository.js";
import { mapReviewToDTO } from "../dtos/main.dto.js";

export const getPopularReviews = async (limit) => {
  const reviews = await findPopularReviews(limit);
  return reviews.map(mapReviewToDTO);
};

export const getLatestReviews = async (limit) => {
  const reviews = await findLatestReviews(limit);
  return reviews.map(mapReviewToDTO);
};
