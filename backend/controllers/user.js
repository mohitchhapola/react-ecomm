const User = require("../models/user")

const fetchUserById = async(req,res)=>{
    const { email } = req.query;  // Destructure the id from req.params
    // res.send(`User ID: ${users}`);
    try {
        const user = await User.findOne({email:email})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(error)
    } 
}


// Update user details (including addresses)
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body; // Expect an `address` object in the request body

  if (!data) {
    return res.status(400).json({ message: 'Address data is required' });
  }

  try {
    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the address to the user's addresses array
    user.addresses.push(address);

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Address added successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};






module.exports ={
    fetchUserById,
    updateUser
}