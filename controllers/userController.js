const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json({
			status: "success",
			results: users.length,
			data: {
				users,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: "fail",
		});
	}
};

exports.getOneUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if(!user) {
			return res.status(404).json({
				status: "fail",
				data: "id not found"
			})
		}

		// find user's wallet
		const wallet = await user.getWallet();
		res.status(200).json({
			status: "success",
			data: {
				user,
				wallet,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: "fail",
		});
	}
};

exports.createUser = async (req, res) => {
	try {
		const user = await User.create({
			...req.body,
			created_at: new Date(),
			updated_at: new Date(),
		});

		res.status(200).json({
			status: "success",
			data: {
				user,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({
			status: "fail",
		});
	}
};

exports.createUserMany = async (req, res) => {
	try {
		const users = await User.insertMany(req.body);

		res.status(200).json({
			status: "success",
			data: {
				users,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({
			status: "fail",
		});
	}
};

exports.updateUser = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(
			req.params.id,
			{
				...req.body,
				updated_at: new Date(),
			},
			{
				new: true,
				runValidators: true,
			}
		);

		res.status(200).json({
			status: "success",
			data: {
				user,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: "fail",
		});
	}
};

exports.deleteUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if(!user) {
			return res.status(404).json({
				status: "fail",
				data: "id not found"
			})
		}
		await User.findByIdAndDelete(req.params.id);

		res.status(200).json({
			status: "success",
		});
	} catch (error) {
		res.status(400).json({
			status: "fail",
		});
	}
};

exports.deleteUserMany = async (req, res) => {
	try {
		await User.deleteMany()
		res.status(200).json({
			status: "success",
		});
	} catch (error) {
		res.status(400).json({
			status: "fail",
		});
	}
}
