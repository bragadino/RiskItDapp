// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import metacoin_artifacts from '../../build/contracts/RiskToken.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
//Try connect to our testnet contract
// if (typeof web3 !== 'undefined') {
//     web3 = new Web3(web3.currentProvider);
//     console.log("existing web3: provider " + web3.currentProvider);
// } else {
//     web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/access_token"));
//     console.log("new provider " + web3);
// }

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;
var baseURL = "http://localhost:8080/";
//var MetaCoin = contract(metacoin_artifacts);
var risktokenContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"tokensDistributed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"getRoundTimeLeft","outputs":[{"name":"time","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"redScore","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"endRound","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"roundLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"getTeam","outputs":[{"name":"team","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"redTotalPlayers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"riskPerEth","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastGame","outputs":[{"name":"round","type":"uint256"},{"name":"redAmount","type":"uint256"},{"name":"blueAmount","type":"uint256"},{"name":"winner","type":"uint8"},{"name":"endingTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"blueTotalPlayers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"gameRound","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"claimWinnings","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"blueScore","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"team","type":"uint256"},{"name":"tokensToPurchase","type":"uint256"}],"name":"register","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"riskAmount","type":"uint256"}],"name":"riskIt","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}]);
var MetaCoin = risktokenContract.at("0xE2113D9D981F02c8f0850771959185D5B8D1C8f0");


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
    // Bootstrap the MetaCoin abstraction for Use.
    //MetaCoin.setProvider(web3.currentProvider);
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
    //this.getRisked(); //todo this is just for testing, remove later
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
    MetaCoin.balanceOf.call(account, {from:account}, function(error, result) {
      if (!error) {
        var balance_element = document.getElementById("balance");
        balance_element.innerHTML = result.valueOf();
      } else {
        console.log("Error getting balance");
      }
    });
  });
},

  setGameRoundAndTime: function() {
    var self = this;
    var meta;
    MetaCoin.lastGame.call({from: account}, function(error, result) {
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
        MetaCoin.gameRound.call({from: account}, function(error, result) {
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
    MetaCoin.redTotalPlayers.call({from: account}, function(error, result) {
      if (!error) {
        var red_players = document.getElementById("red_tp");
        red_players.innerHTML = result.valueOf();
      } else {
        console.log("Error getting red team points");
      }
    });
    MetaCoin.blueTotalPlayers.call({from: account}, function(error, result) {
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
    MetaCoin.redScore.call({from: account}, function(error, result) {
      if (!error) {
        var red_score = document.getElementById("red_tpts");
        red_score.innerHTML = result.valueOf();
      } else {
        console.log("Error getting red team numbers");
      }
    });
    MetaCoin.blueScore.call({from: account}, function(error,result) {
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
  //   MetaCoin.deployed().then(function(instance) {
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
    MetaCoin.tokensDistributed.call({from: account}, function(error, result) {
      if (!error) {
        var balance_element = document.getElementById("tokens_left");
        balance_element.innerHTML = 200000 - result.valueOf();
      } else {
        console.log("Error getting tokens left");
      }
    });
  },

  getRisked: function() {
    var self = this;
    MetaCoin.redRisked.call({from: account}, function(error, result) {
      if (!error) {
        var red_risked = document.getElementById("red_risked");
        red_risked.innerHTML = result.valueOf();
      } else {
        console.log("Error getting red risked")
      }
    });
    MetaCoin.blueRisked.call({from: account}, function(error, result) {
      if (!error) {
        var blue_risked = document.getElementById("blue_risked");
        blue_risked.innerHTML = result.valueOf();
      } else {
        console.log("Error getting blue risked");
      }
    });
  },

  getRound: function(onSucess) {
    var self = this;
    MetaCoin.gameRound.call({from: account}, function(error, result) {
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
    MetaCoin.balanceOf.call(account, {from:account}, function(error, result) {
      if (!error) {
        var balance_element = document.getElementById("balance");
        balance_element.innerHTML = result.valueOf();
      } else {
        console.log("Error getting balance");
      }
    });
  },

  getTeam: function(onSucess) {
    var self = this;
    MetaCoin.getTeam.call({from: account}, function(error, result) {
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
      //this.setStatus("Initiating transaction..."+teamInt+" ");
      var teamInt = parseInt(team);
      var weiValue = web3.toWei(tokens * (1/1000), 'ether');
      MetaCoin.register(teamInt, tokens, {from: account, value: weiValue}, function(error, value) {
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
    MetaCoin.riskIt(tokenAmount,{from: account}, function(error, result) {
      if (!error) {
          self.refreshGameDetails();
      } else {
        console.log(error);
        alert("Error during risk. Please try again");
      }
    });
  },

  // claimCaptain: function() {
  //   //get the users team
  //   var self = this;
  //   MetaCoin.getTeam.call({from: account}, function(error, result));
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
    MetaCoin.endRound({from: account}, function(error, result) {
      if (!error) {
        console.log("Round Ended");
      } else {
        console.log("Failed trying to end round");
      }
    });
  },

  claimWinnings: function() {
    var self = this;
    MetaCoin.claimWinnings({from: account}, function(error, result) {
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
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }

  App.start();
});