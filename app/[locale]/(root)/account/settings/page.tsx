import { Metadata } from "next";
import {
  updateAvatar,
  updateEmail,
  updateName
} from '../_actions';
import { headers } from "next/headers";
import { Label } from "@/components/ui/label";
import { auth } from '@/auth';
import { EditableLabelForm } from '@/shared/components/atoms/editable-label-form';
import { ChangePassword } from '@/features/auth/components/organisms/change-password-form';
import { DeleteAccount } from '@/features/auth/components/organisms/delete-account-form';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EditableProfilePhotoForm } from '@/shared/components/atoms/editable-profile-photo-form';

export const metadata: Metadata = { title: "Settings" };

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Account Settings</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <EditableProfilePhotoForm
              photoUrl={session?.user?.image ?? undefined}
            />
            <EditableLabelForm
              disabled={session?.user.isAnonymous}
              action={updateName}
              label="Display Name"
              value={session?.user.name}
              className="w-full"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Login Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <EditableLabelForm
              disabled={session?.user.isAnonymous}
              action={updateEmail}
              label="Email Address"
              value={session?.user.email}
              className="w-full"
            />


            <div className="flex flex-col space-y-1.5">
              <Label className="text-sm text-muted-foreground">Password</Label>
              <ChangePassword />
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        {!session?.user.isAnonymous && (
          <Card className="border-destructive/20">
            <CardHeader>
              <CardTitle className="text-xl text-destructive">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">Delete Account</h3>
                  <p className="text-sm text-muted-foreground">
                    This action is irreversible. All your data will be permanently deleted.
                  </p>
                </div>
                <DeleteAccount />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
