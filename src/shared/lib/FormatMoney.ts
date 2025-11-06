export default function FormatMoney(amount: number | string): string {
  return amount.toLocaleString("ru-RU").replace(/\u00A0/g, " ");
}
