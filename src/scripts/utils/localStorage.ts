export const lsPotionParams = localStorage.getItem('potionsParams');

export function saveParamsInLS(params: string) {
  localStorage.setItem('potionsParams', params);
}
