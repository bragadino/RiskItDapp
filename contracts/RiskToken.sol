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
// Contract function to receive approval and execute function in one call
//
// Borrowed from MiniMeToken
// ----------------------------------------------------------------------------
contract ApproveAndCallFallBack {
    function receiveApproval(address from, uint256 tokens, address token, bytes data) public;
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
    //Team Captains -> Team captain gets one token each time their team member gets a win.
    //They are the player who holds the most tokens on each team.
    address public redCaptain;
    address public blueCaptain;
    //Team 1 = Red, Team 2 = Blue (As default val is 0)
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
    uint public blueRisked;
    uint public redRisked;
    //Risked amount per player for this round -> note that this is reset when a
    mapping(address => Risk) playersRisks;
    //Game Counter
    uint public gameRound;

    function RiskToken() public {
        symbol = "RSK";
        name = "Risk Game Token";
        redScore = 0;
        blueScore = 0;
        redTotalPlayers = 0;
        blueTotalPlayers = 0;
        tokensDistributed = 0;
        riskPerEth = 1000;
        blueRisked = 0;
        redRisked = 0;
        gameRound = 0;
        decimals = 0;
        _totalSupply = 200000; //* 10**uint(decimals);
        //balances[owner] = _totalSupply;
        Transfer(address(0), owner, _totalSupply);
    }

    function totalSupply() public constant returns (uint) {
        return _totalSupply  - balances[address(0)];
    }

    function balanceOf(address tokenOwner) public constant returns (uint balance) {
        return balances[tokenOwner];
    }

    function transfer(address to, uint tokens) public returns (bool success) {
        balances[msg.sender] = balances[msg.sender].sub(tokens);
        balances[to] = balances[to].add(tokens);
        Transfer(msg.sender, to, tokens);
        return true;
    }

    function approve(address spender, uint tokens) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        Approval(msg.sender, spender, tokens);
        return true;
    }

    function transferFrom(address from, address to, uint tokens) public returns (bool success) {
        balances[from] = balances[from].sub(tokens);
        allowed[from][msg.sender] = allowed[from][msg.sender].sub(tokens);
        balances[to] = balances[to].add(tokens);
        Transfer(from, to, tokens);
        return true;
    }

    function allowance(address tokenOwner, address spender) public constant returns (uint remaining) {
        return allowed[tokenOwner][spender];
    }

    function approveAndCall(address spender, uint tokens, bytes data) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        Approval(msg.sender, spender, tokens);
        ApproveAndCallFallBack(spender).receiveApproval(msg.sender, tokens, this, data);
        return true;
    }

    // ------------------------------------------------------------------------
    // Owner can transfer out any accidentally sent ERC20 tokens
    // ------------------------------------------------------------------------
    function transferAnyERC20Token(address tokenAddress, uint tokens) public onlyOwner returns (bool success) {
        return ERC20Interface(tokenAddress).transfer(owner, tokens);
    }

    //Game Methods Below

    //This is the function where the game is played. A player can risk a certain amount of tokens
    //After the player period is finished, the team with the most risked tokens wins
    //The risked amount will be a private variable (can be seen but troublesome to do so)
    function riskIt(uint riskAmount)  {
        //require(riskAmount <= 1000 && riskAmount >= 1);
        require(balances[msg.sender] >= riskAmount);
        var team = playerTeams[msg.sender];
        require(team == 1 || team == 2);
        if (team == 1) {
          //red team
          redRisked++;
        } else if (team == 2) {
          //blue team
          blueRisked++;
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
      gameRound++;
    }

    //Claim Team Captain
    function claimCaptain(uint team) {
      require(team == 1 || team == 2);
      if (team == 1) { //Red team

      } else { //Blue team

      }
    }

    //Register as a player
    function register(uint team, uint tokensToPurchase) payable {
    require(team == 1 || team == 2);
    require(msg.value.mul(riskPerEth) >= tokensToPurchase); //Ensure tokens match token price
    require(tokensDistributed.add(tokensToPurchase) <= _totalSupply); //Make sure total supply hasnt been exceeded
    //require(redTotalPlayers - blueTotalPlayers <= 9) //if there are 10 more players on one team, cant register for that team TODO should I do this
    playerTeams[msg.sender] = team; //register on red team or blue team (Red = 1, Blue = 2)
    //Update team numbers
    if (team == 1) {
      redTotalPlayers++;
    } else if (team == 2) {
      blueTotalPlayers++;
    }
    balances[msg.sender] += tokensToPurchase; //Give them the tokens
    tokensDistributed += tokensToPurchase;
    //TODO Send ETH to the contract owner.
    }

    //Check which team you are
    function getTeam() returns (uint team){
      return playerTeams[msg.sender];
    }

    function tokensLeft() returns (uint tokens) {
      return _totalSupply.sub(tokensDistributed);
    }





}
