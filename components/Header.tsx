import Image from "next/image";
import React from "react";
import logo from "@/images/logo.png";
import Container from "./Container";
import Form from "next/form";
import Link from "next/link";
import CartIcon from "./CartIcon";
import { ShoppingBag, User } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { getMyOrders } from "@/sanity/helpers";

const Header = async () => {
  const user = await currentUser();
  let orders = null;
  if (user?.id) {
    orders = await getMyOrders(user.id);
  }
  return (
    <header className="w-full bg-white py-4 border-b border-b-gray-400 sticky top-0 z-50">
      <Container className="flex md:items-center justify-between gap-5 flex-col md:flex-row">
        {/* Logo */}
        <Link
          href={"/"}
          className="flex items-center justify-center w-full md:w-auto"
        >
          <Image src={logo} alt="logo" className="w-20 md:w-24" priority />
        </Link>
        {/* Input */}
        <Form action="/search" className="flex-1 flex items-center">
          <input
            type="text"
            name="query"
            placeholder="Search for products..."
            className="w-full border-2 border-gray-200 px-4 py-2.5 rounded-md focus-visible:border-darkGreen outline-none"
          />
        </Form>
        {/* tabs */}
        <div className="flex items-center gap-5 justify-center w-full md:w-auto">
          <CartIcon />
          <ClerkLoaded>
            <SignedIn>
              <Link
                href={"/orders"}
                className="flex items-center text-sm gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md hover:shadow-none hoverEffect"
              >
                <ShoppingBag className="text-darkGreen w-6 h-6 " />
                <div className="flex flex-col">
                  <p className="text-xs">
                    <span className="font-semibold">
                      {orders && orders?.length > 0 ? orders?.length : 0}{" "}
                    </span>
                    items
                  </p>
                  <p className="font-semibold">Orders</p>
                </div>
              </Link>
            </SignedIn>
            {user ? (
              <div className="hoverEffect flex items-center text-sm gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md hover:shadow-none">
                <UserButton />
                <div className="hidden md:inline-flex flex-col">
                  <p className="text-xs">Welcome Back</p>
                  <p className="font-semibold">{user?.fullName}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal">
                <div className="flex items-center text-sm gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md hover:shadow-none hoverEffect">
                  <User className="text-darkGreen w-6 h-6 " />
                  <div className="flex flex-col">
                    <p className="text-xs">Account</p>
                    <p className="font-semibold">Login</p>
                  </div>
                </div>
              </SignInButton>
            )}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;
