export default function random(): number {
  const arr = new Uint32Array(10)
  crypto.getRandomValues(arr)
  return arr[0]
}

export const gaussianRandom = (random: number, mean: number = 0, stdev: number = 1) => {
  const a = random / 1000000 - Math.floor(random / 1000000)
  const b = ( random % 1000000 ) / 1000000
  const u = 1 - a; // Converting [0,1) to (0,1]
  const v = b;
  const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
  // Transform to the desired mean and standard deviation:
  return z * stdev + mean;
}