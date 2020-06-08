/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "*.svg";

// Defined using a webpack `DefinePlugin`
declare const __SERVER__: boolean;
