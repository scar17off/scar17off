function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function* zip(...generators) {
    while (true) {
        for (let i = 0; i < generators.length; i++) {
            let {
                value,
                done
            } = generators[i].next();
            if (done) return;
            yield value;
        }
    }
}

function* horizontalRandom(x1, y1, x2, y2) {
    for (let y = y1; y <= y2; y++) {
        let pixels = [];
        for (let x = x1; x <= x2; x++) pixels.push(x);
        shuffleArray(pixels);
        for (let x = 0; x < pixels.length; x++) yield [pixels[x], y];
    }
}

function* verticalRandom(x1, y1, x2, y2) {
    for (let x = x1; x <= x2; x++) {
        let pixels = [];
        for (let y = y1; y <= y2; y++) pixels.push(y);
        shuffleArray(pixels);
        for (let y = 0; y < pixels.length; y++) yield [x, pixels[y]];
    }
}

function* horizontalRandomStripes(x1, y1, x2, y2) {
    const stripePositions = new Set();

    const numberOfStripes = Math.floor(Math.random() * (y2 - y1 + 1));
    while (stripePositions.size < numberOfStripes) {
        stripePositions.add(Math.floor(Math.random() * (y2 - y1 + 1)) + y1);
    }

    for (let y = y1; y <= y2; y++) {
        if (stripePositions.has(y)) {
            continue;
        }

        for (let x = x1; x <= x2; x++) {
            yield [x, y];
        }
    }

    for (const y of stripePositions) {
        for (let x = x1; x <= x2; x++) {
            yield [x, y];
        }
    }
}

function* verticalRandomStripes(x1, y1, x2, y2) {
    const stripePositions = new Set();

    const numberOfStripes = Math.floor(Math.random() * (x2 - x1 + 1));
    while (stripePositions.size < numberOfStripes) {
        stripePositions.add(Math.floor(Math.random() * (x2 - x1 + 1)) + x1);
    }

    for (let x = x1; x <= x2; x++) {
        if (stripePositions.has(x)) {
            continue;
        }

        for (let y = y1; y <= y2; y++) {
            yield [x, y];
        }
    }

    for (const x of stripePositions) {
        for (let y = y1; y <= y2; y++) {
            yield [x, y];
        }
    }
}

function* horizontal(x1, y1, x2, y2) {
    for (let y = y1; y <= y2; y++)
        for (let x = x1; x <= x2; x++) yield [x, y];
}

function* vertical(x1, y1, x2, y2) {
    for (let x = x1; x <= x2; x++)
        for (let y = y1; y <= y2; y++) yield [x, y];
}

function* horizontalReverse(x1, y1, x2, y2) {
    for (let y = y2; y >= y1; y--)
        for (let x = x2; x >= x1; x--) yield [x, y];
}

function* verticalReverse(x1, y1, x2, y2) {
    for (let x = x2; x >= x1; x--)
        for (let y = y2; y >= y1; y--) yield [x, y];
}

function* horizontalMirror(x1, y1, x2, y2) {
    for (let y = y1; y <= y2; y++)
        for (let x = x2; x >= x1; x--) yield [x, y];
}

function* verticalMirror(x1, y1, x2, y2) {
    for (let x = x1; x <= x2; x++)
        for (let y = y2; y >= y1; y--) yield [x, y];
}

function* horizontalReverseMirror(x1, y1, x2, y2) {
    for (let y = y2; y >= y1; y--)
        for (let x = x1; x <= x2; x++) yield [x, y];
}

function* verticalReverseMirror(x1, y1, x2, y2) {
    for (let x = x2; x >= x1; x--)
        for (let y = y1; y <= y2; y++) yield [x, y];
}

function* random(x1, y1, x2, y2) {
    let pixels = [];
    for (let x = x1; x <= x2; x++)
        for (let y = y1; y <= y2; y++) pixels.push([x, y]);
    shuffleArray(pixels);
    for (let i = 0; i < pixels.length; i++) yield pixels[i];
}

function* checker(x1, y1, x2, y2) {
    for (let y = y1; y <= y2; y++)
        for (let x = x1; x <= x2; x++)
            if ((x + y) % 2) yield [x, y];
}

function* checkerFill(x1, y1, x2, y2) {
    yield* checker(x1, y1, x2, y2);
    yield* horizontal(x1, y1, x2, y2);
}

function* ttPoints(x1, y1, x2, y2) {
    for (let y = y1; y <= y2; y += 4)
        for (let x = x1; x <= x2; x += 4) yield [x, y];
    for (let y = y1; y <= y2; y += 2)
        for (let x = x1; x <= x2; x += 2) yield [x, y];
}

function* ttLines(x1, y1, x2, y2) {
    for (let y = y1; y <= y2; y++)
        for (let x = x1; x <= x2; x += 4) yield [x, y];
    for (let y = y1; y <= y2; y++)
        for (let x = x1; x <= x2; x += 2) yield [x, y];
}

function* surround(x1, y1, x2, y2) {
    yield* zip(horizontal(x1, y1, x2, y2), vertical(x1, y1, x2, y2), horizontalReverse(x1, y1, x2, y2), verticalReverse(x1, y1, x2, y2))
}

function* splices(x1, y1, x2, y2) {
    yield* zip(horizontal(x1, y1, x2, y2), vertical(x1, y1, x2, y2), horizontalReverse(x1, y1, x2, y2), verticalReverse(x1, y1, x2, y2), horizontalMirror(x1, y1, x2, y2), verticalMirror(x1, y1, x2, y2), horizontalReverseMirror(x1, y1, x2, y2), verticalReverseMirror(x1, y1, x2, y2))
}

function* sandwich(x1, y1, x2, y2) {
    yield* zip(horizontal(x1, y1, x2, y2), horizontalReverse(x1, y1, x2, y2), horizontalMirror(x1, y1, x2, y2), horizontalReverseMirror(x1, y1, x2, y2))
}

function* compact(x1, y1, x2, y2) {
    yield* zip(vertical(x1, y1, x2, y2), verticalReverse(x1, y1, x2, y2), verticalMirror(x1, y1, x2, y2), verticalReverseMirror(x1, y1, x2, y2))
}

function* bloom(x1, y1, x2, y2) {
    let x = Math.floor((x1 + x2) / 2);
    let y = Math.floor((y1 + y2) / 2);
    let radius = 0;
    let max = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    while (radius <= max) {
        radius++;
        for (let Y = y1; Y <= y2; Y++) {
            for (let X = x1; X <= x2; X++) {
                if ((X - x) * (X - x) + (Y - y) * (Y - y) < radius * radius) {
                    yield [X, Y];
                } else continue;
            }
        }
    }
}

function* bloomReverse(x1, y1, x2, y2) {
    let x = Math.floor((x1 + x2) / 2);
    let y = Math.floor((y1 + y2) / 2);
    let radius = Math.ceil(Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2));
    while (radius >= 0) {
        for (let Y = y1; Y <= y2; Y++) {
            for (let X = x1; X <= x2; X++) {
                if ((X - x) * (X - x) + (Y - y) * (Y - y) >= radius * radius) {
                    yield [X, Y];
                } else continue;
            }
        }
        radius--;
    }
}

function* blooms(x1, y1, x2, y2) {
    yield* zip(bloom(x1, y1, x2, y2), bloomReverse(x1, y1, x2, y2));
}

function* diagonalTL(x1, y1, x2, y2) {
    let width = x2 - x1 + 1;
    let height = y2 - y1 + 1;
    for (let x = 0; x < width + height - 1; x++) {
        for (let y = Math.max(0, x - width + 1); y < Math.min(height, x + 1); y++) {
            yield [x1 + x - y, y1 + y];
        }
    }
}

function* diagonalTR(x1, y1, x2, y2) {
    let width = x2 - x1 + 1;
    let height = y2 - y1 + 1;
    for (let x = 0; x < width + height - 1; x++) {
        for (let y = Math.max(0, x - width + 1); y < Math.min(height, x + 1); y++) {
            yield [x2 - x + y, y1 + y];
        }
    }
}

function* diagonalsTB(x1, y1, x2, y2) {
    yield* zip(diagonalTL(x1, y1, x2, y2), diagonalTR(x1, y1, x2, y2));
}

function* diagonalBL(x1, y1, x2, y2) {
    let width = x2 - x1 + 1;
    let height = y2 - y1 + 1;
    for (let x = 0; x < width + height - 1; x++) {
        for (let y = Math.max(0, x - width + 1); y < Math.min(height, x + 1); y++) {
            yield [x1 + x - y, y2 - y];
        }
    }
}

function* diagonalBR(x1, y1, x2, y2) {
    let width = x2 - x1 + 1;
    let height = y2 - y1 + 1;
    for (let x = 0; x < width + height - 1; x++) {
        for (let y = Math.max(0, x - width + 1); y < Math.min(height, x + 1); y++) {
            yield [x2 - x + y, y2 - y];
        }
    }
}

function* diagonalsBT(x1, y1, x2, y2) {
    yield* zip(diagonalBL(x1, y1, x2, y2), diagonalBR(x1, y1, x2, y2));
}

function* rhombic(x1, y1, x2, y2) {
    yield* zip(diagonalsTB(x1, y1, x2, y2), diagonalsBT(x1, y1, x2, y2));
}

function* spiralTL(startX, startY, endX, endY) {
    while (startX <= endX && startY <= endY) {
        for (let i = startX; i <= endX; i++) {
            yield [startY, i];
        }
        startY++;

        for (let i = startY; i <= endY; i++) {
            yield [i, endX];
        }
        endX--;

        if (startY <= endY) {
            for (let i = endX; i >= startX; i--) {
                yield [endY, i];
            }
            endY--;
        }

        if (startX <= endX) {
            for (let i = endY; i >= startY; i--) {
                yield [i, startX];
            }
            startX++;
        }
    }
}

function* spiralBR(startX, startY, endX, endY) {
    while (startX <= endX && startY <= endY) {
        for (let i = endX; i >= startX; i--) {
            yield [endY, i];
        }
        endY--;

        if (startX <= endX) {
            for (let i = endY; i >= startY; i--) {
                yield [i, startX];
            }
            startX++;
        }

        for (let i = startX; i <= endX; i++) {
            yield [startY, i];
        }
        startY++;

        if (startY <= endY) {
            for (let i = startY; i <= endY; i++) {
                yield [i, endX];
            }
            endX--;
        }
    }
}

function* chunkMode(x1, y1, x2, y2) {
    for (let cX = 0; cX < Math.ceil((x2 - x1) / 16); cX++) {
        for (let y = y1; y <= y2; y++) {
            for (let x = 0; x < 16; x++) {
                let ox = x1 + x + cX * 16;
                if (ox > x2) continue;
                yield [ox, y];
            }
        }
    }
}

function* chunk4Mode(x1, y1, x2, y2) {
    for (let cX = 0; cX < Math.ceil((x2 - x1) / 4); cX++) {
        for (let y = y1; y <= y2; y++) {
            for (let x = 0; x < 4; x++) {
                let ox = x1 + x + cX * 4;
                if (ox > x2) continue;
                yield [ox, y];
            }
        }
    }
}

function* chunkSpiralMode(x1, y1, x2, y2) {
    const chunkSize = 16;
    const chunksPerRow = Math.ceil((x2 - x1 + 1) / chunkSize);
    const chunksPerColumn = Math.ceil((y2 - y1 + 1) / chunkSize);

    for (let chunkRow = 0; chunkRow < chunksPerColumn; chunkRow++) {
        for (let chunkCol = 0; chunkCol < chunksPerRow; chunkCol++) {
            const chunkX1 = x1 + chunkCol * chunkSize;
            const chunkY1 = y1 + chunkRow * chunkSize;
            const chunkX2 = Math.min(chunkX1 + chunkSize - 1, x2);
            const chunkY2 = Math.min(chunkY1 + chunkSize - 1, y2);

            const chunkSpiral = spiral(chunkX1, chunkY1, chunkX2, chunkY2);

            for (const [x, y] of chunkSpiral) {
                yield [x, y];
            }
        }
    }
}

function* construction(x1, y1, x2, y2) {
    yield* zip(horizontalRandomStripes(x1, y1, x2, y2), verticalRandomStripes(x1, y1, x2, y2));
}

function* centeredCircularFill(x1, y1, x2, y2) {
    const centerX = Math.floor((x1 + x2) / 2);
    const centerY = Math.floor((y1 + y2) / 2);

    const contourPixels = [];

    for (let x = x1; x <= x2; x++) {
        contourPixels.push([x, y1]);
        contourPixels.push([x, y2]);
    }

    for (let y = y1 + 1; y < y2; y++) {
        contourPixels.push([x1, y]);
        contourPixels.push([x2, y]);
    }

    for (const [x, y] of contourPixels) {
        yield* line(centerX, centerY, x, y);
    }
}

function* doubleSideFill(x1, y1, x2, y2) {
    const visited = new Set();

    function* drawLineRecursive(x1, y1, x2, y2) {
        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);
        const sx = x1 < x2 ? 1 : -1;
        const sy = y1 < y2 ? 1 : -1;
        let err = dx - dy;

        while (true) {
            yield [x1, y1];
            visited.add(`${x1},${y1}`);

            if (x1 === x2 && y1 === y2) {
                break;
            }

            const e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x1 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y1 += sy;
            }
        }
    }

    for (let y = y1; y <= y2; y++) {
        for (let x = x1; x <= x2; x++) {
            if (!visited.has(`${x},${y}`)) {
                yield* drawLineRecursive(x, y, x2, y2);
            }
        }
    }
}

function* drawLine(x1, y1, x2, y2) {
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const sx = x1 < x2 ? 1 : -1;
    const sy = y1 < y2 ? 1 : -1;
    let err = dx - dy;

    while (true) {
        yield [x1, y1];

        if (x1 === x2 && y1 === y2) {
            break;
        }

        const e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x1 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y1 += sy;
        }
    }
}

function* line(x1, y1, x2, y2) {
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const sx = (x1 < x2) ? 1 : -1;
    const sy = (y1 < y2) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        yield [x1, y1];
        if (x1 === x2 && y1 === y2) break;
        const e2 = 2 * err;
        if (e2 > -dy) { err -= dy; x1 += sx; }
        if (e2 < dx) { err += dx; y1 += sy; }
    }
}

function* growingCircle(x1, y1, x2, y2) {
    const centerX = (x1 + x2) / 2;
    const centerY = (y1 + y2) / 2;
    const maxRadius = Math.sqrt(Math.pow(x2 - centerX, 2) + Math.pow(y2 - centerY, 2));
    let currentRadius = 0;
    const step = 1;
    const visited = new Set();

    while (currentRadius <= maxRadius) {
        for (let y = y1; y <= y2; y++) {
            for (let x = x1; x <= x2; x++) {
                const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
                if (distance <= currentRadius && x >= x1 && x <= x2 && y >= y1 && y <= y2) {
                    const pixel = `${x},${y}`;
                    if (!visited.has(pixel)) {
                        yield [x, y];
                        visited.add(pixel);
                    }
                }
            }
        }
        currentRadius += step;
    }
}

function* dotFill(x1, y1, x2, y2) {
    const patterns = [checker, ttPoints, ttLines];
    const diagonals = [diagonalsTB, diagonalsBT];
    let currentPattern = 0;
    const visited = new Set();
    let allPatternsExhausted = false;

    while (!allPatternsExhausted) {
        let generator;
        if (currentPattern < patterns.length) {
            generator = patterns[currentPattern](x1, y1, x2, y2);
        } else if (currentPattern === patterns.length) {
            generator = zip(...diagonals.map(diagonal => diagonal(x1, y1, x2, y2)));
        } else {
            allPatternsExhausted = true;
            break;
        }

        for (let value of generator) {
            const pixel = `${value[0]},${value[1]}`;
            if (!visited.has(pixel)) {
                yield value;
                visited.add(pixel);
            }
        }

        currentPattern = (currentPattern + 1) % (patterns.length + diagonals.length);
    }
}

function* dualSpiral(x1, y1, x2, y2) {
    const centerX = Math.floor((x1 + x2) / 2);
    const centerY = Math.floor((y1 + y2) / 2);
    let leftSpiralX = centerX;
    let leftSpiralY = centerY;
    let rightSpiralX = centerX;
    let rightSpiralY = centerY;
    let step = 0;
    const visited = new Set();
    let direction = 0;

    if (centerX >= x1 && centerX <= x2 && centerY >= y1 && centerY <= y2) {
        const centerPixel = `${centerX},${centerY}`;
        if (!visited.has(centerPixel)) {
            yield [centerX, centerY];
            visited.add(centerPixel);
        }
    }

    while (leftSpiralX >= x1 || rightSpiralX <= x2) {
        if (step > 0) {
            for (let i = 0; i < step; i++) {
                switch (direction) {
                    case 0: // right
                        leftSpiralX++;
                        rightSpiralX--;
                        break;
                    case 1: // down
                        leftSpiralY++;
                        rightSpiralY++;
                        break;
                    case 2: // left
                        leftSpiralX--;
                        rightSpiralX++;
                        break;
                    case 3: // up
                        leftSpiralY--;
                        rightSpiralY--;
                        break;
                }
                if (leftSpiralX >= x1 && leftSpiralX <= x2 && leftSpiralY >= y1 && leftSpiralY <= y2) {
                    const leftPixel = `${leftSpiralX},${leftSpiralY}`;
                    if (!visited.has(leftPixel)) {
                        yield [leftSpiralX, leftSpiralY];
                        visited.add(leftPixel);
                    }
                }
                if (rightSpiralX >= x1 && rightSpiralX <= x2 && rightSpiralY >= y1 && rightSpiralY <= y2) {
                    const rightPixel = `${rightSpiralX},${rightSpiralY}`;
                    if (!visited.has(rightPixel)) {
                        yield [rightSpiralX, rightSpiralY];
                        visited.add(rightPixel);
                    }
                }
            }
        }
        direction = (direction + 1) % 4;
        if (direction % 2 == 0) step++;
    }
}

window.patterns = [
    horizontal,
    vertical,
    horizontalReverse,
    verticalReverse,
    horizontalMirror,
    verticalMirror,
    horizontalReverseMirror,
    verticalReverseMirror,
    horizontalRandom,
    verticalRandom,
    horizontalRandomStripes,
    verticalRandomStripes,
    random,
    checker,
    checkerFill,
    ttPoints,
    ttLines,
    surround,
    splices,
    sandwich,
    compact,
    blooms,
    diagonalTL,
    diagonalTR,
    diagonalsTB,
    diagonalBL,
    diagonalBR,
    diagonalsBT,
    rhombic,
    spiralTL,
    spiralBR,
    chunkMode,
    chunkSpiralMode,
    chunk4Mode,
    construction,
    centeredCircularFill,
    doubleSideFill,
    growingCircle,
    dotFill,
    dualSpiral
];
let I = 0;

window.constants = {
    Horizontal: I++,
    Vertical: I++,
    'Horizontal Reverse': I++,
    'Vertical Reverse': I++,
    'Horizontal Mirror': I++,
    'Vertical Mirror': I++,
    'Horizontal Reverse Mirror': I++,
    'Vertical Reverse Mirror': I++,
    "Horizontal random": I++,
    "Vertical random": I++,
    "Horizontal random stripes": I++,
    "Vertical random stripes": I++,
    Random: I++,
    Checker: I++,
    'Checker Fill': I++,
    '32 Points': I++,
    '32 Lines': I++,
    Surround: I++,
    Splices: I++,
    Sandwich: I++,
    Compact: I++,
    Blooms: I++,
    'Diagonal TL': I++,
    'Diagonal TR': I++,
    'Diagonals TB': I++,
    'Diagonal BL': I++,
    'Diagonal BR': I++,
    'Diagonals BT': I++,
    Rhombic: I++,
    'Spiral TL': I++,
    'Spiral BR': I++,
    'Chunk Mode': I++,
    'Chunk Spiral Mode': I++,
    'Chunk 4x4 Mode': I++,
    Construction: I++,
    'Centered Circular': I++,
    'Double Side Fill': I++,
    'Growing Circle': I++,
    'Dot Fill': I++,
    'Dual Spiral': I++
}
