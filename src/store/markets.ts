import { atom } from "jotai";

import type { Market } from "@/types/market";

export const marketsAtom = atom<Market[]>([]);
