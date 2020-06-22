/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "*.svg";

// Defined using a webpack `DefinePlugin`
declare const __SERVER__: boolean;
declare const __DEV__: boolean;
