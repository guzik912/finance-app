const User = require('../models/User');
const Credit = require('../models/Credit');

exports.createCredit = async (req, res) => {
  const { name, description, advantages, requirements, loans, terms, precentage } = req.body;
  try {
    let credit = await Credit.findOne({ name });

    if (credit) {
      return res.status(400).json({ errors: 'Credit already exist' });
    }

    credit = new Credit({
      name,
      description,
      advantages,
      requirements,
      loans,
      terms,
      precentage
    });

    await credit.save();

    return res.status(201).json({ msg: 'Credit successfully created' });
  } catch(err) {
    console.log(err)
    return res.status(500).json({ errors: 'Server error'});
  }
};


exports.getCredits = async (req, res) => {
  try {
    const credits = await Credit.find();

    if (!credits) {
      return res.status(401).json({ errors: 'No credits exists' });
    }

    return res.status(200).json({ credits });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ errors: 'Server error' });
  }
};

exports.getCredit = async (req, res) => {
  const creditId = req.params.id;

  try {
    const credit = await Credit.findById({ _id: creditId });

    if (!credit) {
      return res.status(401).json({ errors: 'No credit exist' });
    }

    return res.status(200).json({ credit });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ errors: 'Server error' });
  }
};


exports.acceptCredit = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id });
    if(!user) {
      return res.status(401).json({ errors: 'No user exist'});
    }

    const { creditId, loan, term } = user.creditProposal;

    const credit = await Credit.findById({ _id: creditId })
    if(!credit) {
      return res.status(401).json({ errors: 'No credit exist'})
    }

    const { precentage } = credit;

    user.credits.push({
      credit: creditId,
      loan,
      term,
      repayment: loan + (loan * precentage),
    });

    user.creditProposal.status = 'accepted';

    await user.save();

    return res.status(201).json({ msg: 'Credit successfully accepted'});

  } catch(err) {
    console.log(err)
    return res.status(500).json({ errors: 'Server error'});
  }
};

exports.rejectCredit = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id });
    if(!user) {
      return res.status(401).json({ errors: 'No user exist'});
    }

    user.creditProposal.status = 'rejected';

    await user.save();

    return res.status(201).json({ msg: 'Unfortunatelly, credit is reject'});

  } catch(err) {
    console.log(err)
    return res.status(500).json({ errors: 'Server error'});
  }
}


exports.creditResponseMail = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id }).populate({
      path: 'creditProposal',
      populate: {
        path: 'creditId'
      }
    });
    if(!user) {
      return res.status(401).json({ errors: 'No user exist' });
    }

    const credit = await Credit.findById({ _id: user.creditProposal.creditId._id })
      if(!credit) {
        return res.status(401).json({ errors: 'No credit exist' });
      }

      console.log(credit)

    const mail = {
      title: `Response for credit apply`,
      description: '',
      date: Date.now()
    };

    if(user.creditProposal.status === 'accepted') {
      mail.description = `Dear ${user.username}. We are pleased to announce that proposal regarding credit from ${credit.name} is accepted. Money automatically will be transferred to your account in next 12 hours. We wish you all the best. Best Regards, ${credit.name}`
    } else {
      mail.description = `Dear ${user.username}. We regret to inform you that proposal regarding credit from ${credit.name} is rejected. We hope you will meet the requirements until next consider about credit. We wish you all the best. Best Regards, ${credit.name}`
    }

    user.mailbox.push(mail);

    await user.save();

    return res.status(201).json({ msg: 'Mail successfully sent' });

  } catch(err) {
    console.log(err)
    return res.status(500).json({ errors: 'Server error'});
  }
}