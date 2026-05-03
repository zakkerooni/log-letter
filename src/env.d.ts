/// <reference types="astro/client" />

import type { Site } from './lib/site';

declare namespace App {
  interface Locals {
    site: Site;
  }
}
