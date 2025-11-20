"use client"

import Image from "next/image";
import { Tldraw } from "tldraw";

export default function Home() {
  return (
   <>
   <div className="editor h-screen w-full">
   <Tldraw/>
   </div>
   </>
  );
}
