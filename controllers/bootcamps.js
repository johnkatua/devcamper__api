const Bootcamp = require('../models/Bootcamp');

// @desc     Get all bootcamps
// @route    GET /api/v1/bootcamps
// @access   Public

exports.getBootcamps = async (req, res, next) => {
  try {
     const bootcamps = await Bootcamp.find();

     if (!bootcamps) {
       return res.status(400).json({ success: false });
     }

     res.status(200).json({ success: true, count: bootcamps.length,  data: bootcamps });
  } catch (err) {
     res.status(400).json({ success: false })
  }

};

// @desc     Get single bootcamps
// @route    GET /api/v1/bootcamps/:id
// @access   Public

exports.getBootcamp = async (req, res, next) => {
  try {
     const bootcamp = await Bootcamp.findById(req.params.id);

     res.status(200).json({ success: true, data: bootcamp })
  } catch (err) {
     res.status(400).json({ success: false })
  }
};

// @desc     Create new bootcamp
// @route    POST /api/v1/bootcamps
// @access   Private

exports.createBootcamp = async(req, res, next) => {
  try {
    let bootcamp = await Bootcamp.create(req.body); 
    console.log(req.body);

    res.status(200).json({
      success: true,
      data: bootcamp
    });
  } catch (err) {
    console.log(err.keyValue)
    if(err.message.includes('duplicate')){
      const errorKeys  = Object.keys(err.keyValue)
      console.log(errorKeys)
      message = `error: ${errorKeys[0]} ${err.keyValue[errorKeys[0]]} already exists`
    }
    res.status(400).json({ success: false, message });
  }


  
};

// @desc     Update bootcamp
// @route    PUT /api/v1/bootcamps/:id
// @access   Private

exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!bootcamp) {
      return res.status(400).json({ success: false })
    }

  res.status(200).json({
    success: true,
    data: bootcamp
  });
} catch (err) {
  res.status(400).json({ success: false })
}
  
};  

// @desc     Delete bootcamp
// @route    DELETE /api/v1/bootcamps/:id
// @access   Private

exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({ success: false })
    }

    res.status(201).json({
      success: true,
      data: bootcamp
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({ success: false })
  }
};