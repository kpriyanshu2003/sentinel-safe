export const getRisk = (
  speed: number,
  people: number,
  lumen: number
): number => {
  let riskRating = 0;
  if (speed > 100) riskRating += 1;
  if (people > 10) riskRating += 1;
  if (lumen < 100) riskRating += 1;
  return riskRating;
};
