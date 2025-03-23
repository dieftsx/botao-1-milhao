"use client";

import { useEffect, useState } from "react";

interface Donation {
  amount: number;
  payer: string | null;
  createdAt: string;
}
