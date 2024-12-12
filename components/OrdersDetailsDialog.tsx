import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceFormatter from "./PriceFormatter";
import Link from "next/link";

interface Props {
  order: MY_ORDERS_QUERYResult[number] | null;
  isOpen: boolean;
  onClose: () => void;
}
const OrdersDetailsDialog: React.FC<Props> = ({ order, isOpen, onClose }) => {
  if (!order) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Order Details - {order.orderNumber}</DialogTitle>
        </DialogHeader>
        <div>
          <p>
            <strong>Customer: </strong>
            {order?.customerName}
          </p>
          <p>
            <strong>Email: </strong>
            {order?.email}
          </p>
          <p>
            <strong>Date: </strong>
            {order?.orderDate &&
              new Date(order?.orderDate).toLocaleDateString()}
          </p>
          <p
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
            <strong>Status: </strong>
            {order?.status}
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead className="text-center">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order?.products?.map((product) => (
              <TableRow key={`${order.orderNumber}-${product.product?._id}`}>
                <TableCell className="flex items-center gap-2">
                  {product?.product?.image && (
                    <div className="w-[50px] h-[50px] overflow-hidden rounded-md">
                      <Link
                        href={`/product/${product?.product?.slug?.current}`}
                        className="block w-full h-full"
                      >
                        <Image
                          src={urlFor(product?.product?.image).url()}
                          alt={product?.product?.name || ""}
                          width={50}
                          height={50}
                          className="w-full h-full object-cover border rounded-md hover:scale-105 hoverEffect transform-origin-center"
                        />
                      </Link>
                    </div>
                  )}
                  {product?.product && product?.product?.name}
                </TableCell>
                <TableCell className="text-center">
                  {product?.quantity}
                </TableCell>
                <TableCell className="text-center">
                  <PriceFormatter
                    amount={product?.product?.price}
                    className="text-black font-medium"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 text-right space-y-1">
          {(order?.amountDiscount ?? 0) > 0 && (
            <>
              <div className="text-gray-500">
                <strong>Original Total: </strong>
                <PriceFormatter
                  amount={
                    (order?.totalPrice ?? 0) + (order?.amountDiscount ?? 0)
                  }
                  className="line-through text-gray-500"
                />
              </div>
              <div>
                <strong>Discounted Total: </strong>
                <PriceFormatter
                  amount={order?.totalPrice ?? 0}
                  className="text-black font-bold"
                />
              </div>
            </>
          )}
          {!order?.amountDiscount && (
            <div>
              <strong>Total: </strong>
              <PriceFormatter
                amount={order?.totalPrice}
                className="text-black font-bold"
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrdersDetailsDialog;
