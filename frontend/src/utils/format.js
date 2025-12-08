export function formatMoney(num) {
  return "₹" + Number(num).toLocaleString("en-IN");
}
