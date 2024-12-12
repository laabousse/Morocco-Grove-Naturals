"use client";
import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import { useState } from "react";
import { TableBody, TableCell, TableRow } from "./ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import PriceFormatter from "./PriceFormatter";
import OrdersDetailsDialog from "./OrdersDetailsDialog";

const OrdersComponent = ({ orders }: { orders: MY_ORDERS_QUERYResult }) => {
  const [selectedOrder, setSelectedOrder] = useState<
    MY_ORDERS_QUERYResult[number] | null
  >(null);

  const handleOrderClicked = (order: MY_ORDERS_QUERYResult[number]) => {
    setSelectedOrder(order);
  };
  return (
    <>
      <TableBody>
        <TooltipProvider>
          {orders?.map((order) => (
            <Tooltip key={`${order?.orderNumber}-${order?._id}`}>
              <TooltipTrigger asChild>
                <TableRow
                  onClick={() => handleOrderClicked(order)}
                  className="cursor-pointer hover:bg-gray-100 h-12"
                >
                  <TableCell className="font-medium">
                    ...{order?.orderNumber?.slice(-10) ?? "N/A"}
                  </TableCell>
                  <TableCell className="text-center hidden md:table-cell">
                    {order?.orderDate &&
                      new Date(order?.orderDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {order?.customerName}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order?.email}
                  </TableCell>
                  <TableCell className="text-center">
                    <PriceFormatter
                      amount={order?.totalPrice ?? 0}
                      className="text-black font-medium"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    {order?.status && (
                      <span
                        className={`capitalize px-2 py-1 w-fit rounded-full text-xs font-semibold ${
                          order?.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : order?.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : order?.status === "shipped"
                                ? "bg-purple-100 text-purple-700"
                                : order?.status === "delivered"
                                  ? "bg-blue-100 text-blue-700"
                                  : order?.status === "cancelled"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order?.status}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to see order details!</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </TableBody>
      <OrdersDetailsDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
};

export default OrdersComponent;
