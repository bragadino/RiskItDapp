// Import the page's CSS. Webpack will know what to do with it.
//import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import metacoin_artifacts from '../../build/contracts/RiskToken.json'

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;
var baseURL = "http://localhost:8080/";
//var MetaCoin = contract(metacoin_artifacts);
var risktokenContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"tokensDistributed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"getRoundTimeLeft","outputs":[{"name":"time","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"redScore","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"endRound","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"tokensToPurchase","type":"uint256"}],"name":"purchaseTokens","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"roundLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"getTeam","outputs":[{"name":"team","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"redTotalPlayers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"riskPerEth","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastGame","outputs":[{"name":"round","type":"uint256"},{"name":"redAmount","type":"uint256"},{"name":"blueAmount","type":"uint256"},{"name":"winner","type":"uint8"},{"name":"endingTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"blueTotalPlayers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"gameRound","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"claimWinnings","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"blueScore","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"team","type":"uint256"},{"name":"tokensToPurchase","type":"uint256"}],"name":"register","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"riskAmount","type":"uint256"}],"name":"riskIt","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}]);
var RiskIt = risktokenContract.at("0x067e3cd97fe0b9996f44f3bd2b4d14314be4fac0"); //TESTNET address
//var RiskIt = risktokenContract.at("0x7a5d628d079f79c8f4df59ea2d94daf662f3035b"); //Local address


window.App = {

  start: function() {
    var self = this;
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      accounts = accs;
      account = accounts[0];
      //alert(account);
    });
    // Bootstrap the RiskIt abstraction for Use.
    //RiskIt.setProvider(web3.currentProvider);
    console.log(web3.currentProvider);
    self.getTeam(self.checkRegistered);
  },

  //Nav Bar Functions
  clickedPlay: function() {
    window.location.href = "index.html";
  },

  clickedRegister: function() {
    window.location.href = "register.html";
  },

  clickedFAQ: function() {
    window.location.href = "faqs.html";
  },

  clickedGameStats: function() {
    window.location.href = "gamestats.html";
  },

  checkRegistered: function(team) {
    if ((team != 1 && team != 2) && (window.location.href == baseURL || window.location.href == baseURL+"index.html")) {
      //tell the player they need to Register
      var warning = document.getElementById("warnings").innerHTML = "Uh Oh! Looks like you havent registered. Please check out the register tab above to register"
    } else {
      //Display game content
    }
  },

  refreshGameDetails: function() {
    //var team = this.getTeam();
    //this.setTeam(team);
    this.getTeam(this.setTeam);
    this.showAccount();
    this.getTeamPoints();
    this.getTeamNums();
    //this.getTeamCaptains();
    this.getTokensLeft();
    this.getRound(this.setRound);
    //this.refreshBalance();
    //this.refreshNav(team, 100, 1);
  },

  showAccount: function() {
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
    accounts = accs;
    account = accounts[0];
    var self = this;
    var balance_element = document.getElementById("you");
    balance_element.innerHTML = String(accs);
    //Call refresh balance function as we now have the accounts
    RiskIt.balanceOf.call(account, {from:account}, function(error, result) {
      if (!error) {
        var balance_element = document.getElementById("balance");
        var number = new web3.BigNumber(result.valueOf()).div(Math.pow(10,18));
        balance_element.innerHTML = number.toFixed(18);
      } else {
        console.log("Error getting balance");
      }
    });
  });
},

  setGameRoundAndTime: function() {
    var self = this;
    var meta;
    RiskIt.lastGame.call({from: account}, function(error, result) {
      if (!error) {
        var milliseconds = (new Date).getTime();
        var bigNumMilli = new web3.BigNumber(String(milliseconds));
        var bigNumSeconds = bigNumMilli.div(1000);
        var lastRoundStart = new web3.BigNumber(result.valueOf()[4]);
        var endingTime = lastRoundStart.plus(5*60*60*24); //5 days to seconds
        //var endingTime = lastRoundStart.plus(5*60); //5 mins for testing
        var timeDiff = endingTime.minus(bigNumSeconds); //time diff in seconds
        //Calculate days, hours, mins, seconds -> once each section has been accounted for, remove it from the seconds known by the system
        var days = parseInt(timeDiff.div(60*60*24));
        timeDiff = timeDiff.minus(days*60*60*24);
        var hours = parseInt(timeDiff.div(60*60));
        timeDiff = timeDiff.minus(hours*60*60);
        var mins = parseInt(timeDiff.div(60));
        timeDiff = timeDiff.minus(mins*60);
        var seconds = parseInt(timeDiff.div(1));
        //alert(timeDiff);
        document.getElementById("time_left").innerHTML = "Time Left: "+days+":"+hours+":"+mins+":"+seconds;
        RiskIt.gameRound.call({from: account}, function(error, result) {
          if (!error) {
            var currentRound = result.valueOf();
            document.getElementById("game_round").innerHTML = "Current Round: "+currentRound;
          } else {
            console.log("Error getting game round")
          }
          });
      } else {
        console.log("Error getting game time");
      }
  });
},

  getTeamPoints: function() {
    var self = this;
    RiskIt.redTotalPlayers.call({from: account}, function(error, result) {
      if (!error) {
        var red_players = document.getElementById("red_tp");
        red_players.innerHTML = result.valueOf();
      } else {
        console.log("Error getting red team points");
      }
    });
    RiskIt.blueTotalPlayers.call({from: account}, function(error, result) {
      if (!error) {
        var blue_players = document.getElementById("blue_tp");
        blue_players.innerHTML = result.valueOf();
      } else {
        console.log("Error getting blue team points");
      }
    });
  },

  getTeamNums: function() {
    var self = this;
    RiskIt.redScore.call({from: account}, function(error, result) {
      if (!error) {
        var red_score = document.getElementById("red_tpts");
        red_score.innerHTML = result.valueOf();
      } else {
        console.log("Error getting red team numbers");
      }
    });
    RiskIt.blueScore.call({from: account}, function(error,result) {
      if (!error) {
        var blue_score = document.getElementById("blue_tpts");
        blue_score.innerHTML = result.valueOf();
      } else {
        console.log("Error getting blue team numbers");
      }
      });
  },

  // getTeamCaptains: function() {
  //   var self = this;
  //   var meta;
  //   RiskIt.deployed().then(function(instance) {
  //     meta = instance;
  //    return meta.redCaptain.call({from: account});
  //   }).then(function(value) {
  //     var red_captain = document.getElementById("red_tc");
  //     red_captain.innerHTML = value.valueOf();
  //     return meta.blueCaptain.call({from: account});
  //   }).then(function(value) {
  //     var blue_captain = document.getElementById("blue_tc");
  //     blue_captain.innerHTML = value.valueOf();
  //   });
  // },

  getTokensLeft: function() {
    var self = this;
    var meta;
    RiskIt.tokensDistributed.call({from: account}, function(error, result) {
      if (!error) {
        var balance_element = document.getElementById("tokens_left");
        var total_amount = new web3.BigNumber(100000).mul(Math.pow(10,18));
        var dist = new web3.BigNumber(result.valueOf());
        var final = total_amount.minus(result.toString()).div(Math.pow(10,18));
        //Return the final to correct decimal places
        balance_element.innerHTML = final.toFixed(18);
      } else {
        console.log("Error getting tokens left");
      }
    });
  },

  getRisked: function() {
    var self = this;
    RiskIt.redRisked.call({from: account}, function(error, result) {
      if (!error) {
        var red_risked = document.getElementById("red_risked");
        var risked_amount = new web3.BigNumber(result.valueOf()).div(Math.pow(10,18));
        red_risked.innerHTML = risked_amount.toFixed(18);
      } else {
        console.log("Error getting red risked")
      }
    });
    RiskIt.blueRisked.call({from: account}, function(error, result) {
      if (!error) {
        var blue_risked = document.getElementById("blue_risked");
        var risked_amount = new web3.BigNumber(result.valueOf()).div(Math.pow(10,18));
        blue_risked.innerHTML = risked_amount.toFixed(18);
      } else {
        console.log("Error getting blue risked");
      }
    });
  },

  getRound: function(onSucess) {
    var self = this;
    RiskIt.gameRound.call({from: account}, function(error, result) {
      if (!error) {
        onSucess(result.valueOf());
      } else {
        console.log("Error getting game round");
      }
    });
  },

  setRound: function(round) {
    var game_round = document.getElementById("game_round");
    game_round.innerHTML = "Current Round: "+round;
  },

  refreshBalance: function() {
    var self = this;
    RiskIt.balanceOf.call(account, {from:account}, function(error, result) {
      if (!error) {
        var balance_element = document.getElementById("balance");
        var balance = new web3.BigNumber(result.valueOf()).div(Math.pow(10,18));
        balance_element.innerHTML = balance.toFixed(18);
      } else {
        console.log("Error getting balance");
      }
    });
  },

  getTeam: function(onSucess) {
    var self = this;
    RiskIt.getTeam.call({from: account}, function(error, result) {
      if (!error) {
        onSucess(result.valueOf());
      } else {
        console.log("Error getting team");
      }
    });
  },

  setTeam: function(team_value) {
    var team_element = document.getElementById("team");
    if (team_value == 1) {
      team_element.innerHTML = "Red";
    } else if (team_value == 2) {
      team_element.innerHTML = "Blue";
    } else {
      team_element.innerHTML = "Not Registered";
    }
  },

  refreshNav: function(team, tokens, teamScore) {
    var team_element = document.getElementById("header_team");
    var token_element = document.getElementById("header_tokens");
    var team_score_element = document.getElementById("header_team_points");
    if (team == 1) {
      team_element.innerHTML = "Team: Red";
    } else if (team == 2) {
      team_element.innerHTML = "Team: Blue";
    } else {
      team_element.innerHTML = "Team: Not Registered";
    }
    token_element.innerHTML = "Tokens: "+tokens;
    team_score_element.innerHTML = "Teams Points: "+teamScore;


  },

  register: function(team) {
      var self = this;
      //var team = document.getElementById("team_switch");
      //var teamInt = parseInt(team.options[team.selectedIndex].value.valueOf());
      var tokens = parseInt(document.getElementById("token_amount").value);
      var tokens_actual = new web3.BigNumber(tokens).times(Math.pow(10,18));
      //alert(tokens_actual);
      //this.setStatus("Initiating transaction..."+teamInt+" ");
      var teamInt = parseInt(team);
      //var tokens_cost_ratio = new web3.BigNumber(1).div(1000 * Math.pow(10,18));
      var tokens_cost_ratio =  (1/1000);
      //alert(tokens_cost_ratio);
      var weiValue = web3.toWei(tokens * (tokens_cost_ratio), 'ether');
      //alert("Buying "+tokens_actual.div(Math.pow(10,18)).toFixed(18));
      RiskIt.register(teamInt, tokens_actual, {from: account, value: weiValue}, function(error, value) {
        if (!error) {
          window.location.href = "index.html";
          //Refresh
          self.refreshGameDetails();
        } else {
          alert("Error registering. Please try again or contact the team for help")
        }
      });
    },

  risk: function() {
    var self = this;
    var tokenAmount = parseInt(document.getElementById("tokens_to_risk").value);
    var tokens_actual = new web3.BigNumber(tokenAmount).times(Math.pow(10,18));
    RiskIt.riskIt(tokens_actual, {from: account}, function(error, result) {
      if (!error) {
          self.refreshGameDetails();
      } else {
        console.log(error);
        alert("Error during risk. Please try again");
      }
    });
  },

  //TODO This functionality
  buy: function() {
    var self = this;
    var tokens = parseInt(document.getElementById("tokens_to_buy").value);
    var tokensActual = new web3.BigNumber(tokens).times(Math.pow(10,18));
    var tokens_cost_ratio =  (1/1000);
    var weiValue = web3.toWei(tokens * (tokens_cost_ratio), 'ether');
    RiskIt.purchaseTokens(tokensActual, {from: account, value: weiValue}, function(error, value) {
      if (!error) {
          //self.refreshGameDetails();
      } else {
        console.log(error);
        alert("Error buying tokens. Please try again");
      }
    });
  },
  // claimCaptain: function() {
  //   //get the users team
  //   var self = this;
  //   RiskIt.getTeam.call({from: account}, function(error, result));
  //   }).then(function(value) {
  //     console.log(value.valueOf());
  //     return meta.claimCaptain(value.valueOf(), {from:account});
  //   }).then(function() {
  //     self.refreshGameDetails();
  //   }).catch(function(e) {
  //     console.log(e);
  //   });
  // },

  endRound: function() {
    var self = this;
    RiskIt.endRound({from: account}, function(error, result) {
      if (!error) {
        console.log("Round Ended");
      } else {
        console.log("Failed trying to end round");
      }
    });
  },

  claimWinnings: function() {
    var self = this;
    RiskIt.claimWinnings({from: account}, function(error, result) {
      if (!error) {
        console.log("Claimed winnings");
      } else {
        console.log("Error trying to claim winnings");
      }
    });
  },


};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    //window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }

  App.start();
});
