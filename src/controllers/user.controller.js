const prisma = require('../prisma');

exports.getUsers  = async (req, res) => {
  try {
    //
    const users = await prisma.room.findMany();

    res.json({
      status: 'success',
      message: 'Rooms retrieved successfully',
      data: users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to fetch users' },
    });
  }
};

exports.getUserById = async (req, res) => {
  const roomId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid user id',
    });
  }

  try {
    const user = await prisma.room.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'user not found',
      });
    }

    res.json({
      status: 'success',
      message: 'User retrieved successfully',
      data: user,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to fetch user' },
    });
  }
};

exports.createUser = async (req, res) => {
  const { name, building, capacity } = req.body;

  if (!name || typeof capacity !== 'number') {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid request body',
      error: {
        detail: 'name is required and capacity must be a number',
      },
    });
  }

try {
    const newRoom = await prisma.room.create({
      data: {
        name,
        building: building || null,
        capacity,
      },
    });
    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: newRoom,
    });
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to create user' },
    });
  }
};

    exports.updateUser  = async (req, res) => {
  const roomId = parseInt(req.params.id, 10);
  const { name, building, capacity, isActive } = req.body;

  if (isNaN(roomId)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid user id',
    });
  }

  if (!name || typeof capacity !== 'number') {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid request body',
      error: {
        detail: 'name is required and capacity must be a number',
      },
    });
  }

  try {
    const updatedRoom = await prisma.room.update({
      where: { id: userId },
      data: {
        name,
        building: building ?? null,
        capacity,
        isActive: typeof isActive === 'boolean' ? isActive : undefined,
      },
    });

    res.json({
      status: 'success',
      message: 'User updated successfully',
      data: updatedRoom,
    });
  } catch (error) {
    console.error('Error updating user:', error);

    // Prisma error: record not found
    if (error.code === 'P2025') {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to update room' },
    });
  }
};

exports.deleteUser = async (req, res) => {
  const roomId = parseInt(req.params.id, 10);

  if (isNaN(roomId)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid room id',
    });
  }

  try {
    const deletedRoom = await prisma.room.delete({
      where: { id: userId },
    });

    res.json({
      status: 'success',
      message: 'User deleted successfully',
      data: deletedUser,
    });
  } catch (error) {
    console.error('Error deleting user:', error);

    if (error.code === 'P2025') {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to delete user' },
    });
  }
};