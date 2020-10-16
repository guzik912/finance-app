const User = require('../models/User');
const Financial = require('../models/Financial');
const Credit = require('../models/Credit');

exports.buyFinancial = async (req, res) => {
  const financialId = req.params.id;
  const { investmentMoney } = req.body;
  try {
    const financial = await Financial.findById({ _id: financialId });
    if (!financial) {
      return res.status(401).json({ errors: [{msg:'No finance exists'}]});
    }
    const user = await User.findById({ _id: req.user.id });
    if (!user) {
      return res.status(401).json({ errors: [{msg:'No users exists'}]});
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

    return res.status(201).json({ msg: 'Finance successfully bought ' });
  } catch (err) {
    return res.status(500).send('Server error');
  }
};

exports.rebuyFinancial = async (req, res) => {
  const financialId = req.params.id;
  const { investmentMoney } = req.body;
  try {
    const financial = await Financial.findById({ _id: financialId });
    if (!financial) {
      return res.status(401).json({ errors: [{msg:'No finance exists'}]});
    }
    const user = await await User.findById({ _id: req.user.id });

    if (!user) {
      return res.status(401).json({ errors: [{msg:'No users exists'}] });
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

    return res.status(201).json({ msg: 'Finance successfully bought' });
  } catch (err) {
    return res.status(500).send('Server error');
  }
};

exports.sellFinancial = async (req, res) => {
  const financialId = req.params.id;
  try {
    const user = await User.findById({ _id: req.user.id });

    if (!user) {
      return res.status(401).json({ errors: [{msg:'No users exist'}]});
    }

    const financial = await Financial.findById({ _id: financialId });

    if (!financial) {
      return res.status(401).json({ errors: [{msg:'No finance exists'}]});
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

    return res.status(200).json({ msg: 'Finance successfully sold' });
  } catch (err) {
    return res.status(500).send('Server error');
  }
};

exports.calcFinancialInvestments = async (req, res) => {
  const financialId = req.params.id;
  const updatedFinancialProfit = req.body.updatedFinancialProfit;

  try {
    const user = await User.findById({ _id: req.user.id });

    if (!user) {
      return res.status(401).json({ errors: [{msg:'No users exists'}]});
    }

    const currentFinancial = user.financials.find(
      (financial) => financial.financial == financialId
    );

    if (!currentFinancial) {
      return res.status(401).json({ errors: [{msg:'No financial exists'}]});
    }

    currentFinancial.investment.forEach((el, index) => {
      el.profit = updatedFinancialProfit[index].profit;
      el.waste = updatedFinancialProfit[index].waste;
    });

    await user.save();
    return res.status(200).json({ msg: 'Finances calculated successfully' });
  } catch (err) {
    return res.status(500).send('Server error');
  }
};

exports.applyForCredit = async (req, res) => {
  const creditId = req.params.id;
  const { loan, term } = req.body;
  try {
    const user = await User.findById({ _id: req.user.id });

    if (!user) {
      return res.status(401).json({ errors: [{msg:'No users exists'}]});
    }

    user.creditProposal = {
      creditId,
      loan,
      term,
      status: 'pending',
      startDate: Date.now(),
    };

    await user.save();
    return res.status(201).json({ msg: 'You successfully aplied for credit' });
  } catch (err) {
    return res.status(500).send('Server error');
  }
};

exports.payOffCredit = async (req, res) => {
  const creditId = req.params.id;
  try {
    const user = await User.findById({ _id: req.user.id });
    if (!user) {
      return res.status(401).json({ errors: [{msg:'No user exists'}] });
    }

    const credit = await Credit.findById({ _id: creditId });
    if (!credit) {
      return res.status(401).json({ errors: [{msg:'No credit exists'}] });
    }

    const creditIndexToRemove = user.credits.findIndex(
      (credit) => credit.credit == creditId
    );

    user.creditsHistory.push({
      credit: credit._id,
      loan: user.credits[creditIndexToRemove].loan,
      term: user.credits[creditIndexToRemove].term,
      repayment: user.credits[creditIndexToRemove].repayment,
      startDate: user.credits[creditIndexToRemove].startDate,
      finishDate: Date.now(),
    });

    user.credits.splice(creditIndexToRemove, 1);

    await user.save();

    return res.status(200).json({ msg: 'Credit successfully paid off' });
  } catch (err) {
    return res.status(500).send('Server error');
  }
};

exports.updateWallet = async (req, res) => {
  const { value, operation } = req.body;

  try {
    const user = await User.findById({ _id: req.user.id });
    if (!user) {
      return res.status(401).json({ errors: [{msg:'No user exists'}]});
    }

    if (operation === 'payIn') {
      user.wallet.totalMoney += parseFloat(value);
    } else if(operation === 'payOut') {
      user.wallet.totalMoney -= parseFloat(value);
    }

    await user.save();
    return res.status(201).json({ msg: 'Wallet updated' });
  } catch (err) {
    return res.status(500).send('Server error');
  }
};

exports.payInCash = async (req, res) => {
  const { money } = req.body;

  try {
    const user = await User.findById({ _id: req.user.id });
    if (!user) {
      return res.status(401).json({ errors: [{msg:'No user exists'}]});
    }

    user.wallet.totalMoney = user.wallet.totalMoney + parseFloat(money);

    await user.save();
    return res.status(201).json({ msg: 'Money pay in successfully' });
  } catch (err) {
    return res.status(500).send('Server error');
  }
};

exports.payOutCash = async (req, res) => {
  const { money } = req.body;

  try {
    const user = await User.findById({ _id: req.user.id });
    if (!user) {
      return res.status(401).json({ errors: [{msg:'No user exists'}] });
    }

    user.wallet.totalMoney = user.wallet.totalMoney - parseFloat(money);

    await user.save();
    return res.status(201).json({ msg: 'Money pay out successfully' });
  } catch (err) {
    return res.status(500).send('Server error');
  }
};



exports.setPersonalData = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, country, city, street } = req.body;

  try {
    const user = await User.findById({ _id: req.user.id });
    if(!user) {
      return res.status(401).json({ errors: [{msg:'No user exists'}] });
    }

    user.personalData = {
      firstName,
      lastName,
      email,
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
    return res.status(500).send('Server error');
  }
}


exports.deleteMessage = async (req, res) => {
  const messageId = req.params.id;
  try {
    const user = await User.findById({ _id: req.user.id });

    if (!user) {
      return res.status(401).json({ errors: [{msg:'No users exists'}]});
    }

    const messageIndexToRemove = user.mailbox.findIndex(
      (message) => message._id == messageId
    );

    user.mailbox.splice(messageIndexToRemove, 1);
    await user.save();

    return res.status(200).json({ msg: 'Message deleted' });
  } catch (err) {
    return res.status(500).send('Server error');
  }
}

exports.deleteMessages = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id });

    if (!user) {
      return res.status(401).json({ errors: [{msg:'No users exists'}]});
    }


    user.mailbox = [];
    await user.save();

    return res.status(200).json({ msg: 'Mailbox is empty' });
  } catch (err) {
    return res.status(500).send('Server error');
  }
}