class Bomb {
    constructor(x,y,size) 
    {
       this.image=new Image();
       this.image.src='img/explosion.png'
       this.spritewidth=300;
       this.spriteheight=268;
       this.size=size;
       this.x=x;
       this.y=y;
       this.frame=0;
       this.timesincelastframe=0;
       this.frameinterval=200;
       this.deleteentity=false;
    }
    update(timedifference) 
    {
        this.timesincelastframe += timedifference;
        if(this.timesincelastframe > this.frameinterval)
        {
            this.frame++
            if(this.frame >5) this.deleteentity=true;
        }
    }
    draw() {
        context.drawImage(this.image, this.frame * this.spritewidth, 0, this.spritewidth, 
            this.spriteheight, this.x, this.y-this.size/4, 
            this.size, this.size);
    }
}