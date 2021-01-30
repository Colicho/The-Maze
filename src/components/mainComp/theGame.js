var game = undefined;

class Vertex{
    constructor(node){
        this.node = node;
        this.connections = [];
        this.distance = 9007199254740992
        this.visited = false;
        this.previousNode = null;
        this.weight = 1
    }
    addConnection(neighbor){
        this.connections.push(neighbor)       
    }
    setDistance(distance){
        this.distance = distance;
    }
    setPreviousNode(previous){
        this.previousNode = previous;
    }
    setVisited(){
        this.visited = true;
    }
}

class Graph{
    constructor(){
        this.vertexDict = {}
        this.vertices = 0
    }
    addVertex(node){
        //ÄNDRA PÅ DICTIORNARY, INTE SAMMA SOM PYTHON
        this.vertices++
        let newVertex = new Vertex(node)
        this.vertexDict[node] = newVertex

    }
    addEdge(frm, to){
        if (!(frm in this.vertexDict)){
            this.addVertex(frm)
        }
        if (!(to in this.vertexDict)){
            this.addVertex(to)
        }
        this.vertexDict[frm].addConnection(this.vertexDict[to])
        this.vertexDict[to].addConnection(this.vertexDict[frm])
    }
}

class Maze{
    constructor(width, height){
        this.matrix = []
        this.width = width + 2
        this.height = height + 2
        this.unvisitedNodes = []
        //Mapping the maze
        for (let row = 0; row < this.height; row++){
            this.matrix.push([])
            for (let column = 0; column < this.width; column++){
                let rnd = Math.random()
                     
                if ((row === 0) || (row === this.height - 1) || (column === 0) || (column === this.width - 1)){
                    this.matrix[row].push('1')
                }
                else if (rnd >= 0.5){
                    this.matrix[row].push('2')
                }
                else{
                    this.matrix[row].push('O')
                    if (row !== 0 && row !== this.height-1 && column !== 0 && column !== this.width -1){
                        this.unvisitedNodes.push(row*width - width + column)
                    }
                }
            }
        }
        for (let column = 0; column < this.width-1; column++){
            document.getElementById('board').style.gridTemplateColumns+= " auto";
        }
        for (let row = 0; row < this.height-1; row++){
            document.getElementById('board').style.gridTemplateRows+= " auto";
        }
        if (!(this.unvisitedNodes.includes(1))){
            this.unvisitedNodes.push(1)
        }  
        if (!(this.unvisitedNodes.includes(width*height))){
            this.unvisitedNodes.push(width*height)
        }
        this.matrix[1][1] = "#"
        this.matrix[this.height-2][this.width-2] = "E"
    }

    getMaze(item){
        //document.getElementById('board').innerHTML = this.matrix
        for (let i = 0; i < item.length; i++){
            for (let x = 0; x < item[i].length; x++){
                let square = document.createElement('div');
                switch(item[i][x]){
                    case '1':
                        square.className = 'squareB';
                        break;
                    case '2':
                        square.className = 'squareW';
                        break;
                    case 'O':
                        square.className = 'squareG';
                        break;
                    case '#':
                        square.className = 'squareP';
                        break;
                    case 'E':
                        square.className = 'squareE';
                        break;
                    case '@':
                        square.className = 'squareO';
                        break;
                    default:
                        break
                }
                document.getElementById('board').appendChild(square)
            }
        }
    }
    getGame(){
        let fastestRoute = this.bestRoute()
        if (fastestRoute === false){
            return false
        }
        this.getMaze(this.matrix)
        this.position = [1,1]
        this.userMoves = []
        //The game will last until the player reaches the goal
        /*
        document.write("Good job! You cleared the maze in " + this.userMoves.lenth.toString(10) + " moves!")
        document.write("The least amount of moves required for traversing through the maze is " + fastestRoute.toString(10) + "!")
        return true*/
        
    }
    bestRoute(){
        let g = new Graph()
        //Adding all of the vertices
        for (let index = 0; index < this.unvisitedNodes.length; index++) {
            g.addVertex(this.unvisitedNodes[index])         
        }
        var position = []
        //Adding all of the possible routes/edges
        for (var i = 0; i < this.unvisitedNodes.length; i++){
            this.index = -1
            var rounding = Math.floor(this.unvisitedNodes[i] / (this.width - 2))
            if (this.unvisitedNodes[i] % (this.width - 2) === 0){
                position = [rounding, this.unvisitedNodes[i] - (this.width - 2)*(rounding-1)]
            }
            else{
                position = [rounding + 1, this.unvisitedNodes[i] - rounding*(this.width - 2)]
            }
            while(true){
                var newPosition = this.validInput(position, null, "bestRoute")
                if (!newPosition){
                    break
                }
                g.addEdge(this.width*(position[0]-1) + position[1] - 2*position[0] + 2, this.width*(newPosition[0]-1) + newPosition[1] - 2*newPosition[0] + 2)
            }
        }
        return this.djikstra(g, g.vertexDict[1])
    }
    djikstra(graph, startNode){
        startNode.setDistance(0)
        var vertex = startNode
        vertex.setPreviousNode(vertex)
        var queue = []
        queue.push(vertex)
        //Algorithm for finding the shortest path from a start node
        while (graph.vertexDict[(this.width-2)*(this.height-2)].distance === 9007199254740992){
            vertex = queue[0]
            for(var i = 0; i < vertex.connections.length; i++){
                if (vertex.connections[i].previousNode == null || vertex.distance + vertex.connections[i].connections[vertex] < vertex.connections[i].distance){
                    queue.push(vertex.connections[i])
                    vertex.connections[i].setPreviousNode(vertex)
                    vertex.connections[i].setDistance(vertex.distance + vertex.connections[i].connections[vertex])
                }
            }
            vertex.setVisited()
            queue.shift()

            if (queue.length === 0){
                break
            }
        }
        if (graph.vertexDict[(this.width-2)*(this.height-2)].distance === 9007199254740992){
            //document.write("Unfortunately, there is no solution to this maze :(")
            return false
        }
        else{
            return graph.vertexDict[(this.width-2)*(this.height-2)].distanceboard
        }
    }
    getValidMoves(){
        var validMoves = ["w", "a", "s", "d", "wa", "wd", "as", "sd"]
        this.index++
        if (this.index === validMoves.length){
            return false
        }
        else{
            return validMoves[this.index]
        }
    }
    validInput(position, userMoves = null, bestRoute = null, userInput = null){
        while(true){
            if (bestRoute != null){
                userInput = this.getValidMoves()
                if (userInput === false){
                    return false
                }
            }
            //Check if the user move is valid or not
            if (userInput === "w"){
                if (position[0] !== 1 && this.matrix[position[0]-1][position[1]] !== '2'){
                    if (userMoves != null){
                        userMoves.push([position[0]-1, position[1]])
                    }
                    return [position[0]-1, position[1]]
                }
            }
            else if (userInput === "a"){
                if (position[1] !== 1 && this.matrix[position[0]][position[1]-1] !== '2'){
                    if (userMoves != null){
                        userMoves.push([position[0], position[1]-1])
                    }
                    return [position[0], position[1]-1]
                }
            }
            else if (userInput === "s"){
                if (position[0] !== this.height-2 && this.matrix[position[0]+1][position[1]] !== '2'){
                    if (userMoves != null){
                        userMoves.push([position[0]+1, position[1]])
                    }
                    return [position[0]+1, position[1]]
                }
            }
            else if (userInput === "d"){
                if (position[1] !== this.width-2 && this.matrix[position[0]][position[1]+1] !== '2'){
                    if (userMoves != null){
                        userMoves.push([position[0], position[1]+1])
                    }
                    return [position[0], position[1]+1]
                }
            }
            else if (userInput === "wd"){
                if (position[0] !== 1 && position[1] !== this.width-2 && this.matrix[position[0]-1][position[1]+1] !== '2'){
                    if (userMoves != null){
                        userMoves.push([position[0]-1, position[1]+1])
                    }
                    return [position[0]-1, position[1]+1]
                }
            }
            else if (userInput === "wa"){
                if (position[0] !== 1 && position[1] !== 1 && this.matrix[position[0]-1][position[1]-1] !== '2'){
                    if (userMoves != null){
                        userMoves.push([position[0]-1, position[1]-1])
                    }
                    return [position[0]-1, position[1]-1]
                }
            }
            else if (userInput === "as"){
                if (position[1] !== 1 && position[0] !== this.height-2 && this.matrix[position[0]+1][position[1]-1] !== '2'){
                    if (userMoves != null){
                        userMoves.push([position[0]+1, position[1]-1])
                    }
                    return [position[0]+1, position[1]-1]
                }
            }
            else if (userInput === "sd"){
                if (position[0] !== this.height-2 && position[1] !== this.width-2 && this.matrix[position[0]+1][position[1]+1] !== '2'){
                    if (userMoves != null){
                        userMoves.push([position[0]+1, position[1]+1])
                    }
                    return [position[0]+1, position[1]+1]
                }
            }
            else if (userInput === "b"){
                if (userMoves.length !== 0){
                    userMoves.pop()
                    this.matrix[position[0]][position[1]] = "O" 
                    if (userMoves.length !== 0){
                        return userMoves[userMoves.length-1]
                    }
                    else{
                        return [1,1]
                    }
                }
            }
            return position
        }
    }
}

function Begin(){
    const myNode = document.getElementById("board");
    document.getElementById('board').style.gridTemplateColumns="auto";
    document.getElementById('board').style.gridTemplateRows="auto";
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    game = new Maze(25,12)
    document.getElementById("buttons").style.display = "grid";
    if(game.getGame() === false){
        return Begin()
    }
    document.getElementById("beginDiv").style.gridColumn = "1"
    
    //document.getElementById('board').appendChild(document.createTextNode(game.matrix)) 
}

function Direction(dir){
    let positionNotChanged = game.position
    game.matrix[game.position[0]][game.position[1]] = "@"
    game.position = game.validInput(game.position, game.userMoves, null, dir)
    if (game.position!==positionNotChanged){
        game.matrix[game.position[0]][game.position[1]] = '#'
        const myNode = document.getElementById("board");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        game.getMaze(game.matrix)
    }
    if ((game.position[0] === game.height-2) && (game.position[1] === game.width-2)){
        document.getElementById("winning").style.visibility = "visible";
    }
}

const func = {
    Begin,
    Direction,
}

export default func