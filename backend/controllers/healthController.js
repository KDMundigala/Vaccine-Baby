
// Weight ranges (in kg) for boys and girls, up to 36 months
const weightRanges = {
  male: {
    0: { median: 3.3, sd1: 2.9, sd2: 2.5, sd3: 2.1, negSd1: 3.7, negSd2: 4.1, negSd3: 4.5 },
    6: { median: 7.9, sd1: 6.9, sd2: 5.9, sd3: 4.9, negSd1: 8.9, negSd2: 9.9, negSd3: 10.9 },
    12: { median: 9.6, sd1: 8.4, sd2: 7.2, sd3: 6.0, negSd1: 10.8, negSd2: 12.0, negSd3: 13.2 },
    18: { median: 10.9, sd1: 9.5, sd2: 8.1, sd3: 6.7, negSd1: 12.3, negSd2: 13.7, negSd3: 15.1 },
    24: { median: 12.2, sd1: 10.6, sd2: 9.0, sd3: 7.4, negSd1: 13.8, negSd2: 15.4, negSd3: 17.0 },
    36: { median: 14.6, sd1: 12.7, sd2: 10.8, sd3: 8.9, negSd1: 16.5, negSd2: 18.4, negSd3: 20.3 },
  },
  female: {
    0: { median: 3.2, sd1: 2.8, sd2: 2.4, sd3: 2.0, negSd1: 3.6, negSd2: 4.0, negSd3: 4.4 },
    6: { median: 7.3, sd1: 6.3, sd2: 5.3, sd3: 4.3, negSd1: 8.3, negSd2: 9.3, negSd3: 10.3 },
    12: { median: 9.0, sd1: 7.8, sd2: 6.6, sd3: 5.4, negSd1: 10.2, negSd2: 11.4, negSd3: 12.6 },
    18: { median: 10.2, sd1: 8.8, sd2: 7.4, sd3: 6.0, negSd1: 11.6, negSd2: 13.0, negSd3: 14.4 },
    24: { median: 11.5, sd1: 9.9, sd2: 8.3, sd3: 6.7, negSd1: 13.1, negSd2: 14.7, negSd3: 16.3 },
    36: { median: 13.9, sd1: 11.9, sd2: 9.9, sd3: 7.9, negSd1: 15.9, negSd2: 17.9, negSd3: 19.9 },
  },
};

// Height ranges (in cm) for boys and girls, up to 60 months
const heightRanges = {
  male: {
    0: { median: 50, sd1: 48, sd2: 46, sd3: 44, negSd1: 52, negSd2: 54, negSd3: 56 },
    12: { median: 76, sd1: 73, sd2: 70, sd3: 67, negSd1: 79, negSd2: 82, negSd3: 85 },
    24: { median: 87, sd1: 84, sd2: 81, sd3: 78, negSd1: 90, negSd2: 93, negSd3: 96 },
    36: { median: 96, sd1: 92, sd2: 88, sd3: 84, negSd1: 100, negSd2: 104, negSd3: 108 },
    48: { median: 104, sd1: 100, sd2: 96, sd3: 92, negSd1: 108, negSd2: 112, negSd3: 116 },
    60: { median: 110, sd1: 105, sd2: 100, sd3: 95, negSd1: 115, negSd2: 120, negSd3: 125 },
  },
  female: {
    0: { median: 49, sd1: 47, sd2: 45, sd3: 43, negSd1: 51, negSd2: 53, negSd3: 55 },
    12: { median: 74, sd1: 71, sd2: 68, sd3: 65, negSd1: 77, negSd2: 80, negSd3: 83 },
    24: { median: 86, sd1: 83, sd2: 80, sd3: 77, negSd1: 89, negSd2: 92, negSd3: 95 },
    36: { median: 95, sd1: 91, sd2: 87, sd3: 83, negSd1: 99, negSd2: 103, negSd3: 107 },
    48: { median: 103, sd1: 99, sd2: 95, sd3: 91, negSd1: 107, negSd2: 111, negSd3: 115 },
    60: { median: 109, sd1: 104, sd2: 99, sd3: 94, negSd1: 114, negSd2: 119, negSd3: 124 },
  },
};

// Linear interpolation between two ages
function interpolate(value1, value2, fraction) {
  return value1 + (value2 - value1) * fraction;
}

// Get weight range for a given age
function getWeightRange(gender, age) {
  const ages = [0, 6, 12, 18, 24, 36];
  let lowerAge, upperAge;

  for (let i = 0; i < ages.length - 1; i++) {
    if (age >= ages[i] && age <= ages[i + 1]) {
      lowerAge = ages[i];
      upperAge = ages[i + 1];
      break;
    }
  }

  const fraction = (age - lowerAge) / (upperAge - lowerAge);
  const ranges = weightRanges[gender];

  return {
    median: interpolate(ranges[lowerAge].median, ranges[upperAge].median, fraction),
    sd1: interpolate(ranges[lowerAge].sd1, ranges[upperAge].sd1, fraction),
    sd2: interpolate(ranges[lowerAge].sd2, ranges[upperAge].sd2, fraction),
    sd3: interpolate(ranges[lowerAge].sd3, ranges[upperAge].sd3, fraction),
    negSd1: interpolate(ranges[lowerAge].negSd1, ranges[upperAge].negSd1, fraction),
    negSd2: interpolate(ranges[lowerAge].negSd2, ranges[upperAge].negSd2, fraction),
    negSd3: interpolate(ranges[lowerAge].negSd3, ranges[upperAge].negSd3, fraction),
  };
}

// Get height range for a given age
function getHeightRange(gender, age) {
  const ages = [0, 12, 24, 36, 48, 60];
  let lowerAge, upperAge;

  for (let i = 0; i < ages.length - 1; i++) {
    if (age >= ages[i] && age <= ages[i + 1]) {
      lowerAge = ages[i];
      upperAge = ages[i + 1];
      break;
    }
  }

  const fraction = (age - lowerAge) / (upperAge - lowerAge);
  const ranges = heightRanges[gender];

  return {
    median: interpolate(ranges[lowerAge].median, ranges[upperAge].median, fraction),
    sd1: interpolate(ranges[lowerAge].sd1, ranges[upperAge].sd1, fraction),
    sd2: interpolate(ranges[lowerAge].sd2, ranges[upperAge].sd2, fraction),
    sd3: interpolate(ranges[lowerAge].sd3, ranges[upperAge].sd3, fraction),
    negSd1: interpolate(ranges[lowerAge].negSd1, ranges[upperAge].negSd1, fraction),
    negSd2: interpolate(ranges[lowerAge].negSd2, ranges[upperAge].negSd2, fraction),
    negSd3: interpolate(ranges[lowerAge].negSd3, ranges[upperAge].negSd3, fraction),
  };
}

// @desc    Calculate weight status
// @route   POST /api/health/weight
// @access  Public
const calculateWeightStatus = (req, res) => {
  const { gender, age, weight } = req.body;

  if (!gender || !age || !weight) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (age < 0 || age > 36) {
    return res.status(400).json({ error: 'Age must be between 0 and 36 months' });
  }

  if (weight <= 0) {
    return res.status(400).json({ error: 'Weight must be greater than 0' });
  }

  const range = getWeightRange(gender, age);

  let status;
  let percentile;

  if (weight < range.sd3) {
    status = 'Severe Deficiency';
    percentile = 3;
  } else if (weight < range.sd2) {
    status = 'Deficiency';
    percentile = 10;
  } else if (weight < range.sd1) {
    status = 'Risk of Deficiency';
    percentile = 25;
  } else if (weight <= range.negSd1) {
    status = 'Normal Weight';
    percentile = 50;
  } else if (weight <= range.negSd2) {
    status = 'Overweight';
    percentile = 85;
  } else {
    status = 'Obese';
    percentile = 97;
  }

  res.json({ 
    status, 
    percentile,
    bmi: Math.round((weight / (range.median * range.median)) * 10) / 10
  });
};

// @desc    Calculate height status
// @route   POST /api/health/height
// @access  Public
const calculateHeightStatus = (req, res) => {
  const { gender, age, height } = req.body;

  if (!gender || !age || !height) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (age < 0 || age > 60) {
    return res.status(400).json({ error: 'Age must be between 0 and 60 months' });
  }

  if (height <= 0) {
    return res.status(400).json({ error: 'Height must be greater than 0' });
  }

  const range = getHeightRange(gender, age);

  let status;
  let percentile;

  if (height < range.sd3) {
    status = 'Severe Shortness';
    percentile = 3;
  } else if (height < range.sd2) {
    status = 'Shortness';
    percentile = 10;
  } else if (height < range.sd1) {
    status = 'At Risk of Becoming Short';
    percentile = 25;
  } else if (height <= range.negSd1) {
    status = 'Normal Height';
    percentile = 50;
  } else {
    status = 'Tall';
    percentile = 97;
  }

  res.json({ status, percentile });
};

// @desc    Calculate comprehensive health status
// @route   POST /api/health/calculate
// @access  Public
const calculateHealthStatus = (req, res) => {
  const { gender, ageMonths, weight, height } = req.body;

  if (!gender || !ageMonths || !weight || !height) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Validate age ranges
  if (ageMonths < 0 || ageMonths > 60) {
    return res.status(400).json({ error: 'Age must be between 0 and 60 months' });
  }

  // Get weight status
  const weightRange = getWeightRange(gender, ageMonths);
  let weightStatus;
  let weightPercentile;

  if (weight < weightRange.sd3) {
    weightStatus = 'Severe Deficiency';
    weightPercentile = 3;
  } else if (weight < weightRange.sd2) {
    weightStatus = 'Deficiency';
    weightPercentile = 10;
  } else if (weight < weightRange.sd1) {
    weightStatus = 'Risk of Deficiency';
    weightPercentile = 25;
  } else if (weight <= weightRange.negSd1) {
    weightStatus = 'Normal Weight';
    weightPercentile = 50;
  } else if (weight <= weightRange.negSd2) {
    weightStatus = 'Overweight';
    weightPercentile = 85;
  } else {
    weightStatus = 'Obese';
    weightPercentile = 97;
  }

  // Get height status
  const heightRange = getHeightRange(gender, ageMonths);
  let heightStatus;
  let heightPercentile;

  if (height < heightRange.sd3) {
    heightStatus = 'Severe Shortness';
    heightPercentile = 3;
  } else if (height < heightRange.sd2) {
    heightStatus = 'Shortness';
    heightPercentile = 10;
  } else if (height < heightRange.sd1) {
    heightStatus = 'At Risk of Becoming Short';
    heightPercentile = 25;
  } else if (height <= heightRange.negSd1) {
    heightStatus = 'Normal Height';
    heightPercentile = 50;
  } else {
    heightStatus = 'Tall';
    heightPercentile = 97;
  }

  // Calculate BMI (if height is in cm, convert to m)
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  res.json({
    weightStatus,
    heightStatus,
    bmi: parseFloat(bmi.toFixed(1)),
    weightPercentile,
    heightPercentile
  });
};

module.exports = {
  calculateWeightStatus,
  calculateHeightStatus,
  calculateHealthStatus
};
