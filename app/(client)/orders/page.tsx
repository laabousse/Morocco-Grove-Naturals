import Container from "@/components/Container";
import OrdersComponent from "@/components/OrdersComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMyOrders } from "@/sanity/helpers";
import { auth } from "@clerk/nextjs/server";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import { FileX } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
const OrdersPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }
  const orders = await getMyOrders(userId);

  return (
    <div className="min-h-[calc(100vh-148px)]">
      <Container className="flex-grow py-10">
        {orders?.length ? (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Order History:</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px] md:w-auto">
                        Order Number
                      </TableHead>
                      <TableHead className="text-center hidden md:table-cell">
                        Date
                      </TableHead>
                      <TableHead className="text-center">Customer</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Email
                      </TableHead>
                      <TableHead className="text-center">Total</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <OrdersComponent orders={orders} />
                </Table>
                <Scrollbar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-8">
            <FileX className="w-24 h-24 text-gray-400 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900">
              No orders found
            </h3>
            <p className="mt-2 text-sm text-gray-600 text-center max-w-md">
              It looks like you haven&rsquo;t places any orders yet. Start
              shopping to see your orders here!
            </p>
            <Button asChild className="mt-6">
              <Link href="/">Browse Shopping</Link>
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default OrdersPage;
