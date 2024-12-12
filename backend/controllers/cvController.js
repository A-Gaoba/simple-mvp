const CV = require('../models/CV');

exports.createCV = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const cv = new CV({
      user: req.user.id,
      title,
      content,
    });

    await cv.save();
    res.status(201).json({ message: 'CV created successfully', cv });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.fetchCVs = async (req, res) => {
  try {
    const cvs = await CV.find({ user: req.user.id }).select('-content');
    res.json(cvs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.fetchCV = async (req, res) => {
  try {
    const cv = await CV.findOne({ _id: req.params.id, user: req.user.id });
    if (!cv) return res.status(404).json({ message: 'CV not found' });
    res.json(cv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateCV = async (req, res) => {
  try {
    const { title, content } = req.body;
    const cv = await CV.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, content, updatedAt: Date.now() },
      { new: true }
    );

    if (!cv) return res.status(404).json({ message: 'CV not found' });
    res.json(cv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteCV = async (req, res) => {
  try {
    const cv = await CV.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!cv) return res.status(404).json({ message: 'CV not found' });
    res.json({ message: 'CV deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};