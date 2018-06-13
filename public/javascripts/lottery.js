
const contractAbi =[{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ticketPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_price","type":"uint256"}],"name":"setTicketPrice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isLotteryRunning","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"threshold","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"resumeLotteryFromEmergency","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"currentTicket","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"setHouseEdge","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"soldTickets","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"setReferralShare","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pauseLotteryEmergency","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastWinTicket","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currentStepStart","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_count","type":"uint256"},{"name":"_refTicket","type":"uint256"}],"name":"buyBulkTickets","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"houseEdge","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"referralShare","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"getAllTicketInformation","outputs":[{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"drawManually","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_withdraw","type":"address"},{"name":"_tktNum","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"getTicketAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_withdraw","type":"address"}],"name":"withdrawAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_tktNum","type":"uint256"}],"name":"getTicketInfo","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ticketNum","type":"uint256"},{"indexed":false,"name":"holder","type":"address"},{"indexed":false,"name":"count","type":"uint256"}],"name":"BuyTicket","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ticketNum","type":"uint256"},{"indexed":false,"name":"holder","type":"address"},{"indexed":false,"name":"withdraw","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"holder","type":"address"},{"indexed":false,"name":"withdraw","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"WithdrawAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ticketNum","type":"uint256"}],"name":"DrawnWinner","type":"event"},{"anonymous":false,"inputs":[],"name":"AdminPauseLottery","type":"event"},{"anonymous":false,"inputs":[],"name":"AdminResumeLottery","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"AdminSetHouseEdge","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"AdminSetRefShare","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"price","type":"uint256"}],"name":"AdminSetTktPrice","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]
const contractAddress = '0xe6a93c67eb26137ee98d0275dcf0893f2207b9db';
const contract = web3.eth.contract(contractAbi);
const contractInstance = contract.at(contractAddress);
var tobuycount = 50;

function buyBulkTicket() {
	const transactionObject = {
	    from: web3.eth.accounts[0],
	    gas: 351000,
	    gasPrice: 5,
	    value: web3.toWei( tobuycount * 0.001, "ether")
	};

	contractInstance.buyBulkTickets.sendTransaction(
		tobuycount,
		0,
		transactionObject, 
		(error, result) => { 
		 console.log(error, result);
     if (!error){
       postRequest('/api/v1/setTicketSellTime');
       console.log("added to backend as bought ticket");
     }
		}
	);
}

function withdrawWinnings() {
  const transactionObject = {
      from: web3.eth.accounts[0],
      gas: 351000,
      gasPrice: 5
  };
  // console.log("coinbase", eth.coinbase)
  contractInstance.withdrawAll.sendTransaction(
    web3.eth.accounts[0],
    (error, result) => { 
     console.log(error, result);
    }
  );
}

function setTicketPrice(){
  const transactionObject = {
      from: web3.eth.accounts[0],
      gas: 351000,
      gasPrice: 5
  };
  // console.log("coinbase", eth.coinbase)
	contractInstance.setTicketPrice.sendTransaction(
		99,
		(error, result) => { 
		 console.log(error, result);
		}
	);

  // contractInstance.setTicketPrice.call(
  //   1000,
  //   (error, result) => { 
  //    console.log(error, result);
  //   }
  // );
}

function getBalance(){
	contractInstance.getBalance.call(
			(error, result) => { 
			 console.log(error, result);
			}
		);
}


async function callAsync(f, params) {
  if (!params) params = [];
  return new Promise((resolve, reject) => {
    f(...params, function(err, res){
      console.log("callContractFunctionAsync result", err, "r", res)
      if (err) reject(err);
      resolve(res);
    });
  });
}

function postRequest(url, requestData) {
  return new Promise(function (resolve, reject) {

    var json = JSON.stringify(requestData);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
      var result = JSON.parse(xhr.responseText);
      console.log("finish", xhr.readyState,  xhr.status);
      if (xhr.readyState == 4 && xhr.status == "200") {
      console.log("finish success");
        resolve(result);
      } else {
      console.log("finish fail");
        reject(result);
      }
    }
    xhr.send(json);
  });
}

function AddBtnEventListeners() {
  const buyBtn = document.getElementsByClassName("buy-btn")[0];
  buyBtn.addEventListener('click', buyBulkTicket);

  const withdrawBtn = document.getElementsByClassName("withdraw-winnings ")[0];
  withdrawBtn.addEventListener('click', withdrawWinnings);

  $("#tobuycount").slider({
      range: "max",
      min: 1,
      max: 100,
      step: 1,
      value: 50,
      slide: function(event, ui) {
        tobuycount = ui.value;
        $(".tooltip-ticket").html(`${tobuycount} Tickets Selected <br> Odds For Winning Current` + 
          `‘${Jackpot}$’ Jackpot-${100*tobuycount/Jackpot}%(${tobuycount}/${Jackpot})`); 
      }
  });
}

function ListenForContractEvents() {
  var DrawnWinnerEvent = contractInstance.DrawnWinner();
  DrawnWinnerEvent.watch ( (err, response) => { 
      alert('The auction has ended! Selected is ' + response.args.ticketNum);
  });

  var WithdrawAllEvent = contractInstance.WithdrawAll();
  WithdrawAllEvent.watch ( (err, response) => { 
      alert('The withdraw successed! Result is ' + response.args.holder + response.args.withdraw + response.args.amount);
  });
}

async function showContractStatus() {
  var Jackpot = (await callAsync(contractInstance.threshold.call)).c[0];
  var soldTickets = (await callAsync(contractInstance.soldTickets.call)).c[0];

  var estimatedTimeFinish = await postRequest('/api/v1/getEstJackpotTime', {Jackpot: Jackpot, soldTickets: soldTickets});
  var estimationTimeStr;
  if (estimatedTimeFinish.success){

    var date = new Date(estimatedTimeFinish.date);  
    var options = {  
        year: "numeric", month: "short",  day: "numeric"
    };   

    estimationTimeStr = ` Estimated Time To Reach Jackpot - ${date.toLocaleTimeString("en-us", options)} `;
  } else {
    estimationTimeStr = ", it's hard to estimate finish time :(";
  }

  var banner = document.getElementsByClassName("banner")[0];
  banner.innerHTML = `Current Jackpot ${Jackpot}$ - ${soldTickets}` + 
  ` Tickets Sold So Far (${parseInt(soldTickets*521*0.0007)}$ - ${parseFloat(soldTickets*0.0007).toPrecision(2)}ETH Prize Pool Size)` +
  estimationTimeStr;

  var allTicketInfoStr = '';
  for ( var i = 1; i <= soldTickets; i ++){
    var ATicketInfo = (await callAsync(contractInstance.getTicketAddress.call, [i]));
    allTicketInfoStr += ATicketInfo + "<br>";
    console.log(ATicketInfo);
  }
  
  const allTicketHolders = document.getElementsByClassName("all-ticket-holders")[0];
  allTicketHolders.innerHTML = allTicketInfoStr;
  
}
window.onload = async function() {

  showContractStatus();
  AddBtnEventListeners();
  ListenForContractEvents();

  setTimeout(function(){
  	 location.reload();
  }, 1000*600);
};
