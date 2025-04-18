import User from "../models/Users.js";

export const getAllUsers = async (req, res) => {
  try {
      const users = await User.findAll({
          attributes: { exclude: ['password_hash'] } 
      });

      if (!users || users.length === 0) {
          return res.status(404).json({ error: 'No users found' });
      }

      res.json(users);
  } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ message: "Internal server error" });
  }
}

export const getUserData = async (req, res) => { 
  try {
      const userId = req.user.userId;
      const user = await User.findByPk(userId);

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      const userData = user.toJSON(); 
      delete userData.password_hash;

      res.json(userData);
  } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};
