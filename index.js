
/**
 * @module chord
 * @author stagas
 * @desc chord player
 * @license mit
 */

export default function Chord(Osc, a, b, c, d, e){
  var voices = [
    Osc(a, b, c, d, e),
    Osc(a, b, c, d, e),
    Osc(a, b, c, d, e),
    Osc(a, b, c, d, e),
    Osc(a, b, c, d, e)
  ];
  var play = Play(voices);
  return function(notes, vel){
    return notes.map(play(vel)).reduce(sum);
  };
}

function Play(voices){
  return function(vel){
    vel = vel || 0.1;
    return function(f, i){
      return voices[i](f) * (1 - i * vel);
    };
  };
}

function sum(p, n){
  return (p + n) / 2;
}
