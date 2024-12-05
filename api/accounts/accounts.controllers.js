// let accounts = require("../../accounts");
const Account = require("../../models/Accounts");

exports.accountCreate = async (req, res) => {
  try {
    const newAccount = await Account.create(req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.accountDelete = async (req, res) => {
  const { accountId } = req.params;
  try {
    const foundAccount = await Account.findById(accountId);
    if (foundAccount) {
      await foundAccount.deleteOne();
      res.status(204).end();
    } else {
      res.status(404).json("this account doesn't exist");
    }
  } catch (error) {
    res.status(500).json({ errror: "Account not found" });
  }
};

exports.accountUpdate = async (req, res) => {
  const { accountId } = req.params;
  try {
    const foundAccount = await Account.findById(accountId);
    if (foundAccount) {
      await foundAccount.updateOne(req.body);
      res.status(204).json(foundAccount);
    } else {
      res.status(404).json("this account doesn't exist");
    }
  } catch (error) {
    res.status(500).json({ errror: "Account not found" });
  }
};
exports.accountsGet = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAccountByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const foundAccount = await Account.find({ username: username });
    if (foundAccount) {
      res.status(200).json(foundAccount);
    } else {
      res.status(404).json("this account doesn't exist");
    }
  } catch (error) {
    res.status(500).json({ errror: "Account not found" });
  }
};
