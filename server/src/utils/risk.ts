export const getRisk = (
  speed: number,
  people: number,
  lumen: boolean
): number => {
  let riskRating = 0;
  if (speed > 100) riskRating += 1;
  if (people > 10) riskRating += 1;
  if (lumen === true) riskRating += 1;
  return Math.trunc(riskRating);
};
