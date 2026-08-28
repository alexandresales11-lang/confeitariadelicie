export interface CakeSizeOption {
  id: string;
  sizeCm: number;
  price: number;
  slicesMin: number;
  slicesMax: number;
  slicesLabel: string;
  recommendedFor: string;
  image?: string;
}

export interface CakeFilling {
  id: string;
  name: string;
  category?: 'classico' | 'especial' | 'frutas' | 'chocolate';
  popular?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'bolos-cafe' | 'bolos-especiais' | 'docinhos' | 'docinhos-copo' | 'sobremesas-salgados' | 'kits-festa' | 'cestas';
  price: number;
  unitLabel: string; // e.g. "cento", "unidade", "tamanho P", etc.
  description?: string;
  image?: string;
  minUnits?: number;
  pricePerHundred?: boolean;
  pricePerUnit?: number;
  badge?: string;
  options?: {
    label: string;
    price: number;
  }[];
}

export interface PartyKit {
  id: string;
  name: string;
  badge: string;
  price: number;
  salgados: number;
  docinhos: number;
  boloFatias: number;
  refri: string;
  topo: string;
  prazo: string;
  recommendedGuests: string;
  popular?: boolean;
  themeExample?: string;
}

export interface CustomCakeConfig {
  size: CakeSizeOption;
  batter: 'Tradicional' | 'Chocolatudo (+ acréscimo)';
  fillings: string[]; // up to 2
  hasBrigadeiroSpecialFilling?: boolean;
  themeNotes?: string;
  candleNumber?: string;
  calculatedPrice: number;
}

export interface CartItem {
  id: string;
  title: string;
  subtitle?: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  isCustomCake?: boolean;
  customCakeDetails?: CustomCakeConfig;
  notes?: string;
}

export interface OrderDetails {
  customerName: string;
  customerPhone: string;
  eventDate: string;
  eventTime: string;
  deliveryType: 'retirada' | 'entrega';
  address?: string;
  paymentMethod: 'Pix' | 'Cartão' | 'Dinheiro';
  generalNotes?: string;
}
