const User = require('../models/User');
const Financial = require('../models/Financial');
const Credit = require('../models/Credit');

exports.buyFinancial = async (req, res) => {
  const financialId = req.params.id;
  const { investmentMoney } = req.body;
  try {
    const financial = await Financial.findById({ _id: financialId });
    if (!financial) {
      return res.status(401).json({ errors: 'No financial exist' });
    }
    const user = await User.findById({ _id: req.user.id });
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
    const user = await await User.findById({ _id: req.user.id });

    if (!user) {
      return res.status(401).json({ errors: 'No users exist' });
    }

    const newInvestment = {
      value: investmentMoney.toString(),
      boughtWithCurrentValue: financial.value,
    };

    const currentFinancial = user.financials.find(
      (financial) => financial.financial == financialId
    );

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

    const currentFinancial = user.financials.find(
      (financial) => financial.financial == financialId
    );
    console.log(currentFinancial);

    if (!currentFinancial) {
      return res.status(401).json({ errors: 'No financial exist' });
    }

    currentFinancial.investment.forEach((el, index) => {
      el.profit = updatedFinancialProfit[index].profit;
      el.waste = updatedFinancialProfit[index].waste;
    });

    await user.save();
    return res.status(200).json({ msg: 'Financials calculated successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: 'Server error' });
  }
};

exports.applyForCredit = async (req, res) => {
  const creditId = req.params.id;
  const { loan, term } = req.body;
  try {
    const user = await User.findById({ _id: req.user.id });

    if (!user) {
      return res.status(401).json({ errors: 'No users exist' });
    }

    user.creditProposal = {
      creditId,
      loan,
      term,
      status: 'pending',
    };

    await user.save();
    return res.status(201).json({ msg: 'You successfully aplied for credit' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: 'Server error' });
  }
};

exports.payOffCredit = async (req, res) => {
  const creditId = req.params.id;
  try {
    const user = await User.findById({ _id: req.user.id });
    if (!user) {
      return res.status(401).json({ errors: 'No user exist' });
    }

    const credit = await Credit.findById({ _id: creditId });
    if (!credit) {
      return res.status(401).json({ errors: 'No credit exist' });
    }

    console.log(credit);
    const creditIndexToRemove = user.credits.findIndex(
      (credit) => credit.credit == creditId
    );

    user.creditsHistory.push({
      credit: credit._id,
      loan: user.credits[creditIndexToRemove].loan,
      term: user.credits[creditIndexToRemove].term,
      repayment: user.credits[creditIndexToRemove].repayment,
    });

    user.credits.splice(creditIndexToRemove, 1);

    await user.save();

    return res.status(200).json({ msg: 'Credit successfully paid off' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: 'Server error' });
  }
};

exports.updateWallet = async (req, res) => {
  const { value, operation } = req.body;

  try {
    const user = await User.findById({ _id: req.user.id });
    if (!user) {
      return res.status(401).json({ errors: 'No user exist' });
    }

    if (operation === 'payIn') {
      user.wallet.totalMoney += value;
    } else {
      user.wallet.totalMoney -= value;
    }

    await user.save();
    return res.status(201).json({ msg: 'Wallet updated' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: 'Server error' });
  }
};

exports.payInCash = async (req, res) => {
  const { value } = req.body;

  try {
    const user = await User.findById({ _id: req.user.id });
    if (!user) {
      return res.status(401).json({ errors: 'No user exist' });
    }

    user.wallet.totalMoney += value;

    await user.save();
    return res.status(201).json({ msg: 'Money pay in successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: 'Server error' });
  }
};

exports.payOutCash = async (req, res) => {
  const { value } = req.body;

  try {
    const user = await User.findById({ _id: req.user.id });
    if (!user) {
      return res.status(401).json({ errors: 'No user exist' });
    }

    user.wallet.totalMoney -= value;

    await user.save();
    return res.status(201).json({ msg: 'Money pay out successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: 'Server error' });
  }
};



exports.setPersonalData = async (req, res) => {
  const { firstName, lastName, phoneNumber, address: { country, city, street }} = req.body;

  try {
    const user = await User.findById({ _id: req.user.id });
    if(!user) {
      return res.status(401).json({ errors: 'No user exist' });
    }

    user.personalData = {
      firstName,
      lastName,
      email: user.email,
      phoneNumber,
      address: {
        country,
        city,
        street
      }
    }

    await user.save();

    return res.status(201).json({ msg: 'Personal data successfully setted' });
  } catch(err) {
    return res.status(500).json({ errors: 'Server error'});
  }
}