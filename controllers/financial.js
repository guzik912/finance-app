const User = require('../models/User');
const Financial = require('../models/Financial');

exports.createFinancial = async (req, res) => {
  const { name, value, currency } = req.body;

  try {
    let financial = await Financial.findOne({ name });

    if (financial) {
      return res.status(400).json({ errors: [{msg:'Finance already exists'}] });
    }

    financial = new Financial({
      name,
      value,
      currency,
    });

    await financial.save();

    return res.status(201).json({ msg: 'Finance successfully created' });
  } catch (err) {
    return res.status(500).send('Server error');
  }
};

exports.getFinancials = async (req, res) => {
  try {
    const financials = await Financial.find();

    if (!financials) {
      return res.status(401).json({ errors: [{msg:'No finance exists'}] });
    }

    return res.status(200).json({ financials });
  } catch (err) {
    return res.status(500).send( 'Server error');
  }
};

exports.getFinancial = async (req, res) => {
  const financialId = req.params.id;

  try {
    const financial = await Financial.findById({ _id: financialId });

    if (!financial) {
      return res.status(401).json({ errors: [{msg:'No finance exist'}] });
    }

    return res.status(200).json({ financial });
  } catch (err) {
    return res.status(500).send('Server error');
  }
};

exports.updateFinancials = async (req, res) => {
  const operationTypes = ['+', '-'];
  const minValue = 0.001;
  const maxValue = 0.005;
  let newValue = 0;

  try {
    const financials = await Financial.find();

    if (!financials) {
      return res.status(401).json({ errors: [{msg:'No any finance exist'}] });
    }

    financials.forEach((financial) => {
      const { value } = financial;

      const valueChange = (
        Math.random() * (maxValue - minValue) +
        minValue
      ).toFixed(4);

      const choosenOperationType =
        operationTypes[Math.floor(Math.random() * operationTypes.length)];

      if (choosenOperationType === '+') {
        newValue = (parseFloat(value) + parseFloat(valueChange)).toFixed(4);
      } else {
        newValue = (parseFloat(value) - parseFloat(valueChange)).toFixed(4);
      }

      financial.value = newValue;
      financial.lastChangedValue = valueChange;
      financial.lastOperationType = choosenOperationType;
      financial.save();
    });

    return res
      .status(201)
      .json({ msg: 'Finance value updated', financials });
  } catch (err) {
    return res.status(500).send('Server error');
  }
};


