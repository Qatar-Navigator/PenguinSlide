export const vec2 = (x, y) => {
  'worklet';
  return {x: x, y: y};
};

export const relativeCurve = (c1, c2, to) => {
  'worklet';
  return `c ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`;
};

export const curve = (c1, c2, to) => {
  'worklet';
  return `C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`;
};
