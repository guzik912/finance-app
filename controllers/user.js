const User = require('../models/User');
const Financial = require('../models/Financial');

exports.buyFinancial = async (req, res) => {
  const financialId = req.params.id;
  const { investmentMoney } = req.body;
  try {
    const financial = await Financial.findById({ _id: financialId });
    if (!financial) {
      return res.status(401).json({ errors: 'No financial exist' });
    }
    const user = await User.findById({ _id: req.user.id });
    console.log(user);
    if (!user) {
      return res.status(401).json({ errors: 'No users exist' });
    }

    const boughtFinancial = {
      financial: financial._id,
      investment: [
        {
          value: investmentMoney.toString(),
          boughtWithCurrentValue: financial.value,
        },
      ],
    };

    user.financials.push(boughtFinancial);

    await user.save();

    return res.status(201).json({ msg: 'Financials successfully bought ' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: 'Server error' });
  }
};

exports.rebuyFinancial = async (req, res) => {
  const financialId = req.params.id;
  const { investmentMoney } = req.body;
  try {
    const financial = await Financial.findById({ _id: financialId });
    if (!financial) {
      return res.status(401).json({ errors: 'No financial exist' });
    }
    const user = await (await User.findById({ _id: req.user.id }));

    if (!user) {
      return res.status(401).json({ errors: 'No users exist' });
    }

    const newInvestment = {
      value: investmentMoney.toString(),
      boughtWithCurrentValue: financial.value,
    };

    const currentFinancial = user.financials.find((financial) => financial.financial == financialId);

    if (currentFinancial) {
      currentFinancial.investment.push(newInvestment);
    }

    await user.save();

    return res.status(201).json({ msg: 'Financials successfully bought ' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: 'Server error' });
  }
};

exports.sellFinancial = async (req, res) => {
  const financialId = req.params.id;
  try {
    const user = await User.findById({ _id: req.user.id });

    if (!user) {
      return res.status(401).json({ errors: 'No users exist' });
    }

    const financial = await Financial.findById({ _id: financialId });

    if (!financial) {
      return res.status(401).json({ errors: 'No financial exist' });
    }

    const financialIndexToRemove = user.financials.findIndex(
      (financial) => financial.financial == financialId
    );

    user.financialsHistory.push({
      financial: financial._id,
      investment: user.financials[financialIndexToRemove].investment,
    });
    user.financials.splice(financialIndexToRemove, 1);

    await user.save();

    return res.status(200).json({ msg: 'Financial successfully sold' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: 'Server error' });
  }
};

exports.calcFinancialProfit = async (req, res) => {
  const financialId = req.params.id;
  const updatedFinancialProfit = req.body.updatedFinancialProfit;

  try {
    const user = await User.findById({ _id: req.user.id });

    if (!user) {
      return res.status(401).json({ errors: 'No users exist' });
    }
    
    const currentFinancial = user.financials.find(financial => financial.financial == financialId);
    console.log(currentFinancial)

    if(!currentFinancial) {
      return res.status(401).json({ errors: 'No financial exist'});
    }
    
    currentFinancial.investment.forEach((el, index) => {
      el.profit = updatedFinancialProfit[index].profit;
      el.waste = updatedFinancialProfit[index].waste;
    })
    
    await user.save();
    return res.status(200).json({ msg: 'Financials calculated successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: 'Server error' });
  }
};
