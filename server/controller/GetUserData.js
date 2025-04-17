import User from "../models/Users.js";

export const getAllUserData = async (req, res) => {
    try {
      const users = await User.findAll({
        order: ['user_id'],
      });
  
      return res.status(200).json({
        users: users,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Failed to fetch user data',
        error: error.message
      });
    }
  };

export const getUserData = async (req, res) => { 
    try{
        const userId = parseInt(req.params.user_id)
        const user = await User.findByPk(userId)
           if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
          res.json(user);
   }catch(error){
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
   }
}