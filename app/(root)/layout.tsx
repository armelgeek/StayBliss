import React from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { AppLogo } from '@/shared/components/molecules/layout/app-logo';
import { UserAvatar } from '@/shared/components/molecules/user-avatar';
import Link from 'next/link';
import AppFooter from '@/shared/components/molecules/layout/app-footer';
import { auth } from '@/auth';
import { headers } from 'next/headers';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const BaseLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({ headers: await headers() });
  return (
    <>
      <div className='hidden md:flex justify-between bg-black px-20 py-2 w-full h-[48px] text-white item-center'>

        <div className='flex content-center gap-x-4 leading-3'>
          <div className='font-normal text-xs'>
            Email:
            <p className='text-[#15B392]'>staybliss@gmail.com</p>
          </div>

        </div>
        <div className='flex justify-center items-center gap-x-2 h-full'>
          <div className='flex justify-center items-center p-1 border-[1px] border-white rounded-full'>
            <Facebook size={16} />
          </div>
          <div className='flex justify-center items-center p-1 border-[1px] border-white rounded-full'>
            <Twitter size={16} />
          </div>
          <div className='flex justify-center items-center p-1 border-[1px] border-white rounded-full'>
            <Instagram size={16} />
          </div>
          <div className='flex justify-center items-center p-1 border-[1px] border-white rounded-full'>
            <Linkedin size={16} />
          </div>
        </div>

      </div>
      <header className="flex justify-between items-center bg-white pr-10 md:pr-20 w-full">

        <AppLogo />

        <div className="flex flex-1 justify-end items-center space-x-4">

          <ul className="flex gap-x-6 mr-5 cursor-default">
            <li className="font-medium text-[#15B392]">Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
          {session ? (

            <Button variant="ghost" className="relative rounded-full w-8 h-8" asChild>
              <div>
                <UserAvatar
                  isAnonymous={session.user.isAnonymous ?? false}
                  user={{
                    name: session.user.name,
                    email: session.user.email,
                    avatar: session.user.image,
                  }}
                />
              </div>
            </Button>
          ) : (
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/login">
                  Sign in
                </Link>
              </Button>
            </div>

          )}
        </div>
      </header>
      <main className="mx-auto px-24 container">
        {children}
      </main>
      <AppFooter />
    </>
  );
};

export default BaseLayout;
