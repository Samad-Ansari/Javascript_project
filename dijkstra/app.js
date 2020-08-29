const squares = document.querySelectorAll('.grid div')
var x = document.getElementsByClassName("banner");
let dir = [-1, 1, -10, 10]
board = []
limitright = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99]
limitleft = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
wall = []
let plates = 0;

for(var i=0; i<100; i++) {
	head = i-10;
	tail = i+10;
	board[i] = [1, 1, 1, 1];
	if(limitleft.includes(i)) {
		board[i][0] = 0;
	}
	if(limitright.includes(i)){
		board[i][1] = 0;
	}
	if(head < 0) {
		board[i][2] = 0;
	}
	if(tail > 99) {
		board[i][3] = 0;
	}

}


dist = []
visited = []
parent = []

function printPath(j) {

	if(parent[j] == 0) {
		return;
	}
	squares[parent[j]].classList.add('move')
	printPath(parent[j]);

}


function dijkstra(start, stop) {

	for(let i=0; i<100; i++) {
		dist[i] = 999;
		visited[i] = false;
		parent[i] = -1;
	}
	dist[start] = 0;
	let n = 2;
	connectPath(0);
	for(let j=1; j<10; j++) {
		let i = j;
		connectPath(i)
		for(var k=1; k<n; k++) {
			i = i + dir[3]
			connectPath(i)
		}	
		i = j*10
			connectPath(i);
		for(var k=1; k<n; k++) {
			i = i + dir[1]
			connectPath(i);
		}
		n++;

	}

}

function connectPath(u){
		visited[u] = true;
			if(wall.includes(u)){
				return
			}
		for(let l= 0; l < 4; l++) {
			let v = u + dir[l]
			if(wall.includes(v)){
				continue
			}
			else if(board[u][l] != 0 && dist[u] + board[u][l] < dist[v]) {
				parent[v] = u;
				dist[v] = dist[u] + board[u][l];
			}
			else if(!visited[v] && parent[u] == -1){
				parent[u] = v
			}
			v = 0;
		}
}

document.addEventListener('DOMContentLoaded', () => {
	for(var i = 0, len = squares.length; i < len; i++)
	(function(index) {
			squares[i].onclick = function() {
				let elem = document.querySelectorAll('.pallet')
				if(plates === 0) {
 					wall.push(index)
 					wallstop(index)
					squares[index].classList.add('wall')
				}
				else {
					for(var i =0; i< elem.length; i++){
					elem[i].classList.remove('end')
					elem[i].classList.remove('move')
					}
					start = 0;
					squares[start].classList.add('start')
					squares[index].classList.add('end')
					dijkstra(start, index)
					printPath(index)	
				}
			}
	})(i)
})

function myFunction() {
}
function wallpoint() {
	plates = 0;
 	x[0].innerHTML = "Wall is Selected";
}

function endpoint() {
	plates = 1;
 	x[0].innerHTML = "End is Selected";
}

function wallstop(i) {
	board[i][0] = 0
	board[i][1] = 0
	board[i][2] = 0
	board[i][3] = 0
	board[i-1][1] = 0;
	board[i-10][3] = 0
	board[i+10][2] = 0
	board[i+1][0] = 0
}