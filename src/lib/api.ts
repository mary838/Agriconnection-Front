export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token")
  );
}

export function setToken(token: string, remember: boolean) {
  if (remember) {
    localStorage.setItem("access_token", token);
  } else {
    sessionStorage.setItem("access_token", token);
  }
}

export function clearToken() {
  localStorage.removeItem("access_token");
  sessionStorage.removeItem("access_token");
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  auth?: boolean;
  isFormData?: boolean;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, auth = true, isFormData = false } = options;

  const headers: Record<string, string> = { Accept: "application/json" };
  if (!isFormData) headers["Content-Type"] = "application/json";

  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body:
      body === undefined
        ? undefined
        : isFormData
        ? (body as FormData)
        : JSON.stringify(body),
  });

  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await res.json().catch(() => null)
    : null;

  if (!res.ok) {
    throw new ApiError(
      (data && data.message) || res.statusText || "Request failed.",
      res.status
    );
  }

  return data as T;
}

// ---------- Types ----------

export type Role = "admin" | "farmer" | "customer";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string | null;
  telegramPhone?: string | null;
  avatarUrl?: string | null;
  resetToken?: string | null;
  resetTokenExpiry?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AuthResponse = { user: User; accessToken: string };

export type Province = {
  id: number;
  name: string;
  region?: string | null;
};

export type Farmer = {
  id: string;
  farmerCode: string;
  userId?: string;
  provinceId?: number;
  fullName?: string;
  email?: string;
  phone: string;
  telegramPhone?: string | null;
  farmName?: string | null;
  bio?: string | null;
  address?: string | null;
  status: string;
  verifiedAt?: string | null;
  createdAt: string;
  updatedAt?: string;
  province?: string | Province | null;
  user?: User;
};

export function farmerName(farmer: Pick<Farmer, "fullName" | "user" | "farmerCode">): string {
  return farmer.fullName || farmer.user?.name || farmer.farmerCode;
}

export function provinceName(province?: string | Province | null): string {
  if (!province) return "";
  return typeof province === "string" ? province : province.name;
}

export type Customer = {
  id: string;
  userId: string;
  name: string;
  phone?: string;
  telegramPhone?: string;
  address?: string;
  district?: string;
  provinceId?: number;
  createdAt?: string;
  province?: Province;
};

export type ProductImage = {
  id?: string;
  imageUrl: string;
  isPrimary?: boolean;
};

export function categoryName(category: string | { id: number; name: string } | undefined): string {
  if (!category) return "";
  return typeof category === "string" ? category : category.name;
}

export function categoryId(category: string | { id: number; name: string } | undefined): number | null {
  if (!category || typeof category === "string") return null;
  return category.id;
}

export function resolveImageUrl(path?: string | null): string {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export type ProductTranslation = {
  locale: string;
  name: string;
  description?: string | null;
};

export type Product = {
  id: string;
  productCode: string;
  name: string;
  description?: string | null;
  category: string | { id: number; name: string };
  farmerId: string;
  imageUrl?: string | null;
  priceUsd: number | string;
  unit: string;
  stockQuantity?: number;
  status?: string;
  images?: ProductImage[];
  translations?: ProductTranslation[];
  farmer?: Farmer;
  inventory?: Inventory[];
};

export type Inventory = {
  id: string;
  productId: string;
  provinceId: number;
  stockQty: number;
  lowStockThreshold: number;
  status?: string;
  product?: Product;
  province?: Province;
};

export type FarmerOrderGroup = {
  orderId: string;
  orderCode: string;
  status: string;
  placedAt: string;
  destinationAddress?: string | null;
  customer?: Customer;
  items: FarmerOrderItem[];
};

// Collapse a farmer's order items (one row per product) into one row per order.
export function groupFarmerOrderItems(orderItems: FarmerOrderItem[]): FarmerOrderGroup[] {
  const groups = new Map<string, FarmerOrderGroup>();
  for (const item of orderItems) {
    const existing = groups.get(item.orderId);
    if (existing) {
      existing.items.push(item);
      continue;
    }
    groups.set(item.orderId, {
      orderId: item.orderId,
      orderCode: item.order.orderCode,
      status: item.order.status,
      placedAt: item.order.placedAt,
      destinationAddress: item.order.destinationAddress,
      customer: item.order.customer,
      items: [item],
    });
  }
  return Array.from(groups.values());
}

// Total remaining stock for a product, summed across every province's inventory row.
export function totalStock(product: Pick<Product, "inventory">): number {
  if (!product.inventory) return 0;
  return product.inventory.reduce((sum, record) => sum + Number(record.stockQty), 0);
}

export function isOutOfStock(product: Pick<Product, "inventory">): boolean {
  return totalStock(product) <= 0;
}

export type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  product?: Product;
};

export type Cart = {
  id: string;
  items: CartItem[];
};

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  farmerId: string;
  quantity: number | string;
  unitPriceUsd: number | string;
  subtotalUsd: number | string;
  farmer?: Farmer;
  product?: Product;
};

export type Order = {
  id: string;
  status: string;
  destinationAddress?: string;
  createdAt: string;
  updatedAt: string;
  items?: OrderItem[];
  [key: string]: unknown;
};

export type FarmerOrderItem = {
  id: string;
  orderId: string;
  productId: string;
  farmerId: string;
  quantity: number | string;
  unitPriceUsd: number | string;
  subtotalUsd: number | string;
  order: {
    id: string;
    orderCode: string;
    status: string;
    destinationAddress?: string | null;
    placedAt: string;
    updatedAt: string;
    customer?: Customer;
  };
  product?: Product;
};

export type Payment = {
  id: string;
  orderId: string;
  paymentMethod: string;
  amountUsd: number;
  transactionId?: string;
  status: string;
  [key: string]: unknown;
};

export type Delivery = {
  id: string;
  orderId: string;
  driverName?: string;
  driverPhone?: string;
  trackingNumber?: string;
  estimatedDate?: string;
  deliveryStatus: string;
  [key: string]: unknown;
};

export type Payout = {
  id: string;
  farmerId: string;
  amountUsd: number;
  amountKhr?: number;
  payoutDate: string;
  reference?: string;
  status: string;
  [key: string]: unknown;
};

export type ProductReview = {
  id: string;
  productId: string;
  rating: number;
  comment?: string;
  [key: string]: unknown;
};

export type Notification = {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead?: boolean;
  createdAt: string;
  [key: string]: unknown;
};

export type Wishlist = {
  id: string;
  productId: string;
  product?: Product;
};

export type SupportTicketReply = {
  id: string;
  ticketId: string;
  authorId: string;
  message: string;
  createdAt: string;
  author?: User;
};

export type SupportTicket = {
  id: string;
  userId: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
  user?: User;
  replies?: SupportTicketReply[];
};

export type PublicStats = {
  activeFarms: number;
  ordersFulfilled: number;
  organicStandard: number;
  latestHarvest: {
    productName: string;
    farmName: string;
    harvestedAt: string;
  } | null;
};

// ---------- Auth ----------

export const auth = {
  register: (body: {
    name: string;
    email: string;
    password: string;
    role: Role;
    phone?: string;
    telegramPhone?: string;
  }) => request<AuthResponse>("/auth/register", { method: "POST", body, auth: false }),

  login: (body: { email: string; password: string }) =>
    request<AuthResponse>("/auth/login", { method: "POST", body, auth: false }),

  logout: () => request<{ message: string }>("/auth/logout", { method: "POST" }),

  forgotPassword: (body: { email: string }) =>
    request<{ message: string; resetToken: string }>("/auth/forgot-password", {
      method: "POST",
      body,
      auth: false,
    }),

  resetPassword: (body: { token: string; newPassword: string }) =>
    request<{ message: string }>("/auth/reset-password", {
      method: "POST",
      body,
      auth: false,
    }),
};

// ---------- Profile ----------

export const profile = {
  get: () => request<User>("/profile"),
  update: (body: Partial<Pick<User, "name" | "phone" | "telegramPhone">>) =>
    request<User>("/profile", { method: "PUT", body }),
  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);
    return request<User>("/profile/avatar", {
      method: "POST",
      body: formData,
      isFormData: true,
    });
  },
};

// ---------- Farmers ----------

type FarmerInput = {
  farmerCode: string;
  userId: string;
  provinceId: number;
  phone: string;
  telegramPhone?: string;
};

export const farmers = {
  list: () => request<Farmer[]>("/farmers"),
  get: (id: string) => request<Farmer>(`/farmers/${id}`),
  create: (body: FarmerInput) => request<Farmer>("/farmers", { method: "POST", body }),
  update: (id: string, body: Partial<FarmerInput>) =>
    request<Farmer>(`/farmers/${id}`, { method: "PATCH", body }),
  updateStatus: (id: string, body: { status: string }) =>
    request<Farmer>(`/farmers/${id}/status`, { method: "PATCH", body }),
  approve: (id: string) => request<Farmer>(`/farmers/${id}/approve`, { method: "POST" }),
  reject: (id: string) => request<Farmer>(`/farmers/${id}/reject`, { method: "POST" }),
  remove: (id: string) => request<void>(`/farmers/${id}`, { method: "DELETE" }),
};

// ---------- Provinces ----------

export const provinces = {
  list: () => request<Province[]>("/provinces", { auth: false }),
  get: (id: number) => request<Province>(`/provinces/${id}`, { auth: false }),
  create: (body: { name: string }) =>
    request<Province>("/provinces", { method: "POST", body }),
  remove: (id: number) => request<void>(`/provinces/${id}`, { method: "DELETE" }),
};

// ---------- Categories ----------

export type Category = {
  id: number;
  name: string;
  description?: string | null;
};

export const categories = {
  list: (locale?: string) =>
    request<Category[]>(`/categories${locale ? `?lang=${locale}` : ""}`, { auth: false }),
};

// ---------- Products ----------

type ProductInput = {
  productCode: string;
  name: string;
  description?: string;
  categoryId: number;
  farmerId: string;
  imageUrl?: string;
  priceUsd: number;
  unit: string;
  images?: ProductImage[];
  translations?: ProductTranslation[];
  provinceId?: number;
  stockQty?: number;
  lowStockThreshold?: number;
};

export const products = {
  list: (locale?: string) =>
    request<Product[]>(`/products${locale ? `?lang=${locale}` : ""}`),
  get: (id: string, locale?: string) =>
    request<Product>(`/products/${id}${locale ? `?lang=${locale}` : ""}`),
  create: (body: ProductInput) => request<Product>("/products", { method: "POST", body }),
  update: (id: string, body: Partial<ProductInput>) =>
    request<Product>(`/products/${id}`, { method: "PATCH", body }),
  remove: (id: string) => request<void>(`/products/${id}`, { method: "DELETE" }),
  uploadImage: (id: string, file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    return request<ProductImage>(`/products/${id}/images`, {
      method: "POST",
      body: formData,
      isFormData: true,
    });
  },
};

// ---------- Inventory ----------

type InventoryInput = {
  productId: string;
  provinceId: number;
  stockQty: number;
  lowStockThreshold: number;
};

export const inventory = {
  list: () => request<Inventory[]>("/inventory"),
  get: (id: string) => request<Inventory>(`/inventory/${id}`),
  create: (body: InventoryInput) => request<Inventory>("/inventory", { method: "POST", body }),
  update: (id: string, body: Partial<InventoryInput>) =>
    request<Inventory>(`/inventory/${id}`, { method: "PATCH", body }),
  remove: (id: string) => request<void>(`/inventory/${id}`, { method: "DELETE" }),
};

// ---------- Customers ----------

export const customers = {
  list: () => request<Customer[]>("/customers"),
  get: (id: string) => request<Customer>(`/customers/${id}`),
  create: (body: {
    userId: string;
    name: string;
    phone?: string;
    telegramPhone?: string;
    address?: string;
    district?: string;
    provinceId: number;
  }) => request<Customer>("/customers", { method: "POST", body }),
};

// ---------- Carts ----------

export const carts = {
  me: () => request<Cart>("/carts/me"),
  addItem: (body: { productId: string; quantity: number }) =>
    request<CartItem>("/carts/items", { method: "POST", body }),
  updateItem: (itemId: string, body: { quantity: number }) =>
    request<CartItem>(`/carts/items/${itemId}`, { method: "PATCH", body }),
  removeItem: (itemId: string) =>
    request<void>(`/carts/items/${itemId}`, { method: "DELETE" }),
  clear: () => request<void>("/carts/clear", { method: "DELETE" }),
};

// ---------- Orders ----------

export const orders = {
  checkout: async (body: { destinationAddress: string }) => {
    const res = await request<{ message: string; order: Order }>("/orders/checkout", {
      method: "POST",
      body,
    });
    return res.order;
  },
  list: () => request<Order[]>("/orders"),
  mine: () => request<Order[]>("/orders/me"),
  myFarmerItems: () => request<FarmerOrderItem[]>("/orders/farmer/me"),
  get: (id: string) => request<Order>(`/orders/${id}`),
  updateStatus: (id: string, body: { status: string }) =>
    request<Order>(`/orders/${id}/status`, { method: "PATCH", body }),
};

// ---------- Payments ----------

export const payments = {
  create: (body: {
    orderId: string;
    paymentMethod: string;
    amountUsd: number;
    transactionId?: string;
  }) => request<Payment>("/payments", { method: "POST", body }),
  list: () => request<Payment[]>("/payments"),
  byOrder: (orderId: string) => request<Payment[]>(`/payments/order/${orderId}`),
  get: (id: string) => request<Payment>(`/payments/${id}`),
  remove: (id: string) => request<void>(`/payments/${id}`, { method: "DELETE" }),
  updateStatus: (id: string, body: { status: string }) =>
    request<Payment>(`/payments/${id}/status`, { method: "PATCH", body }),
  createCheckoutSession: (orderId: string) =>
    request<{ url: string; sessionId: string }>("/payments/stripe/checkout-session", {
      method: "POST",
      body: { orderId },
    }),
};

// ---------- Deliveries ----------

export const deliveries = {
  create: (body: {
    orderId: string;
    driverName?: string;
    driverPhone?: string;
    trackingNumber?: string;
    estimatedDate?: string;
  }) => request<Delivery>("/deliveries", { method: "POST", body }),
  list: () => request<Delivery[]>("/deliveries"),
  byOrder: (orderId: string) => request<Delivery>(`/deliveries/order/${orderId}`),
  get: (id: string) => request<Delivery>(`/deliveries/${id}`),
  remove: (id: string) => request<void>(`/deliveries/${id}`, { method: "DELETE" }),
  updateStatus: (id: string, body: { deliveryStatus: string }) =>
    request<Delivery>(`/deliveries/${id}/status`, { method: "PATCH", body }),
};

// ---------- Payouts ----------

export const payouts = {
  create: (body: {
    farmerId: string;
    amountUsd: number;
    amountKhr?: number;
    payoutDate: string;
    reference?: string;
  }) => request<Payout>("/payouts", { method: "POST", body }),
  list: () => request<Payout[]>("/payouts"),
  byFarmer: (farmerId: string) => request<Payout[]>(`/payouts/farmer/${farmerId}`),
  get: (id: string) => request<Payout>(`/payouts/${id}`),
  remove: (id: string) => request<void>(`/payouts/${id}`, { method: "DELETE" }),
  updateStatus: (id: string, body: { status: string }) =>
    request<Payout>(`/payouts/${id}/status`, { method: "PATCH", body }),
};

// ---------- Product Reviews ----------

export const productReviews = {
  create: (body: { productId: string; rating: number; comment?: string }) =>
    request<ProductReview>("/product-reviews", { method: "POST", body }),
  list: () => request<ProductReview[]>("/product-reviews"),
  byProduct: (productId: string) =>
    request<ProductReview[]>(`/product-reviews/product/${productId}`),
  get: (id: string) => request<ProductReview>(`/product-reviews/${id}`),
  remove: (id: string) =>
    request<void>(`/product-reviews/${id}`, { method: "DELETE" }),
};

// ---------- Notifications ----------

export const notifications = {
  create: (body: { userId: string; title: string; message: string }) =>
    request<Notification>("/notifications", { method: "POST", body }),
  list: () => request<Notification[]>("/notifications"),
  mine: () => request<Notification[]>("/notifications/me"),
  markRead: (id: string) =>
    request<Notification>(`/notifications/${id}/read`, { method: "PATCH" }),
  markAllRead: () =>
    request<void>("/notifications/me/read-all", { method: "PATCH" }),
  remove: (id: string) => request<void>(`/notifications/${id}`, { method: "DELETE" }),
};

// ---------- Wishlists ----------

export const wishlists = {
  add: (body: { productId: string }) =>
    request<Wishlist>("/wishlists", { method: "POST", body }),
  list: () => request<Wishlist[]>("/wishlists"),
  mine: () => request<Wishlist[]>("/wishlists/me"),
  remove: (id: string) => request<void>(`/wishlists/${id}`, { method: "DELETE" }),
  removeByProduct: (productId: string) =>
    request<void>(`/wishlists/product/${productId}`, { method: "DELETE" }),
};

// ---------- Support Tickets ----------

export const supportTickets = {
  create: (body: { subject: string; message: string }) =>
    request<SupportTicket>("/support-tickets", { method: "POST", body }),
  list: () => request<SupportTicket[]>("/support-tickets"),
  mine: () => request<SupportTicket[]>("/support-tickets/me"),
  get: (id: string) => request<SupportTicket>(`/support-tickets/${id}`),
  reply: (id: string, body: { message: string }) =>
    request<SupportTicketReply>(`/support-tickets/${id}/replies`, { method: "POST", body }),
  updateStatus: (id: string, body: { status: string }) =>
    request<SupportTicket>(`/support-tickets/${id}/status`, { method: "PATCH", body }),
};

// ---------- Stats ----------

export const stats = {
  public: () => request<PublicStats>("/stats/public", { auth: false }),
};

const api = {
  auth,
  profile,
  farmers,
  provinces,
  products,
  inventory,
  customers,
  carts,
  orders,
  payments,
  deliveries,
  payouts,
  productReviews,
  notifications,
  wishlists,
  supportTickets,
  stats,
};

export default api;
