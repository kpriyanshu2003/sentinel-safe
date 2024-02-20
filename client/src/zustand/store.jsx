
const url=process.env.NEXT_PUBLIC_serverUrl
import create from "zustand";
export const useStore = create((set) => ({
    latitude: null,
    longitude: null,
    update: (latitude, longitude) => set({ latitude, longitude }),
  }));

 
  export const getMetricsHighlighted = create((set) => ({
    
    fetchData: async (latitude,longitude) => {
      const response = await fetch(`${url}/locmetrics`);
      // const response = await fetch(`${url}/locmetrics/o/?latitude=${latitude}&longitude=${longitude}`);
      const data = await response.json();
     console.log("Data",data.data);
     const metrics = data.data;
      set(metrics);
    }
  }));

