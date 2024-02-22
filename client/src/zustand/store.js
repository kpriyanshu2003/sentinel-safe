const url = process.env.NEXT_PUBLIC_serverUrl;
import create from "zustand";

export const useStore = create((set) => ({
  latitude: null,
  longitude: null,
  sourceName: null,
  update: (latitude, longitude, sourceName) =>
    set({ latitude, longitude, sourceName }),
}));

export const getMetricsHighlighted = create((set) => ({
  fetchData: async (sourceName) => {
    const response = await fetch(`${url}/locmetrics/l`);
    const data = await response.json();
    const metrics = data.data;
    metrics.map((info) => {
      if (sourceName == info.id) set(info);
    });
  },
}));
