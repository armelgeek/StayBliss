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

const BaseLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({ headers: await headers() });
  return (
    <>
      <header className="sticky px-24 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex gap-6 md:gap-10">
            <AppLogo />

            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink href="/rooms" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Rooms
                  </NavigationMenuLink>
                </NavigationMenuItem>
              
                <NavigationMenuItem>
                  <NavigationMenuLink href="/about" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    About
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href="/contact" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Contact
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex flex-1 items-center justify-end space-x-4">
            {session ? (
              
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full" asChild>
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
                <Button variant="ghost" className="text-foreground" asChild>
                 <Link href="/register">
                    Guest Area
                  </Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/login">
                    Sign in
                  </Link>
                </Button>
              </div>
             
            )}
          </div>
        </div>
      </header>
      <main className="container mx-auto px-24">
        {children}
      </main>
      <AppFooter />
    </>
  );
};

export default BaseLayout;
