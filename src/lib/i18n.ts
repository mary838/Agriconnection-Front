export type Language = "en" | "km" | "zh" | "fr";

export const LANGUAGES: { code: Language; label: string }[] = [
  { code: "km", label: "ខ្មែរ" },
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
  { code: "fr", label: "Français" },
];

type Perspective = {
  title: string;
  description: string;
  features: string[];
  cta: string;
};

export type Dictionary = {
  nav: {
    home: string;
    marketplace: string;
    farmerPortal: string;
    admin: string;
    myAccount: string;
    notifications: string;
    markAllRead: string;
    noNotifications: string;
    signIn: string;
    logOut: string;
    profile: string;
    toggleMenu: string;
    language: string;
  };
  hero: {
    eyebrow: string;
    headline1: string;
    headline2: string;
    description: string;
    shopToday: string;
    sellAsFarmer: string;
    activeFarms: string;
    ordersFulfilled: string;
    organicStandard: string;
    lastHarvest: string;
    harvestedToday: string;
    defaultFarmName: string;
  };
  harvest: {
    title: string;
    subtitle: string;
    viewFullInventory: string;
    by: string;
    localFarmer: string;
    noProduce: string;
  };
  perspectives: {
    eyebrow: string;
    title: string;
    consumer: Perspective;
    farmer: Perspective;
    admin: Perspective;
  };
  howItWorks: {
    title: string;
    steps: { title: string; description: string }[];
  };
  realFarms: {
    eyebrow: string;
    titleMain: string;
    titleItalic: string;
    description: string;
    cta: string;
  };
  marketplace: {
    eyebrow: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    filters: string;
    priceRange: string;
    min: string;
    max: string;
    to: string;
    clear: string;
    apply: string;
    sortRecommended: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
    sortNewest: string;
    allProduce: string;
    loading: string;
    noProduceFound: string;
    tryDifferent: string;
    localFarmer: string;
    wishlistOnlyCustomer: string;
    wishlistUpdateFailed: string;
    addToWishlist: string;
    removeFromWishlist: string;
    somethingWrong: string;
  };
  footer: {
    description: string;
    marketplaceTitle: string;
    freshHarvest: string;
    ourFarmers: string;
    seasonalBoxes: string;
    wholesale: string;
    platformTitle: string;
    farmerPortal: string;
    adminConsole: string;
    apiDocs: string;
    support: string;
    copyright: string;
    privacy: string;
    terms: string;
    sustainability: string;
  };
  ourFarmersPage: {
    eyebrow: string;
    title: string;
    description: string;
    principles: { title: string; body: string }[];
    ctaTitle: string;
    ctaDescription: string;
    becomeFarmer: string;
    browseProduce: string;
  };
  seasonalPage: {
    eyebrow: string;
    title: string;
    description: string;
    boxes: { name: string; cadence: string; body: string }[];
    packedTitle: string;
    packedBody: string;
    varietyTitle: string;
    varietyBody: string;
    ctaTitle: string;
    ctaDescription: string;
    browseProduce: string;
  };
  wholesalePage: {
    eyebrow: string;
    title: string;
    description: string;
    steps: { title: string; body: string }[];
    ctaTitle: string;
    ctaDescription: string;
    emailWholesaleTeam: string;
    contactSupport: string;
  };
  docsPage: {
    eyebrow: string;
    title: string;
    description: string;
    baseUrlLabel: string;
    authLabel: string;
    authBody: string;
    formatLabel: string;
    formatBody: string;
    groupAuth: string;
    groupCatalog: string;
    groupCommerce: string;
    groupAccount: string;
  };
  supportPage: {
    eyebrow: string;
    title: string;
    description: string;
    faqs: { q: string; a: string }[];
    haveAccountTitle: string;
    haveAccountBody: string;
    openTicket: string;
    loginToOpenTicket: string;
    emailUsTitle: string;
    emailUsBody: string;
  };
  notificationsPage: {
    eyebrow: string;
    title: string;
    description: string;
    loading: string;
    deleteConfirm: string;
  };
  privacyPage: {
    eyebrow: string;
    title: string;
    lastUpdated: string;
    sections: { title: string; body: string }[];
  };
  termsPage: {
    eyebrow: string;
    title: string;
    lastUpdated: string;
    sections: { title: string; body: string }[];
  };
  sustainabilityPage: {
    eyebrow: string;
    title: string;
    description: string;
    commitments: { title: string; body: string }[];
  };
  dashboard: {
    shared: {
      signOut: string;
      yourProfile: string;
      viewProfileFallback: string;
      adminFallbackName: string;
      navOverview: string;
      navOrders: string;
      navProducts: string;
      navInventory: string;
      navReports: string;
      navSupport: string;
      navFarmers: string;
      navWishlist: string;
      customerPortalLabel: string;
      farmerPortalLabel: string;
      adminPortalLabel: string;
      adminConsoleLabel: string;
      platformAdminLabel: string;
      na: string;
      somethingWrong: string;
      save: string;
      saving: string;
      cancel: string;
      edit: string;
      addStock: string;
      delete: string;
      deleting: string;
      viewAll: string;
      newTicket: string;
      yourTickets: string;
      subjectLabel: string;
      messageLabel: string;
      submitTicket: string;
      submitting: string;
      describeIssuePlaceholder: string;
      noTicketsYet: string;
      viewConversation: string;
      hideConversation: string;
      noRepliesYet: string;
      replyPlaceholder: string;
      sendReply: string;
      sending: string;
      you: string;
      support: string;
      statTotalFarmers: string;
      statTotalProducts: string;
      statTotalCustomers: string;
      statTotalOrders: string;
      statTotalRevenue: string;
    };
    customerHome: {
      loading: string;
      welcomeBack: string;
      helloPrefix: string;
      hungry: string;
      defaultCustomerName: string;
      customerNameLabel: string;
      phoneLabel: string;
      districtLabel: string;
      provinceLabel: string;
      provinceIdPrefix: string;
      profileNotFoundTitle: string;
      profileNotFoundBody: string;
      orderPrefix: string;
      orderInProgress: string;
      orderCancelled: string;
      delivered: string;
      noAddressYet: string;
      trackOrder: string;
      trackerPlaced: string;
      trackerPaid: string;
      trackerShipped: string;
      trackerDelivered: string;
      noOrdersTitle: string;
      noOrdersBody: string;
      goToMarketplace: string;
      recentOrdersTitle: string;
      noOrdersInline: string;
      wishlistTitle: string;
      nothingSavedYet: string;
      defaultProductName: string;
      moveAllToBasket: string;
      moving: string;
    };
    customerOrders: {
      loading: string;
      title: string;
      noOrdersYet: string;
      orderPrefix: string;
      noDestination: string;
    };
    customerSupport: {
      loading: string;
      title: string;
      subjectPlaceholder: string;
    };
    customerWishlist: {
      loading: string;
      title: string;
      nothingSavedYet: string;
      defaultProductName: string;
      moveToCartAria: string;
      removeAria: string;
    };
    farmerHome: {
      loading: string;
      greetingMorning: string;
      greetingAfternoon: string;
      greetingEvening: string;
      defaultFarmerName: string;
      performanceOverview: string;
      viewReports: string;
      newProduct: string;
      totalRevenue: string;
      fromPayouts: string;
      recentOrders: string;
      activeSuffix: string;
      productsListed: string;
      inYourCatalog: string;
      platformHealth: string;
      optimal: string;
      pendingWord: string;
      verifiedFarmer: string;
      pendingFarmer: string;
      farmerCodeLabel: string;
      phoneLabel: string;
      provinceLabel: string;
      provinceIdPrefix: string;
      statusLabel: string;
      currentInventory: string;
      viewCatalog: string;
      noProductsYet: string;
      addFirstProduct: string;
      inStockUnits: string;
      incomingOrders: string;
      noOrdersYet: string;
      seeFullAnalytics: string;
      defaultCustomerName: string;
      orderPrefix: string;
      itemWord: string;
      itemWordPlural: string;
    };
    farmerInventory: {
      loading: string;
      eyebrow: string;
      title: string;
      noProductsYet: string;
      addFirstProduct: string;
      provinceNotSet: string;
      stockQtyLabel: string;
      lowStockAtLabel: string;
      bothFieldsRequired: string;
      noProvinceSet: string;
      failedToSaveInventory: string;
      unitsSuffix: string;
      lowAtPrefix: string;
      noInventoryRecord: string;
      inStockDefault: string;
    };
    farmerOrders: {
      loading: string;
      eyebrow: string;
      title: string;
      noOrdersYet: string;
      orderPrefix: string;
      noDestination: string;
      failedToUpdateOrder: string;
    };
    farmerProducts: {
      loading: string;
      eyebrow: string;
      title: string;
      newProduct: string;
      noProductsYet: string;
      addFirstProduct: string;
      uncategorized: string;
      inStockUnits: string;
      stockNA: string;
      deleteConfirm: string;
      failedToDeleteProduct: string;
    };
    farmerNewProduct: {
      loading: string;
      backToDashboard: string;
      eyebrow: string;
      title: string;
      noProvinceWarningPart1: string;
      noProvinceWarningLink: string;
      noProvinceWarningPart2: string;
      productCodeLabel: string;
      productCodePlaceholder: string;
      productNameLabel: string;
      productNamePlaceholder: string;
      productDescriptionLabel: string;
      productDescriptionPlaceholder: string;
      translationsTitle: string;
      translationsHelpText: string;
      categoryLabel: string;
      noCategoriesAvailable: string;
      productImagesLabel: string;
      uploadHelpText: string;
      imagePreviewLabel: string;
      mainBadge: string;
      removeImageAria: string;
      priceUsdLabel: string;
      unitLabel: string;
      unitKg: string;
      unitPiece: string;
      unitBunch: string;
      stockQuantityLabel: string;
      lowStockThresholdLabel: string;
      createProduct: string;
      creatingProduct: string;
      translatingProduct: string;
      errFarmerNotFound: string;
      errNoProvince: string;
      errProductCodeRequired: string;
      errNameRequired: string;
      errCategoryRequired: string;
      errPriceRequired: string;
      errStockRequired: string;
      errImageRequired: string;
      errMaxImages: string;
    };
    farmerReports: {
      loading: string;
      eyebrow: string;
      title: string;
      totalPayouts: string;
      paidOut: string;
      pendingLabel: string;
      productsListed: string;
      payoutHistory: string;
      noPayoutsYet: string;
      inventoryHealth: string;
      lowStockDescription: string;
      outOfPrefix: string;
      totalProductWord: string;
      totalProductWordPlural: string;
    };
    farmerSupport: {
      loading: string;
      title: string;
      subjectPlaceholder: string;
    };
    adminHome: {
      title: string;
      titleSuffix: string;
      liveCount: string;
      failedToLoad: string;
      monthlySales: string;
      revenueAcrossFarms: string;
      last6Months: string;
      last3Months: string;
      thisYear: string;
      topPerformers: string;
      bestsellingProducts: string;
      farmerAccounts: string;
      manageGrowers: string;
      searchFarmersPlaceholder: string;
      addFarmer: string;
      colFarm: string;
      colRegion: string;
      colPhone: string;
      colStatus: string;
      colActions: string;
      loadingFarmers: string;
      noFarmersFound: string;
      viewLink: string;
    };
    adminFarmers: {
      title: string;
      failedToLoadFarmers: string;
      filterAll: string;
      filterVerified: string;
      filterPending: string;
      filterSuspended: string;
      searchFarmersPlaceholder: string;
      colFarm: string;
      colRegion: string;
      colPhone: string;
      colJoined: string;
      colStatus: string;
      colActions: string;
      loadingFarmers: string;
      noFarmersFound: string;
      viewLink: string;
    };
    adminFarmerDetail: {
      backToFarmers: string;
      loadingFarmer: string;
      farmerNotFound: string;
      farmDetails: string;
      noBioProvided: string;
      provinceLabel: string;
      joinedLabel: string;
      verifiedAtLabel: string;
      notVerified: string;
      addressLabel: string;
      contactLabel: string;
      productsLabel: string;
      productWord: string;
      productWordPlural: string;
      noProductsListed: string;
    };
    adminOrders: {
      title: string;
      failedToLoadOrders: string;
      failedToUpdateOrder: string;
      allOrders: string;
      loadingEllipsis: string;
      orderWord: string;
      orderWordPlural: string;
      searchOrdersPlaceholder: string;
      colOrder: string;
      colCustomer: string;
      colPlaced: string;
      colTotal: string;
      colStatus: string;
      loadingOrders: string;
      noOrdersFound: string;
    };
    adminProducts: {
      title: string;
      failedToLoadProducts: string;
      allProducts: string;
      loadingEllipsis: string;
      productWord: string;
      productWordPlural: string;
      searchProductsPlaceholder: string;
      colProduct: string;
      colFarm: string;
      colCategory: string;
      colPrice: string;
      colStock: string;
      loadingProducts: string;
      noProductsFound: string;
    };
    adminReports: {
      title: string;
      failedToLoadReports: string;
      ordersByStatus: string;
      breakdownAcrossPlatform: string;
      noOrdersYet: string;
      topCategories: string;
      productsByCategory: string;
      noProductsYet: string;
      farmerPayouts: string;
      totalDisbursed: string;
      acrossPrefix: string;
      payoutWord: string;
      payoutWordPlural: string;
    };
    adminSupport: {
      title: string;
      allTickets: string;
      loadingEllipsis: string;
      ticketWord: string;
      ticketWordPlural: string;
      searchTicketsPlaceholder: string;
      colSubject: string;
      colRequester: string;
      colCreated: string;
      colStatus: string;
      loadingTickets: string;
      noTicketsFound: string;
      unknown: string;
      failedToUpdateTicket: string;
    };
  };
};

export const translations: Record<Language, Dictionary> = {
  en: {
    nav: {
      home: "Home",
      marketplace: "Marketplace",
      farmerPortal: "Farmer Portal",
      admin: "Admin",
      myAccount: "My Account",
      notifications: "Notifications",
      markAllRead: "Mark all as read",
      noNotifications: "No notifications yet.",
      signIn: "Sign in",
      logOut: "Log out",
      profile: "Profile",
      toggleMenu: "Toggle menu",
      language: "Language",
    },
    hero: {
      eyebrow: "Est. 2026 — Field to Front Door",
      headline1: "Rooted in honesty.",
      headline2: "Picked at dawn.",
      description:
        "A direct marketplace where small-scale farmers meet conscious kitchens. Track every harvest from the field to your basket — no warehouses, no middlemen.",
      shopToday: "Shop today's harvest",
      sellAsFarmer: "Sell as a farmer",
      activeFarms: "Active Farms",
      ordersFulfilled: "Orders Fulfilled",
      organicStandard: "Organic Standard",
      lastHarvest: "Last Harvest",
      harvestedToday: "Harvested Today",
      defaultFarmName: "North Valley Farm",
    },
    harvest: {
      title: "This week's harvest",
      subtitle: "Directly sourced, arriving in our hubs this morning.",
      viewFullInventory: "View full inventory →",
      by: "by",
      localFarmer: "Local Farmer",
      noProduce: "No produce available right now.",
    },
    perspectives: {
      eyebrow: "Built for Three",
      title: "One ecosystem, three perspectives.",
      consumer: {
        title: "For Consumers",
        description:
          "Browse what's in season this week, follow your favorite farms, and track every order from harvest to doorstep.",
        features: [
          "Search & filter produce",
          "Order tracking",
          "Purchase history",
          "Profile management",
        ],
        cta: "Customer dashboard →",
      },
      farmer: {
        title: "For Farmers",
        description:
          "Turn your harvest into a storefront. Manage inventory, fulfill orders, and watch your revenue grow.",
        features: [
          "Inventory management",
          "Order fulfillment",
          "Sales analytics",
          "Pricing tools",
        ],
        cta: "Farmer portal →",
      },
      admin: {
        title: "For Administrators",
        description:
          "Govern the platform — verify growers, manage categories, and monitor every transaction in one console.",
        features: [
          "Farmer accounts",
          "Order oversight",
          "Revenue reports",
          "Platform analytics",
        ],
        cta: "Admin console →",
      },
    },
    howItWorks: {
      title: "How AgriConnect works",
      steps: [
        {
          title: "Farmers list daily",
          description:
            "Verified growers add fresh harvests to the marketplace each morning with transparent pricing.",
        },
        {
          title: "You order with confidence",
          description:
            "Every product is traceable. Pay securely. Know exactly which farm grew your food.",
        },
        {
          title: "Delivered direct",
          description:
            "Picked, packed and shipped in under 24 hours. Track your order from field to table.",
        },
      ],
    },
    realFarms: {
      eyebrow: "Meet the Growers",
      titleMain: "Real farms.",
      titleItalic: "Real names.",
      description:
        "420+ independent farms list their daily harvest on AgriConnect. We verify every grower, audit every claim, and make sure 85¢ of every dollar goes back to the farm.",
      cta: "Browse our farmer collective →",
    },
    marketplace: {
      eyebrow: "The Marketplace",
      title: "Today's fresh harvest",
      subtitle: "Browse fresh products from verified local farmers.",
      searchPlaceholder: "Search produce, farms, categories...",
      filters: "Filters",
      priceRange: "Price range (USD)",
      min: "Min",
      max: "Max",
      to: "to",
      clear: "Clear",
      apply: "Apply",
      sortRecommended: "Sort: Recommended",
      sortPriceAsc: "Sort: Price low-high",
      sortPriceDesc: "Sort: Price high-low",
      sortNewest: "Sort: Newest",
      allProduce: "All produce",
      loading: "Loading products...",
      noProduceFound: 'No produce found for "{search}"',
      tryDifferent: "Try a different search or category.",
      localFarmer: "Local Farmer",
      wishlistOnlyCustomer: "Only customer accounts can use the wishlist.",
      wishlistUpdateFailed: "Failed to update wishlist.",
      addToWishlist: "Add to wishlist",
      removeFromWishlist: "Remove from wishlist",
      somethingWrong: "Something went wrong.",
    },
    footer: {
      description:
        "A direct marketplace bridging local farmers and conscious consumers. Honest soil, fair pricing, sunrise harvests.",
      marketplaceTitle: "Marketplace",
      freshHarvest: "Fresh Harvest",
      ourFarmers: "Our Farmers",
      seasonalBoxes: "Seasonal Boxes",
      wholesale: "Wholesale",
      platformTitle: "Platform",
      farmerPortal: "Farmer Portal",
      adminConsole: "Admin Console",
      apiDocs: "API Docs",
      support: "Support",
      copyright: "© 2026 AgriConnect. Grown with intent.",
      privacy: "Privacy",
      terms: "Terms",
      sustainability: "Sustainability",
    },
    ourFarmersPage: {
      eyebrow: "Our Farmers",
      title: "The people behind every harvest",
      description:
        "AgriConnect exists because farmers deserve a direct line to the people who eat what they grow. Every listing in the marketplace traces back to a real grower, not a warehouse.",
      principles: [
        {
          title: "Verified growers",
          body: "Every farmer on AgriConnect is verified before their first listing goes live, so you always know exactly who grew what you're buying.",
        },
        {
          title: "Fair pricing",
          body: "Farmers set their own prices and keep the majority of every sale — no middlemen marking up the harvest between the field and your door.",
        },
        {
          title: "Local first",
          body: "We connect you with growers in your own province, keeping produce fresher and food miles shorter.",
        },
      ],
      ctaTitle: "Growing something worth sharing?",
      ctaDescription:
        "Join AgriConnect as a farmer and start selling directly to conscious consumers in your area.",
      becomeFarmer: "Become a farmer",
      browseProduce: "Browse produce",
    },
    seasonalPage: {
      eyebrow: "Seasonal Boxes",
      title: "Let the season pick for you",
      description:
        "Instead of browsing product by product, a seasonal box brings you whatever is freshest right now, curated from nearby farms and delivered on a schedule that suits your kitchen.",
      boxes: [
        {
          name: "Sunrise Box",
          cadence: "Weekly",
          body: "A rotating mix of whatever's peaking that week — leafy greens, roots, and fruit picked within days of delivery.",
        },
        {
          name: "Harvest Table Box",
          cadence: "Bi-weekly",
          body: "A larger spread built for households cooking most meals at home, sized for four to six people.",
        },
        {
          name: "Single Farm Box",
          cadence: "Monthly",
          body: "Everything sourced from one farmer, so you get to know a single grower's soil, season, and specialties.",
        },
      ],
      packedTitle: "Packed to order",
      packedBody:
        "Boxes are assembled after farmers confirm what's ready to pick, so contents shift naturally with the season.",
      varietyTitle: "No two weeks alike",
      varietyBody:
        "Expect variety — a box in spring looks very different from one in late summer or harvest season.",
      ctaTitle: "Seasonal boxes are coming soon",
      ctaDescription:
        "We're rolling this out with our first group of farmers. In the meantime, browse the full marketplace for what's fresh today.",
      browseProduce: "Browse produce",
    },
    wholesalePage: {
      eyebrow: "Wholesale",
      title: "Bulk produce, straight from the farm",
      description:
        "AgriConnect works with restaurants, grocers, and community kitchens that need more than a weekly grocery order. Wholesale accounts buy directly from our farmers at volume pricing.",
      steps: [
        {
          title: "Tell us your volume",
          body: "Restaurants, markets, and co-ops can order in bulk quantities beyond what's listed for individual customers.",
        },
        {
          title: "Get a standing rate",
          body: "Wholesale accounts get a fixed price per unit for the season instead of per-order marketplace pricing.",
        },
        {
          title: "Recurring delivery",
          body: "Set a weekly or monthly delivery schedule directly with the farm supplying your order.",
        },
      ],
      ctaTitle: "Ready to set up a wholesale account?",
      ctaDescription:
        "Reach out with your business name, expected volume, and delivery area, and our team will match you with farmers who can fulfill it.",
      emailWholesaleTeam: "Email wholesale team",
      contactSupport: "Contact support",
    },
    docsPage: {
      eyebrow: "API Docs",
      title: "Build on AgriConnect",
      description:
        "The AgriConnect API is a REST service returning JSON. It backs this marketplace directly, so anything you can do in the app, you can do with a request.",
      baseUrlLabel: "Base URL",
      authLabel: "Authentication",
      authBody:
        "Log in via {loginPath} and send the returned token as {authHeader} on every subsequent request.",
      formatLabel: "Format",
      formatBody:
        "Requests and responses are JSON. Public catalog reads ({categoriesPath}, {provincesPath}) don't require a token.",
      groupAuth: "Auth",
      groupCatalog: "Catalog",
      groupCommerce: "Commerce",
      groupAccount: "Account",
    },
    supportPage: {
      eyebrow: "Support",
      title: "How can we help?",
      description:
        "Check the answers below, or reach out directly and our team will get back to you.",
      faqs: [
        {
          q: "How do I track an order?",
          a: "Log in and open Orders from your dashboard. Each order shows its current status, from confirmed through delivered.",
        },
        {
          q: "How do I become a farmer on AgriConnect?",
          a: "Head to the farmer registration page and submit your details. Your account is reviewed before you can list products.",
        },
        {
          q: "What if a delivery arrives damaged or incomplete?",
          a: "Open a support ticket from your dashboard with your order number — our team will follow up directly with you and the farmer.",
        },
        {
          q: "How do farmers get paid?",
          a: "Payouts are processed per order once a delivery is confirmed. Farmers can review payout history from their dashboard.",
        },
      ],
      haveAccountTitle: "Have an account already?",
      haveAccountBody:
        "Open a ticket from your dashboard and we'll track it against your account and order history.",
      openTicket: "Open a support ticket",
      loginToOpenTicket: "Log in to open a ticket",
      emailUsTitle: "Email us directly",
      emailUsBody: "For anything else, or if you don't have an account yet.",
    },
    notificationsPage: {
      eyebrow: "Updates",
      title: "Notifications",
      description: "Stay on top of your orders and account activity.",
      loading: "Loading notifications...",
      deleteConfirm: "Delete this notification? This cannot be undone.",
    },
    privacyPage: {
      eyebrow: "Legal",
      title: "Privacy Policy",
      lastUpdated: "Last updated July 2026",
      sections: [
        {
          title: "What we collect",
          body: "We collect the information you give us directly — your name, email, phone number, delivery address, and payment details — along with order and browsing activity needed to run the marketplace.",
        },
        {
          title: "How we use it",
          body: "Your information is used to process orders, connect you with the right farmer or customer, send order and account notifications, and improve the marketplace experience. We do not sell your personal data.",
        },
        {
          title: "Sharing with farmers and customers",
          body: "When you place an order, the farmer fulfilling it can see your name, delivery address, and order details. Farmers' business details are visible to customers browsing the marketplace.",
        },
        {
          title: "Data retention",
          body: "We keep account and order records for as long as your account is active, and for a limited period afterward to meet accounting and legal obligations.",
        },
        {
          title: "Your choices",
          body: "You can review and update your profile information at any time from your dashboard, or contact support to request deletion of your account.",
        },
      ],
    },
    termsPage: {
      eyebrow: "Legal",
      title: "Terms of Service",
      lastUpdated: "Last updated July 2026",
      sections: [
        {
          title: "Using AgriConnect",
          body: "By creating an account, you agree to provide accurate information and to use the marketplace only for lawful buying and selling of produce.",
        },
        {
          title: "Farmer accounts",
          body: "Farmers are responsible for the accuracy of their product listings, including pricing, availability, and quality. Listings that misrepresent a product may be removed.",
        },
        {
          title: "Orders and payment",
          body: "Placing an order is a commitment to purchase at the listed price. Payments are processed through AgriConnect and released to farmers once a delivery is confirmed.",
        },
        {
          title: "Cancellations and disputes",
          body: "Cancellation windows vary by farmer and order status. If an order arrives damaged, incomplete, or not as described, open a support ticket and our team will help resolve it.",
        },
        {
          title: "Account suspension",
          body: "We may suspend or remove accounts that violate these terms, misuse the platform, or repeatedly fail to fulfill orders.",
        },
        {
          title: "Changes to these terms",
          body: "We may update these terms as the platform evolves. Continued use of AgriConnect after an update means you accept the revised terms.",
        },
      ],
    },
    sustainabilityPage: {
      eyebrow: "Sustainability",
      title: "Grown with intent",
      description:
        "A direct marketplace is, by design, a lighter footprint — fewer intermediaries, fresher produce, and less waste between the field and your table.",
      commitments: [
        {
          title: "Shorter supply chains",
          body: "Produce moves directly from farmer to customer, cutting out the storage and transport steps that add food miles and spoilage.",
        },
        {
          title: "Sustainable growing practices",
          body: "We prioritize farmers who grow with soil health in mind — crop rotation, reduced chemical inputs, and water-conscious irrigation.",
        },
        {
          title: "Less waste",
          body: "Because orders are placed against real, current inventory, farmers harvest closer to what's actually needed instead of overproducing.",
        },
      ],
    },
    dashboard: {
      shared: {
        signOut: "Sign out",
        yourProfile: "Your Profile",
        viewProfileFallback: "View profile",
        adminFallbackName: "Admin",
        navOverview: "Overview",
        navOrders: "Orders",
        navProducts: "Products",
        navInventory: "Inventory",
        navReports: "Reports",
        navSupport: "Support",
        navFarmers: "Farmers",
        navWishlist: "Wishlist",
        customerPortalLabel: "Customer Portal",
        farmerPortalLabel: "Farmer Portal",
        adminPortalLabel: "Admin Portal",
        adminConsoleLabel: "Admin Console",
        platformAdminLabel: "Platform Admin",
        na: "N/A",
        somethingWrong: "Something went wrong.",
        save: "Save",
        saving: "Saving...",
        cancel: "Cancel",
        edit: "Edit",
        addStock: "Add stock",
        delete: "Delete",
        deleting: "Deleting...",
        viewAll: "View all",
        newTicket: "New ticket",
        yourTickets: "Your tickets",
        subjectLabel: "Subject",
        messageLabel: "Message",
        submitTicket: "Submit ticket",
        submitting: "Submitting...",
        describeIssuePlaceholder: "Describe the issue...",
        noTicketsYet: "You haven't opened any tickets yet.",
        viewConversation: "View conversation",
        hideConversation: "Hide conversation",
        noRepliesYet: "No replies yet.",
        replyPlaceholder: "Write a reply...",
        sendReply: "Send reply",
        sending: "Sending...",
        you: "You",
        support: "Support",
        statTotalFarmers: "TOTAL FARMERS",
        statTotalProducts: "TOTAL PRODUCTS",
        statTotalCustomers: "TOTAL CUSTOMERS",
        statTotalOrders: "TOTAL ORDERS",
        statTotalRevenue: "TOTAL REVENUE",
      },
      customerHome: {
        loading: "Loading customer dashboard...",
        welcomeBack: "Welcome Back",
        helloPrefix: "Hello,",
        hungry: "Hungry?",
        defaultCustomerName: "Customer",
        customerNameLabel: "Customer Name",
        phoneLabel: "Phone",
        districtLabel: "District",
        provinceLabel: "Province",
        provinceIdPrefix: "Province ID",
        profileNotFoundTitle: "Customer profile not found",
        profileNotFoundBody: "Your account exists, but no customer profile is connected yet.",
        orderPrefix: "Order #",
        orderInProgress: "Order in progress",
        orderCancelled: "Order cancelled",
        delivered: "Delivered",
        noAddressYet: "No address yet",
        trackOrder: "Track order",
        trackerPlaced: "Placed",
        trackerPaid: "Paid",
        trackerShipped: "Shipped",
        trackerDelivered: "Delivered",
        noOrdersTitle: "No orders yet",
        noOrdersBody: "Browse the marketplace to place your first order.",
        goToMarketplace: "Go to marketplace",
        recentOrdersTitle: "Recent orders",
        noOrdersInline: "You haven't placed any orders yet.",
        wishlistTitle: "Wishlist",
        nothingSavedYet: "Nothing saved yet.",
        defaultProductName: "Product",
        moveAllToBasket: "Move all to basket",
        moving: "Moving...",
      },
      customerOrders: {
        loading: "Loading orders...",
        title: "Your Orders",
        noOrdersYet: "You haven't placed any orders yet.",
        orderPrefix: "Order #",
        noDestination: "No destination set",
      },
      customerSupport: {
        loading: "Loading support tickets...",
        title: "Support",
        subjectPlaceholder: "Payment not reflected on my order",
      },
      customerWishlist: {
        loading: "Loading wishlist...",
        title: "Your Wishlist",
        nothingSavedYet: "Nothing saved yet.",
        defaultProductName: "Product",
        moveToCartAria: "Move to cart",
        removeAria: "Remove from wishlist",
      },
      farmerHome: {
        loading: "Loading farmer dashboard...",
        greetingMorning: "Morning",
        greetingAfternoon: "Afternoon",
        greetingEvening: "Evening",
        defaultFarmerName: "Farmer",
        performanceOverview: "Performance overview",
        viewReports: "View reports",
        newProduct: "+ New product",
        totalRevenue: "Total revenue",
        fromPayouts: "From payouts",
        recentOrders: "Recent orders",
        activeSuffix: "active",
        productsListed: "Products listed",
        inYourCatalog: "In your catalog",
        platformHealth: "Platform health",
        optimal: "Optimal",
        pendingWord: "Pending",
        verifiedFarmer: "Verified farmer",
        pendingFarmer: "Pending farmer",
        farmerCodeLabel: "Farmer Code",
        phoneLabel: "Phone",
        provinceLabel: "Province",
        provinceIdPrefix: "Province ID",
        statusLabel: "Status",
        currentInventory: "Current inventory",
        viewCatalog: "View catalog →",
        noProductsYet: "No products yet.",
        addFirstProduct: "Add your first product",
        inStockUnits: "In stock: {n} units",
        incomingOrders: "Incoming orders",
        noOrdersYet: "No orders yet.",
        seeFullAnalytics: "See full analytics ↗",
        defaultCustomerName: "Customer",
        orderPrefix: "Order #",
        itemWord: "item",
        itemWordPlural: "items",
      },
      farmerInventory: {
        loading: "Loading inventory...",
        eyebrow: "Stock",
        title: "Inventory",
        noProductsYet: "No products yet.",
        addFirstProduct: "Add your first product",
        provinceNotSet: "Province not set",
        stockQtyLabel: "Stock qty",
        lowStockAtLabel: "Low stock at",
        bothFieldsRequired: "Both fields are required.",
        noProvinceSet: "Your farmer profile has no province set.",
        failedToSaveInventory: "Failed to save inventory.",
        unitsSuffix: "units",
        lowAtPrefix: "Low at",
        noInventoryRecord: "No inventory record",
        inStockDefault: "in stock",
      },
      farmerOrders: {
        loading: "Loading orders...",
        eyebrow: "Fulfillment",
        title: "Orders",
        noOrdersYet: "No orders yet.",
        orderPrefix: "Order #",
        noDestination: "No destination set",
        failedToUpdateOrder: "Failed to update order.",
      },
      farmerProducts: {
        loading: "Loading products...",
        eyebrow: "Catalog",
        title: "Your products",
        newProduct: "+ New product",
        noProductsYet: "No products yet.",
        addFirstProduct: "Add your first product",
        uncategorized: "Uncategorized",
        inStockUnits: "In stock: {n} units",
        stockNA: "Stock: N/A",
        deleteConfirm: "Delete this product? This cannot be undone.",
        failedToDeleteProduct: "Failed to delete product.",
      },
      farmerNewProduct: {
        loading: "Loading product form...",
        backToDashboard: "← Back to dashboard",
        eyebrow: "Farmer Product",
        title: "Add new product",
        noProvinceWarningPart1: "Your farmer profile has no province set, so inventory cannot be created yet. ",
        noProvinceWarningLink: "Update your province in your profile",
        noProvinceWarningPart2: " first.",
        productCodeLabel: "Product Code",
        productCodePlaceholder: "P-001",
        productNameLabel: "Product Name",
        productNamePlaceholder: "Organic Mango",
        productDescriptionLabel: "Description",
        productDescriptionPlaceholder: "Sweet, juicy mangoes picked fresh.",
        translationsTitle: "Automatic translation",
        translationsHelpText: "Your product name and description are translated automatically into Khmer, English, Chinese, and French — customers will see it in whichever language they select from the menu.",
        categoryLabel: "Category",
        noCategoriesAvailable: "No categories available",
        productImagesLabel: "Product Images",
        uploadHelpText: "Upload 1 to {max} images. You can select more than once to add more. The first image will be used as the main product image. ({count}/{max} selected)",
        imagePreviewLabel: "Image Preview",
        mainBadge: "Main",
        removeImageAria: "Remove image {n}",
        priceUsdLabel: "Price USD",
        unitLabel: "Unit",
        unitKg: "kg",
        unitPiece: "piece",
        unitBunch: "bunch",
        stockQuantityLabel: "Stock Quantity",
        lowStockThresholdLabel: "Low Stock Threshold",
        createProduct: "Create product and inventory",
        creatingProduct: "Creating product...",
        translatingProduct: "Translating product...",
        errFarmerNotFound: "Farmer profile not found.",
        errNoProvince: "Your farmer profile has no province set. Please update your province in your profile before creating a product.",
        errProductCodeRequired: "Product code is required.",
        errNameRequired: "Product name is required.",
        errCategoryRequired: "Category is required.",
        errPriceRequired: "Price is required.",
        errStockRequired: "Stock quantity is required.",
        errImageRequired: "Please upload at least one image.",
        errMaxImages: "You can upload maximum {max} images.",
      },
      farmerReports: {
        loading: "Loading reports...",
        eyebrow: "Analytics",
        title: "Reports",
        totalPayouts: "Total payouts",
        paidOut: "Paid out",
        pendingLabel: "Pending",
        productsListed: "Products listed",
        payoutHistory: "Payout history",
        noPayoutsYet: "No payouts recorded yet.",
        inventoryHealth: "Inventory health",
        lowStockDescription: "Products at or below their low-stock threshold",
        outOfPrefix: "out of",
        totalProductWord: "total product",
        totalProductWordPlural: "total products",
      },
      farmerSupport: {
        loading: "Loading support tickets...",
        title: "Support",
        subjectPlaceholder: "Payout hasn't arrived yet",
      },
      adminHome: {
        title: "Platform overview",
        titleSuffix: "— this month",
        liveCount: "Live count",
        failedToLoad: "Failed to load",
        monthlySales: "Monthly sales",
        revenueAcrossFarms: "Revenue across all farms",
        last6Months: "Last 6 months",
        last3Months: "Last 3 months",
        thisYear: "This year",
        topPerformers: "Top performers",
        bestsellingProducts: "Bestselling products",
        farmerAccounts: "Farmer accounts",
        manageGrowers: "Manage growers and their products",
        searchFarmersPlaceholder: "Search farmers",
        addFarmer: "Add farmer",
        colFarm: "FARM",
        colRegion: "REGION",
        colPhone: "PHONE",
        colStatus: "STATUS",
        colActions: "ACTIONS",
        loadingFarmers: "Loading farmers…",
        noFarmersFound: "No farmers found.",
        viewLink: "View →",
      },
      adminFarmers: {
        title: "Farmers",
        failedToLoadFarmers: "Failed to load farmers.",
        filterAll: "All",
        filterVerified: "Verified",
        filterPending: "Pending",
        filterSuspended: "Suspended",
        searchFarmersPlaceholder: "Search farmers",
        colFarm: "FARM",
        colRegion: "REGION",
        colPhone: "PHONE",
        colJoined: "JOINED",
        colStatus: "STATUS",
        colActions: "ACTIONS",
        loadingFarmers: "Loading farmers…",
        noFarmersFound: "No farmers found.",
        viewLink: "View →",
      },
      adminFarmerDetail: {
        backToFarmers: "Back to farmers",
        loadingFarmer: "Loading farmer…",
        farmerNotFound: "Farmer not found.",
        farmDetails: "Farm details",
        noBioProvided: "No bio provided.",
        provinceLabel: "Province",
        joinedLabel: "Joined",
        verifiedAtLabel: "Verified at",
        notVerified: "Not verified",
        addressLabel: "Address",
        contactLabel: "Contact",
        productsLabel: "Products",
        productWord: "product",
        productWordPlural: "products",
        noProductsListed: "No products listed yet.",
      },
      adminOrders: {
        title: "Orders",
        failedToLoadOrders: "Failed to load orders.",
        failedToUpdateOrder: "Failed to update order.",
        allOrders: "All orders",
        loadingEllipsis: "Loading...",
        orderWord: "order",
        orderWordPlural: "orders",
        searchOrdersPlaceholder: "Search orders",
        colOrder: "ORDER",
        colCustomer: "CUSTOMER",
        colPlaced: "PLACED",
        colTotal: "TOTAL",
        colStatus: "STATUS",
        loadingOrders: "Loading orders…",
        noOrdersFound: "No orders found.",
      },
      adminProducts: {
        title: "Products",
        failedToLoadProducts: "Failed to load products.",
        allProducts: "All products",
        loadingEllipsis: "Loading...",
        productWord: "product",
        productWordPlural: "products",
        searchProductsPlaceholder: "Search products or farms",
        colProduct: "PRODUCT",
        colFarm: "FARM",
        colCategory: "CATEGORY",
        colPrice: "PRICE",
        colStock: "STOCK",
        loadingProducts: "Loading products…",
        noProductsFound: "No products found.",
      },
      adminReports: {
        title: "Reports",
        failedToLoadReports: "Failed to load reports.",
        ordersByStatus: "Orders by status",
        breakdownAcrossPlatform: "Breakdown across the platform",
        noOrdersYet: "No orders yet.",
        topCategories: "Top categories",
        productsByCategory: "Products listed by category",
        noProductsYet: "No products yet.",
        farmerPayouts: "Farmer payouts",
        totalDisbursed: "Total disbursed to growers",
        acrossPrefix: "across",
        payoutWord: "payout",
        payoutWordPlural: "payouts",
      },
      adminSupport: {
        title: "Support tickets",
        allTickets: "All tickets",
        loadingEllipsis: "Loading...",
        ticketWord: "ticket",
        ticketWordPlural: "tickets",
        searchTicketsPlaceholder: "Search tickets",
        colSubject: "SUBJECT",
        colRequester: "REQUESTER",
        colCreated: "CREATED",
        colStatus: "STATUS",
        loadingTickets: "Loading tickets...",
        noTicketsFound: "No support tickets found.",
        unknown: "Unknown",
        failedToUpdateTicket: "Failed to update ticket.",
      },
    },
  },
  km: {
    nav: {
      home: "ទំព័រដើម",
      marketplace: "ផ្សារទំនើប",
      farmerPortal: "គេហទំព័រកសិករ",
      admin: "អ្នកគ្រប់គ្រង",
      myAccount: "គណនីរបស់ខ្ញុំ",
      notifications: "ការជូនដំណឹង",
      markAllRead: "សម្គាល់ថាបានអានទាំងអស់",
      noNotifications: "មិនទាន់មានការជូនដំណឹងទេ។",
      signIn: "ចូលគណនី",
      logOut: "ចាកចេញ",
      profile: "ប្រវត្តិរូប",
      toggleMenu: "បិទបើកម៉ឺនុយ",
      language: "ភាសា",
    },
    hero: {
      eyebrow: "បង្កើតឡើងឆ្នាំ ២០២៦ — ពីស្រែដល់មុខផ្ទះ",
      headline1: "ចាក់ឬសនៅលើភាពស្មោះត្រង់។",
      headline2: "បេះនៅពេលថ្ងៃរះ។",
      description:
        "ជាទីផ្សារផ្ទាល់ដែលកសិករខ្នាតតូចជួបជុំគ្នាជាមួយផ្ទះបាយដែលយកចិត្តទុកដាក់។ តាមដានរាល់ការប្រមូលផលពីស្រែរហូតដល់កន្ត្រករបស់អ្នក — គ្មានឃ្លាំង គ្មានអន្ទាក់កណ្តាល។",
      shopToday: "ទិញផលិតផលថ្ងៃនេះ",
      sellAsFarmer: "លក់ក្នុងនាមកសិករ",
      activeFarms: "កសិដ្ឋានសកម្ម",
      ordersFulfilled: "ការបញ្ជាទិញបានបំពេញ",
      organicStandard: "ស្តង់ដារសរីរាង្គ",
      lastHarvest: "ការប្រមូលផលចុងក្រោយ",
      harvestedToday: "ប្រមូលផលថ្ងៃនេះ",
      defaultFarmName: "កសិដ្ឋានឧបទ្វីបខាងជើង",
    },
    harvest: {
      title: "ការប្រមូលផលសប្តាហ៍នេះ",
      subtitle: "ដឹកជញ្ជូនផ្ទាល់ មកដល់មជ្ឈមណ្ឌលរបស់យើងព្រឹកនេះ។",
      viewFullInventory: "មើលស្តុកទាំងអស់ →",
      by: "ដោយ",
      localFarmer: "កសិករក្នុងតំបន់",
      noProduce: "មិនមានផលិតផលទេនាពេលនេះ។",
    },
    perspectives: {
      eyebrow: "បង្កើតឡើងសម្រាប់អ្នកប្រើប្រាស់បីប្រភេទ",
      title: "ប្រព័ន្ធអេកូមួយ ទស្សនវិស័យបី។",
      consumer: {
        title: "សម្រាប់អតិថិជន",
        description:
          "រកមើលអ្វីដែលកំពុងមានតាមរដូវក្នុងសប្តាហ៍នេះ តាមដានកសិដ្ឋានដែលអ្នកចូលចិត្ត និងតាមដានរាល់ការបញ្ជាទិញពីការប្រមូលផលរហូតដល់មុខទ្វារ។",
        features: [
          "ស្វែងរក និងត្រងផលិតផល",
          "ការតាមដានការបញ្ជាទិញ",
          "ប្រវត្តិការទិញ",
          "ការគ្រប់គ្រងប្រវត្តិរូប",
        ],
        cta: "ផ្ទាំងគ្រប់គ្រងអតិថិជន →",
      },
      farmer: {
        title: "សម្រាប់កសិករ",
        description:
          "ប្រែក្លាយការប្រមូលផលរបស់អ្នកទៅជាហាងអនឡាញ។ គ្រប់គ្រងស្តុក បំពេញការបញ្ជាទិញ និងមើលចំណូលរបស់អ្នកកើនឡើង។",
        features: [
          "ការគ្រប់គ្រងស្តុក",
          "ការបំពេញការបញ្ជាទិញ",
          "ការវិភាគការលក់",
          "ឧបករណ៍កំណត់តម្លៃ",
        ],
        cta: "គេហទំព័រកសិករ →",
      },
      admin: {
        title: "សម្រាប់អ្នកគ្រប់គ្រង",
        description:
          "គ្រប់គ្រងវេទិកា — ផ្ទៀងផ្ទាត់កសិករ គ្រប់គ្រងប្រភេទផលិតផល និងតាមដានរាល់ប្រតិបត្តិការនៅក្នុងកុងសូលតែមួយ។",
        features: [
          "គណនីកសិករ",
          "ការត្រួតពិនិត្យការបញ្ជាទិញ",
          "របាយការណ៍ចំណូល",
          "ការវិភាគវេទិកា",
        ],
        cta: "កុងសូលអ្នកគ្រប់គ្រង →",
      },
    },
    howItWorks: {
      title: "របៀបដែល AgriConnect ដំណើរការ",
      steps: [
        {
          title: "កសិករបញ្ជីរាល់ថ្ងៃ",
          description:
            "កសិករដែលបានផ្ទៀងផ្ទាត់បញ្ចូលផលិតផលថ្មីទៅក្នុងទីផ្សារជារៀងរាល់ព្រឹក ជាមួយនឹងតម្លៃច្បាស់លាស់។",
        },
        {
          title: "អ្នកបញ្ជាទិញដោយទំនុកចិត្ត",
          description:
            "ផលិតផលគ្រប់មុខអាចតាមដានប្រភពបានច្បាស់លាស់។ ទូទាត់ប្រាក់ដោយសុវត្ថិភាព។ ដឹងច្បាស់ថាកសិដ្ឋានណាបានដាំដុះម្ហូបអាហាររបស់អ្នក។",
        },
        {
          title: "ដឹកជញ្ជូនផ្ទាល់",
          description:
            "ប្រមូលផល វេចខ្ចប់ និងដឹកជញ្ជូនក្នុងរយៈពេលតិចជាង ២៤ ម៉ោង។ តាមដានការបញ្ជាទិញរបស់អ្នកពីស្រែរហូតដល់តុអាហារ។",
        },
      ],
    },
    realFarms: {
      eyebrow: "ជួបជុំកសិករ",
      titleMain: "កសិដ្ឋានពិតប្រាកដ។",
      titleItalic: "ឈ្មោះពិតប្រាកដ។",
      description:
        "កសិដ្ឋានឯករាជ្យជាង ៤២០ បញ្ជីការប្រមូលផលប្រចាំថ្ងៃរបស់ពួកគេនៅលើ AgriConnect។ យើងផ្ទៀងផ្ទាត់កសិករគ្រប់រូប ត្រួតពិនិត្យរាល់ការអះអាង និងធានាថា ៨៥ សេន្តនៃរាល់មួយដុល្លារត្រឡប់ទៅកសិដ្ឋានវិញ។",
      cta: "រកមើលសហគមន៍កសិករយើង →",
    },
    marketplace: {
      eyebrow: "ទីផ្សារ",
      title: "ការប្រមូលផលថ្មីថ្ងៃនេះ",
      subtitle: "រកមើលផលិតផលថ្មីៗពីកសិករក្នុងតំបន់ដែលបានផ្ទៀងផ្ទាត់។",
      searchPlaceholder: "ស្វែងរកផលិតផល កសិដ្ឋាន ប្រភេទ...",
      filters: "តម្រង",
      priceRange: "ចន្លោះតម្លៃ (ដុល្លារ)",
      min: "អប្បបរមា",
      max: "អតិបរមា",
      to: "ដល់",
      clear: "សម្អាត",
      apply: "អនុវត្ត",
      sortRecommended: "តម្រៀប៖ ណែនាំ",
      sortPriceAsc: "តម្រៀប៖ តម្លៃទាបទៅខ្ពស់",
      sortPriceDesc: "តម្រៀប៖ តម្លៃខ្ពស់ទៅទាប",
      sortNewest: "តម្រៀប៖ ថ្មីបំផុត",
      allProduce: "ផលិតផលទាំងអស់",
      loading: "កំពុងផ្ទុកផលិតផល...",
      noProduceFound: 'រកមិនឃើញផលិតផលសម្រាប់ "{search}"',
      tryDifferent: "សាកល្បងស្វែងរក ឬប្រភេទផ្សេង។",
      localFarmer: "កសិករក្នុងតំបន់",
      wishlistOnlyCustomer: "មានតែគណនីអតិថិជនប៉ុណ្ណោះដែលអាចប្រើបញ្ជីចង់បាន។",
      wishlistUpdateFailed: "បរាជ័យក្នុងការធ្វើបច្ចុប្បន្នភាពបញ្ជីចង់បាន។",
      addToWishlist: "បញ្ចូលទៅបញ្ជីចង់បាន",
      removeFromWishlist: "លុបចេញពីបញ្ជីចង់បាន",
      somethingWrong: "មានបញ្ហាកើតឡើង។",
    },
    footer: {
      description:
        "ជាទីផ្សារផ្ទាល់ដែលភ្ជាប់កសិករក្នុងតំបន់ជាមួយអ្នកប្រើប្រាស់ដែលយកចិត្តទុកដាក់។ ដីស្មោះត្រង់ តម្លៃយុត្តិធម៌ ការប្រមូលផលពេលថ្ងៃរះ។",
      marketplaceTitle: "ទីផ្សារ",
      freshHarvest: "ការប្រមូលផលថ្មី",
      ourFarmers: "កសិករយើង",
      seasonalBoxes: "ប្រអប់តាមរដូវ",
      wholesale: "លក់ដុំ",
      platformTitle: "វេទិកា",
      farmerPortal: "គេហទំព័រកសិករ",
      adminConsole: "កុងសូលអ្នកគ្រប់គ្រង",
      apiDocs: "ឯកសារ API",
      support: "ជំនួយ",
      copyright: "© ២០២៦ AgriConnect។ លូតលាស់ដោយចេតនា។",
      privacy: "ភាពឯកជន",
      terms: "លក្ខខណ្ឌ",
      sustainability: "និរន្តរភាព",
    },
    ourFarmersPage: {
      eyebrow: "កសិករយើង",
      title: "មនុស្សនៅពីក្រោយរាល់ការប្រមូលផល",
      description:
        "AgriConnect កើតឡើងពីព្រោះកសិករសមនឹងទទួលបានទំនាក់ទំនងផ្ទាល់ជាមួយអ្នកដែលទទួលទានអ្វីដែលពួកគេដាំដុះ។ រាល់ការចុះបញ្ជីនៅក្នុងទីផ្សារអាចតាមដានទៅដល់កសិករពិតប្រាកដ មិនមែនឃ្លាំងឡើយ។",
      principles: [
        {
          title: "កសិករដែលបានផ្ទៀងផ្ទាត់",
          body: "កសិករគ្រប់រូបនៅលើ AgriConnect ត្រូវបានផ្ទៀងផ្ទាត់មុននឹងការចុះបញ្ជីដំបូងរបស់ពួកគេចាប់ផ្ដើមដំណើរការ ដូច្នេះអ្នកតែងតែដឹងច្បាស់ថាអ្នកណាបានដាំដុះអ្វីដែលអ្នកកំពុងទិញ។",
        },
        {
          title: "តម្លៃយុត្តិធម៌",
          body: "កសិករកំណត់តម្លៃដោយខ្លួនឯង និងរក្សាទុកភាគច្រើននៃការលក់នីមួយៗ — គ្មានអន្ទាក់កណ្តាលដែលដំឡើងតម្លៃរវាងស្រែនិងទ្វារផ្ទះអ្នកឡើយ។",
        },
        {
          title: "ក្នុងតំបន់ជាមុន",
          body: "យើងភ្ជាប់អ្នកជាមួយកសិករនៅក្នុងខេត្តរបស់អ្នកផ្ទាល់ ដើម្បីរក្សាផលិតផលឲ្យស្រស់ថ្មី និងកាត់បន្ថយចម្ងាយដឹកជញ្ជូន។",
        },
      ],
      ctaTitle: "កំពុងដាំដុះអ្វីមួយសក្តិសមនឹងចែករំលែក?",
      ctaDescription:
        "ចូលរួមជាមួយ AgriConnect ក្នុងនាមជាកសិករ ហើយចាប់ផ្ដើមលក់ដោយផ្ទាល់ទៅកាន់អ្នកប្រើប្រាស់ដែលយកចិត្តទុកដាក់នៅក្នុងតំបន់របស់អ្នក។",
      becomeFarmer: "ក្លាយជាកសិករ",
      browseProduce: "រកមើលផលិតផល",
    },
    seasonalPage: {
      eyebrow: "ប្រអប់តាមរដូវ",
      title: "ឲ្យរដូវជ្រើសរើសសម្រាប់អ្នក",
      description:
        "ជំនួសឲ្យការរកមើលផលិតផលម្តងមួយៗ ប្រអប់តាមរដូវនាំមកអ្នកនូវអ្វីដែលស្រស់បំផុតឥឡូវនេះ ដែលបានជ្រើសរើសយកពីកសិដ្ឋាននៅជិតៗ និងដឹកជញ្ជូនតាមកាលវិភាគសមស្របនឹងផ្ទះបាយរបស់អ្នក។",
      boxes: [
        {
          name: "ប្រអប់ថ្ងៃរះ",
          cadence: "រៀងរាល់សប្តាហ៍",
          body: "ការលាយបញ្ចូលគ្នាដែលផ្លាស់ប្តូរនៃអ្វីៗដែលកំពុងល្អបំផុតសប្តាហ៍នោះ — បន្លែស្លឹក ដំណាំមូល និងផ្លែឈើដែលបេះក្នុងរយៈពេលពីរបីថ្ងៃមុនដឹកជញ្ជូន។",
        },
        {
          name: "ប្រអប់តុប្រមូលផល",
          cadence: "រៀងរាល់ពីរសប្តាហ៍",
          body: "ការចែកចាយធំជាងសម្រាប់គ្រួសារដែលចម្អិនអាហារភាគច្រើននៅផ្ទះ ដែលមានទំហំសម្រាប់មនុស្សបួនទៅប្រាំមួយនាក់។",
        },
        {
          name: "ប្រអប់កសិដ្ឋានតែមួយ",
          cadence: "រៀងរាល់ខែ",
          body: "អ្វីៗទាំងអស់មកពីកសិករតែម្នាក់ ដូច្នេះអ្នកនឹងស្គាល់ដីធ្លី រដូវកាល និងជំនាញពិសេសរបស់កសិករម្នាក់ៗ។",
        },
      ],
      packedTitle: "វេចខ្ចប់តាមការកម្មង់",
      packedBody:
        "ប្រអប់ត្រូវបានប្រមូលផ្តុំបន្ទាប់ពីកសិករបញ្ជាក់ថាអ្វីខ្លះរួចរាល់សម្រាប់ការបេះ ដូច្នេះមាតិកាផ្លាស់ប្តូរដោយធម្មជាតិទៅតាមរដូវកាល។",
      varietyTitle: "គ្មានពីរសប្តាហ៍ណាដូចគ្នាឡើយ",
      varietyBody:
        "រំពឹងទុកភាពចម្រុះ — ប្រអប់មួយនៅរដូវផ្ការីកមើលទៅខុសគ្នាខ្លាំងពីមួយនៅចុងរដូវក្តៅ ឬរដូវប្រមូលផល។",
      ctaTitle: "ប្រអប់តាមរដូវនឹងមកដល់ឆាប់ៗនេះ",
      ctaDescription:
        "យើងកំពុងចាប់ផ្តើមជាមួយក្រុមកសិករដំបូងរបស់យើង។ ចន្លោះពេលនេះ សូមរកមើលទីផ្សារពេញលេញសម្រាប់អ្វីដែលស្រស់ថ្ងៃនេះ។",
      browseProduce: "រកមើលផលិតផល",
    },
    wholesalePage: {
      eyebrow: "លក់ដុំ",
      title: "ផលិតផលចំនួនច្រើន ផ្ទាល់ពីកសិដ្ឋាន",
      description:
        "AgriConnect ធ្វើការជាមួយភោជនីយដ្ឋាន អ្នកលក់គ្រឿងទេស និងផ្ទះបាយសហគមន៍ដែលត្រូវការច្រើនជាងការកម្មង់គ្រឿងទេសប្រចាំសប្តាហ៍។ គណនីលក់ដុំទិញផ្ទាល់ពីកសិករយើងក្នុងតម្លៃចំនួនច្រើន។",
      steps: [
        {
          title: "ប្រាប់យើងអំពីបរិមាណរបស់អ្នក",
          body: "ភោជនីយដ្ឋាន ផ្សារ និងសហករណ៍អាចកម្មង់ក្នុងបរិមាណច្រើនលើសពីអ្វីដែលបានចុះបញ្ជីសម្រាប់អតិថិជនម្នាក់ៗ។",
        },
        {
          title: "ទទួលបានអត្រាថេរ",
          body: "គណនីលក់ដុំទទួលបានតម្លៃថេរក្នុងមួយឯកតាសម្រាប់រដូវនេះ ជំនួសឲ្យតម្លៃទីផ្សារតាមការកម្មង់នីមួយៗ។",
        },
        {
          title: "ការដឹកជញ្ជូនតាមកាលកំណត់",
          body: "កំណត់កាលវិភាគដឹកជញ្ជូនប្រចាំសប្តាហ៍ ឬប្រចាំខែដោយផ្ទាល់ជាមួយកសិដ្ឋានដែលផ្គត់ផ្គង់ការកម្មង់របស់អ្នក។",
        },
      ],
      ctaTitle: "ត្រៀមរួចរាល់ដើម្បីបង្កើតគណនីលក់ដុំហើយឬនៅ?",
      ctaDescription:
        "ទាក់ទងមកជាមួយឈ្មោះអាជីវកម្មរបស់អ្នក បរិមាណរំពឹងទុក និងតំបន់ដឹកជញ្ជូន ហើយក្រុមការងាររបស់យើងនឹងផ្គូផ្គងអ្នកជាមួយកសិករដែលអាចបំពេញបាន។",
      emailWholesaleTeam: "ផ្ញើអ៊ីមែលទៅក្រុមលក់ដុំ",
      contactSupport: "ទាក់ទងផ្នែកជំនួយ",
    },
    docsPage: {
      eyebrow: "ឯកសារ API",
      title: "សាងសង់លើ AgriConnect",
      description:
        "API របស់ AgriConnect គឺជាសេវាកម្ម REST ដែលត្រឡប់ជា JSON។ វាគាំទ្រទីផ្សារនេះដោយផ្ទាល់ ដូច្នេះអ្វីដែលអ្នកអាចធ្វើនៅក្នុងកម្មវិធី អ្នកអាចធ្វើវាតាមរយៈសំណើមួយ។",
      baseUrlLabel: "URL មូលដ្ឋាន",
      authLabel: "ការផ្ទៀងផ្ទាត់",
      authBody:
        "ចូលគណនីតាមរយៈ {loginPath} ហើយផ្ញើសញ្ញាសម្គាល់ដែលទទួលបានជា {authHeader} នៅលើសំណើបន្ទាប់ៗទាំងអស់។",
      formatLabel: "ទម្រង់",
      formatBody:
        "សំណើ និងការឆ្លើយតបគឺជា JSON។ ការអានកាតាឡុកសាធារណៈ ({categoriesPath}, {provincesPath}) មិនតម្រូវឲ្យប្រើសញ្ញាសម្គាល់ទេ។",
      groupAuth: "ការផ្ទៀងផ្ទាត់",
      groupCatalog: "កាតាឡុក",
      groupCommerce: "ពាណិជ្ជកម្ម",
      groupAccount: "គណនី",
    },
    supportPage: {
      eyebrow: "ជំនួយ",
      title: "តើយើងអាចជួយអ្វីបានខ្លះ?",
      description:
        "ពិនិត្យមើលចម្លើយខាងក្រោម ឬទាក់ទងដោយផ្ទាល់ ហើយក្រុមការងាររបស់យើងនឹងឆ្លើយតបទៅអ្នក។",
      faqs: [
        {
          q: "តើខ្ញុំតាមដានការបញ្ជាទិញដោយរបៀបណា?",
          a: "ចូលគណនី ហើយបើកផ្នែក«ការបញ្ជាទិញ» ពីផ្ទាំងគ្រប់គ្រងរបស់អ្នក។ ការបញ្ជាទិញនីមួយៗបង្ហាញស្ថានភាពបច្ចុប្បន្នរបស់វា ចាប់ពីបានបញ្ជាក់រហូតដល់បានដឹកជញ្ជូន។",
        },
        {
          q: "តើខ្ញុំក្លាយជាកសិករនៅលើ AgriConnect ដោយរបៀបណា?",
          a: "ចូលទៅកាន់ទំព័រចុះឈ្មោះកសិករ ហើយដាក់ស្នើព័ត៌មានលម្អិតរបស់អ្នក។ គណនីរបស់អ្នកនឹងត្រូវបានពិនិត្យមុននឹងអ្នកអាចចុះបញ្ជីផលិតផល។",
        },
        {
          q: "ចុះបើការដឹកជញ្ជូនមកដល់ខូច ឬមិនពេញលេញ?",
          a: "បើកសំបុត្រជំនួយពីផ្ទាំងគ្រប់គ្រងរបស់អ្នកជាមួយលេខការបញ្ជាទិញ — ក្រុមការងាររបស់យើងនឹងតាមដានដោយផ្ទាល់ជាមួយអ្នក និងកសិករ។",
        },
        {
          q: "តើកសិករទទួលបានប្រាក់ដោយរបៀបណា?",
          a: "ការទូទាត់ត្រូវបានដំណើរការតាមការបញ្ជាទិញនីមួយៗ បន្ទាប់ពីការដឹកជញ្ជូនត្រូវបានបញ្ជាក់។ កសិករអាចពិនិត្យប្រវត្តិការទូទាត់ពីផ្ទាំងគ្រប់គ្រងរបស់ពួកគេ។",
        },
      ],
      haveAccountTitle: "មានគណនីរួចហើយមែនទេ?",
      haveAccountBody:
        "បើកសំបុត្រពីផ្ទាំងគ្រប់គ្រងរបស់អ្នក ហើយយើងនឹងតាមដានវាទៅតាមគណនី និងប្រវត្តិការបញ្ជាទិញរបស់អ្នក។",
      openTicket: "បើកសំបុត្រជំនួយ",
      loginToOpenTicket: "ចូលគណនីដើម្បីបើកសំបុត្រ",
      emailUsTitle: "អ៊ីមែលមកយើងដោយផ្ទាល់",
      emailUsBody: "សម្រាប់អ្វីផ្សេងទៀត ឬប្រសិនបើអ្នកមិនទាន់មានគណនីនៅឡើយ។",
    },
    notificationsPage: {
      eyebrow: "ព័ត៌មានថ្មី",
      title: "ការជូនដំណឹង",
      description: "តាមដានការបញ្ជាទិញ និងសកម្មភាពគណនីរបស់អ្នក។",
      loading: "កំពុងផ្ទុកការជូនដំណឹង...",
      deleteConfirm: "លុបការជូនដំណឹងនេះ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។",
    },
    privacyPage: {
      eyebrow: "ផ្លូវច្បាប់",
      title: "គោលការណ៍ភាពឯកជន",
      lastUpdated: "បានធ្វើបច្ចុប្បន្នភាពចុងក្រោយ ខែកក្កដា ២០២៦",
      sections: [
        {
          title: "អ្វីដែលយើងប្រមូល",
          body: "យើងប្រមូលព័ត៌មានដែលអ្នកផ្តល់ឲ្យយើងដោយផ្ទាល់ — ឈ្មោះ អ៊ីមែល លេខទូរស័ព្ទ អាសយដ្ឋានដឹកជញ្ជូន និងព័ត៌មានទូទាត់ — រួមជាមួយសកម្មភាពការបញ្ជាទិញ និងការរុករកដែលចាំបាច់ដើម្បីដំណើរការទីផ្សារ។",
        },
        {
          title: "របៀបយើងប្រើវា",
          body: "ព័ត៌មានរបស់អ្នកត្រូវបានប្រើដើម្បីដំណើរការការបញ្ជាទិញ ភ្ជាប់អ្នកជាមួយកសិករ ឬអតិថិជនត្រឹមត្រូវ ផ្ញើការជូនដំណឹងអំពីការបញ្ជាទិញ និងគណនី និងកែលម្អបទពិសោធន៍ទីផ្សារ។ យើងមិនលក់ទិន្នន័យផ្ទាល់ខ្លួនរបស់អ្នកឡើយ។",
        },
        {
          title: "ការចែករំលែកជាមួយកសិករ និងអតិថិជន",
          body: "នៅពេលអ្នកកម្មង់ កសិករដែលបំពេញការកម្មង់នោះអាចមើលឃើញឈ្មោះ អាសយដ្ឋានដឹកជញ្ជូន និងព័ត៌មានលម្អិតការបញ្ជាទិញរបស់អ្នក។ ព័ត៌មានលម្អិតអាជីវកម្មរបស់កសិករអាចមើលឃើញដោយអតិថិជនដែលកំពុងរកមើលទីផ្សារ។",
        },
        {
          title: "ការរក្សាទុកទិន្នន័យ",
          body: "យើងរក្សាកំណត់ត្រាគណនី និងការបញ្ជាទិញរបស់អ្នកអស់រយៈពេលដែលគណនីរបស់អ្នកនៅសកម្ម និងរយៈពេលកំណត់មួយបន្ទាប់មកដើម្បីបំពេញកាតព្វកិច្ចគណនេយ្យ និងច្បាប់។",
        },
        {
          title: "ជម្រើសរបស់អ្នក",
          body: "អ្នកអាចពិនិត្យ និងធ្វើបច្ចុប្បន្នភាពព័ត៌មានប្រវត្តិរូបរបស់អ្នកគ្រប់ពេលពីផ្ទាំងគ្រប់គ្រងរបស់អ្នក ឬទាក់ទងផ្នែកជំនួយដើម្បីស្នើសុំលុបគណនីរបស់អ្នក។",
        },
      ],
    },
    termsPage: {
      eyebrow: "ផ្លូវច្បាប់",
      title: "លក្ខខណ្ឌប្រើប្រាស់",
      lastUpdated: "បានធ្វើបច្ចុប្បន្នភាពចុងក្រោយ ខែកក្កដា ២០២៦",
      sections: [
        {
          title: "ការប្រើប្រាស់ AgriConnect",
          body: "តាមរយៈការបង្កើតគណនី អ្នកយល់ព្រមផ្តល់ព័ត៌មានត្រឹមត្រូវ និងប្រើទីផ្សារនេះសម្រាប់តែការទិញ និងលក់ផលិតផលស្របច្បាប់ប៉ុណ្ណោះ។",
        },
        {
          title: "គណនីកសិករ",
          body: "កសិករទទួលខុសត្រូវចំពោះភាពត្រឹមត្រូវនៃការចុះបញ្ជីផលិតផលរបស់ពួកគេ រួមទាំងតម្លៃ ភាពមាន និងគុណភាព។ ការចុះបញ្ជីដែលធ្វើឲ្យយល់ច្រឡំអំពីផលិតផលអាចត្រូវបានដកចេញ។",
        },
        {
          title: "ការបញ្ជាទិញ និងការទូទាត់",
          body: "ការធ្វើការបញ្ជាទិញគឺជាការប្តេជ្ញាទិញតាមតម្លៃដែលបានចុះបញ្ជី។ ការទូទាត់ត្រូវបានដំណើរការតាមរយៈ AgriConnect ហើយចេញផ្តល់ទៅកសិករនៅពេលការដឹកជញ្ជូនត្រូវបានបញ្ជាក់។",
        },
        {
          title: "ការលុបចោល និងវិវាទ",
          body: "ថិរវេលាលុបចោលប្រែប្រួលទៅតាមកសិករ និងស្ថានភាពការបញ្ជាទិញ។ ប្រសិនបើការបញ្ជាទិញមកដល់ខូច មិនពេញលេញ ឬមិនដូចអ្វីដែលបានពិពណ៌នា សូមបើកសំបុត្រជំនួយ ហើយក្រុមការងាររបស់យើងនឹងជួយដោះស្រាយ។",
        },
        {
          title: "ការផ្អាកគណនី",
          body: "យើងអាចផ្អាក ឬដកគណនីដែលបំពានលក្ខខណ្ឌទាំងនេះ ប្រើប្រាស់វេទិកាខុសរបៀប ឬបរាជ័យម្តងហើយម្តងទៀតក្នុងការបំពេញការបញ្ជាទិញ។",
        },
        {
          title: "ការផ្លាស់ប្តូរលក្ខខណ្ឌទាំងនេះ",
          body: "យើងអាចធ្វើបច្ចុប្បន្នភាពលក្ខខណ្ឌទាំងនេះនៅពេលវេទិកាវិវត្ត។ ការបន្តប្រើប្រាស់ AgriConnect បន្ទាប់ពីការធ្វើបច្ចុប្បន្នភាពមានន័យថាអ្នកទទួលយកលក្ខខណ្ឌដែលបានកែប្រែ។",
        },
      ],
    },
    sustainabilityPage: {
      eyebrow: "និរន្តរភាព",
      title: "លូតលាស់ដោយចេតនា",
      description:
        "ទីផ្សារផ្ទាល់គឺដោយធម្មតារចនាមកជាមួយកម្រិតឥទ្ធិពលស្រាលជាង — កាត់បន្ថយអន្ទាក់កណ្តាល ផលិតផលស្រស់ជាង និងកាកសំណល់តិចជាងរវាងស្រែនិងតុអាហាររបស់អ្នក។",
      commitments: [
        {
          title: "ខ្សែសង្វាក់ផ្គត់ផ្គង់ខ្លីជាង",
          body: "ផលិតផលធ្វើដំណើរដោយផ្ទាល់ពីកសិករទៅអតិថិជន កាត់បន្ថយជំហានផ្ទុក និងដឹកជញ្ជូនដែលបន្ថែមចម្ងាយ និងការខូចខាត។",
        },
        {
          title: "វិធីសាស្ត្រដាំដុះប្រកបដោយចីរភាព",
          body: "យើងផ្តល់អាទិភាពដល់កសិករដែលដាំដុះដោយគិតគូរអំពីសុខភាពដី — ការបង្វិលដំណាំ ការកាត់បន្ថយសារធាតុគីមី និងការស្រោចស្រពដែលយកចិត្តទុកដាក់លើទឹក។",
        },
        {
          title: "កាកសំណល់តិចជាង",
          body: "ដោយសារការបញ្ជាទិញត្រូវបានធ្វើឡើងទាក់ទងនឹងស្តុកពិតប្រាកដបច្ចុប្បន្ន កសិករប្រមូលផលកាន់តែជិតនឹងអ្វីដែលត្រូវការជាក់ស្តែង ជំនួសឲ្យការផលិតលើសកម្រិត។",
        },
      ],
    },
    dashboard: {
      shared: {
        signOut: "ចាកចេញ",
        yourProfile: "ប្រវត្តិរូបរបស់អ្នក",
        viewProfileFallback: "មើលប្រវត្តិរូប",
        adminFallbackName: "អ្នកគ្រប់គ្រង",
        navOverview: "ទិដ្ឋភាពទូទៅ",
        navOrders: "ការបញ្ជាទិញ",
        navProducts: "ផលិតផល",
        navInventory: "ស្តុក",
        navReports: "របាយការណ៍",
        navSupport: "ជំនួយ",
        navFarmers: "កសិករ",
        navWishlist: "បញ្ជីចង់បាន",
        customerPortalLabel: "គេហទំព័រអតិថិជន",
        farmerPortalLabel: "គេហទំព័រកសិករ",
        adminPortalLabel: "គេហទំព័រអ្នកគ្រប់គ្រង",
        adminConsoleLabel: "កុងសូលអ្នកគ្រប់គ្រង",
        platformAdminLabel: "អ្នកគ្រប់គ្រងវេទិកា",
        na: "មិនមាន",
        somethingWrong: "មានបញ្ហាកើតឡើង។",
        save: "រក្សាទុក",
        saving: "កំពុងរក្សាទុក...",
        cancel: "បោះបង់",
        edit: "កែសម្រួល",
        addStock: "បញ្ចូលស្តុក",
        delete: "លុប",
        deleting: "កំពុងលុប...",
        viewAll: "មើលទាំងអស់",
        newTicket: "សំបុត្រថ្មី",
        yourTickets: "សំបុត្ររបស់អ្នក",
        subjectLabel: "ប្រធានបទ",
        messageLabel: "សារ",
        submitTicket: "ដាក់ស្នើសំបុត្រ",
        submitting: "កំពុងដាក់ស្នើ...",
        describeIssuePlaceholder: "ពិពណ៌នាអំពីបញ្ហា...",
        noTicketsYet: "អ្នកមិនទាន់បើកសំបុត្រណាមួយនៅឡើយទេ។",
        viewConversation: "មើលការសន្ទនា",
        hideConversation: "លាក់ការសន្ទនា",
        noRepliesYet: "មិនទាន់មានការឆ្លើយតបនៅឡើយទេ។",
        replyPlaceholder: "សរសេរការឆ្លើយតប...",
        sendReply: "ផ្ញើការឆ្លើយតប",
        sending: "កំពុងផ្ញើ...",
        you: "អ្នក",
        support: "ផ្នែកគាំទ្រ",
        statTotalFarmers: "កសិករសរុប",
        statTotalProducts: "ផលិតផលសរុប",
        statTotalCustomers: "អតិថិជនសរុប",
        statTotalOrders: "ការបញ្ជាទិញសរុប",
        statTotalRevenue: "ចំណូលសរុប",
      },
      customerHome: {
        loading: "កំពុងផ្ទុកផ្ទាំងគ្រប់គ្រងអតិថិជន...",
        welcomeBack: "សូមស្វាគមន៍មកវិញ",
        helloPrefix: "សួស្តី,",
        hungry: "ឃ្លានទេ?",
        defaultCustomerName: "អតិថិជន",
        customerNameLabel: "ឈ្មោះអតិថិជន",
        phoneLabel: "ទូរស័ព្ទ",
        districtLabel: "ស្រុក",
        provinceLabel: "ខេត្ត",
        provinceIdPrefix: "លេខសម្គាល់ខេត្ត",
        profileNotFoundTitle: "រកមិនឃើញប្រវត្តិរូបអតិថិជន",
        profileNotFoundBody: "គណនីរបស់អ្នកមានហើយ ប៉ុន្តែមិនទាន់មានប្រវត្តិរូបអតិថិជនភ្ជាប់នៅឡើយទេ។",
        orderPrefix: "ការបញ្ជាទិញ #",
        orderInProgress: "ការបញ្ជាទិញកំពុងដំណើរការ",
        orderCancelled: "ការបញ្ជាទិញត្រូវបានលុបចោល",
        delivered: "បានប្រគល់",
        noAddressYet: "មិនទាន់មានអាសយដ្ឋានទេ",
        trackOrder: "តាមដានការបញ្ជាទិញ",
        trackerPlaced: "បានដាក់ការបញ្ជាទិញ",
        trackerPaid: "បានទូទាត់",
        trackerShipped: "បានដឹកជញ្ជូន",
        trackerDelivered: "បានប្រគល់",
        noOrdersTitle: "មិនទាន់មានការបញ្ជាទិញទេ",
        noOrdersBody: "រកមើលទីផ្សារដើម្បីធ្វើការបញ្ជាទិញលើកដំបូងរបស់អ្នក។",
        goToMarketplace: "ទៅកាន់ទីផ្សារ",
        recentOrdersTitle: "ការបញ្ជាទិញថ្មីៗ",
        noOrdersInline: "អ្នកមិនទាន់បានធ្វើការបញ្ជាទិញណាមួយនៅឡើយទេ។",
        wishlistTitle: "បញ្ជីចង់បាន",
        nothingSavedYet: "មិនទាន់រក្សាទុកអ្វីនៅឡើយទេ។",
        defaultProductName: "ផលិតផល",
        moveAllToBasket: "ផ្ទេរទាំងអស់ទៅកន្ត្រក",
        moving: "កំពុងផ្ទេរ...",
      },
      customerOrders: {
        loading: "កំពុងផ្ទុកការបញ្ជាទិញ...",
        title: "ការបញ្ជាទិញរបស់អ្នក",
        noOrdersYet: "អ្នកមិនទាន់បានធ្វើការបញ្ជាទិញណាមួយនៅឡើយទេ។",
        orderPrefix: "ការបញ្ជាទិញ #",
        noDestination: "មិនទាន់កំណត់ទីតាំងដឹកជញ្ជូនទេ",
      },
      customerSupport: {
        loading: "កំពុងផ្ទុកសំបុត្រជំនួយ...",
        title: "ជំនួយ",
        subjectPlaceholder: "ការទូទាត់មិនបានបង្ហាញនៅលើការបញ្ជាទិញរបស់ខ្ញុំ",
      },
      customerWishlist: {
        loading: "កំពុងផ្ទុកបញ្ជីចង់បាន...",
        title: "បញ្ជីចង់បានរបស់អ្នក",
        nothingSavedYet: "មិនទាន់រក្សាទុកអ្វីនៅឡើយទេ។",
        defaultProductName: "ផលិតផល",
        moveToCartAria: "ផ្ទេរទៅកន្ត្រក",
        removeAria: "លុបចេញពីបញ្ជីចង់បាន",
      },
      farmerHome: {
        loading: "កំពុងផ្ទុកផ្ទាំងគ្រប់គ្រងកសិករ...",
        greetingMorning: "អរុណ",
        greetingAfternoon: "រសៀល",
        greetingEvening: "ល្ងាច",
        defaultFarmerName: "កសិករ",
        performanceOverview: "ទិដ្ឋភាពទូទៅនៃការអនុវត្តការងារ",
        viewReports: "មើលរបាយការណ៍",
        newProduct: "+ ផលិតផលថ្មី",
        totalRevenue: "ចំណូលសរុប",
        fromPayouts: "ពីការទូទាត់ប្រាក់",
        recentOrders: "ការបញ្ជាទិញថ្មីៗ",
        activeSuffix: "សកម្ម",
        productsListed: "ផលិតផលបានចុះបញ្ជី",
        inYourCatalog: "នៅក្នុងកាតាឡុករបស់អ្នក",
        platformHealth: "សុខភាពវេទិកា",
        optimal: "ល្អប្រសើរ",
        pendingWord: "កំពុងរង់ចាំ",
        verifiedFarmer: "កសិករបានផ្ទៀងផ្ទាត់",
        pendingFarmer: "កសិករកំពុងរង់ចាំការផ្ទៀងផ្ទាត់",
        farmerCodeLabel: "កូដកសិករ",
        phoneLabel: "ទូរស័ព្ទ",
        provinceLabel: "ខេត្ត",
        provinceIdPrefix: "លេខសម្គាល់ខេត្ត",
        statusLabel: "ស្ថានភាព",
        currentInventory: "ស្តុកបច្ចុប្បន្ន",
        viewCatalog: "មើលកាតាឡុក →",
        noProductsYet: "មិនទាន់មានផលិតផលទេ។",
        addFirstProduct: "បញ្ចូលផលិតផលដំបូងរបស់អ្នក",
        inStockUnits: "នៅក្នុងស្តុក៖ {n} ឯកតា",
        incomingOrders: "ការបញ្ជាទិញចូល",
        noOrdersYet: "មិនទាន់មានការបញ្ជាទិញទេ។",
        seeFullAnalytics: "មើលការវិភាគពេញលេញ ↗",
        defaultCustomerName: "អតិថិជន",
        orderPrefix: "ការបញ្ជាទិញ #",
        itemWord: "មុខទំនិញ",
        itemWordPlural: "មុខទំនិញ",
      },
      farmerInventory: {
        loading: "កំពុងផ្ទុកស្តុក...",
        eyebrow: "ស្តុក",
        title: "ស្តុកទំនិញ",
        noProductsYet: "មិនទាន់មានផលិតផលទេ។",
        addFirstProduct: "បញ្ចូលផលិតផលដំបូងរបស់អ្នក",
        provinceNotSet: "មិនទាន់កំណត់ខេត្តទេ",
        stockQtyLabel: "ចំនួនស្តុក",
        lowStockAtLabel: "ស្តុកទាបនៅ",
        bothFieldsRequired: "ត្រូវការទាំងពីរប្រអប់។",
        noProvinceSet: "ប្រវត្តិរូបកសិករបស់អ្នកមិនទាន់កំណត់ខេត្តទេ។",
        failedToSaveInventory: "បរាជ័យក្នុងការរក្សាទុកស្តុក។",
        unitsSuffix: "ឯកតា",
        lowAtPrefix: "ទាបនៅ",
        noInventoryRecord: "គ្មានកំណត់ត្រាស្តុក",
        inStockDefault: "មានស្តុក",
      },
      farmerOrders: {
        loading: "កំពុងផ្ទុកការបញ្ជាទិញ...",
        eyebrow: "ការបំពេញការបញ្ជាទិញ",
        title: "ការបញ្ជាទិញ",
        noOrdersYet: "មិនទាន់មានការបញ្ជាទិញទេ។",
        orderPrefix: "ការបញ្ជាទិញ #",
        noDestination: "មិនទាន់កំណត់ទីតាំងដឹកជញ្ជូនទេ",
        failedToUpdateOrder: "បរាជ័យក្នុងការធ្វើបច្ចុប្បន្នភាពការបញ្ជាទិញ។",
      },
      farmerProducts: {
        loading: "កំពុងផ្ទុកផលិតផល...",
        eyebrow: "កាតាឡុក",
        title: "ផលិតផលរបស់អ្នក",
        newProduct: "+ ផលិតផលថ្មី",
        noProductsYet: "មិនទាន់មានផលិតផលទេ។",
        addFirstProduct: "បញ្ចូលផលិតផលដំបូងរបស់អ្នក",
        uncategorized: "គ្មានប្រភេទ",
        inStockUnits: "នៅក្នុងស្តុក៖ {n} ឯកតា",
        stockNA: "ស្តុក៖ មិនមាន",
        deleteConfirm: "លុបផលិតផលនេះ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។",
        failedToDeleteProduct: "បរាជ័យក្នុងការលុបផលិតផល។",
      },
      farmerNewProduct: {
        loading: "កំពុងផ្ទុកទម្រង់ផលិតផល...",
        backToDashboard: "← ត្រឡប់ទៅផ្ទាំងគ្រប់គ្រង",
        eyebrow: "ផលិតផលកសិករ",
        title: "បញ្ចូលផលិតផលថ្មី",
        noProvinceWarningPart1: "ប្រវត្តិរូបកសិករបស់អ្នកមិនទាន់កំណត់ខេត្តទេ ដូច្នេះស្តុកមិនអាចបង្កើតបានទេ។ ",
        noProvinceWarningLink: "ធ្វើបច្ចុប្បន្នភាពខេត្តរបស់អ្នកនៅក្នុងប្រវត្តិរូបរបស់អ្នក",
        noProvinceWarningPart2: " សិន។",
        productCodeLabel: "កូដផលិតផល",
        productCodePlaceholder: "P-001",
        productNameLabel: "ឈ្មោះផលិតផល",
        productNamePlaceholder: "ស្វាយសរីរាង្គ",
        productDescriptionLabel: "ការពិពណ៌នា",
        productDescriptionPlaceholder: "ស្វាយផ្អែម ទំពាំងស្រស់",
        translationsTitle: "ការបកប្រែស្វ័យប្រវត្តិ",
        translationsHelpText: "ឈ្មោះ និងការពិពណ៌នាផលិតផលរបស់អ្នកនឹងត្រូវបានបកប្រែដោយស្វ័យប្រវត្តិទៅជាភាសាខ្មែរ អង់គ្លេស ចិន និងបារាំង — អតិថិជននឹងឃើញវាជាភាសាដែលពួកគេជ្រើសរើសពីម៉ឺនុយ។",
        categoryLabel: "ប្រភេទ",
        noCategoriesAvailable: "គ្មានប្រភេទដែលអាចប្រើបាន",
        productImagesLabel: "រូបភាពផលិតផល",
        uploadHelpText: "បញ្ចូលរូបភាព ១ ដល់ {max}។ អ្នកអាចជ្រើសរើសច្រើនដងដើម្បីបញ្ចូលបន្ថែម។ រូបភាពទីមួយនឹងត្រូវប្រើជារូបភាពមេនៃផលិតផល។ ({count}/{max} បានជ្រើសរើស)",
        imagePreviewLabel: "ការមើលរូបភាពជាមុន",
        mainBadge: "សំខាន់",
        removeImageAria: "លុបរូបភាព {n}",
        priceUsdLabel: "តម្លៃ (ដុល្លារ)",
        unitLabel: "ឯកតា",
        unitKg: "គីឡូក្រាម",
        unitPiece: "ដុំ",
        unitBunch: "កណ្ដាប់",
        stockQuantityLabel: "ចំនួនស្តុក",
        lowStockThresholdLabel: "កម្រិតស្តុកទាប",
        createProduct: "បង្កើតផលិតផល និងស្តុក",
        creatingProduct: "កំពុងបង្កើតផលិតផល...",
        translatingProduct: "កំពុងបកប្រែផលិតផល...",
        errFarmerNotFound: "រកមិនឃើញប្រវត្តិរូបកសិករ។",
        errNoProvince: "ប្រវត្តិរូបកសិករបស់អ្នកមិនទាន់កំណត់ខេត្តទេ។ សូមធ្វើបច្ចុប្បន្នភាពខេត្តរបស់អ្នកនៅក្នុងប្រវត្តិរូបរបស់អ្នកមុននឹងបង្កើតផលិតផល។",
        errProductCodeRequired: "ត្រូវការកូដផលិតផល។",
        errNameRequired: "ត្រូវការឈ្មោះផលិតផល។",
        errCategoryRequired: "ត្រូវការប្រភេទ។",
        errPriceRequired: "ត្រូវការតម្លៃ។",
        errStockRequired: "ត្រូវការចំនួនស្តុក។",
        errImageRequired: "សូមបញ្ចូលរូបភាពយ៉ាងហោចណាស់មួយ។",
        errMaxImages: "អ្នកអាចបញ្ចូលរូបភាពអតិបរមា {max}។",
      },
      farmerReports: {
        loading: "កំពុងផ្ទុករបាយការណ៍...",
        eyebrow: "ការវិភាគ",
        title: "របាយការណ៍",
        totalPayouts: "ការទូទាត់សរុប",
        paidOut: "បានទូទាត់រួច",
        pendingLabel: "កំពុងរង់ចាំ",
        productsListed: "ផលិតផលបានចុះបញ្ជី",
        payoutHistory: "ប្រវត្តិការទូទាត់",
        noPayoutsYet: "មិនទាន់មានការទូទាត់ត្រូវបានកត់ត្រាទេ។",
        inventoryHealth: "សុខភាពស្តុក",
        lowStockDescription: "ផលិតផលនៅឬក្រោមកម្រិតស្តុកទាបរបស់វា",
        outOfPrefix: "ក្នុងចំណោម",
        totalProductWord: "ផលិតផលសរុប",
        totalProductWordPlural: "ផលិតផលសរុប",
      },
      farmerSupport: {
        loading: "កំពុងផ្ទុកសំបុត្រជំនួយ...",
        title: "ជំនួយ",
        subjectPlaceholder: "ការទូទាត់ប្រាក់មិនទាន់មកដល់",
      },
      adminHome: {
        title: "ទិដ្ឋភាពទូទៅវេទិកា",
        titleSuffix: "— ខែនេះ",
        liveCount: "ចំនួនផ្ទាល់",
        failedToLoad: "បរាជ័យក្នុងការផ្ទុក",
        monthlySales: "ការលក់ប្រចាំខែ",
        revenueAcrossFarms: "ចំណូលពីគ្រប់កសិដ្ឋាន",
        last6Months: "៦ខែចុងក្រោយ",
        last3Months: "៣ខែចុងក្រោយ",
        thisYear: "ឆ្នាំនេះ",
        topPerformers: "ផលិតផលឈានមុខគេ",
        bestsellingProducts: "ផលិតផលលក់ដាច់បំផុត",
        farmerAccounts: "គណនីកសិករ",
        manageGrowers: "គ្រប់គ្រងកសិករ និងផលិតផលរបស់ពួកគេ",
        searchFarmersPlaceholder: "ស្វែងរកកសិករ",
        addFarmer: "បញ្ចូលកសិករ",
        colFarm: "កសិដ្ឋាន",
        colRegion: "តំបន់",
        colPhone: "ទូរស័ព្ទ",
        colStatus: "ស្ថានភាព",
        colActions: "សកម្មភាព",
        loadingFarmers: "កំពុងផ្ទុកកសិករ…",
        noFarmersFound: "រកមិនឃើញកសិករទេ។",
        viewLink: "មើល →",
      },
      adminFarmers: {
        title: "កសិករ",
        failedToLoadFarmers: "បរាជ័យក្នុងការផ្ទុកកសិករ។",
        filterAll: "ទាំងអស់",
        filterVerified: "បានផ្ទៀងផ្ទាត់",
        filterPending: "កំពុងរង់ចាំ",
        filterSuspended: "ត្រូវបានផ្អាក",
        searchFarmersPlaceholder: "ស្វែងរកកសិករ",
        colFarm: "កសិដ្ឋាន",
        colRegion: "តំបន់",
        colPhone: "ទូរស័ព្ទ",
        colJoined: "ចូលរួមនៅ",
        colStatus: "ស្ថានភាព",
        colActions: "សកម្មភាព",
        loadingFarmers: "កំពុងផ្ទុកកសិករ…",
        noFarmersFound: "រកមិនឃើញកសិករទេ។",
        viewLink: "មើល →",
      },
      adminFarmerDetail: {
        backToFarmers: "ត្រឡប់ទៅកសិករ",
        loadingFarmer: "កំពុងផ្ទុកកសិករ…",
        farmerNotFound: "រកមិនឃើញកសិករ។",
        farmDetails: "ព័ត៌មានលម្អិតកសិដ្ឋាន",
        noBioProvided: "មិនទាន់មានប្រវត្តិសង្ខេប។",
        provinceLabel: "ខេត្ត",
        joinedLabel: "ចូលរួមនៅ",
        verifiedAtLabel: "ផ្ទៀងផ្ទាត់នៅ",
        notVerified: "មិនទាន់ផ្ទៀងផ្ទាត់",
        addressLabel: "អាសយដ្ឋាន",
        contactLabel: "ទំនាក់ទំនង",
        productsLabel: "ផលិតផល",
        productWord: "ផលិតផល",
        productWordPlural: "ផលិតផល",
        noProductsListed: "មិនទាន់មានផលិតផលចុះបញ្ជីទេ។",
      },
      adminOrders: {
        title: "ការបញ្ជាទិញ",
        failedToLoadOrders: "បរាជ័យក្នុងការផ្ទុកការបញ្ជាទិញ។",
        failedToUpdateOrder: "បរាជ័យក្នុងការធ្វើបច្ចុប្បន្នភាពការបញ្ជាទិញ។",
        allOrders: "ការបញ្ជាទិញទាំងអស់",
        loadingEllipsis: "កំពុងផ្ទុក...",
        orderWord: "ការបញ្ជាទិញ",
        orderWordPlural: "ការបញ្ជាទិញ",
        searchOrdersPlaceholder: "ស្វែងរកការបញ្ជាទិញ",
        colOrder: "ការបញ្ជាទិញ",
        colCustomer: "អតិថិជន",
        colPlaced: "កាលបញ្ជាទិញ",
        colTotal: "សរុប",
        colStatus: "ស្ថានភាព",
        loadingOrders: "កំពុងផ្ទុកការបញ្ជាទិញ…",
        noOrdersFound: "រកមិនឃើញការបញ្ជាទិញទេ។",
      },
      adminProducts: {
        title: "ផលិតផល",
        failedToLoadProducts: "បរាជ័យក្នុងការផ្ទុកផលិតផល។",
        allProducts: "ផលិតផលទាំងអស់",
        loadingEllipsis: "កំពុងផ្ទុក...",
        productWord: "ផលិតផល",
        productWordPlural: "ផលិតផល",
        searchProductsPlaceholder: "ស្វែងរកផលិតផល ឬកសិដ្ឋាន",
        colProduct: "ផលិតផល",
        colFarm: "កសិដ្ឋាន",
        colCategory: "ប្រភេទ",
        colPrice: "តម្លៃ",
        colStock: "ស្តុក",
        loadingProducts: "កំពុងផ្ទុកផលិតផល…",
        noProductsFound: "រកមិនឃើញផលិតផលទេ។",
      },
      adminReports: {
        title: "របាយការណ៍",
        failedToLoadReports: "បរាជ័យក្នុងការផ្ទុករបាយការណ៍។",
        ordersByStatus: "ការបញ្ជាទិញតាមស្ថានភាព",
        breakdownAcrossPlatform: "ការបំបែកនៅទូទាំងវេទិកា",
        noOrdersYet: "មិនទាន់មានការបញ្ជាទិញទេ។",
        topCategories: "ប្រភេទឈានមុខគេ",
        productsByCategory: "ផលិតផលចុះបញ្ជីតាមប្រភេទ",
        noProductsYet: "មិនទាន់មានផលិតផលទេ។",
        farmerPayouts: "ការទូទាត់ដល់កសិករ",
        totalDisbursed: "ចំនួនសរុបបានផ្តល់ដល់អ្នកដាំដុះ",
        acrossPrefix: "ក្នុងចំណោម",
        payoutWord: "ការទូទាត់",
        payoutWordPlural: "ការទូទាត់",
      },
      adminSupport: {
        title: "សំបុត្រជំនួយ",
        allTickets: "សំបុត្រទាំងអស់",
        loadingEllipsis: "កំពុងផ្ទុក...",
        ticketWord: "សំបុត្រ",
        ticketWordPlural: "សំបុត្រ",
        searchTicketsPlaceholder: "ស្វែងរកសំបុត្រ",
        colSubject: "ប្រធានបទ",
        colRequester: "អ្នកស្នើសុំ",
        colCreated: "បានបង្កើត",
        colStatus: "ស្ថានភាព",
        loadingTickets: "កំពុងផ្ទុកសំបុត្រ...",
        noTicketsFound: "រកមិនឃើញសំបុត្រជំនួយទេ។",
        unknown: "មិនស្គាល់",
        failedToUpdateTicket: "បរាជ័យក្នុងការធ្វើបច្ចុប្បន្នភាពសំបុត្រ។",
      },
    },
  },
  zh: {
    nav: {
      home: "首页",
      marketplace: "市场",
      farmerPortal: "农民门户",
      admin: "管理员",
      myAccount: "我的账户",
      notifications: "通知",
      markAllRead: "全部标记为已读",
      noNotifications: "暂无通知。",
      signIn: "登录",
      logOut: "退出登录",
      profile: "个人资料",
      toggleMenu: "切换菜单",
      language: "语言",
    },
    hero: {
      eyebrow: "成立于2026年 — 从田野到家门",
      headline1: "根植于诚信。",
      headline2: "晨曦采摘。",
      description:
        "一个直接的市场,让小型农民与用心烹饪的厨房相遇。追踪每一次收获,从田野直达您的篮子——没有仓库,没有中间商。",
      shopToday: "选购今日鲜货",
      sellAsFarmer: "以农民身份销售",
      activeFarms: "活跃农场",
      ordersFulfilled: "已完成订单",
      organicStandard: "有机标准",
      lastHarvest: "上次收获",
      harvestedToday: "今日收获",
      defaultFarmName: "北谷农场",
    },
    harvest: {
      title: "本周收获",
      subtitle: "直接采购,今晨抵达我们的中心。",
      viewFullInventory: "查看全部库存 →",
      by: "来自",
      localFarmer: "本地农民",
      noProduce: "目前没有可供购买的产品。",
    },
    perspectives: {
      eyebrow: "为三种角色而生",
      title: "一个生态系统,三种视角。",
      consumer: {
        title: "面向消费者",
        description:
          "浏览本周应季产品,关注您喜爱的农场,并追踪每笔订单从收获到送达家门的全过程。",
        features: ["搜索与筛选产品", "订单跟踪", "购买历史", "个人资料管理"],
        cta: "客户控制台 →",
      },
      farmer: {
        title: "面向农民",
        description:
          "将您的收获变成线上店铺。管理库存、履行订单,并见证您的收入增长。",
        features: ["库存管理", "订单履行", "销售分析", "定价工具"],
        cta: "农民门户 →",
      },
      admin: {
        title: "面向管理员",
        description:
          "管理整个平台——验证种植者身份、管理分类,并在一个控制台中监控每一笔交易。",
        features: ["农民账户", "订单监管", "收入报告", "平台分析"],
        cta: "管理控制台 →",
      },
    },
    howItWorks: {
      title: "AgriConnect 如何运作",
      steps: [
        {
          title: "农民每日上架",
          description: "经过验证的种植者每天早晨将新鲜收获上架市场,价格公开透明。",
        },
        {
          title: "放心下单",
          description:
            "每一件产品均可追溯来源,安全支付,让您清楚知道是哪个农场种植了您的食物。",
        },
        {
          title: "直达配送",
          description: "采摘、包装并在24小时内发货。追踪您的订单从田野到餐桌的全过程。",
        },
      ],
    },
    realFarms: {
      eyebrow: "认识种植者",
      titleMain: "真实的农场。",
      titleItalic: "真实的名字。",
      description:
        "420多家独立农场每天在 AgriConnect 上架他们的收获。我们对每位种植者进行核实,审核每一项声明,并确保每一美元中的85美分都返还给农场。",
      cta: "浏览我们的农民联盟 →",
    },
    marketplace: {
      eyebrow: "市场",
      title: "今日鲜货",
      subtitle: "浏览经过验证的本地农民提供的新鲜产品。",
      searchPlaceholder: "搜索产品、农场、分类...",
      filters: "筛选",
      priceRange: "价格区间(美元)",
      min: "最低",
      max: "最高",
      to: "至",
      clear: "清除",
      apply: "应用",
      sortRecommended: "排序:推荐",
      sortPriceAsc: "排序:价格从低到高",
      sortPriceDesc: "排序:价格从高到低",
      sortNewest: "排序:最新",
      allProduce: "所有产品",
      loading: "正在加载产品...",
      noProduceFound: '未找到与"{search}"相关的产品',
      tryDifferent: "请尝试其他搜索词或分类。",
      localFarmer: "本地农民",
      wishlistOnlyCustomer: "只有客户账户才能使用心愿单。",
      wishlistUpdateFailed: "更新心愿单失败。",
      addToWishlist: "加入心愿单",
      removeFromWishlist: "从心愿单移除",
      somethingWrong: "出错了。",
    },
    footer: {
      description:
        "一个直接连接本地农民与用心消费者的市场。诚信的土壤,公平的定价,晨曦的收获。",
      marketplaceTitle: "市场",
      freshHarvest: "新鲜收获",
      ourFarmers: "我们的农民",
      seasonalBoxes: "季节礼盒",
      wholesale: "批发",
      platformTitle: "平台",
      farmerPortal: "农民门户",
      adminConsole: "管理控制台",
      apiDocs: "API 文档",
      support: "支持",
      copyright: "© 2026 AgriConnect。用心耕耘。",
      privacy: "隐私政策",
      terms: "条款",
      sustainability: "可持续发展",
    },
    ourFarmersPage: {
      eyebrow: "我们的农民",
      title: "每一次收获背后的人",
      description:
        "AgriConnect 的存在,是因为农民应该拥有与食用他们所种植作物的人直接联系的渠道。市场上的每一个商品都能追溯到一位真实的种植者,而不是仓库。",
      principles: [
        {
          title: "经过验证的种植者",
          body: "AgriConnect 上的每一位农民在其首次上架前都会经过验证,让您始终清楚知道是谁种植了您购买的产品。",
        },
        {
          title: "公平定价",
          body: "农民自行定价,并保留每笔销售的大部分收入——没有中间商在田野与您家门之间抬高收获的价格。",
        },
        {
          title: "本地优先",
          body: "我们将您与本省的种植者联系起来,让产品更新鲜,运输里程更短。",
        },
      ],
      ctaTitle: "正在种植值得分享的东西吗?",
      ctaDescription:
        "以农民身份加入 AgriConnect,开始直接向您所在地区用心的消费者销售。",
      becomeFarmer: "成为农民",
      browseProduce: "浏览产品",
    },
    seasonalPage: {
      eyebrow: "季节礼盒",
      title: "让季节为您挑选",
      description:
        "季节礼盒不再逐件浏览产品,而是为您带来此刻最新鲜的产品,精选自附近的农场,并按照适合您厨房的时间表送达。",
      boxes: [
        {
          name: "朝阳礼盒",
          cadence: "每周",
          body: "每周精选当季最佳的轮换组合——叶菜、根茎类和在配送前几天内采摘的水果。",
        },
        {
          name: "丰收餐桌礼盒",
          cadence: "每两周",
          body: "为大部分餐食在家烹饪的家庭打造的更大份礼盒,适合四到六人食用。",
        },
        {
          name: "单一农场礼盒",
          cadence: "每月",
          body: "所有内容均来自同一位农民,让您深入了解一位种植者的土壤、季节和特色产品。",
        },
      ],
      packedTitle: "按需打包",
      packedBody:
        "礼盒是在农民确认哪些产品已可采摘后才组装的,因此内容会随季节自然变化。",
      varietyTitle: "每周都不尽相同",
      varietyBody:
        "请期待多样性——春季的礼盒与夏末或收获季节的礼盒会大不相同。",
      ctaTitle: "季节礼盒即将推出",
      ctaDescription:
        "我们正与第一批农民一起推出这项服务。与此同时,欢迎浏览完整市场,查看今日新鲜产品。",
      browseProduce: "浏览产品",
    },
    wholesalePage: {
      eyebrow: "批发",
      title: "大宗产品,直接来自农场",
      description:
        "AgriConnect 与需要超出每周日常采购量的餐厅、杂货商和社区厨房合作。批发账户可按批量定价直接向我们的农民采购。",
      steps: [
        {
          title: "告诉我们您的采购量",
          body: "餐厅、市场和合作社可以订购超出个人客户上架数量的大宗产品。",
        },
        {
          title: "获得固定价格",
          body: "批发账户在整个季节享有固定的单价,而非按单计价的市场价格。",
        },
        {
          title: "定期配送",
          body: "直接与供应订单的农场设定每周或每月的配送计划。",
        },
      ],
      ctaTitle: "准备好设立批发账户了吗?",
      ctaDescription:
        "请告知您的企业名称、预计采购量和配送区域,我们的团队将为您匹配能够满足需求的农民。",
      emailWholesaleTeam: "发邮件联系批发团队",
      contactSupport: "联系支持团队",
    },
    docsPage: {
      eyebrow: "API 文档",
      title: "基于 AgriConnect 构建",
      description:
        "AgriConnect API 是一项返回 JSON 的 REST 服务。它直接支撑本市场,因此您在应用中能做的一切,都可以通过请求完成。",
      baseUrlLabel: "基础 URL",
      authLabel: "身份验证",
      authBody:
        "通过 {loginPath} 登录,并在之后的每个请求中将返回的令牌作为 {authHeader} 发送。",
      formatLabel: "格式",
      formatBody:
        "请求和响应均为 JSON 格式。公开目录读取({categoriesPath}、{provincesPath})无需令牌。",
      groupAuth: "身份验证",
      groupCatalog: "目录",
      groupCommerce: "交易",
      groupAccount: "账户",
    },
    supportPage: {
      eyebrow: "支持",
      title: "我们能帮您什么?",
      description:
        "请查看下方的常见问题,或直接联系我们,我们的团队会尽快回复您。",
      faqs: [
        {
          q: "如何跟踪订单?",
          a: "登录后,从您的控制台打开“订单”。每个订单都会显示当前状态,从已确认到已送达。",
        },
        {
          q: "如何成为 AgriConnect 的农民?",
          a: "前往农民注册页面并提交您的信息。您的账户在可以上架产品前会先经过审核。",
        },
        {
          q: "如果配送到货时损坏或不完整怎么办?",
          a: "在您的控制台中使用订单号开一张支持工单——我们的团队会直接与您和农民跟进。",
        },
        {
          q: "农民如何获得付款?",
          a: "配送确认后,款项将按订单结算。农民可以从控制台查看付款历史。",
        },
      ],
      haveAccountTitle: "已经有账户了吗?",
      haveAccountBody:
        "从您的控制台开一张工单,我们会将其与您的账户和订单历史关联跟踪。",
      openTicket: "开支持工单",
      loginToOpenTicket: "登录以开工单",
      emailUsTitle: "直接给我们发邮件",
      emailUsBody: "如有其他问题,或您尚未拥有账户。",
    },
    notificationsPage: {
      eyebrow: "更新",
      title: "通知",
      description: "掌握您的订单和账户动态。",
      loading: "正在加载通知...",
      deleteConfirm: "删除此通知?此操作无法撤销。",
    },
    privacyPage: {
      eyebrow: "法律",
      title: "隐私政策",
      lastUpdated: "最后更新于 2026 年 7 月",
      sections: [
        {
          title: "我们收集的信息",
          body: "我们收集您直接提供给我们的信息——姓名、电子邮件、电话号码、配送地址和付款详情——以及运营市场所需的订单和浏览活动。",
        },
        {
          title: "我们如何使用这些信息",
          body: "您的信息用于处理订单、将您与合适的农民或客户对接、发送订单和账户通知,并改善市场体验。我们不会出售您的个人数据。",
        },
        {
          title: "与农民和客户共享",
          body: "当您下单时,履行订单的农民可以看到您的姓名、配送地址和订单详情。农民的商家信息对浏览市场的客户可见。",
        },
        {
          title: "数据保留",
          body: "只要您的账户处于活跃状态,我们就会保留账户和订单记录,并在此后有限的一段时间内保留,以满足会计和法律义务。",
        },
        {
          title: "您的选择",
          body: "您可以随时从控制台查看和更新您的个人资料信息,或联系支持团队申请删除您的账户。",
        },
      ],
    },
    termsPage: {
      eyebrow: "法律",
      title: "服务条款",
      lastUpdated: "最后更新于 2026 年 7 月",
      sections: [
        {
          title: "使用 AgriConnect",
          body: "创建账户即表示您同意提供准确的信息,并仅将本市场用于合法的农产品买卖。",
        },
        {
          title: "农民账户",
          body: "农民对其产品列表的准确性负责,包括价格、库存和质量。虚假描述产品的列表可能会被下架。",
        },
        {
          title: "订单与付款",
          body: "下单即表示您承诺按上架价格购买。付款通过 AgriConnect 处理,并在配送确认后拨付给农民。",
        },
        {
          title: "取消与争议",
          body: "取消窗口期因农民和订单状态而异。如果订单到货损坏、不完整或与描述不符,请开一张支持工单,我们的团队会协助解决。",
        },
        {
          title: "账户暂停",
          body: "对于违反这些条款、滥用平台或反复未能履行订单的账户,我们可能会暂停或移除。",
        },
        {
          title: "条款变更",
          body: "随着平台的发展,我们可能会更新这些条款。更新后继续使用 AgriConnect 即表示您接受修订后的条款。",
        },
      ],
    },
    sustainabilityPage: {
      eyebrow: "可持续发展",
      title: "用心耕耘",
      description:
        "直接市场从设计上就意味着更轻的环境足迹——更少的中间环节、更新鲜的产品,以及田野与餐桌之间更少的浪费。",
      commitments: [
        {
          title: "更短的供应链",
          body: "产品直接从农民流向客户,省去了增加运输里程和损耗的仓储与运输环节。",
        },
        {
          title: "可持续种植方式",
          body: "我们优先考虑注重土壤健康的农民——轮作、减少化学投入,以及注重节水的灌溉方式。",
        },
        {
          title: "减少浪费",
          body: "由于订单是根据真实、当前的库存下达的,农民的采收更贴近实际需求,而不是过度生产。",
        },
      ],
    },
    dashboard: {
      shared: {
        signOut: "退出登录",
        yourProfile: "您的资料",
        viewProfileFallback: "查看资料",
        adminFallbackName: "管理员",
        navOverview: "概览",
        navOrders: "订单",
        navProducts: "产品",
        navInventory: "库存",
        navReports: "报告",
        navSupport: "支持",
        navFarmers: "农民",
        navWishlist: "心愿单",
        customerPortalLabel: "客户门户",
        farmerPortalLabel: "农民门户",
        adminPortalLabel: "管理员门户",
        adminConsoleLabel: "管理控制台",
        platformAdminLabel: "平台管理员",
        na: "无",
        somethingWrong: "出错了。",
        save: "保存",
        saving: "正在保存...",
        cancel: "取消",
        edit: "编辑",
        addStock: "添加库存",
        delete: "删除",
        deleting: "正在删除...",
        viewAll: "查看全部",
        newTicket: "新建工单",
        yourTickets: "您的工单",
        subjectLabel: "主题",
        messageLabel: "留言",
        submitTicket: "提交工单",
        submitting: "正在提交...",
        describeIssuePlaceholder: "描述问题...",
        noTicketsYet: "您还没有提交过任何工单。",
        viewConversation: "查看对话",
        hideConversation: "隐藏对话",
        noRepliesYet: "暂无回复。",
        replyPlaceholder: "写一条回复...",
        sendReply: "发送回复",
        sending: "发送中...",
        you: "您",
        support: "客服",
        statTotalFarmers: "农民总数",
        statTotalProducts: "产品总数",
        statTotalCustomers: "客户总数",
        statTotalOrders: "订单总数",
        statTotalRevenue: "总收入",
      },
      customerHome: {
        loading: "正在加载客户控制台...",
        welcomeBack: "欢迎回来",
        helloPrefix: "你好,",
        hungry: "饿了吗?",
        defaultCustomerName: "客户",
        customerNameLabel: "客户姓名",
        phoneLabel: "电话",
        districtLabel: "区",
        provinceLabel: "省",
        provinceIdPrefix: "省份编号",
        profileNotFoundTitle: "未找到客户资料",
        profileNotFoundBody: "您的账户已存在,但尚未关联客户资料。",
        orderPrefix: "订单 #",
        orderInProgress: "订单处理中",
        orderCancelled: "订单已取消",
        delivered: "已送达",
        noAddressYet: "尚无地址",
        trackOrder: "追踪订单",
        trackerPlaced: "已下单",
        trackerPaid: "已付款",
        trackerShipped: "已发货",
        trackerDelivered: "已送达",
        noOrdersTitle: "暂无订单",
        noOrdersBody: "浏览市场以下第一笔订单。",
        goToMarketplace: "前往市场",
        recentOrdersTitle: "近期订单",
        noOrdersInline: "您还没有下过任何订单。",
        wishlistTitle: "心愿单",
        nothingSavedYet: "暂无收藏。",
        defaultProductName: "产品",
        moveAllToBasket: "全部移入购物篮",
        moving: "正在移动...",
      },
      customerOrders: {
        loading: "正在加载订单...",
        title: "您的订单",
        noOrdersYet: "您还没有下过任何订单。",
        orderPrefix: "订单 #",
        noDestination: "未设置送货地址",
      },
      customerSupport: {
        loading: "正在加载支持工单...",
        title: "支持",
        subjectPlaceholder: "订单付款未显示",
      },
      customerWishlist: {
        loading: "正在加载心愿单...",
        title: "您的心愿单",
        nothingSavedYet: "暂无收藏。",
        defaultProductName: "产品",
        moveToCartAria: "移入购物车",
        removeAria: "从心愿单移除",
      },
      farmerHome: {
        loading: "正在加载农民控制台...",
        greetingMorning: "早上好",
        greetingAfternoon: "下午好",
        greetingEvening: "晚上好",
        defaultFarmerName: "农民",
        performanceOverview: "业绩概览",
        viewReports: "查看报告",
        newProduct: "+ 新增产品",
        totalRevenue: "总收入",
        fromPayouts: "来自结算款",
        recentOrders: "近期订单",
        activeSuffix: "个进行中",
        productsListed: "已上架产品",
        inYourCatalog: "在您的目录中",
        platformHealth: "平台健康度",
        optimal: "良好",
        pendingWord: "待处理",
        verifiedFarmer: "已验证农民",
        pendingFarmer: "待验证农民",
        farmerCodeLabel: "农民编码",
        phoneLabel: "电话",
        provinceLabel: "省",
        provinceIdPrefix: "省份编号",
        statusLabel: "状态",
        currentInventory: "当前库存",
        viewCatalog: "查看目录 →",
        noProductsYet: "暂无产品。",
        addFirstProduct: "添加您的第一个产品",
        inStockUnits: "库存:{n} 件",
        incomingOrders: "新订单",
        noOrdersYet: "暂无订单。",
        seeFullAnalytics: "查看完整分析 ↗",
        defaultCustomerName: "客户",
        orderPrefix: "订单 #",
        itemWord: "件商品",
        itemWordPlural: "件商品",
      },
      farmerInventory: {
        loading: "正在加载库存...",
        eyebrow: "库存",
        title: "库存",
        noProductsYet: "暂无产品。",
        addFirstProduct: "添加您的第一个产品",
        provinceNotSet: "未设置省份",
        stockQtyLabel: "库存数量",
        lowStockAtLabel: "低库存阈值",
        bothFieldsRequired: "两个字段均为必填。",
        noProvinceSet: "您的农民资料尚未设置省份。",
        failedToSaveInventory: "保存库存失败。",
        unitsSuffix: "件",
        lowAtPrefix: "低库存阈值",
        noInventoryRecord: "暂无库存记录",
        inStockDefault: "有库存",
      },
      farmerOrders: {
        loading: "正在加载订单...",
        eyebrow: "履单",
        title: "订单",
        noOrdersYet: "暂无订单。",
        orderPrefix: "订单 #",
        noDestination: "未设置送货地址",
        failedToUpdateOrder: "更新订单失败。",
      },
      farmerProducts: {
        loading: "正在加载产品...",
        eyebrow: "产品目录",
        title: "您的产品",
        newProduct: "+ 新增产品",
        noProductsYet: "暂无产品。",
        addFirstProduct: "添加您的第一个产品",
        uncategorized: "未分类",
        inStockUnits: "库存:{n} 件",
        stockNA: "库存:无数据",
        deleteConfirm: "删除此产品?此操作无法撤销。",
        failedToDeleteProduct: "删除产品失败。",
      },
      farmerNewProduct: {
        loading: "正在加载产品表单...",
        backToDashboard: "← 返回控制台",
        eyebrow: "农民产品",
        title: "添加新产品",
        noProvinceWarningPart1: "您的农民资料尚未设置省份,因此无法创建库存。",
        noProvinceWarningLink: "在您的资料中更新省份",
        noProvinceWarningPart2: "后再试。",
        productCodeLabel: "产品编码",
        productCodePlaceholder: "P-001",
        productNameLabel: "产品名称",
        productNamePlaceholder: "有机芒果",
        productDescriptionLabel: "描述",
        productDescriptionPlaceholder: "新鲜甜美的芒果",
        translationsTitle: "自动翻译",
        translationsHelpText: "您的产品名称和描述会自动翻译成高棉语、英语、中文和法语——顾客将看到他们在菜单中选择的语言版本。",
        categoryLabel: "分类",
        noCategoriesAvailable: "暂无可用分类",
        productImagesLabel: "产品图片",
        uploadHelpText: "上传 1 到 {max} 张图片。您可以多次选择以添加更多图片。第一张图片将作为产品主图。({count}/{max} 已选择)",
        imagePreviewLabel: "图片预览",
        mainBadge: "主图",
        removeImageAria: "删除图片 {n}",
        priceUsdLabel: "价格(美元)",
        unitLabel: "单位",
        unitKg: "公斤",
        unitPiece: "件",
        unitBunch: "把",
        stockQuantityLabel: "库存数量",
        lowStockThresholdLabel: "低库存阈值",
        createProduct: "创建产品和库存",
        creatingProduct: "正在创建产品...",
        translatingProduct: "正在翻译产品...",
        errFarmerNotFound: "未找到农民资料。",
        errNoProvince: "您的农民资料尚未设置省份。请在创建产品前先在资料中更新省份。",
        errProductCodeRequired: "产品编码为必填项。",
        errNameRequired: "产品名称为必填项。",
        errCategoryRequired: "分类为必填项。",
        errPriceRequired: "价格为必填项。",
        errStockRequired: "库存数量为必填项。",
        errImageRequired: "请至少上传一张图片。",
        errMaxImages: "最多可上传 {max} 张图片。",
      },
      farmerReports: {
        loading: "正在加载报告...",
        eyebrow: "数据分析",
        title: "报告",
        totalPayouts: "总结算款",
        paidOut: "已支付",
        pendingLabel: "待处理",
        productsListed: "已上架产品",
        payoutHistory: "结算历史",
        noPayoutsYet: "暂无结算记录。",
        inventoryHealth: "库存健康度",
        lowStockDescription: "达到或低于低库存阈值的产品",
        outOfPrefix: "共",
        totalProductWord: "个产品",
        totalProductWordPlural: "个产品",
      },
      farmerSupport: {
        loading: "正在加载支持工单...",
        title: "支持",
        subjectPlaceholder: "结算款尚未到账",
      },
      adminHome: {
        title: "平台概览",
        titleSuffix: "— 本月",
        liveCount: "实时统计",
        failedToLoad: "加载失败",
        monthlySales: "月度销售额",
        revenueAcrossFarms: "所有农场的收入",
        last6Months: "最近6个月",
        last3Months: "最近3个月",
        thisYear: "今年",
        topPerformers: "热销产品",
        bestsellingProducts: "最畅销产品",
        farmerAccounts: "农民账户",
        manageGrowers: "管理种植者及其产品",
        searchFarmersPlaceholder: "搜索农民",
        addFarmer: "添加农民",
        colFarm: "农场",
        colRegion: "地区",
        colPhone: "电话",
        colStatus: "状态",
        colActions: "操作",
        loadingFarmers: "正在加载农民…",
        noFarmersFound: "未找到农民。",
        viewLink: "查看 →",
      },
      adminFarmers: {
        title: "农民",
        failedToLoadFarmers: "加载农民失败。",
        filterAll: "全部",
        filterVerified: "已验证",
        filterPending: "待处理",
        filterSuspended: "已暂停",
        searchFarmersPlaceholder: "搜索农民",
        colFarm: "农场",
        colRegion: "地区",
        colPhone: "电话",
        colJoined: "加入时间",
        colStatus: "状态",
        colActions: "操作",
        loadingFarmers: "正在加载农民…",
        noFarmersFound: "未找到农民。",
        viewLink: "查看 →",
      },
      adminFarmerDetail: {
        backToFarmers: "返回农民列表",
        loadingFarmer: "正在加载农民信息…",
        farmerNotFound: "未找到该农民。",
        farmDetails: "农场详情",
        noBioProvided: "暂无简介。",
        provinceLabel: "省",
        joinedLabel: "加入时间",
        verifiedAtLabel: "验证时间",
        notVerified: "尚未验证",
        addressLabel: "地址",
        contactLabel: "联系方式",
        productsLabel: "产品",
        productWord: "个产品",
        productWordPlural: "个产品",
        noProductsListed: "暂无上架产品。",
      },
      adminOrders: {
        title: "订单",
        failedToLoadOrders: "加载订单失败。",
        failedToUpdateOrder: "更新订单失败。",
        allOrders: "所有订单",
        loadingEllipsis: "正在加载...",
        orderWord: "个订单",
        orderWordPlural: "个订单",
        searchOrdersPlaceholder: "搜索订单",
        colOrder: "订单",
        colCustomer: "客户",
        colPlaced: "下单时间",
        colTotal: "总额",
        colStatus: "状态",
        loadingOrders: "正在加载订单…",
        noOrdersFound: "未找到订单。",
      },
      adminProducts: {
        title: "产品",
        failedToLoadProducts: "加载产品失败。",
        allProducts: "所有产品",
        loadingEllipsis: "正在加载...",
        productWord: "个产品",
        productWordPlural: "个产品",
        searchProductsPlaceholder: "搜索产品或农场",
        colProduct: "产品",
        colFarm: "农场",
        colCategory: "分类",
        colPrice: "价格",
        colStock: "库存",
        loadingProducts: "正在加载产品…",
        noProductsFound: "未找到产品。",
      },
      adminReports: {
        title: "报告",
        failedToLoadReports: "加载报告失败。",
        ordersByStatus: "按状态划分的订单",
        breakdownAcrossPlatform: "平台整体分布",
        noOrdersYet: "暂无订单。",
        topCategories: "热门分类",
        productsByCategory: "按分类上架的产品",
        noProductsYet: "暂无产品。",
        farmerPayouts: "农民结算款",
        totalDisbursed: "已支付给种植者的总额",
        acrossPrefix: "共",
        payoutWord: "笔结算",
        payoutWordPlural: "笔结算",
      },
      adminSupport: {
        title: "支持工单",
        allTickets: "所有工单",
        loadingEllipsis: "正在加载...",
        ticketWord: "个工单",
        ticketWordPlural: "个工单",
        searchTicketsPlaceholder: "搜索工单",
        colSubject: "主题",
        colRequester: "申请人",
        colCreated: "创建时间",
        colStatus: "状态",
        loadingTickets: "正在加载工单...",
        noTicketsFound: "未找到支持工单。",
        unknown: "未知",
        failedToUpdateTicket: "更新工单失败。",
      },
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      marketplace: "Marché",
      farmerPortal: "Portail agriculteur",
      admin: "Admin",
      myAccount: "Mon compte",
      notifications: "Notifications",
      markAllRead: "Tout marquer comme lu",
      noNotifications: "Aucune notification pour le moment.",
      signIn: "Se connecter",
      logOut: "Se déconnecter",
      profile: "Profil",
      toggleMenu: "Basculer le menu",
      language: "Langue",
    },
    hero: {
      eyebrow: "Fondé en 2026 — Du champ à votre porte",
      headline1: "Enraciné dans l'honnêteté.",
      headline2: "Cueilli à l'aube.",
      description:
        "Un marché direct où les petits agriculteurs rencontrent des cuisines responsables. Suivez chaque récolte du champ à votre panier — sans entrepôts, sans intermédiaires.",
      shopToday: "Acheter la récolte du jour",
      sellAsFarmer: "Vendre en tant qu'agriculteur",
      activeFarms: "Fermes actives",
      ordersFulfilled: "Commandes traitées",
      organicStandard: "Norme biologique",
      lastHarvest: "Dernière récolte",
      harvestedToday: "Récolté aujourd'hui",
      defaultFarmName: "Ferme de la Vallée du Nord",
    },
    harvest: {
      title: "La récolte de cette semaine",
      subtitle: "Approvisionnement direct, arrivé ce matin dans nos points de collecte.",
      viewFullInventory: "Voir tout l'inventaire →",
      by: "par",
      localFarmer: "Agriculteur local",
      noProduce: "Aucun produit disponible pour le moment.",
    },
    perspectives: {
      eyebrow: "Conçu pour trois profils",
      title: "Un écosystème, trois perspectives.",
      consumer: {
        title: "Pour les consommateurs",
        description:
          "Découvrez les produits de saison cette semaine, suivez vos fermes préférées et suivez chaque commande de la récolte jusqu'à votre porte.",
        features: [
          "Rechercher et filtrer les produits",
          "Suivi des commandes",
          "Historique des achats",
          "Gestion du profil",
        ],
        cta: "Tableau de bord client →",
      },
      farmer: {
        title: "Pour les agriculteurs",
        description:
          "Transformez votre récolte en vitrine. Gérez vos stocks, honorez les commandes et voyez vos revenus augmenter.",
        features: [
          "Gestion des stocks",
          "Traitement des commandes",
          "Analyse des ventes",
          "Outils de tarification",
        ],
        cta: "Portail agriculteur →",
      },
      admin: {
        title: "Pour les administrateurs",
        description:
          "Gérez la plateforme — vérifiez les producteurs, gérez les catégories et surveillez chaque transaction depuis une seule console.",
        features: [
          "Comptes agriculteurs",
          "Supervision des commandes",
          "Rapports de revenus",
          "Analyses de la plateforme",
        ],
        cta: "Console d'administration →",
      },
    },
    howItWorks: {
      title: "Comment fonctionne AgriConnect",
      steps: [
        {
          title: "Les agriculteurs publient chaque jour",
          description:
            "Chaque matin, des producteurs vérifiés ajoutent leurs récoltes fraîches sur le marché avec une tarification transparente.",
        },
        {
          title: "Commandez en toute confiance",
          description:
            "Chaque produit est traçable. Payez en toute sécurité. Sachez exactement quelle ferme a cultivé votre nourriture.",
        },
        {
          title: "Livraison directe",
          description:
            "Récolté, emballé et expédié en moins de 24 heures. Suivez votre commande du champ à la table.",
        },
      ],
    },
    realFarms: {
      eyebrow: "Rencontrez les producteurs",
      titleMain: "De vraies fermes.",
      titleItalic: "De vrais noms.",
      description:
        "Plus de 420 fermes indépendantes publient leur récolte quotidienne sur AgriConnect. Nous vérifions chaque producteur, contrôlons chaque allégation et veillons à ce que 85 % de chaque dollar reviennent à la ferme.",
      cta: "Découvrez notre collectif d'agriculteurs →",
    },
    marketplace: {
      eyebrow: "Le marché",
      title: "La récolte fraîche du jour",
      subtitle: "Parcourez des produits frais issus d'agriculteurs locaux vérifiés.",
      searchPlaceholder: "Rechercher des produits, fermes, catégories...",
      filters: "Filtres",
      priceRange: "Fourchette de prix (USD)",
      min: "Min",
      max: "Max",
      to: "à",
      clear: "Effacer",
      apply: "Appliquer",
      sortRecommended: "Trier : Recommandé",
      sortPriceAsc: "Trier : Prix croissant",
      sortPriceDesc: "Trier : Prix décroissant",
      sortNewest: "Trier : Plus récent",
      allProduce: "Tous les produits",
      loading: "Chargement des produits...",
      noProduceFound: 'Aucun produit trouvé pour « {search} »',
      tryDifferent: "Essayez une autre recherche ou catégorie.",
      localFarmer: "Agriculteur local",
      wishlistOnlyCustomer: "Seuls les comptes clients peuvent utiliser la liste de souhaits.",
      wishlistUpdateFailed: "Échec de la mise à jour de la liste de souhaits.",
      addToWishlist: "Ajouter à la liste de souhaits",
      removeFromWishlist: "Retirer de la liste de souhaits",
      somethingWrong: "Une erreur s'est produite.",
    },
    footer: {
      description:
        "Un marché direct qui relie les agriculteurs locaux et les consommateurs responsables. Sol honnête, prix justes, récoltes à l'aube.",
      marketplaceTitle: "Marché",
      freshHarvest: "Récolte fraîche",
      ourFarmers: "Nos agriculteurs",
      seasonalBoxes: "Paniers saisonniers",
      wholesale: "Vente en gros",
      platformTitle: "Plateforme",
      farmerPortal: "Portail agriculteur",
      adminConsole: "Console d'administration",
      apiDocs: "Documentation API",
      support: "Support",
      copyright: "© 2026 AgriConnect. Cultivé avec intention.",
      privacy: "Confidentialité",
      terms: "Conditions",
      sustainability: "Durabilité",
    },
    ourFarmersPage: {
      eyebrow: "Nos agriculteurs",
      title: "Les personnes derrière chaque récolte",
      description:
        "AgriConnect existe parce que les agriculteurs méritent un lien direct avec les personnes qui consomment ce qu'ils cultivent. Chaque annonce du marché remonte à un véritable producteur, pas à un entrepôt.",
      principles: [
        {
          title: "Producteurs vérifiés",
          body: "Chaque agriculteur sur AgriConnect est vérifié avant la mise en ligne de sa première annonce, afin que vous sachiez toujours exactement qui a cultivé ce que vous achetez.",
        },
        {
          title: "Tarification équitable",
          body: "Les agriculteurs fixent eux-mêmes leurs prix et conservent la majeure partie de chaque vente — aucun intermédiaire ne majore la récolte entre le champ et votre porte.",
        },
        {
          title: "Le local d'abord",
          body: "Nous vous mettons en relation avec des producteurs de votre propre province, pour des produits plus frais et moins de kilomètres parcourus.",
        },
      ],
      ctaTitle: "Vous cultivez quelque chose qui mérite d'être partagé ?",
      ctaDescription:
        "Rejoignez AgriConnect en tant qu'agriculteur et commencez à vendre directement aux consommateurs engagés de votre région.",
      becomeFarmer: "Devenir agriculteur",
      browseProduce: "Parcourir les produits",
    },
    seasonalPage: {
      eyebrow: "Paniers saisonniers",
      title: "Laissez la saison choisir pour vous",
      description:
        "Plutôt que de parcourir les produits un par un, un panier saisonnier vous apporte ce qu'il y a de plus frais en ce moment, sélectionné dans les fermes voisines et livré selon un calendrier adapté à votre cuisine.",
      boxes: [
        {
          name: "Panier Aurore",
          cadence: "Hebdomadaire",
          body: "Un mélange changeant de ce qui est au meilleur de sa forme cette semaine — légumes-feuilles, racines et fruits cueillis quelques jours avant la livraison.",
        },
        {
          name: "Panier Table de récolte",
          cadence: "Bimensuel",
          body: "Un assortiment plus large conçu pour les foyers qui cuisinent la plupart de leurs repas à la maison, prévu pour quatre à six personnes.",
        },
        {
          name: "Panier Ferme unique",
          cadence: "Mensuel",
          body: "Tout provient d'un seul agriculteur, pour apprendre à connaître le sol, la saison et les spécialités d'un producteur en particulier.",
        },
      ],
      packedTitle: "Préparé à la commande",
      packedBody:
        "Les paniers sont assemblés après que les agriculteurs ont confirmé ce qui est prêt à être cueilli, de sorte que le contenu évolue naturellement avec la saison.",
      varietyTitle: "Jamais deux semaines identiques",
      varietyBody:
        "Attendez-vous à de la variété — un panier au printemps est très différent d'un panier de fin d'été ou de la saison des récoltes.",
      ctaTitle: "Les paniers saisonniers arrivent bientôt",
      ctaDescription:
        "Nous lançons ce service avec notre premier groupe d'agriculteurs. En attendant, parcourez l'ensemble du marché pour découvrir ce qui est frais aujourd'hui.",
      browseProduce: "Parcourir les produits",
    },
    wholesalePage: {
      eyebrow: "Vente en gros",
      title: "Des produits en gros, directement de la ferme",
      description:
        "AgriConnect travaille avec des restaurants, des épiceries et des cuisines communautaires qui ont besoin de plus qu'une commande hebdomadaire classique. Les comptes de gros achètent directement auprès de nos agriculteurs à des tarifs de volume.",
      steps: [
        {
          title: "Indiquez-nous votre volume",
          body: "Restaurants, marchés et coopératives peuvent commander des quantités en gros au-delà de ce qui est proposé aux clients individuels.",
        },
        {
          title: "Obtenez un tarif fixe",
          body: "Les comptes de gros bénéficient d'un prix fixe par unité pour toute la saison, plutôt que d'une tarification par commande.",
        },
        {
          title: "Livraison récurrente",
          body: "Définissez un calendrier de livraison hebdomadaire ou mensuel directement avec la ferme qui approvisionne votre commande.",
        },
      ],
      ctaTitle: "Prêt à créer un compte de gros ?",
      ctaDescription:
        "Contactez-nous avec le nom de votre entreprise, le volume prévu et la zone de livraison, et notre équipe vous mettra en relation avec des agriculteurs capables d'y répondre.",
      emailWholesaleTeam: "Contacter l'équipe grossiste par e-mail",
      contactSupport: "Contacter le support",
    },
    docsPage: {
      eyebrow: "Documentation API",
      title: "Développez avec AgriConnect",
      description:
        "L'API AgriConnect est un service REST qui renvoie du JSON. Elle alimente directement ce marché, donc tout ce que vous pouvez faire dans l'application, vous pouvez le faire via une requête.",
      baseUrlLabel: "URL de base",
      authLabel: "Authentification",
      authBody:
        "Connectez-vous via {loginPath} et envoyez le jeton retourné sous la forme {authHeader} à chaque requête suivante.",
      formatLabel: "Format",
      formatBody:
        "Les requêtes et réponses sont au format JSON. Les lectures publiques du catalogue ({categoriesPath}, {provincesPath}) ne nécessitent pas de jeton.",
      groupAuth: "Authentification",
      groupCatalog: "Catalogue",
      groupCommerce: "Commerce",
      groupAccount: "Compte",
    },
    supportPage: {
      eyebrow: "Support",
      title: "Comment pouvons-nous vous aider ?",
      description:
        "Consultez les réponses ci-dessous, ou contactez-nous directement et notre équipe vous répondra.",
      faqs: [
        {
          q: "Comment suivre une commande ?",
          a: "Connectez-vous et ouvrez « Commandes » depuis votre tableau de bord. Chaque commande affiche son statut actuel, de la confirmation à la livraison.",
        },
        {
          q: "Comment devenir agriculteur sur AgriConnect ?",
          a: "Rendez-vous sur la page d'inscription agriculteur et soumettez vos informations. Votre compte est examiné avant que vous puissiez publier des produits.",
        },
        {
          q: "Que faire si une livraison arrive endommagée ou incomplète ?",
          a: "Ouvrez un ticket de support depuis votre tableau de bord avec votre numéro de commande — notre équipe assurera le suivi directement avec vous et l'agriculteur.",
        },
        {
          q: "Comment les agriculteurs sont-ils payés ?",
          a: "Les paiements sont traités par commande une fois la livraison confirmée. Les agriculteurs peuvent consulter l'historique des paiements depuis leur tableau de bord.",
        },
      ],
      haveAccountTitle: "Vous avez déjà un compte ?",
      haveAccountBody:
        "Ouvrez un ticket depuis votre tableau de bord et nous le suivrons en fonction de votre compte et de votre historique de commandes.",
      openTicket: "Ouvrir un ticket de support",
      loginToOpenTicket: "Se connecter pour ouvrir un ticket",
      emailUsTitle: "Envoyez-nous un e-mail directement",
      emailUsBody: "Pour toute autre demande, ou si vous n'avez pas encore de compte.",
    },
    notificationsPage: {
      eyebrow: "Mises à jour",
      title: "Notifications",
      description: "Suivez vos commandes et l'activité de votre compte.",
      loading: "Chargement des notifications...",
      deleteConfirm: "Supprimer cette notification ? Cette action est irréversible.",
    },
    privacyPage: {
      eyebrow: "Mentions légales",
      title: "Politique de confidentialité",
      lastUpdated: "Dernière mise à jour : juillet 2026",
      sections: [
        {
          title: "Ce que nous collectons",
          body: "Nous collectons les informations que vous nous fournissez directement — nom, e-mail, numéro de téléphone, adresse de livraison et informations de paiement — ainsi que l'activité de commande et de navigation nécessaire au fonctionnement du marché.",
        },
        {
          title: "Comment nous les utilisons",
          body: "Vos informations servent à traiter les commandes, à vous mettre en relation avec le bon agriculteur ou client, à envoyer des notifications de commande et de compte, et à améliorer l'expérience du marché. Nous ne vendons pas vos données personnelles.",
        },
        {
          title: "Partage avec les agriculteurs et les clients",
          body: "Lorsque vous passez une commande, l'agriculteur qui l'exécute peut voir votre nom, votre adresse de livraison et les détails de la commande. Les informations professionnelles des agriculteurs sont visibles par les clients qui parcourent le marché.",
        },
        {
          title: "Conservation des données",
          body: "Nous conservons les données de compte et de commande aussi longtemps que votre compte est actif, et pendant une durée limitée par la suite pour répondre aux obligations comptables et légales.",
        },
        {
          title: "Vos choix",
          body: "Vous pouvez consulter et mettre à jour les informations de votre profil à tout moment depuis votre tableau de bord, ou contacter le support pour demander la suppression de votre compte.",
        },
      ],
    },
    termsPage: {
      eyebrow: "Mentions légales",
      title: "Conditions d'utilisation",
      lastUpdated: "Dernière mise à jour : juillet 2026",
      sections: [
        {
          title: "Utiliser AgriConnect",
          body: "En créant un compte, vous acceptez de fournir des informations exactes et d'utiliser le marché uniquement pour l'achat et la vente légaux de produits.",
        },
        {
          title: "Comptes agriculteurs",
          body: "Les agriculteurs sont responsables de l'exactitude de leurs annonces, y compris le prix, la disponibilité et la qualité. Les annonces présentant un produit de manière trompeuse peuvent être supprimées.",
        },
        {
          title: "Commandes et paiement",
          body: "Passer une commande engage à acheter au prix indiqué. Les paiements sont traités via AgriConnect et versés aux agriculteurs une fois la livraison confirmée.",
        },
        {
          title: "Annulations et litiges",
          body: "Les délais d'annulation varient selon l'agriculteur et le statut de la commande. Si une commande arrive endommagée, incomplète ou non conforme à sa description, ouvrez un ticket de support et notre équipe vous aidera à résoudre le problème.",
        },
        {
          title: "Suspension de compte",
          body: "Nous pouvons suspendre ou supprimer les comptes qui enfreignent ces conditions, utilisent la plateforme de manière abusive, ou échouent de manière répétée à honorer leurs commandes.",
        },
        {
          title: "Modifications de ces conditions",
          body: "Nous pouvons mettre à jour ces conditions à mesure que la plateforme évolue. Continuer à utiliser AgriConnect après une mise à jour signifie que vous acceptez les conditions révisées.",
        },
      ],
    },
    sustainabilityPage: {
      eyebrow: "Durabilité",
      title: "Cultivé avec intention",
      description:
        "Un marché direct est, par nature, plus léger sur le plan environnemental — moins d'intermédiaires, des produits plus frais et moins de gaspillage entre le champ et votre table.",
      commitments: [
        {
          title: "Chaînes d'approvisionnement plus courtes",
          body: "Les produits vont directement de l'agriculteur au client, supprimant les étapes de stockage et de transport qui allongent les distances parcourues et augmentent le gaspillage.",
        },
        {
          title: "Pratiques de culture durables",
          body: "Nous privilégions les agriculteurs qui cultivent en pensant à la santé des sols — rotation des cultures, réduction des intrants chimiques et irrigation raisonnée en eau.",
        },
        {
          title: "Moins de gaspillage",
          body: "Comme les commandes sont passées en fonction d'un inventaire réel et actuel, les agriculteurs récoltent au plus près du besoin réel plutôt que de surproduire.",
        },
      ],
    },
    dashboard: {
      shared: {
        signOut: "Se déconnecter",
        yourProfile: "Votre profil",
        viewProfileFallback: "Voir le profil",
        adminFallbackName: "Admin",
        navOverview: "Vue d'ensemble",
        navOrders: "Commandes",
        navProducts: "Produits",
        navInventory: "Inventaire",
        navReports: "Rapports",
        navSupport: "Support",
        navFarmers: "Agriculteurs",
        navWishlist: "Liste de souhaits",
        customerPortalLabel: "Portail client",
        farmerPortalLabel: "Portail agriculteur",
        adminPortalLabel: "Portail administrateur",
        adminConsoleLabel: "Console d'administration",
        platformAdminLabel: "Administrateur de la plateforme",
        na: "N/D",
        somethingWrong: "Une erreur s'est produite.",
        save: "Enregistrer",
        saving: "Enregistrement...",
        cancel: "Annuler",
        edit: "Modifier",
        addStock: "Ajouter du stock",
        delete: "Supprimer",
        deleting: "Suppression...",
        viewAll: "Tout voir",
        newTicket: "Nouveau ticket",
        yourTickets: "Vos tickets",
        subjectLabel: "Sujet",
        messageLabel: "Message",
        submitTicket: "Envoyer le ticket",
        submitting: "Envoi en cours...",
        describeIssuePlaceholder: "Décrivez le problème...",
        noTicketsYet: "Vous n'avez encore ouvert aucun ticket.",
        viewConversation: "Voir la conversation",
        hideConversation: "Masquer la conversation",
        noRepliesYet: "Aucune réponse pour le moment.",
        replyPlaceholder: "Écrivez une réponse...",
        sendReply: "Envoyer la réponse",
        sending: "Envoi en cours...",
        you: "Vous",
        support: "Support",
        statTotalFarmers: "AGRICULTEURS TOTAL",
        statTotalProducts: "PRODUITS TOTAL",
        statTotalCustomers: "CLIENTS TOTAL",
        statTotalOrders: "COMMANDES TOTAL",
        statTotalRevenue: "REVENU TOTAL",
      },
      customerHome: {
        loading: "Chargement du tableau de bord client...",
        welcomeBack: "Bon retour",
        helloPrefix: "Bonjour,",
        hungry: "Faim ?",
        defaultCustomerName: "Client",
        customerNameLabel: "Nom du client",
        phoneLabel: "Téléphone",
        districtLabel: "District",
        provinceLabel: "Province",
        provinceIdPrefix: "ID de province",
        profileNotFoundTitle: "Profil client introuvable",
        profileNotFoundBody: "Votre compte existe, mais aucun profil client n'y est encore relié.",
        orderPrefix: "Commande n°",
        orderInProgress: "Commande en cours",
        orderCancelled: "Commande annulée",
        delivered: "Livrée",
        noAddressYet: "Pas encore d'adresse",
        trackOrder: "Suivre la commande",
        trackerPlaced: "Passée",
        trackerPaid: "Payée",
        trackerShipped: "Expédiée",
        trackerDelivered: "Livrée",
        noOrdersTitle: "Pas encore de commandes",
        noOrdersBody: "Parcourez le marché pour passer votre première commande.",
        goToMarketplace: "Aller au marché",
        recentOrdersTitle: "Commandes récentes",
        noOrdersInline: "Vous n'avez pas encore passé de commande.",
        wishlistTitle: "Liste de souhaits",
        nothingSavedYet: "Rien d'enregistré pour le moment.",
        defaultProductName: "Produit",
        moveAllToBasket: "Tout déplacer vers le panier",
        moving: "Déplacement...",
      },
      customerOrders: {
        loading: "Chargement des commandes...",
        title: "Vos commandes",
        noOrdersYet: "Vous n'avez pas encore passé de commande.",
        orderPrefix: "Commande n°",
        noDestination: "Aucune destination définie",
      },
      customerSupport: {
        loading: "Chargement des tickets de support...",
        title: "Support",
        subjectPlaceholder: "Le paiement n'apparaît pas sur ma commande",
      },
      customerWishlist: {
        loading: "Chargement de la liste de souhaits...",
        title: "Votre liste de souhaits",
        nothingSavedYet: "Rien d'enregistré pour le moment.",
        defaultProductName: "Produit",
        moveToCartAria: "Déplacer vers le panier",
        removeAria: "Retirer de la liste de souhaits",
      },
      farmerHome: {
        loading: "Chargement du tableau de bord agriculteur...",
        greetingMorning: "Bonjour",
        greetingAfternoon: "Bon après-midi",
        greetingEvening: "Bonsoir",
        defaultFarmerName: "Agriculteur",
        performanceOverview: "Aperçu des performances",
        viewReports: "Voir les rapports",
        newProduct: "+ Nouveau produit",
        totalRevenue: "Revenu total",
        fromPayouts: "Provenant des paiements",
        recentOrders: "Commandes récentes",
        activeSuffix: "en cours",
        productsListed: "Produits publiés",
        inYourCatalog: "Dans votre catalogue",
        platformHealth: "Santé de la plateforme",
        optimal: "Optimal",
        pendingWord: "En attente",
        verifiedFarmer: "Agriculteur vérifié",
        pendingFarmer: "Agriculteur en attente",
        farmerCodeLabel: "Code agriculteur",
        phoneLabel: "Téléphone",
        provinceLabel: "Province",
        provinceIdPrefix: "ID de province",
        statusLabel: "Statut",
        currentInventory: "Inventaire actuel",
        viewCatalog: "Voir le catalogue →",
        noProductsYet: "Pas encore de produits.",
        addFirstProduct: "Ajouter votre premier produit",
        inStockUnits: "En stock : {n} unités",
        incomingOrders: "Commandes entrantes",
        noOrdersYet: "Pas encore de commandes.",
        seeFullAnalytics: "Voir toutes les analyses ↗",
        defaultCustomerName: "Client",
        orderPrefix: "Commande n°",
        itemWord: "article",
        itemWordPlural: "articles",
      },
      farmerInventory: {
        loading: "Chargement de l'inventaire...",
        eyebrow: "Stock",
        title: "Inventaire",
        noProductsYet: "Pas encore de produits.",
        addFirstProduct: "Ajouter votre premier produit",
        provinceNotSet: "Province non définie",
        stockQtyLabel: "Quantité en stock",
        lowStockAtLabel: "Seuil de stock bas",
        bothFieldsRequired: "Les deux champs sont obligatoires.",
        noProvinceSet: "Votre profil agriculteur n'a pas de province définie.",
        failedToSaveInventory: "Échec de l'enregistrement de l'inventaire.",
        unitsSuffix: "unités",
        lowAtPrefix: "Seuil bas à",
        noInventoryRecord: "Aucun enregistrement d'inventaire",
        inStockDefault: "en stock",
      },
      farmerOrders: {
        loading: "Chargement des commandes...",
        eyebrow: "Traitement des commandes",
        title: "Commandes",
        noOrdersYet: "Pas encore de commandes.",
        orderPrefix: "Commande n°",
        noDestination: "Aucune destination définie",
        failedToUpdateOrder: "Échec de la mise à jour de la commande.",
      },
      farmerProducts: {
        loading: "Chargement des produits...",
        eyebrow: "Catalogue",
        title: "Vos produits",
        newProduct: "+ Nouveau produit",
        noProductsYet: "Pas encore de produits.",
        addFirstProduct: "Ajouter votre premier produit",
        uncategorized: "Non catégorisé",
        inStockUnits: "En stock : {n} unités",
        stockNA: "Stock : N/D",
        deleteConfirm: "Supprimer ce produit ? Cette action est irréversible.",
        failedToDeleteProduct: "Échec de la suppression du produit.",
      },
      farmerNewProduct: {
        loading: "Chargement du formulaire produit...",
        backToDashboard: "← Retour au tableau de bord",
        eyebrow: "Produit agriculteur",
        title: "Ajouter un nouveau produit",
        noProvinceWarningPart1: "Votre profil agriculteur n'a pas de province définie, l'inventaire ne peut donc pas encore être créé. ",
        noProvinceWarningLink: "Mettez à jour votre province dans votre profil",
        noProvinceWarningPart2: " d'abord.",
        productCodeLabel: "Code produit",
        productCodePlaceholder: "P-001",
        productNameLabel: "Nom du produit",
        productNamePlaceholder: "Mangue biologique",
        productDescriptionLabel: "Description",
        productDescriptionPlaceholder: "Mangues sucrées et juteuses fraîchement cueillies.",
        translationsTitle: "Traduction automatique",
        translationsHelpText: "Le nom et la description de votre produit sont traduits automatiquement en khmer, anglais, chinois et français — les clients le verront dans la langue choisie dans le menu.",
        categoryLabel: "Catégorie",
        noCategoriesAvailable: "Aucune catégorie disponible",
        productImagesLabel: "Images du produit",
        uploadHelpText: "Téléchargez de 1 à {max} images. Vous pouvez sélectionner plusieurs fois pour en ajouter d'autres. La première image sera utilisée comme image principale du produit. ({count}/{max} sélectionnées)",
        imagePreviewLabel: "Aperçu des images",
        mainBadge: "Principale",
        removeImageAria: "Supprimer l'image {n}",
        priceUsdLabel: "Prix en USD",
        unitLabel: "Unité",
        unitKg: "kg",
        unitPiece: "pièce",
        unitBunch: "botte",
        stockQuantityLabel: "Quantité en stock",
        lowStockThresholdLabel: "Seuil de stock bas",
        createProduct: "Créer le produit et l'inventaire",
        creatingProduct: "Création du produit...",
        translatingProduct: "Traduction du produit...",
        errFarmerNotFound: "Profil agriculteur introuvable.",
        errNoProvince: "Votre profil agriculteur n'a pas de province définie. Veuillez mettre à jour votre province dans votre profil avant de créer un produit.",
        errProductCodeRequired: "Le code produit est requis.",
        errNameRequired: "Le nom du produit est requis.",
        errCategoryRequired: "La catégorie est requise.",
        errPriceRequired: "Le prix est requis.",
        errStockRequired: "La quantité en stock est requise.",
        errImageRequired: "Veuillez télécharger au moins une image.",
        errMaxImages: "Vous pouvez télécharger un maximum de {max} images.",
      },
      farmerReports: {
        loading: "Chargement des rapports...",
        eyebrow: "Analyses",
        title: "Rapports",
        totalPayouts: "Paiements totaux",
        paidOut: "Versés",
        pendingLabel: "En attente",
        productsListed: "Produits publiés",
        payoutHistory: "Historique des paiements",
        noPayoutsYet: "Aucun paiement enregistré pour le moment.",
        inventoryHealth: "Santé de l'inventaire",
        lowStockDescription: "Produits au niveau ou en dessous de leur seuil de stock bas",
        outOfPrefix: "sur",
        totalProductWord: "produit au total",
        totalProductWordPlural: "produits au total",
      },
      farmerSupport: {
        loading: "Chargement des tickets de support...",
        title: "Support",
        subjectPlaceholder: "Le paiement n'est pas encore arrivé",
      },
      adminHome: {
        title: "Aperçu de la plateforme",
        titleSuffix: "— ce mois-ci",
        liveCount: "Décompte en direct",
        failedToLoad: "Échec du chargement",
        monthlySales: "Ventes mensuelles",
        revenueAcrossFarms: "Revenus de toutes les fermes",
        last6Months: "6 derniers mois",
        last3Months: "3 derniers mois",
        thisYear: "Cette année",
        topPerformers: "Meilleurs produits",
        bestsellingProducts: "Produits les plus vendus",
        farmerAccounts: "Comptes agriculteurs",
        manageGrowers: "Gérer les producteurs et leurs produits",
        searchFarmersPlaceholder: "Rechercher des agriculteurs",
        addFarmer: "Ajouter un agriculteur",
        colFarm: "FERME",
        colRegion: "RÉGION",
        colPhone: "TÉLÉPHONE",
        colStatus: "STATUT",
        colActions: "ACTIONS",
        loadingFarmers: "Chargement des agriculteurs…",
        noFarmersFound: "Aucun agriculteur trouvé.",
        viewLink: "Voir →",
      },
      adminFarmers: {
        title: "Agriculteurs",
        failedToLoadFarmers: "Échec du chargement des agriculteurs.",
        filterAll: "Tous",
        filterVerified: "Vérifiés",
        filterPending: "En attente",
        filterSuspended: "Suspendus",
        searchFarmersPlaceholder: "Rechercher des agriculteurs",
        colFarm: "FERME",
        colRegion: "RÉGION",
        colPhone: "TÉLÉPHONE",
        colJoined: "INSCRIT LE",
        colStatus: "STATUT",
        colActions: "ACTIONS",
        loadingFarmers: "Chargement des agriculteurs…",
        noFarmersFound: "Aucun agriculteur trouvé.",
        viewLink: "Voir →",
      },
      adminFarmerDetail: {
        backToFarmers: "Retour aux agriculteurs",
        loadingFarmer: "Chargement de l'agriculteur…",
        farmerNotFound: "Agriculteur introuvable.",
        farmDetails: "Détails de la ferme",
        noBioProvided: "Aucune biographie fournie.",
        provinceLabel: "Province",
        joinedLabel: "Inscrit le",
        verifiedAtLabel: "Vérifié le",
        notVerified: "Non vérifié",
        addressLabel: "Adresse",
        contactLabel: "Contact",
        productsLabel: "Produits",
        productWord: "produit",
        productWordPlural: "produits",
        noProductsListed: "Aucun produit publié pour le moment.",
      },
      adminOrders: {
        title: "Commandes",
        failedToLoadOrders: "Échec du chargement des commandes.",
        failedToUpdateOrder: "Échec de la mise à jour de la commande.",
        allOrders: "Toutes les commandes",
        loadingEllipsis: "Chargement...",
        orderWord: "commande",
        orderWordPlural: "commandes",
        searchOrdersPlaceholder: "Rechercher des commandes",
        colOrder: "COMMANDE",
        colCustomer: "CLIENT",
        colPlaced: "PASSÉE LE",
        colTotal: "TOTAL",
        colStatus: "STATUT",
        loadingOrders: "Chargement des commandes…",
        noOrdersFound: "Aucune commande trouvée.",
      },
      adminProducts: {
        title: "Produits",
        failedToLoadProducts: "Échec du chargement des produits.",
        allProducts: "Tous les produits",
        loadingEllipsis: "Chargement...",
        productWord: "produit",
        productWordPlural: "produits",
        searchProductsPlaceholder: "Rechercher des produits ou des fermes",
        colProduct: "PRODUIT",
        colFarm: "FERME",
        colCategory: "CATÉGORIE",
        colPrice: "PRIX",
        colStock: "STOCK",
        loadingProducts: "Chargement des produits…",
        noProductsFound: "Aucun produit trouvé.",
      },
      adminReports: {
        title: "Rapports",
        failedToLoadReports: "Échec du chargement des rapports.",
        ordersByStatus: "Commandes par statut",
        breakdownAcrossPlatform: "Répartition sur l'ensemble de la plateforme",
        noOrdersYet: "Pas encore de commandes.",
        topCategories: "Meilleures catégories",
        productsByCategory: "Produits publiés par catégorie",
        noProductsYet: "Pas encore de produits.",
        farmerPayouts: "Paiements aux agriculteurs",
        totalDisbursed: "Total versé aux producteurs",
        acrossPrefix: "sur",
        payoutWord: "paiement",
        payoutWordPlural: "paiements",
      },
      adminSupport: {
        title: "Tickets de support",
        allTickets: "Tous les tickets",
        loadingEllipsis: "Chargement...",
        ticketWord: "ticket",
        ticketWordPlural: "tickets",
        searchTicketsPlaceholder: "Rechercher des tickets",
        colSubject: "SUJET",
        colRequester: "DEMANDEUR",
        colCreated: "CRÉÉ LE",
        colStatus: "STATUT",
        loadingTickets: "Chargement des tickets...",
        noTicketsFound: "Aucun ticket de support trouvé.",
        unknown: "Inconnu",
        failedToUpdateTicket: "Échec de la mise à jour du ticket.",
      },
    },
  },
};
