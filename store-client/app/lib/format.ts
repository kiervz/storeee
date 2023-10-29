import { OrderType } from "@/types";
import { Order } from "@prisma/client";
import dayjs from "dayjs";

export const FormatCurrency = (
  value: number,
  currencySymbol?: string,
  discountPercentage?: number,
  decimal = 2
) => {
  let newValue = value;
  if (discountPercentage) {
    const discountAmount = value * (discountPercentage / 100);
    newValue -= discountAmount;
  }

  const formattedValue = parseFloat(newValue.toFixed(decimal)).toLocaleString(
    undefined,
    {
      minimumFractionDigits: decimal,
      maximumFractionDigits: decimal,
    }
  );

  const finalValue = formattedValue.endsWith(`.${"0".repeat(decimal)}`)
    ? formattedValue.slice(0, -decimal - 1)
    : formattedValue;

  return currencySymbol ? `${currencySymbol} ${finalValue}` : `${finalValue}`;
};

export const FormatString = (value: string) => {
  const valueWithSpaces = value.replace(/-/g, " ");

  const arr = valueWithSpaces.split(" ");

  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  const formattedValue = arr.join(" ");

  return formattedValue;
};

export const FormatDateTime = (
  value: string,
  format = "MMMM DD, YYYY hh:mm A"
) => {
  return dayjs(value).format(format);
};

export const DeliveryStatus = (order: Order) => {
  if (order.delivered_at) {
    return "Delivered";
  } else if (order.shipped_at) {
    return "Shipped";
  } else if (order.packed_at) {
    return "Packed";
  } else {
    return "To Pack";
  }
};
