// Puzzle question- you have 3 litre bottle and 5 litre bottle, unlimited water supply.
// Give me 4 litre water

const giveMeThatSteps = function (bottles = [], target = 0) {
    const log = console.log;
    class Bottle {
        constructor(capacity, current = 0) {
            this.capacity = capacity;
            this.current = current;
        }

        toString() {
            return this.current;
        }
    }

    log('~~~~testing START~~~~');
    const [A, B] = bottles.sort().reverse().map(e => new Bottle(e));
    log(`We have a ${A.capacity} litre bottle and a ${B.capacity} litre bottle, give me ${target} litre/s of water!\n`);
    let steps = 0;
    const action1 = function (A, B) {
        if (A.current == 0) {
            // first if all is empty, give me that water
            A.current = A.capacity;
            return `Filling bottle A to ${A.capacity}`;
        }
        return null;
    }
    const action2 = function (A, B) {
        const diff = Math.min(B.capacity - B.current, A.current);
        if (diff > 0) {
            A.current -= diff;
            B.current += diff;
            return `Empty A into B`;
        }
        return null;
    }
    const action3 = function (A, B) {
        if (B.current == B.capacity) {
            B.current = 0;
            return 'Emptying bottle B';
        }
        return null;
    }
    const actions = [action1, action2, action3];
    log(`Bottle A is ${A.capacity} litre size, and Bottle B is ${B.capacity} litre size.`);
    for (let i = 0; ![A, B].some(e => e.current == target); ++i) {
        const actionLog = actions[i % 3](A, B);
        actionLog && actionLog.length > 0 ? log(`step ${++steps} - ${actionLog.padEnd(30)} -  A: ${A}, B: ${B}`) : null;
        if (i > 1000) {
            log("Something goes wrong! Imma stop you here!");
            return;
        }
    }
    log(`\nHere is your ${target} litre water!`);
    log('~~~~testing END~~~~');
    log('\n\n');
}


giveMeThatSteps([3, 5], 4); // 6 steps