import { FormatDateTime } from "@/app/lib/format";
import { OrderType } from "@/types";

interface DeliveryTimelineProps {
  order: OrderType;
}

const DeliveryTimeline: React.FC<DeliveryTimelineProps> = ({ order }) => {
  return (
    <div>
      <ol className="relative border-l border-gray-200 dark:border-gray-700">
        {order.delivered_at && (
          <li className="mb-6 ml-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {FormatDateTime(order.delivered_at)}
            </time>
            <h3 className="text-sm font-semibold text-green-500 dark:text-white">
              Delivered
            </h3>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Your package has been delivered.
            </p>
          </li>
        )}
        {order.shipped_at && (
          <li className="mb-6 ml-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {FormatDateTime(order.shipped_at)}
            </time>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Shipped
            </h3>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Your package has been shipped.
            </p>
          </li>
        )}
        {order.packed_at && (
          <li className="mb-6 ml-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {FormatDateTime(order.packed_at)}
            </time>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Packed and Ready to Ship
            </h3>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Your package is packed and will be handed over to our logistic
              partner.
            </p>
          </li>
        )}
        {order.cancel_at && (
          <li className="mb-6 ml-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {FormatDateTime(order.cancel_at)}
            </time>
            <h3 className="text-sm font-semibold text-red-500 dark:text-white">
              Order canceled
            </h3>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Your order has been cancelled.{" "}
              <span className="font-semibold">
                [{order.OrderRefund[0].reason}]
              </span>
            </p>
          </li>
        )}
        {order.created_at && (
          <li className="mb-6 ml-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {FormatDateTime(order.created_at)}
            </time>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Order created
            </h3>
          </li>
        )}
      </ol>
    </div>
  );
};

export default DeliveryTimeline;
