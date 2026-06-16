import { atom } from "jotai";

import type { Market } from "@/types/market";

export const politicsMarketsAtom = atom<Market[]>([]);
