class particle {
    constructor() {
        this.position = { x: width / 2, y: height / 2 };
        this.rays = [];
        for (let i = 0; i < 360; i += 1) {
            this.rays.push(new ray(this.position, i));
        }
    }

    update() {

        for (let i = 0; i < this.rays.length; i++) {
            this.rays[i].pos.x = mousePos.x;
            this.rays[i].pos.y = mousePos.y;
        }
    }

    look(walls) {
        for (let ray of this.rays) {
            let closest = null;
            let record = Infinity;
            for (let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    const d = distanceBetweenVector(this.position, pt);
                    if (record > d) {
                        record = d;
                        closest = pt;
                    }
                }
            }
            if (closest) {
                context.beginPath();
                context.moveTo(this.position.x, this.position.y);
                context.lineTo(closest.x, closest.y);
                context.lineWidth = .1;
                context.stroke();
            }
        }

    }

}

