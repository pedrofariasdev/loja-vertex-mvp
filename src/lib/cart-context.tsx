"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  variantId: string; // product_variants.id (uuid)
  productName: string;
  variantLabel: string; // ex: "Preto / M"
  priceCents: number;
  currency: string;
  imageUrl: string | null;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clear: () => void;
  totalCents: number;
  totalItems: number;
  hydrated: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "vertex-mvp-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Carrega o carrinho guardado no browser (localStorage) quando a página abre.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignora localStorage corrompido/inacessível
    }
    setHydrated(true);
  }, []);

  // Guarda sempre que o carrinho muda (depois da carga inicial).
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  // Todas as funções abaixo usam a forma funcional de `setItems` e têm
  // dependências vazias, para que a sua identidade se mantenha estável
  // entre renders — caso contrário, qualquer componente que as tenha como
  // dependência de um `useEffect` (ex.: a página de sucesso do checkout, que
  // chama `clear()` no `useEffect`) entra num ciclo infinito de re-render:
  // nova função → efeito corre outra vez → novo `setItems([])` → novo
  // render → nova função → ...

  const addItem: CartContextValue["addItem"] = useCallback(
    (item, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.variantId === item.variantId);
        if (existing) {
          return prev.map((i) =>
            i.variantId === item.variantId
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [...prev, { ...item, quantity }];
      });
    },
    []
  );

  const removeItem = useCallback((variantId: string) => {
    setItems((prev) => prev.filter((i) => i.variantId !== variantId));
  }, []);

  const updateQuantity = useCallback(
    (variantId: string, quantity: number) => {
      if (quantity <= 0) {
        setItems((prev) => prev.filter((i) => i.variantId !== variantId));
        return;
      }
      setItems((prev) =>
        prev.map((i) => (i.variantId === variantId ? { ...i, quantity } : i))
      );
    },
    []
  );

  const clear = useCallback(() => setItems([]), []);

  const totalCents = useMemo(
    () => items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0),
    [items]
  );
  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  // Também memoizamos o próprio objeto de valor do contexto — sem isto, o
  // Provider passaria um objeto novo a cada render (mesmo com as funções já
  // estáveis acima) e qualquer componente que dependa dele em `useEffect`
  // continuaria a re-executar sem necessidade.
  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clear,
      totalCents,
      totalItems,
      hydrated,
    }),
    [items, addItem, removeItem, updateQuantity, clear, totalCents, totalItems, hydrated]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart tem de ser usado dentro de <CartProvider>.");
  }
  return ctx;
}
