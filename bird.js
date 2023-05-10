class Bird {
    constructor() {
        this.spritewidth = 600;
        this.spriteheight = 400;
        this.width = this.spritewidth / 10;
        this.height = this.spriteheight / 10;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 5 + 2;
        this.directionY = Math.random() * 5 - 1;
        this.deleteentity = false;
        this.image = new Image();
        this.image.src = 'img/sprites.png'
        this.frame = 0;
        this.maxframe = 6;
        this.sinceflaptime = 0;
        this.flapduration = Math.random() * 500 + 50;
        this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)
            , Math.floor(Math.random() * 255)];
        this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] +
            ',' + this.randomColors[2] + ')';
    }
    update(timedifference) {
        if (this.y < 0 || this.y > canvas.height - this.height) {
            this.directionY = this.directionY * -1;
        }
        this.x -= this.directionX;
        this.y += this.directionY;
        if (this.x < 0 - this.width) this.deleteentity = true;
        this.sinceflaptime += timedifference;
        if (this.sinceflaptime > this.flapduration) {
            if (this.frame > this.maxframe) this.frame = 0;
            else this.frame++;
            this.sinceflaptime = 0;
        }
        if(this.x <0 -this.width) gameend=true;

    }
    draw() {
        collcontext.fillStyle = this.color;
        collcontext.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frame * this.spritewidth, 0,
            this.spritewidth, this.spriteheight, this.x, this.y, this.width, this.height);
    }
}