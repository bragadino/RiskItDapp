// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import metacoin_artifacts from '../../build/contracts/RiskToken.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var MetaCoin = contract(metacoin_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;
var baseURL = "http://localhost:8080/";
window.App = {
  start: function() {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
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
      var team = self.getTeam();
      //TODO Get this must register thing working
      // if ((team != 1 || team != 2) && (window.location.href == baseURL || window.location.href == baseURL+"index.html")) {
      //   //tell the player they need to Register
      //   alert(team);
      //   alert("You need to register before playing!");
      //   //Show register page
      //   window.location.href = "register.html";
      // }
      self.refreshGameDetails();
    });
  },

  refreshGameDetails: function() {
    var team = this.getTeam();
    this.setTeam(team);
    this.showAccount();
    this.getTeamPoints();
    this.getTeamNums();
    this.getTeamCaptains();
    this.getTokensLeft();
    this.getRisked(); //todo this is just for testing, remove later
    this.getRound();
    this.refreshBalance();
    this.refreshNav(team, 100, 1);
  },

  setStatus: function(message) {
    var status = document.getElementById("you");
    status.innerHTML = message;
  },

  showAccount: function() {
    var self = this;

    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      var balance_element = document.getElementById("you");
      balance_element.innerHTML = String(account);
  })},

  getTeamPoints: function() {
    var self = this;
    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
     return meta.redTotalPlayers.call({from: account});
    }).then(function(value) {
      var red_players = document.getElementById("red_tp");
      red_players.innerHTML = value.valueOf();
      return meta.blueTotalPlayers.call({from: account});
    }).then(function(value) {
      var blue_players = document.getElementById("blue_tp");
      blue_players.innerHTML = value.valueOf();
    });
  },

  getTeamNums: function() {
    var self = this;
    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
     return meta.redScore.call({from: account});
    }).then(function(value) {
      var red_score = document.getElementById("red_tpts");
      red_score.innerHTML = value.valueOf();
      return meta.blueScore.call({from: account});
    }).then(function(value) {
      var blue_score = document.getElementById("blue_tpts");
      blue_score.innerHTML = value.valueOf();
    });
  },

  getTeamCaptains: function() {
    var self = this;
    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
     return meta.redCaptain.call({from: account});
    }).then(function(value) {
      var red_captain = document.getElementById("red_tc");
      red_captain.innerHTML = value.valueOf();
      return meta.blueCaptain.call({from: account});
    }).then(function(value) {
      var blue_captain = document.getElementById("blue_tc");
      blue_captain.innerHTML = value.valueOf();
    });
  },

  getTokensLeft: function() {
    var self = this;
    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
     return meta.tokensDistributed.call({from: account});
    }).then(function(value) {
      var balance_element = document.getElementById("tokens_left");
      balance_element.innerHTML = 200000 - value.valueOf();
    }).catch(function(e) {
      console.log(e);
      //self.setStatus("Error getting balance; see log.");
    });
  },

  getRisked: function() {
    var self = this;
    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
     return meta.redRisked.call({from: account});
    }).then(function(value) {
      var red_risked = document.getElementById("red_risked");
      red_risked.innerHTML = value.valueOf();
      return meta.blueRisked.call({from: account});
    }).then(function(value) {
      var blue_risked = document.getElementById("blue_risked");
      blue_risked.innerHTML = value.valueOf();
    });
  },

  getRound: function() {
    var self = this;
    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
     return meta.gameRound.call({from: account});
    }).then(function(value) {
      var game_round = document.getElementById("game_round");
      game_round.innerHTML = value.valueOf();
    });
  },

  refreshBalance: function() {
    var self = this;
    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
     return meta.balanceOf.call(account, {from: account});
    }).then(function(value) {
      var balance_element = document.getElementById("balance");
      balance_element.innerHTML = value.valueOf();
    }).catch(function(e) {
      console.log(e);
      //self.setStatus("Error getting balance; see log.");
    });
  },

  getTeam: function() {
    var self = this;
    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.getTeam.call({from: account});
    }).then(function(value) {
      return value.valueOf();
    }).catch(function(e) {
      console.log(e);
      //self.setStatus("Error getting balance; see log.");
      return 0;
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

  register: function() {
    var self = this;
      var team = document.getElementById("team_choice");
      var teamInt = parseInt(team.options[team.selectedIndex].value.valueOf());
      var tokens = parseInt(document.getElementById("token_amount").value);
      //this.setStatus("Initiating transaction..."+teamInt+" ");
      var meta;
      MetaCoin.deployed().then(function(instance) {
        meta = instance;
        var weiValue = web3.toWei(tokens * (1/1000), 'ether');
        return meta.register(teamInt, tokens, {from: account, value: weiValue});
      }).then(function() {
        //self.setStatus("Transaction complete! Registed for team "+teamInt);
        self.refreshGameDetails();
      }).catch(function(e) {
        console.log(e);
        //self.setStatus("Error sending coin; see log.");
      });
    },

  risk: function() {
    var self = this;
    var tokenAmount = parseInt(document.getElementById("tokens_to_risk").value);
    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.riskIt(tokenAmount,{from: account});
    }).then(function () {
      self.refreshGameDetails();
    }).catch(function(e) {
      console.log(e);
    });
  },

  claimCaptain: function() {
    //get the users team
    var self = this;
    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.getTeam.call({from: account});
    }).then(function(value) {
      console.log(value.valueOf());
      return meta.claimCaptain(value.valueOf(), {from:account});
    }).then(function() {
      self.refreshGameDetails();
    }).catch(function(e) {
      console.log(e);
    });
  },

  endRound: function() {
    var self = this;
    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.endRound({from: account});
    }).then(function(value) {
      console.log("Round Ended");
    }).catch(function (e) {
      console.log("Failed trying to end round");
    });
  },

  claimWinnings: function() {
    var self = this;
    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.claimWinnings({from: account});
    }).then(function(value) {
      console.log("Claimed Winnings");
    }).catch(function (e) {
      console.log("Failed trying to end round");
    });
  }

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
