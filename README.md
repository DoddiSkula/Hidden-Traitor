# Hidden Traitor

Hidden Traitor is a multiplayer deduction game where players try to find out who the traitor is. 

>Play the game [here](https://hidden-traitor.herokuapp.com/)

The frontend (client-side) is made with [React](https://reactjs.org/) and Socket.IO.

The [backend](https://github.com/DoddiSkula/hidden-traitor-backend) (server-side) is made with [Express.js](https://expressjs.com/) and Socket.IO.

## Game Rules

At the start of a game one player is randomly assigned the traitor role while the other players get the agent role. Each player gets to choose one of three actions each turn:

- Spy: look at another player's role.
- Swap: swap the roles of two players.
- Confirm: look at your own role (it might have changed).

At the end of turn 3 a voting starts where players vote on who they think the traitor is. If the traitor is the most voted player then the agents win, otherwise the traitor wins.


![alt text](https://github.com/DoddiSkula/hidden-traitor/blob/main/src/images/agents.png "Hidden Traitor Agents")
