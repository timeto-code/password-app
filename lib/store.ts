import { create } from "zustand";

// 保存监听选中的目标记录
interface CredentialStore {
  credentialId: number;
  refreshId: (credentialId: number) => void;
}

export const useCredentialStore = create<CredentialStore>((set) => ({
  credentialId: 0,
  refreshId: (credentialId: number) => set({ credentialId }),
}));

// 保存监听更新操作的事件
interface UpdateEventStore {
  actionId: number;
  refreshActionId: (credentialId: number) => void;
}

export const useUpdateEventStore = create<UpdateEventStore>((set) => ({
  actionId: 0,
  refreshActionId: (credentialId: number) => set({ actionId: credentialId }),
}));

// 保存监听搜索关键字
interface SearchStore {
  keyword: string;
  refreshKeyword: (keyword: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  keyword: "",
  refreshKeyword: (keyword: string) => set({ keyword }),
}));
