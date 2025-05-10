const Baby = require('../models/Baby');

// Create a new baby
exports.createBaby = async (req, res) => {
  try {
    // Extract baby, guardian, and notificationMethod from request body
    const { baby, guardian, notificationMethod } = req.body;

    // Basic presence checks
    if (!baby) {
      return res.status(400).json({ success: false, error: 'Baby data is required' });
    }
    if (!guardian) {
      return res.status(400).json({ success: false, error: 'Guardian data is required' });
    }
    if (!notificationMethod) {
      return res.status(400).json({ success: false, error: 'Notification method is required' });
    }

    // Destructure baby fields
    const { name, hometown, weight, gender, dateOfBirth, profilePicture } = baby;
    // Destructure guardian fields
    const { name: guardianName, email, phone } = guardian;

    // Validate required baby fields
    const requiredBabyFields = ['name', 'hometown', 'weight', 'gender', 'dateOfBirth'];
    const missingBaby = requiredBabyFields.filter(field => !baby[field]);
    if (missingBaby.length > 0) {
      return res.status(400).json({ success: false, error: `Missing required fields: ${missingBaby.join(', ')}` });
    }

    // Validate guardian sub-fields
    const requiredGuardianFields = ['name', 'email', 'phone'];
    const missingGuardian = requiredGuardianFields.filter(field => !guardian[field]);
    if (missingGuardian.length > 0) {
      return res.status(400).json({ success: false, error: `Missing guardian fields: ${missingGuardian.join(', ')}` });
    }

    // Validate date format
    const dob = new Date(dateOfBirth);
    if (isNaN(dob.getTime())) {
      return res.status(400).json({ success: false, error: 'Invalid date format' });
    }

    // Create and save baby with guardian & notificationMethod
    const newBaby = new Baby({
      name: name.trim(),
      hometown: hometown.trim(),
      weight: Number(weight),
      gender,
      dateOfBirth: dob,
      profilePicture,
      guardian: {
        name: guardianName.trim(),
        email: email.trim(),
        phone: phone.trim()
      },
      notificationMethod,
      userId: req.user._id
    });

    await newBaby.save();
    res.status(201).json({ success: true, data: newBaby });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all babies for a user
exports.getBabies = async (req, res) => {
  try {
    const babies = await Baby.find({ userId: req.user._id });
    res.status(200).json({ success: true, data: babies });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get a single baby
exports.getBaby = async (req, res) => {
  try {
    const baby = await Baby.findOne({ _id: req.params.id, userId: req.user._id });
    if (!baby) {
      return res.status(404).json({ success: false, error: 'Baby not found' });
    }
    res.status(200).json({ success: true, data: baby });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update a baby
exports.updateBaby = async (req, res) => {
  try {
    const { name, hometown, weight, gender, dateOfBirth, profilePicture, guardian, notificationMethod } = req.body;

    // Validate guardian if provided
    if (guardian) {
      const requiredGuardianFields = ['name', 'email', 'phone'];
      const missingGuardian = requiredGuardianFields.filter(field => !guardian[field]);
      if (missingGuardian.length > 0) {
        return res.status(400).json({ success: false, error: `Missing guardian fields: ${missingGuardian.join(', ')}` });
      }
    }

    const updateData = {
      name,
      hometown,
      weight,
      gender,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      profilePicture,
      ...(guardian && { guardian }),
      ...(notificationMethod && { notificationMethod })
    };

    const baby = await Baby.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!baby) {
      return res.status(404).json({ success: false, error: 'Baby not found' });
    }

    res.status(200).json({ success: true, data: baby });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete a baby
exports.deleteBaby = async (req, res) => {
  try {
    const baby = await Baby.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!baby) {
      return res.status(404).json({ success: false, error: 'Baby not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
