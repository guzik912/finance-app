const User = require('../models/User');
const Credit = require('../models/Credit');

exports.createCredit = async (req, res) => {
  const { name, description, advantages, requirements, loans, terms, precentage } = req.body;
  try {
    let credit = await Credit.findOne({ name });

    if (credit) {
      return res.status(400).json({ errors: [{msg:'Credit already exist'}]});
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
    return res.status(500).send('Server error');
  }
};


exports.getCredits = async (req, res) => {
  try {
    const credits = await Credit.find();

    if (!credits) {
      return res.status(401).json({ errors: [{msg:'No credits exists'}]});
    }

    return res.status(200).json({ credits });
  } catch (err) {
    return res.status(500).send('Server error');
  }
};

exports.getCredit = async (req, res) => {
  const creditId = req.params.id;

  try {
    const credit = await Credit.findById({ _id: creditId });

    if (!credit) {
      return res.status(401).json({ errors: [{msg:'No credit exist'}]});
    }

    return res.status(200).json({ credit });
  } catch (err) {
    return res.status(500).send('Server error');
  }
};



exports.considerCredit = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id });
    if(!user) {
      return res.status(401).json({ errors: [{msg:'No user exist'}]});
    }

    const { creditId, loan, term } = user.creditProposal;

    const credit = await Credit.findById({ _id: creditId })
    if(!credit) {
      return res.status(401).json({ errors: [{msg:'No credit exist'}]})
    }

    const { precentage } = credit;

    if(user.credits.length > 0) {
      user.creditProposal.status = 'rejected';
    } else {
      user.creditProposal.status = 'accepted';

      user.credits.push({
        credit: credit._id,
        loan,
        term,
        repayment: parseFloat(loan + (loan * precentage / 100)),
        startDate: Date.now(),
      });
    }
    
    await user.save();

    return res.status(201).json({ msg: 'Credit consider has been requested'});

  } catch(err) {
    return res.status(500).send('Server error');
  }
}


exports.responseCreditMail = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id }).populate({
      path: 'creditProposal',
      populate: {
        path: 'creditId'
      }
    });
    if(!user) {
      return res.status(401).json({ errors: [{msg:'No user exist'}]});
    }

    const credit = await Credit.findById({ _id: user.creditProposal.creditId._id })
      if(!credit) {
        return res.status(401).json({ errors: [{msg:'No credit exist'}] });
      }

    const mail = {
      title: `Response for credit apply`,
      description: '',
      date: Date.now()
    };

    if(user.creditProposal.status == 'accepted') {
      mail.description = `Dear ${user.username}. We are pleased to announce that your proposal regarding a credit from ${credit.name} has been accepted. Your money will automatically be transferred to your account within 12 hours. We wish you all the best. Best Regards, ${credit.name}`
    } else {
      mail.description = `Dear ${user.username}. We regret to inform you that your proposal regarding a credit from ${credit.name} has been rejected. We hope your proposal will meet the requirements in the future. We wish you all the best. Best Regards, ${credit.name}`
    }
    
    
    user.mailbox.unshift(mail);

    await user.save();

    return res.status(201).json({ msg: 'Mail successfully sent' });

  } catch(err) {
    return res.status(500).send('Server error');
  }
}