
module.exports = (router) => {

	router.post('/api/v1/setTicketSellTime', function(req, res) {
		global.ticketSellTime = global.ticketSellTime || [];
		global.ticketSellTime.push(new Date());
		res.json({success: true})
	});

	router.post('/api/v1/getEstJackpotTime', function(req, res) {
		console.log("ticketSelltime", global.ticketSellTime);
		if (global.ticketSellTime && global.ticketSellTime.length > 4) {
			var Jackpot = req.body.Jackpot;
			var soldTickets = req.body.soldTickets;
			var start = global.ticketSellTime[0].getTime();
			var end = global.ticketSellTime[global.ticketSellTime.length - 1].getTime();
			var result = ((end - start)*Jackpot/soldTickets) + start;
			console.log("start, end, result", start, end, result, Jackpot, soldTickets);
			res.json({success: true, date: result})
		} else {
			res.json({success: false, date: "NaN"})
		}
	});


	router.get('/', function(req, res) {
	  res.render("lottery.html");
	});

	router.get('/deploy', function(req, res) {
	  res.render("deploy.html");
	});
	return router;
};