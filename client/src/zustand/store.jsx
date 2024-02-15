import create from "zustand";
const useStore = create((set) => ({
    latitude: null,
    longitude: null,
    update: (latitude, longitude) => set({ latitude, longitude }),
  }));
  export default useStore;