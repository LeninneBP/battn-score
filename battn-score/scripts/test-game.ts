import assert from 'node:assert/strict';
import {
  awardTurn,
  beginNormalTurn,
  beginOrbiTurn,
  createInitialMatch,
  foldTurn,
  raiseStake,
  refuseOrbi,
  rematch,
  setStake,
  startMatch,
  undoLast,
} from '../src/gameLogic';
import { normalizeMatch } from '../src/types';

let s = startMatch(createInitialMatch(), 'Nós', 'Eles');
s = beginNormalTurn(s);
assert.equal(s.stake, 2);
s = raiseStake(s);
s = raiseStake(s);
assert.equal(s.stake, 4);
s = setStake(s, 4);
s = awardTurn(s, 'a');
assert.equal(s.scoreA, 4);
assert.equal(s.history.length, 1);

s = beginOrbiTurn(s, 'b');
assert.equal(s.stake, 3);
assert.equal(s.isOrbi, true);
s = refuseOrbi(s);
assert.equal(s.scoreB, 2);

s = beginNormalTurn(s);
s = setStake(s, 15);
s = awardTurn(s, 'a');
assert.equal(s.scoreA, 19);
assert.equal(s.markedNineteen, 'a');

s = beginNormalTurn(s);
assert.equal(s.stake, 3);
s = foldTurn(s, 'a');
assert.equal(s.scoreB, 4);

s = undoLast(s);
assert.equal(s.scoreB, 2);
assert.equal(s.scoreA, 19);

const again = rematch(s);
assert.equal(again.started, true);
assert.equal(again.scoreA, 0);
assert.equal(again.teamAName, 'Nós');

const legacy = normalizeMatch({
  teamAName: 'A',
  teamBName: 'B',
  scoreA: 6,
  scoreB: 2,
  started: true,
} as never);
assert.equal(legacy.tricksA, 0);
assert.equal(legacy.scoreA, 6);
assert.equal(legacy.targetScore, 21);

let short = startMatch(createInitialMatch('A', 'B', 11), 'A', 'B');
assert.equal(short.targetScore, 11);
short = beginNormalTurn(short);
short = setStake(short, 9);
short = awardTurn(short, 'a');
assert.equal(short.scoreA, 9);
assert.equal(short.markedNineteen, 'a');
short = beginNormalTurn(short);
short = setStake(short, 2);
short = awardTurn(short, 'a');
assert.equal(short.winner, 'a');
assert.equal(short.targetScore, 11);

console.log('gameLogic ok');
