"use client";

import { useActionState } from "react";
import { updateProfile } from "@/actions/updateProfile";
import FormButton from "@/components/FormButton.client";
import { User } from "@/lib/types";

interface ProfileFormProps {
  user: User;
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [state, formAction] = useActionState(updateProfile, { ok: false });

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="userId" value={user.id} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={user.name}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={user.email}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>
      
      <FormButton>
        Update Profile
      </FormButton>
      
      {/* Status Messages */}
      {!state.ok && state.error && (
        <div className="text-red-600 text-sm mt-2">
          {state.error}
        </div>
      )}
      {state.ok && (
        <div className="text-green-600 text-sm mt-2">
          {state.data?.message}
        </div>
      )}
    </form>
  );
}
