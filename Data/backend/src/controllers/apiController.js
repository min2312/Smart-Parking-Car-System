import apiService from "../service/apiService";

let HandleCreateNewCar = async (req, res) => {
	// const user = req.user;
	// const carData = req.body;
	const { car, user } = req.body;
	try {
		const result = await apiService.CreateNewCar(car, user);
		return res.status(200).json(result);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ errCode: 1, message: "Error creating car" });
	}
};
let HandleGetAllCar = async (req, res) => {
	let id = req.query.id;
	if (!id) {
		return res.status(200).json({
			errCode: 1,
			errMessage: "Missing required parameter",
			car: [],
		});
	}
	let car = await apiService.GetAllCar(id);
	return res.status(200).json({
		errCode: 0,
		errMessage: "OK",
		car: car,
	});
};
let HandleGetAllCar_Ticket = async (req, res) => {
	let id = req.query.id;
	if (!id) {
		return res.status(200).json({
			errCode: 1,
			errMessage: "Missing required parameter",
			car: [],
		});
	}
	let car = await apiService.GetCar_Ticket(id);
	return res.status(200).json({
		errCode: 0,
		errMessage: "OK",
		car: car,
	});
};

let HandleGetTypeTicket = async (req, res) => {
	let type_ticket = req.query.type;
	try {
		const result = await apiService.GetTicketType(type_ticket);
		return res.status(200).json(result);
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ errCode: 1, message: "Error get type ticket" });
	}
};
let HandleCreatePayment = async (req, res) => {
	let data = req.body;
	try {
		const result = await apiService.CreatePayment(data);
		return res.status(200).json({
			errCode: result.errCode,
			errMessage: result.errMessage,
		});
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ errCode: 1, errMessage: "Error Create Ticket" });
	}
};
let HandleDeleteTicket = async (req, res) => {
	if (!req.body) {
		return res.status(200).json({
			errCode: 1,
			errMessage: "Missing required parameters!",
		});
	}
	let message = await apiService.DeleteTicket(req.body.id_car);
	return res.status(200).json({
		...message,
	});
};
let HandleCreateTime = async (req, res) => {
	const { license_plate } = req.body;
	if (!license_plate) {
		return res.status(400).send("Is Not License Plate");
	}
	try {
		let result = await apiService.CreateTimeCar(license_plate);
		return res.status(200).json({
			errCode: result.errCode,
			errMessage: result.errMessage,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ errCode: 1, errMessage: "Error Car" });
	}
};
module.exports = {
	HandleCreateNewCar: HandleCreateNewCar,
	HandleGetAllCar: HandleGetAllCar,
	HandleGetAllCar_Ticket: HandleGetAllCar_Ticket,
	HandleGetTypeTicket: HandleGetTypeTicket,
	HandleCreatePayment: HandleCreatePayment,
	HandleDeleteTicket: HandleDeleteTicket,
	HandleCreateTime: HandleCreateTime,
};
