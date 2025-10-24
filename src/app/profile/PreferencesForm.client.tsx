"use client";

import { useActionState } from "react";
import { updateProfile } from "@/actions/updateProfile";
import FormButton from "@/components/FormButton.client";
import { User } from "@/lib/types";

interface PreferencesFormProps {
  user: User;
}

export default function PreferencesForm({ user }: PreferencesFormProps) {
  const [state, formAction] = useActionState(updateProfile, { ok: false });

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="userId" value={user.id} />
      <input type="hidden" name="name" value={user.name} />
      <input type="hidden" name="email" value={user.email} />
      
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="notifications"
            name="notifications"
            defaultChecked={user.preferences.notifications}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="notifications" className="ml-2 text-sm text-gray-700">
            Enable email notifications
          </label>
        </div>
        
        <div>
          <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
            Theme Preference
          </label>
          <select
            id="theme"
            name="theme"
            defaultValue={user.preferences.theme}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
      </div>
      
      <FormButton>
        Update Preferences
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
