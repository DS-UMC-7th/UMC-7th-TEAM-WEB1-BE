// main.dto.js

export const mapReviewToDTO = (review) => {
   
    const date = new Date(review.created_at);
    const formattedDate = date.toISOString().split('T')[0]; 
  
    return {
      lectureName: review.lecture_name,
      instructorName: review.teacher,
      platform: review.platform,
      rating: review.rating,
      review: review.content,
      date: formattedDate, 
    };
  };
  