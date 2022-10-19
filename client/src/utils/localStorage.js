export const saveUserId = (userId) => {
  localStorage.setItem("saved_user_id", JSON.stringify(userId));
};

export const getSavedUserId = () => {
  const savedUserId = localStorage.getItem("saved_user_id")
    ? JSON.parse(localStorage.getItem("saved_user_id"))
    : "";

  return savedUserId;
};

export const removeUserId = () => {
  localStorage.clear();

  return true;
};
