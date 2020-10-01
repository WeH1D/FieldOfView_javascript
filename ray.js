class ray {
    constructor(position, angle) {
        this.pos = { x: position.x, y: position.y };
        this.dir = directionFormAngle(toRadians(angle));
    }

    cast(wall) {
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        if (den == 0)
            return;

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

        if (t > 0 && t < 1 && u > 0) {
            const point = { x: 0, y: 0 };
            point.x = x1 + t * (x2 - x1);
            point.y = y1 + t * (y2 - y1);
            return point;
        }
        else
            return;
    };
}

function normalizeVector(vector) {
    var mag = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    vector.x /= mag;
    vector.y /= mag;
    return vector;
}

function directionFormAngle(angle) {
    return {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
}

function toRadians(degree) {
    return degree * Math.PI / 180;
}

function distanceBetweenVector(vector1, vector2) {
    return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2));
}   