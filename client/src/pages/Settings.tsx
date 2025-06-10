import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon, Bell, Moon, Shield } from "lucide-react";
import { SideBar } from "@/components/sidebar";


interface SettingsState {
  notifications: boolean;
  darkMode: boolean;
  privacy: boolean;
}

export const Settings: React.FC = () => {
  const toast = useToast();
  const [settings, setSettings] = useState<SettingsState>({
    notifications: true,
    darkMode: true,
    privacy: false,
  });

  const handleSave = () => {
    // TODO: Implement settings save functionality
    toast.success('Settings saved successfully!');
  };

  const handleSettingChange = (key: keyof SettingsState, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <SideBar />
      <div className="ml-16 p-6">
        <div className="flex items-center space-x-2 mb-8">
          <SettingsIcon className="w-8 h-8 text-purple-400" />
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <div className="max-w-2xl space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-400">
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-gray-400">Get notified about your daily goals</p>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked: boolean) =>
                    handleSettingChange('notifications', checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-purple-400">
                <Moon className="w-5 h-5" />
                <span>Appearance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-gray-400">Toggle dark mode theme</p>
                </div>
                <Switch
                  checked={settings.darkMode}
                  onCheckedChange={(checked: boolean) =>
                    handleSettingChange('darkMode', checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-400">
                <Shield className="w-5 h-5" />
                <span>Privacy</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Private Profile</p>
                  <p className="text-sm text-gray-400">Hide your progress from other users</p>
                </div>
                <Switch
                  checked={settings.privacy}
                  onCheckedChange={(checked: boolean) =>
                    handleSettingChange('privacy', checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleSave}
            className="w-full bg-purple-400 hover:bg-purple-500 text-gray-900"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}; 