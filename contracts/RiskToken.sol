pragma solidity ^0.4.18;

// ----------------------------------------------------------------------------
// Risk Contract
//
// Based off the ERC20 Contract by BokkyPooBah
// (c) BokkyPooBah / Bok Consulting Pty Ltd 2017. The MIT Licence.
// ----------------------------------------------------------------------------


// ----------------------------------------------------------------------------
// Safe maths
// ----------------------------------------------------------------------------
library SafeMath {
    function add(uint a, uint b) internal pure returns (uint c) {
        c = a + b;
        require(c >= a);
    }
    function sub(uint a, uint b) internal pure returns (uint c) {
        require(b <= a);
        c = a - b;
    }
    function mul(uint a, uint b) internal pure returns (uint c) {
        c = a * b;
        require(a == 0 || c / a == b);
    }
    function div(uint a, uint b) internal pure returns (uint c) {
        require(b > 0);
        c = a / b;
    }
}


// ----------------------------------------------------------------------------
// ERC Token Standard #20 Interface
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md
// ----------------------------------------------------------------------------
contract ERC20Interface {
    function totalSupply() public constant returns (uint);
    function balanceOf(address tokenOwner) public constant returns (uint balance);
    function allowance(address tokenOwner, address spender) public constant returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}

// ----------------------------------------------------------------------------
// Owned contract
// ----------------------------------------------------------------------------
contract Owned {
    address public owner;
    address public newOwner;

    event OwnershipTransferred(address indexed _from, address indexed _to);

    function Owned() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address _newOwner) public onlyOwner {
        newOwner = _newOwner;
    }
    function acceptOwnership() public {
        require(msg.sender == newOwner);
        OwnershipTransferred(owner, newOwner);
        owner = newOwner;
        newOwner = address(0);
    }
}


// ----------------------------------------------------------------------------
// ERC20 RISK token -> implements the ERC20 interface with added built in methods for
// running the RISK team game.
// ----------------------------------------------------------------------------
contract RiskToken is ERC20Interface, Owned {
    using SafeMath for uint;

    string public symbol;
    string public  name;
    uint8 public decimals;
    uint public _totalSupply;

    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowed;

    //Mappings,Variables and Structs needed for the game
    //Risk struct is needed to store a players last risk. This avoids the players
    //claiming a win from one round multiple times.
    struct Risk {
        uint round;
        uint amount;
    }

    struct LastGame {
      uint round;
      uint redAmount;
      uint blueAmount;
      uint8 winner;
      uint endingTime;
    }
    //Team 1 = Red, Team 2 = Blue
    mapping(address => uint) playerTeams;
    //Current Score for each team
    uint public redScore;
    uint public blueScore;
    //Total players on each team
    uint public redTotalPlayers;
    uint public blueTotalPlayers;
    uint public tokensDistributed;
    uint public riskPerEth; //1 ETH = 1000 Risk
    //Current amount risked on this game TODO Change to private after testing
    uint private blueRisked;
    uint private redRisked;
    uint public roundLength; //round length (in days)
    //Risked amount per player for this round
    mapping(address => Risk) playersRisks;
    //Game Counter
    uint public gameRound;
    LastGame public lastGame;

    function RiskToken() public {
        symbol = "RSK";
        name = "Risk Game Token";
        redScore = 0;
        blueScore = 0;
        redTotalPlayers = 0;
        blueTotalPlayers = 0;
        tokensDistributed = 0;
        riskPerEth = 1000 * 10**uint(decimals); //multiplied to get appropriate decimal places.
        blueRisked = 0;
        redRisked = 0;
        gameRound = 1;
        lastGame.winner = 0;
        roundLength = 7;
        decimals = 18;
        lastGame.endingTime = now;
        _totalSupply = 100000 * 10**uint(decimals);
    }

    function totalSupply() public constant returns (uint) {
        return _totalSupply  - balances[address(0)];
    }

    function balanceOf(address tokenOwner) public constant returns (uint balance) {
        return balances[tokenOwner];
    }

    function transfer(address to, uint tokens) public returns (bool success) {
        if (balances[msg.sender] >= tokens) {
          balances[msg.sender] = balances[msg.sender].sub(tokens);
          balances[to] = balances[to].add(tokens);
          Transfer(msg.sender, to, tokens);
          return true;
        } else {
          return false;
        }
    }

    function approve(address spender, uint tokens) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        Approval(msg.sender, spender, tokens);
        return true;
    }

    function transferFrom(address from, address to, uint tokens) public returns (bool success) {
      if (balances[from] >= tokens && allowed[from][msg.sender] >= tokens
            && tokens > 0 && balances[to] + tokens > balances[to]) {
          balances[from] = balances[from].sub(tokens);
          allowed[from][msg.sender] -= allowed[from][msg.sender].sub(tokens);
          balances[to] += balances[to].add(tokens);
          Transfer(from, to, tokens);
          return true;
      } else {
          return false;
      }
    }


    function allowance(address tokenOwner, address spender) public constant returns (uint remaining) {
        return allowed[tokenOwner][spender];
    }

    //Game Methods Below

    //This is the function where the game is played. A player can risk a certain amount of tokens
    //After the player period is finished, the team with the most risked tokens wins
    //The risked amount will be a private variable (can be seen but troublesome to do so)
    function riskIt(uint riskAmount)  {
        require(balances[msg.sender] >= riskAmount);
        var team = playerTeams[msg.sender];
        require(team == 1 || team == 2);
        if (team == 1) {
          //red team
          redRisked += riskAmount;
        } else if (team == 2) {
          //blue team
          blueRisked += riskAmount;
        }
        //Place the players risk for this round
        var _risk = playersRisks[msg.sender];
        _risk.round = gameRound;
        _risk.amount = riskAmount;
        //Take the amount away to avoid duplicate spends
        balances[msg.sender] -= riskAmount;
    }

    //Called by any player to end the round and allocate scores, etc.
    function endRound() {
      //require(now >= lastGame.endingTime + 5 * 1 minutes);
      require(now >= (lastGame.endingTime + roundLength * 1 days)); //todo remove after testing
      lastGame.redAmount = redRisked;
      lastGame.blueAmount = blueRisked;
      lastGame.endingTime = now;
      lastGame.round = gameRound;
      gameRound++;
      if (redRisked > blueRisked) {
        lastGame.winner = 1;
        redScore++;
      } else if (blueRisked > redRisked) {
        lastGame.winner = 2;
        blueScore++;
      } else {
        lastGame.winner = 0;
      }
      redRisked = 0;
      blueRisked = 0;
    }

    //Allows a player to claim their winnings for the last round (round just ended)
    function claimWinnings() {
      require(lastGame.winner != 0);
      var risk = playersRisks[msg.sender];
      var team = playerTeams[msg.sender];
      if (risk.round == gameRound - 1 && team == lastGame.winner) {
        //return their amount + the fair share of the other teams winngins
        uint extraWinnings = 0;
        uint ratio = 0;
        if (team == 1) {
          //red team
          ratio = risk.amount.div(lastGame.redAmount);
          extraWinnings = ratio.mul(lastGame.blueAmount);
        } else if (team == 2) {
          //blue team
          ratio = risk.amount.div(lastGame.blueAmount);
          extraWinnings = ratio.mul(lastGame.redAmount);
        }
        balances[msg.sender] += risk.amount + extraWinnings;
        //Reset so players cant double claimWinnings
        playersRisks[msg.sender].amount = 0;
        playersRisks[msg.sender].round = 0;
      }
    }

    //Register as a player
    function register(uint team, uint tokensToPurchase) payable {
      require(playerTeams[msg.sender] != 1 && playerTeams[msg.sender] != 2);//require player isnt registered yet
      require(team == 1 || team == 2);
      require(msg.value.mul(riskPerEth) >= tokensToPurchase); //Ensure tokens match token price
      require(tokensDistributed.add(tokensToPurchase) <= _totalSupply); //Make sure total supply hasnt been exceeded
      //Send ETH to contract owner
      if(!owner.send(msg.value)) {
        throw;
      }
      playerTeams[msg.sender] = team; //register on red team or blue team (Red = 1, Blue = 2)
      //Update team numbers
      if (team == 1) {
        redTotalPlayers++;
      } else if (team == 2) {
        blueTotalPlayers++;
      }
      balances[msg.sender] += tokensToPurchase; //Give them the tokens
      tokensDistributed += tokensToPurchase;
      Transfer(address(0), msg.sender, tokensToPurchase);
    }

    //Check which team you are
    function getTeam() returns (uint team){
      return playerTeams[msg.sender];
    }

    function getRoundTimeLeft() returns (uint time) {
      return lastGame.endingTime;
    }

    function purchaseTokens() payable {
      uint tokensToPurchase = msg.value.mul(riskPerEth);
      require(playerTeams[msg.sender] == 1 || playerTeams[msg.sender] == 2); //player must be registered to buy tokens
      require(tokensDistributed.add(tokensToPurchase) <= _totalSupply);
      if(!owner.send(msg.value)) {
        throw;
      }
      balances[msg.sender] += tokensToPurchase; //Give them the tokens
    }

}
