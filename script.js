document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('container');
    const balls = document.querySelectorAll('.ball');

    balls.forEach(ball => {
        const initialDirection = getRandomDirection();
        ball.direction = initialDirection
        moveBall(ball, initialDirection);
    });

    function moveBall(ball, direction) {
        const speed = 1;

        let xSpeed = speed * ball.direction.x;
        let ySpeed = speed * ball.direction.y;

        function updatePosition() {
            const rect = ball.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            balls.forEach(otherBall => {
                if (otherBall !== ball) {
                    const otherRect = otherBall.getBoundingClientRect();

                    if (
                        rect.top < otherRect.bottom &&
                        rect.bottom > otherRect.top &&
                        rect.left < otherRect.right &&
                        rect.right > otherRect.left
                    ) {
                        xSpeed *= -1;
                        ySpeed *= -1;
                    }
                }
            });

            
            var changed = false

            if (rect.left == containerRect.left && rect.top == 0) {
                var pos_vals = [[0,1],[1,0],[1,1]]; // top left
                changed = true;
            } else if  (rect.right == containerRect.right && rect.top == 0) {
                var pos_vals = [[-1,0],[0,1],[-1,1]];  // top right
                changed = true;
            } else if (rect.bottom == containerRect.bottom && rect.left == containerRect.left) {
                
                var pos_vals = [[0,-1],[1,0],[1,-1]]; // bottom left
                changed = true;
            } else if (rect.bottom == containerRect.bottom && rect.right == containerRect.right) {
                var pos_vals = [[-1,0],[0,-1],[-1,-1]];
                var changed = true;
            }
            if (changed) {
                var randtemp = Math.round(Math.random()*2);
                var xvals = pos_vals[randtemp][0] 
                var yvals = pos_vals[randtemp][1] 

                ball.direction.x = xvals;
                ball.direction.y = yvals;
                xSpeed = speed * ball.direction.x;
                ySpeed = speed * ball.direction.y;
            }
            console.log(xSpeed)
            console.log(ySpeed)

            



            ball.style.top = Math.min(Math.max(rect.top + ySpeed, containerRect.top), containerRect.bottom - rect.height) + 'px';
            ball.style.left = Math.min(Math.max(rect.left + xSpeed, containerRect.left), containerRect.right - rect.width) + 'px';

            requestAnimationFrame(updatePosition);
        }

        updatePosition();
    }

    function getRandomDirection() {
        const randomInt = Math.floor(Math.random() * 4);
        switch (randomInt) {
            case 0: return { x: 0, y: 1 }; // Up
            case 1: return { x: 1, y: 0 }; // Right
            case 2: return { x: 0, y: -1 }; // Down
            case 3: return { x: -1, y: 0 }; // Left
            default: return { x: 0, y: -1 }; // This should never happen
        }
    }
})