// Upon log in or sign up, save current user's id to local storage
export const saveUserId = (userId) => {
  localStorage.setItem("saved_user_id", JSON.stringify(userId));
};

// Retrieve current user's id from local storage
export const getSavedUserId = () => {
  const savedUserId = localStorage.getItem("saved_user_id")
    ? JSON.parse(localStorage.getItem("saved_user_id"))
    : "";

  return savedUserId;
};
