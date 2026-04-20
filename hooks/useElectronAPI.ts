import { useEffect, useState } from 'react';

interface ElectronAPI {
  launchApp: (appPath: string) => Promise<{ success: boolean; error?: string }>;
  executeCommand: (command: string) => Promise<{ stdout: string; stderr: string }>;
  getSystemInfo: () => Promise<{
    platform: string;
    arch: string;
    cpuCount: number;
    totalMemory: number;
    freeMemory: number;
  }>;
}

export function useElectronAPI() {
  const [electronAPI, setElectronAPI] = useState<ElectronAPI | null>(null);
  const [isElectron, setIsElectron] = useState(false);

  useEffect(() => {
    // Check if running in Electron
    if (typeof window !== 'undefined' && (window as any).electronAPI) {
      setElectronAPI((window as any).electronAPI);
      setIsElectron(true);
    }
  }, []);

  return {
    electronAPI,
    isElectron,
    launchApp: async (appPath: string) => {
      if (!electronAPI) throw new Error('Not running in Electron');
      return electronAPI.launchApp(appPath);
    },
    executeCommand: async (command: string) => {
      if (!electronAPI) throw new Error('Not running in Electron');
      return electronAPI.executeCommand(command);
    },
    getSystemInfo: async () => {
      if (!electronAPI) throw new Error('Not running in Electron');
      return electronAPI.getSystemInfo();
    },
  };
}
