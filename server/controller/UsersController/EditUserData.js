import User from "../../models/Users.js";

export const changeUserName = async (req, res) => {
    try {
        const userId = req.user.userId; 
        const { firstName, lastName } = req.body;

        if (!firstName || !lastName) {
            return res.status(400).json({ error: "First name and last name are required" });
        }

        const [updatedRows] = await User.update(
            { firstName, lastName },
            { where: { userId: userId } }
        );

        if (updatedRows === 0) {
            return res.status(404).json({ error: "User not found or nothing changed" });
        }

        res.status(200).json({ message: "User name updated successfully" });
    } catch (error) {
        console.error("Error updating user name:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
